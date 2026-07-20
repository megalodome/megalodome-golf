import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InvestorDisclaimer, InvestorSubnav } from "@/components/InvestorChrome";
import { investor } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Data Room",
  description:
    "Tiered investor data room index for MEGALODOME GOLF Equity Fund I.",
};

const tiers = [
  {
    id: "0",
    name: "Tier 0 — Public",
    gate: "None — 506(c) general solicitation materials",
    items: investor.tiers.tier0,
    cta: { href: "/invest/opportunity", label: "View opportunity overview" },
  },
  {
    id: "1",
    name: "Tier 1 — Pre-meeting",
    gate: "Prospect self-identifies as accredited; typically 2–3 days pre-meeting",
    items: investor.tiers.tier1,
    cta: { href: "/invest/apply", label: "Request Tier 1 pack" },
  },
  {
    id: "2",
    name: "Tier 2 — Data room",
    gate: "Signed mutual NDA; accreditation verification underway",
    items: investor.tiers.tier2,
    cta: { href: "/invest/apply", label: "Request NDA / data room access" },
  },
  {
    id: "3",
    name: "Tier 3 — Offering & close",
    gate: "Verified accredited investors only (counsel documents)",
    items: investor.tiers.tier3,
    cta: { href: "/invest/apply", label: "Begin verification path" },
  },
];

export default function DataRoomPage() {
  return (
    <>
      <InvestorSubnav current="/invest/data-room" />
      <PageHero
        eyebrow="Data room"
        title="Document tiers & access gates"
        subtitle="Structured like our internal data-room index: public solicitation materials first; proprietary model and contracts after NDA and verification."
      />
      <section className="section">
        <div className="container space-y-6">
          <div className="card p-6">
            <p className="muted leading-7">
              Website pages summarize Tier 0–1 content for accredited-investor
              solicitation. Full native files (deck, workbook, NDA execution)
              are delivered through the raise team / SuiteDash portal after the
              correct gate. Tier 3 securities documents are produced with
              securities counsel.
            </p>
          </div>

          <div className="grid gap-4">
            {tiers.map((t) => (
              <article key={t.id} className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="display text-2xl text-[var(--gold-soft)]">
                      {t.name}
                    </h2>
                    <p className="muted mt-2 text-sm">
                      <strong className="text-white">Gate:</strong> {t.gate}
                    </p>
                  </div>
                  <Link href={t.cta.href} className="btn btn-secondary">
                    {t.cta.label}
                  </Link>
                </div>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {t.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="card p-6">
            <h3 className="display text-xl">On this website now</h3>
            <ul className="muted mt-3 list-disc space-y-2 pl-5 leading-7">
              <li>
                <Link className="text-[var(--gold)]" href="/invest/opportunity">
                  Opportunity overview
                </Link>{" "}
                — executive + one-pager + pro-forma snapshot
              </li>
              <li>
                <Link className="text-[var(--gold)]" href="/invest/faq">
                  Investor FAQ
                </Link>
              </li>
              <li>
                <Link className="text-[var(--gold)]" href="/invest/process">
                  Process / roadmap
                </Link>
              </li>
              <li>
                <Link className="text-[var(--gold)]" href="/invest/apply">
                  Inquiry form
                </Link>{" "}
                — creates CRM lead + pipeline routing
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <InvestorDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
