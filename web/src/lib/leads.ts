import { Resend } from "resend";

export async function insertSupabaseLead(payload: Record<string, unknown>) {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ""
  ).replace(/\/$/, "");
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured");
  }

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase lead insert failed: ${res.status} ${text}`);
  }
}

export async function sendLeadEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { sent: false as const, reason: "no_resend_key" };

  const resend = new Resend(resendKey);
  const from =
    process.env.RESEND_FROM_EMAIL ||
    "MEGALODOME GOLF <hello@megalodomegolf.com>";
  const to =
    process.env.LEAD_NOTIFY_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    "hello@megalodomegolf.com";

  await resend.emails.send({
    from: from.includes("<") ? from : `MEGALODOME GOLF <${from}>`,
    to: [to],
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });

  return { sent: true as const };
}
