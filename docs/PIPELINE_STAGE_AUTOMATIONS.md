# Investor Raise — stage automation playbook

**Pipeline:** Investor Raise (`/crmDealsPipelines/94908`)

## Target stages
1. New Inquiry  
2. Info Pack Sent  
3. Call Booked  
4. Diligence  
5. Soft Circle  
6. Commitment  
7. Won  
8. Lost  

## Recommended automations (configure under each stage → Manage Automations)

| Stage | On enter | Tags / actions |
|---|---|---|
| New Inquiry | Notify Nick | `stage:new-inquiry` `pipeline:investor-raise` |
| Info Pack Sent | — | `stage:info-pack-sent` `pack:tier0` |
| Call Booked | Notify Nick | `stage:call-booked` + checklist investor discovery |
| Diligence | — | `stage:diligence` `nda-requested` if applicable |
| Soft Circle | Notify Nick | `stage:soft-circle` |
| Commitment | Notify Nick + counsel flag | `stage:commitment` |
| Won | Notify Nick | `stage:won` — stop nurture |
| Lost | — | `stage:lost` + reason note |

## Related public URLs
- Book: https://app.megalodomegolf.com/book  
- NDA: https://app.megalodomegolf.com/nda  
- One-pager: https://megalodomegolf.com/docs/investor/one-pager.pdf  

## Deal generator
Website Investor Lead → should land **New Inquiry**.
