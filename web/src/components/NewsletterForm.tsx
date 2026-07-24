"use client";

import { FormEvent, useEffect, useState } from "react";
import posthog from "posthog-js";

/** Compact footer / inline newsletter capture → /api/contact interest=newsletter */
export function NewsletterForm({ className = "" }: { className?: string }) {
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          name: data.name || data.email || "Newsletter",
          interest: "newsletter",
          message: "Newsletter signup from website footer",
          form_started_at: startedAt,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Signup failed");
      setStatus("ok");
      setMessage("You're on the list — thank you.");
      posthog.capture("newsletter_signup");
      form.reset();
      setStartedAt(Date.now());
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
        Stay updated
      </div>
      <p className="mb-3 text-sm text-[var(--muted)]">
        Opening news and flagship updates. Unsubscribe anytime.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="input flex-1"
          type="email"
          name="email"
          required
          placeholder="Email address"
          aria-label="Email for newsletter"
        />
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
          className="btn btn-primary shrink-0"
          disabled={status === "loading"}
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs ${status === "ok" ? "text-[var(--gold-light)]" : "text-red-300"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
