import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InvestorForm } from "@/components/InvestorForm";
import { InvestorDisclaimer, InvestorSubnav } from "@/components/InvestorChrome";
import { site } from "@/lib/content";
import { investor } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Investor Inquiry",
  description: "Submit an investor inquiry for MEGALODOME GOLF Equity Fund I.",
};

export default function InvestApplyPage() {
  return (
    <>
      <InvestorSubnav current="/invest/apply" />
      <PageHero
        eyebrow="Investor inquiry"
        title="Connect with the raise team"
        subtitle="Share a few details. We’ll route you in CRM, send the right tier of materials, and book the next step."
      />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <InvestorForm />
          <aside className="card h-fit space-y-6 p-7">
            <div>
              <h2 className="display text-2xl">What you unlock</h2>
              <ol className="muted mt-4 list-decimal space-y-3 pl-5 leading-7">
                <li>CRM Lead + investor pipeline card</li>
                <li>Tier 1 pack after accredited self-ID</li>
                <li>NDA → Tier 2 data room (model, asset detail)</li>
                <li>Verification → Tier 3 offering docs (counsel)</li>
              </ol>
            </div>
            <div className="border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
              <p>
                <strong className="text-white">Fund:</strong> {investor.fund}
              </p>
              <p className="mt-2">
                <strong className="text-white">Flagship:</strong>{" "}
                {investor.headline.location}
              </p>
              <p className="mt-2">
                <strong className="text-white">Ask:</strong>{" "}
                {investor.headline.equityRaise} equity ·{" "}
                {investor.headline.totalCap} total cap
              </p>
              <p className="mt-2">
                <a className="text-[var(--gold)]" href={site.flyerPath}>
                  Flyer / Advertorial PDF
                </a>
              </p>
            </div>
            <InvestorDisclaimer compact />
          </aside>
        </div>
      </section>
    </>
  );
}
