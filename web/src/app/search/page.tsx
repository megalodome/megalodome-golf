import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { searchSite } from "@/lib/searchIndex";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the MEGALODOME GOLF website.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const sp = (await searchParams) || {};
  const q = (sp.q || "").trim();
  const results = q ? searchSite(q) : [];

  return (
    <>
      <PageHero
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search the site"}
        subtitle={
          q
            ? results.length
              ? `${results.length} page${results.length === 1 ? "" : "s"} found`
              : "No matching pages — try another phrase."
            : "Find pages about the course, investors, team, media, and more."
        }
      />

      <section className="section pt-0">
        <div className="container max-w-3xl">
          <form action="/search" method="get" className="mb-10">
            <label htmlFor="site-search-q" className="sr-only">
              Search
            </label>
            <div className="flex gap-2">
              <input
                id="site-search-q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search pages…"
                className="input flex-1"
                autoFocus
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Search
              </button>
            </div>
          </form>

          {q ? (
            <ul className="space-y-4">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="card block p-5 transition hover:border-[rgba(238,220,167,0.35)]"
                  >
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                      {r.href === "/" ? "Home" : r.href}
                    </div>
                    <h2 className="display mt-2 text-2xl md:text-3xl">{r.title}</h2>
                    <p className="mt-2 text-sm text-[var(--text)]">{r.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              Type a keyword above — for example “investors”, “gallery”, “Oswego”, or
              “media kit”.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
