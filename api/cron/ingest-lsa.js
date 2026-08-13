// Cron: poll the Google LSA mailbox, ingest each lead, AI-answer new customer
// messages, and run the silent-lead nudge ladder.
//
// Scheduled from vercel.json (every minute on Vercel Pro). Vercel sends
// `Authorization: Bearer $CRON_SECRET`; an external minute-pinger can instead
// call `/api/cron/ingest-lsa/?key=$CRON_SECRET`.
//
// Required env: DATABASE_URL, LSA_IMAP_USER, LSA_IMAP_PASSWORD, ANTHROPIC_API_KEY,
// CRON_SECRET. Optional: TELEGRAM_* and HIGHLEVEL_* (reused from the CRM).

import { sql, ensureSchema } from "../_lib/db.js";
import { processLsaMailbox, sendLsaReply } from "../_lib/lsa-mail.js";
import { maybeAutoReply } from "../_lib/lsa-autoreply.js";
import { scoreLead, tierLabel } from "../_lib/score.js";
import { upsertContact } from "../_lib/highlevel.js";
import { sendTelegram, formatLeadMessage } from "../_lib/telegram.js";

const NUDGE_DELAYS_MS = [30 * 60 * 1000, 3 * 3600 * 1000, 24 * 3600 * 1000];

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (req.headers?.authorization === `Bearer ${secret}`) return true;
  if (req.query?.key === secret) return true;
  return false;
}

export default async function handler(req, res) {
  if (!authorized(req)) {
    res.status(401).json({ ok: false, error: "unauthorized" });
    return;
  }

  // Preview mode: ingest and compose AI drafts but SEND nothing. Use
  // /api/cron/ingest-lsa/?key=SECRET&dry=1 to review replies before going live.
  const dry = req.query?.dry === "1";

  const db = sql();
  await ensureSchema(db);

  const touched = new Set(); // lead ids that gained a customer message this pass
  let created = 0;
  let duplicates = 0;

  const mailResult = await processLsaMailbox(async (email) => {
    const key = email.requestId
      ? `awexpress:${email.requestId}`
      : `email:${email.messageId || email.date || Math.random()}`;

    const existing = await db`SELECT * FROM leads WHERE lead_key = ${key} LIMIT 1`;

    if (existing.length === 0) {
      const lead = {
        source: "lsa",
        name: email.name,
        phone: email.phone,
        town: email.location,
        service: email.serviceType,
      };
      const { score, tier, reasons } = scoreLead(lead);
      const rows = await db`
        INSERT INTO leads (source, lead_key, lead_type, reply_email, subject, name, phone, town, service, message, raw, score, tier, reasons, status)
        VALUES ('lsa', ${key}, ${email.isCallLead ? "PHONE_CALL" : "MESSAGE"},
                ${email.requestId ? email.fromAddr : null}, ${email.subject},
                ${email.name}, ${email.phone}, ${email.location}, ${email.serviceType},
                ${email.message}, ${(email.subject + "\n\n" + (email.message || "")).slice(0, 8000)},
                ${score}, ${tier}, ${JSON.stringify(reasons)}, 'new')
        RETURNING *`;
      const saved = rows[0];
      created++;

      if (email.message?.trim()) {
        await db`
          INSERT INTO lead_messages (lead_id, direction, body_text, ext_id)
          VALUES (${saved.id}, 'in', ${email.message.trim()}, ${"lsa:" + (email.messageId || key)})
          ON CONFLICT (ext_id) DO NOTHING`;
      }
      if (saved.lead_type === "MESSAGE") touched.add(saved.id);

      // Owner alert + HighLevel sync (best-effort; never block ingest).
      try {
        await sendTelegram(
          formatLeadMessage("New Google LSA Lead", saved, [
            "",
            `Score: ${score}/100 (${tierLabel(tier)})`,
            email.isCallLead ? "Type: phone call" : "Type: message (AI will auto-reply)",
          ]),
        );
      } catch {}
      if (email.phone) {
        try {
          const hl = await upsertContact({ ...lead, name: lead.name || "LSA Lead" }, ["lsa-lead"]);
          if (hl.ok && hl.contactId) {
            await db`UPDATE leads SET hl_contact_id = ${hl.contactId} WHERE id = ${saved.id}`;
          }
        } catch {}
      }
    } else {
      // Follow-up on an existing lead: log the new customer message (deduped
      // on the email Message-ID) and resurface the lead.
      duplicates++;
      const lead = existing[0];
      if (email.message?.trim()) {
        const ins = await db`
          INSERT INTO lead_messages (lead_id, direction, body_text, ext_id)
          VALUES (${lead.id}, 'in', ${email.message.trim()}, ${"lsa:" + (email.messageId || key + ":" + Date.now())})
          ON CONFLICT (ext_id) DO NOTHING
          RETURNING id`;
        if (ins.length > 0) {
          await db`UPDATE leads SET message = ${email.message.trim()}, status = 'new', archived_at = NULL WHERE id = ${lead.id}`;
          if (!lead.phone && email.phone) {
            await db`UPDATE leads SET phone = ${email.phone} WHERE id = ${lead.id}`;
          }
          if (lead.lead_type === "MESSAGE") touched.add(lead.id);
        }
      }
    }
  });

  // AI first-touch for every conversation that gained a customer message.
  const ai = {};
  let aiSends = 0;
  for (const id of touched) {
    if (aiSends >= 5) break;
    try {
      const rows = await db`SELECT * FROM leads WHERE id = ${id} LIMIT 1`;
      if (rows.length === 0) continue;
      const r = await maybeAutoReply(db, rows[0], dry ? { dryRun: true } : {});
      ai[id] = dry
        ? { action: r.action, reason: r.reason || null, draft: r.reply || null }
        : r.action + (r.reason ? `:${r.reason}` : "");
      if (r.action !== "skipped") aiSends++;
      if (r.proposed_time) {
        try {
          await sendTelegram(
            `LSA lead #${id} proposed a time: ${r.proposed_time}. The AI said the team will confirm. Reply in the CRM to lock it in.`,
          );
        } catch {}
      }
    } catch (e) {
      ai[id] = `error:${(e.message || e).toString().slice(0, 120)}`;
    }
  }

  // Preview mode stops here: no nudges, nothing sent.
  if (dry) {
    res.status(200).json({ ok: true, dry: true, mail: mailResult, created, duplicates, ai });
    return;
  }

  // Silent-lead nudge ladder: we replied, they went quiet. 30m / 3h / 24h,
  // three touches max, measured from our last outbound message.
  const nudges = [];
  let nudgesSent = 0;
  try {
    const cands = await db`
      SELECT * FROM leads
      WHERE source = 'lsa' AND lead_type = 'MESSAGE'
        AND nudge_count < 3 AND archived_at IS NULL
        AND reply_email ~ '^customer-request-[0-9]+@awexpress\\.google\\.com$'
      ORDER BY id DESC LIMIT 100`;
    for (const lead of cands) {
      if (nudgesSent >= 5) break;
      if (lead.ai_summary?.customer_closed) continue;
      const lastRows = await db`
        SELECT direction, created_at FROM lead_messages
        WHERE lead_id = ${lead.id} ORDER BY created_at DESC LIMIT 1`;
      const lastMsg = lastRows[0];
      if (!lastMsg || lastMsg.direction !== "out") continue;
      const silenceMs = Date.now() - new Date(lastMsg.created_at).getTime();
      if (silenceMs <= NUDGE_DELAYS_MS[lead.nudge_count]) continue;

      const first = (lead.name || "").trim().split(/\s+/)[0] || "";
      const real =
        /^[A-Za-z][A-Za-z'-]{1,29}$/.test(first) &&
        !/^(lsa|unknown|potential|customer|none|null|lead|client|test)$/i.test(first);
      const greet = real ? `Hi ${first}` : "Hi";
      const bodies = [
        `${greet}, just making sure my last message came through. Whenever you are ready, we would love to set up your free estimate.`,
        `${greet}, just checking back in from Mex Landscaping. Happy to answer any questions or get your free on-site estimate on the calendar whenever works for you.`,
        `${greet}, it is Mex Landscaping with one last note, we do not want to crowd your inbox. If you would still like that free estimate we are here anytime. Thank you.`,
      ];
      const body = bodies[Math.min(lead.nudge_count, 2)];
      try {
        await sendLsaReply({ to: lead.reply_email, subject: lead.subject, text: body });
        await db`
          INSERT INTO lead_messages (lead_id, direction, body_text, ext_id)
          VALUES (${lead.id}, 'out', ${body}, ${"nudge:" + lead.id + ":" + (lead.nudge_count + 1)})
          ON CONFLICT (ext_id) DO NOTHING`;
        await db`UPDATE leads SET nudge_count = ${lead.nudge_count + 1}, last_nudge_at = now() WHERE id = ${lead.id}`;
        nudgesSent++;
        nudges.push(`${lead.id}:${lead.nudge_count + 1}`);
      } catch (e) {
        nudges.push(`error:${(e.message || e).toString().slice(0, 80)}`);
      }
    }
  } catch (e) {
    nudges.push(`sweep_error:${(e.message || e).toString().slice(0, 80)}`);
  }

  res.status(200).json({ ok: true, mail: mailResult, created, duplicates, ai, nudges });
}
