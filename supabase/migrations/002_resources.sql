-- ═══════════════════════════════════════════════════════════════════════════
-- TechWithKesava — Supabase Resources Schema
-- ═══════════════════════════════════════════════════════════════════════════

-- ───────────────────────────── RESOURCES ─────────────────────────────
create table if not exists public.resources (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  aliases       text[] not null default '{}',
  title         text not null,
  description   text,
  thumbnail_url text,
  category      text not null default 'General',
  tags          text[] not null default '{}',
  featured      boolean not null default false,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ───────────────────────────── RESOURCE ITEMS ─────────────────────────────
create table if not exists public.resource_items (
  id            uuid primary key default gen_random_uuid(),
  resource_id   uuid not null references public.resources(id) on delete cascade,
  type          text not null default 'custom', -- github, document, video, image, website, download, article, course, tool, social, custom
  title         text not null,
  description   text,
  url           text not null,
  thumbnail_url text,
  metadata      jsonb default '{}'::jsonb,
  sort_order    integer not null default 0,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ───────────────────────────── RESOURCE CLICKS ─────────────────────────────
create table if not exists public.resource_clicks (
  id               uuid primary key default gen_random_uuid(),
  resource_id      uuid references public.resources(id) on delete set null,
  resource_item_id uuid references public.resource_items(id) on delete set null,
  clicked_at       timestamptz not null default now(),
  referrer         text,
  user_agent       text
);

-- ───────────────────────────── INDEXES ─────────────────────────────
create index if not exists resources_slug_idx on public.resources (slug);
create index if not exists resources_published_idx on public.resources (published);
create index if not exists resources_featured_idx on public.resources (featured);
create index if not exists resource_items_resource_id_idx on public.resource_items (resource_id);
create index if not exists resource_items_sort_order_idx on public.resource_items (sort_order);
create index if not exists resource_clicks_resource_id_idx on public.resource_clicks (resource_id);
create index if not exists resource_clicks_item_id_idx on public.resource_clicks (resource_item_id);

-- ───────────────────────────── ROW LEVEL SECURITY ─────────────────────────────
alter table public.resources enable row level security;
alter table public.resource_items enable row level security;
alter table public.resource_clicks enable row level security;

-- Public can read published resources and items
create policy "Public can read published resources"
  on public.resources for select
  using (published = true);

create policy "Public can read published resource items"
  on public.resource_items for select
  using (published = true);

-- Public can insert click records
create policy "Public can insert resource clicks"
  on public.resource_clicks for insert
  with check (true);

-- ───────────────────────────── STORAGE BUCKET ─────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('resources', 'resources', true, 10485760, array['image/png','image/jpeg','image/webp','image/svg+xml','application/pdf'])
on conflict (id) do nothing;
