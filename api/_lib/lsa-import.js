import { randomUUID } from "node:crypto";
import { scoreLead } from "./score.js";

// Additive schema only: no existing leads, messages, or mailbox flags removed.
export async function ensureImportSchema(db) {
  await db`CREATE TABLE IF NOT EXISTS lsa_import_state (
    name TEXT PRIMARY KEY, live_since TIMESTAMPTZ NOT NULL DEFAULT now(),
    lease_owner TEXT, lease_until TIMESTAMPTZ, last_success TIMESTAMPTZ,
    last_error TEXT, last_result JSONB, consecutive_failures INTEGER NOT NULL DEFAULT 0,
    failure_alerted_at TIMESTAMPTZ
  )`;
  await db`INSERT INTO lsa_import_state (name) VALUES ('mailbox') ON CONFLICT DO NOTHING`;
  await db`CREATE TABLE IF NOT EXISTS lsa_mail_receipts (
    email_key TEXT PRIMARY KEY, lead_id INTEGER NOT NULL REFERENCES leads(id),
    received_at TIMESTAMPTZ NOT NULL, imported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    recovered BOOLEAN NOT NULL
  )`;
  await db`CREATE TABLE IF NOT EXISTS lsa_import_jobs (
    id BIGSERIAL PRIMARY KEY, job_key TEXT UNIQUE NOT NULL,
    lead_id INTEGER NOT NULL REFERENCES leads(id), kind TEXT NOT NULL,
    payload JSONB NOT NULL, status TEXT NOT NULL DEFAULT 'pending',
    attempts INTEGER NOT NULL DEFAULT 0, available_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), last_error TEXT
  )`;
  await db`CREATE INDEX IF NOT EXISTS lsa_import_jobs_pending ON lsa_import_jobs (status, available_at)`;
}

// Protect the entire poll (including replies) across both schedulers/instances.
// Lease exceeds the 240-second function deadline. Never use a session advisory
// lock with Neon's stateless HTTP queries.
export async function acquireImportLease(db) {
  const owner = randomUUID();
  const rows = await db`UPDATE lsa_import_state
    SET lease_owner=${owner}, lease_until=now() + interval '5 minutes'
    WHERE name='mailbox' AND (lease_until IS NULL OR lease_until < now())
    RETURNING live_since`;
  return rows.length ? { owner, liveSince: rows[0].live_since } : null;
}

export async function finishImportLease(db, lease, result, error = null) {
  await db`UPDATE lsa_import_state SET lease_owner=NULL, lease_until=NULL,
    last_success=CASE WHEN ${error}::text IS NULL THEN now() ELSE last_success END,
    consecutive_failures=CASE WHEN ${error}::text IS NULL THEN 0 ELSE consecutive_failures+1 END,
    failure_alerted_at=CASE WHEN ${error}::text IS NULL THEN NULL ELSE failure_alerted_at END,
    last_error=${error}, last_result=${JSON.stringify(result)}
    WHERE name='mailbox' AND lease_owner=${lease.owner}`;
}

export function automationAllowed(email, { recover = false, liveSince, now = Date.now() }) {
  const received = new Date(email.receivedAt).getTime();
  return !recover && Number.isFinite(received) && received >= new Date(liveSince).getTime()
    && received <= now + 300_000 && now - received < 48 * 3_600_000;
}

export async function compareMailbox(db, emails) {
  const keys = [...new Set(emails.map((email) => email.leadKey))];
  const ids = emails.map((email) => email.emailKey);
  const [leads, messages, legacy] = await db.transaction([
    db`SELECT id, lead_key FROM leads WHERE lead_key=ANY(${keys}::text[])`,
    db`SELECT ext_id FROM lead_messages WHERE ext_id=ANY(${ids}::text[])`,
    db`SELECT COALESCE(subject, split_part(raw, E'\n', 1)) AS subject FROM leads WHERE source='lsa' AND lead_key IS NULL`,
  ], { readOnly: true });
  const known = new Set(leads.map((lead) => lead.lead_key));
  const recorded = new Set(messages.map((message) => message.ext_id));
  return {
    matchedEmails: emails.length, distinctLeads: keys.length,
    missingLeads: keys.filter((key) => !known.has(key)).length,
    missingMessages: emails.filter((email) => email.message?.trim() && !recorded.has(email.emailKey)).length,
    unkeyedLegacyLeads: legacy.length,
    potentialLegacyMatches: emails.filter((email) => !known.has(email.leadKey)
      && legacy.some((lead) => lead.subject === email.subject)).length,
  };
}

export async function importEmail(db, email, options) {
  const automated = automationAllowed(email, options);
  const body = email.message?.trim() || "";
  const { score, tier, reasons } = scoreLead({ source: "lsa", name: email.name, phone: email.phone, town: email.location, service: email.serviceType });
  // Transaction 1 creates/adopts the stable Google request identity. Transaction
  // 2 atomically commits receipt + message + deferred work. If either fails, the
  // email stays eligible for the next scan without creating another lead.
  const rows = await db`INSERT INTO leads
    (source, lead_key, lead_type, reply_email, subject, name, phone, town, service,
     message, raw, score, tier, reasons, status, created_at, notes)
    VALUES ('lsa', ${email.leadKey}, ${email.isCallLead ? "PHONE_CALL" : "MESSAGE"},
      ${email.requestId ? email.fromAddr : null}, ${email.subject}, ${email.name},
      ${email.phone}, ${email.location}, ${email.serviceType}, ${body},
      ${(email.subject + "\n\n" + body).slice(0, 8000)}, ${score}, ${tier}, ${JSON.stringify(reasons)},
      'new', ${email.receivedAt}, ${automated ? null : "Recovered from LSA email; no automated messages sent."})
    ON CONFLICT (lead_key) WHERE lead_key IS NOT NULL DO NOTHING RETURNING id`;

  const result = await db`WITH receipt AS (
    INSERT INTO lsa_mail_receipts (email_key, lead_id, received_at, recovered)
    SELECT ${email.emailKey}, id, ${email.receivedAt}::timestamptz, ${!automated}
    FROM leads WHERE lead_key=${email.leadKey}
    ON CONFLICT DO NOTHING RETURNING *
  ), message AS (
    INSERT INTO lead_messages (lead_id, direction, body_text, ext_id, created_at)
    SELECT lead_id, 'in', ${body}, email_key, received_at FROM receipt WHERE ${body} <> ''
    ON CONFLICT (ext_id) DO NOTHING RETURNING lead_id
  ), jobs AS (
    INSERT INTO lsa_import_jobs (job_key, lead_id, kind, payload)
    SELECT r.email_key || ':' || k.kind, r.lead_id, k.kind,
      jsonb_build_object('emailKey', r.email_key)
    FROM receipt r CROSS JOIN (VALUES ('owner'), ('highlevel'), ('reply')) k(kind)
    WHERE ${automated} AND (EXISTS (SELECT 1 FROM message) OR ${email.isCallLead})
      AND (k.kind <> 'reply' OR EXISTS (SELECT 1 FROM message))
    ON CONFLICT DO NOTHING RETURNING id
  ), refreshed AS (
    UPDATE leads l SET message=${body}, status='new', archived_at=NULL,
      phone=COALESCE(l.phone, ${email.phone})
    WHERE l.id IN (SELECT lead_id FROM message) AND ${automated}
      AND NOT EXISTS (SELECT 1 FROM lead_messages m WHERE m.lead_id=l.id
        AND m.created_at > ${email.receivedAt}::timestamptz)
    RETURNING id
  ) SELECT (SELECT count(*)::int FROM receipt) AS imported,
    (SELECT count(*)::int FROM message) AS messages,
    (SELECT count(*)::int FROM jobs) AS queued`;
  return { created: rows.length, ...result[0], recovered: !automated && result[0].imported === 1 };
}

export async function jobCounts(db) {
  const rows = await db`SELECT status, count(*)::int AS count,
    count(*) FILTER (WHERE attempts>0)::int AS retried FROM lsa_import_jobs GROUP BY status`;
  const counts = Object.fromEntries(rows.map((row) => [row.status, row.count]));
  const retryPending = rows.find((row) => row.status === 'pending')?.retried;
  if (retryPending) counts.retryPending = retryPending;
  return counts;
}
