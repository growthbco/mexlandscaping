// Two-way Telegram bridge for LSA leads.
//
// Lead alerts (sent by the ingest cron) are titled "... (Lead #<id>)". When the
// owner REPLIES to one of those alerts in Telegram, Telegram POSTs the update
// here and we forward the reply text into the customer's LSA chat via the
// awexpress email relay. You can also send: /reply <id> <message>.
//
// One-time setup (registers this URL with Telegram, using CRON_SECRET as the
// verification secret_token):
//   GET /api/telegram-webhook/?setup=1&key=<CRON_SECRET>
//
// Telegram then POSTs here with header
//   X-Telegram-Bot-Api-Secret-Token: <CRON_SECRET>   (verified below).

import { sql, ensureSchema } from "./_lib/db.js";
import { sendLsaReply } from "./_lib/lsa-mail.js";
import { sendTelegram } from "./_lib/telegram.js";

const WEBHOOK_URL = "https://www.mexlandscaping.com/api/telegram-webhook/";
const tgApi = (token, method) => `https://api.telegram.org/bot${token}/${method}`;

export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.CRON_SECRET;

  // One-time setup: register this endpoint as the Telegram webhook.
  if (req.query?.setup === "1") {
    if (!secret || req.query?.key !== secret) {
      res.status(401).json({ ok: false, error: "unauthorized" });
      return;
    }
    if (!token) {
      res.status(500).json({ ok: false, error: "no_bot_token" });
      return;
    }
    const r = await fetch(tgApi(token, "setWebhook"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        secret_token: secret,
        allowed_updates: ["message"],
      }),
    });
    const j = await r.json().catch(() => ({}));
    res.status(200).json({ ok: true, setWebhook: j });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  // Verify the request really came from Telegram.
  if (!secret || req.headers["x-telegram-bot-api-secret-token"] !== secret) {
    res.status(401).json({ ok: false, error: "unauthorized" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const msg = body?.message;
  const text = (msg?.text || "").trim();
  const repliedText = msg?.reply_to_message?.text || "";
  const fromChat = String(msg?.chat?.id || "");

  if (!msg || !text) {
    res.status(200).json({ ok: true, ignored: "no_text" });
    return;
  }
  // Only the owner's chat may drive replies.
  if (process.env.TELEGRAM_CHAT_ID && fromChat !== String(process.env.TELEGRAM_CHAT_ID)) {
    res.status(200).json({ ok: true, ignored: "not_owner" });
    return;
  }

  // Route to a lead: reply to an alert containing "Lead #<id>", or /reply <id> <text>.
  let leadId = null;
  let outText = text;
  const mReply = repliedText.match(/Lead #(\d+)/i);
  const mCmd = text.match(/^\/reply\s+(\d+)\s+([\s\S]+)/i);
  if (mReply) leadId = parseInt(mReply[1], 10);
  else if (mCmd) {
    leadId = parseInt(mCmd[1], 10);
    outText = mCmd[2].trim();
  }

  if (!leadId) {
    await sendTelegram(
      "To answer a customer, reply to that lead's alert message with your text, or send: /reply <id> <message>.",
    );
    res.status(200).json({ ok: true, ignored: "no_lead" });
    return;
  }

  const db = sql();
  await ensureSchema(db);
  const rows = await db`SELECT * FROM leads WHERE id = ${leadId} LIMIT 1`;
  const lead = rows[0];
  if (!lead) {
    await sendTelegram(`Could not find lead #${leadId}.`);
    res.status(200).json({ ok: true });
    return;
  }
  const relay = lead.reply_email || "";
  if (!/^customer-request-\d+@awexpress\.google\.com$/i.test(relay)) {
    await sendTelegram(`Lead #${leadId} has no repliable LSA chat (likely a phone-call lead).`);
    res.status(200).json({ ok: true });
    return;
  }

  try {
    await sendLsaReply({ to: relay, subject: lead.subject, text: outText });
    // Logging the human reply as outbound also stops the AI from replying on
    // top of you (the we-replied-last guard).
    await db`
      INSERT INTO lead_messages (lead_id, direction, body_text, ext_id)
      VALUES (${lead.id}, 'out', ${outText}, ${"tg:" + lead.id + ":" + (msg.message_id || Date.now())})
      ON CONFLICT (ext_id) DO NOTHING`;
    await db`UPDATE leads SET status = 'contacted' WHERE id = ${lead.id}`;
    await sendTelegram(`Sent to ${lead.name || "the customer"} (Lead #${leadId}).`);
  } catch (e) {
    await sendTelegram(`Failed to send to Lead #${leadId}: ${String(e.message || e).slice(0, 140)}`);
  }
  res.status(200).json({ ok: true });
}
