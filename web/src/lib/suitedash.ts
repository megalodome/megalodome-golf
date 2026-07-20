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

function baseUrl() {
  return (
    process.env.SUITEDASH_BASE_URL ||
    "https://app.suitedash.com/secure-api"
  ).replace(/\/$/, "");
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

/** Split a full name into first/last. */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Investor", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

/**
 * Create (or attempt create) a CRM Lead/Prospect/Client in SuiteDash.
 * Deals are NOT available via Secure API — configure Deal Generator automation in SuiteDash UI
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

export function buildInvestorBackground(fields: {
  message?: string;
  investorType?: string;
  checkSize?: string;
  timeline?: string;
  accredited?: string;
  source?: string;
  page?: string;
}): string {
  return [
    "=== MEGALODOME INVESTOR LEAD ===",
    `Source: ${fields.source || "megalodomegolf.com"}`,
    `Page: ${fields.page || "/invest"}`,
    `Investor type: ${fields.investorType || "—"}`,
    `Check size: ${fields.checkSize || "—"}`,
    `Timeline: ${fields.timeline || "—"}`,
    `Accredited: ${fields.accredited || "—"}`,
    "",
    fields.message || "",
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
