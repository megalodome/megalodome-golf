"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(238,220,167,0.15)] bg-[rgba(10,10,10,0.92)] backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/logo-white.png"
            alt={site.name}
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition ${
                  active ? "text-[var(--gold)]" : "text-[var(--text)] hover:text-[var(--gold)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/invest" className="btn btn-primary hidden sm:inline-flex">
            Investors
          </Link>
          <button
            type="button"
            className="btn btn-secondary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[rgba(238,220,167,0.12)] bg-[rgba(10,10,10,0.98)] lg:hidden">
          <div className="container flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-[rgba(238,220,167,0.08)] py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
