import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title='We are "THE NEXT REVOLUTION"™ in golf'
        subtitle="We love hearing from players, partners, media, and investors."
      />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <ContactForm />
          <div className="card p-7">
            <h2 className="display text-2xl">Direct channels</h2>
            <div className="mt-5 space-y-4 text-[var(--muted)]">
              <p>
                <strong className="text-white">Location focus:</strong>{" "}
                {site.location}
              </p>
              <p>
                <strong className="text-white">Opening target:</strong>{" "}
                {site.openTarget}
              </p>
              <p>
                <strong className="text-white">Investor packet:</strong>{" "}
                <a className="text-[var(--gold)]" href={site.flyerPath}>
                  Download 2026 flyer PDF
                </a>
              </p>
              <p>
                Messages are stored securely and emailed to the MEGALODOME team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
