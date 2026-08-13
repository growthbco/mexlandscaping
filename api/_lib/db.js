// Neon Postgres client for the mini CRM.
// DATABASE_URL is injected automatically when the Neon integration is attached
// to the Vercel project (Storage tab). Schema is created lazily on first use
// so there is no separate migration step.

import { neon } from "@neondatabase/serverless";

let schemaReady = false;

export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function ensureSchema(db) {
  if (schemaReady) return;
  await db`
    CREATE TABLE IF NOT EXISTS leads (
      id            SERIAL PRIMARY KEY,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      source        TEXT NOT NULL DEFAULT 'phone',
      name          TEXT,
      phone         TEXT,
      email         TEXT,
      town          TEXT,
      service       TEXT,
      budget        TEXT,
      timeline      TEXT,
      property_type TEXT,
      notes         TEXT,
      raw           TEXT,
      score         INTEGER,
      tier          TEXT,
      reasons       JSONB,
      status        TEXT NOT NULL DEFAULT 'new',
      sent_to_owner_at TIMESTAMPTZ,
      hl_contact_id TEXT
    )`;

  // LSA auto-reply columns (added idempotently so existing installs upgrade
  // without a migration step). lead_key is the dedupe key for a Google LSA
  // request; reply_email is the awexpress relay we answer to reach the chat.
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_key TEXT`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type TEXT`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS reply_email TEXT`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS subject TEXT`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_reply_count INTEGER NOT NULL DEFAULT 0`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_last_replied_at TIMESTAMPTZ`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_summary JSONB`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS nudge_count INTEGER NOT NULL DEFAULT 0`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_nudge_at TIMESTAMPTZ`;
  await db`ALTER TABLE leads ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ`;
  await db`CREATE UNIQUE INDEX IF NOT EXISTS leads_lead_key_uniq ON leads (lead_key) WHERE lead_key IS NOT NULL`;

  // Per-lead conversation log. ext_id dedupes on the source email Message-ID
  // so re-polling the mailbox never double-records a message.
  await db`
    CREATE TABLE IF NOT EXISTS lead_messages (
      id         SERIAL PRIMARY KEY,
      lead_id    INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      direction  TEXT NOT NULL,
      body_text  TEXT,
      ext_id     TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await db`CREATE UNIQUE INDEX IF NOT EXISTS lead_messages_ext_uniq ON lead_messages (ext_id) WHERE ext_id IS NOT NULL`;
  await db`CREATE INDEX IF NOT EXISTS lead_messages_lead_idx ON lead_messages (lead_id, created_at)`;

  schemaReady = true;
}
