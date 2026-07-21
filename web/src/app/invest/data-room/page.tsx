import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InvestorDisclaimer, InvestorSubnav } from "@/components/InvestorChrome";
import { InvestorForm } from "@/components/InvestorForm";
import docs from "@/lib/investorDocsIndex.json";

export const metadata: Metadata = {
  title: "Data Room",
  description:
    "Tiered investor data room for MEGALODOME GOLF Equity Fund I — downloads and access gates.",
};

export default function DataRoomPage() {
  return (
    <>
      <InvestorSubnav current="/invest/data-room" />
      <PageHero
        eyebrow="Data room"
        title="Document tiers, downloads & access"
        subtitle="Tier 0 materials are available here. Tier 1 pack is emailed after accredited self-ID via the inquiry form. Tier 2 opens after Mutual NDA."
      />
      <section className="section">
        <div className="container space-y-8">
          <article className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="display text-2xl text-[var(--gold-soft)]">
                  Tier 0 — Public solicitation
                </h2>
                <p className="muted mt-2 text-sm">
                  Gate: none (Reg D 506(c) general solicitation materials)
                </p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {docs.tier0.map((d) => (
                <li key={d.file}>
                  <a
                    className="block rounded-lg border border-[var(--line)] px-3 py-3 text-sm text-[var(--gold)] hover:bg-white/5"
                    href={d.file}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download: {d.title}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="card p-6">
            <h2 className="display text-2xl text-[var(--gold-soft)]">
              Tier 1 — Pre-meeting pack
            </h2>
            <p className="muted mt-2 text-sm">
              Gate: accredited / qualified self-ID. Request below or on the apply
              form — we email the full pack automatically.
            </p>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {docs.tier1.map((d) => (
                <li
                  key={d.file}
                  className="rounded-lg border border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)]"
                >
                  {d.title}{" "}
                  <span className="text-xs">(emailed after inquiry)</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card p-6">
            <h2 className="display text-2xl text-[var(--gold-soft)]">
              Tier 2 — NDA data room
            </h2>
            <p className="muted mt-2 text-sm leading-7">
              Gate: signed Mutual NDA + accreditation verification underway.
              Includes Target Asset Preview, full pro-forma workbook, and deeper
              diligence as available. Submit with <strong className="text-white">NDA
              requested</strong> checked to receive the NDA template immediately.
            </p>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              <li className="rounded-lg border border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)]">
                Mutual NDA (emailed on request)
              </li>
              <li className="rounded-lg border border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)]">
                Target Asset Preview (after NDA)
              </li>
              <li className="rounded-lg border border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)]">
                Full Investor Pro-Forma workbook (after NDA)
              </li>
              <li className="rounded-lg border border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)]">
                Additional contracts / designs as available
              </li>
            </ul>
          </article>

          <article className="card p-6">
            <h2 className="display text-2xl text-[var(--gold-soft)]">
              Tier 3 — Offering & close
            </h2>
            <p className="muted mt-2 text-sm leading-7">
              Verified accredited investors only. PPM, subscription documents, and
              operating agreement are issued with securities counsel (Bond Conway
              process) — not published on the website.
            </p>
          </article>

          <div>
                      <div className="eyebrow mb-2">Request access</div>
                      <h2 className="display mb-4 text-3xl">Get the pack / NDA</h2>
                      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
                        <InvestorForm defaultTier1 defaultNda />
                        <div className="card h-fit p-6">
                          <h3 className="display text-xl">What happens</h3>
                          <ol className="muted mt-4 list-decimal space-y-3 pl-5 leading-7">
                            <li>CRM lead created with investor tags and score</li>
                            <li>Tier 0–1 PDFs emailed to you (if selected)</li>
                            <li>Mutual NDA emailed if data-room access requested</li>
                            <li>
                              Raise team follows up and opens Tier 2 after countersignature
                            </li>
                          </ol>
                          <Link href="/invest/apply" className="btn btn-secondary mt-6">
                            Full apply page
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="card p-6">
                      <InvestorDisclaimer />
                    </div>
                  </div>
                </section>
              </>
            );
          }
