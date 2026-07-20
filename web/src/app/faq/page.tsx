import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { faq } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Can't find your answer? Reach out through the contact page."
      />
      <section className="section">
        <div className="container grid gap-4">
          {faq.map((item) => (
            <details key={item.q} className="card p-5 open:pb-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--gold-soft)]">
                {item.q}
              </summary>
              <p className="muted mt-3 leading-7">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
