"use client";

import { AnyChatWidget } from "@/components/AnyChatWidget";
import { MegaAssist } from "@/components/MegaAssist";

/**
 * Site chat stack:
 * 1) AnyChat official widget when NEXT_PUBLIC_ANYCHAT_WIDGET_ID is set
 * 2) MEGALODOME branded assist panel as fallback / pre-qualify UX
 */
export function SiteChat() {
  return (
    <>
      <AnyChatWidget />
      <MegaAssist />
    </>
  );
}
