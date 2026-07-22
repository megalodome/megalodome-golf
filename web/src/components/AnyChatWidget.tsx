"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    anychat?: {
      setCurrentLocation?: (loc: Location) => void;
      open?: () => void;
      close?: () => void;
    };
    apiURL?: string;
  }
}

/**
 * Loads AnyChat livechat bundle when NEXT_PUBLIC_ANYCHAT_WIDGET_ID is set.
 * Script URL pattern (from AnyChat widget host):
 *   https://api.anychat.one/widget/{supportWidgetId}/livechat-js
 *
 * Get supportWidgetId from AnyChat app → Channels/Website widget → Install code.
 * Do NOT put private REST API keys in NEXT_PUBLIC_*.
 */
export function AnyChatWidget() {
  useEffect(() => {
    const widgetId = (
      process.env.NEXT_PUBLIC_ANYCHAT_WIDGET_ID ||
      process.env.NEXT_PUBLIC_MEGALODOME_ANYCHAT_WIDGET_ID ||
      ""
    ).trim();
    if (!widgetId) return;

    const apiBase = (
      process.env.NEXT_PUBLIC_ANYCHAT_API_URL ||
      "https://api.anychat.one/"
    ).replace(/\/?$/, "/");

    window.apiURL = apiBase;

    const existing = document.getElementById("anychat-livechat-bundle");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "anychat-livechat-bundle";
    script.async = true;
    script.src = `${apiBase}widget/${encodeURIComponent(widgetId)}/livechat-js`;
    script.onerror = () => {
      console.warn(
        "[AnyChat] Failed to load widget script. Check NEXT_PUBLIC_ANYCHAT_WIDGET_ID."
      );
    };
    document.body.appendChild(script);

    const onLoc = () => {
      try {
        window.anychat?.setCurrentLocation?.(document.location);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("popstate", onLoc);

    return () => {
      window.removeEventListener("popstate", onLoc);
      // keep script for SPA navigations
    };
  }, []);

  return null;
}
