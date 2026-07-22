"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
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

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const aboutRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  // Close desktop About submenu only when clicking outside it
  useEffect(() => {
    function onDocPointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (!aboutRef.current?.contains(target)) {
        setAboutOpen(false);
      }
      if (!searchWrapRef.current?.contains(target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocPointerDown);
    document.addEventListener("touchstart", onDocPointerDown);
    return () => {
      document.removeEventListener("mousedown", onDocPointerDown);
      document.removeEventListener("touchstart", onDocPointerDown);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      searchInputRef.current?.focus();
      return;
    }
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(238,220,167,0.15)] bg-[rgba(10,10,10,0.92)] backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-3">
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

          {/* Cascading search */}
          <div ref={searchWrapRef} className="relative ml-1 flex items-center">
            <form
              onSubmit={submitSearch}
              className={`flex items-center overflow-hidden border border-[rgba(238,220,167,0.35)] bg-[rgba(0,0,0,0.55)] transition-all duration-300 ease-out ${
                searchOpen
                  ? "mr-1 w-[15.5rem] opacity-100"
                  : "w-0 border-transparent opacity-0"
              }`}
              aria-hidden={!searchOpen}
            >
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search site…"
                className="h-9 w-full bg-transparent px-3 text-[0.75rem] text-[var(--text-light)] outline-none placeholder:text-[var(--muted)]"
                tabIndex={searchOpen ? 0 : -1}
                aria-label="Search the website"
              />
            </form>
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center border transition ${
                searchOpen
                  ? "border-[var(--gold)] bg-[var(--gold)] text-black"
                  : "border-[rgba(238,220,167,0.35)] text-[var(--gold)] hover:bg-white/5"
              }`}
              aria-label={searchOpen ? "Submit search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={(e) => {
                if (!searchOpen) {
                  setSearchOpen(true);
                  return;
                }
                // second click submits if query present
                const q = query.trim();
                if (q) {
                  e.preventDefault();
                  setSearchOpen(false);
                  router.push(`/search?q=${encodeURIComponent(q)}`);
                } else {
                  searchInputRef.current?.focus();
                }
              }}
            >
              <SearchIcon />
            </button>
          </div>

          <Link
            href="/login"
            className={`ml-2 border border-[rgba(238,220,167,0.35)] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition ${
              pathname === "/login" || pathname.startsWith("/login/")
                ? "bg-[var(--gold)] text-black"
                : "text-[var(--gold)] hover:bg-white/5"
            }`}
          >
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center border transition ${
              searchOpen
                ? "border-[var(--gold)] bg-[var(--gold)] text-black"
                : "border-[rgba(238,220,167,0.25)] text-[var(--gold)]"
            }`}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((v) => !v);
              setMobileOpen(false);
            }}
          >
            <SearchIcon className="h-[1.05rem] w-[1.05rem]" />
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(238,220,167,0.25)] text-[var(--gold)]"
            onClick={() => {
              setMobileOpen((v) => !v);
              setSearchOpen(false);
            }}
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
      </div>

      {/* Mobile / cascade search panel under header bar */}
      <div
        className={`overflow-hidden border-t border-[rgba(238,220,167,0.12)] bg-[rgba(10,10,10,0.98)] transition-all duration-300 ease-out lg:hidden ${
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <form onSubmit={submitSearch} className="container flex items-center gap-2 py-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the website…"
            className="input h-11 flex-1"
            aria-label="Search the website"
          />
          <button type="submit" className="btn btn-primary h-11 px-4">
            Go
          </button>
        </form>
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
            <Link
              href="/login"
              className="border-b border-[rgba(238,220,167,0.08)] py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--gold)]"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
