// Telegram notifier — same bot + chat the website lead form already uses.

export async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, error: "telegram_not_configured" };
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    const j = await r.json();
    return { ok: !!j.ok };
  } catch {
    return { ok: false, error: "telegram_send_failed" };
  }
}

export function formatLeadMessage(title, lead, extra = []) {
  const line = (label, val) => (val ? `${label}: ${String(val).trim()}` : null);
  return [
    title,
    "",
    line("Name", lead.name),
    line("Phone", lead.phone),
    line("Email", lead.email),
    line("Town", lead.town),
    line("Service", lead.service),
    line("Budget", lead.budget),
    line("Timeline", lead.timeline),
    line("Property", lead.property_type),
    line("Notes", lead.notes),
    ...extra,
  ].filter((l) => l !== null).join("\n");
}
