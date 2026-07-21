# MEGALODOME — SuiteDash / ONE portals, onboarding & CRM setup

**Workspace:** https://app.onecommercial.ca  
**Date:** 2026-07-21  
**Public site:** https://megalodome-golf.vercel.app  

---

## Research summary — what SuiteDash needs

| Capability | ONE path | Role |
|---|---|---|
| **Staff login** | `/site/login` → admin dashboard | Staff users (`/user/admin`) |
| **Investor/portal login** | Same `/site/login` after CRM target invite | Prospects/Clients with portal access |
| **Portal Pages** | Content → Portal Pages (`/portal/dashboard/admin`) | Logged-in targets and/or staff |
| **Public Pages** | Content → Public Pages | Optional; marketing already on Next.js |
| **Onboarding FLOWs** | Onboarding → FLOWs (`/flows`) | Guided multi-step for staff or CRM targets |
| **Checklists** | Onboarding → Checklists (`/checklist`) | Task lists assigned to staff or targets |
| **Circles** | CRM → Circles (`/circle/manage`) | Segment contacts for pages/automations |
| **Deal pipelines** | CRM → Deals → Pipelines | Investor Raise stages |
| **Deal generators** | CRM → Deals → Generators | Auto-create deals from forms/tags |
| **Booking** | Calendar → Generators + Forms booking | Investor Discovery 20-min (done) |
| **Custom login URL** | Settings → Custom URL & Login | `app.onecommercial.ca` already set |

### Public pages — do we need them?
**Mostly no for marketing.** The Next.js site is the public front door.  
Use SuiteDash Public Pages only for:
- Custom login branding (optional)
- 404 / permissions error pages (already present)
- Rare standalone landing pages not on the website

**Recommendation:** keep Public Pages minimal; put Login CTA on the website that routes Staff vs Investors.

---

## Done in ONE (this session)

### Booking (prior + confirmed)
- Appointment generator: **Investor Discovery — 20 min** (Active)
- Booking form: https://app.onecommercial.ca/frm/2rWPC5u8yME2svA8N

### Portal pages created (draft shells — need body publish polish)
| Page | ID | Audience intent |
|---|---|---|
| Investor Home | 171465 | Investors / CRM targets |
| Investor Data Room | 171466 | Investors |
| Investor Next Steps | 171467 | Investors |
| Staff HQ | 171468 | Staff |
| Staff Playbooks | 171469 | Staff |
| Raise Desk | 171470 | Staff |

Admin: https://app.onecommercial.ca/portal/dashboard/admin  

> **Blocker:** SuiteDash requires **Page Content** via its block/editor (`PortalPage[body]` / editorType). Automation set model fields but the visual editor still flags “Page Content is required”. Open each page → paste content → Save (content drafts prepared in `reports/suitedash_ui` scripts / below).

### Pipeline (pending UI item — DONE)
- **Investor Raise** pipeline created: https://app.onecommercial.ca/crmDealsPipelines/94908  
- Default stages present: Qualified → Contact Made → Demo Scheduled → Proposal Made → Negotiations Started  
- **Rename stages** (manual 2 min) to raise taxonomy:
  1. New Inquiry  
  2. Info Pack Sent  
  3. Call Booked  
  4. Diligence  
  5. Soft Circle  
  6. Commitment  
  7. Won  
  8. Lost  

### Onboarding FLOW shells
Manage URLs created (open, title, attach checklist steps in UI):
- Investor: https://app.onecommercial.ca/flw/t/DkCywS367jeHpxH  
- Staff: https://app.onecommercial.ca/flw/t/ESt76HptnNiPWdQ  
- Existing: Welcome Aboard!, Untitled FLOW  

### Checklist shells
- https://app.onecommercial.ca/cl/u/R76aUuaCy11Ba3H (Investor)  
- https://app.onecommercial.ca/cl/u/RMbFH4R4U7oJYiC (Staff)  
> List view may not show until title/items fully saved via UI — open URLs above and click Save.

### Circles — partial
- Existing: COMMERCIAL, RESIDENTIAL  
- Create still blocked in automation (color-picker widget / modal JSON error)  
- **Create manually (1 min each):** Investors, Website Leads, Media, Partners, Staff Team  
  Path: CRM → Circles → ADD CIRCLE → name + color → Add  

### Deal generator — not yet saved
- UI path works: https://app.onecommercial.ca/crmDealGenerator/admin → ADD DEAL GENERATOR  
- Create **Website Investor Lead**:
  - Reference Title: `Website Investor Lead`
  - Deal Title: `Investor — {first_name} {last_name}` (or static `Website Investor Lead`)
  - Category: pick/create **Investor Raise**
  - Based-On Date: Based On Generation Day  
  - Expected Value: e.g. `25000` CAD (placeholder unit)  
  - Pipeline: **Investor Raise**  
  - Stage: **New Inquiry** (after rename) or first stage  
  - Save  

### Automations (still recommended)
1. Tag `investor` OR booking form submit → add circle Investors + deal generator Website Investor Lead  
2. Hot score → Follow-Up generator / email Nick  
3. FLOW assign on portal invite / role → Prospect  

---

## Content paste pack (portal pages)

### Investor Home
Welcome, Investor — hub for materials, booking, checklist.  
Links: website `/invest`, booking form, inquiry form.

### Investor Data Room
Points to website data room tiers + one-pager + flyer. Tier 2 after NDA.

### Investor Next Steps
1. Accredited interest 2. Inquiry 3. Book call 4. NDA 5. Diligence  

### Staff HQ / Playbooks / Raise Desk
Internal CRM ops, brand rules, daily raise checklist.

---

## Website updates (this session)
- `/login` chooser: Staff vs Investor  
- Header **Login** button + mobile  
- Footer Login  
- Sitemap  

Live: https://megalodome-golf.vercel.app/login  

Staff login URL: https://app.onecommercial.ca/site/login  
Investor login URL: https://app.onecommercial.ca/site/login  
(After invite, same gate; portal pages differ by assignment.)

---

## Checklists

### A. Investor journey checklist
- [ ] Inquiry form submitted (website)
- [ ] Contact tagged `investor` + circle Investors
- [ ] Tier 0 pack emailed
- [ ] Discovery call booked
- [ ] NDA sent / signed
- [ ] Tier 1 pack sent
- [ ] Deal stage advanced
- [ ] Portal invite issued (optional)
- [ ] Diligence / Tier 2

### B. Staff onboarding checklist
- [ ] Staff user invited (`/user/admin`)
- [ ] Password + profile photo
- [ ] Role assigned (Admin / Teammate / etc.)
- [ ] Staff portal pages visible
- [ ] FLOW + checklist assigned
- [ ] Trained on tags/circles/pipeline/booking
- [ ] Notification prefs confirmed

### C. ONE admin finish checklist (remaining UI)
- [ ] Create circles: Investors, Website Leads, Media, Partners
- [ ] Paste content on 6 portal pages + Save
- [ ] Assign Investor pages → Investors circle / all Prospects
- [ ] Assign Staff pages → all Staff
- [ ] Rename Investor Raise stages
- [ ] Create Website Investor Lead deal generator
- [ ] Save Investor + Staff checklists with steps
- [ ] Attach checklists to FLOWs; assign FLOW on invite
- [ ] Optional: form automation booking → Call Booked stage
- [ ] Delete old test contacts if desired

---

## Architecture decision

```
Public web (Next.js)
  ├─ Marketing pages
  ├─ /invest + apply + booking CTA
  └─ /login  → chooser
         ├─ Staff → app.onecommercial.ca/site/login → Staff dashboard + Staff portal pages
         └─ Investor → app.onecommercial.ca/site/login → Investor portal pages (after invite)

ONE / SuiteDash
  ├─ CRM + Investor Raise pipeline
  ├─ Booking form
  ├─ Portal pages (staff / investor)
  ├─ FLOWs + Checklists
  └─ Optional Public Pages (login chrome only)
```

---

## Credentials
Staff admin login stored in Hermes env (`MEGALODOME_SUITEDASH_EMAIL` / password). Do not commit secrets.
