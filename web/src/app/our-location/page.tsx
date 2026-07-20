import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { locationFeatures, site } from "@/lib/content";

export const metadata: Metadata = { title: "Our Location" };

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Location"
        title={`Flagship: ${site.location}`}
        subtitle="Par 30 executive golf inside proprietary domes, plus a full practice academy and high-end clubhouse."
      />
      <section className="section">
        <div className="container grid items-start gap-8 lg:grid-cols-2">
          <div className="card">
            <Image
              src="/images/clubhouse.jpg"
              alt="Clubhouse and domes"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="card p-7">
            <h2 className="display text-2xl">Features at our location</h2>
            <ul className="mt-5 space-y-4">
              {locationFeatures.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span className="muted leading-7">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
