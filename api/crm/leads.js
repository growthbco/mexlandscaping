// CRM leads endpoint.
// GET  ?status=&source=&q=   -> list (newest first, max 200)
// POST {lead fields}         -> create (score computed server-side)
// PATCH {id, ...fields}      -> update; re-scores if scoring inputs changed

import { sql, ensureSchema } from "../_lib/db.js";
import { requireAuth } from "../_lib/auth.js";
import { scoreLead } from "../_lib/score.js";

const EDITABLE = [
  "name", "phone", "email", "town", "service", "budget",
  "timeline", "property_type", "notes", "status",
];
const SCORING_FIELDS = ["service", "budget", "timeline", "town", "phone", "email", "property_type"];

function parseBody(req) {
  let data = req.body;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch { data = {}; }
  }
  return data || {};
}

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;

  const db = sql();
  await ensureSchema(db);

  try {
    if (req.method === "GET") {
      const { status, source, q } = req.query || {};
      const like = q ? `%${q}%` : null;
      const rows = await db`
        SELECT * FROM leads
        WHERE (${status || null}::text IS NULL OR status = ${status || null})
          AND (${source || null}::text IS NULL OR source = ${source || null})
          AND (${like}::text IS NULL OR name ILIKE ${like} OR phone ILIKE ${like} OR town ILIKE ${like} OR service ILIKE ${like})
        ORDER BY created_at DESC
        LIMIT 200`;
      res.status(200).json({ ok: true, leads: rows });
      return;
    }

    if (req.method === "POST") {
      const data = parseBody(req);
      if (!data.name && !data.phone) {
        res.status(400).json({ ok: false, error: "need_name_or_phone" });
        return;
      }
      const { score, tier, reasons } = scoreLead(data);
      const rows = await db`
        INSERT INTO leads (source, name, phone, email, town, service, budget, timeline, property_type, notes, score, tier, reasons)
        VALUES (${data.source || "phone"}, ${data.name || null}, ${data.phone || null},
                ${data.email || null}, ${data.town || null}, ${data.service || null},
                ${data.budget || null}, ${data.timeline || null}, ${data.property_type || null},
                ${data.notes || null}, ${score}, ${tier}, ${JSON.stringify(reasons)})
        RETURNING *`;
      res.status(200).json({ ok: true, lead: rows[0] });
      return;
    }

    if (req.method === "PATCH") {
      const data = parseBody(req);
      const id = Number(data.id);
      if (!id) {
        res.status(400).json({ ok: false, error: "missing_id" });
        return;
      }
      const existing = await db`SELECT * FROM leads WHERE id = ${id}`;
      if (!existing.length) {
        res.status(404).json({ ok: false, error: "not_found" });
        return;
      }
      const merged = { ...existing[0] };
      for (const f of EDITABLE) if (f in data) merged[f] = data[f];
      if (SCORING_FIELDS.some((f) => f in data)) {
        const { score, tier, reasons } = scoreLead(merged);
        merged.score = score;
        merged.tier = tier;
        merged.reasons = reasons;
      }
      const rows = await db`
        UPDATE leads SET
          name = ${merged.name}, phone = ${merged.phone}, email = ${merged.email},
          town = ${merged.town}, service = ${merged.service}, budget = ${merged.budget},
          timeline = ${merged.timeline}, property_type = ${merged.property_type},
          notes = ${merged.notes}, status = ${merged.status},
          score = ${merged.score}, tier = ${merged.tier},
          reasons = ${JSON.stringify(merged.reasons)}
        WHERE id = ${id}
        RETURNING *`;
      res.status(200).json({ ok: true, lead: rows[0] });
      return;
    }

    res.status(405).json({ ok: false, error: "method_not_allowed" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "db_error", detail: String(e?.message || e) });
  }
}
