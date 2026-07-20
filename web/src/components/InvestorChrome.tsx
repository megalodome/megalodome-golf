import Link from "next/link";
import { investorNav } from "@/lib/investor";

export function InvestorSubnav({ current }: { current?: string }) {
  return (
    <div className="border-b border-[rgba(238,220,167,0.15)] bg-[rgba(10,10,10,0.96)] backdrop-blur-md">
      <div className="container flex flex-wrap gap-2 py-3">
        {investorNav.map((item) => {
          const active = current === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-sm ${
                active
                  ? "bg-[rgba(198,167,94,0.18)] text-[var(--gold-soft)]"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function InvestorDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`text-[var(--muted)] ${compact ? "text-xs leading-5" : "text-sm leading-6"}`}
    >
      CONFIDENTIAL — for accredited investors only. Not an offer to sell or a
      solicitation to buy any security. Any offering is made solely through the
      Confidential Private Placement Memorandum of MEGALODOME GOLF Equity Fund I
      LLC and its subscription documents under Rule 506(c) of Regulation D.
      Projections are modeled estimates, not guarantees; actual results will
      differ.
    </p>
  );
}

export function MetricStrip({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((m) => (
        <div key={m.label} className="card p-4 text-center">
          <div className="display text-2xl text-[var(--gold-soft)]">{m.value}</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-[var(--muted)]">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}
