import Image from "next/image";
import Link from "next/link";
import { gallery, homeIntro, site } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-dome.jpg"
            alt="MEGALODOME GOLF domes"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,15,.92),rgba(7,20,15,.55),rgba(7,20,15,.88))]" />
        </div>
        <div className="container relative py-20 md:py-28">
          <div className="eyebrow mb-4">Oswego, IL flagship</div>
          <h1 className="display max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            {site.name}
            <span className="mt-3 block text-[var(--gold)]">{site.tagline}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/90">{site.blurb}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/our-location" className="btn btn-primary">
              Explore the location
            </Link>
            <Link href="/invest" className="btn btn-primary">
              Investors
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact
            </Link>
            <a
              href={site.flyerPath}
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              2026 Flyer PDF
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-3">The experience</div>
            <h2 className="display text-3xl md:text-4xl">{homeIntro.title}</h2>
            <p className="muted mt-4 text-lg">{homeIntro.body}</p>
            <ul className="mt-6 space-y-3">
              {homeIntro.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <Image
              src="/images/arizona-layout.jpg"
              alt="Arizona layout"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">Gallery</div>
              <h2 className="display text-3xl">A new era of indoor golf</h2>
            </div>
            <Link href="/pictures" className="btn btn-secondary">
              View all
            </Link>
          </div>
          <div className="grid-3">
            {gallery.slice(0, 3).map((img) => (
              <div key={img.src} className="card">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={700}
                  className="h-56 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container card p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <div className="eyebrow mb-2">Target opening</div>
              <h2 className="display text-3xl md:text-4xl">{site.openTarget}</h2>
              <p className="muted mt-3 text-lg">
                Climate-controlled Arizona vibes in {site.location}. Planned
                hours: {site.hours}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/faq" className="btn btn-secondary">
                Read FAQ
              </Link>
              <Link href="/contact" className="btn btn-primary">
                Contact the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
