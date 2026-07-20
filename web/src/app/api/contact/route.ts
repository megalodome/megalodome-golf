import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  company_website?: string;
};

async function insertLead(payload: Record<string, unknown>) {
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
    // If table missing, surface clear error
    throw new Error(`Supabase lead insert failed: ${res.status} ${text}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // honeypot
    if (body.company_website) {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const interest = (body.interest || "general").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const sourceSite =
      process.env.LEAD_SOURCE_SITE || "megalodomegolf.com";

    await insertLead({
      source_site: sourceSite,
      source_page: "/contact",
      source_form: "contact",
      name,
      email,
      phone: phone || null,
      lead_type: interest,
      message,
      status: "new",
      metadata: {
        interest,
        userAgent: req.headers.get("user-agent"),
      },
    });

    // email notify via Resend (best-effort)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
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
        replyTo: email,
        subject: `New website lead (${interest}) — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Interest: ${interest}`,
          "",
          message,
        ].join("\n"),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unable to send message right now.",
      },
      { status: 500 }
    );
  }
}
