# SuiteDash CRM — recommended setup (MEGALODOME)

Status as of 2026-07-21:

## Done via API (completed)
- All existing contacts updated with recommended tags:
  - `investor`, `website`, `source:megalodomegolf.com`
  - `pipeline:investor-raise`, `stage:new-inquiry`
  - `fund:equity-fund-i`, `geo:chicago-west`
  - plus score/pack/nda/type where applicable
- Background notes include CRM playbook text
- Circles requested on contacts: **Investors**, **Website Leads**
  (SuiteDash creates/uses circle names if your plan allows; otherwise create them once in UI)
- Internal contact **CRM Setup Guide** created in SuiteDash with full checklist
  (`crm.setup+megalodome@example.com` — delete after setup)
- Website `/api/invest` now always writes the full recommended taxonomy

## Must finish in SuiteDash UI (API cannot create deals)

### 1. Circles
CRM → Circles → create if missing:
- `Investors`
- `Website Leads`
- `Media`
- `Partners`

### 2. Pipeline: `Investor Raise`
Stages (exact order):
1. New Inquiry  
2. Info Pack Sent  
3. Call Booked  
4. Diligence  
5. Soft Circle  
6. Commitment  
7. Won  
8. Lost  

### 3. Deal Generator: `Website Investor Lead`
- Pipeline: Investor Raise  
- Stage: New Inquiry  
- Title: `Investor — {{First Name}} {{Last Name}}`  
- Followers: raise owner  

### 4. Automations
| Trigger | Action |
|---|---|
| Tag `investor` | Apply generator **Website Investor Lead**; ensure circle Investors |
| Tag `pack:tier1` | Move deal → **Info Pack Sent** (or task) |
| Tag `nda-requested` | Task: countersign NDA + open Tier 2 |
| Tag `score:hot` | Instant notify raise owner + task due 24h |
| Tag `score:cold` | Optional 21-day drip |

### 5. Optional drip
Marketing → Drip “Investor nurture 21-day” for circle Investors.

## Website tag contract (live)
```
investor
website
source:megalodomegolf.com
pipeline:investor-raise
stage:new-inquiry
fund:equity-fund-i
geo:chicago-west
score:hot|warm|cold
type:*
pack:tier0|tier1
stage:info-pack-sent          (if tier1)
nda-requested                 (if NDA)
stage:diligence-pending-nda   (if NDA)
utm:*
```

## Test after UI setup
1. Submit https://megalodome-golf.vercel.app/invest/apply  
2. Confirm Lead + tags in SuiteDash  
3. Confirm **Deal** appears in Investor Raise / New Inquiry  
4. Confirm Tier pack email arrives  

## Cleanup test leads
- Hermes APITest  
- Site InvestorTest  
- Pack DeliveryTest  
- CRM Setup Guide (after you finish UI steps)
