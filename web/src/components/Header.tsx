"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, type NavItem } from "@/lib/content";

function isActive(pathname: string, item: NavItem) {
  if (item.children?.length) {
    return item.children.some(
      (c) => pathname === c.href || pathname.startsWith(`${c.href}/`)
    );
  }
  if (!item.href) return false;
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
  }, [pathname]);

  // Close desktop About submenu only when clicking outside it
  useEffect(() => {
    function onDocPointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (!aboutRef.current?.contains(target)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocPointerDown);
    document.addEventListener("touchstart", onDocPointerDown);
    return () => {
      document.removeEventListener("mousedown", onDocPointerDown);
      document.removeEventListener("touchstart", onDocPointerDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(238,220,167,0.15)] bg-[rgba(10,10,10,0.92)] backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/brand/logo-white.png"
            alt={site.name}
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-end lg:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item);

            if (item.children?.length) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  ref={aboutRef}
                  onMouseEnter={() => setAboutOpen(true)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-2.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition ${
                      active || aboutOpen
                        ? "text-[var(--gold)]"
                        : "text-[var(--text)] hover:text-[var(--gold)]"
                    }`}
                    aria-expanded={aboutOpen}
                    aria-haspopup="menu"
                    onFocus={() => setAboutOpen(true)}
                    onClick={(e) => {
                      // Keep open on click of label; outside click closes
                      e.preventDefault();
                      setAboutOpen(true);
                    }}
                  >
                    {item.label}
                    <span className="text-[0.55rem] opacity-70">▾</span>
                  </button>
                  {aboutOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full z-50 min-w-[11rem] border border-[rgba(238,220,167,0.18)] bg-[rgba(10,10,10,0.98)] py-2 shadow-xl backdrop-blur-md"
                    >
                      {item.children.map((child) => {
                        const childActive =
                          pathname === child.href ||
                          pathname.startsWith(`${child.href}/`);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition ${
                              childActive
                                ? "text-[var(--gold)]"
                                : "text-[var(--text)] hover:bg-white/5 hover:text-[var(--gold)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href || "/"}
                className={`px-2.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "text-[var(--gold)]"
                    : "text-[var(--text)] hover:text-[var(--gold)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(238,220,167,0.25)] text-[var(--gold)] lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-[var(--gold)] transition ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-[var(--gold)] transition ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-[var(--gold)] transition ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[rgba(238,220,167,0.12)] bg-[rgba(10,10,10,0.98)] lg:hidden">
          <div className="container flex flex-col py-2">
            {nav.map((item) => {
              if (item.children?.length) {
                return (
                  <div
                    key={item.label}
                    className="border-b border-[rgba(238,220,167,0.08)]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text)]"
                      onClick={() => setMobileAboutOpen((v) => !v)}
                      aria-expanded={mobileAboutOpen}
                    >
                      {item.label}
                      <span className="text-[var(--gold)]">
                        {mobileAboutOpen ? "−" : "+"}
                      </span>
                    </button>
                    {mobileAboutOpen
                      ? item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block border-t border-[rgba(238,220,167,0.06)] py-3 pl-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))
                      : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href || "/"}
                  className="border-b border-[rgba(238,220,167,0.08)] py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
