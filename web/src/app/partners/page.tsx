import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners & Developers",
  description:
    "Chicago-area GCs, facility operators, equipment partners, and trade collaborators for MEGALODOME GOLF Chicago West.",
};

const categories = [
  {
    title: "General contractors & design-build",
    body: "Large-span structures, civil, and complex indoor sports environments.",
  },
  {
    title: "Golf facility operators",
    body: "Management groups and operators interested in next-gen indoor traditional golf.",
  },
  {
    title: "Equipment & technology",
    body: "Range, tracking, lighting, climate, and player-experience systems.",
  },
  {
    title: "Turf & sports surfaces",
    body: "Specialty turf, green complexes, bunkers, and performance surfaces.",
  },
  {
    title: "Architects & engineers",
    body: "Sports architecture, MEPs, and specialty consultants for dome facilities.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Trade & partners"
        title="Build with MEGALODOME GOLF"
        subtitle="Chicago West flagship — partnership and vendor introductions for qualified trade teams. This page is not an investor solicitation."
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="display text-3xl md:text-4xl">Who we talk to</h2>
            <p className="muted mt-4 max-w-2xl text-base leading-8">
              MEGALODOME GOLF Chicago West is a multi-dome indoor traditional
              golf destination targeting Oswego, IL. We evaluate partners across
              construction, operations, equipment, and specialty trades.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {categories.map((c) => (
                <div key={c.title} className="card p-5">
                  <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{c.body}</p>
                </div>
              ))}
            </div>
            <div className="card mt-8 p-6">
              <h3 className="display text-2xl">How introductions work</h3>
              <ol className="muted mt-4 list-decimal space-y-2 pl-5 text-sm leading-7">
                <li>Submit the partner form with your trade category and IL presence.</li>
                <li>Our ops team reviews fit against current bid packages.</li>
                <li>
                  If aligned, we schedule a short vendor intro call (separate from
                  investor discovery).
                </li>
              </ol>
              <p className="mt-4 text-xs text-[var(--muted)]">
                Looking to invest instead? Visit the{" "}
                <Link href="/invest" className="text-[var(--gold)] underline">
                  Investors
                </Link>{" "}
                page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.vendorFormUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vendor / developer form
                </a>
                <Link href="/contact?interest=partnership" className="btn btn-secondary">
                  General contact
                </Link>
                <Link href="/media-kit" className="btn btn-secondary">
                  Media kit
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <div className="eyebrow">Partner inquiry</div>
              <h2 className="display mt-2 text-3xl">Tell us about your firm</h2>
            </div>
            <Suspense fallback={<div className="card p-6 muted">Loading form…</div>}>
              <ContactForm forcedInterest="partnership" />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
