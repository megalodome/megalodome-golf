# Investor Raise — stage automations (live pass)

**Pipeline:** https://app.megalodomegolf.com/crmDealsPipelines/94908

## Stages confirmed
1. New Inquiry (10%)
2. Info Pack Sent (25%)
3. Call Booked (40%)
4. Diligence (55%)
5. Soft Circle (70%)
6. Commitment (85%)
7. Won (100%)
8. Lost (0%)

## Intended enter-stage behavior
| Stage | Notify Nick | Tags |
|---|---|---|
| New Inquiry | Yes | `stage:new-inquiry`, `pipeline:investor-raise` |
| Info Pack Sent | No | `stage:info-pack-sent`, `pack:tier0` |
| Call Booked | Yes | `stage:call-booked` |
| Diligence | No | `stage:diligence` |
| Soft Circle | Yes | `stage:soft-circle` |
| Commitment | Yes | `stage:commitment` |
| Won | Yes | `stage:won` |
| Lost | No | `stage:lost` |

## How to finish in UI (2 minutes per stage)
1. Open pipeline → **MANAGE STAGES** or stage ⋮ menu  
2. **Manage Automations** / stage settings  
3. On enter stage:
   - Add tag(s) above  
   - Enable staff notification for rows marked Yes  
4. Save  

## Related URLs for auto-emails / templates
- Book: https://app.megalodomegolf.com/book  
- NDA: https://app.megalodomegolf.com/nda  
- One-pager: https://megalodomegolf.com/docs/investor/one-pager.pdf  
- Investor hub: https://megalodomegolf.com/invest  

## Evidence
See `reports/crm_audit/crm_stage_auto_result.json` and screenshots `auto_*.png`, `stage_menu_*.png`.
