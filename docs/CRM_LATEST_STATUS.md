# CRM latest status — keep going

## Wins this pass
1. **Investor FLOW** step content **persists** via `meta.config` (label, url, HTML Open button)
   - one-pager → book → nda → invest
2. **Staff FLOW** same pattern
3. Stage automation **catalog mapped** (Tags, Email Internal(s), Circles, Webhook, …)
4. PLUS control identified: `button.add-link-btn`

## Pipeline stages (live)
New Inquiry → Info Pack Sent → Call Booked → Diligence → Soft Circle → Commitment → Won → Lost

## Stage automations
Platform builder: Configure Automations → PLUS → action type.  
Headless clicks on action cards are flaky (elements in overflow). If verify screenshots still show empty automation lists, finish Add/Remove Tags + Email Internal(s) once per stage in UI (2 min/stage) using:

| Stage | Tags | Email Internal |
|---|---|---|
| New Inquiry | stage:new-inquiry, pipeline:investor-raise | Yes |
| Info Pack Sent | stage:info-pack-sent, pack:tier0 | No |
| Call Booked | stage:call-booked | Yes |
| Diligence | stage:diligence | No |
| Soft Circle | stage:soft-circle | Yes |
| Commitment | stage:commitment | Yes |
| Won | stage:won | Yes |
| Lost | stage:lost | No |

## Already solid
- Forms `/book` `/partners` `/nda`
- Proposal 87073 Mutual NDA
- QR codes book/partners/nda/invest
- Email branding legal chrome
- Marketing drafts (no blast)

## You still
- Seed-send Website Live → Seed Test Nick Only
- Confirm FLOW Open buttons in portal preview
- Attach counsel NDA PDF to proposal
