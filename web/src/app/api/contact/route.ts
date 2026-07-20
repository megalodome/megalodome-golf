import { NextResponse } from "next/server";
import { insertSupabaseLead, sendLeadEmail } from "@/lib/leads";
import {
  buildInvestorBackground,
  createSuiteDashContact,
  splitName,
} from "@/lib/suitedash";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  company?: string;
  company_website?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (body.company_website) {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const interest = (body.interest || "general").trim();
    const message = (body.message || "").trim();
    const company = (body.company || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const sourceSite = process.env.LEAD_SOURCE_SITE || "megalodomegolf.com";
    const isInvestor = interest.toLowerCase() === "investor";

    let suitedashUid: string | null = null;
    if (isInvestor || process.env.SUITEDASH_SYNC_ALL_CONTACTS === "1") {
      try {
        const { firstName, lastName } = splitName(name);
        const contact = await createSuiteDashContact({
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          company: company || undefined,
          title: isInvestor ? "Investor" : interest,
          role: "Lead",
          tags: isInvestor
            ? ["investor", "website", "source:megalodomegolf.com", "path:contact"]
            : ["website", "source:megalodomegolf.com", `interest:${interest}`],
          circlesToAdd: isInvestor ? ["Investors"] : undefined,
          backgroundInfo: isInvestor
            ? buildInvestorBackground({
                message,
                investorType: "contact-form",
                source: sourceSite,
                page: "/contact",
              })
            : `Website contact (${interest})\n\n${message}`,
          sendWelcomeEmail: false,
        });
        suitedashUid = contact.uid;
      } catch (err) {
        console.error("suitedash contact sync error", err);
      }
    }

    await insertSupabaseLead({
      source_site: sourceSite,
      source_page: "/contact",
      source_form: "contact",
      name,
      email,
      phone: phone || null,
      company: company || null,
      lead_type: interest,
      message,
      status: "new",
      metadata: {
        interest,
        suitedashUid,
        userAgent: req.headers.get("user-agent"),
      },
    });

    await sendLeadEmail({
      subject: `${isInvestor ? "INVESTOR " : ""}Website lead (${interest}) — ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Company: ${company || "—"}`,
        `Interest: ${interest}`,
        suitedashUid ? `SuiteDash UID: ${suitedashUid}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true, suitedashUid });
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
