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
        <div className="card p-8 md:p-12 text-center">
          <div className="eyebrow mb-3">Inquiry received</div>
          <h1 className="display text-4xl md:text-5xl">Thank you</h1>
          <p className="muted mx-auto mt-4 max-w-xl text-lg leading-8">
            Your investor inquiry is in our CRM pipeline. A member of the
            MEGALODOME raise team will follow up shortly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={site.flyerPath} className="btn btn-primary" target="_blank" rel="noreferrer">
              Download flyer
            </a>
            <Link href="/invest" className="btn btn-secondary">
              Back to investors
            </Link>
            <Link href="/" className="btn btn-secondary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
