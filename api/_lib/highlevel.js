// HighLevel (LeadConnector) API helper. Upserts a contact into the MEX
// Landscaping sub-account so workflows (tag-triggered SMS, Conversation AI
// takeover) can pick the lead up.
//
// Requires HIGHLEVEL_API_KEY: a Private Integration token created in
// HighLevel > Settings > Private Integrations with contacts write scope.

const LOCATION_ID = process.env.HIGHLEVEL_LOCATION_ID || "ezvy5zMpXq8xZhPGDLLf";
const API_BASE = "https://services.leadconnectorhq.com";

export async function upsertContact(lead, tags) {
  const token = process.env.HIGHLEVEL_API_KEY;
  if (!token) return { ok: false, error: "highlevel_not_configured" };

  const [firstName, ...rest] = (lead.name || "").trim().split(/\s+/);
  const body = {
    locationId: LOCATION_ID,
    // Fallback keeps SMS greetings natural: "Hi there," instead of "Hi ,".
    firstName: firstName || "there",
    lastName: rest.join(" ") || undefined,
    phone: lead.phone || undefined,
    email: lead.email || undefined,
    city: lead.town || undefined,
    source: lead.source === "lsa" ? "Google LSA" : "Mini CRM",
    tags,
  };

  try {
    const r = await fetch(`${API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `highlevel_${r.status}`, detail: j };
    return { ok: true, contactId: j.contact?.id || j.id || null };
  } catch {
    return { ok: false, error: "highlevel_unreachable" };
  }
}
