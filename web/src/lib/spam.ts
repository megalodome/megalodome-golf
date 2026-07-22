/** Shared anti-spam helpers for public forms (honeypot + min fill time + optional Turnstile). */

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Reject submissions filled faster than minMs (bots).
 * Missing/invalid timestamps are treated as too fast for browser forms.
 */
export function isSubmitTooFast(
  formStartedAt: unknown,
  minMs = 2800
): boolean {
  const started = Number(formStartedAt);
  if (!Number.isFinite(started) || started <= 0) return true;
  // Reject absurd future timestamps
  if (started > Date.now() + 60_000) return true;
  // Reject very old timestamps (> 24h) as likely replay/spam tooling
  if (Date.now() - started > 24 * 60 * 60 * 1000) return true;
  return Date.now() - started < minMs;
}

/** Soft-fail spam check: true when submission should be silently accepted and dropped. */
export function shouldDropAsSpam(input: {
  honeypot?: unknown;
  formStartedAt?: unknown;
  minMs?: number;
}): boolean {
  if (isHoneypotTripped(input.honeypot)) return true;
  if (isSubmitTooFast(input.formStartedAt, input.minMs ?? 2800)) return true;
  return false;
}

/**
 * Verify Cloudflare Turnstile when TURNSTILE_SECRET_KEY is configured.
 * Returns true when verification is not configured or token is valid.
 */
export async function verifyTurnstileIfConfigured(
  token: unknown,
  remoteip?: string | null
): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ||
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
    process.env.MEGALODOME_TURNSTILE_SECRET_KEY ||
    "";
  if (!secret) return true;
  if (typeof token !== "string" || !token.trim()) return false;

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token.trim());
    if (remoteip) body.set("remoteip", remoteip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

export function turnstileSiteKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    undefined
  );
}
