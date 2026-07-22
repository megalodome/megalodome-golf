"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/content";

type Intent = "home" | "investor" | "vendor" | "media" | "general";

const DISCLAIMER =
  "Not an offer to sell securities. Any investment is solely via Confidential PPM under Regulation D Rule 506(c). Counsel: Timothy Lange / Vincent Esquire.";

/**
 * Branded MEGALODOME assist panel.
 * Used when AnyChat widget ID is not configured yet, or as a structured
 * pre-qualify layer. Hidden automatically if AnyChat bundle is present.
 */
export function MegaAssist() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>("home");
  const [hideForAnyChat, setHideForAnyChat] = useState(false);

  const anyChatConfigured = Boolean(
    (
      process.env.NEXT_PUBLIC_ANYCHAT_WIDGET_ID ||
      process.env.NEXT_PUBLIC_MEGALODOME_ANYCHAT_WIDGET_ID ||
      ""
    ).trim()
  );

  useEffect(() => {
    if (!anyChatConfigured) return;
    // If AnyChat loads successfully, prefer their launcher.
    const t = window.setInterval(() => {
      if (window.anychat || document.getElementById("anychat-livechat-bundle")) {
        // give AnyChat a moment; if script 404s we keep MegaAssist
        const scripts = document.querySelectorAll(
          'script[src*="livechat-js"]'
        );
        if (scripts.length) {
          // assume AnyChat owns the bubble after 2.5s if no error class
          window.setTimeout(() => setHideForAnyChat(true), 2500);
          window.clearInterval(t);
        }
      }
    }, 400);
    const stop = window.setTimeout(() => window.clearInterval(t), 8000);
    return () => {
      window.clearInterval(t);
      window.clearTimeout(stop);
    };
  }, [anyChatConfigured]);

  const links = useMemo(
    () => ({
      book: site.bookingUrl,
      nda: site.ndaFormUrl,
      partners: site.vendorFormUrl,
      invest: "/invest",
      onePager: "/docs/investor/one-pager.pdf",
      contact: "/contact",
      media: "/media-kit",
    }),
    []
  );

  if (hideForAnyChat) return null;

  return (
    <>
      <button
        type="button"
        className="mega-assist-fab"
        aria-label="Open MEGALODOME assist"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "Chat"}
      </button>

      {open && (
        <div className="mega-assist-panel" role="dialog" aria-label="MEGALODOME assist">
          <div className="mega-assist-head">
            <div>
              <div className="mega-assist-kicker">MEGALODOME GOLF</div>
              <div className="mega-assist-title">How can we help?</div>
            </div>
            <button
              type="button"
              className="mega-assist-close"
              onClick={() => {
                setOpen(false);
                setIntent("home");
              }}
            >
              Close
            </button>
          </div>

          <div className="mega-assist-body">
            {intent === "home" && (
              <>
                <p className="mega-assist-copy">
                  Choose a path — we&apos;ll route you to the right next step.
                </p>
                <div className="mega-assist-actions">
                  <button type="button" onClick={() => setIntent("investor")}>
                    Investor / raise info
                  </button>
                  <button type="button" onClick={() => setIntent("vendor")}>
                    Vendor / GC / trade
                  </button>
                  <button type="button" onClick={() => setIntent("media")}>
                    Media / press
                  </button>
                  <button type="button" onClick={() => setIntent("general")}>
                    General question
                  </button>
                </div>
              </>
            )}

            {intent === "investor" && (
              <>
                <p className="mega-assist-copy">
                  Accredited investors: start with the one-pager, book a 20-min
                  discovery call, then NDA for diligence materials.
                </p>
                <div className="mega-assist-actions">
                  <a href={links.onePager} target="_blank" rel="noopener noreferrer">
                    Download one-pager
                  </a>
                  <a href={links.invest}>Investor hub</a>
                  <a href={links.book} target="_blank" rel="noopener noreferrer">
                    Book discovery (20 min)
                  </a>
                  <a href={links.nda} target="_blank" rel="noopener noreferrer">
                    Request NDA / data room
                  </a>
                  <button type="button" className="ghost" onClick={() => setIntent("home")}>
                    ← Back
                  </button>
                </div>
                <p className="mega-assist-legal">{DISCLAIMER}</p>
              </>
            )}

            {intent === "vendor" && (
              <>
                <p className="mega-assist-copy">
                  Trade partners, GCs, and facility vendors — introduce your firm
                  via the vendor form.
                </p>
                <div className="mega-assist-actions">
                  <a href={links.partners} target="_blank" rel="noopener noreferrer">
                    Open vendor / developer form
                  </a>
                  <a href="/partners">Partners page</a>
                  <button type="button" className="ghost" onClick={() => setIntent("home")}>
                    ← Back
                  </button>
                </div>
              </>
            )}

            {intent === "media" && (
              <>
                <p className="mega-assist-copy">
                  Press and media inquiries — use the media kit or contact form.
                </p>
                <div className="mega-assist-actions">
                  <a href={links.media}>Media kit</a>
                  <a href={links.contact}>Contact</a>
                  <button type="button" className="ghost" onClick={() => setIntent("home")}>
                    ← Back
                  </button>
                </div>
              </>
            )}

            {intent === "general" && (
              <>
                <p className="mega-assist-copy">
                  Flagship target: Oswego, IL · Fall 2027. HQ: 400 Knoll Street,
                  unit C, Wheaton, IL 60187.
                </p>
                <div className="mega-assist-actions">
                  <a href="/about">About</a>
                  <a href="/gallery">Gallery</a>
                  <a href={links.contact}>Contact form</a>
                  <button type="button" className="ghost" onClick={() => setIntent("home")}>
                    ← Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
