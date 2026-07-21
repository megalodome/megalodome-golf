import Link from "next/link";
import { footerExplore, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[rgba(238,220,167,0.15)] bg-[#0a0a0a]">
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
            {footerExplore.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Investors & contact
          </div>
          <div className="flex flex-col gap-2 text-[var(--muted)]">
            <Link href="/invest">Investors</Link>
            <Link href="/invest/apply">Investor inquiry</Link>
            <a href={site.bookingUrl} target="_blank" rel="noreferrer">
              Book a call
            </a>
            <Link href="/contact">Contact</Link>
            <Link href="/media-kit">Media Kit</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4">
        <div className="container flex flex-col gap-2 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              Copyright © {new Date().getFullYear()} MEGALODOME GOLF — All
              Rights Reserved.
            </span>
            <span className="hidden text-[rgba(238,220,167,0.35)] sm:inline">
              ·
            </span>
            <Link
              href="/privacy"
              className="text-[var(--muted)] transition hover:text-[var(--gold)]"
            >
              Privacy Policy
            </Link>
            <span className="text-[rgba(238,220,167,0.35)]">·</span>
            <Link
              href="/terms"
              className="text-[var(--muted)] transition hover:text-[var(--gold)]"
            >
              Terms of Service
            </Link>
          </span>
          <span>Target opening: {site.openTarget}</span>
        </div>
      </div>
    </footer>
  );
}
