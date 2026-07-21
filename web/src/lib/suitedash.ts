export type SuiteDashRole = "Lead" | "Prospect" | "Client";

export type CreateLeadInput = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  title?: string;
  company?: string;
  website?: string;
  backgroundInfo?: string;
  tags?: string[];
  circlesToAdd?: string[];
  role?: SuiteDashRole;
  customFields?: Record<string, string | number | null>;
  sendWelcomeEmail?: boolean;
};

export type SuiteDashContact = {
  uid: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  tags?: string[];
  companies?: Array<{ uid?: string; name?: string }>;
};

/** Recommended CRM taxonomy for MEGALODOME investor funnel */
export const SUITEDASH_RECOMMENDED = {
  circles: {
    investors: "Investors",
    websiteLeads: "Website Leads",
    media: "Media",
    partners: "Partners",
  },
  pipeline: "Investor Raise",
  dealGenerator: "Website Investor Lead",
  stages: [
    "New Inquiry",
    "Info Pack Sent",
    "Call Booked",
    "Diligence",
    "Soft Circle",
    "Commitment",
    "Won",
    "Lost",
  ] as const,
  baseTags: [
    "investor",
    "website",
    "source:megalodomegolf.com",
    "pipeline:investor-raise",
    "stage:new-inquiry",
    "fund:equity-fund-i",
    "geo:chicago-west",
  ],
} as const;

export function buildRecommendedInvestorTags(opts: {
  heat?: "hot" | "warm" | "cold";
  investorType?: string;
  requestTier1?: boolean;
  requestNda?: boolean;
  utmSource?: string;
  extra?: string[];
}): string[] {
  const tags = new Set<string>(SUITEDASH_RECOMMENDED.baseTags);
  if (opts.heat) tags.add(`score:${opts.heat}`);
  if (opts.investorType) {
    tags.add(`type:${opts.investorType.toLowerCase().replace(/\s+/g, "-")}`);
  }
  tags.add(opts.requestTier1 ? "pack:tier1" : "pack:tier0");
  if (opts.requestTier1) tags.add("stage:info-pack-sent");
  if (opts.requestNda) {
    tags.add("nda-requested");
    tags.add("stage:diligence-pending-nda");
  }
  if (opts.utmSource) tags.add(`utm:${opts.utmSource}`);
  for (const t of opts.extra || []) {
    if (t) tags.add(t);
  }
  return Array.from(tags);
}

export function investorCrmPlaybookNote(extra?: string): string {
  return [
    "---",
    "CRM PLAYBOOK",
    `Pipeline: ${SUITEDASH_RECOMMENDED.pipeline}`,
    `Stages: ${SUITEDASH_RECOMMENDED.stages.join(" → ")}`,
    `Deal Generator: ${SUITEDASH_RECOMMENDED.dealGenerator} (configure in SuiteDash UI)`,
    `Circles: ${SUITEDASH_RECOMMENDED.circles.investors}, ${SUITEDASH_RECOMMENDED.circles.websiteLeads}`,
    "SLA: personal touch within 24h if score:hot",
    "Website auto-sends Tier 0/1 pack (+ NDA if requested)",
    extra || "",
  ]
    .filter(Boolean)
    .join("\n");
}

function baseUrl() {
  let u = (
    process.env.SUITEDASH_BASE_URL || "https://app.suitedash.com/secure-api"
  ).replace(/\/$/, "");
  // Accept either host root or full .../secure-api
  if (!/\/secure-api$/i.test(u)) {
    u = `${u}/secure-api`;
  }
  return u;
}

function authHeaders() {
  const publicId = process.env.SUITEDASH_PUBLIC_ID;
  const secret = process.env.SUITEDASH_SECRET_KEY;
  if (!publicId || !secret) {
    throw new Error("SuiteDash is not configured");
  }
  return {
    accept: "application/json",
    "content-type": "application/json",
    "X-Public-ID": publicId,
    "X-Secret-Key": secret,
  };
}

async function suitedashFetch<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      ...authHeaders(),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    const errMsg =
      json?.message ||
      (json?.errors ? JSON.stringify(json.errors) : "") ||
      `SuiteDash error ${res.status}`;
    throw new Error(errMsg);
  }
  return json as T;
}

export function splitName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Investor", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

/**
 * Create a CRM Lead/Prospect/Client in SuiteDash.
 * Deals are NOT available via Secure API — configure Deal Generator automation in UI
 * to fire on tag `investor` / circle Investors.
 */
export async function createSuiteDashContact(
  input: CreateLeadInput
): Promise<SuiteDashContact> {
  const payload: Record<string, unknown> = {
    first_name: input.firstName,
    last_name: input.lastName || "",
    email: input.email,
    role: input.role || "Lead",
    send_welcome_email: input.sendWelcomeEmail ?? false,
  };

  if (input.phone) payload.phone = input.phone;
  if (input.title) payload.title = input.title;
  if (input.website) payload.website = input.website;
  if (input.backgroundInfo) payload.background_info = input.backgroundInfo;
  if (input.tags?.length) payload.tags = input.tags;
  if (input.circlesToAdd?.length) {
    payload.circles = { add: input.circlesToAdd };
  }
  if (input.customFields && Object.keys(input.customFields).length) {
    payload.custom_fields = input.customFields;
  }
  if (input.company?.trim()) {
    payload.company = {
      name: input.company.trim(),
      create_company_if_not_exists: true,
    };
  }

  const json = await suitedashFetch<{ data: SuiteDashContact }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!json?.data?.uid) {
    throw new Error("SuiteDash contact create returned no uid");
  }
  return json.data;
}

/** Update existing contact by UID (recommended tags / circles / notes). */
export async function updateSuiteDashContact(
  uid: string,
  input: Partial<CreateLeadInput> & { email: string; firstName: string }
): Promise<SuiteDashContact> {
  const payload: Record<string, unknown> = {
    first_name: input.firstName,
    last_name: input.lastName || "",
    email: input.email,
    role: input.role || "Lead",
  };
  if (input.phone) payload.phone = input.phone;
  if (input.title) payload.title = input.title;
  if (input.website) payload.website = input.website;
  if (input.backgroundInfo) payload.background_info = input.backgroundInfo;
  if (input.tags?.length) payload.tags = input.tags;
  if (input.circlesToAdd?.length) {
    payload.circles = { add: input.circlesToAdd };
  }
  if (input.customFields && Object.keys(input.customFields).length) {
    payload.custom_fields = input.customFields;
  }
  if (input.company?.trim()) {
    payload.company = {
      name: input.company.trim(),
      create_company_if_not_exists: true,
    };
  }

  const json = await suitedashFetch<{ data: SuiteDashContact }>(
    `/contact/${uid}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
  return json.data;
}

export function buildInvestorBackground(fields: {
  message?: string;
  investorType?: string;
  checkSize?: string;
  timeline?: string;
  accredited?: string;
  source?: string;
  page?: string;
  heat?: string;
  requestTier1?: boolean;
  requestNda?: boolean;
}): string {
  return [
    "=== MEGALODOME INVESTOR LEAD ===",
    `Source: ${fields.source || "megalodomegolf.com"}`,
    `Page: ${fields.page || "/invest"}`,
    `Investor type: ${fields.investorType || "—"}`,
    `Check size: ${fields.checkSize || "—"}`,
    `Timeline: ${fields.timeline || "—"}`,
    `Accredited: ${fields.accredited || "—"}`,
    `Score: ${fields.heat || "—"}`,
    `Tier1 pack: ${fields.requestTier1 ? "yes" : "no"}`,
    `NDA requested: ${fields.requestNda ? "yes" : "no"}`,
    "",
    fields.message || "",
    "",
    investorCrmPlaybookNote(),
  ]
    .join("\n")
    .trim();
}

/** Known custom field UIDs from this SuiteDash account (optional mapping). */
export const SUITEDASH_CUSTOM_FIELDS = {
  businessName: "350f36de-71be-475a-a5ed-63424431c09a",
  companyName: "499408c6-9c72-4600-88e9-d7fa26cfc004",
  additionalInfo: "df52c620-92db-4036-9df6-252af5590d72",
  positionTitle: "35daec0b-d952-4cbb-ab70-0d686fd212a8",
  businessWebsite: "360ff665-58d2-4c93-995a-205d44163b36",
} as const;
