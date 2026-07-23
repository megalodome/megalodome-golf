# AnyChat live status

## Widget created
- Workspace: SportsDome / AnyChat (Nick admin)
- Widget name: **MEGALODOME GOLF**
- Domains: megalodomegolf.com + www
- Public widget id env: `NEXT_PUBLIC_ANYCHAT_WIDGET_ID` (set on Vercel)

## Script
`https://api.anychat.one/widget/{WIDGET_ID}/livechat-js`

## Site behavior
- Official AnyChat loads when env is set
- MEGALODOME Assist remains as fallback if env missing

## Vista Social
- Password login hits **Authenticator 2FA** on automation browser
- Need either: disable 2FA temporarily on server login, or enter one code once on debug Chrome
- Publish pack ready in docs/VISTA_PUBLISH_PACK.md

## Also present in AnyChat account
Widgets for Maritime CRE, Century 21 Generation, Nick Badyal (unchanged)
