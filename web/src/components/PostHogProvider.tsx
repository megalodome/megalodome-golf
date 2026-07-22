"use client";

import { useEffect } from "react";

/**
 * PostHog browser analytics. Loads only when NEXT_PUBLIC_POSTHOG_KEY is set.
 * Project API keys are typically `phc_…`. Personal keys (`phx_…`) will not init.
 */
export function PostHogProvider() {
  useEffect(() => {
    const key =
      process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      process.env.NEXT_PUBLIC_MEGALODOME_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST ||
      process.env.NEXT_PUBLIC_MEGALODOME_POSTHOG_HOST ||
      "https://us.i.posthog.com";
    // Only project API keys (`phc_…`) init in-browser. Personal keys (`phx_…`) are ignored.
    if (!key || !key.startsWith("phc_")) return;

    let cancelled = false;
    (async () => {
      try {
        const posthog = (await import("posthog-js")).default;
        if (cancelled) return;
        if (!posthog.__loaded) {
          posthog.init(key, {
            api_host: host,
            person_profiles: "identified_only",
            capture_pageview: true,
            capture_pageleave: true,
          });
        }
      } catch {
        // optional dependency / network
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
