# CRM continue execution — latest

**When:** 2026-07-22 (continued)  
**CRM:** https://app.megalodomegolf.com

## Completed this continue pass

### Forms / branding
| Item | Status |
|---|---|
| NDA gold/black + header | ✅ https://app.megalodomegolf.com/nda |
| Vendor form | ✅ https://app.megalodomegolf.com/partners |
| Booking brand header + darker calendar chrome | ⚠️ Partial — Book-Me widget still uses white inputs on details step |
| Site wires `/book` `/partners` `/nda` | ✅ Live on megalodomegolf.com |
| Email copyright + Wheaton disclaimer | ✅ Email Branding |
| Marketing shell + 46634 → /partners | ✅ Draft only |
| Shared shell doc | ✅ `docs/EMAIL_HTML_SHELL.md` |
| QR short-link pack | ✅ `docs/QR_AND_SHORT_LINKS.md` |
| Portal welcome bodies | ✅ 6 pages pushed (confirm Save in UI if empty) |

### FLOWs
| FLOW | Token | Steps pushed |
|---|---|---|
| **Investor Onboarding FLOW** | `FESEnPWcsCAu9ea` | 4 Text steps: one-pager → book → nda → invest (titles/content set; **verify in UI** that Title field shows “Investor Onboarding FLOW” not a step name) |
| **Staff Onboarding FLOW** | `DhPRyKavwsyA8ca` | 4 steps: profile → invest hub → book → partners |
| **Welcome Aboard!** | `D119Ym8czcjw8j3` | Left intact (Read & eSign + Form) |

Open:  
https://app.megalodomegolf.com/flw/u/FESEnPWcsCAu9ea  
https://app.megalodomegolf.com/flw/u/DhPRyKavwsyA8ca  

If FLOW **Title \*** was overwritten by a step label, set it back to the names above and sticky-save once.

### Still human / limited
| Item | Why |
|---|---|
| **Seed-send Website Live** | Never auto-blast — Send wizard → **Seed Test Nick Only** |
| **Office Mutual NDA proposal** | Office UI defaults to invoices; create under **Office → Proposals** manually using counsel copy |
| **QR codes in CRM UI** | Admin reachable; create 4 QRs from `docs/QR_AND_SHORT_LINKS.md` |
| **Booking white inputs** | Platform Book-Me calendar/details controls partially locked |
| **Investor campaign 46633** | Hold for Timothy Lange / counsel |
| **Stage automations** | Configure on Investor Raise board in UI |

## Canonical public CRM URLs
- https://app.megalodomegolf.com/book  
- https://app.megalodomegolf.com/partners  
- https://app.megalodomegolf.com/nda  

## Your checklist (15 min)
1. Hard-refresh `/nda`, `/partners`, `/book`  
2. FLOW Investor + Staff — fix Title if needed; click each step “Open” link  
3. Portals — open 6 pages, Save if body blank  
4. Office → Proposals → add **Mutual NDA — MEGALODOME GOLF**  
5. QR Codes → 4 destinations from short-link doc  
6. Marketing → seed-send Website Live to yourself only  

## Evidence
- `reports/crm_audit/flow_ok_*.png`  
- `reports/crm_audit/flow_investor_configured.png`  
- `reports/crm_audit/cont_final_*.png`  
- `reports/crm_audit/flow_titles_restored.json`  
