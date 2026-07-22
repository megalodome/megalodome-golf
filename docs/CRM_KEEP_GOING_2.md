# CRM keep-going #2 — FLOW config + stage automations

## Investor FLOW (`/flw/u/FESEnPWcsCAu9ea`)
Content is stored on each step at **`meta.config`**:
- `label` / `title`
- `content` / `html` (branded HTML + Open button)
- `url`
- `button_text`

Steps intended:
1. Review one-pager → one-pager PDF  
2. Book discovery → `/book`  
3. Request NDA → `/nda`  
4. Investor hub → `/invest`  

## Staff FLOW (`/flw/u/DhPRyKavwsyA8ca`)
1. Complete profile  
2. Investor hub overview  
3. Booking link  
4. Vendor form (trade only)  

## Stage automations
API entry: `Pipeline.openManageActionsModal(stageId)`  
UI CTA: **Configure Automations** (Into this stage / Out of this stage)

Stages ready on Investor Raise (94908):
New Inquiry → Info Pack Sent → Call Booked → Diligence → Soft Circle → Commitment → Won → Lost

### Notify plan
| Stage | Notify |
|---|---|
| New Inquiry | Yes |
| Info Pack Sent | No |
| Call Booked | Yes |
| Diligence | No |
| Soft Circle | Yes |
| Commitment | Yes |
| Won | Yes |
| Lost | No |

If Configure Automations opens SuiteDash’s automation marketplace/builder, complete Add Tag + Notify Staff actions there once per stage (platform UI varies by plan).

## Already live elsewhere
- Forms `/book` `/partners` `/nda`  
- Proposal 87073 Mutual NDA  
- QR codes (book/partners/nda/invest)  
- Email branding copyright + disclaimer  
