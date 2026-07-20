import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { about } from "@/lib/content";

export const metadata: Metadata = { title: "More on MEGALODOME GOLF" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={about.title} />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p} className="muted text-lg leading-8">
                {p}
              </p>
            ))}
          </div>
          <div className="card">
            <Image
              src="/images/new-era.jpg"
              alt="New era of golf"
              width={1000}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
