import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
  InvestorDisclaimer,
  InvestorSubnav,
  MetricStrip,
} from "@/components/InvestorChrome";
import { investor } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Investment Opportunity",
  description:
    "Executive overview of MEGALODOME GOLF Equity Fund I — Chicago West flagship.",
};

function takeUseful(lines: string[], max = 12) {
  const skip =
    /^(MEGALODOME|THE NEXT|Confidential|CONFIDENTIAL|An institutional|Flagship Development|1 ·|2 ·|3 ·|4 ·|5 ·|6 ·|Why This|Revenue Streams|The Ask|\$25M Equity)/i;
  const out: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || skip.test(t) || t.startsWith("[Table") || t.includes(" | ") && t.length < 40)
      continue;
    if (t.length < 40) continue;
    out.push(t);
    if (out.length >= max) break;
  }
  return out;
}

export default function OpportunityPage() {
  const h = investor.headline;
  const exec = takeUseful(investor.execParas, 10);
  const one = takeUseful(investor.onePagerParas, 6);

  return (
    <>
      <InvestorSubnav current="/invest/opportunity" />
      <PageHero
        eyebrow="Opportunity"
        title="Chicago West flagship — Fund I overview"
        subtitle={`${investor.fund} · ${h.location} · target opening ${h.openTarget}`}
      />
      <section className="section">
        <div className="container space-y-10">
          <MetricStrip
            items={[
              { label: "Total cap", value: h.totalCap },
              { label: "Equity", value: h.equityRaise },
              { label: "Debt", value: h.debt },
              { label: "Yr-5 EBITDA", value: h.yr5Ebitda },
              { label: "Open", value: h.openTarget },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-2">
            <article className="card p-7">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                Executive narrative
              </h2>
              <div className="mt-4 space-y-4">
                {exec.map((p) => (
                  <p key={p.slice(0, 40)} className="muted leading-7">
                    {p}
                  </p>
                ))}
              </div>
            </article>
            <article className="card p-7">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                One-pager highlights
              </h2>
              <div className="mt-4 space-y-4">
                {one.map((p) => (
                  <p key={p.slice(0, 40)} className="muted leading-7">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/invest/apply" className="btn btn-primary">
                  Request materials / apply
                </Link>
                <Link href="/invest/faq" className="btn btn-secondary">
                  Investor FAQ
                </Link>
              </div>
            </article>
          </div>

          <div className="card p-6">
            <InvestorDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
