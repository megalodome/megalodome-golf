import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function InvestThankYouPage() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <div className="card p-8 text-center md:p-12">
          <div className="eyebrow mb-3">Inquiry received</div>
          <h1 className="display text-4xl md:text-5xl">Thank you</h1>
          <p className="muted mx-auto mt-4 max-w-xl text-lg leading-8">
            Your investor inquiry is in our CRM pipeline. If you requested the
            pre-meeting pack and/or Mutual NDA, check your inbox (and spam) for
            the PDF materials.
          </p>
          <div className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-[var(--muted)]">
            <div className="rounded-lg border border-[var(--line)] px-4 py-3">
              <strong className="text-[var(--gold-light)]">1. Materials</strong>
              <div className="mt-1">
                Review your Tier 0–1 pack (and NDA if requested) in email.
              </div>
            </div>
            <div className="rounded-lg border border-[rgba(238,220,167,0.35)] bg-[rgba(238,220,167,0.06)] px-4 py-3">
              <strong className="text-[var(--gold-light)]">2. Book discovery</strong>
              <div className="mt-1">
                Reserve a 20-min call with Nick / the raise team — highest
                priority next step.
              </div>
            </div>
            <div className="rounded-lg border border-[var(--line)] px-4 py-3">
              <strong className="text-[var(--gold-light)]">3. Diligence path</strong>
              <div className="mt-1">
                Execute NDA to unlock Tier 2 data-room access when ready.
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={site.bookingUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Book a 20-min call
            </a>
            <a
              href="/docs/investor/one-pager.pdf"
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              One-pager PDF
            </a>
            <Link href="/invest/data-room" className="btn btn-secondary">
              Data room
            </Link>
            <Link href="/invest" className="btn btn-secondary">
              Investors home
            </Link>
          </div>
          <p className="muted mx-auto mt-8 max-w-xl text-xs leading-5">
            CONFIDENTIAL — accredited investors only. Not an offer to sell
            securities. Offering solely via Confidential PPM under Reg D 506(c).
          </p>
        </div>
      </div>
    </section>
  );
}
