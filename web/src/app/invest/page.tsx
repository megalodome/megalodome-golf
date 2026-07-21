import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
  InvestorDisclaimer,
  InvestorSubnav,
  MetricStrip,
} from "@/components/InvestorChrome";
import { investor } from "@/lib/investor";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "MEGALODOME GOLF Equity Fund I — Chicago West flagship indoor golf development for accredited investors (Reg D 506(c)).",
};

export default function InvestPage() {
  const h = investor.headline;
  return (
    <>
      <InvestorSubnav current="/invest" />
      <PageHero
        eyebrow="Investors · Reg D 506(c)"
        title="Partner in THE NEXT REVOLUTION™ of golf"
        subtitle={`MEGALODOME GOLF Equity Fund I — ${h.equityRaise} equity alongside ${h.debt} debt to build the world’s first fully playable indoor golf course in ${h.location}.`}
      />

      <section className="section pt-8">
        <div className="container space-y-8">
          <MetricStrip
            items={[
              { label: "Equity raise", value: h.equityRaise },
              { label: "Total capitalization", value: h.totalCap },
              { label: "Pref. return", value: h.prefReturn },
              { label: "Modeled IRR", value: h.modeledIRR },
              { label: "Modeled MOIC", value: h.modeledMOIC },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <div className="eyebrow mb-3">The opportunity</div>
              <h2 className="display text-3xl md:text-4xl">
                Real golf. Real course. Real indoor.
              </h2>
              <p className="muted mt-4 text-lg leading-8">
                Not a simulator venue and not a driving range — a genuine,
                walkable executive course inside climate-controlled domes for
                365-day play. Flagship site in Oswego, Illinois with Village
                Board approval (September 2024). Target opening{" "}
                {h.openTarget}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/invest/apply" className="btn btn-primary">
                  Start investor inquiry
                </Link>
                <Link href="/invest/opportunity" className="btn btn-secondary">
                  Read the opportunity
                </Link>
                <Link href="/invest/data-room" className="btn btn-secondary">
                  Data room tiers
                </Link>
                <a
                  href={site.flyerPath}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Flyer / Advertorial PDF
                </a>
              </div>
            </div>
            <div className="card">
              <Image
                src="/images/invest-domes.jpg"
                alt="MEGALODOME GOLF domes — summer and winter campus concept"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="grid-2">
            {[
              {
                t: "Category creator",
                b: "Topgolf, Five Iron and X-Golf monetize entertainment or practice. MEGALODOME delivers a real round indoors.",
              },
              {
                t: "Cold-climate demand",
                b: "Chicago’s outdoor season closes 5–7 months. Off-course U.S. participation (32.9M) has overtaken on-course play.",
              },
              {
                t: "Capital structure",
                b: `${h.equityRaise} equity across fund / membership / outside tranches with ${h.debt} debt against a ${h.totalCap} project cap.`,
              },
              {
                t: "Modeled outcome",
                b: `Illustrative blended ${h.modeledIRR} IRR / ${h.modeledMOIC} MOIC over ~5 years; Yr-5 EBITDA modeled at ${h.yr5Ebitda}. Not a guarantee.`,
              },
            ].map((x) => (
              <article key={x.t} className="card p-6">
                <h3 className="display text-xl text-[var(--gold-soft)]">{x.t}</h3>
                <p className="muted mt-3 leading-7">{x.b}</p>
              </article>
            ))}
          </div>

          <div className="card p-6">
            <InvestorDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
