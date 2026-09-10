// Daily Vercel cron + existing GitHub minute poller. Authentication required.
// audit / dry=1: READ ONLY (no schema writes, flags, AI, alerts, or CRM sync).
// recover: import history only; never enqueue or drain customer/owner messages.
import { timingSafeEqual } from "node:crypto";
import { sql, ensureSchema } from "../_lib/db.js";
import { readLsaMailbox, mailErrorCode } from "../_lib/lsa-mail.js";
import { ensureImportSchema, acquireImportLease, finishImportLease, compareMailbox, importEmail, jobCounts } from "../_lib/lsa-import.js";
import { enqueueNudges, processImportJobs, notifyImportFailure } from "../_lib/lsa-jobs.js";

export function authorized(req) {
  const secret = process.env.CRON_SECRET;
  const supplied = req.headers?.authorization?.replace(/^Bearer /, "") || req.query?.key;
  if (!secret || typeof supplied !== "string") return false;
  const expected = Buffer.from(secret), actual = Buffer.from(supplied);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createHandler(overrides = {}) {
  const deps = { sql, ensureSchema, readLsaMailbox, ensureImportSchema, acquireImportLease,
    finishImportLease, compareMailbox, importEmail, jobCounts, enqueueNudges, processImportJobs, notifyImportFailure, ...overrides };
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (!authorized(req)) return res.status(401).json({ ok: false, error: "unauthorized" });
    if (!["GET", "POST"].includes(req.method)) return res.status(405).json({ ok: false, error: "method_not_allowed" });
    const mode = req.query?.dry === "1" ? "audit" : (req.query?.mode || "poll");
    if (!["audit", "recover", "poll", "health"].includes(mode) || req.query?.send) {
      return res.status(400).json({ ok: false, error: "unsupported_mode" });
    }
    if (mode === "recover" && (req.method !== "POST" || req.query?.confirm !== "recover_without_sending")) {
      return res.status(400).json({ ok: false, error: "recovery_requires_explicit_post" });
    }
    const started = Date.now();
    let db, lease;
    const result = { mode, created: 0, imported: 0, messages: 0, recovered: 0, queued: 0 };
    try {
      db = deps.sql();
      if (mode === "health") {
        const [state] = await db`SELECT live_since, last_success, last_error, last_result, consecutive_failures, failure_alerted_at,
          lease_until FROM lsa_import_state WHERE name='mailbox'`;
        return res.status(200).json({ ok: true, state, jobs: await deps.jobCounts(db) });
      }
      if (mode !== "audit") {
        await deps.ensureSchema(db);
        await deps.ensureImportSchema(db);
        lease = await deps.acquireImportLease(db);
        if (!lease) return res.status(200).json({ ok: true, skipped: "already_running" });
      }
      const { emails, ...mail } = await deps.readLsaMailbox();
      result.mail = mail;
      if (mode === "audit") {
        return res.status(200).json({ ok: true, mode, mail, comparison: await deps.compareMailbox(db, emails) });
      }
      const comparison = await deps.compareMailbox(db, emails);
      if (comparison.potentialLegacyMatches) {
        throw Object.assign(new Error("Legacy leads need exact matching before recovery"), { code: "LEGACY_MATCH_REVIEW" });
      }
      for (const email of emails) {
        if (Date.now() - started > 150_000) throw Object.assign(new Error("Import deadline"), { code: "IMPORT_DEADLINE" });
        const imported = await deps.importEmail(db, email, { recover: mode === "recover", liveSince: lease.liveSince });
        for (const key of ["created", "imported", "messages", "queued"]) result[key] += imported[key];
        result.recovered += Number(imported.recovered);
      }
      if (mode === "poll") {
        await deps.enqueueNudges(db);
        result.jobsProcessed = await deps.processImportJobs(db, { deadline: started + 180_000 });
      }
      result.jobs = await deps.jobCounts(db);
      result.durationMs = Date.now() - started;
      const jobError = result.jobs.review ? "JOBS_NEED_REVIEW" : (result.jobs.retryPending ? "JOBS_RETRY_PENDING" : null);
      await deps.finishImportLease(db, lease, result, jobError);
      lease = null;
      if (jobError && mode === 'poll') await deps.notifyImportFailure(db);
      console.info(JSON.stringify({ event: "lsa_import", ok: !jobError, ...result }));
      return res.status(jobError ? 503 : 200).json({ ok: !jobError, ...result, ...(jobError ? { error: jobError } : {}) });
    } catch (error) {
      const code = mailErrorCode(error);
      console.error(JSON.stringify({ event: "lsa_import_failed", mode, code, stage: error.mailStage || "import", durationMs: Date.now() - started }));
      if (lease) {
        try { await deps.finishImportLease(db, lease, result, code); } catch {}
        if (mode === 'poll') { try { await deps.notifyImportFailure(db); } catch {} }
      }
      return res.status(503).json({ ok: false, mode, error: code, stage: error.mailStage || "import" });
    }
  };
}

export default createHandler();
