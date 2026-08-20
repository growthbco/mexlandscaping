// Push a lead to the owner: Telegram message (same bot as the website form),
// optionally also create the contact in HighLevel.
// POST {id, addToHighLevel?: boolean}

import { sql, ensureSchema } from "../_lib/db.js";
import { requireAuth } from "../_lib/auth.js";
import { tierLabel } from "../_lib/score.js";
import { upsertContact } from "../_lib/highlevel.js";
import { sendTelegram, formatLeadMessage } from "../_lib/telegram.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  if (!requireAuth(req, res)) return;

  let data = req.body;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch { data = {}; }
  }
  const id = Number(data?.id);
  if (!id) {
    res.status(400).json({ ok: false, error: "missing_id" });
    return;
  }

  const db = sql();
  await ensureSchema(db);
  const rows = await db`SELECT * FROM leads WHERE id = ${id}`;
  if (!rows.length) {
    res.status(404).json({ ok: false, error: "not_found" });
    return;
  }
  const lead = rows[0];

  const sourceLabel =
    lead.source === "lsa" ? "Google LSA" :
    lead.source === "phone" ? "Phone call" : lead.source;
  const text = formatLeadMessage(`Lead for you (${sourceLabel})`, lead, [
    "",
    `Score: ${lead.score}/100 (${tierLabel(lead.tier)})`,
  ]);
  const tg = await sendTelegram(text);

  let hl = { ok: false, skipped: true };
  if (data.addToHighLevel) {
    hl = await upsertContact(lead, ["crm-lead"]);
    if (hl.ok && hl.contactId) {
      await db`UPDATE leads SET hl_contact_id = ${hl.contactId} WHERE id = ${id}`;
    }
  }

  const updated = await db`
    UPDATE leads SET status = 'sent_to_owner', sent_to_owner_at = now()
    WHERE id = ${id} RETURNING *`;

  res.status(200).json({ ok: tg.ok, telegram: tg, highlevel: hl, lead: updated[0] });
}
