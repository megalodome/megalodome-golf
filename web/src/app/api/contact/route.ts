import { NextResponse } from "next/server";
import { insertSupabaseLead, sendLeadEmail } from "@/lib/leads";
import { getPostHogClient } from "@/lib/posthog-server";
import {
  buildInvestorBackground,
  createSuiteDashContact,
  splitName,
  SUITEDASH_RECOMMENDED,
} from "@/lib/suitedash";
import {
  shouldDropAsSpam,
  verifyTurnstileIfConfigured,
} from "@/lib/spam";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  company?: string;
  company_website?: string;
  form_started_at?: string | number;
  cf_turnstile_response?: string;
  "cf-turnstile-response"?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // Honeypot + min fill time — silent OK so bots think it worked
    if (
      shouldDropAsSpam({
        honeypot: body.company_website,
        formStartedAt: body.form_started_at,
        minMs: body.interest === "newsletter" ? 1200 : 2800,
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

    const interest = (body.interest || "general").trim().toLowerCase();
    const isNewsletter = interest === "newsletter";
    const email = (body.email || "").trim();
    const name = (body.name || "").trim() || (isNewsletter ? email : "");
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim() ||
      (isNewsletter ? "Newsletter signup from website" : "");
    const company = (body.company || "").trim();

    if (!email || (!isNewsletter && (!name || !message))) {
      return NextResponse.json(
        {
          error: isNewsletter
            ? "Email is required."
            : "Name, email, and message are required.",
        },
        { status: 400 }
      );
    }
    if (isNewsletter && !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const sourceSite = process.env.LEAD_SOURCE_SITE || "megalodomegolf.com";
    const isInvestor = interest === "investor";
    const isMedia = interest === "media";
    const isPartner =
      interest === "partner" ||
      interest === "partnership" ||
      interest === "developer";

    let suitedashUid: string | null = null;
    // Always sync website form leads into CRM so automations/tags/circles apply.
    try {
      const { firstName, lastName } = splitName(name || email);
      const tags = [
        "website",
        "source:megalodomegolf.com",
        isNewsletter ? "path:newsletter" : "path:contact",
        `interest:${interest || "general"}`,
      ];
      const circles: string[] = [SUITEDASH_RECOMMENDED.circleIds.websiteLeads];
      if (isNewsletter) {
        tags.push("newsletter", "audience:newsletter");
      }
      if (isInvestor) {
        tags.push(
          "investor",
          "pipeline:investor-raise",
          "stage:new-inquiry",
          "fund:equity-fund-i"
        );
        circles.push(SUITEDASH_RECOMMENDED.circleIds.investors);
      }
      if (isMedia) {
        tags.push("media");
        circles.push(SUITEDASH_RECOMMENDED.circleIds.media);
      }
      if (isPartner) {
        tags.push("partner");
        if (interest === "developer") tags.push("developer");
        circles.push(SUITEDASH_RECOMMENDED.circleIds.partners);
      }

      const contact = await createSuiteDashContact({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        company: company || undefined,
        title: isInvestor
          ? "Investor"
          : isNewsletter
            ? "Newsletter"
            : interest,
        role: "Lead",
        tags,
        circlesToAdd: circles,
        backgroundInfo: isInvestor
          ? buildInvestorBackground({
              message,
              investorType: "contact-form",
              source: sourceSite,
              page: "/contact",
            })
          : isNewsletter
            ? "Newsletter signup from website footer"
            : `Website contact (${interest})\n\n${message}`,
        sendWelcomeEmail: false,
      });
      suitedashUid = contact.uid;
    } catch (err) {
      console.error("suitedash contact sync error", err);
    }

    await insertSupabaseLead({
      source_site: sourceSite,
      source_page: isNewsletter ? "/newsletter" : "/contact",
      source_form: isNewsletter ? "newsletter" : "contact",
      name: name || email,
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
        tags: isNewsletter ? ["newsletter"] : undefined,
      },
    });

    const distinctId = req.headers.get("x-posthog-distinct-id") || email;
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: "server_contact_submitted",
      properties: {
        interest,
        is_newsletter: isNewsletter,
        is_investor: isInvestor,
        is_media: isMedia,
        is_partner: isPartner,
      },
    });
    await posthog.shutdown();

    await sendLeadEmail({
      subject: isNewsletter
        ? `Newsletter signup — ${email}`
        : `${isInvestor ? "INVESTOR " : isPartner ? "PARTNER " : ""}Website lead (${interest}) — ${name}`,
      replyTo: email,
      text: [
        `Name: ${name || "—"}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Company: ${company || "—"}`,
        `Interest: ${interest}`,
        suitedashUid ? `CRM contact ID: ${suitedashUid}` : "",
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
