import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { readLsaMailbox } from '../api/_lib/lsa-mail.js';

process.env.LSA_IMAP_USER = 'fixture@example.test';
process.env.LSA_IMAP_PASSWORD = 'test-fixture-only';
const parsed = { from: { value: [{ address: 'customer-request-123@awexpress.google.com' }] },
  subject: "Fixture's new request", text: '- Name\nFixture\n- Message\nPlease provide an estimate',
  date: new Date('2026-09-10T10:00:00Z'), messageId: '<fixture@example.test>' };

function fakeClient(overrides = {}) {
  const instances = [];
  class Client extends EventEmitter {
    constructor(options) { super(); this.options = options; this.closed = false; instances.push(this); }
    async connect() {}
    async list() { return [{ specialUse: '\\All', path: '[Gmail]/All Mail' }]; }
    async getMailboxLock(path, options) { this.path = path; this.lockOptions = options; return { release: () => { this.released = true; } }; }
    async search(query) { this.query = query; return [1]; }
    async fetchOne() { return { source: Buffer.from('fixture'), internalDate: new Date('2026-09-10T10:00:00Z') }; }
    close() { this.closed = true; }
    async messageFlagsAdd() { assert.fail('Must never change mailbox flags'); }
  }
  Object.assign(Client.prototype, overrides);
  return { Client, instances };
}

test('reads seen and unseen LSA mail, closes IMAP before parsing, and produces stable IDs', async () => {
  const { Client, instances } = fakeClient();
  const parse = async () => { assert(instances.at(-1).closed); return parsed; };
  const a = await readLsaMailbox({ Client, parse });
  const b = await readLsaMailbox({ Client, parse });
  assert.equal(a.emails[0].emailKey, b.emails[0].emailKey);
  assert.equal(a.emails[0].leadKey, 'awexpress:123');
  assert.equal(instances[0].query.seen, undefined);
  assert.equal(instances[0].query.or.length, 2);
  assert.equal(instances[0].lockOptions.readOnly, true);
  assert.equal(instances[0].path, '[Gmail]/All Mail');
  assert.equal(a.mailboxScope, 'all_mail');
  assert(instances.every(c => c.closed && c.released && c.options.disableAutoIdle));
});

test('transient connect failure retries with a fresh client', async () => {
  let calls = 0;
  const { Client, instances } = fakeClient({ async connect() { if (++calls === 1) throw Object.assign(new Error('socket'), { code: 'ETIMEOUT' }); } });
  const result = await readLsaMailbox({ Client, parse: async () => parsed, retryDelayMs: 0 });
  assert.equal(result.attempts, 2);
  assert(instances.every(c => c.closed));
});

test('unhandled error events are caught and the entire attempt is bounded', async () => {
  const { Client, instances } = fakeClient({ async search() {
    setTimeout(() => this.emit('error', Object.assign(new Error('closed'), { code: 'NoConnection' })), 1);
    return new Promise(() => {});
  } });
  await assert.rejects(readLsaMailbox({ Client, attempts: 2, retryDelayMs: 0, attemptMs: 100, parse: async () => parsed }), { code: 'NoConnection', mailStage: 'search' });
  assert.equal(instances.length, 2);
  assert(instances.every(c => c.closed));
});

test('a hung operation hits a hard deadline, without indefinite waiting', async () => {
  const { Client, instances } = fakeClient({ async connect() { return new Promise(() => {}); } });
  await assert.rejects(readLsaMailbox({ Client, attempts: 1, attemptMs: 5 }), { code: 'MAIL_DEADLINE' });
  assert(instances[0].closed);
});

test('authentication failures and oversized batches are not blindly retried', async () => {
  const auth = fakeClient({ async connect() { throw Object.assign(new Error('bad auth'), { code: 'AUTHENTICATIONFAILED' }); } });
  await assert.rejects(readLsaMailbox({ Client: auth.Client }), { code: 'AUTHENTICATIONFAILED' });
  assert.equal(auth.instances.length, 1);
  const batch = fakeClient({ async search() { return [1, 2]; } });
  await assert.rejects(readLsaMailbox({ Client: batch.Client, maxMessages: 1 }), { code: 'MAIL_BATCH_LIMIT' });
  assert.equal(batch.instances.length, 1);
});

test('messages without Message-ID get deterministic content fingerprints', async () => {
  const { Client } = fakeClient();
  const parse = async () => ({ ...parsed, messageId: undefined });
  const a = await readLsaMailbox({ Client, parse });
  const b = await readLsaMailbox({ Client, parse });
  assert.equal(a.emails[0].emailKey, b.emails[0].emailKey);
  assert(a.emails[0].emailKey.startsWith('lsa:sha256:'));
});
