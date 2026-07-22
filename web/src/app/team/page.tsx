import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Team",
  description:
    "MEGALODOME GOLF leadership — operators who have built and financed before.",
};

const team = [
  {
    name: "Bertrand Quentin",
    role: "CEO — Forestry Engineer",
    bio: "Exceptional record growing and managing businesses well above industry profitability benchmarks; has managed several hundred employees.",
    image: "/images/team/bertrand-quentin.jpg",
  },
  {
    name: "Annie Bergevin",
    role: "CFO — B.Eng, MBA, CFA",
    bio: "Wall Street investment banking (Credit Suisse, CIBC); MBA, Columbia Business School; engineering, McGill University.",
    image: "/images/team/annie-bergevin.jpg",
  },
  {
    name: "Alain Desrochers",
    role: "CDO & EVP",
    bio: "With three decades of leadership, Alain excels in problem-solving and network-building for strategic success.",
    image: "/images/team/alain-desrochers.jpg",
  },
  {
    name: "Jules Léger",
    role: "Senior VP, Business Development",
    bio: "Jules founded a top-performing dome business with over 20 years of operations and a strong IT background.",
    image: "/images/team/jules-leger.jpg",
  },
  {
    name: "Nick Badyal",
    role: "VP Sales & Partnerships",
    bio: "Nick Badyal leads sports operations with over two decades of strategic excellence and innovation.",
    image: "/images/team/nick-badyal.jpg",
  },
  {
    name: "Brad Blazar",
    role: "Corporate Advisor",
    bio: "25+ years in real estate and financial services; former EVP at Hartman Income REIT and Bluerock Real Estate.",
    image: "/images/team/brad-blazar.jpg",
  },
];

const partners =
  "Huxham Golf Design · Vincent Esquire / Timothy Lange (securities counsel) · SportsDome Advisory (strategy & operating model)";

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The Team"
        title="Operators who have built and financed before"
        subtitle="The leadership team behind MEGALODOME GOLF — development, capital formation, and operations for the Chicago West flagship."
      />
      <section className="section">
        <div className="container space-y-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.name}
                className="card flex flex-col p-6 transition hover:border-[rgba(238,220,167,0.35)]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display text-2xl text-[var(--gold-light)] md:text-[1.7rem]">
                      {member.name}
                    </h2>
                    <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
                      {member.role}
                    </p>
                  </div>
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[rgba(238,220,167,0.28)] bg-[#141414]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="muted flex-1 text-sm leading-7">{member.bio}</p>
              </article>
            ))}
          </div>

          <div className="card p-7 md:p-8">
            <p className="section-label mb-2">Service partners</p>
            <p className="display text-2xl text-[var(--gold-light)] md:text-3xl">
              Trusted specialists alongside the core team
            </p>
            <div className="divider" />
            <p className="muted leading-8">{partners}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="card p-7">
              <h3 className="display text-2xl text-[var(--gold)]">Our mandate</h3>
              <div className="divider" />
              <p className="muted leading-8">
                Build and open the world&apos;s first fully playable indoor golf
                course — a real, walkable Arizona-style experience under
                climate-controlled domes — starting with Oswego / Chicago West.
              </p>
            </article>
            <article className="card p-7">
              <h3 className="display text-2xl text-[var(--gold)]">Connect</h3>
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
