# SuiteDash CRM setup — complete checklist

Website now:
- Creates SuiteDash **Lead** with investor tags + score
- Emails Tier 0/1 PDF pack (+ NDA if requested) via Resend
- Logs to Supabase
- Notifies raise team

## Required in SuiteDash UI (deals cannot be API-created)

### 1. Circle
CRM → Circles → create **`Investors`** (exact spelling)

### 2. Pipeline
CRM → Deals → Pipelines → **`Investor Raise`**
Stages:
1. New Inquiry
2. Info Pack Sent
3. Call Booked
4. Diligence
5. Soft Circle
6. Commitment
7. Won
8. Lost

### 3. Deal Generator
CRM → Deals → Generators → **`Website Investor Lead`**
- Pipeline: Investor Raise
- Stage: New Inquiry
- Title: Investor — {{First Name}} {{Last Name}}
- Followers: raise team + notify

### 4. Automation (critical)
When contact is created/updated with tag **`investor`** OR added to circle **Investors**:
- Apply Deal Generator `Website Investor Lead`
- Optional: move/create follow-up task "Send personal note within 24h"
- Optional: on tag `pack:tier1` ensure stage reflects Info Pack Sent (manual or automation)

### 5. Optional drip
Marketing → Drip: "Investor nurture 21-day" for circle Investors / tag investor

### 6. Test
1. Submit https://megalodome-golf.vercel.app/invest/apply
2. Confirm email pack arrives
3. Confirm SuiteDash Lead + tags (`investor`, `score:*`, `pack:tier1`)
4. Confirm Deal appears in Investor Raise / New Inquiry after automation

### Tags the website sets
- `investor`
- `website`
- `source:megalodomegolf.com`
- `score:hot|warm|cold`
- `type:*`
- `pack:tier0|tier1`
- `nda-requested` (when NDA checked)
- `utm:*` when present
