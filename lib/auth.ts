import { SignJWT, jwtVerify } from "jose";

// ---------------------------------------------------------------------------
// Server-only auth helpers for the /gold portfolio gate.
// The password and signing secret live in server-only env vars and never
// reach the browser. The session is a short-lived HS256 JWT stored in an
// httpOnly, Secure, SameSite cookie.
// ---------------------------------------------------------------------------

export const SESSION_COOKIE = "gold_session";
export const SESSION_TTL_SECONDS = 60 * 60; // 1 hour

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }
  return new TextEncoder().encode(secret);
}

/** Constant-time comparison to avoid leaking timing information. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.GOLD_PASSWORD;
  if (!expected) {
    throw new Error("GOLD_PASSWORD is not configured.");
  }
  const a = new TextEncoder().encode(input);
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/** Create a signed session token. Returns the JWT and its expiry (ms epoch). */
export async function createSessionToken(): Promise<{
  token: string;
  expiresAt: number;
}> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expSeconds = nowSeconds + SESSION_TTL_SECONDS;
  const token = await new SignJWT({ scope: "gold" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("gold-portfolio")
    .setIssuedAt(nowSeconds)
    .setExpirationTime(expSeconds)
    .sign(getSecret());
  return { token, expiresAt: expSeconds * 1000 };
}

/** Verify a session token. Returns the expiry (ms epoch) or null if invalid. */
export async function verifySessionToken(
  token: string | undefined
): Promise<{ expiresAt: number } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      subject: "gold-portfolio",
    });
    if (payload.scope !== "gold" || !payload.exp) return null;
    return { expiresAt: payload.exp * 1000 };
  } catch {
    return null;
  }
}
