import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { news } from "@/lib/content";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="The future of golf is here"
        subtitle="MEGALODOME GOLF is leading the charge. Discover why the media is buzzing."
      />
      <section className="section">
        <div className="container space-y-8">
          <div className="grid gap-4">
            {news.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="card block p-5 transition hover:border-[var(--gold)]"
              >
                <div className="text-lg font-medium">{item.title}</div>
                <div className="muted mt-2 break-all text-sm">{item.href}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
