import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

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

export type EmailAttachment = {
  filename: string;
  path: string; // absolute or project-relative under public/
};

async function loadAttachments(files: string[]) {
  const out: Array<{ filename: string; content: Buffer }> = [];
  for (const rel of files) {
    const abs = path.isAbsolute(rel)
      ? rel
      : path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    try {
      const content = await readFile(abs);
      out.push({ filename: path.basename(abs), content });
    } catch (err) {
      console.error("attachment missing", abs, err);
    }
  }
  return out;
}

export const TIER0_PDFS = [
  "/docs/investor/one-pager.pdf",
  "/docs/investor/pitch-deck-summary.pdf",
  "/docs/flyer-2026.pdf",
];

export const TIER1_PDFS = [
  "/docs/investor/executive-summary.pdf",
  "/docs/investor/proforma-summary.pdf",
  "/docs/investor/investor-roadmap.pdf",
  "/docs/investor/investor-faq.pdf",
  "/docs/investor/abbreviations-key.pdf",
];

export const NDA_PDF = "/docs/investor/mutual-nda.pdf";

export async function sendLeadEmail(opts: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  to?: string | string[];
  attachPaths?: string[];
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { sent: false as const, reason: "no_resend_key" };

  const resend = new Resend(resendKey);
  const from =
    process.env.RESEND_FROM_EMAIL ||
    "MEGALODOME GOLF <hello@megalodomegolf.com>";
  const defaultTo =
    process.env.LEAD_NOTIFY_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    "hello@megalodomegolf.com";
  const to = opts.to || defaultTo;
  const attachments = opts.attachPaths?.length
    ? await loadAttachments(opts.attachPaths)
    : undefined;

  await resend.emails.send({
    from: from.includes("<") ? from : `MEGALODOME GOLF <${from}>`,
    to: Array.isArray(to) ? to : [to],
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    attachments: attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });

  return { sent: true as const, attached: attachments?.length || 0 };
}

export function siteBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://megalodome-golf.vercel.app"
  ).replace(/\/$/, "");
}

export function investorPackEmailHtml(opts: {
  name: string;
  baseUrl: string;
  includeTier1: boolean;
  includeNda: boolean;
}) {
  const links: string[] = [
    `<li><a href="${opts.baseUrl}/docs/investor/one-pager.pdf">One-Pager</a></li>`,
    `<li><a href="${opts.baseUrl}/docs/investor/pitch-deck-summary.pdf">Pitch Deck Summary</a></li>`,
    `<li><a href="${opts.baseUrl}/docs/flyer-2026.pdf">2026 Marketing Flyer</a></li>`,
  ];
  if (opts.includeTier1) {
    links.push(
      `<li><a href="${opts.baseUrl}/docs/investor/executive-summary.pdf">Executive Summary</a></li>`,
      `<li><a href="${opts.baseUrl}/docs/investor/proforma-summary.pdf">Pro-Forma Summary</a></li>`,
      `<li><a href="${opts.baseUrl}/docs/investor/investor-roadmap.pdf">Investor Roadmap</a></li>`,
      `<li><a href="${opts.baseUrl}/docs/investor/investor-faq.pdf">Investor FAQ</a></li>`,
      `<li><a href="${opts.baseUrl}/docs/investor/abbreviations-key.pdf">Abbreviations Key</a></li>`
    );
  }
  if (opts.includeNda) {
    links.push(
      `<li><a href="${opts.baseUrl}/docs/investor/mutual-nda.pdf">Mutual NDA (execute to unlock data room)</a></li>`
    );
  }
  return `
  <div style="font-family:Georgia,serif;line-height:1.5;color:#12281f">
    <p>Dear ${opts.name},</p>
    <p>Thank you for your interest in <strong>MEGALODOME GOLF Equity Fund I</strong> (Chicago West flagship).</p>
    <p>Your materials are attached and also available here:</p>
    <ul>${links.join("")}</ul>
    <p>Next steps:</p>
    <ol>
      <div>1. Review the Tier 0–1 pack</div>
      <div>2. Reply to schedule a call</div>
      <div>3. For deeper diligence, execute the Mutual NDA and we will open the Tier 2 data room</div>
    </ol>
    <p style="font-size:12px;color:#555">
      CONFIDENTIAL — for accredited investors only. Not an offer to sell securities.
      Any offering is made solely through the Confidential PPM and subscription documents
      under Rule 506(c) of Regulation D. Projections are modeled estimates, not guarantees.
    </p>
    <p>— MEGALODOME GOLF Raise Team<br/>
    <a href="${opts.baseUrl}/invest">${opts.baseUrl}/invest</a></p>
  </div>`;
}
