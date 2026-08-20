// Inbound webhook for Google Local Services Ads lead notification emails.
//
// Flow: LSA emails the owner's inbox -> forwarding rule sends a copy to an
// inbound-email service (Resend / CloudMailin / Postmark) -> that service
// POSTs the parsed email here -> we extract the lead, score it, store it,
// notify the owner on Telegram, and upsert the contact into HighLevel with
// the "lsa-lead" tag so the speed-to-lead SMS workflow fires.
//
// Auth: shared secret in the query string (?key=LSA_WEBHOOK_SECRET) since
// inbound-email providers can only POST to a fixed URL.

import { sql, ensureSchema } from "./_lib/db.js";
import { scoreLead, tierLabel } from "./_lib/score.js";
import { upsertContact } from "./_lib/highlevel.js";
import { sendTelegram, formatLeadMessage } from "./_lib/telegram.js";

// Normalize payload shapes from common inbound-email providers into
// {subject, text}. Resend nests under data; CloudMailin uses plain;
// Postmark uses TextBody/Subject.
export function extractEmail(body) {
  const b = body || {};
  const d = b.data || b;
  const subject = d.subject || d.Subject || b.headers?.subject || "";
  let text = d.text || d.plain || d.TextBody || d["body-plain"] || "";
  if (!text && (d.html || d.HtmlBody)) {
    text = String(d.html || d.HtmlBody)
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, "\n")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&");
  }
  return { subject: String(subject), text: String(text) };
}

// Best-effort parse of Google LSA lead notification email text. The format
// shifts over time, so parse defensively and always keep the raw text.
export function parseLsaLead(subject, text) {
  const lead = { source: "lsa" };

  const phoneMatch = text.match(/\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/);
  if (phoneMatch) lead.phone = phoneMatch[0].trim();

  const grab = (patterns) => {
    for (const p of patterns) {
      const m = text.match(p);
      if (m?.[1]) return m[1].trim().replace(/\s+/g, " ").slice(0, 120);
    }
    return null;
  };

  lead.name =
    grab([/(?:customer|lead|client)\s*name\s*[:\-]\s*(.+)/i, /^name\s*[:\-]\s*(.+)/im]) ||
    // Subjects often read "New lead from Jane Smith" or "Jane Smith sent you a message".
    subject.match(/(?:lead from|message from)\s+(.{2,60})$/i)?.[1]?.trim() ||
    subject.match(/^(.{2,60}?)\s+sent you a message/i)?.[1]?.trim() ||
    null;
  lead.service = grab([/job\s*type\s*[:\-]\s*(.+)/i, /service\s*[:\-]\s*(.+)/i]);
  lead.town = grab([/(?:zip|postal)\s*code\s*[:\-]\s*(.+)/i, /location\s*[:\-]\s*(.+)/i, /city\s*[:\-]\s*(.+)/i]);
  lead.email = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/)?.[0] || null;
  // LSA notification emails come FROM google; don't store google's own address.
  if (lead.email && /google\.com$/i.test(lead.email)) lead.email = null;

  return lead;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  const secret = process.env.LSA_WEBHOOK_SECRET;
  if (!secret || req.query?.key !== secret) {
    res.status(401).json({ ok: false, error: "unauthorized" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { subject, text } = extractEmail(body);

  // Ignore non-lead LSA mail (weekly summaries, budget notices, etc.).
  const looksLikeLead = /lead|message|booking|new customer/i.test(subject + " " + text.slice(0, 400));
  if (!looksLikeLead) {
    res.status(200).json({ ok: true, skipped: "not_a_lead_email" });
    return;
  }

  const lead = parseLsaLead(subject, text);
  const { score, tier, reasons } = scoreLead(lead);
  const needsReview = !lead.phone && !lead.name;

  const db = sql();
  await ensureSchema(db);
  const rows = await db`
    INSERT INTO leads (source, name, phone, email, town, service, notes, raw, score, tier, reasons, status)
    VALUES ('lsa', ${lead.name}, ${lead.phone}, ${lead.email}, ${lead.town}, ${lead.service},
            ${needsReview ? "Parser could not extract name/phone. Check raw email." : null},
            ${(subject + "\n\n" + text).slice(0, 8000)},
            ${score}, ${tier}, ${JSON.stringify(reasons)}, 'new')
    RETURNING *`;
  const saved = rows[0];

  await sendTelegram(formatLeadMessage("New Google LSA Lead", saved, [
    "",
    `Score: ${score}/100 (${tierLabel(tier)})`,
    needsReview ? "NOTE: could not auto-parse name/phone. Check the CRM." : null,
  ].filter(Boolean)));

  // Into HighLevel so the lsa-lead tag workflow fires the speed-to-lead SMS.
  let hl = { ok: false, skipped: true };
  if (lead.phone) {
    hl = await upsertContact({ ...lead, name: lead.name || "LSA Lead" }, ["lsa-lead"]);
    if (hl.ok && hl.contactId) {
      await db`UPDATE leads SET hl_contact_id = ${hl.contactId} WHERE id = ${saved.id}`;
    }
  }

  res.status(200).json({ ok: true, id: saved.id, score, tier, highlevel: hl });
}
