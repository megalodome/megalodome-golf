import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { mission } from "@/lib/content";

export const metadata: Metadata = { title: "Our Mission" };

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Mission"
        title={mission.title}
        subtitle="Extending golf to all 12 months — starting with colder climates, then heat-challenged regions."
      />
      <section className="section">
        <div className="container grid-2">
          {mission.sections.map((s) => (
            <article key={s.heading} className="card p-7">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                {s.heading}
              </h2>
              <p className="muted mt-4 text-base leading-7">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
