"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function InvestorForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit inquiry");
      }
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
            placeholder="Tell us about your interest in MEGALODOME GOLF…"
          />
        </div>

        {/* honeypot */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting…" : "Submit investor inquiry"}
        </button>

        {message ? <p className="text-red-300">{message}</p> : null}
        <p className="text-xs text-[var(--muted)]">
          By submitting, you agree we may contact you about investment
          opportunities related to MEGALODOME GOLF. This is not an offer to sell
          securities.
        </p>
      </div>
    </form>
  );
}
