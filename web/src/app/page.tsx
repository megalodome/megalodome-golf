import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { homeIntro, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "MEGALODOME GOLF — Home",
};

const features = [
  {
    img: "/images/gallery/render-02.jpg",
    title: "Par 3 Holes",
    body: "100–160 yards with undulating greens, bunkers and water hazards. Design by Huxham Golf Design Inc.",
  },
  {
    img: "/images/gallery/render-09.jpg",
    title: "Par 4 Holes",
    body: "Arizona-style layout with three par-4s at 270–280 yards — defended greens for long hitters.",
  },
  {
    img: "/images/gallery/render-14.jpg",
    title: "Water & desert drama",
    body: "Lakes, rockwork, palms, and waste areas create a true destination experience inside the domes.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div
          className="home-hero-bg"
          style={{ backgroundImage: "url('/images/hero-dome.jpg')" }}
        />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <span className="home-hero-eyebrow">Welcome to</span>
          <h1>
            MEGALODOME
            <br />
            GOLF
          </h1>
          <p className="home-hero-sub">&quot;THE NEXT REVOLUTION&quot;™</p>
          <p className="home-hero-tagline">
            The World&apos;s First REAL Indoor Golf Experience
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/our-location" className="btn btn-primary">
              Discover More
            </Link>
            <Link href="/invest" className="btn btn-secondary">
              Investors
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-label mb-3">Introduction</p>
            <h2 className="display text-4xl md:text-5xl">{homeIntro.title}</h2>
            <div className="divider" />
            <p className="muted text-base leading-8">{homeIntro.body}</p>
            <ul className="mt-5 space-y-2">
              {homeIntro.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[var(--text)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <Image
              src="/images/gallery/render-03.jpg"
              alt="Indoor Arizona-style green under the MEGALODOME canopy"
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
          <div className="specs-row">
            <div className="spec-item">
              <div className="spec-number">9</div>
              <div className="spec-label">Executive Holes — Par 30</div>
            </div>
            <div className="spec-item">
              <div className="spec-number">4</div>
              <div className="spec-label">Proprietary Domes</div>
            </div>
            <div className="spec-item">
              <div className="spec-number">275</div>
              <div className="spec-label">Yards — Practice Range</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <p className="section-label mb-2 text-center">The Course</p>
          <h2 className="display mb-8 text-center text-4xl">What Awaits You</h2>
          <div className="grid-3">
            {features.map((f) => (
              <article key={f.title} className="card">
                <Image
                  src={f.img}
                  alt={f.title}
                  width={800}
                  height={560}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="display text-2xl text-[var(--gold)]">{f.title}</h3>
                  <p className="muted mt-2 text-sm leading-7">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container max-w-4xl">
          <p className="section-label mb-2 text-center">See It in Action</p>
          <h2 className="display mb-2 text-center text-4xl">Watch Our Video</h2>
          <p className="mb-6 text-center italic text-[var(--text-muted)]">
            MEGALODOME GOLF &quot;THE NEXT REVOLUTION&quot;™
          </p>
          <div className="video-wrap">
            <video
              className="h-full w-full"
              controls
              playsInline
              preload="metadata"
              poster="/images/invest-domes.jpg"
              controlsList="nodownload"
            >
              <source src="/video/megalodome-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container card p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="section-label mb-2">Investment Opportunity</p>
              <h2 className="display text-3xl md:text-4xl">
                Investor Information
              </h2>
              <div className="divider" />
              <p className="muted text-lg leading-8">
                MEGALODOME GOLF Equity Fund I — Chicago West flagship. Explore the
                opportunity, data room tiers, and inquiry path for accredited
                investors.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/invest" className="btn btn-primary">
                Investor Portal
              </Link>
              <a href={site.flyerPath} className="btn btn-secondary" target="_blank" rel="noreferrer">
                Flyer / Advertorial
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
