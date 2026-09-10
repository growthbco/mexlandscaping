// Google Local Services Ads mailbox layer.
//
// LSA "Message" lead notifications arrive from
//   customer-request-<id>@awexpress.google.com   (subject "<Name>'s new request")
// and — this is the whole trick — REPLYING to that address by email delivers
// your message straight into the customer's LSA chat. "Call" leads arrive from
//   localservices-noreply@google.com             (subject "New call ...").
//
// We poll the mailbox over IMAP (Gmail: address + App Password) and answer with
// SMTP. Env (the cron no-ops until these are set):
//   LSA_IMAP_USER / LSA_IMAP_PASSWORD  Gmail address + App Password
//   LSA_IMAP_HOST                      defaults to imap.gmail.com

import { createHash } from "node:crypto";

const IMAP_HOST = () => process.env.LSA_IMAP_HOST || "imap.gmail.com";

export function mailErrorCode(error) {
  // Never put server responses, addresses, passwords, or email bodies in logs.
  return String(error?.code || error?.serverResponseCode || "MAIL_FAILED")
    .replace(/[^a-zA-Z0-9_]/g, "").slice(0, 60);
}

// Pull one lead notification's fields out of a parsed mail object.
export function parseLsaEmail(mail) {
  const fromAddr = mail.from?.value?.[0]?.address ?? "";
  const subject = mail.subject ?? "";
  const requestId = fromAddr.match(/^customer-request-(\d+)@awexpress\.google\.com$/i)?.[1] || null;
  const isCallLead =
    /^localservices-noreply@google\.com$/i.test(fromAddr) && /new call/i.test(subject);

  const text = (mail.text || mail.html || "").toString();
  // Body is section-style: "- Name\nJane Doe\n- Location\nNorristown ..."
  const section = (label) => {
    const m = text.match(
      new RegExp(`-\\s*${label}\\s*\\n+([^\\n][\\s\\S]*?)(?=\\n\\s*-\\s|\\n\\s*To connect|$)`, "i"),
    );
    return m?.[1]?.trim() || null;
  };

  const name =
    section("Name") ??
    subject.match(/^(.+?)'s new request/i)?.[1]?.trim() ??
    text.match(/\n\s*(.+?) sent you a message/i)?.[1]?.trim() ??
    null;
  // Initial requests carry a "- Message" section; chat follow-ups read
  // "<Name> sent you a message\n\n<body>\n\nTo connect...".
  const message =
    section("Message") ??
    text.match(/sent you a message\s*\n+([\s\S]*?)(?=\n\s*To connect|$)/i)?.[1]?.trim() ??
    null;
  const serviceType = section("Service type");
  const location = section("Location");
  // Only scan the customer's own message for a phone — the raw email carries
  // Google's "Customer ID: 183-825-9293", which must never be captured.
  const phone = (message ?? "").match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0] ?? null;

  return {
    fromAddr,
    subject,
    requestId,
    isCallLead,
    name: name && !/^potential customer$/i.test(name) ? name : null,
    message,
    serviceType,
    location,
    phone,
    messageId: mail.messageId || null,
    date: mail.date?.toISOString() ?? null,
  };
}

// Fetch a bounded, read-only snapshot and CLOSE IMAP before database/API work.
// Read/unread flags are user state, not an ingestion checkpoint. Durable email
// receipts in lsa-import.js handle deduplication instead.
export async function readLsaMailbox(options = {}) {
  const user = process.env.LSA_IMAP_USER;
  const pass = process.env.LSA_IMAP_PASSWORD;
  if (!user || !pass) throw Object.assign(new Error("Mailbox is not configured"), { code: "MAIL_NOT_CONFIGURED" });
  const days = options.days ?? 14;
  if (!Number.isInteger(days) || days < 1 || days > 30) throw new Error("Invalid lookback");
  const Client = options.Client || (await import("imapflow")).ImapFlow;
  const parse = options.parse || (await import("mailparser")).simpleParser;
  const maxMessages = options.maxMessages ?? 250;
  const attempts = options.attempts ?? 2;
  const attemptMs = options.attemptMs ?? 25_000;
  const since = new Date((options.now ?? Date.now()) - days * 86_400_000);
  let snapshot, usedAttempts, failure, mailboxScope = "inbox";
  const started = Date.now();

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const client = new Client({
      host: IMAP_HOST(), port: 993, secure: true, auth: { user, pass },
      logger: false, disableAutoIdle: true,
      connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
    });
    let lock, timer, stage = "connect";
    let rejectSession;
    const failed = new Promise((_, reject) => { rejectSession = reject; });
    client.on("error", (error) => rejectSession(error));
    timer = setTimeout(() => rejectSession(Object.assign(new Error("Mailbox deadline"), { code: "MAIL_DEADLINE" })), attemptMs);
    try {
      snapshot = await Promise.race([failed, (async () => {
        await client.connect();
        stage = "list";
        const folders = await client.list();
        const allMail = folders.find((folder) => folder.specialUse === "\\All");
        mailboxScope = allMail ? "all_mail" : "inbox";
        stage = "select";
        lock = await client.getMailboxLock(allMail?.path || "INBOX", { readOnly: true });
        stage = "search";
        const uids = (await client.search({ since, or: [
          { from: "awexpress.google.com" }, { from: "localservices-noreply@google.com" },
        ] }, { uid: true })) || [];
        if (uids.length > maxMessages) throw Object.assign(new Error("Mailbox batch requires review"), { code: "MAIL_BATCH_LIMIT" });
        stage = "fetch";
        const messages = [];
        let bytes = 0;
        for (const uid of uids) {
          const msg = await client.fetchOne(String(uid), { source: true, internalDate: true }, { uid: true });
          if (!msg) continue; // Message removed between search and fetch.
          if (!msg.source) throw Object.assign(new Error("Missing source"), { code: "MAIL_SOURCE_MISSING" });
          bytes += msg.source.length;
          if (bytes > 16 * 1024 * 1024) throw Object.assign(new Error("Mailbox batch too large"), { code: "MAIL_BATCH_LIMIT" });
          messages.push(msg);
        }
        return messages;
      })()]);
      usedAttempts = attempt;
      break;
    } catch (error) {
      failure = error;
      failure.mailStage = stage;
      if (attempt === attempts || /AUTH|CONFIGURED|BATCH_LIMIT/i.test(mailErrorCode(error))) throw error;
    } finally {
      clearTimeout(timer);
      try { lock?.release(); } catch {}
      // A bounded polling connection has no pending writes to flush. Closing
      // directly also avoids hanging forever waiting for LOGOUT on a dead socket.
      client.close();
    }
    await new Promise((resolve) => setTimeout(resolve, options.retryDelayMs ?? 500));
  }
  if (!snapshot) throw failure;
  const emails = [];
  for (const msg of snapshot) {
    const mail = await parse(msg.source);
    const email = parseLsaEmail(mail);
    if (!email.requestId && !email.isCallLead) continue;
    const fallback = "sha256:" + createHash("sha256").update(msg.source).digest("hex");
    email.emailKey = "lsa:" + (email.messageId || fallback);
    email.leadKey = email.requestId ? `awexpress:${email.requestId}` : `email:${email.messageId || email.date || fallback}`;
    // Internal date is mailbox receipt time, not a customer-controlled Date header.
    email.receivedAt = new Date(msg.internalDate || email.date || Date.now()).toISOString();
    emails.push(email);
  }
  emails.sort((a, b) => a.receivedAt.localeCompare(b.receivedAt));
  return { emails, scanned: snapshot.length, matched: emails.length, attempts: usedAttempts, durationMs: Date.now() - started, since: since.toISOString(), mailboxScope };
}

// Send a reply into the LSA chat by emailing the awexpress relay address.
export async function sendLsaReply({ to, subject, text }) {
  const user = process.env.LSA_IMAP_USER;
  const pass = process.env.LSA_IMAP_PASSWORD;
  if (!user || !pass) throw new Error("lsa_mail_not_configured");
  const nodemailer = (await import("nodemailer")).default;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  await transporter.sendMail({
    from: user,
    to,
    subject: subject ? `Re: ${subject}` : "Re: your request",
    text,
  });
}
