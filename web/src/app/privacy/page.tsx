import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Effective Date: January 1, 2025"
      />
      <section className="section">
        <div className="container prose prose-invert max-w-3xl">
          <div className="card space-y-5 p-7 leading-7 text-[var(--muted)]">
            <p>
              At MEGALODOME GOLF USA INC. (“MEGALODOME”, “we,” “us,” or “our”), we
              are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website (
              <a href="https://megalodomegolf.com/">https://megalodomegolf.com/</a>
              ).
            </p>
            <h2 className="display text-xl text-white">1. Information We Collect</h2>
            <p>
              We may collect personal information such as name, email address,
              phone number, and message content when you submit forms, as well as
              technical information such as browser type, device data, and pages
              visited.
            </p>
            <h2 className="display text-xl text-white">2. How We Use Information</h2>
            <p>
              We use information to respond to inquiries, provide services,
              improve the Site, communicate updates, and comply with legal
              obligations.
            </p>
            <h2 className="display text-xl text-white">3. Sharing</h2>
            <p>
              We do not sell personal information. We may share data with service
              providers who help operate the Site (hosting, email delivery,
              analytics, database) under appropriate safeguards.
            </p>
            <h2 className="display text-xl text-white">4. Contact</h2>
            <p>
              For privacy questions, contact us through the website contact form.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
