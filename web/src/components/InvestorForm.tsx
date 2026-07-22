"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function readUtms() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = p.get(k);
    if (v) out[k] = v;
  }
  return out;
}

export function InvestorForm({
  defaultNda = false,
  defaultTier1 = true,
}: {
  defaultNda?: boolean;
  defaultTier1?: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [utms, setUtms] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    setUtms(readUtms());
    setStartedAt(Date.now());
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // checkboxes
    data.requestTier1 = form.querySelector<HTMLInputElement>("#requestTier1")
      ?.checked
      ? "true"
      : "false";
    data.requestNda = form.querySelector<HTMLInputElement>("#requestNda")
      ?.checked
      ? "true"
      : "false";
    Object.assign(data, utms);
    data.form_started_at = String(startedAt);

    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Failed to submit inquiry");
      setStatus("ok");
      form.reset();
      router.push("/invest/thank-you");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8">
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="firstName">
              First name*
            </label>
            <input className="input" id="firstName" name="firstName" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="lastName">
              Last name
            </label>
            <input className="input" id="lastName" name="lastName" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="email">
              Email*
            </label>
            <input className="input" id="email" name="email" type="email" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="phone">
              Phone
            </label>
            <input className="input" id="phone" name="phone" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="company">
              Company / Family office / Fund
            </label>
            <input className="input" id="company" name="company" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="website">
              Website
            </label>
            <input className="input" id="website" name="website" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="investorType">
              Investor type
            </label>
            <select className="input" id="investorType" name="investorType" defaultValue="Individual">
              <option>Individual</option>
              <option>Family Office</option>
              <option>Fund</option>
              <option>Strategic</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="checkSize">
              Indicative check size
            </label>
            <select className="input" id="checkSize" name="checkSize" defaultValue="">
              <option value="">Select…</option>
              <option value="$50k–$100k">$50k–$100k</option>
              <option value="$100k–$250k">$100k–$250k</option>
              <option value="$250k–$500k">$250k–$500k</option>
              <option value="$500k+">$500k+</option>
              <option value="Undecided">Undecided</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="timeline">
              Timeline
            </label>
            <select className="input" id="timeline" name="timeline" defaultValue="">
              <option value="">Select…</option>
              <option value="0–30 days">0–30 days</option>
              <option value="30–90 days">30–90 days</option>
              <option value="90+ days">90+ days</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="accredited">
              Accredited investor?
            </label>
            <select className="input" id="accredited" name="accredited" defaultValue="">
              <option value="">Select…</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="message">
            Message / interest*
          </label>
          <textarea
            className="textarea"
            id="message"
            name="message"
            required
            placeholder="Tell us about your interest in MEGALODOME GOLF Equity Fund I…"
          />
        </div>

        <div className="space-y-3 rounded-xl border border-[var(--line)] p-4">
          <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
            <input
              id="requestTier1"
              name="requestTier1"
              type="checkbox"
              defaultChecked={defaultTier1}
              className="mt-1"
            />
            <span>
              Email me the <strong className="text-white">Tier 1 pre-meeting pack</strong>{" "}
              (Executive Summary, Pro-Forma Summary, Roadmap, FAQ, Abbreviations).
              I self-identify as an accredited investor / qualified prospect.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
            <input
              id="requestNda"
              name="requestNda"
              type="checkbox"
              defaultChecked={defaultNda}
              className="mt-1"
            />
            <span>
              Also send the <strong className="text-white">Mutual NDA</strong> so I can
              request Tier 2 data-room access (full model / deeper diligence).
            </span>
          </label>
        </div>

        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <input type="hidden" name="form_started_at" value={String(startedAt)} />

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting…" : "Submit & email materials"}
        </button>

        {message ? <p className="text-red-300">{message}</p> : null}
        <p className="text-xs text-[var(--muted)]">
          By submitting, you agree we may contact you about investment opportunities
          related to MEGALODOME GOLF. This is not an offer to sell securities. Any
          offering is made solely through the Confidential PPM under Reg D 506(c).
        </p>
      </div>
    </form>
  );
}
