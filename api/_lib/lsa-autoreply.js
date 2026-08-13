// AI first-touch for Google LSA message leads (Mex Landscaping).
//
// On every new customer message the ingest cron calls maybeAutoReply:
//  - Claude reads the whole thread and figures out what the customer wants,
//    what's still missing, whether they've shared address/phone, and whether
//    they've walked away.
//  - It replies warmly to qualify the job and drive to a FREE on-site
//    estimate. Landscaping/hardscaping is never priced by message, so the AI
//    never states a dollar amount.
//
// Guardrails (ported from the Palma build): max 3 AI replies per lead, only
// when the newest message is from the customer and under 24h old, and never
// after a human has already replied. Everything is logged to lead_messages.

import { sendLsaReply } from "./lsa-mail.js";

const MAX_AI_REPLIES = 3;
const FRESH_WINDOW_MS = 24 * 3600 * 1000;

const EXTRACT_TOOL = {
  name: "lead_analysis",
  description: "Structured analysis of a Mex Landscaping lead conversation.",
  input_schema: {
    type: "object",
    properties: {
      service: {
        type: "string",
        enum: [
          "landscape_design",
          "hardscaping",
          "masonry_concrete",
          "drainage",
          "retaining_wall",
          "planting_lawn",
          "maintenance",
          "snow",
          "commercial",
          "other",
          "unknown",
        ],
        description:
          "What they want. Patios/walkways/driveways/fire pits/outdoor kitchens = hardscaping. Concrete/stone/pavers = masonry_concrete. Standing water/grading/french drains = drainage. Businesses/HOAs/lots = commercial.",
      },
      project_scope: {
        type: ["string", "null"],
        description: "One short phrase describing the job as they've described it. Null if unclear.",
      },
      property_type: { type: "string", enum: ["residential", "commercial", "unknown"] },
      has_address: { type: "boolean" },
      has_phone: { type: "boolean" },
      customer_first_name: {
        type: ["string", "null"],
        description: "The customer's real name if it appears anywhere. Null if unknown.",
      },
      customer_phone: {
        type: ["string", "null"],
        description: "Their direct phone verbatim from the conversation, null if never shared.",
      },
      customer_email: {
        type: ["string", "null"],
        description: "Their email verbatim, null if never shared.",
      },
      customer_address: {
        type: ["string", "null"],
        description: "The job's street address or town if shared, null otherwise.",
      },
      customer_closed: {
        type: "boolean",
        description:
          "True if they said no, went with someone else, asked to stop, or are just exploring. On a FIRST soft deferral where we have not yet asked a diagnostic, put ONE warm diagnostic question in ask_reply instead of a goodbye. If they already deferred after a diagnostic, or closed firmly: a warm one-sentence sign-off (or empty if rude).",
      },
      awaiting_customer: {
        type: "boolean",
        description:
          "True if OUR side asked a question last and the customer has not added anything new.",
      },
      proposed_time: {
        type: ["string", "null"],
        description:
          'Any scheduling preference the customer shares: a specific day/time, a general window ("Tuesday afternoon", "mornings this week"), or just a time of day ("evenings"). Restate it verbatim. Null if they have not indicated any availability.',
      },
      missing: {
        type: "array",
        items: { type: "string" },
        description: "What we still need before booking an estimate (plain labels).",
      },
      ask_reply: {
        type: "string",
        description:
          "A short, warm reply that qualifies the job and drives to a free on-site estimate, asking ONLY for what's missing (usually the property address and best phone). First-person plural, no emojis, no em dashes, no prices, 2-4 sentences. Empty string only if no reply is warranted.",
      },
    },
    required: [
      "service",
      "property_type",
      "has_address",
      "has_phone",
      "customer_closed",
      "awaiting_customer",
      "missing",
      "ask_reply",
    ],
  },
};

const SYSTEM_PROMPT =
  "You analyze Google Local Services chat conversations for Mex Landscaping, a high-end landscape design, hardscaping, masonry, and drainage company serving the Main Line, Norristown, and Montgomery and Chester County, Pennsylvania. The owner is a Pennsylvania-licensed landscape architect and the work is done by a professional crew with premium materials and heavy-duty equipment. NEVER describe work as done 'by hand' or by one person. GOAL: every landscaping and hardscaping job is priced after a free on-site estimate, so you NEVER state, estimate, or hint at a dollar amount. Your job is to qualify the lead (what work, what property, where) and drive warmly toward booking that free on-site estimate. Ask AT MOST two short questions per message. The single most important things to get are the property address and the best phone number to reach them, so we can schedule the estimate. You also want their availability: ask which day works best for them and whether mornings, afternoons, or evenings suit them, so the team can follow up and confirm a specific time. Never offer or confirm an exact time yourself. When it fits naturally, you may mention that the owner is a licensed landscape architect, as light credibility, but do not oversell." +
  "SCHEDULING HARD RULES: you do not have access to the calendar, so NEVER confirm, accept, or lock in any time, and never claim a day or time works for us. If the customer proposes a time, restate it in proposed_time (a structured field, not the reply) and your reply should say someone from the team will confirm shortly. Never use relative words like today or tomorrow for a visit. " +
  "VOICE: any ask_reply you draft is sent to the customer verbatim in the Google chat. Warm and human, first-person plural, no emojis, NO em dashes (use commas or periods), exclamation points at most one and most messages need none, never state a price, do not repeat questions the transcript shows we already asked. Address the customer by name only if their real name appears; never use placeholders like 'LSA' or 'Potential Customer', when unknown greet with just 'Hi'. Always drive toward the concrete next step, which is booking the free on-site estimate. " +
  "CONTACT CAPTURE: we want a name, a direct phone, an email, and the job address on file. Never ask for anything already provided. Weave at most one contact ask into the reply, naturally and benefit-framed, and extract anything they share into the structured fields.";

// Build the transcript the model reads from the stored message log.
function transcriptOf(msgs) {
  return msgs
    .map((m) => `${m.direction === "in" ? "CUSTOMER" : "MEX"}: ${(m.body_text ?? "").trim()}`)
    .join("\n\n");
}

export async function maybeAutoReply(db, lead, opts = {}) {
  if (process.env.LSA_AI_AUTOREPLY === "off") return { action: "skipped", reason: "disabled" };
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { action: "skipped", reason: "no_anthropic_key" };
  if (!process.env.LSA_IMAP_USER || !process.env.LSA_IMAP_PASSWORD) {
    return { action: "skipped", reason: "mail_not_configured" };
  }
  if (lead.lead_type !== "MESSAGE") return { action: "skipped", reason: "not_message_lead" };
  if ((lead.ai_reply_count ?? 0) >= MAX_AI_REPLIES) return { action: "skipped", reason: "cap" };
  const relay = lead.reply_email || "";
  if (!/^customer-request-\d+@awexpress\.google\.com$/i.test(relay)) {
    return { action: "skipped", reason: "no_relay" };
  }

  const msgs = await db`
    SELECT direction, body_text, created_at
    FROM lead_messages WHERE lead_id = ${lead.id}
    ORDER BY created_at ASC LIMIT 50`;
  if (msgs.length === 0) return { action: "skipped", reason: "no_messages" };
  const last = msgs[msgs.length - 1];
  if (!opts.ignoreGuards) {
    if (last.direction !== "in") return { action: "skipped", reason: "we_replied_last" };
    if (Date.now() - new Date(last.created_at).getTime() > FRESH_WINDOW_MS) {
      return { action: "skipped", reason: "stale" };
    }
  }

  const knownName =
    lead.name && !/^lsa\b/i.test(lead.name) && !/^potential customer/i.test(lead.name) && !/^\+?\d/.test(lead.name)
      ? lead.name
      : null;
  const contactState = `ON FILE ALREADY: name ${knownName ?? "MISSING"}, phone ${lead.phone ? "on file" : "MISSING"}, email ${lead.email ? "on file" : "MISSING"}, address ${lead.town ? "on file" : "MISSING"}.`;

  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey });
  const resp = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    system: SYSTEM_PROMPT + " " + contactState,
    messages: [{ role: "user", content: `Analyze this conversation and call lead_analysis.\n\n${transcriptOf(msgs)}` }],
    tools: [EXTRACT_TOOL],
    tool_choice: { type: "tool", name: "lead_analysis" },
  });
  const toolUse = resp.content.find((b) => b.type === "tool_use");
  if (!toolUse) return { action: "skipped", reason: "no_analysis" };
  const a = toolUse.input;

  if (!opts.dryRun) {
    await db`UPDATE leads SET ai_summary = ${JSON.stringify(a)} WHERE id = ${lead.id}`;
    // Fill blank contact fields only; never overwrite what we already have.
    const patch = {};
    if (!knownName && cleanName(a.customer_first_name)) patch.name = cleanName(a.customer_first_name);
    if (!lead.phone && a.customer_phone) {
      const e164 = toE164(a.customer_phone);
      if (e164) patch.phone = e164;
    }
    if (!lead.email && a.customer_email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.customer_email.trim())) {
      patch.email = a.customer_email.trim().toLowerCase();
    }
    if (!lead.town && a.customer_address) patch.town = a.customer_address.slice(0, 120);
    if (patch.name) await db`UPDATE leads SET name = ${patch.name} WHERE id = ${lead.id}`;
    if (patch.phone) await db`UPDATE leads SET phone = ${patch.phone} WHERE id = ${lead.id}`;
    if (patch.email) await db`UPDATE leads SET email = ${patch.email} WHERE id = ${lead.id}`;
    if (patch.town) await db`UPDATE leads SET town = ${patch.town} WHERE id = ${lead.id}`;
  }

  // Closed by customer -> one gracious sign-off (if the model drafted one),
  // then stay quiet.
  if (a.customer_closed && !(a.ask_reply && a.ask_reply.trim())) {
    return { action: "skipped", reason: "customer_closed" };
  }

  const reply = (a.ask_reply || "").trim();
  if (!reply) return { action: "skipped", reason: "nothing_to_say" };
  if (opts.dryRun) return { action: "replied_ask", reply };

  await sendLsaReply({ to: relay, subject: lead.subject, text: reply });
  await db`
    INSERT INTO lead_messages (lead_id, direction, body_text, ext_id)
    VALUES (${lead.id}, 'out', ${reply}, ${"ai:" + lead.id + ":" + Date.now()})`;
  await db`
    UPDATE leads SET ai_reply_count = ${(lead.ai_reply_count ?? 0) + 1},
                     ai_last_replied_at = now(), status = 'contacted'
    WHERE id = ${lead.id}`;

  return { action: "replied_ask", reply, proposed_time: a.proposed_time || null };
}

function cleanName(raw) {
  const v = (raw ?? "").trim();
  if (!v || v.length > 60) return null;
  if (/[<>{}\[\]]/.test(v)) return null;
  if (/unknown|n\/a|none|null|customer|not provided|no name|anonymous/i.test(v)) return null;
  if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) return null;
  return v;
}

function toE164(raw) {
  const d = String(raw).replace(/[^\d]/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return null;
}
