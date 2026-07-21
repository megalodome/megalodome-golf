import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { news, site } from "@/lib/content";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="The future of golf is here"
        subtitle="MEGALODOME GOLF is leading the charge. Discover why the media is buzzing."
      />
      <section className="section">
        <div className="container space-y-8">
          <div className="card p-7">
            <p className="section-label mb-2">Media kit</p>
            <h2 className="display text-2xl text-[var(--gold-soft)] md:text-3xl">
              Download ads & flyer
            </h2>
            <div className="divider" />
            <p className="muted mb-5 max-w-3xl leading-7">
              Full-page ads and the 2-page advertorial for press and
              partner use.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.flyerPath}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Flyer / Advertorial
              </a>
              {site.fullPageAds.map((ad) => (
                <a
                  key={ad.href}
                  href={ad.href}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {ad.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {news.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="card block p-5 transition hover:border-[var(--gold)]"
              >
                <div className="text-lg font-medium">{item.title}</div>
                <div className="muted mt-2 break-all text-sm">{item.href}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
