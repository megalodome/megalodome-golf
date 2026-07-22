"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const INTERESTS = [
  "general",
  "investor",
  "media",
  "partnership",
  "developer",
  "newsletter",
] as const;

export function ContactForm({
  forcedInterest,
}: {
  forcedInterest?: (typeof INTERESTS)[number];
}) {
  const searchParams = useSearchParams();
  const defaultInterest = useMemo(() => {
    if (forcedInterest) return forcedInterest;
    const q = searchParams.get("interest");
    if (q && (INTERESTS as readonly string[]).includes(q)) return q;
    return "general";
  }, [searchParams, forcedInterest]);

  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.form_started_at = String(startedAt);

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
      form.reset();
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
          {forcedInterest ? (
            <input type="hidden" name="interest" value={forcedInterest} />
          ) : null}
          <select
            className="input"
            id="interest"
            name={forcedInterest ? undefined : "interest"}
            defaultValue={defaultInterest}
            key={defaultInterest}
            disabled={Boolean(forcedInterest)}
          >
            <option value="general">General inquiry</option>
            <option value="investor">Investor information</option>
            <option value="media">Media / press</option>
            <option value="partnership">Partnership / vendor</option>
            <option value="developer">Developer / GC (Chicago)</option>
          </select>
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
