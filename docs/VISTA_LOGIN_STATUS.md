# Vista Social — login status & manual setup checklist

**Account:** stored in Hermes env only (`MEGALODOME_VISTA_SOCIAL_EMAIL` / `MEGALODOME_VISTA_SOCIAL_PASSWORD`) — **not in git**.

## Automated login result (2026-07-23)

| Step | Result |
|---|---|
| Login page | https://vistasocial.com/login |
| Email/password fill | OK (React form) |
| `POST /api/login` | **Blocked:** `Unable to verify that you are a human` (reCAPTCHA / bot protection) |
| Headless dashboard access | **Not possible** without solving CAPTCHA |

So the credentials path is correct enough to hit Vista’s real login API, but **automation cannot complete login** from this server without interactive human verification (and possibly Google SSO).

## What you should do in the browser (15–25 min)

1. Open https://vistasocial.com/login  
2. Sign in as Nick (password login or **Google** if that’s how the account was created).  
3. If password fails, use **Forgot password** or **Sign in with Google** for `badyal.nick@gmail.com`.

### A) Connect profiles
Settings / Channels → connect:
- Instagram  
- Facebook Page  
- LinkedIn Company  
- TikTok / YouTube optional  

### B) Brand kit
Media library → upload logo + dome images; note colors `#EEDCA7` / `#0A0A0A`.

### C) MCP (highest leverage with Hermes/Claude)
Integrations → **MCP** → generate connection for Claude Desktop / Cursor.  
Test: “Draft 5 raise-safe IG captions linking to megalodomegolf.com/invest”.

### D) First posts (raise-safe)
Use calendar from `docs/VISTA_CONTENT_AND_MCP.md`.  
UTMs on all links. No securities offering language.

### E) API (optional later)
If you need REST CRM sync: Settings → API → confirm plan includes API (current key previously returned *subscription does not offer API access*).

## If password doesn’t work
- Try **Sign in with Google** for the same Gmail.  
- Or reset password.  
- Then tell me “logged in” and I can continue guided setup (or you paste screenshots of Channels + MCP screens).

## Security
You posted a live password in chat. Consider rotating after setup if this thread is shared. Credentials are only in local Hermes `.env`.

## Related docs
- `docs/VISTA_CONTENT_AND_MCP.md` — calendar + MCP  
- `docs/VISTA_ANYCHAT_INTEGRATION_RESEARCH.md` — platform fit  
- Site chat already live: MEGALODOME Assist on megalodomegolf.com  
