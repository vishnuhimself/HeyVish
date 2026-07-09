// Client-side helper for the server-managed session.
//
// The actual session lives in a signed, httpOnly cookie that the browser
// cannot read or forge. These helpers just talk to the auth API to check
// status and to log out.

export interface SessionState {
  authenticated: boolean;
  expiresAt?: number; // ms epoch
}

export class SessionManager {
  /** Ask the server whether the current session cookie is valid. */
  static async check(): Promise<SessionState> {
    try {
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      if (!res.ok) return { authenticated: false };
      return (await res.json()) as SessionState;
    } catch {
      return { authenticated: false };
    }
  }

  /** Clear the session cookie on the server. */
  static async logout(): Promise<void> {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore network errors on logout
    }
  }

  /** Remaining seconds until the given expiry timestamp (ms epoch). */
  static remainingSeconds(expiresAt?: number): number {
    if (!expiresAt) return 0;
    return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
  }
}
