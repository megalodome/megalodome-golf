# Deep Research: Website + SuiteDash CRM Advantage Plan
## MEGALODOME GOLF

**Date:** 2026-07-20  
**Scope:** Improve megalodomegolf.com (Next.js on Vercel) and fully leverage SuiteDash as investor CRM/OS  
**Live app:** https://megalodome-golf.vercel.app  
**Repo:** https://github.com/megalodome/megalodome-golf  

---

## 1. Executive summary

You already have a solid **marketing site + lead capture spine**:
- Brand pages + investor funnel (`/invest`, `/invest/apply`)
- SuiteDash Secure API creating **CRM Leads** with investor tags
- Supabase lead archive + Resend notifications

To take **full advantage of SuiteDash**, shift from “form dumps contacts” to an **investor operating system**:
1. **Capture** (multi-funnel, scored)
2. **Route** (circles, owners, deal stages)
3. **Nurture** (drip, follow-ups, portal content)
4. **Convert** (calls, proposals/docs, commitments)
5. **Operate** (tasks, files, e-sign, reporting)

Biggest unlocks (priority order):
1. Finish **Deal Pipeline + Deal Generator automation** (API cannot create deals)
2. Clean CRM schema (investor custom fields, circles, owners)
3. Multi-step investor journeys + gated content portal
4. Automated nurture (drip + follow-up generators)
5. Website UX/conversion upgrades tied to CRM events
6. Optional advanced: Proposals, FLOWs onboarding, booking forms, Zapier backups

---

## 2. Current state audit

### 2.1 Website (what exists)
| Area | Status | Gap |
|---|---|---|
| Marketing pages | Strong baseline | Thin conversion paths beyond contact/invest |
| Investor pages | Live | No multi-step nurture, no gated data room |
| Contact form | Live | Basic; investor path works but shallow |
| Analytics | Missing PostHog `phc_` | No funnel metrics |
| SEO | Basic sitemap/meta | Need location/investor landing clusters, schema, OG per page |
| Media | Static images + flyer | No hero video, no interactive course map |
| Trust | Press links | No team bios, no FAQ investor-specific, no compliance footer strength |
| Domain | Transfer pending | Apex still GoDaddy until cutover |

### 2.2 Integrations (what exists)
| System | Status | Notes |
|---|---|---|
| SuiteDash API | ✅ verified | Contacts/companies create; **no deals endpoints** |
| Supabase leads | ✅ | Backup source of truth for web events |
| Resend | ✅ domain verified | Transactional notify only |
| Twilio | ✅ trial, no number | SMS alerts later |
| PostHog | ⏳ | Need project key |
| Cloudflare | Zone yes; registrar transfer pending | DNS cutover later |

### 2.3 SuiteDash API reality (verified)
- Base: `https://app.suitedash.com/secure-api`
- Auth: `X-Public-ID` + `X-Secret-Key`
- Works: contacts, companies, projects list/meta, `POST /contact` as `Lead|Prospect|Client`
- Does **not** expose: deals, pipelines, forms, funnels
- Implication: **website creates contacts; SuiteDash UI automations create deals/nurture**

### 2.4 SuiteDash platform capabilities (from product/help research)
SuiteDash is broader than CRM:

**CRM**
- Lead → Prospect → Client (one-way progression)
- Circles, tags, custom fields, claiming/ownership
- Deal pipelines, stages, probabilities, generators
- Follow-ups + follow-up generators
- No-code automations on stage moves / form submit / many objects

**Forms**
- Kickoff (public, creates CRM + automations) — primary website bridge
- Update (auth only)
- Subscriber (marketing audiences)
- Booking / Checkout / Support / Work Request
- Conditional fields, themes, embed/public URL

**Portal & content**
- White-label portal, dashboards, portal pages
- Magic link login
- File exchange, folder generators
- Gated investor materials after Prospect conversion

**Sales docs**
- Proposals + templates
- Dynamic documents / e-sign
- Estimates/invoices (more client-stage)

**Marketing**
- Campaigns + drip sequences
- Email sending settings / deliverability
- Form cannons / flow cannons (outbound asks)

**Integrations**
- Secure API, Zapier, webhooks (billing/projects + automation webhooks)
- Twilio SMS, calendars, reCAPTCHA, QuickBooks

**Funnels**
- Sales Funnel Builder (often LMS/product; PRIME power-up)
- For investors, **Kickoff + Deals + Drip + Portal** beats LMS funnel builder

---

## 3. Target operating model (investor-first)

```text
Awareness (site/press)
  → Capture (invest form / contact / kickoff / newsletter)
    → CRM Lead + tags + circle Investors
      → Deal: Investor Raise / New Inquiry
        → Auto: owner assign, internal notify, drip #1, task "send pack"
          → Stage: Info Pack Sent (portal invite / magic link materials)
            → Stage: Call Booked (booking form / calendar)
              → Diligence (file room + checklist FLOW)
                → Soft Circle / Commitment
                  → Won (docs/e-sign) or Lost (reason + recycle nurture)
```

Parallel tracks:
- **Media** circle/pipeline (not investor deal values)
- **Strategic partners** circle
- **General interest** newsletter audience only (no deal)

---

## 4. SuiteDash configuration blueprint (do this in product)

### 4.1 CRM taxonomy
**Circles**
- `Investors`
- `Media`
- `Partners`
- `VIP / Warm Intros`

**Tags (machine-readable)**
- `source:megalodomegolf.com`
- `source:press`
- `path:invest-apply` / `path:contact` / `path:kickoff`
- `type:individual|family-office|fund|strategic`
- `check:50-100|100-250|250-500|500plus|undecided`
- `accredited:yes|no|unknown`
- `score:hot|warm|cold`

**Custom fields (create investor set; retire irrelevant property/VAT leftovers)**
- Investor type
- Indicative check size
- Timeline
- Accredited?
- Geography
- Intro source / who referred
- Preferred contact method
- Notes / thesis fit
- Last touch channel

### 4.2 Deal pipeline: `Investor Raise`
| Stage | Exit criteria | Automations on enter |
|---|---|---|
| New Inquiry | Valid contact + basic quals | Notify raise channel; create follow-up 24h; start drip A |
| Info Pack Sent | Flyer/teaser deck delivered | Schedule follow-up 3d; portal invite optional |
| Call Booked | Meeting scheduled | Calendar hold; prep task; reminder SMS/email |
| Diligence | NDA/data room access | Folder generator; checklist FLOW |
| Soft Circle | Verbal interest / allocation talk | Manager notify; proposal generator optional |
| Commitment | Soft commit amount logged | Legal/docs tasks |
| Won | Closed | Convert role toward Client if operationally needed; celebrate task |
| Lost | Reason required | Tag reason; add to long-term nurture audience |

**Deal Generator:** `Website Investor Lead`  
Title: `Investor — {First} {Last} — {Company}`  
Default stage: New Inquiry  
Followers: raise team

### 4.3 Role strategy
- Website applicants: **Lead** (no portal yet)
- After pack + call interest: convert to **Prospect** (portal access to data room)
- Only post-commitment/ops relationship: **Client**
- Never reverse roles (platform constraint)

### 4.4 Forms matrix
| Form | Type | Website placement | Creates |
|---|---|---|---|
| Investor Apply (custom Next.js) | API → contact | `/invest/apply` | Lead + tags (+ deal via automation) |
| Quick investor CTA | contact interest=investor | home/invest | Lead |
| Newsletter | Subscriber form embed or API | footer | Audience only |
| Book a call | Booking form | `/invest/thank-you` + stage email | Appointment + stage move |
| Media request | Kickoff or custom | `/contact` media | Media circle, no investor deal |
| Update investor profile | Update form | portal | enrich fields |

### 4.5 Nurture systems
1. **Drip A – New investor** (5–7 touches / 21 days)
   - Day 0: thanks + flyer
   - Day 2: vision/course differentiator
   - Day 5: market/press social proof
   - Day 9: process & timeline
   - Day 14: book call CTA
   - Day 21: breakup / stay on list
2. **Follow-up generators** for human tasks (not only email)
3. **Stage-based drips** (stop/start on stage change via automation)

### 4.6 Portal (high leverage for investors)
Create Prospect portal pages:
- Teaser deck / flyer
- FAQs for investors
- Press kit
- Process overview
- Request diligence access
- Book call widget

Use **Magic Link** for frictionless return visits.

### 4.7 Docs & close tools
- Proposal templates for allocation/soft commit packaging
- Dynamic document + e-sign for NDAs or subscription docs (legal review required)
- Folder generators per deal stage for diligence files

---

## 5. Website improvement program (conversion + CRM-aligned)

### Phase A — Conversion foundations (1–2 weeks)
1. **PostHog** full funnel
   - pages: `/invest`, `/invest/apply`, submit success, contact investor
   - events: `invest_form_start`, `invest_form_submit`, `flyer_download`, `cta_click`
2. **Investor information architecture**
   - `/invest` (story)
   - `/invest/apply` (form)
   - `/invest/faq` (investor FAQ)
   - `/invest/process` (how raise works)
   - `/invest/thank-you` (book call + portal tease)
3. **Stronger CTAs**
   - sticky mobile CTA “Investor access”
   - flyer download tracked + optional email gate
4. **Trust block**
   - team page real bios
   - press logos row
   - location map/embed
   - compliance microcopy on all investor CTAs
5. **Performance/SEO**
   - compress images, next/image already used
   - JSON-LD Organization/LocalBusiness
   - unique meta/OG per page
   - internal links from news/mission → invest

### Phase B — Funnel sophistication (2–4 weeks)
1. **Multi-step apply** (reduces drop-off)
   - Step 1 identity
   - Step 2 check size/timeline
   - Step 3 message
   - Save partial? (optional via SuiteDash update later)
2. **Thank-you upsell**
   - Book call (SuiteDash booking form or Calendly→Zapier→stage)
   - “Get portal access” CTA once Prospect rules defined
3. **Lead scoring on site**
   - score from check size + timeline + accredited
   - pass tags `score:hot|warm|cold`
   - route hot to SMS/email priority
4. **Content upgrades**
   - hero video (from current site concept)
   - interactive dome/course sections
   - downloadable one-pager separate from long flyer
5. **A/B tests** (PostHog)
   - headline variants
   - form length
   - CTA placement

### Phase C — Portal + sales enablement (4–8 weeks)
1. Auto-upgrade path Lead→Prospect after call booked or pack engaged
2. Investor data room in SuiteDash portal
3. Proposal/e-sign path for serious deals
4. Staff dashboards: deals by stage, aging, source
5. Weekly digest automation to raise lead

### Phase D — Growth systems
1. Referral form (introducer circle)
2. Press room with media kickoff form
3. Community/events waitlist (subscriber)
4. Multi-location future funnels (same CRM, different pipelines)

---

## 6. Technical integration architecture (recommended)

### 6.1 Source of truth split
| Data | System |
|---|---|
| Investor relationship + stages + tasks + portal | **SuiteDash** |
| Raw web event log / backup / warehouse-friendly | **Supabase leads** |
| Transactional alerts | **Resend** (+ Twilio later) |
| Product analytics | **PostHog** |
| Public web UX | **Next.js** |

### 6.2 Event contracts (implement consistently)
Every web capture should send:
- identity (name/email/phone/company)
- `source_site`, `source_page`, `source_form`
- UTM params
- investor qualifiers
- tags for routing
- `suitedash_uid` stored in Supabase metadata

### 6.3 API path (already started)
`POST /api/invest` and investor `/api/contact`:
1. Validate + honeypot
2. `POST /contact` SuiteDash Lead
3. Supabase insert
4. Resend notify
5. Return ok

**Add next:**
- UTMs
- scoring tags
- idempotency by email (get contact then update if exists)
- richer custom field map once investor fields created
- optional Zapier webhook fallback if SuiteDash down

### 6.4 Deal creation bridge (required workaround)
Because deals aren’t in Secure API:
1. Primary: SuiteDash automation on tag/circle → Deal Generator
2. Backup: Kickoff Form path that natively supports generators
3. Backup2: Zapier “New Contact” filtered by tag → staff task / Slack + manual/generator
4. Verify with test matrix after each change

### 6.5 Webhooks back to website/data
Use SuiteDash automation webhooks / Zapier to push stage changes into:
- Supabase `lead_events` (stage history)
- internal Slack
- analytics identify traits (`deal_stage`)

Suggested Supabase tables:
- `leads` (exists)
- `lead_events` (stage changes, email opens if available, call booked)
- `investors` (optional materialized view of qualified)

---

## 7. Funnel designs to deploy on the website

### Funnel 1 — Core investor (primary)
Entry: nav Investors, home CTA, press pages  
Landing: `/invest`  
Apply: `/invest/apply`  
CRM: Lead + Investors circle + deal New Inquiry  
Nurture: Drip A  
Human: follow-up task 24h  

### Funnel 2 — Soft capture (top of funnel)
Entry: flyer download gate / footer  
Capture: email + name  
CRM: Lead tag `score:cold` OR subscriber audience only  
Nurture: light drip → apply CTA  

### Funnel 3 — Call intent
Entry: thank-you + email CTAs  
Booking form  
Automation: stage → Call Booked; assign owner  

### Funnel 4 — Media (protect investor pipeline)
Media form does **not** create investor deals  
Circle Media + notify PR owner only  

### Funnel 5 — Partner/strategic land
Separate pipeline `Strategic Partners`  
Avoid contaminating investor forecasts  

---

## 8. Website UX/content improvements (specific)

### Homepage
- Replace generic density with 1 clear primary CTA path (Play story vs Invest story can split)
- Add “For Investors” band with 3 bullets + apply CTA
- Add video modal
- Add press logo strip from existing news links

### Mission/Location/About
- End each section with contextual CTA (invest or contact)
- Add map + “why Oswego” investor-relevant demand points

### Pictures
- Gallery lightbox + captions tied to course/practice/clubhouse narrative
- CTA strip sticky on mobile

### Team
- Real names/roles/headshots (critical for raise credibility)
- “Talk to the team” CTA

### News
- Card UI with source + date + 1-line relevance
- “Mentioned in the press — invest” band

### FAQ
- Split player FAQ vs investor FAQ
- Investor answers should not over-promise returns; compliance tone

### Legal
- Expand investor disclaimers
- Privacy mentions CRM processors (SuiteDash, Resend, analytics)

---

## 9. KPI framework

### Website
- Invest page CVR (visit → apply start)
- Apply CVR (start → submit)
- Flyer download rate
- CTA click rate by source/UTM
- Device conversion split

### CRM
- New investor leads / week
- % with check size completed
- Time to first human touch
- Stage conversion rates
- Median days in stage
- Source quality (press vs direct vs referral)

### Revenue process
- Soft circle $ sum
- Commit $ sum
- Win rate by source
- Loss reasons taxonomy

---

## 10. 90-day roadmap

### Days 0–14 (Foundation)
- [ ] Create Investors circle, pipeline, stages, deal generator, automations
- [ ] Verify website lead → contact → **deal** e2e
- [ ] Add PostHog
- [ ] Investor custom fields cleanup
- [ ] Team bios + compliance footer
- [ ] UTM capture on forms
- [ ] DNS cutover when domain transfer completes

### Days 15–45 (Nurture + conversion)
- [ ] Drip sequence A live
- [ ] Follow-up generators + ownership rules
- [ ] Thank-you booking CTA
- [ ] Multi-step apply
- [ ] Lead scoring tags
- [ ] Investor FAQ/process pages
- [ ] Stage webhook → Supabase events

### Days 46–90 (Portal + close)
- [ ] Prospect portal data room
- [ ] Lead→Prospect rules
- [ ] NDA/doc workflow
- [ ] Proposal template path
- [ ] Internal dashboards + weekly digest
- [ ] A/B tests on invest landing

---

## 11. Risks & constraints

1. **No deal API** — automation quality is existential; test often.
2. **Role one-way** — don’t convert to Client too early.
3. **API rate limits** by SuiteDash plan (monitor).
4. **Compliance** — investor pages are marketing, not offerings; legal review copy.
5. **Dirty custom fields** currently look like generic business onboarding template — clean before scale.
6. **Email deliverability** — configure SuiteDash sending domain properly if using drips (separate from Resend).
7. **Double systems drift** — keep Supabase as log; SuiteDash as relationship truth.
8. **Domain transfer window** — keep Vercel URL in ads/email until apex stable.

---

## 12. Recommended immediate next builds (engineering)

1. `utm_*` + `gclid/fbclid` capture into SuiteDash background + Supabase metadata  
2. Idempotent contact upsert (GET by email → update vs create)  
3. Scoring function → tags  
4. `/invest/faq` + `/invest/process` pages  
5. PostHog provider  
6. Supabase `lead_events` + webhook endpoint `/api/suitedash/webhook`  
7. Optional Kickoff Form embed section as fallback capture  
8. Admin debug page (protected) showing last CRM sync status  

---

## 13. What “full advantage” looks like in 6 months

- Every investor touch typed, staged, owned
- Hot leads get human follow-up same day automatically
- Prospects self-serve through portal instead of PDF ping-pong
- Raise leadership sees forecast by stage/source weekly
- Website experiments continuously improve apply CVR
- Media/partner noise doesn’t pollute investor pipeline
- Won deals transition cleanly into ops/client workflows if needed

---

## 14. Sources / evidence base
- Live SuiteDash Secure API verification on MEGALODOME account (contacts create, deals 404)
- SuiteDash Help: Kickoff Forms, Deals/Pipelines/Generators, Automations, Secure API, Zapier, Webhooks, Drip Sequences, Magic Link, Forms overview, Lead/Prospect/Client roles
- SuiteDash marketing feature map (CRM, portal, proposals, billing, marketing)
- Current codebase under `C:\Projects\dizzat\megalodome\web`
- Setup doc: `docs/SUITEDASH_SETUP.md`

---

## 15. Decision asks for you
1. Approve investor pipeline stage names (or edit list)
2. Who owns new investor leads by default? (person/round-robin)
3. Do you want **portal data room** in phase 1 or after first 20 leads?
4. Legal contact for disclaimer language
5. PostHog `phc_` key when ready
6. Confirm domain transfer status before public campaign spend

---

**Bottom line:** The website should become the **acquisition + qualification UI**; SuiteDash should become the **investor CRM + automation + portal + close engine**. You’re ~40% there (capture works). The next jump is deal automation + nurture + trust/content + analytics.
