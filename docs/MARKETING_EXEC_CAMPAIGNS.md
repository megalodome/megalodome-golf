# MEGALODOME GOLF — Marketing Audiences & Campaign Drafts

**CRM host:** https://app.megalodomegolf.com  
**Created:** 2026-07-22  
**Operator staff:** nick.badyal@megalodomegolf.com  
**Send status (authoritative):** **ALL CAMPAIGNS = DRAFT — NONE SENT**

Evidence screenshots/HTML: `reports/crm_audit/mkt_*.png` / `mkt_*.html`  
Machine result JSON: `reports/crm_audit/mkt_create_result.json`, `mkt_cleanup_result.json`

---

## Send status confirmation

| Campaign | CRM ID | Status in UI | Sent Date | Actions used |
|---|---|---|---|---|
| Website Live — Announcement | **46632** | **Draft** | Not Provided | Save & Keep Editing only |
| Investor Process Update | **46633** | **Draft** | Not Provided | Save & Keep Editing only |
| Chicago Developers / Partners Intro | **46634** | **Draft** | Not Provided | Save & Keep Editing only |

- Automation **never** clicked **Save & Send**.
- Admin list after cleanup shows only the three named drafts (probe `Untitled` drafts **46630** / **46631** deleted).
- Screenshots: `mkt_campaigns_admin_final.png`, `mkt_campaigns_final_status.png`, `mkt_campaign_saved_*.png`.

**Investor Process Update must remain DRAFT until counsel/compliance review. Do not send.**

---

## Audiences (Marketing Lists)

Path: `/marketingList/admin`  
Empty shells (0 subscribed) for later tag/circle/import sync.  
Based-on date: Day added to Audience.

| Audience # | Name | Intended sync / tags | Notes |
|---|---|---|---|
| **67661** | Website Engaged | `website`, `source:megalodomegolf.com`, `circle:website-leads` | Landing / site engaged |
| **67662** | Investor Universe | `investor`, `import:master`, jaboy/fund tags, `pipeline:investor-raise` | Raise universe |
| **67663** | Partners Vendors | `partner`, `pga`, `vendor`, circle Partners | PGA / vendors |
| **67664** | Media Press | `media`, `press`, circle Media | Press list |
| **67665** | Developers Chicago | `developer`, `gc`, `geo:chicago`, `trade` | Trade / GC / developers |
| **67666** | Suppress Do Not Contact | `do-not-contact`, `test`, unsubscribed | **Never blast** |

Screenshot: `mkt_audiences_admin_final.png`, `mkt_audiences_inventory.png`.

### Audience builder notes

- SuiteDash “Add New Audience” creates a **named list** (not a live tag query builder in this UI path).
- Populate later via: CRM tag filters → add to list, CSV import, form automations, or manual subscribe.
- Recommended tag contract remains on Contacts (Secure API / UI); lists are the marketing send target.

---

## Campaign drafts

Path: `/marketingCampaign/admin` · Editor: WYSIWYG  
From name: **MEGALODOME GOLF**  
Body includes compliance footer on every draft:

- MEGALODOME GOLF · 400 Knoll Street, unit C, Wheaton, IL 60187  
- Unsubscribe language  
- **Not an offer to sell securities**

### 1. Website Live — Announcement

| Field | Value |
|---|---|
| ID | 46632 |
| Edit URL | `/marketingCampaign/update/46632` |
| Subject | MEGALODOME GOLF is live — Chicago West indoor golf |
| Target audience (intended) | Website Engaged (#67661) |
| Primary CTA | https://megalodomegolf.com |
| Secondary (investors only) | https://megalodomegolf.com/invest · booking https://app.megalodomegolf.com/frm/2rWPC5u8yME2svA8N |
| Status | **DRAFT** |
| Screenshot | `mkt_campaign_saved_website_live.png` |

Copy summary: new website live, vision, gallery CTA; securities disclaimer; investor links secondary only.

### 2. Investor Process Update

| Field | Value |
|---|---|
| ID | 46633 |
| Edit URL | `/marketingCampaign/update/46633` |
| Subject | MEGALODOME GOLF — investor process update (qualified investors) |
| Target audience (intended) | Investor Universe (#67662) |
| CTAs | https://megalodomegolf.com/invest · booking form above |
| Status | **DRAFT — DO NOT SEND** without counsel |
| Screenshot | `mkt_campaign_saved_investor_process.png` |

Heavy Reg D / “not an offer” block in body. Banner text: *DRAFT — DO NOT SEND until counsel review*.

### 3. Chicago Developers / Partners Intro

| Field | Value |
|---|---|
| ID | 46634 |
| Edit URL | `/marketingCampaign/update/46634` |
| Subject | MEGALODOME GOLF — partnership intro (Chicago West) |
| Target audience (intended) | Developers Chicago (#67665) (also Partners Vendors #67663 when populated) |
| CTA | https://megalodomegolf.com/partners |
| Status | **DRAFT** |
| Screenshot | `mkt_campaign_saved_developers_partners.png` |

Partnership / vendor intro — **not a fund raise**. Partners page may still be deploying on the marketing site.

### Audience attachment (blocker / next UI step)

Campaign content + draft metadata are saved. SuiteDash attaches recipients in the **Send** wizard (`/marketingCampaign/send/{id}` modal).  

**Not completed in automation** (by design): opening Send and selecting lists risks accidental blast.  

**Manual before any live send:**

1. Open campaign → **Send** (wizard only).  
2. Select audience list (e.g. Website Engaged).  
3. **Exclude** Suppress Do Not Contact.  
4. Preview test to nick.badyal@megalodomegolf.com.  
5. Confirm status stays Draft until explicit send.  
6. Investor campaign: counsel sign-off first.

---

## Marketing campaign templates

Path: `/marketingCampaignTpl/admin`

| ID | Title | Purpose |
|---|---|---|
| **29765** | MEGALODOME Brand Base (gold/black) | Reusable gold/black shell + footer + `{{FirstName}}` |
| **29766** | MEGALODOME Compliance Shell (no offer) | Minimal shell stressing no-offer + unsubscribe |

Canonical list evidence: `mkt_verify_templates.png`, `mkt_tpl_create_immediate_result.json` (both titles present on admin grid).  
Earlier IDs (29760/29761/29763/29764) may still open by direct URL if not purged; **use 29765/29766** as the live admin-list pair. Do not bulk-delete Untitled rows without confirming the menu target — a prior cleanup pass briefly emptied the grid.
---

## SMTP / footer (pre-existing)

Path: `/marketing/customizeSMTPSettings`  
Organization marketing footer already set to Wheaton address (prior pass):

- Name: MEGALODOME GOLF  
- Address: 400 Knoll Street, unit C, Wheaton, IL 60187  

Screenshot: `mkt_marketing_customizeSMTPSettings.png`.

**Note:** Campaign “From Email” field may still default to a legacy white-label mailbox in the editor chrome; confirm From Email under Send Settings / brand mailbox before any live send. Prefer `nick.badyal@megalodomegolf.com` (or approved marketing from-address).

---

## Compliance checklist (every body)

- [x] Brand + street footer (Wheaton IL)  
- [x] Unsubscribe language  
- [x] Not an offer to sell securities  
- [x] Investor draft marked DO NOT SEND  
- [x] Partners draft is partnership, not fund  
- [ ] Live SMTP From domain aligned to megalodomegolf.com (verify before send)  
- [ ] Audience membership populated + suppress list applied  
- [ ] Test send to staff only  
- [ ] Counsel review on Investor Process Update  

---

## Scripts used

| Script | Role |
|---|---|
| `scripts/crm_marketing_probe.py` | UI discovery |
| `scripts/crm_marketing_create_drafts.py` | Create audiences, draft campaigns, templates |
| `scripts/crm_marketing_cleanup.py` | Delete Untitled probe drafts; inventory |

---

## Blockers / residual

1. **Recipient lists empty (0/0)** — audiences named only; need tag→list sync or import.  
2. **Campaign ↔ audience bind** — done in Send wizard; intentionally not automated.  
3. **From Email legacy default** — confirm brand mailbox before send.  
4. **Staff timezone chrome** may still show America/Moncton in list timestamps (session/org TZ noise).  
5. **`/partners` page** may still be deploying on the public site.  
6. **Investor email** requires legal/compliance approval before any non-draft use.

---

## Quick links

- Campaigns: https://app.megalodomegolf.com/marketingCampaign/admin  
- Audiences: https://app.megalodomegolf.com/marketingList/admin  
- Templates: https://app.megalodomegolf.com/marketingCampaignTpl/admin  
- SMTP: https://app.megalodomegolf.com/marketing/customizeSMTPSettings  
