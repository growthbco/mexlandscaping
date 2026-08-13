// Cookie-session auth for the mini CRM. One shared password (CRM_PASSWORD),
// session token is exp-timestamp + HMAC so nothing is stored server-side.

import crypto from "node:crypto";

const COOKIE = "mex_crm";
const THIRTY_DAYS = 30 * 24 * 60 * 60;

function secret() {
  const s = process.env.CRM_SECRET || process.env.CRM_PASSWORD;
  if (!s) throw new Error("CRM_PASSWORD is not set");
  return s;
}

function sign(exp) {
  return crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
}

export function makeSessionCookie() {
  const exp = Math.floor(Date.now() / 1000) + THIRTY_DAYS;
  const token = `${exp}.${sign(exp)}`;
  return `${COOKIE}=${token}; Path=/; Max-Age=${THIRTY_DAYS}; HttpOnly; Secure; SameSite=Lax`;
}

export function clearSessionCookie() {
  return `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

export function isAuthed(req) {
  const token = req.cookies?.[COOKIE];
  if (!token) return false;
  const [exp, mac] = token.split(".");
  if (!exp || !mac) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(exp);
  try {
    return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function checkPassword(password) {
  const want = process.env.CRM_PASSWORD;
  if (!want || typeof password !== "string") return false;
  const a = Buffer.from(password);
  const b = Buffer.from(want);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Returns true if authed, otherwise sends 401 and returns false. */
export function requireAuth(req, res) {
  if (isAuthed(req)) return true;
  res.status(401).json({ ok: false, error: "unauthorized" });
  return false;
}
