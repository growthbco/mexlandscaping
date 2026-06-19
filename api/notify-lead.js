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

  const row = (emoji, val) => (val ? `${emoji} ${String(val).trim()}` : null);
  const text = [
    "🌿 *New Lead — Mex Landscaping*",
    data.page ? `_${String(data.page).trim()}_` : null,
    "",
    row("👤", data.name),
    row("📞", data.phone),
    row("✉️", data.email),
    row("📍", data.zip),
    row("🛠", data.service),
    row("💰", data.budget),
    row("⏱", data.timeline),
    row("🏠", data.property_type),
    data.message ? `📝 ${String(data.message).trim()}` : null,
  ].filter((l) => l !== null).join("\n");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    const j = await tg.json();
    res.status(200).json({ ok: !!j.ok });
  } catch (e) {
    res.status(200).json({ ok: false, error: "send_failed" });
  }
}
