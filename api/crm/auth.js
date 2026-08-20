// CRM session endpoint.
// POST {password} -> sets session cookie. GET -> session check. DELETE -> logout.

import { makeSessionCookie, clearSessionCookie, isAuthed, checkPassword } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ ok: isAuthed(req) });
    return;
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method === "POST") {
    let data = req.body;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch { data = {}; }
    }
    if (!checkPassword(data?.password)) {
      res.status(401).json({ ok: false, error: "bad_password" });
      return;
    }
    res.setHeader("Set-Cookie", makeSessionCookie());
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ ok: false, error: "method_not_allowed" });
}
