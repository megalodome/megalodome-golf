# MEGALODOME CRM — FLOWs, Forms, Pipeline Stages (Exec Pass)

**Date:** 2026-07-22  
**Host:** https://app.megalodomegolf.com  
**Login:** nick.badyal@megalodomegolf.com (Hermes env; password not stored in this doc)  
**Scripts:** `scripts/crm_exec_forms_flows*.py`  
**Evidence:** `reports/crm_audit/phase_exec*.png` / `.html` / `phase_exec*_result.json`

---

## Summary

| Area | Result |
|---|---|
| Pipeline stages Commitment / Won / Lost | **Done** (full 8-stage Investor Raise) |
| NDA / Data Room Request public form | **Live** + ContactIntake automation (Nick) |
| Vendor / Developer Intro public form | **Live** + ContactIntake (Nick, Partners) |
| Investor Onboarding FLOW | **Exists** |
| Staff Onboarding FLOW | **Created** (Staff/Team usage) |
| Booking form Nick notify | **Confirmed** |
| Auto-Templates library stubs | **Failed** (ADD modal not usable headless) |
| Custom form field set (check size, accreditation, trade, etc.) | **Partial** — kickoff/general defaults live; custom fields need UI builder polish |

---

## 1) Investor Raise pipeline stages (id `94908`)

**Admin:** https://app.megalodomegolf.com/crmDealsPipelines/94908

| # | Stage | Prob |
|---|---|---|
| 1 | New Inquiry | 10 |
| 2 | Info Pack Sent | 25 |
| 3 | Call Booked | 40 |
| 4 | Diligence | 55 |
| 5 | Soft Circle | 70 |
| 6 | **Commitment** | 85 |
| 7 | **Won** | 100 |
| 8 | **Lost** | 0 |

**How added (automation note):** SuiteDash does **not** create stages via bare `updateStages` PUT of title-only rows. Correct path is pipeline **edit mode** → `Pipeline.addStep('after'|'before', stageId)` (header `add-stage` buttons) → rename `stage.title` / `stage.probability` → `Pipeline.saveStages()`.

**Screenshot:** `reports/crm_audit/phase_exec_final_stages.png`

---

## 2) Public forms

### NDA / Data Room Request

| | |
|---|---|
| **Public URL** | https://app.megalodomegolf.com/frm/yFQpH3JDwZXuLQzL |
| **Admin** | https://app.megalodomegolf.com/frm/u/yFQpH3JDwZXuLQzL |
| **Publish / embed** | https://app.megalodomegolf.com/frm/u/yFQpH3JDwZXuLQzL/publish |
| **Type** | Kickoff (`/frm/c/in`) |
| **Status** | Active / available |

**Automation (ContactIntake — verified after reload):**

- Coordinator: **Nick Badyal** (`4082222`)
- Coordinator email notify: **ON**
- Role: **Prospect**
- Deal generator: **Website Investor Lead** (`1267`) → Investor Raise
- Circles: **Investors** (`822568`), **Website Leads** (`822569`)

**Fields live now:** Kickoff defaults (Primary Email*, First Name*, Last Name*, Company Name + “I'm not representing a Company”).

**Intended extra fields (manual builder polish):** accreditation self-attest checkbox, check size, phone, free-text message. Map/tags recommended in website dual-write: `nda-requested`, `investor`, `stage:diligence`.

### Vendor / Developer Intro

| | |
|---|---|
| **Public URL** | https://app.megalodomegolf.com/frm/2w51j8Ujgg1XaJATK |
| **Admin** | https://app.megalodomegolf.com/frm/u/2w51j8Ujgg1XaJATK |
| **Publish / embed** | https://app.megalodomegolf.com/frm/u/2w51j8Ujgg1XaJATK/publish |
| **Type** | General (`/frm/c/co`) |
| **Status** | Active / available |

**Automation (verified):**

- Chain: FormStore + **EmailNotification** + **ContactIntake**
- Coordinator: **Nick Badyal**
- Coordinator email notify: **ON**
- Role: **Prospect**
- Circles: **Partners** (`822571`)
- Deal generator: none (partner intro, not raise deal)

**Fields live now:** minimal general shell (submit path works).  

**Intended extra fields (manual):** trade category, company, email, phone, IL/Chicago yes, message. Tags: `vendor`, `partner`, `source:intro-form`.

### Existing booking (re-verified)

| | |
|---|---|
| **Public** | https://app.megalodomegolf.com/frm/2rWPC5u8yME2svA8N |
| **Admin** | https://app.megalodomegolf.com/frm/u/2rWPC5u8yME2svA8N |

**ContactIntake:** Nick Badyal · coordinator email **ON** · Prospect · Deal gen Website Investor Lead · circles Investors + Website Leads · chain includes **EmailNotification**.

---

## 3) FLOWs

### Investor Onboarding FLOW

| | |
|---|---|
| **Status** | Exists (pre-existing) |
| **Manage** | https://app.megalodomegolf.com/flw/u/FESEnPWcsCAu9ea |
| **List** | https://app.megalodomegolf.com/flows |

**Intended steps (document / editor):** Welcome → Book call → NDA → Pack → Diligence → Soft circle  

Pair with **Investor Onboarding Checklist** (CRM Targets). Usage is CRM Targets — **not** shown in staff invite FLOW dropdown.

Also present: **Welcome Aboard!** → https://app.megalodomegolf.com/flw/u/D119Ym8czcjw8j3 (default staff-friendly shell).

### Staff Onboarding FLOW

| | |
|---|---|
| **Status** | **Created** this pass |
| **Token** | `DhPRyKavwsyA8ca` |
| **Manage** | https://app.megalodomegolf.com/flw/u/DhPRyKavwsyA8ca |
| **Usage** | **Your Staff/Team** (`usage=2`) |

**Intended steps:** Accept invite → Profile → Brand guide → Investor materials → CRM tags/circles/stages → Booking handoff → Notifications  

**Staff invite binding:** On **Add Staff Member** (`/user/create`), set On-Boarding FLOW = **Staff Onboarding FLOW** (or Welcome Aboard!) + **Staff Onboarding Checklist**. Not automatic.

Create path used: `/flw/c/ob` (On-Boarding FLOW).

---

## 4) Auto-Templates

**Path:** https://app.megalodomegolf.com/automationTemplate/index  

**Attempted stubs (names + descriptions):**

1. Notify Nick new website lead  
2. Investor lead intake  
3. NDA data room request received  
4. Vendor partner intro received  

**Result:** **Failed** under headless Playwright — “ADD AUTO-TEMPLATE” does not open a fillable modal (no `.modal` content; search field collides with `EntityActionTemplate[title]`).  

**Manual:** open ADD AUTO-TEMPLATE in a real browser and create the four stubs; attach chains (email Nick / tag / circle) as needed. Native form ContactIntake already covers the highest-value notify path for booking + NDA + vendor.

---

## 5) What failed / residual manual work

| Item | Status | Action |
|---|---|---|
| Stages Commitment/Won/Lost | **Done** | — |
| NDA form public + Nick automation | **Done** | Optional: add accreditation / check size / phone / message fields in form builder |
| Vendor form public + Nick + Partners | **Done** | Optional: add trade / IL-Chicago / message fields |
| Investor FLOW step editor rich content | Partial | Open `/flw/u/FESEnPWcsCAu9ea` and attach checklist steps if desired |
| Staff FLOW checklist binding | Created FLOW | Select FLOW + Staff checklist on each staff invite |
| Auto-Templates | Failed automation | Create 4 stubs manually in UI |
| Orphan incomplete form shells from early `/frm/c/ko` tries | Tokens `25d9JXt8yqhEitLq6`, `2rUtjDFCKrxPyNQrK` etc. may be inactive | Delete unused drafts under `/forms` if cluttered |
| Website dual-write for NDA/vendor | Out of SuiteDash UI | Wire public URLs into Next.js / footer CTAs + Resend notify as needed |

---

## 6) Key URLs (quick list)

```
Login:     https://app.megalodomegolf.com/site/login
Pipeline:  https://app.megalodomegolf.com/crmDealsPipelines/94908
Deal gen:  https://app.megalodomegolf.com/crmDealGenerator/admin
Forms:     https://app.megalodomegolf.com/forms
FLOWs:     https://app.megalodomegolf.com/flows
Auto-tpl:  https://app.megalodomegolf.com/automationTemplate/index

Booking:   https://app.megalodomegolf.com/frm/2rWPC5u8yME2svA8N
NDA:       https://app.megalodomegolf.com/frm/yFQpH3JDwZXuLQzL
Vendor:    https://app.megalodomegolf.com/frm/2w51j8Ujgg1XaJATK

Investor FLOW: https://app.megalodomegolf.com/flw/u/FESEnPWcsCAu9ea
Staff FLOW:    https://app.megalodomegolf.com/flw/u/DhPRyKavwsyA8ca
Welcome Aboard: https://app.megalodomegolf.com/flw/u/D119Ym8czcjw8j3
```

---

## 7) Circle / deal IDs (reference)

| Name | ID |
|---|---|
| Investors | 822568 |
| Website Leads | 822569 |
| Partners | 822571 |
| Website Investor Lead (deal gen) | 1267 |
| Investor Raise pipeline | 94908 |
| Nick staff id | 4082222 |

---

## 8) Evidence files

- `reports/crm_audit/phase_exec_*.png` — pass 1 inventory  
- `reports/crm_audit/phase_exec2_*.png` — pass 2  
- `reports/crm_audit/phase_exec3_*.png` — kickoff/general create  
- `reports/crm_audit/phase_exec4_*.png` — form activate + staff FLOW rename  
- `reports/crm_audit/phase_exec6_*.png` — vendor intake  
- `reports/crm_audit/phase_exec7_*.png` / `phase_exec_final_stages.png` — stages complete  
- JSON: `phase_exec_result.json`, `phase_exec2_result.json` … `phase_exec7_result.json`, `phase_exec_stages_final.json`
