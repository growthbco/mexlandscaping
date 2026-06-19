// Vercel serverless function: send a Telegram message for each new lead.
// Called by the website lead form (in addition to Web3Forms email).
// Secrets come from env vars (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) — never
// hard-coded here, so the bot token stays out of the repo.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    res.status(500).json({ ok: false, error: "not_configured" });
    return;
  }

  let data = req.body;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch { data = {}; }
  }
  data = data || {};

  // Honeypot + basic sanity: ignore obvious bots / empty submissions.
  if (data.botcheck) { res.status(200).json({ ok: true, skipped: "honeypot" }); return; }
  if (!data.name && !data.phone && !data.email) {
    res.status(400).json({ ok: false, error: "empty" });
    return;
  }

  // Clean, plain-text format (no emojis, no markdown) so it forwards nicely
  // over iMessage.
  const line = (label, val) => (val ? `${label}: ${String(val).trim()}` : null);
  const text = [
    "New Website Lead",
    "",
    line("Name", data.name),
    line("Phone", data.phone),
    line("Email", data.email),
    line("Location", data.zip),
    line("Service", data.service),
    line("Budget", data.budget),
    line("Timeline", data.timeline),
    line("Property", data.property_type),
    line("Details", data.message),
    line("Source", data.page),
  ].filter((l) => l !== null).join("\n");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    const j = await tg.json();
    res.status(200).json({ ok: !!j.ok });
  } catch (e) {
    res.status(200).json({ ok: false, error: "send_failed" });
  }
}
