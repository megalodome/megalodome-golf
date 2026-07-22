# Stage automations status

**Pipeline:** Investor Raise (`94908`)

## How UI works
1. Stage ⋮ / manage actions → **Configure Automations**
2. Tab **INTO THIS STAGE**
3. PLUS (`.add-link-btn`) → pick action type (**Add/Remove Tags**, Notify, Email, …)
4. Save

## Attempted automation
For each stage we attempted **Add/Remove Tags** with:
- `stage:<slug>`
- `pipeline:investor-raise` (on New Inquiry)
- plus notify action on key stages

See evidence screenshots in `reports/crm_audit/auto_tag_*.png` and `auto_verify_*.png`.

## FLOW (verified persisted)
Investor + Staff FLOW step content now in `meta.config` (label, url, html Open button).
