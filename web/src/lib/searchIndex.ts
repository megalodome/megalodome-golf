/** Static site search index for MEGALODOME GOLF marketing pages. */

export type SearchEntry = {
  href: string;
  title: string;
  summary: string;
  keywords: string[];
};

export const searchIndex: SearchEntry[] = [
  {
    href: "/",
    title: "Home",
    summary:
      "The world's first REAL indoor golf experience. MEGALODOME GOLF — THE NEXT REVOLUTION™.",
    keywords: ["home", "indoor golf", "dome", "revolution", "oswego"],
  },
  {
    href: "/our-mission",
    title: "Mission",
    summary:
      "Climate-controlled year-round play and an Arizona-style indoor traditional course experience.",
    keywords: ["mission", "year-round", "climate", "arizona", "scottsdale"],
  },
  {
    href: "/our-location",
    title: "Location",
    summary:
      "Oswego, IL first location — par 30 executive course, academy, clubhouse, and practice dome.",
    keywords: ["location", "oswego", "illinois", "chicago", "course", "academy"],
  },
  {
    href: "/about",
    title: "About",
    summary:
      "World's first indoor golf experience that replicates traditional golf inside proprietary domes.",
    keywords: ["about", "domes", "architects", "par 30", "practice"],
  },
  {
    href: "/team",
    title: "Team",
    summary: "Meet the MEGALODOME GOLF operators and leadership team.",
    keywords: ["team", "operators", "leadership", "staff", "nick"],
  },
  {
    href: "/pictures",
    title: "Gallery",
    summary: "Course renders, dome exterior/interior, clubhouse, and convention gallery tabs.",
    keywords: [
      "gallery",
      "pictures",
      "photos",
      "renders",
      "images",
      "dome",
      "clubhouse",
      "conventions",
      "outside",
      "inside",
    ],
  },
  {
    href: "/invest",
    title: "Investors",
    summary:
      "Investor overview for Equity Fund I — Chicago West raise, materials, and discovery call.",
    keywords: ["invest", "investor", "equity", "fund", "raise", "capital"],
  },
  {
    href: "/invest/opportunity",
    title: "Investment Opportunity",
    summary: "Details on the investor opportunity and project positioning.",
    keywords: ["opportunity", "investment", "returns", "project"],
  },
  {
    href: "/invest/process",
    title: "Investor Process",
    summary: "How the investor process works from inquiry through diligence.",
    keywords: ["process", "diligence", "nda", "steps"],
  },
  {
    href: "/invest/data-room",
    title: "Data Room",
    summary: "Investor data room access path and document packs.",
    keywords: ["data room", "documents", "pack", "tier"],
  },
  {
    href: "/invest/apply",
    title: "Investor Inquiry",
    summary: "Submit an investor inquiry and request materials.",
    keywords: ["apply", "inquiry", "form", "accredited"],
  },
  {
    href: "/invest/faq",
    title: "Investor FAQ",
    summary: "Frequently asked questions for prospective investors.",
    keywords: ["investor faq", "questions"],
  },
  {
    href: "/news",
    title: "News",
    summary: "Latest MEGALODOME GOLF news and updates.",
    keywords: ["news", "updates", "press", "media"],
  },
  {
    href: "/media-kit",
    title: "Media Kit",
    summary: "Media downloads, ads, flyer, and press assets.",
    keywords: ["media kit", "press", "ads", "flyer", "download"],
  },
  {
    href: "/faq",
    title: "FAQ",
    summary: "Opening timeline, location, pricing, and general visitor questions.",
    keywords: ["faq", "open", "cost", "hours", "questions"],
  },
  {
    href: "/contact",
    title: "Contact",
    summary: "Contact MEGALODOME GOLF for general, media, partnership, or investor questions.",
    keywords: ["contact", "email", "phone", "message", "support"],
  },
  {
    href: "/partners",
    title: "Partners & Developers",
    summary:
      "Chicago-area GCs, facility operators, equipment partners, and trade collaborators — vendor intros separate from investor discovery.",
    keywords: [
      "partners",
      "developers",
      "vendor",
      "gc",
      "contractor",
      "equipment",
      "operator",
      "trade",
    ],
  },
  {
    href: "/login",
    title: "Login",
    summary: "Staff and investor portal login chooser.",
    keywords: ["login", "portal", "staff", "investor access"],
  },
  {
    href: "/privacy",
    title: "Privacy Policy",
    summary: "Privacy policy for MEGALODOME GOLF USA INC.",
    keywords: ["privacy", "policy", "data", "legal"],
  },
  {
    href: "/terms",
    title: "Terms of Service",
    summary: "Website terms of service and legal conditions.",
    keywords: ["terms", "service", "legal", "conditions"],
  },
];

export function searchSite(query: string, limit = 20): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((entry) => {
      const hay = [
        entry.title,
        entry.summary,
        entry.href,
        ...entry.keywords,
      ]
        .join(" ")
        .toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (entry.title.toLowerCase().includes(t)) score += 8;
        if (entry.keywords.some((k) => k.includes(t) || t.includes(k))) score += 5;
        if (entry.summary.toLowerCase().includes(t)) score += 3;
        if (entry.href.toLowerCase().includes(t)) score += 2;
        if (!hay.includes(t)) score -= 20;
      }
      return { entry, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return scored.slice(0, limit).map((x) => x.entry);
}
