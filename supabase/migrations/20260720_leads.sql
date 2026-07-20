-- MEGALODOME GOLF leads table
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source_site text not null,
  source_page text,
  source_form text,
  first_name text,
  last_name text,
  name text,
  email text,
  phone text,
  company text,
  lead_type text,
  message text,
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_site_idx on public.leads (source_site);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

drop policy if exists "No public lead reads" on public.leads;
drop policy if exists "No public lead writes" on public.leads;
create policy "No public lead reads" on public.leads for select to anon using (false);
create policy "No public lead writes" on public.leads for insert to anon with check (false);

grant usage on schema public to service_role;
grant select, insert, update, delete on public.leads to service_role;
