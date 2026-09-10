import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { ensureSchema } from '../api/_lib/db.js';
import { ensureImportSchema, importEmail, compareMailbox, acquireImportLease, finishImportLease, jobCounts } from '../api/_lib/lsa-import.js';
import { processImportJobs, enqueueNudges } from '../api/_lib/lsa-jobs.js';
import { createHandler } from '../api/cron/ingest-lsa.js';

// Execute actual PostgreSQL SQL against an isolated in-memory database. This
// thin lazy adapter mirrors Neon's tagged queries and transaction semantics.
let pg, db;
before(async () => {
  pg = await PGlite.create();
  db = (parts, ...values) => {
    const query = parts.reduce((s, part, i) => s + (i ? '$' + i : '') + part, '');
    return { query, values, then(resolve, reject) { return pg.query(query, values).then(r => r.rows).then(resolve, reject); } };
  };
  db.transaction = (queries, options) => pg.transaction(async tx => {
    if (options?.readOnly) await tx.exec('SET TRANSACTION READ ONLY');
    const out = [];
    for (const q of queries) out.push((await tx.query(q.query, q.values)).rows);
    return out;
  });
  await ensureSchema(db);
  await ensureImportSchema(db);
});
beforeEach(async () => {
  await pg.exec('TRUNCATE lsa_mail_receipts, lsa_import_jobs, lead_messages, leads RESTART IDENTITY CASCADE');
  await pg.exec("UPDATE lsa_import_state SET lease_owner=NULL,lease_until=NULL,last_error=NULL,live_since=now(),consecutive_failures=0,failure_alerted_at=NULL");
});
after(async () => { await pg.close(); });
const email = (overrides = {}) => ({
  leadKey: 'awexpress:123', emailKey: 'lsa:<fixture-1>', requestId: '123',
  fromAddr: 'customer-request-123@awexpress.google.com', subject: "Fixture's new request",
  name: 'Fixture', phone: null, location: 'Norristown', serviceType: 'Patios',
  message: 'Please provide an estimate', isCallLead: false,
  receivedAt: new Date(Date.now() - 60_000).toISOString(), ...overrides,
});
const live = () => ({ liveSince: new Date(Date.now() - 120_000).toISOString() });

test('imports are idempotent across repeated and concurrent scans', async () => {
  const e = email();
  const results = await Promise.all([importEmail(db, e, live()), importEmail(db, e, live())]);
  assert.equal(results.reduce((n, r) => n + r.created, 0), 1);
  assert.equal(results.reduce((n, r) => n + r.imported, 0), 1);
  assert.equal((await db`SELECT count(*)::int AS n FROM leads`)[0].n, 1);
  assert.equal((await db`SELECT count(*)::int AS n FROM lead_messages`)[0].n, 1);
  assert.equal((await jobCounts(db)).pending, 3);
  assert.equal((await compareMailbox(db, [e])).missingMessages, 0);
});

test('receipt, inbound message, and deferred jobs roll back together on failure', async () => {
  await pg.exec("ALTER TABLE lead_messages ADD CONSTRAINT fixture_reject CHECK (body_text <> 'reject')");
  const e = email({ message: 'reject' });
  try { await assert.rejects(importEmail(db, e, live())); }
  finally { await pg.exec('ALTER TABLE lead_messages DROP CONSTRAINT fixture_reject'); }
  assert.equal((await db`SELECT count(*)::int AS n FROM lsa_mail_receipts`)[0].n, 0);
  assert.deepEqual(await jobCounts(db), {});
  const retried = await importEmail(db, e, live());
  assert.equal(retried.created, 0);
  assert.equal(retried.imported, 1);
  assert.equal(retried.messages, 1);
});

test('recovery and pre-activation emails never create outbound jobs', async () => {
  const e = email();
  const r = await importEmail(db, e, { ...live(), recover: true });
  assert.equal(r.recovered, true);
  assert.equal(r.queued, 0);
  await importEmail(db, email({ emailKey: 'lsa:<fixture-2>' }), { liveSince: new Date().toISOString() });
  assert.deepEqual(await jobCounts(db), {});
  const [msg] = await db`SELECT created_at FROM lead_messages WHERE ext_id=${e.emailKey}`;
  assert.equal(new Date(msg.created_at).toISOString(), e.receivedAt);
});

test('already-recorded legacy inbound messages do not produce new replies', async () => {
  const e = email();
  await importEmail(db, e, { ...live(), recover: true });
  await db`DELETE FROM lsa_mail_receipts WHERE email_key=${e.emailKey}`;
  const r = await importEmail(db, e, live());
  assert.equal(r.messages, 0);
  assert.equal(r.queued, 0);
});

test('historical messages do not replace newer lead summaries or reopen archives', async () => {
  const newer = email();
  await importEmail(db, newer, live());
  await db`UPDATE leads SET archived_at=now(), status='closed' WHERE lead_key=${newer.leadKey}`;
  await importEmail(db, email({ emailKey: 'lsa:<older>', message: 'Old question', receivedAt: new Date(Date.now() - 86_400_000).toISOString() }), { ...live(), recover: true });
  const [lead] = await db`SELECT message,status,archived_at FROM leads`;
  assert.equal(lead.message, newer.message);
  assert.equal(lead.status, 'closed');
  assert(lead.archived_at);
});

test('distributed lease prevents overlapping imports and releases only for its owner', async () => {
  const first = await acquireImportLease(db);
  assert(first);
  assert.equal(await acquireImportLease(db), null);
  await finishImportLease(db, { owner: 'wrong-owner' }, {});
  assert.equal(await acquireImportLease(db), null);
  await finishImportLease(db, first, { passed: true });
  assert(await acquireImportLease(db));
});

test('old conversations cannot restart historical nudges after recovery', async () => {
  await importEmail(db, email({ receivedAt: new Date(Date.now() - 4 * 3_600_000).toISOString() }), { ...live(), recover: true });
  await db`INSERT INTO lead_messages (lead_id,direction,body_text,ext_id,created_at)
    SELECT id,'out','Old reply','fixture-out',now()-interval '2 hours' FROM leads`;
  await enqueueNudges(db);
  assert.deepEqual(await jobCounts(db), {});
  await db`UPDATE lsa_import_state SET live_since=now()-interval '3 hours' WHERE name='mailbox'`;
  await enqueueNudges(db);
  await enqueueNudges(db);
  assert.equal((await jobCounts(db)).pending, 1);
  await db`UPDATE lsa_import_state SET live_since=now() WHERE name='mailbox'`;
});

test('ambiguous customer-send outcomes are held for review, never auto-retried', async () => {
  await importEmail(db, email(), live());
  let sends = 0;
  const effects = {
    sendTelegram: async () => ({ ok: true }),
    maybeAutoReply: async (_db, _lead, opts) => {
      await opts.beforeSend(); sends++;
      throw Object.assign(new Error('uncertain SMTP result'), { code: 'ETIMEOUT' });
    },
  };
  await processImportJobs(db, { effects });
  await processImportJobs(db, { effects });
  assert.equal(sends, 1);
  assert.equal((await jobCounts(db)).review, 1);
});

test('pre-send failures are deferred for bounded retry', async () => {
  await importEmail(db, email(), live());
  const effects = { sendTelegram: async () => ({ ok: true }), maybeAutoReply: async () => { throw new Error('analysis unavailable'); } };
  await processImportJobs(db, { effects });
  const [job] = await db`SELECT status,attempts,available_at FROM lsa_import_jobs WHERE kind='reply'`;
  assert.equal(job.status, 'pending');
  assert.equal(job.attempts, 1);
  assert(new Date(job.available_at).getTime() > Date.now());
});

const response = () => ({ code: 0, body: null, setHeader() {}, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } });
const request = (query = {}, method = 'GET') => ({ method, headers: { authorization: 'Bearer test-cron-secret' }, query });
process.env.CRON_SECRET = 'test-cron-secret';

test('audit and legacy dry modes perform zero writes or external sends', async () => {
  for (const query of [{ mode: 'audit' }, { dry: '1' }]) {
    const forbidden = async () => assert.fail('Audit attempted a mutation');
    const handler = createHandler({ sql: () => db, readLsaMailbox: async () => ({ emails: [], matched: 0 }),
      ensureSchema: forbidden, ensureImportSchema: forbidden, acquireImportLease: forbidden,
      importEmail: forbidden, enqueueNudges: forbidden, processImportJobs: forbidden });
    const res = response(); await handler(request(query), res);
    assert.equal(res.code, 200);
    assert.equal(res.body.mode, 'audit');
  }
});

test('recovery never drains jobs or generates nudges, including future-dated email', async () => {
  const forbidden = async () => assert.fail('Recovery attempted outbound automation');
  const handler = createHandler({ sql: () => db, readLsaMailbox: async () => ({ emails: [email({ receivedAt: new Date(Date.now() + 1000).toISOString() })] }),
    enqueueNudges: forbidden, processImportJobs: forbidden });
  const res = response(); await handler(request({ mode: 'recover', confirm: 'recover_without_sending' }, 'POST'), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.queued, 0);
});

test('unauthorized requests and unsafe recovery/force-send requests fail closed', async () => {
  const handler = createHandler({ sql: () => assert.fail('Unauthorized DB access') });
  const unauthorized = response(); await handler({ method: 'GET', query: {}, headers: {} }, unauthorized);
  assert.equal(unauthorized.code, 401);
  const recovery = response(); await handler(request({ mode: 'recover' }), recovery);
  assert.equal(recovery.code, 400);
  const force = response(); await handler(request({ send: '1' }), force);
  assert.equal(force.code, 400);
});

test('mailbox failures return non-success status and release the poll lease', async () => {
  const handler = createHandler({ sql: () => db, readLsaMailbox: async () => { throw Object.assign(new Error('socket'), { code: 'ETIMEOUT' }); } });
  const res = response(); await handler(request(), res);
  assert.equal(res.code, 503);
  assert.equal(res.body.error, 'ETIMEOUT');
  assert(await acquireImportLease(db));
});
