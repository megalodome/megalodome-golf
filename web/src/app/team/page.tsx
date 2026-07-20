import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Our Team" };

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="MEGALODOME GOLF TEAM"
        title="Leadership behind THE NEXT REVOLUTION™"
        subtitle="The management team driving development of the Chicago West flagship and Fund I capital formation."
      />
      <section className="section">
        <div className="container space-y-8">
          <div className="card overflow-hidden">
            <Image
              src="/images/team/management-team.jpg"
              alt="MEGALODOME GOLF management team"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="card p-7">
              <h2 className="display text-2xl text-[var(--gold)]">Our mandate</h2>
              <div className="divider" />
              <p className="muted leading-8">
                Build and open the world&apos;s first fully playable indoor golf
                course — a real, walkable Arizona-style experience under
                climate-controlled domes — starting with Oswego / Chicago West.
              </p>
            </article>
            <article className="card p-7">
              <h2 className="display text-2xl text-[var(--gold)]">Connect</h2>
              <div className="divider" />
              <p className="muted leading-8">
                For investor, media, or partnership introductions, reach the team
                through the contact or investor inquiry forms.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/invest/apply" className="btn btn-primary">
                  Investor inquiry
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Contact
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
