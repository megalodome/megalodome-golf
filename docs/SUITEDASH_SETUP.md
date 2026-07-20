# SuiteDash setup for MEGALODOME investor funnel

Website code is live. Contacts are created via Secure API as **Lead** with tags:
`investor`, `website`, `source:megalodomegolf.com`.

**Deals cannot be created via API.** Complete the UI steps below so each investor
lead also gets a Deal card in the pipeline.

## 1) Circle
CRM → Circles → **+ Add**
- Name: `Investors`

API already requests `circles.add: ["Investors"]`. If the circle name differs,
rename to match exactly or update `circlesToAdd` in code.

## 2) Investor pipeline
CRM → Deals → Pipelines → **+ Add Pipeline**
- Title: `Investor Raise`
- Currency: USD

### Stages (Manage Stages)
1. New Inquiry
2. Info Pack Sent
3. Call Booked
4. Diligence
5. Soft Circle
6. Commitment
7. Won
8. Lost

## 3) Deal Generator
CRM → Deals → Generators → **+ Add Deal Generator**
- Reference title: `Website Investor Lead`
- Deal title: `Investor — {{Contact First Name}} {{Contact Last Name}}` (use placeholders available in UI)
- Pipeline: `Investor Raise`
- Starting stage: `New Inquiry`
- Expected value: optional
- Followers: raise team staff
- Toggle notify followers on create

## 4) Automation (critical)
Attach the Deal Generator so API website leads open deals:

### Option A — on Kickoff Form (if you also embed a form)
Forms → Kickoff Form automations → Apply Deal Generator `Website Investor Lead`

### Option B — contact automation / generator on tag or circle
Wherever SuiteDash allows automation on contact create / tag add / circle add:
- When tag contains `investor` OR circle `Investors`
- → Apply Deal Generator `Website Investor Lead`

### Option C — Zapier fallback
Zapier: SuiteDash New Contact (filter tag investor) → create deal action if available
or notify Slack + manual deal.

Test after setup:
1. Submit https://megalodome-golf.vercel.app/invest/apply
2. Confirm CRM Lead + tags
3. Confirm Deal appears in Investor Raise / New Inquiry

## 5) Optional Kickoff Form embed
Create Kickoff Form “Investor Inquiry” (Role Lead) for a no-code alternate path.
Embed snippet can be dropped into a future page section if desired.

## 6) Cleanup
Delete test contacts:
- Hermes APITest
- any `+test` emails from verification

## Website endpoints
- `GET /invest` — investor landing
- `GET /invest/apply` — form
- `POST /api/invest` — SuiteDash + Supabase + Resend
- `POST /api/contact` — investor interest also syncs SuiteDash
