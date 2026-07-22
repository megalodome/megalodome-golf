# AnyChat — MEGALODOME setup & bot flows

## Status on site
- **Live now:** branded **MEGALODOME Assist** chat button (fallback) on all pages.
- **AnyChat official widget:** loads automatically when `NEXT_PUBLIC_ANYCHAT_WIDGET_ID` is set in Vercel.

## Why widget ID ≠ API key
AnyChat embed URL pattern (from their widget host JS):

```text
https://api.anychat.one/widget/{supportWidgetId}/livechat-js
```

Your stored key is treated as a **private credential** (REST). The **public widget id** comes from:

**AnyChat app → Channels / Website widget → Installation / Install code**

Copy the `supportWidget` id (or full install snippet) into Vercel:

```bash
NEXT_PUBLIC_ANYCHAT_WIDGET_ID=paste_widget_id_here
# optional override:
# NEXT_PUBLIC_ANYCHAT_API_URL=https://api.anychat.one/
```

Redeploy after setting. Private REST keys must **never** use `NEXT_PUBLIC_`.

## Bot flows to build inside AnyChat (admin)

### 1) Welcome
- Greeting: “Welcome to MEGALODOME GOLF — Chicago West flagship.”
- Buttons:
  - Investor / raise info
  - Vendor / GC / trade
  - Media / press
  - Talk to a person

### 2) Investor path
1. Confirm interest (not a public solicitation).
2. Send links:
   - One-pager: `https://megalodomegolf.com/docs/investor/one-pager.pdf`
   - Investor hub: `https://megalodomegolf.com/invest`
   - Book 20-min: `https://app.megalodomegolf.com/book`
   - NDA: `https://app.megalodomegolf.com/nda`
3. If “ready to talk” → assign Nick + Telegram notify.
4. Always append compliance:

> Not an offer to sell securities. Offering solely via Confidential PPM under Reg D 506(c). Counsel: Timothy Lange / Vincent Esquire.

### 3) Vendor path
1. Ask company + trade category.
2. Link: `https://app.megalodomegolf.com/partners` (or site `/partners`).
3. Tag conversation `intent:vendor`.

### 4) Media path
1. Link media kit: `https://megalodomegolf.com/media-kit`
2. Contact: `https://megalodomegolf.com/contact`

### 5) Human handoff
- Business hours note (CT).
- Off-hours: “We’ll reply next business day” + optional form.

## CRM handoff (P1)
When REST token works:
- Webhook on new chat lead → create SuiteDash contact
- Tags: `source:anychat`, `intent:investor|vendor|media`

## Brand
- Widget colors: background `#0A0A0A`, accent `#EEDCA7`, text `#F0E8D0`
- Launcher bottom-right (MegaAssist uses same corner until AnyChat loads)

## Verify
1. Open https://megalodomegolf.com → gold **Chat** button works without AnyChat id.
2. After setting widget id + redeploy → AnyChat bubble appears; MegaAssist hides.
3. Bot paths open correct URLs.
