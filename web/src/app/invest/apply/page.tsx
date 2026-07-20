import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InvestorForm } from "@/components/InvestorForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investor Inquiry",
  description: "Submit an investor inquiry for MEGALODOME GOLF.",
};

export default function InvestApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Investor inquiry"
        title="Connect with the raise team"
        subtitle="Share a few details and we’ll follow up with next steps. This form creates a CRM lead and investor pipeline entry."
      />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <InvestorForm />
          <aside className="card h-fit p-7">
            <h2 className="display text-2xl">What happens next</h2>
            <ol className="muted mt-5 list-decimal space-y-3 pl-5 leading-7">
              <li>Your inquiry is logged in our investor CRM as a Lead.</li>
              <li>A deal card opens in the Investor Raise pipeline.</li>
              <li>Our team sends materials and books a call if there’s a fit.</li>
            </ol>
            <div className="mt-6 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
              <p>
                <strong className="text-white">Flagship:</strong> {site.location}
              </p>
              <p className="mt-2">
                <strong className="text-white">Target open:</strong>{" "}
                {site.openTarget}
              </p>
              <p className="mt-2">
                <a className="text-[var(--gold)]" href={site.flyerPath}>
                  Download 2026 flyer (PDF)
                </a>
              </p>
              <p className="mt-4 text-xs">
                Not an offer to sell securities. Information is for accredited /
                qualified prospective investors where permitted.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
