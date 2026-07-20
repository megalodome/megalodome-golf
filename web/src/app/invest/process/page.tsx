import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InvestorDisclaimer, InvestorSubnav } from "@/components/InvestorChrome";
import { investor } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Investor Process",
  description: "How investor engagement and capital deployment are sequenced for Fund I.",
};

const phases = [
  {
    title: "1 · Close & Capitalize (2026)",
    body: "Financing closes; $77.0M committed; interest reserve and contingency funded. $25M equity subscribed — 10% preferred-return clock starts.",
  },
  {
    title: "2 · Build (2026–2027)",
    body: "Four climate-controlled domes, par-30 course and clubhouse constructed; debt drawn. Preferred return accrues during construction.",
  },
  {
    title: "3 · Open (Fall 2027)",
    body: "Doors open — real indoor golf, extended daily hours, 365 days a year. Revenue begins; Year-1 is a partial ramp year.",
  },
  {
    title: "4 · Ramp & Stabilize (2028–2030)",
    body: "Occupancy ramps across multiple revenue streams toward ~62% EBITDA margin by Year 3. Cash preferred distributions and quarterly reporting.",
  },
  {
    title: "5 · Return Capital (~2031)",
    body: "Stabilized operations; refinance or sale at modeled exit multiple, net of debt — returning capital plus preferred and upside participation per class.",
  },
];

const journey = [
  {
    t: "Tier 0 — Public solicitation",
    d: "One-pager, landing page, marketing deck. No NDA required under 506(c) general solicitation posture.",
  },
  {
    t: "Tier 1 — Pre-meeting pack",
    d: "After accredited self-ID: Executive Summary, Pro-Forma Summary, Roadmap, FAQ, Abbreviations.",
  },
  {
    t: "Meeting",
    d: "Earn the next step — not a same-day close. Book diligence / NDA path.",
  },
  {
    t: "Tier 2 — Data room",
    d: "Mutual NDA + verification underway unlocks deeper model, asset detail, contracts as available.",
  },
  {
    t: "Tier 3 — Offering & close",
    d: "Verified accredited investors only: PPM, subscription docs, operating agreement (counsel).",
  },
];

export default function ProcessPage() {
  return (
    <>
      <InvestorSubnav current="/invest/process" />
      <PageHero
        eyebrow="Process"
        title="Investor roadmap & engagement path"
        subtitle="Five-year project path and how materials are gated from first conversation to close."
      />
      <section className="section">
        <div className="container space-y-10">
          <div>
            <div className="eyebrow mb-2">Project path</div>
            <h2 className="display text-3xl">Capital → build → open → exit</h2>
            <div className="mt-6 grid gap-4">
              {phases.map((p) => (
                <article key={p.title} className="card p-5">
                  <h3 className="font-semibold text-[var(--gold-soft)]">{p.title}</h3>
                  <p className="muted mt-2 leading-7">{p.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-2">Your journey</div>
            <h2 className="display text-3xl">How we share information</h2>
            <p className="muted mt-3 max-w-3xl">
              Under Rule 506(c) we may generally solicit, provided purchasers are
              accredited and verified. We gate the data room — not the brochure.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {journey.map((j) => (
                <article key={j.t} className="card p-5">
                  <h3 className="font-semibold text-[var(--gold-soft)]">{j.t}</h3>
                  <p className="muted mt-2 leading-7">{j.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/invest/apply" className="btn btn-primary">
              Start inquiry
            </Link>
            <Link href="/invest/data-room" className="btn btn-secondary">
              Data room index
            </Link>
          </div>

          <div className="card p-6">
            <InvestorDisclaimer />
            <p className="muted mt-3 text-xs">
              Roadmap figures align to internal investor materials for{" "}
              {investor.fund}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
