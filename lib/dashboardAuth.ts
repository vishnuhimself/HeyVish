import { SignJWT, jwtVerify } from "jose";

export const DASHBOARD_COOKIE = "dashboard_session";
export const SESSION_TTL = 60 * 60; // 1 hour

function getSecret(): Uint8Array {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!secret) throw new Error("DASHBOARD_SESSION_SECRET not configured");
  return new TextEncoder().encode(secret);
}

export function verifyDashboardPassword(input: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) throw new Error("DASHBOARD_PASSWORD not configured");
  const a = new TextEncoder().encode(input);
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function createDashboardToken(): Promise<{ token: string; expiresAt: number }> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + SESSION_TTL;
  const token = await new SignJWT({ scope: "dashboard" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("dashboard")
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(getSecret());
  return { token, expiresAt: exp * 1000 };
}

export async function verifyDashboardToken(token: string | undefined): Promise<{ expiresAt: number } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { subject: "dashboard" });
    if (payload.scope !== "dashboard" || !payload.exp) return null;
    return { expiresAt: payload.exp * 1000 };
  } catch {
    return null;
  }
}