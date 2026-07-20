# Megalodome Golf

Modern rebuild of https://megalodomegolf.com

## Paths
- `web/` — Next.js App Router site
- `backup/` — crawl archive of legacy GoDaddy site
- `supabase/` — SQL migrations
- `reports/` — crawl inventories

## Local
```bash
cd web
cp ../.env.local .env.local   # if needed
npm install
npm run dev
```

## Deploy
Vercel project `megalodome-golf`, Root Directory = `web`.
