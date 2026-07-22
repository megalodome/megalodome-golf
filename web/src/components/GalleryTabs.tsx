"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  category: "outside" | "inside" | "clubhouse" | "conventions";
};

const TABS: { id: GalleryItem["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "outside", label: "Dome outside" },
  { id: "inside", label: "Dome inside" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "conventions", label: "Conventions" },
];

export function GalleryTabs({ items }: { items: GalleryItem[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (tab === "all") return items;
    return items.filter((i) => i.category === tab);
  }, [items, tab]);

  const hero =
    filtered[0] ||
    items.find((i) => i.category === "outside") ||
    items[0];

  return (
    <div>
      <div
        className="mb-6 flex flex-wrap gap-2 border-b border-[var(--line)] pb-4"
        role="tablist"
        aria-label="Gallery categories"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          const count =
            t.id === "all"
              ? items.length
              : items.filter((i) => i.category === t.id).length;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={
                active
                  ? "rounded-full border border-[rgba(238,220,167,0.55)] bg-[rgba(238,220,167,0.12)] px-4 py-2 text-sm font-medium text-[var(--gold-light)]"
                  : "rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[rgba(238,220,167,0.35)] hover:text-[var(--gold)]"
              }
            >
              {t.label}
              <span className="ml-2 text-xs opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {hero ? (
        <figure className="card mb-6 overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="h-[min(62vh,560px)] w-full object-cover"
            priority
          />
          <figcaption className="muted px-5 py-4 text-sm">{hero.alt}</figcaption>
        </figure>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((img) => (
          <figure key={img.src} className="card overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={800}
              className="h-56 w-full object-cover transition duration-500 hover:scale-[1.03] sm:h-60"
            />
            <figcaption className="muted p-4 text-sm leading-6">
              {img.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="muted mt-8 text-center text-sm">No images in this category yet.</p>
      ) : null}
    </div>
  );
}
