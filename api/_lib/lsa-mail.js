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

const IMAP_HOST = () => process.env.LSA_IMAP_HOST || "imap.gmail.com";

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

// Poll the inbox and hand each matching Google lead email to onEmail(parsed).
// Only messages onEmail() handles without throwing are marked \Seen, so a
// failure is retried on the next pass. Returns a small summary.
export async function processLsaMailbox(onEmail) {
  const user = process.env.LSA_IMAP_USER;
  const pass = process.env.LSA_IMAP_PASSWORD;
  if (!user || !pass) return { skipped: "not_configured" };

  const { ImapFlow } = await import("imapflow");
  const { simpleParser } = await import("mailparser");

  const client = new ImapFlow({
    host: IMAP_HOST(),
    port: 993,
    secure: true,
    auth: { user, pass },
    logger: false,
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 60_000,
  });

  let scanned = 0;
  const errors = [];
  await client.connect();
  const lock = await client.getMailboxLock("INBOX");
  try {
    const since = new Date(Date.now() - 14 * 24 * 3600 * 1000);
    const uids = (await client.search({ seen: false, since }, { uid: true })) || [];
    for (const uid of uids) {
      const msg = await client.fetchOne(String(uid), { source: true }, { uid: true });
      if (!msg || !msg.source) continue;
      const mail = await simpleParser(msg.source);
      const parsed = parseLsaEmail(mail);
      if (!parsed.requestId && !parsed.isCallLead) continue; // not an LSA lead email
      scanned++;
      try {
        await onEmail(parsed);
        await client.messageFlagsAdd(String(uid), ["\\Seen"], { uid: true });
      } catch (e) {
        errors.push(`${uid}: ${(e && e.message) || e}`);
      }
    }
  } finally {
    lock.release();
    await client.logout().catch(() => {});
  }
  return { scanned, errors };
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
  });
  await transporter.sendMail({
    from: user,
    to,
    subject: subject ? `Re: ${subject}` : "Re: your request",
    text,
  });
}
