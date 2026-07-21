import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for MEGALODOME GOLF — rules for using our website and related services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Effective Date: January 1, 2025"
      />
      <section className="section">
        <div className="container max-w-3xl">
          <article className="card space-y-6 p-7 leading-7 text-[var(--muted)] md:p-10">
            <p>
              Welcome to MEGALODOME GOLF. These Terms of Service (“Terms”)
              govern your access to and use of the website located at{" "}
              <a
                href="https://megalodomegolf.com/"
                className="text-[var(--gold)] underline-offset-2 hover:underline"
              >
                https://megalodomegolf.com/
              </a>{" "}
              (the “Site”) and related online materials, forms, and portals
              operated by MEGALODOME GOLF USA INC. and its affiliates
              (collectively, “MEGALODOME”, “we,” “us,” or “our”).
            </p>
            <p>
              By accessing or using the Site, you agree to be bound by these
              Terms and our{" "}
              <Link
                href="/privacy"
                className="text-[var(--gold)] underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              . If you do not agree, do not use the Site.
            </p>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                1. Eligibility
              </h2>
              <p>
                You must be at least 18 years of age (or the age of majority in
                your jurisdiction) to use the Site. By using the Site, you
                represent that you meet this requirement and have the legal
                capacity to enter into these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                2. Use of the Site
              </h2>
              <p>You agree to use the Site only for lawful purposes. You may not:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Site, accounts, systems, or networks
                </li>
                <li>
                  Interfere with or disrupt the Site, servers, or networks
                  connected to the Site
                </li>
                <li>
                  Use the Site to transmit malware, spam, or other harmful code
                </li>
                <li>
                  Scrape, harvest, or collect information from the Site by
                  automated means without our prior written consent
                </li>
                <li>
                  Misrepresent your identity, affiliation, or investor status
                </li>
                <li>
                  Use the Site in any manner that violates applicable law or
                  regulation
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                3. Accounts and Portal Access
              </h2>
              <p>
                Certain features (including staff or investor portal access) may
                require an account or invitation. You are responsible for
                maintaining the confidentiality of your login credentials and
                for all activity under your account. Notify us promptly of any
                unauthorized use. We may suspend or terminate access at any time
                if we believe these Terms have been violated or if access is no
                longer appropriate.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                4. Investor Information — Not an Offer
              </h2>
              <p>
                Materials on the Site related to investment opportunities,
                including summaries, projections, one-pagers, data-room content,
                and forms, are for informational purposes only and do{" "}
                <strong className="text-[var(--text)]">not</strong> constitute
                an offer to sell or a solicitation of an offer to buy any
                security. Any offering of securities, if made, will be made
                solely through a Confidential Private Placement Memorandum and
                related subscription documents, and only to persons who meet
                applicable eligibility requirements (including under Regulation
                D Rule 506(c) where applicable).
              </p>
              <p>
                Forward-looking statements, pro formas, and projections are
                estimates only and are not guarantees of future performance.
                Actual results will differ. You should consult your own legal,
                tax, and financial advisors before making any investment
                decision.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                5. Forms, Inquiries, and Communications
              </h2>
              <p>
                When you submit a contact form, investor inquiry, booking
                request, or other communication through the Site, you represent
                that the information you provide is accurate and that we may
                contact you regarding your request and related MEGALODOME
                opportunities, subject to our Privacy Policy and applicable law.
                You may opt out of marketing communications as described in the
                Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                6. Intellectual Property
              </h2>
              <p>
                The Site and its contents — including text, graphics, logos,
                images, video, design, and software — are owned by MEGALODOME or
                its licensors and are protected by copyright, trademark, and
                other intellectual property laws. “MEGALODOME,” “MEGALODOME
                GOLF,” “THE NEXT REVOLUTION,” and related marks are trademarks
                of MEGALODOME or its affiliates.
              </p>
              <p>
                You may view and download materials from the Site for your
                personal, non-commercial use only, provided you keep all
                proprietary notices intact. You may not copy, modify,
                distribute, publicly display, reverse engineer, or create
                derivative works from Site content without our prior written
                permission, except as allowed by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                7. Third-Party Links and Services
              </h2>
              <p>
                The Site may link to or integrate third-party services (for
                example, booking, email delivery, analytics, or portal hosting).
                We do not control and are not responsible for third-party sites
                or services. Your use of them is governed by their own terms and
                privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                8. Disclaimers
              </h2>
              <p>
                THE SITE AND ALL CONTENT ARE PROVIDED “AS IS” AND “AS
                AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, MEGALODOME
                DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE
                UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER
                HARMFUL COMPONENTS.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                9. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MEGALODOME AND ITS
                OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES WILL NOT
                BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA,
                GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO
                YOUR USE OF (OR INABILITY TO USE) THE SITE, EVEN IF ADVISED OF
                THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO
                THE SITE OR THESE TERMS WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS
                (US $100), EXCEPT WHERE LIABILITY CANNOT BE LIMITED BY LAW.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                10. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless MEGALODOME and
                its affiliates, officers, directors, employees, and agents from
                and against any claims, liabilities, damages, losses, and
                expenses (including reasonable attorneys’ fees) arising out of
                or related to your use of the Site, your violation of these
                Terms, or your violation of any rights of another.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                11. Governing Law and Venue
              </h2>
              <p>
                These Terms are governed by the laws of the State of Illinois,
                without regard to conflict-of-law principles. Subject to
                applicable law, exclusive venue for any dispute arising out of
                these Terms or the Site shall be the state or federal courts
                located in Illinois, and you consent to personal jurisdiction
                there.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                12. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we do, we will
                revise the effective date at the top of this page. Your
                continued use of the Site after changes become effective
                constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                13. Severability and Entire Agreement
              </h2>
              <p>
                If any provision of these Terms is held unenforceable, the
                remaining provisions will continue in full force and effect.
                These Terms, together with the Privacy Policy and any additional
                terms presented for specific features, constitute the entire
                agreement between you and MEGALODOME regarding the Site and
                supersede prior agreements on that subject.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                14. Contact Us
              </h2>
              <p>
                Questions about these Terms of Service may be directed to:
              </p>
              <div className="rounded-lg border border-[var(--line)] bg-black/20 px-5 py-4 text-[var(--text)]">
                <p className="font-semibold text-[var(--gold-soft)]">
                  MEGALODOME GOLF CHICAGO WEST INC.
                </p>
                <p className="mt-2">400 Knoll Street, unit C</p>
                <p>Wheaton, IL 60187</p>
                <p className="mt-2">
                  <a
                    href="tel:+18723391004"
                    className="text-[var(--gold)] underline-offset-2 hover:underline"
                  >
                    872-339-1004
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@megalodomegolf.com"
                    className="text-[var(--gold)] underline-offset-2 hover:underline"
                  >
                    info@megalodomegolf.com
                  </a>
                </p>
              </div>
              <p className="text-sm">
                See also our{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--gold)] underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/contact"
                  className="text-[var(--gold)] underline-offset-2 hover:underline"
                >
                  Contact
                </Link>{" "}
                page.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
