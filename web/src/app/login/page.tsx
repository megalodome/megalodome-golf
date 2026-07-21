import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portal Login",
  description:
    "MEGALODOME GOLF staff and investor portal login — team workspace and investor portal access.",
};

const staffLogin = site.staffLoginUrl;
const investorLogin = site.investorLoginUrl;

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Portal access"
        title="Login"
        subtitle="Choose your portal. Staff use the team workspace; investors use the investor portal after invite."
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <article className="card flex flex-col p-7">
            <p className="section-label mb-2">Team</p>
            <h2 className="display text-3xl text-[var(--gold-soft)]">
              Staff login
            </h2>
            <div className="divider" />
            <p className="muted flex-1 leading-7">
              For MEGALODOME team members (raise desk, ops, leadership). Opens
              the ONE / SuiteDash workspace — CRM, deals, booking, onboarding,
              and internal portal pages.
            </p>
            <ul className="muted mt-4 list-disc space-y-2 pl-5 text-sm leading-6">
              <li>CRM contacts, circles, Investor Raise pipeline</li>
              <li>Staff HQ / Playbooks / Raise Desk pages</li>
              <li>Staff onboarding FLOW + checklist</li>
            </ul>
            <a
              href={staffLogin}
              className="btn btn-primary mt-8"
              target="_blank"
              rel="noreferrer"
            >
              Staff team login
            </a>
          </article>

          <article className="card flex flex-col p-7">
            <p className="section-label mb-2">Investors</p>
            <h2 className="display text-3xl text-[var(--gold-soft)]">
              Investor login
            </h2>
            <div className="divider" />
            <p className="muted flex-1 leading-7">
              For invited accredited investors and prospects with portal access.
              Same secure login gate — after sign-in you land on investor portal
              pages (home, data room links, next steps).
            </p>
            <ul className="muted mt-4 list-disc space-y-2 pl-5 text-sm leading-6">
              <li>Investor Home / Data Room / Next Steps</li>
              <li>Onboarding checklist + FLOW</li>
              <li>Book a 20-min discovery call anytime</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={investorLogin}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Investor portal login
              </a>
              <a
                href={site.bookingUrl}
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Book a call
              </a>
            </div>
          </article>
        </div>

        <div className="container mt-8">
          <div className="card p-6">
            <p className="section-label mb-2">Need access?</p>
            <p className="muted leading-7">
              Investors: submit an{" "}
              <Link href="/invest/apply" className="text-[var(--gold)]">
                investor inquiry
              </Link>{" "}
              first — portal invites are issued by the raise team. Staff: ask an
              admin to send a staff invite from ONE → Manage Staff.
            </p>
            <p className="muted mt-3 text-sm leading-6">
              Public marketing site stays open without login. SuiteDash{" "}
              <strong className="text-[var(--gold-soft)]">Public Pages</strong>{" "}
              are optional (login branding / error pages only) — the Next.js site
              remains the public front door.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
