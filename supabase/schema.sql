-- ============================================================================
-- Portfolio + Dashboard schema
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.
--
-- Note: Writing (blog) content is NOT stored here — it lives as MDX files in
-- content/writing/, edited directly in the codebase. Life/Lab were removed.
-- ============================================================================

-- ── STATUS (single row) ────────────────────────────────────────────────────
create table if not exists public.status (
  id text primary key default 'singleton',
  currently_building text not null default '',
  availability text not null default 'available',
  how_i_work text not null default '',
  location text not null default 'Dhaka',
  timezone text not null default 'Asia/Dhaka',
  updated_at timestamptz not null default now()
);

insert into public.status (id) values ('singleton')
on conflict (id) do nothing;

-- ── ADMIN SETTINGS (single row) — password hash for the /admin panel ───────
-- Until a password is saved here, the panel falls back to the ADMIN_PASSWORD
-- env var (default 257000). Never stores the plain password.
create table if not exists public.admin_settings (
  id text primary key default 'singleton',
  password_hash text,
  updated_at timestamptz not null default now()
);

-- ── MESSAGES — contact form submissions + replies ──────────────────────────
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  message text not null default '',
  status text not null default 'unread', -- unread | read | replied | archived
  reply text,
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

-- ── WRITING — blog posts authored from /admin/writing ──────────────────────
-- Posts added here are merged with the .mdx files in content/writing/.
create table if not exists public.writing (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  tags jsonb not null default '[]'::jsonb,
  cover_image text,
  content text not null default '',
  status text not null default 'draft', -- draft | published
  reading_minutes int not null default 1,
  trending boolean not null default false,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── HERO (single row) — homepage hero copy, stats & tech pills ─────────────
create table if not exists public.hero (
  id text primary key default 'singleton',
  name text not null default '',
  role_title text not null default '',
  badge_text text not null default '',
  heading_lines jsonb not null default '[]'::jsonb,
  description text not null default '',
  tech_pills jsonb not null default '[]'::jsonb,
  stats jsonb not null default '[]'::jsonb,
  profile_image text default '',
  updated_at timestamptz not null default now()
);

alter table public.hero add column if not exists name text not null default '';
alter table public.hero add column if not exists role_title text not null default '';

insert into public.hero (id) values ('singleton')
on conflict (id) do nothing;

-- ── CURRENTLY (single row) — "Now" section cards + ticker ──────────────────
create table if not exists public.currently (
  id text primary key default 'singleton',
  updated_label text not null default '',
  ticker_logs jsonb not null default '[]'::jsonb,
  cards jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.currently (id) values ('singleton')
on conflict (id) do nothing;

-- ── CONTACT (single row) — homepage contact section ────────────────────────
create table if not exists public.contact (
  id text primary key default 'singleton',
  heading text not null default '',
  subheading text not null default '',
  cta_heading text not null default '',
  cta_subheading text not null default '',
  email text not null default '',
  resume_url text default '',
  social_links jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.contact (id) values ('singleton')
on conflict (id) do nothing;

-- ── WORK ────────────────────────────────────────────────────────────────────
create table if not exists public.work (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  timeframe text not null default '',
  duration text default '',
  location text,
  work_mode text,
  color text default '#3b82f6',
  is_current boolean default false,
  context text default '',
  constraint text default '',
  decision text default '',
  tradeoff text default '',
  result text default '',
  highlights jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  link_label text,
  link_href text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── PROJECTS ─────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text default '',
  long_desc text default '',
  contribution text default '',
  tags jsonb not null default '[]'::jsonb,
  category text default 'Web',
  github text,
  live text,
  color text default '#3b82f6',
  cover text default '/images/hero_section.png',
  decision_log jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  stats jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── STACK STATS (derived weekly from GitHub, editable too) ────────────────────
create table if not exists public.stack_stats (
  name text primary key,
  category text default 'Frontend',
  icon text,
  invert boolean default false,
  count int not null default 0,
  percent int not null default 0,
  level text default 'comfortable', -- learning | comfortable | expert
  projects jsonb not null default '[]'::jsonb,
  sparkline jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ── ANALYTICS (lightweight self-hosted counter) ──────────────────────────────
create table if not exists public.analytics (
  section text primary key,
  views bigint not null default 0,
  updated_at timestamptz not null default now()
);

-- Anon-callable increment (SECURITY DEFINER so the table stays locked down).
create or replace function public.increment_view(p_section text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.analytics (section, views)
  values (p_section, 1)
  on conflict (section)
  do update set views = public.analytics.views + 1, updated_at = now();
end;
$$;

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.status enable row level security;
alter table public.admin_settings enable row level security;
alter table public.messages enable row level security;
alter table public.writing enable row level security;
alter table public.hero enable row level security;
alter table public.currently enable row level security;
alter table public.contact enable row level security;
alter table public.work enable row level security;
alter table public.projects enable row level security;
alter table public.stack_stats enable row level security;
alter table public.analytics enable row level security;

-- Public (anon) read: only published content.
drop policy if exists "anon read status" on public.status;
create policy "anon read status" on public.status for select using (true);

drop policy if exists "anon read hero" on public.hero;
create policy "anon read hero" on public.hero for select using (true);

drop policy if exists "anon read currently" on public.currently;
create policy "anon read currently" on public.currently for select using (true);

drop policy if exists "anon read contact" on public.contact;
create policy "anon read contact" on public.contact for select using (true);

drop policy if exists "anon read published work" on public.work;
create policy "anon read published work" on public.work for select using (published = true);

drop policy if exists "anon read published projects" on public.projects;
create policy "anon read published projects" on public.projects for select using (published = true);

drop policy if exists "anon read stack" on public.stack_stats;
create policy "anon read stack" on public.stack_stats for select using (true);

drop policy if exists "anon read published writing" on public.writing;
create policy "anon read published writing" on public.writing for select using (status = 'published');

-- Deliberately NO anon policy on admin_settings or messages: they are only
-- reachable through the service-role key (which bypasses RLS) from the
-- password-protected /admin panel and the contact API route.

-- The admin panel authenticates with its own password session and writes with
-- SUPABASE_SERVICE_ROLE_KEY, so no `authenticated`-role policies are needed.
do $$
declare t text;
begin
  foreach t in array array['status','hero','currently','contact','work','projects','stack_stats','analytics']
  loop
    execute format('drop policy if exists "auth full %1$s" on public.%1$I;', t);
  end loop;
end $$;

grant execute on function public.increment_view(text) to anon, authenticated;

-- ============================================================================
-- Storage bucket for image uploads (public read).
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

-- Uploads/deletes happen with the service-role key from /admin, which bypasses
-- RLS, so only the public read policy is required here.
drop policy if exists "auth upload media" on storage.objects;
drop policy if exists "auth update media" on storage.objects;

drop policy if exists "auth delete media" on storage.objects;
