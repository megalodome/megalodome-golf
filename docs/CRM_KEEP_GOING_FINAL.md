# CRM keep-going — final status this session

## Solid wins (verified)

### Investor FLOW — content persists ✅
URL: https://app.megalodomegolf.com/flw/u/FESEnPWcsCAu9ea  

Each step uses SuiteDash `meta.config`:
| Step | URL |
|---|---|
| Review one-pager | `/docs/investor/one-pager.pdf` |
| Book discovery (20 min) | `app.../book` |
| Request NDA / data room | `app.../nda` |
| Investor hub | `/invest` |

Branded HTML + gold **Open** button. Title: **Investor Onboarding FLOW**.

### Staff FLOW — content persists ✅
URL: https://app.megalodomegolf.com/flw/u/DhPRyKavwsyA8ca  

Profile → Invest hub → Booking → Vendor form.

### Pipeline Investor Raise ✅
8 stages with probabilities (New Inquiry → … → Won/Lost).  
https://app.megalodomegolf.com/crmDealsPipelines/94908

### Prior live items still good
- Forms `/book` `/partners` `/nda`
- Proposal **87073** Mutual NDA
- QR codes (book/partners/nda/invest) — may have dup book
- Email branding copyright + Wheaton disclaimer
- Marketing drafts only (no blast)

## Stage automations — mapped, not fully written headless ⚠️

**UI path (works when clicked manually):**  
Stage manage actions → **Configure Automations** → **INTO THIS STAGE** → PLUS (`.add-link-btn`) → action catalog.

**Catalog includes:** Add/Remove Tags, Email Internal(s), Email to Target, Circles, Webhook, Deal Generator, Create Note, …

**Recommended per stage:**

| Stage | Tags | Email Internal to Nick |
|---|---|---|
| New Inquiry | `stage:new-inquiry`, `pipeline:investor-raise` | Yes |
| Info Pack Sent | `stage:info-pack-sent`, `pack:tier0` | No |
| Call Booked | `stage:call-booked` | Yes |
| Diligence | `stage:diligence` | No |
| Soft Circle | `stage:soft-circle` | Yes |
| Commitment | `stage:commitment` | Yes |
| Won | `stage:won` | Yes |
| Lost | `stage:lost` | No |

Headless browser often fails to keep the action-card panel “visible” for clicks (overflow/hidden). **~10–15 min in UI** finishes this cleanly.

## Your checklist
1. Open Investor FLOW → click each step Open link once  
2. Configure stage automations (table above)  
3. Seed-send Website Live → Seed Test Nick Only  
4. Optional: delete duplicate Book QR  
5. Attach counsel NDA PDF to proposal 87073  

## Docs
- `docs/CRM_LATEST_STATUS.md`
- `docs/PIPELINE_STAGE_AUTOMATIONS.md`
- `docs/STAGE_AUTOMATIONS_LIVE.md`
- `docs/QR_AND_SHORT_LINKS.md`
