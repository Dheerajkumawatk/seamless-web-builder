create table if not exists public.vikas_mitra_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  district text not null,
  tehsil text not null,
  village text not null,
  occupation text,
  experience text,
  message text,
  photo text,
  pan_card text,
  aadhaar_card text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_message text,
  created_at timestamptz not null default now()
);

-- Backfill for existing installs
alter table public.vikas_mitra_profiles add column if not exists pan_card text;
alter table public.vikas_mitra_profiles add column if not exists aadhaar_card text;

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  post text not null,
  source text,
  state text,
  city text,
  message text,
  created_at timestamptz not null default now()
);

-- Backfill for existing installs
alter table public.contact_leads add column if not exists city text;
alter table public.contact_leads add column if not exists source text;

create table if not exists public.plan_queries (
  id uuid primary key default gen_random_uuid(),
  package_name text not null,
  name text not null,
  phone text not null,
  email text not null,
  city text not null,
  state text not null,
  pincode text not null,
  created_at timestamptz not null default now()
);

alter table public.vikas_mitra_profiles enable row level security;
alter table public.contact_leads enable row level security;
alter table public.plan_queries enable row level security;

drop policy if exists "public can submit vikas mitra" on public.vikas_mitra_profiles;
drop policy if exists "public can read approved vikas mitra" on public.vikas_mitra_profiles;
drop policy if exists "public can submit contact leads" on public.contact_leads;
drop policy if exists "public can submit plan queries" on public.plan_queries;
drop policy if exists "publishable admin read all vikas" on public.vikas_mitra_profiles;
drop policy if exists "publishable admin update vikas" on public.vikas_mitra_profiles;
drop policy if exists "publishable admin read contact leads" on public.contact_leads;
drop policy if exists "publishable admin update contact leads" on public.contact_leads;
drop policy if exists "publishable admin read plan queries" on public.plan_queries;
drop policy if exists "publishable admin update plan queries" on public.plan_queries;

create policy "public can submit vikas mitra"
on public.vikas_mitra_profiles for insert
to anon, authenticated
with check (true);

create policy "public can read approved vikas mitra"
on public.vikas_mitra_profiles for select
to anon, authenticated
using (status = 'approved');

create policy "public can submit contact leads"
on public.contact_leads for insert
to anon, authenticated
with check (true);

create policy "public can submit plan queries"
on public.plan_queries for insert
to anon, authenticated
with check (true);

-- If you do not add SUPABASE_SERVICE_ROLE_KEY to the app environment,
-- uncomment these three admin policies so the hardcoded admin page can read/update data
-- through the publishable key. Service role is safer because it bypasses RLS only on server.
-- create policy "publishable admin read all vikas"
-- on public.vikas_mitra_profiles for select to anon, authenticated using (true);
-- create policy "publishable admin update vikas"
-- on public.vikas_mitra_profiles for update to anon, authenticated using (true) with check (true);
-- create policy "publishable admin read contact leads"
-- on public.contact_leads for select to anon, authenticated using (true);
-- create policy "publishable admin update contact leads"
-- on public.contact_leads for update to anon, authenticated using (true) with check (true);
-- create policy "publishable admin read plan queries"
-- on public.plan_queries for select to anon, authenticated using (true);
-- create policy "publishable admin update plan queries"
-- on public.plan_queries for update to anon, authenticated using (true) with check (true);
