import { NextResponse } from "next/server";
import { insertSupabaseLead, sendLeadEmail } from "@/lib/leads";
import {
  SUITEDASH_CUSTOM_FIELDS,
  buildInvestorBackground,
  createSuiteDashContact,
  splitName,
} from "@/lib/suitedash";

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
  company_website?: string; // honeypot
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (body.company_website) {
      return NextResponse.json({ ok: true });
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

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const sourceSite = process.env.LEAD_SOURCE_SITE || "megalodomegolf.com";
    const background = buildInvestorBackground({
      message,
      investorType,
      checkSize,
      timeline,
      accredited,
      source: sourceSite,
      page: "/invest/apply",
    });

    // 1) SuiteDash CRM Lead
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
      if (message) {
        customFields[SUITEDASH_CUSTOM_FIELDS.additionalInfo] = [
          `Check size: ${checkSize || "—"}`,
          `Timeline: ${timeline || "—"}`,
          `Accredited: ${accredited || "—"}`,
          "",
          message,
        ].join("\n");
      }

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
        tags: [
          "investor",
          "website",
          "source:megalodomegolf.com",
          investorType ? `type:${investorType.toLowerCase().replace(/\s+/g, "-")}` : "",
        ].filter(Boolean),
        circlesToAdd: ["Investors"],
        customFields,
        sendWelcomeEmail: false,
      });
      suitedashUid = contact.uid;
    } catch (err) {
      suitedashError = err instanceof Error ? err.message : "SuiteDash failed";
      console.error("suitedash invest error", err);
    }

    // 2) Supabase archive
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
      status: "new",
      metadata: {
        investorType,
        checkSize,
        timeline,
        accredited,
        website,
        suitedashUid,
        suitedashError,
        userAgent: req.headers.get("user-agent"),
      },
    });

    // 3) Email notify
    await sendLeadEmail({
      subject: `New INVESTOR lead — ${fullName}${checkSize ? ` (${checkSize})` : ""}`,
      replyTo: email,
      text: [
        "NEW INVESTOR INQUIRY",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Company: ${company || "—"}`,
        `Investor type: ${investorType || "—"}`,
        `Check size: ${checkSize || "—"}`,
        `Timeline: ${timeline || "—"}`,
        `Accredited: ${accredited || "—"}`,
        `Website: ${website || "—"}`,
        `SuiteDash UID: ${suitedashUid || "FAILED"}`,
        suitedashError ? `SuiteDash error: ${suitedashError}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // If SuiteDash hard-failed and we still saved Supabase, return ok with warning path
    if (!suitedashUid && suitedashError) {
      // still success for user — lead captured in Supabase + email
      return NextResponse.json({
        ok: true,
        warning: "crm_sync_delayed",
      });
    }

    return NextResponse.json({ ok: true, suitedashUid });
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
