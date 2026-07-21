import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for MEGALODOME GOLF — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Effective Date: January 1, 2025"
      />
      <section className="section">
        <div className="container max-w-3xl">
          <article className="card space-y-6 p-7 leading-7 text-[var(--muted)] md:p-10">
            <p>
              At MEGALODOME GOLF USA INC. (“MEGALODOME”, “we,” “us,” or “our”),
              we are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website (
              <a
                href="https://megalodomegolf.com/"
                className="text-[var(--gold)] underline-offset-2 hover:underline"
              >
                https://megalodomegolf.com/
              </a>{" "}
              (the “Site”)). Please read this policy carefully. By using our
              Site, you consent to the practices described in this Privacy
              Policy.
            </p>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                1. Information We Collect
              </h2>
              <p>
                We collect personal and non-personal information when you visit
                our Site, register an account, place an order, or interact with
                our services. The types of information we may collect include:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-[var(--text)]">
                    Personal Information:
                  </strong>{" "}
                  This includes your name, email address, phone number, shipping
                  address, payment information, and other details you provide
                  when you create an account or complete a transaction.
                </li>
                <li>
                  <strong className="text-[var(--text)]">
                    Non-Personal Information:
                  </strong>{" "}
                  This includes information that is not personally identifiable,
                  such as browser type, device type, IP address, operating
                  system, and browsing behavior on our Site.
                </li>
                <li>
                  <strong className="text-[var(--text)]">
                    Cookies and Tracking Technologies:
                  </strong>{" "}
                  We use cookies, web beacons, and other tracking technologies
                  to improve your experience, analyze usage, and personalize
                  content. You can control cookies through your browser
                  settings.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>To provide and improve our products and services.</li>
                <li>To process and fulfill your orders.</li>
                <li>
                  To communicate with you regarding your account, orders, and
                  other requests.
                </li>
                <li>
                  To send promotional materials, newsletters, or marketing
                  communications (you can opt-out at any time).
                </li>
                <li>
                  To analyze Site usage and improve the functionality of the
                  Site.
                </li>
                <li>To comply with legal obligations or resolve disputes.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                3. How We Share Your Information
              </h2>
              <p>
                We may share your information with third parties in the
                following situations:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-[var(--text)]">
                    Service Providers:
                  </strong>{" "}
                  We may share your personal information with third-party
                  vendors and service providers who help us operate the Site and
                  provide services, such as payment processors, shipping
                  companies, and marketing platforms.
                </li>
                <li>
                  <strong className="text-[var(--text)]">
                    Legal Compliance:
                  </strong>{" "}
                  We may disclose your information if required by law, court
                  order, or government regulation, or if necessary to protect
                  the rights, property, or safety of MEGALODOME GOLF USA INC. or
                  its subsidiaries &amp; affiliates, our users, or others.
                </li>
                <li>
                  <strong className="text-[var(--text)]">
                    Business Transfers:
                  </strong>{" "}
                  In the event of a merger, acquisition, or sale of all or part
                  of our business, your information may be transferred as part
                  of that transaction.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                4. Data Security
              </h2>
              <p>
                We implement reasonable security measures to protect your
                personal information. However, please be aware that no data
                transmission over the internet or electronic storage method is
                100% secure. While we strive to protect your personal data, we
                cannot guarantee its absolute security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                5. Your Rights and Choices
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-[var(--text)]">
                    Access and Update:
                  </strong>{" "}
                  You have the right to access and update the personal
                  information we hold about you. You can do this by logging into
                  your account or contacting us.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Opt-Out:</strong> You
                  can opt out of receiving marketing communications by following
                  the unsubscribe link in our emails or contacting us directly.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Do Not Track:</strong>{" "}
                  Some web browsers may transmit “Do Not Track” signals. We do
                  not currently respond to these signals.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                6. California Privacy Rights
              </h2>
              <p>
                If you are a California resident, you may have additional rights
                under the California Consumer Privacy Act (CCPA). These rights
                include the ability to request information about the personal
                data we collect, request deletion of your personal data, and
                opt-out of the sale of your personal data. To exercise your
                rights, please contact us at{" "}
                <a
                  href="mailto:info@megalodomegolf.com"
                  className="text-[var(--gold)] underline-offset-2 hover:underline"
                >
                  info@megalodomegolf.com
                </a>
                ,{" "}
                <a
                  href="tel:+18723391004"
                  className="text-[var(--gold)] underline-offset-2 hover:underline"
                >
                  872-339-1004
                </a>
                , or the mailing address in Section 10.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                7. Children’s Privacy
              </h2>
              <p>
                Our Site is not intended for children under the age of 13, and
                we do not knowingly collect personal information from children.
                If we become aware that we have collected personal information
                from a child under 13, we will take steps to delete that
                information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                8. International Users
              </h2>
              <p>
                If you are accessing the Site from outside the United States,
                please note that your information may be transferred to and
                stored in the United States, where our servers are located. By
                using our Site, you consent to the transfer and processing of
                your information in the United States.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. When we
                make changes, we will update the effective date at the top of
                this page. We encourage you to review this Privacy Policy
                periodically for any updates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display text-2xl text-[var(--gold-soft)]">
                10. Contact Us
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy
                or our privacy practices, please contact us at:
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
                You can also reach us through our{" "}
                <Link
                  href="/contact"
                  className="text-[var(--gold)] underline-offset-2 hover:underline"
                >
                  contact form
                </Link>
                .
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
