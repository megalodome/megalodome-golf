import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="MEGALODOME GOLF TEAM"
        title="We are THE NEXT REVOLUTION in golf"
        subtitle="Team profiles are being prepared for the new site. Contact us for investor, media, or partnership introductions."
      />
      <section className="section">
        <div className="container card p-8 md:p-10">
          <p className="muted text-lg leading-8">
            The leadership and advisory roster from the original launch site will
            be migrated here with full bios, roles, and press contacts. In the
            meantime, use the contact form and select the appropriate interest
            type.
          </p>
        </div>
      </section>
    </>
  );
}
