# MEGALODOME CRM — Branding & improvement plan

**When:** 2026-07-22  
**CRM:** https://app.megalodomegolf.com  
**Site:** https://megalodomegolf.com  
**Audit evidence:** `reports/crm_audit/crm_full_opportunity_audit.json` + `audit_public_*.png`

This plan answers: **what else can we do with the CRM**, where branding still drifts, and a **priority order** to make forms / system emails / marketing emails look like one MEGALODOME product.

---

## Brand source of truth (lock this)

| Token | Value | Use |
|---|---|---|
| Gold | `#EEDCA7` | Labels, accents, primary buttons, links |
| Gold dark | `#C9A84C` | Hover / borders |
| Gold light | `#F7EDD5` | Headings on dark |
| Black | `#0A0A0A` | Page chrome |
| Charcoal | `#1A1A1A` | Inputs / cards / email body fallback |
| Footer charcoal | `#111111` | Email footer bar |
| Text light | `#F0E8D0` | Body text on dark |
| Button text | `#14110A` | Text on gold buttons |
| Email BG art | `https://megalodomegolf.com/images/email/email-bg-course-contours.jpg` | Marketing HTML only |
| Address | 400 Knoll Street, unit C · Wheaton IL 60187 | All footers |
| Counsel | Timothy Lange · Vincent Esquire | Legal surfaces only |
| Staff booking host | Nick Badyal `4082222` · nick.badyal@megalodomegolf.com | Never legacy `2275471` |

**Public copy rule:** never say ONE / SuiteDash on site or outbound marketing. Internal code/env names OK.

---

## Live branding scorecard (audit)

### Public forms

| Form | URL | Fields | Brand look | Gap |
|---|---|---|---|---|
| **Vendor / Developer** | `/partners` | 9 full fields, layout OK | **Gold/black match** (dark inputs, gold labels/button, header) | Reference standard — clone this pattern |
| **Booking** | `/book` | 6 | Dark page, **white inputs**, grey labels, weak button | Needs same header CSS + styleOptions pass as vendor |
| **NDA** | `/frm/yFQpH3JDwZXuLQzL` | ~5 | Dark page, **white inputs**, grey button, **no MEGALODOME header** | Full rebuild like vendor (fields + divBlocks theme) |

### Emails

| Surface | Status | Gap |
|---|---|---|
| Email Branding main/footer colors | `#1A1A1A` / `#111111`, From = MEGALODOME GOLF | **Copyright + disclaimer empty** — fill Wheaton line |
| Marketing SMTP footer | Name/address Wheaton OK | Confirm country + no Moncton leftovers on live send |
| Marketing drafts 46632–46634 | Contour **bg-image** + MEGALODOME + Wheaton | Still **Draft**; 46634 missing `/book` CTA; seed-send not done |
| System / onboarding / booking notifies | Inherit solid branding colors only (no bg image — platform limit) | Logo, from-name, copyright/disclaimer must be perfect |
| Auto-template / FLOW emails | Underbuilt | No shared HTML shell yet |

### Platform chrome

| Surface | Status | Gap |
|---|---|---|
| `/company/customizeTheme` | Gold present in color map | Spot-check top bar / login / registration vs site |
| Org `/company/info` | Reachable | Re-verify phone/timezone/logo |
| Staff session chrome | May still show legacy strings in UI chrome | Cosmetic; prioritize outbound |

### Module reachability (what exists in this tenant)

| Module | Reachable | Current use | Opportunity |
|---|---|---|---|
| Contacts / Circles / Tags | Yes | Strong | Tag hygiene + audience sync |
| Pipeline + Deal generators | Yes | Investor Raise live | Stage automations + commitment/won drips |
| Booking + calendars | Yes | Investor Discovery | Theme + host locked |
| Forms (booking/vendor/nda) | Yes (via tokens) | 3 public | Brand parity pack |
| Marketing campaigns/audiences/templates | Yes | Drafts + populated lists | Seed send + template library |
| FLOWs + Checklists | Yes | Investor + Staff shells | Step copy + NDA proposal step |
| Portals | Yes | Shells | Investor/staff page bodies |
| Office (proposals/estimates) | Yes | Light | Mutual NDA proposal template |
| Files / LMS / Content / My Pages | Mixed / some 404 paths | Untapped | Brand asset library; skip LMS unless training needed |
| QR codes | Yes | Untapped | Print + event QR to `/book`, `/partners`, `/invest` |
| Friendly URLs | Yes | `/book`, `/partners` | `/nda` short link |
| Automations / Auto-Templates | Partial | Form ContactIntake | Stage drips + Auto-Template stubs |
| Domain settings | Yes | `app.` live | Leave MX alone |

---

## What is already solid (do not redo)

1. Apex site + CRM host split (`megalodomegolf.com` / `app.megalodomegolf.com`)
2. Website → Secure API dual-write (contact/invest/newsletter) + spam guards
3. Booking live at `/book` with correct staff host
4. Vendor form rebuilt + themed + short URL `/partners`
5. Marketing audiences populated (incl. Seed Test Nick Only)
6. Campaign drafts with contour background (not sent)
7. SMTP marketing address = Wheaton MEGALODOME
8. Pipeline Investor Raise + deal gen Website Investor Lead
9. Circles/tags/import foundation
10. Legal counsel Lange/Vincent on site + CRM contact

---

## Priority plan (do in this order)

### Phase A — Brand parity pack (highest visual ROI) · ~1–2 days

**Goal:** Every public CRM surface looks like the vendor form + site.

| # | Work | How | Done when |
|---|---|---|---|
| A1 | **NDA form theme + fields** | Same recipe as vendor: fields (name, email, company, phone, message/role), `divBlocks.header` gold CSS, required via `meta.required`, friendly slug **`/nda`** | Public `/nda` matches vendor palette; site `ndaFormUrl` updated |
| A2 | **Booking form theme** | `styleOptions` + header/footer divBlocks CSS override white inputs; keep generator/host | `/book` dark inputs, gold CTA, MEGALODOME header |
| A3 | **Email Branding legal chrome** | `/company/customizeEmailTemplate` — copyright `[current-year] :: MEGALODOME GOLF :: All rights reserved`; disclaimer = full Wheaton address + not-an-offer line | Copyright/disclaimer non-empty on reload |
| A4 | **Shared email HTML shell** | One partial: logo/wordmark, contour optional (marketing only), gold CTA button, Wheaton footer, unsubscribe | Templates 29765–29766 + any new Auto-Templates use it |
| A5 | **Success / thank-you screens** on forms | Booking + vendor + NDA success copy branded (no default grey) | Screenshot pack |

**Form design standard (copy vendor):**
- Background `#0A0A0A`
- Inputs `#1A1A1A`, border gold 40%
- Labels gold, submit gold pill
- Header: MEGALODOME GOLF + form title + one-line purpose
- Footer: site link
- Half-rows only as pairs (never orphan `field_half`)
- Dropdown options only `{order,value,uuid}`

### Phase B — Marketing go-live hygiene · ~0.5–1 day + human sends

| # | Work | Notes |
|---|---|---|
| B1 | Seed-test **Website Live (46632)** → audience **Seed Test Nick Only** | Human Send wizard only |
| B2 | If seed OK → Website Engaged (298) | Still no investor blast |
| B3 | Fix 46634 CTA to include partners URL `/partners` + optional book | Developers stream ≠ raise economics |
| B4 | Hold **46633 Investor Process** for counsel | Timothy Lange review |
| B5 | Re-export templates from shared shell after A4 | Avoid three different footers |
| B6 | Developers Chicago audience still thin | Tag `segment:developer` / `geo:chicago` then CSV re-import |

### Phase C — Pipeline & automation depth · ~1–2 days

| # | Work | Notes |
|---|---|---|
| C1 | Confirm Investor Raise 8 stages on board (Commitment/Won/Lost) | UI verify |
| C2 | Stage automations: New Inquiry → tag; Call Booked → checklist; Won/Lost reasons | Manage Automations per stage |
| C3 | Auto-Templates stubs: Welcome, Info Pack, NDA request, Post-call | Manual title+body from shell |
| C4 | FLOW Investor steps: review one-pager → book `/book` → NDA `/nda` → data room | Real URLs in steps |
| C5 | Office → Mutual NDA Proposal template | Counsel-approved PDF/HTML |
| C6 | Nick notify matrix audit | Booking + NDA + Vendor + website API |

### Phase D — Portals & staff experience · ~1–2 days

| # | Work | Notes |
|---|---|---|
| D1 | Investor portal pages: Home, Materials, Next Steps | Gold/black body HTML; no empty shells |
| D2 | Staff portal: HQ, Raise Desk, Playbooks | Links to pipeline, forms, files |
| D3 | Staff onboarding FLOW steps + checklist | Welcome Aboard! only for staff |
| D4 | Login chooser `/login` already exists | Spot-check copy still vendor-free |
| D5 | Files library folders: Brand, Investor Tier0, Legal, Press | Upload finals only |

### Phase E — Untapped growth tools · optional / later

| # | Module | Use for MEGALODOME |
|---|---|---|
| E1 | **QR codes** | Print QR → `/book`, `/partners`, `/invest`, venue later |
| E2 | **Drip sequences** | Post-seed nurture for Website Engaged (light touch) |
| E3 | **LMS** | Only if staff certification needed — else skip |
| E4 | **Estimates / Invoices** | When construction vendors bid — not raise |
| E5 | **Public Pages** | Keep minimal; Next.js is public front door |
| E6 | **Custom menus** | Staff nav shortcuts to Raise Desk |
| E7 | **Content blocks** | Reusable portal widgets |
| E8 | **Deal health reporting** | Weekly pipeline snapshot to Nick |

---

## Unified “look system” for CRM

```text
                    ┌─────────────────────────┐
                    │  Brand tokens + address │
                    │  + contour asset URL    │
                    └───────────┬─────────────┘
          ┌─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
   Public forms            System email           Marketing email
   (divBlocks CSS          (Email Branding        (HTML shell +
    + styleOptions)         colors + logo +        contour bg-image
                            copyright)              + gold CTA)
          │                     │                     │
          └─────────────┬───────┴──────────┬──────────┘
                        ▼                  ▼
                 Portal page HTML    Auto-Templates / FLOWs
                 (same CSS vars)     (same shell, no blast)
```

**Hard platform limits (plan around them):**
- Secure API: contacts/tags only — no deals/bookings/campaigns create
- Email Branding: **no** body background-image (colors + logo only)
- GENERAL forms: booking `styleOptions` alone won’t fully theme — use **header CSS**
- Circles membership via API unreliable — tags are source of truth
- Never automate **Save & Send**

---

## Recommended sprint board (next 10 working items)

1. NDA form = vendor-quality theme + fields + `/nda` slug  
2. Booking form input/button gold-black pass  
3. Email Branding copyright + disclaimer  
4. Shared marketing/system HTML shell doc + apply to templates  
5. Seed-send Website Live to Nick  
6. Investor FLOW step URLs (`/book`, `/nda`, one-pager)  
7. Office Mutual NDA proposal stub (counsel)  
8. Portal Investor Home body content  
9. Stage automation: Call Booked + Info Pack Sent  
10. QR pack: book / partners / invest  

---

## Success metrics

| Metric | Target |
|---|---|
| Public forms with gold labels + dark inputs | 3/3 (book, partners, nda) |
| Outbound email footer shows Wheaton only | 100% of test sends |
| Marketing drafts using contour shell | All active drafts |
| Seed test received by Nick | 1 successful |
| Investor portal empty pages | 0 |
| Legacy ONE/SuiteDash on public CRM pages | 0 user-visible |

---

## Out of scope / do not touch without approval

- Full list investor email blast  
- DNS / MX / Outlook  
- Deleting real contacts  
- Changing booking host off Nick brand staff  
- Mixing developer procurement copy into raise economics emails  

---

## Evidence from this research pass

- `reports/crm_audit/crm_full_opportunity_audit.json`  
- `reports/crm_audit/audit_public_booking.png`  
- `reports/crm_audit/audit_public_vendor.png`  
- `reports/crm_audit/audit_public_nda.png`  
- `reports/crm_audit/audit_email_branding.png`  
- `reports/crm_audit/audit_platform_theme.png`  

---

## Suggested next execution

**Start Phase A1–A3 immediately** (NDA + booking theme + email copyright).  
That closes the obvious “CRM looks unfinished” gap without sending any blasts.

Then Phase B seed-send when you approve.
