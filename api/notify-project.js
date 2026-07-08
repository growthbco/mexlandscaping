// Vercel serverless function: completed-project reports from /project-intake/.
// The owners fill out the form after finishing a job; this pushes the details
// and photos to Telegram so marketing can request a review from the customer.
// Secrets come from env vars (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).
//
// Two payload kinds, both JSON:
//   { kind: "summary", ...fields }                       -> sendMessage (text)
//   { kind: "photo", photo: "<base64 jpeg>", caption }   -> sendPhoto
// Photos are compressed client-side to stay well under Vercel's 4.5MB body cap.

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

  if (data.botcheck) { res.status(200).json({ ok: true, skipped: "honeypot" }); return; }

  const api = (method) => `https://api.telegram.org/bot${token}/${method}`;

  try {
    if (data.kind === "photo") {
      if (!data.photo) { res.status(400).json({ ok: false, error: "no_photo" }); return; }
      const buf = Buffer.from(String(data.photo), "base64");
      const fd = new FormData();
      fd.set("chat_id", chatId);
      if (data.caption) fd.set("caption", String(data.caption).slice(0, 1024));
      fd.set("photo", new Blob([buf], { type: "image/jpeg" }), "project.jpg");
      const tg = await fetch(api("sendPhoto"), { method: "POST", body: fd });
      const j = await tg.json();
      res.status(200).json({ ok: !!j.ok });
      return;
    }

    // Summary message. Same plain-text style as notify-lead so it forwards
    // cleanly over iMessage.
    if (!data.customer_name && !data.customer_phone) {
      res.status(400).json({ ok: false, error: "empty" });
      return;
    }
    const line = (label, val) => (val ? `${label}: ${String(val).trim()}` : null);
    const text = [
      "Completed Project Report",
      "",
      line("Customer", data.customer_name),
      line("Phone", data.customer_phone),
      line("Email", data.customer_email),
      line("Job address", data.job_address),
      line("Work done", data.services),
      line("Details", data.description),
      line("Price", data.price),
      line("Completed", data.completed_date),
      line("Customer mood", data.customer_mood),
      line("Nice quote", data.customer_quote),
      line("Photo permission", data.photo_permission),
      line("Notes", data.notes),
      line("Photos coming", data.photo_count),
    ].filter((l) => l !== null).join("\n");

    const tg = await fetch(api("sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    const j = await tg.json();
    res.status(200).json({ ok: !!j.ok });
  } catch (e) {
    res.status(200).json({ ok: false, error: "send_failed" });
  }
}
