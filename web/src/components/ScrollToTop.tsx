"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Return to top"
      title="Return to top"
      className={`fixed bottom-6 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(238,220,167,0.45)] bg-[rgba(10,10,10,0.92)] text-[var(--gold)] shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:border-[var(--gold)] hover:bg-[rgba(238,220,167,0.12)] hover:text-[var(--gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Gold-themed arrow in a thin ring — matches MGD dark/gold UI */}
        <circle
          cx="12"
          cy="12"
          r="10.25"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.25"
        />
        <path
          d="M12 16.25V8.4M12 8.4L8.4 12M12 8.4L15.6 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
