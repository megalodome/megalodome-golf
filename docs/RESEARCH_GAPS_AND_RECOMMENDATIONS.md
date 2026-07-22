# MEGALODOME — Deep Research: Gaps & Recommendations

**Date:** 2026-07-22  
**Scope:** FLOWs/forms/e-sign · Automations · All-contact website/fund campaign · Chicago developer campaign · Website improvements  
**Sources:** Live CRM (`app.megalodomegolf.com`), live site (`megalodomegolf.com`), codebase `web/`, SuiteDash help/features, prior CRM audits  

---

## Executive snapshot

| Area | Current state | Gap severity | Priority |
|---|---|---|---|
| FLOWs + forms + e-sign | Partial (booking form, investor FLOW/checklist shells) | **High** | P0–P1 |
| Automations | Partial (booking chain + website API tags) | **High** | P0–P1 |
| All-contact marketing | CRM Marketing module empty (Campaigns/Audiences ready) | **High** | P0 |
| Chicago developer marketing | Contacts exist; no audience/page/campaign | **Medium-High** | P1 |
| Website functionality | Solid marketing shell; analytics/SEO/ops gaps | **Medium** | P1–P2 |

**Bottom line:** CRM plumbing is far enough along to run real operations. Biggest unlocks now are (1) **compliant email audiences + campaigns**, (2) **investor document e-sign via Office Proposals/FLOWs**, (3) **stage/drip automations**, (4) **website conversion + analytics hardening**.

---

## What you already have (baseline)

### Website (live 200s)
Home, About/Mission/Location/Team, Gallery, Investors (+ apply/opportunity/process/data-room/faq), News, FAQ, Contact, Media Kit, Search, Login chooser, Privacy, Terms.

### CRM / portal
- White-label `app.megalodomegolf.com`
- Contacts imported (~370 email) + circles taxonomy
- Pipeline **Investor Raise** + deal generator **Website Investor Lead**
- Booking **Investor Discovery — 20 min** with form automation chain
- FLOWs: Investor Onboarding (+ default Welcome Aboard)
- Checklists: Investor + Staff
- Portal page shells (staff/investor)
- Marketing module routes live:
  - Campaigns `/marketingCampaign/admin`
  - Audiences `/marketingList/admin`
  - Templates `/marketingCampaignTpl/admin`
  - Drip Sequence + Send Settings
- Office: Estimates, Invoices, **Proposals**
- Files, Email Templates (incl. Documents/FLOWs/Proposals categories)
- Auto-Templates area exists but **empty**

### Website → CRM
- `/api/contact`, `/api/invest` → SuiteDash + Supabase + notify email
- Resend domain configured
- PostHog/Twilio keys exist in env but **not wired in site code**

---

## 1) FLOWs, forms, and e-sign documents

### What SuiteDash can do (relevant to you)
- **Forms:** multi-step public forms with automation chains (create contact, book appointment, assign circles, trigger deal generators, notifications).
- **FLOWs:** ordered onboarding experiences for CRM targets/staff; can require completion before portal access; pair with checklists.
- **Checklists:** task lists assigned to targets/staff.
- **Office → Proposals / Estimates / Invoices:** commercial documents; SuiteDash product positioning includes digital proposals (e-sign style acceptance is typically here—not a separate `/esign` app route on your tenant).
- **Files + Email Templates (Documents):** store NDA/subscription packs; send document-centric emails.
- **No dedicated `/esign` route** found on your tenant; e-sign should be designed as:
  1. **Proposal** (investor soft-circle / commitment docs), and/or  
  2. **Form + file acknowledgment** (lighter), and/or  
  3. External e-sign (DocuSign/HelloSign) linked from FLOW step if legal requires full ESIGN Act workflow.

### Gaps
| Gap | Why it matters |
|---|---|
| Only one primary public form (booking) | Missed structured capture for NDA request, media kit, partner RFIs, developer RFPs |
| Investor FLOW not fully instrumented with forms/docs | Prospects can book/apply without a guided legal/docs path |
| No NDA e-sign package live | Mutual NDA PDF exists on site but no tracked signature cycle in CRM |
| No subscription/soft-circle proposal template | Raise process stalls at “Call Booked / Diligence” without document ops |
| Staff FLOW still generic (“Welcome Aboard!”) | Inconsistent internal onboarding |
| Portal bodies thin | Even with FLOW, portal feels empty |
| Form→circle membership reliability | API circle attach flaky; UI membership counts may under-report |

### Recommendations (build order)

#### P0 — Investor document path (e-sign / acceptance)
1. **Create Office Proposal templates**
   - Mutual NDA (from `/docs/investor/mutual-nda.pdf`)
   - Soft-circle / indication-of-interest letter (non-binding; counsel-reviewed)
   - Data-room access acknowledgment
2. **Add FLOW steps** on **Investor Onboarding FLOW**:
   1. Welcome + one-pager  
   2. Book discovery call (existing form link)  
   3. Request / sign NDA (Proposal or external e-sign link)  
   4. Receive Tier-1 pack  
   5. Schedule diligence  
   6. Soft-circle indication  
3. **Form: “NDA / Data Room Request”**
   - Fields: name, email, entity, accreditation status (self-attest), amount range, country  
   - Automations: create/update Prospect · tag `nda-requested` · circle Investors · notify Nick · attach checklist  
4. **Legal guardrails on every doc/email**
   - Not an offer of securities  
   - Accredited/qualified investor language where required  
   - Illinois / US private placement disclaimers (counsel)

#### P1 — More forms (high ROI)
| Form | Audience | Automations |
|---|---|---|
| Media / Press intake | Media circle | Tag media · notify · media kit auto-email |
| Partner / vendor intake | Partners | Tag partner · circle Partners |
| Developer / GC interest (Chicago) | New “Developers-Chicago” circle | Tag developer · geo:chicago · notify ops |
| Investor update preferences | All investors | Marketing audience sync · consent flags |
| Referral form | Warm intros | Tag referral · owner assign |

#### P1 — Staff FLOW
- Replace reliance on default **Welcome Aboard!** with **Staff Onboarding FLOW** bound to Staff checklist + team assignment (IT/HR/Operations…).

#### P2 — Advanced document ops
- Estimate/invoice products for sponsor services only if needed  
- Shared folder packs in Files for diligence rooms by circle  
- If counsel requires full e-sign audit trail → integrate DocuSign/Dropbox Sign and store signed PDF in contact Files + tag `nda-signed`

---

## 2) Automations

### Current automation map
```
Website /contact|/invest
  → Next API → SuiteDash contact+tags → Supabase → staff email (Resend)

Booking form
  → Create Contact (Prospect)
  → Deal generator (Website Investor Lead)
  → Appointment (Nick)
  → Coordinator email
```

### Gaps
| Gap | Impact |
|---|---|
| Auto-Templates library empty | No reusable chains |
| Deal **stage** automations thin/missing | Manual pipeline hygiene |
| No drip after apply without booking | Leads go cold |
| No “no-show / unbooked” follow-up | Lost discovery calls |
| Circle membership not consistently visible | Segmentation/campaigns harder |
| No SMS (Twilio unused) | Weaker meeting reminders |
| No analytics events feeding CRM scores | Heat tags static |
| Marketing unsubscribed handling not operationalized | Compliance risk |

### Recommended automation blueprint

#### A. Lead lifecycle (website)
| Trigger | Actions |
|---|---|
| Contact form (any) | Tag source/path · Website Leads · notify · 24h owner task |
| Contact interest=investor | Also Investors · pipeline tag New Inquiry |
| Invest apply | score:hot/warm · pack email · if no book in 48h → drip email 1 |
| Invest + NDA requested | tag nda-requested · assign Investor checklist · proposal/NDA send |
| Booking created | stage → Call Booked · notify Nick · SMS reminder −24h/−1h (Twilio) |
| Booking completed | stage → Diligence or Soft Circle path · send next FLOW step |
| No booking 7 days after apply | Email “still interested?” + book CTA · tag nurture |

#### B. Pipeline stage automations (Investor Raise)
| Stage | Automation ideas |
|---|---|
| New Inquiry | Auto-send Tier0 pack if not sent · task Nick |
| Info Pack Sent | Wait 3 days → follow-up email |
| Call Booked | Calendar holds · reminder sequence |
| Diligence | Assign diligence checklist · request NDA if missing |
| Soft Circle | Send non-binding IOI proposal |
| Commitment / Won / Lost | **Add these stages** · Won→Client role + Investors circle · Lost→nurture audience |

#### C. Auto-Templates to create
1. **New Website Investor Lead**  
2. **Post-Booking Follow-up**  
3. **NDA Sent / Signed**  
4. **Media Lead Route**  
5. **Developer Lead Route**  

#### D. Technical automation debt
- Finish **true circle membership** (UI bulk) so Marketing Audiences can sync from circles  
- Log every automation in contact background/timeline notes  
- Add idempotency keys on website→CRM to prevent duplicate contacts  
- Wire PostHog events: `invest_submit`, `book_click`, `pack_download`, `nda_click`

---

## 3) Marketing campaign — all contacts (new website + fund info)

### Capability (live in your CRM)
- **Audiences** (`/marketingList/admin`)
- **Campaigns** + **Drip Sequence** (`/marketingCampaign/admin`)
- **Templates** (`/marketingCampaignTpl/admin`)
- Send settings / branding already partially configured (MEGALODOME footer/Wheaton)

### Critical compliance gaps before any blast
1. **Consent basis** unknown for many imported contacts (landing page, events, Jaboy lists, phone-only).  
2. Must suppress:
   - `email unsubscribed` tags  
   - role/staff internal  
   - obvious test emails  
   - contacts without email  
3. **Securities communications** must be carefully framed (not a general solicitation if that conflicts with counsel’s raise strategy).  
4. Physical address + unsubscribe in every email (CAN-SPAM).  
5. Prefer **segmented** sends over one giant blast.

### Recommended audience design
| Audience | Rule | Purpose |
|---|---|---|
| A1 Website Engaged | tag website / landing page form | Product + opening story |
| A2 Investor Universe | Investors circle / investor tags / Jaboy | Fund/process update (counsel-approved) |
| A3 Partners/Vendors | Partners + PGA + developer-like companies | B2B relationship |
| A4 Media | Media tags/circle | Press kit + interview CTA |
| A5 Cold/Unverified | imported no engagement | Soft “permission pass” first, not fund pitch |
| SUPPRESS | unsubscribed, bounced, staff, tests | Never send |

### Campaign concept: “MEGALODOME GOLF — New Home on the Web”
**Goal:** traffic to megalodomegolf.com + qualified investor/book calls — not hard-sell securities.

#### Email 1 — Announcement (Day 0)
- Subject: `MEGALODOME GOLF is live — Chicago West indoor golf`
- Body: new site, vision, Oswego/Fall 2027 target, gallery CTA, media kit  
- CTA primary: Visit site  
- CTA secondary: Book a 20-min discovery call (investors) / Contact (general)

#### Email 2 — Product story (Day 4)
- Domes, par 30, academy, year-round angle  
- CTA: Gallery + FAQ  

#### Email 3 — Split by segment (Day 9)
- **Investor split:** process overview + Tier0 pack + book call (disclaimers heavy)  
- **General split:** opening timeline + contact  
- **Partner split:** collaboration CTA  

#### Optional drip
- If click invest but no form: retarget email  
- If open no click: simpler creative with single CTA  

### Ops checklist
1. Build audiences from tags/circles (after circle membership cleanup)  
2. Create branded templates (gold/black, no ONE branding)  
3. Send **seed test** to Nick + 2 internal  
4. Send A1 first (warmest)  
5. Monitor bounces → remove  
6. Only then A2 investor communication with counsel sign-off  

---

## 4) Marketing campaigns — developers in Chicago area

### Why this is a separate motion
Developer/GC/turf/equipment contacts in your CRM (e.g. construction, sports builders, Troon, Trackman, turf, electrical) are **supply-chain / partnership** leads, not investors. Messaging should be procurement/partnership, not fund raise.

### Gaps
| Gap | Detail |
|---|---|
| No Developer circle/audience | Need `Developers-Chicago` (+ maybe `Facility Operators`) |
| No developer landing page | Site is consumer/investor oriented |
| No RFP/partner form | Contact form too generic |
| No geo enrichment | Many contacts lack city/IL confirmation |
| No case-style one-pager for trade | Need “build with us / specify MEGALODOME” PDF |

### Target sub-segments
1. **GCs / construction / design-build (IL/Chicago)**  
2. **Golf facility operators / management (Troon-like)**  
3. **Equipment / tech (Trackman, range equipment)**  
4. **Turf / sports surfaces**  
5. **Architects / civil / sports architects**  

### Campaign concept: “Building the first true indoor course — Chicago West”
**Offer:** partner briefing + spec deck + site visit / call with ops lead  

#### Assets to create
- `/developers` or `/partners/developers` page (password optional)  
- 2-page trade brief PDF (scope, timeline, categories of interest)  
- Form: trade category, union/non-union, relevant projects, IL presence  

#### Email sequence (trade)
1. Intro + vision + link trade page  
2. Scope categories currently evaluating  
3. Invite to 15-min fit call (not investor booking)  

#### CRM setup
- Circle: **Developers-Chicago**  
- Tags: `segment:developer`, `geo:chicago`, `trade:gc|turf|equipment|operator`  
- Separate booking type or calendar: **Vendor Intro — 15 min** (don’t mix with investor discovery)  
- Pipeline optional: **Partnerships** (or use Projects)

#### List build tactics beyond CRM
- Filter existing export by company keywords (construction, golf, turf, electric, architecture)  
- Enrich IL/Chicago via domain/LinkedIn (manual or tool)  
- Local associations: AGA, SMPS Chicago, sports facility forums  
- Do **not** pitch fund economics in this stream  

---

## 5) Website & functionality improvements

### What’s strong
- Cohesive gold/black brand  
- Investor funnel pages + docs  
- Booking integration  
- Search icon + `/search`  
- Legal pages  
- Media kit / ads / flyer  
- Mobile nav + scroll UX basics  

### Gaps (prioritized)

#### P0 — Conversion & trust
| Gap | Recommendation |
|---|---|
| No bot protection on forms | Add hCaptcha/Turnstile (Cloudflare fits your stack) |
| CF can block scripted posts | Ensure real browser + Turnstile; monitor 1010s |
| Weak form success analytics | PostHog events + conversion dashboards |
| Investor PDFs uneven (some tiny) | Replace placeholder PDFs with real designed docs |
| One-pager external dead links historically | Keep all CTAs on megalodomegolf.com |

#### P1 — Investor UX
| Gap | Recommendation |
|---|---|
| Data room teaser only | Clear gate: apply → NDA → unlock |
| No progress UI after apply | Thank-you next steps checklist (book/call/pack) |
| Booking opens offsite | Branded interstitial “Continue to scheduler” |
| No live spots social proof | “Financing stage / target open Fall 2027” consistency |

#### P1 — SEO / discoverability
| Gap | Recommendation |
|---|---|
| No JSON-LD | Organization, LocalBusiness/SportsActivityLocation, FAQ schema |
| News may be thin/static | Real CMS or MD-based news pipeline |
| Limited location SEO | Oswego/Chicago West landing sections + map embed |
| Image alt/perf | Audit LCP hero/video; modern formats |

#### P1 — Growth surfaces missing
| Gap | Recommendation |
|---|---|
| No developer/partner page | `/partners` hub |
| No newsletter capture | Footer + PostHog + CRM audience |
| No press RSS/room beyond media kit | `/press` with boilerplate + assets |
| No careers stub | Optional later |

#### P2 — Platform
| Gap | Recommendation |
|---|---|
| PostHog not in code | Wire `MEGALODOME_POSTHOG_KEY` |
| Twilio unused | Meeting reminders / urgent investor SMS opt-in |
| No CMS | Sanity/Contentful or MDX for news/team |
| Search is static index | OK short-term; later Algolia/Pagefind |
| i18n none | Not needed unless Canada/FR push |
| A11y pass | Contrast, focus, video captions |
| Cookie consent real enforcement | If analytics/ads expand |

#### Content quality risks
- Some investor docs in `/public/docs/investor/` are very small (possible placeholders). Treat as **not investor-ready** until redesigned.  
- Keep public site free of securities that belong only in gated packs.  

---

## Cross-cutting gaps (org systems)

1. **Circle membership UI vs tags** — campaigns should use tags now; fix membership for cleanliness.  
2. **Counsel workflow** — no documented approval gate for investor emails/PDFs.  
3. **Attribution** — UTM discipline on all campaigns; write UTMs into CRM tags (already partially supported).  
4. **Owner model** — Nick is host/coordinator; define backup owner for SLA.  
5. **Data quality** — phone-only contacts unworked; Jaboy lists need status (talked / didn’t talk) campaign suppression.  
6. **Portal value** — shells without content won’t retain investors.  
7. **KPI dashboard** missing — define weekly metrics (below).

---

## KPIs to track weekly

| Funnel | Metric |
|---|---|
| Site | Sessions, /invest views, apply starts/completes, book clicks |
| CRM | New leads, % with call booked in 7d, stage conversion |
| Docs | NDA sent/signed, pack downloads |
| Email | Delivery, open, click, unsub, spam |
| Developers | Trade form fills, vendor calls |
| Raise | Soft circles count / $ indications (offline OK) |

---

## Recommended 30 / 60 / 90 day plan

### Days 0–30 (foundation)
1. Counsel-approved **email disclaimer block** + suppress list  
2. Build Audiences A1–A5  
3. Ship **Website Live** campaign to A1 (non-securities)  
4. Create **NDA Request form** + Proposal template  
5. Extend Investor FLOW with doc steps  
6. Wire **PostHog + Turnstile**  
7. Add pipeline stages Commitment/Won/Lost + 3 stage automations  
8. Create **Developers-Chicago** circle + tag hygiene on existing vendors  

### Days 31–60 (scale)
1. Investor nurture drip (counsel-approved)  
2. Developer landing page + trade campaign  
3. Auto-Templates library (5 cores)  
4. SMS reminders for bookings  
5. Replace weak investor PDFs  
6. Portal content pass (Investor Home / Next Steps / Data Room)  
7. JSON-LD + location SEO  

### Days 61–90 (optimize)
1. Full e-sign audit trail (native proposals or DocuSign)  
2. Partnerships mini-pipeline  
3. News/CMS pipeline  
4. Score model from PostHog behavior → CRM tags  
5. Quarterly investor update template automation  

---

## Suggested build sequence if engineering time is limited

1. **Audiences + announcement campaign (A1)**  
2. **PostHog + form captcha**  
3. **NDA form + proposal template + FLOW step**  
4. **Stage automations + auto-templates**  
5. **Developer page + audience + vendor form**  
6. **Portal content + PDF quality**  
7. **Advanced e-sign / SMS / CMS**

---

## What not to do

- Do **not** blast all 370+ contacts with fund terms before consent + counsel review.  
- Do **not** mix developer procurement emails with investor raise emails.  
- Do **not** put proforma/sensitive docs in public Tier0.  
- Do **not** rely on SuiteDash Secure API alone for circle membership or marketing audience truth.  
- Do **not** present placeholder PDFs as diligence-grade.

---

## Appendix — key URLs

| Thing | URL |
|---|---|
| Site | https://megalodomegolf.com |
| CRM | https://app.megalodomegolf.com |
| Campaigns | /marketingCampaign/admin |
| Audiences | /marketingList/admin |
| Campaign templates | /marketingCampaignTpl/admin |
| FLOWs | /flows |
| Checklists | /checklist |
| Forms | /forms |
| Booking | /frm/2rWPC5u8yME2svA8N |
| Auto-templates | /automationTemplate/index |
| Pipeline | /crmDealsPipelines/94908 |
| Office/Proposals | /office?t=proposal |
| Files | /files/home |

---

*This is an operational/product research brief, not legal, securities, or investment advice. Investor communications and offering documents should be reviewed by counsel before send.*
