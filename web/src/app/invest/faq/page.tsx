import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InvestorDisclaimer, InvestorSubnav } from "@/components/InvestorChrome";
import { investor } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Investor FAQ",
  description: "Investor FAQ for MEGALODOME GOLF Equity Fund I.",
};

export default function InvestorFaqPage() {
  return (
    <>
      <InvestorSubnav current="/invest/faq" />
      <PageHero
        eyebrow="Investor FAQ"
        title="Questions investors actually ask"
        subtitle="Crisp answers paired with the Fund I materials. Figures are modeled estimates, not guarantees."
      />
      <section className="section">
        <div className="container space-y-4">
          {investor.faqs.map((item) => (
            <details key={item.q} className="card p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--gold-soft)]">
                {item.q}
              </summary>
              <p className="muted mt-3 leading-7">{item.a}</p>
            </details>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/invest/apply" className="btn btn-primary">
              Continue to inquiry
            </Link>
            <Link href="/invest/data-room" className="btn btn-secondary">
              View data room tiers
            </Link>
          </div>
          <div className="card p-6">
            <InvestorDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
