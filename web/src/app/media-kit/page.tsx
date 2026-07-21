import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "MEGALODOME GOLF media kit — flyer, advertorial, and full-page ads.",
};

export default function MediaKitPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Media kit"
        subtitle="Download the flyer / advertorial and full-page ads for press and partner use."
      />
      <section className="section">
        <div className="container max-w-3xl space-y-6">
          <article className="card p-7">
            <h2 className="display text-2xl text-[var(--gold-soft)]">
              Flyer / Advertorial
            </h2>
            <div className="divider" />
            <p className="muted mb-5 leading-7">
              2-page MEGALODOME GOLF advertorial PDF.
            </p>
            <a
              href={site.flyerPath}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Download flyer
            </a>
          </article>

          <article className="card p-7">
            <h2 className="display text-2xl text-[var(--gold-soft)]">
              Full-page ads
            </h2>
            <div className="divider" />
            <p className="muted mb-5 leading-7">
              Final full-page ad creatives A, B, and C.
            </p>
            <div className="flex flex-wrap gap-3">
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
          </article>
        </div>
      </section>
    </>
  );
}
