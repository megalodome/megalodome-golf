"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import posthog from "posthog-js";
import { useSearchParams } from "next/navigation";

const ALL_INTERESTS = [
  { value: "general", label: "General inquiry" },
  { value: "investor", label: "Investor information" },
  { value: "media", label: "Media / press" },
  { value: "partnership", label: "Partnership / vendor" },
  { value: "developer", label: "Developer / GC (Chicago)" },
] as const;

type InterestValue = (typeof ALL_INTERESTS)[number]["value"];

export function ContactForm({
  forcedInterest,
  allowedInterests,
}: {
  /** Default selected interest (still changeable). */
  forcedInterest?: InterestValue;
  /** Limit dropdown options (e.g. partners page). */
  allowedInterests?: InterestValue[];
}) {
  const searchParams = useSearchParams();
  const options = useMemo(() => {
    if (allowedInterests?.length) {
      return ALL_INTERESTS.filter((o) => allowedInterests.includes(o.value));
    }
    return [...ALL_INTERESTS];
  }, [allowedInterests]);

  const defaultInterest = useMemo(() => {
    const q = searchParams.get("interest");
    if (forcedInterest && options.some((o) => o.value === forcedInterest)) {
      return forcedInterest;
    }
    if (q && options.some((o) => o.value === q)) return q;
    return options[0]?.value || "general";
  }, [searchParams, forcedInterest, options]);

  const [interest, setInterest] = useState(defaultInterest);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    setStartedAt(Date.now());
    setInterest(defaultInterest);
  }, [defaultInterest]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.form_started_at = String(startedAt);
    data.interest = interest;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || "Failed to send message");
      }
      setStatus("ok");
      setMessage("Thanks — your message was sent. We'll be in touch soon.");
      posthog.capture("contact_form_submitted", { interest });
      form.reset();
      setInterest(defaultInterest);
      setStartedAt(Date.now());
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8">
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="name">
            Name
          </label>
          <input className="input" id="name" name="name" required />
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
        <div>
          <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="company">
            Company
          </label>
          <input className="input" id="company" name="company" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="interest">
            I am interested in
          </label>
          <div className="select-wrap">
            <select
              className="input select-input"
              id="interest"
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-[var(--muted)]" htmlFor="message">
            Message
          </label>
          <textarea className="textarea" id="message" name="message" required />
        </div>
        <input type="hidden" name="form_started_at" value={String(startedAt)} />
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
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
        {message ? (
          <p
            className={
              status === "ok" ? "text-[var(--gold-light)]" : "text-red-300"
            }
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
