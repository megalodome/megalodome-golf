import { NextResponse } from "next/server";
import {
  NDA_PDF,
  TIER0_PDFS,
  TIER1_PDFS,
  insertSupabaseLead,
  investorPackEmailHtml,
  sendLeadEmail,
  siteBaseUrl,
} from "@/lib/leads";
import {
  SUITEDASH_CUSTOM_FIELDS,
  SUITEDASH_RECOMMENDED,
  buildInvestorBackground,
  buildRecommendedInvestorTags,
  createSuiteDashContact,
  splitName,
} from "@/lib/suitedash";
import {
  shouldDropAsSpam,
  verifyTurnstileIfConfigured,
} from "@/lib/spam";

export const runtime = "nodejs";

type Body = {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  investorType?: string;
  checkSize?: string;
  timeline?: string;
  accredited?: string;
  message?: string;
  website?: string;
  requestTier1?: string | boolean;
  requestNda?: string | boolean;
  requestDataRoom?: string | boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  company_website?: string;
  form_started_at?: string | number;
  cf_turnstile_response?: string;
  "cf-turnstile-response"?: string;
};

function truthy(v: unknown) {
  return v === true || v === "true" || v === "on" || v === "1" || v === "yes";
}

function scoreLead(input: {
  checkSize?: string;
  timeline?: string;
  accredited?: string;
}) {
  let score = 0;
  const cs = (input.checkSize || "").toLowerCase();
  if (cs.includes("500")) score += 3;
  else if (cs.includes("250")) score += 2;
  else if (cs.includes("100")) score += 1;
  const tl = (input.timeline || "").toLowerCase();
  if (tl.includes("0–30") || tl.includes("0-30")) score += 2;
  else if (tl.includes("30–90") || tl.includes("30-90")) score += 1;
  if ((input.accredited || "").toLowerCase() === "yes") score += 2;
  if (score >= 5) return "hot";
  if (score >= 3) return "warm";
  return "cold";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (
      shouldDropAsSpam({
        honeypot: body.company_website,
        formStartedAt: body.form_started_at,
        minMs: 2800,
      })
    ) {
      return NextResponse.json({ ok: true });
    }

    const turnstileToken =
      body.cf_turnstile_response || body["cf-turnstile-response"];
    const turnstileOk = await verifyTurnstileIfConfigured(
      turnstileToken,
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    );
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Spam verification failed. Please try again." },
        { status: 400 }
      );
    }

    let firstName = (body.firstName || "").trim();
    let lastName = (body.lastName || "").trim();
    if (!firstName && body.name) {
      const split = splitName(body.name);
      firstName = split.firstName;
      lastName = split.lastName;
    }

    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const company = (body.company || "").trim();
    const investorType = (body.investorType || "").trim();
    const checkSize = (body.checkSize || "").trim();
    const timeline = (body.timeline || "").trim();
    const accredited = (body.accredited || "").trim();
    const message = (body.message || "").trim();
    const website = (body.website || "").trim();
    const requestTier1 =
      truthy(body.requestTier1) || accredited.toLowerCase() === "yes";
    const requestNda = truthy(body.requestNda) || truthy(body.requestDataRoom);
    const heat = scoreLead({ checkSize, timeline, accredited });

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const sourceSite = process.env.LEAD_SOURCE_SITE || "megalodomegolf.com";
    const baseUrl = siteBaseUrl();
    const background = buildInvestorBackground({
      message,
      investorType,
      checkSize,
      timeline,
      accredited,
      source: sourceSite,
      page: "/invest/apply",
      heat,
      requestTier1,
      requestNda,
    });

    const tags = buildRecommendedInvestorTags({
      heat,
      investorType,
      requestTier1,
      requestNda,
      utmSource: body.utm_source,
    });

    // 1) CRM contact
    let suitedashUid: string | null = null;
    let suitedashError: string | null = null;
    try {
      const customFields: Record<string, string> = {};
      if (company) {
        customFields[SUITEDASH_CUSTOM_FIELDS.companyName] = company;
        customFields[SUITEDASH_CUSTOM_FIELDS.businessName] = company;
      }
      if (investorType) {
        customFields[SUITEDASH_CUSTOM_FIELDS.positionTitle] = investorType;
      }
      customFields[SUITEDASH_CUSTOM_FIELDS.additionalInfo] = [
        `Check size: ${checkSize || "—"}`,
        `Timeline: ${timeline || "—"}`,
        `Accredited: ${accredited || "—"}`,
        `Score: ${heat}`,
        `Tier1 pack: ${requestTier1 ? "yes" : "no"}`,
        `NDA requested: ${requestNda ? "yes" : "no"}`,
        `Pipeline: ${SUITEDASH_RECOMMENDED.pipeline}`,
        `Target stage: ${requestNda ? "Diligence (pending NDA)" : requestTier1 ? "Info Pack Sent" : "New Inquiry"}`,
        `Deal generator: ${SUITEDASH_RECOMMENDED.dealGenerator}`,
        `UTM: ${body.utm_source || ""}/${body.utm_medium || ""}/${body.utm_campaign || ""}`,
        "",
        message,
      ].join("\n");

      const contact = await createSuiteDashContact({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        title: investorType || "Investor",
        company: company || undefined,
        website: website || undefined,
        backgroundInfo: background,
        role: "Lead",
        tags,
        circlesToAdd: [
          SUITEDASH_RECOMMENDED.circleIds.investors,
          SUITEDASH_RECOMMENDED.circleIds.websiteLeads,
        ],
        customFields,
        sendWelcomeEmail: false,
      });
      suitedashUid = contact.uid;
    } catch (err) {
      suitedashError = err instanceof Error ? err.message : "CRM sync failed";
      console.error("suitedash invest error", err);
    }

    // 2) Supabase
    await insertSupabaseLead({
      source_site: sourceSite,
      source_page: "/invest/apply",
      source_form: "investor_apply",
      name: fullName,
      first_name: firstName,
      last_name: lastName || null,
      email,
      phone: phone || null,
      company: company || null,
      lead_type: "investor",
      message,
      status: requestNda ? "nda_requested" : "new",
      metadata: {
        investorType,
        checkSize,
        timeline,
        accredited,
        website,
        heat,
        requestTier1,
        requestNda,
        suitedashUid,
        suitedashError,
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        userAgent: req.headers.get("user-agent"),
      },
    });

    // 3) Email pack to investor
    const attach = [...TIER0_PDFS];
    if (requestTier1) attach.push(...TIER1_PDFS);
    if (requestNda) attach.push(NDA_PDF);

    let investorEmailAttached = 0;
    try {
      const result = await sendLeadEmail({
        to: email,
        subject: requestNda
          ? "MEGALODOME GOLF — Investor pack + Mutual NDA"
          : requestTier1
            ? "MEGALODOME GOLF — Investor pre-meeting pack"
            : "MEGALODOME GOLF — Investor introduction materials",
        replyTo:
          process.env.LEAD_NOTIFY_EMAIL ||
          process.env.RESEND_FROM_EMAIL ||
          "hello@megalodomegolf.com",
        text: [
          `Dear ${firstName},`,
          "",
          "Thank you for your interest in MEGALODOME GOLF Equity Fund I.",
          "Your materials are attached.",
          "",
          `${baseUrl}/invest`,
          `${baseUrl}/invest/data-room`,
          "",
          "CONFIDENTIAL — accredited investors only. Not an offer to sell securities.",
        ].join("\n"),
        html: investorPackEmailHtml({
          name: firstName,
          baseUrl,
          includeTier1: requestTier1,
          includeNda: requestNda,
        }),
        attachPaths: attach,
      });
      investorEmailAttached = result.sent ? result.attached || 0 : 0;
    } catch (err) {
      console.error("investor pack email failed", err);
    }

    // 4) Notify raise team
    await sendLeadEmail({
      subject: `${heat.toUpperCase()} INVESTOR — ${fullName}${checkSize ? ` (${checkSize})` : ""}${requestNda ? " · NDA REQUEST" : ""}`,
      replyTo: email,
      text: [
        "NEW INVESTOR INQUIRY",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Company: ${company || "—"}`,
        `Type: ${investorType || "—"}`,
        `Check size: ${checkSize || "—"}`,
        `Timeline: ${timeline || "—"}`,
        `Accredited: ${accredited || "—"}`,
        `Score: ${heat}`,
        `Tier1 pack sent: ${requestTier1}`,
        `NDA requested: ${requestNda}`,
        `Attachments to investor: ${investorEmailAttached}`,
        `CRM contact ID: ${suitedashUid || "FAILED"}`,
        suitedashError ? `CRM error: ${suitedashError}` : "",
        `UTM: ${body.utm_source || ""} / ${body.utm_medium || ""} / ${body.utm_campaign || ""}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({
      ok: true,
      suitedashUid,
      heat,
      pack: requestTier1 ? "tier1" : "tier0",
      nda: requestNda,
    });
  } catch (err) {
    console.error("invest error", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unable to submit investor inquiry right now.",
      },
      { status: 500 }
    );
  }
}
