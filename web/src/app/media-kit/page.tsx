import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Media",
  description: "Press and media contact for MEGALODOME GOLF.",
};

export default function MediaKitPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Press & media"
        subtitle="For press inquiries and media requests, contact the MEGALODOME team."
      />
      <section className="section">
        <div className="container max-w-3xl">
          <article className="card p-7">
            <h2 className="display text-2xl text-[var(--gold-soft)]">
              Media inquiries
            </h2>
            <div className="divider" />
            <p className="muted mb-5 leading-7">
              Reach the team for interviews, brand assets, and partnership press.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact?interest=media" className="btn btn-primary">
                Contact media team
              </Link>
              <Link href="/pictures" className="btn btn-secondary">
                View gallery
              </Link>
              <Link href="/news" className="btn btn-secondary">
                News coverage
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
