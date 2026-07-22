# Vista Social + AnyChat — deep research & MEGALODOME fit

**When:** 2026-07-23  
**Scope:** How these two platforms help the current MEGALODOME stack  
(site `megalodomegolf.com`, CRM `app.megalodomegolf.com` / SuiteDash, investor/vendor funnels, email/marketing).

**Secrets:** API keys stored only in Hermes trading `.env` (`MEGALODOME_VISTA_SOCIAL_API_KEY`, `MEGALODOME_ANYCHAT_API_KEY`). **Not committed to git.**

---

## Executive summary

| Platform | What it is | Best MEGALODOME job | Live API status with your keys |
|---|---|---|---|
| **Vista Social** | Social publishing, inbox, analytics, listening + **MCP (50+ AI tools)** | Brand social engine for raise awareness, event content, UGC, listening on “indoor golf / MEGALODOME / Oswego” | Key accepted on `api.vistasocial.com` but plan returns **`Your subscription does not offer API access`**. Product UI + **MCP** still usable; REST needs plan upgrade or support enablement. |
| **AnyChat.one** | Omnichannel customer messaging: **website widget**, shared inbox, bots, tickets, KB | Replace/augment site contact friction; qualify investors/vendors 24/7; route hot chats to Nick | REST base confirmed: `https://api.anychat.one/v1/*` (JSON). Provided token currently **`invalid credentials`** on all auth styles tried — likely needs a **private REST token** from AnyChat app settings (not the public widget key), or token refresh. |

> Note: **anychat.com** (Baijiayun video SDK) is a **different product** from **anychat.one** (this messaging suite). Your key shape + docs point to **anychat.one**.

---

## 1) Vista Social — what the manuals/product say

Sources crawled (public product manuals):
- https://vistasocial.com/social-media-publishing/
- https://vistasocial.com/social-media-analytics/
- https://vistasocial.com/social-media-engagement/
- https://vistasocial.com/social-media-listening/
- https://vistasocial.com/integrations/ (+ network pages)
- https://vistasocial.com/integrations/mcp/
- Support host exists (`support.vistasocial.com`) but returned **403** to automated fetch (bot protection).

### Capabilities (from product docs)

**Publishing / scheduling**
- Multi-network composer: Instagram, Facebook, X, LinkedIn, TikTok, YouTube, Threads, Pinterest, Reddit, Snapchat, Tumblr, etc.
- AI caption assistant, translations, tone consistency
- Media library, bulk upload, Canva integration, labels/clients
- Optimal send-time claims / boost workflows

**Engagement / inbox**
- Unified social inbox for comments/DMs/messages
- Assignment / team reply workflows (social customer care)

**Analytics / reporting**
- Cross-network dashboards
- Post performance, profile growth
- Sentiment on messages/comments/mentions/reviews
- Review report (Google/Facebook/Yelp/TripAdvisor/etc.)
- Competitor + team performance reports
- “Ask Vista” style reporting assistants (product marketing)

**Listening**
- Topic monitoring across social + news + web + reviews
- Trend validation / convergence-style scoring
- Feed content/ad angles from real conversations

**Integrations**
- Native network connections (IG/FB/LinkedIn/TikTok/YouTube/X/Threads/Reddit/Snapchat…)
- **MCP server**: 50+ tools for Claude / ChatGPT / Cursor / Gemini — scheduling, analytics, inbox, ideas, media, reporting from chat
- Mentions of Zapier/Make-class automation ecosystem on marketing pages

### API probe results (this environment)

| Endpoint / style | Result |
|---|---|
| `GET https://vistasocial.com/api/` | `{"status":"success"}` (health) |
| `GET https://api.vistasocial.com/profiles?api_key=…` | **Valid key path** → `{"error":"Your subscription does not offer API access."}` |
| Same with headers `X-Api-Key` / `X-API-Key` / `api-key` | Same subscription error |
| Wrong param names | `Please specify a valid api key` |
| `vistasocial.com/api/me` with Bearer | Session-style unauthorized (app cookie API, not server key) |

**Conclusion:** Your Vista key is recognized. **REST API is plan-gated.**  
For MEGALODOME day-1 value: use **UI + MCP**, not custom REST, until API add-on is enabled.

### How Vista helps MEGALODOME systems

| Current system | Vista role | Concrete plays |
|---|---|---|
| **Marketing site** | Amplify site content | Auto-promote new gallery/news/investor posts; QR codes from CRM (`/book`, `/partners`, `/nda`) in stories/posts |
| **Investor raise** | Awareness + social proof | Schedule raise narrative (non-securities-offer language), construction/progress, press, founder clips; listen for “indoor golf Chicago / Oswego / MEGALODOME” |
| **SuiteDash CRM** | Soft integration first | No native SuiteDash connector found. Path: Zapier/Make **or** human process: social lead → CRM contact tag `source:social` → Investor Raise **New Inquiry**. When API unlocks: webhook/poll → CRM create contact |
| **Email campaigns** | Creative + timing | Vista analytics tell which creative/hooks to put in SuiteDash Website Live / Engaged emails |
| **Hermes / AI ops** | **Highest leverage now** | Connect **Vista MCP** to Claude/Cursor/Hermes-capable clients → “Schedule this week’s MEGALODOME posts”, “Draft IG from one-pager themes”, “Pull last 7d engagement” |
| **Brand safety / counsel** | Guardrails | Content calendar approval workflow; never publish PPM/offering terms on social; link only to public `/invest` + disclaimers |

### Recommended Vista operating model (no REST required)

1. Connect IG + FB + LinkedIn + TikTok + YouTube (minimum).  
2. Media library: brand kit (#EEDCA7 / #0A0A0A), venue renders, logo.  
3. Content pillars: Venue vision · Progress · Community/golf culture · Partner/vendor calls · Investor *education* (not solicitation).  
4. Weekly calendar + UTM links: `?utm_source=instagram&utm_campaign=raise_awareness` → site → CRM dual-write already captures web leads.  
5. Enable **MCP** for Nick/Hermes workflow.  
6. Ask Vista support/sales to **enable API** on the plan if you want SuiteDash automation later.  
7. Social listening topics: `MEGALODOME`, `indoor golf Chicago`, `Oswego golf`, competitor indoor concepts.

---

## 2) AnyChat.one — what the manuals/product say

Sources:
- https://anychat.one/
- https://anychat.one/product/live-chat-widget
- https://anychat.one/product/chat-bot-builder
- https://anychat.one/product/shared-inbox
- https://anychat.one/product/integrations
- https://anychat.one/pricing
- https://docs.anychat.one/ (+ `/developers/rest-api`)
- Live API host: `https://api.anychat.one`

### Capabilities (from product docs)

**Live chat widget**
- Embeddable branded widget (home page, live chat page, KB inside widget, tickets in widget)
- Proactive messaging, routing, agent avatars
- Single entry point on website (reduces “hunt for contact”)

**Shared inbox**
- Omnichannel: Messenger, Instagram, WhatsApp, + web chat (docs claim multi-channel)
- Assign/transfer chats, departments, internal notes
- AI helper + canned responses
- Attachments, emoji, reply-to-message threading

**Chatbot builder**
- No-code flows + AI (OpenAI / OpenRouter / Gemini / DeepSeek / Claude / Grok mentioned on homepage)
- Conditional logic, data fetch, actions: **webhooks, email, Telegram, Google Sheets**, etc.
- Seamless **bot → human handoff**

**Integrations (native list on site)**
- reCAPTCHA, Cloudflare Turnstile (spam)
- Telegram notifications
- Twilio SMS
- Google Sheets
- Meta Business Solution Provider badge on site

**Platform framing**
- “Support inbox + knowledge base + ticketing + automation + bots”
- Mobile app mentioned in footer nav

### API / docs probe results

| Finding | Detail |
|---|---|
| REST surface | `https://api.anychat.one/v1/...` returns Yii-style JSON errors (real API) |
| Tried paths | `/v1/user`, `/workspace`, `/widgets`, `/contacts`, `/conversations`, `/bots`, `/webhooks`, … |
| Auth tried | Bearer, Token, X-Api-Key, query tokens, private-token headers, etc. |
| Result with provided key | **`Unauthorized` / invalid credentials** |
| Docs site | SPA knowledge base; REST page exists but article body not fully static-crawlable |
| Implication | Key may be **widget/public** or **workspace invite** token, not **REST private API key**. Generate API token inside AnyChat → Settings → Developers/API. |

### How AnyChat helps MEGALODOME systems

| Current system | Gap today | AnyChat fix |
|---|---|---|
| Site ContactForm / partners form | Async only; no live qualify | Widget on `/`, `/invest`, `/partners`, `/contact` with bot triage |
| Booking `/book` | Users bounce before booking | Bot: “Book 20-min discovery?” → deep link `app.../book` |
| NDA `/nda` | Friction | Bot after interest: explain NDA + link `app.../nda` |
| Vendor form `/partners` | Long form | Bot collects company/trade → webhook/Sheets → CRM |
| SuiteDash CRM | No live chat native | Webhook on chat lead → create/update contact + tag `source:anychat` + optional deal New Inquiry |
| Email marketing | Cold | Chat captures warmer intent; tag for SuiteDash audiences |
| After-hours | Missed leads | AI bot + Telegram/SMS notify Nick on “investor” intent |
| Knowledge | Static pages | Widget KB: FAQ, hours target, location Wheaton/Oswego story, “not an offer” disclaimer |

### Recommended AnyChat bot map (MEGALODOME)

```
Welcome
 ├─ Investor / raise info
 │    ├─ Accredited? → send /invest + one-pager + /book
 │    ├─ Want data room → /nda + counsel disclaimer
 │    └─ Human (Nick) if high intent
 ├─ Vendor / GC / trade
 │    └─ → /partners form or capture fields → webhook CRM
 ├─ Media / press
 │    └─ → media kit / contact email
 └─ General venue questions
      └─ FAQ KB + optional book tour later
```

**Compliance line (always):**  
Not an offer to sell securities. Offering only via Confidential PPM under Reg D 506(c). Counsel: Lange / Vincent Esquire.

---

## 3) Combined architecture (target)

```
                ┌──────────────────────────────┐
  Socials  ───► │        Vista Social          │
  (IG/FB/LI…)   │ publish · inbox · listen     │
                │ MCP → Hermes/Claude          │
                └──────────────┬───────────────┘
                               │ UTMs / bio links
                               ▼
                ┌──────────────────────────────┐
  Visitors ───► │   megalodomegolf.com         │
                │ + AnyChat widget/bot         │
                └───────┬──────────────┬───────┘
                        │              │
            book/nda/partners     webhook/lead
                        │              │
                        ▼              ▼
                ┌──────────────────────────────┐
                │ SuiteDash CRM                │
                │ contacts · Investor Raise    │
                │ /book · /nda · /partners     │
                │ email campaigns (draft→seed) │
                └──────────────────────────────┘
```

**Do not duplicate systems**
- Vista = **outbound social + social inbox + listening**
- AnyChat = **on-site + messaging channels + bots**
- SuiteDash = **system of record** (contacts, deals, forms, email, portals)
- Website = **public narrative + SEO + gated CTAs**

---

## 4) Priority roadmap

### P0 — This week (no API required)
1. **AnyChat**
   - Confirm login at https://app.anychat.one  
   - Create/regenerate **REST API private key** (if you need automation)  
   - Design gold/black widget  
   - Install widget snippet on Next.js site (layout) for `/`, `/invest`, `/partners`, `/contact`  
   - Build investor triage bot + vendor bot + human handoff to Nick  
   - Telegram notify on “Book call” / “NDA” intents  
2. **Vista**
   - Connect primary social accounts  
   - Brand media library  
   - 2-week content calendar (raise-safe copy)  
   - Enable **MCP** for AI-assisted scheduling  
   - Bio/link-in-bio → `megalodomegolf.com/invest` and `/partners`

### P1 — Light automation
3. AnyChat bot actions:
   - Webhook → Hermes or Vercel API route → SuiteDash contact create (or Google Sheet interim)  
   - Tag: `source:anychat`, `intent:investor|vendor|media`  
4. Vista:
   - UTM standard on all links  
   - Monthly analytics → feed email creative  
   - Ask Vista to unlock **API access** on subscription if CRM sync required

### P2 — Hard integration (after keys/plans work)
5. Vista REST (when plan allows): scheduled pull of engagement metrics into internal dashboard / CRM notes  
6. AnyChat REST: sync contacts/conversations; closed-won chat transcripts attached to CRM deals  
7. Unified lead waterfall SLAs (chat <5m, social DM <1h, form <1 business day)

---

## 5) What we still need from you / vendors

| Item | Why |
|---|---|
| Vista plan that includes **API** (or written confirmation MCP-only is enough) | REST currently blocked: subscription does not offer API access |
| AnyChat **private API token** screenshot/name of setting used | Current secret fails REST auth |
| Which social accounts are official MEGALODOME | Connect only brand-owned |
| Who staffs chat (Nick only vs team) | Routing + hours |
| Counsel one-pager of **allowed social claims** | Avoid securities issues |

---

## 6) Security notes

- Keys saved to Hermes `.env` only; rotate if this chat is shared broadly.  
- Never put API keys in Vercel public `NEXT_PUBLIC_*`.  
- Widget public keys may be frontend-safe; REST keys server-only.  
- Prefer AnyChat Turnstile/reCAPTCHA on open widget to reduce spam before CRM writes.

---

## 7) Evidence artifacts (local)

- `reports/integrations/vista_anychat_research_raw.json`  
- `reports/integrations/vista_anychat_deep.json`  
- `reports/integrations/product_manual_text.json`  
- `reports/integrations/api_auth_hits.json`  
- This plan: `docs/VISTA_ANYCHAT_INTEGRATION_RESEARCH.md`

---

## Bottom line

- **Vista Social** = MEGALODOME’s **social growth + listening + AI social ops (MCP)** layer. Use it now in UI/MCP; upgrade for REST before deep CRM sync.  
- **AnyChat.one** = MEGALODOME’s **on-site and messaging conversion** layer (widget + bot + inbox) sitting in front of SuiteDash funnels (`/book`, `/nda`, `/partners`).  
- Together they cover **attention (Vista) → conversation (AnyChat) → CRM truth (SuiteDash)** without replacing the stack you already built.

**Next build step when you say go:** embed AnyChat widget on the site + draft investor/vendor bot flows + Vista content calendar template (still no public blasts / no securities language).
