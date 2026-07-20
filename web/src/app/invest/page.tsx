import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Investor information for MEGALODOME GOLF — the world's first REAL indoor golf experience in Oswego, IL.",
};

const highlights = [
  {
    title: "Category-defining asset",
    body: "World’s first traditional indoor golf experience under proprietary domes — Arizona-style play, year-round.",
  },
  {
    title: "Flagship market",
    body: `${site.location} / Chicagoland demand with weather-driven seasonality that indoor golf solves.`,
  },
  {
    title: "Full experience stack",
    body: "Par-30 executive course, practice academy, simulators, clubhouse, pro shop, F&B — not a single-bay concept.",
  },
  {
    title: "Clear timeline",
    body: `Target opening ${site.openTarget}. Financing process underway.`,
  },
];

export default function InvestPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Partner in THE NEXT REVOLUTION™ of golf"
        subtitle="MEGALODOME GOLF is building climate-controlled, Arizona-style golf under the largest domes in North America — starting with our Oswego, IL flagship."
      />

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <div className="eyebrow mb-3">The opportunity</div>
            <h2 className="display text-3xl md:text-4xl">
              Real golf. Real course. Real indoor.
            </h2>
            <p className="muted mt-4 text-lg leading-8">
              We&apos;re not building another simulator lounge. MEGALODOME recreates
              traditional golf — undulating greens, bunkers, water, and a full
              practice ecosystem — inside climate-controlled domes so players can
              play 12 months a year.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/invest/apply" className="btn btn-primary">
                Start investor inquiry
              </Link>
              <a
                href={site.flyerPath}
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Download 2026 flyer
              </a>
              <Link href="/contact?interest=investor" className="btn btn-secondary">
                Quick contact
              </Link>
            </div>
          </div>
          <div className="card">
            <Image
              src="/images/hero-dome.jpg"
              alt="MEGALODOME domes"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="mb-6">
            <div className="eyebrow mb-2">Why MEGALODOME</div>
            <h2 className="display text-3xl">Investment thesis highlights</h2>
          </div>
          <div className="grid-2">
            {highlights.map((h) => (
              <article key={h.title} className="card p-6">
                <h3 className="display text-xl text-[var(--gold-soft)]">
                  {h.title}
                </h3>
                <p className="muted mt-3 leading-7">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container card p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <div className="eyebrow mb-2">Next step</div>
              <h2 className="display text-3xl">
                Tell us about your interest
              </h2>
              <p className="muted mt-3 text-lg">
                Inquiries route into our investor CRM pipeline so the raise team
                can follow up with the right materials and staging.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/invest/apply" className="btn btn-primary">
                Investor application
              </Link>
              <Link href="/news" className="btn btn-secondary">
                Press coverage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
