-- ═══════════════════════════════════════════════════════════════════════════
-- TechWithKesava — Supabase Schema
-- Run this file in the Supabase SQL editor (or via `supabase db push`).
--
-- Creates: ai_tools, videos, blogs tables + RLS + storage buckets.
-- Public (anon) users can only SELECT published content.
-- Admin writes go through the service-role key, which bypasses RLS.
-- ═══════════════════════════════════════════════════════════════════════════

-- ───────────────────────────── AI TOOLS ─────────────────────────────
create table if not exists public.ai_tools (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null,
  url         text not null,
  category    text not null default 'General',
  image_url   text,
  tags        text[] not null default '{}',
  featured    boolean not null default false,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ───────────────────────────── VIDEOS ─────────────────────────────
create table if not exists public.videos (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  description       text,
  youtube_url       text not null,
  youtube_video_id  text not null,
  thumbnail_url     text,
  category          text not null default 'General',
  featured          boolean not null default false,
  published         boolean not null default false,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ───────────────────────────── BLOGS ─────────────────────────────
create table if not exists public.blogs (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  content          text not null,
  cover_image_url  text,
  category         text not null default 'General',
  tags             text[] not null default '{}',
  author           text not null default 'Kesava Kantipudi',
  featured         boolean not null default false,
  published        boolean not null default false,
  published_at     timestamptz,
  read_time        text not null default '5 min read',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ───────────────────────────── INDEXES ─────────────────────────────
create index if not exists ai_tools_published_idx on public.ai_tools (published);
create index if not exists ai_tools_featured_idx on public.ai_tools (featured);
create index if not exists videos_published_idx on public.videos (published);
create index if not exists videos_featured_idx on public.videos (featured);
create index if not exists blogs_published_idx on public.blogs (published);
create index if not exists blogs_featured_idx on public.blogs (featured);
create index if not exists blogs_slug_idx on public.blogs (slug);

-- ───────────────────────────── ROW LEVEL SECURITY ─────────────────────────────
alter table public.ai_tools enable row level security;
alter table public.videos enable row level security;
alter table public.blogs enable row level security;

-- Public reads: only published rows. Admin/service-role bypasses RLS.
create policy "Public can read published ai_tools"
  on public.ai_tools for select
  using (published = true);

create policy "Public can read published videos"
  on public.videos for select
  using (published = true);

create policy "Public can read published blogs"
  on public.blogs for select
  using (published = true);

-- ───────────────────────────── STORAGE BUCKETS ─────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('ai-tools', 'ai-tools', true, 5242880, array['image/png','image/jpeg','image/webp','image/svg+xml']),
  ('blogs',    'blogs',    true, 5242880, array['image/png','image/jpeg','image/webp','image/svg+xml']),
  ('videos',   'videos',   true, 5242880, array['image/png','image/jpeg','image/webp','image/svg+xml'])
on conflict (id) do nothing;

-- Storage object access: public buckets are readable by everyone via public URL.
-- Uploads are only performed server-side with the service-role key (bypasses RLS),
-- so no public storage write policies are required.
