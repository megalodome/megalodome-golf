import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--line)] bg-[#06110d]">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="display text-2xl">{site.name}</div>
          <p className="mt-2 text-[var(--gold)]">{site.tagline}</p>
          <p className="muted mt-3 max-w-md">
            The world&apos;s first REAL indoor golf experience — flagship coming
            to {site.location}.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Explore
          </div>
          <div className="flex flex-col gap-2 text-[var(--muted)]">
            <Link href="/our-mission">Our Mission</Link>
            <Link href="/our-location">Our Location</Link>
            <Link href="/pictures">Pictures</Link>
            <Link href="/news">News</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Investors & contact
          </div>
          <div className="flex flex-col gap-2 text-[var(--muted)]">
            <Link href="/contact">Contact us</Link>
            <a href={site.flyerPath} target="_blank" rel="noreferrer">
              2026 Flyer (PDF)
            </a>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4">
        <div className="container flex flex-col gap-2 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            Copyright © {new Date().getFullYear()} MEGALODOME GOLF — All Rights
            Reserved.
          </span>
          <span>Target opening: {site.openTarget}</span>
        </div>
      </div>
    </footer>
  );
}
