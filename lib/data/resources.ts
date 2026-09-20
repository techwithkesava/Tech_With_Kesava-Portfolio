import "server-only";

import { getServerClient } from "@/lib/supabase/server";
import type { ResourceRow, ResourceItemRow, ResourceItemType } from "@/lib/supabase/schema";

export interface PublicResourceItem {
  id: string;
  resourceId: string;
  type: ResourceItemType;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  metadata: Record<string, unknown>;
  sortOrder: number;
}

export interface PublicResource {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  items?: PublicResourceItem[];
}

function toPublicResource(row: ResourceRow): PublicResource {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    thumbnailUrl: row.thumbnail_url,
    category: row.category || "General",
    tags: row.tags ?? [],
    featured: row.featured,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toPublicItem(row: ResourceItemRow): PublicResourceItem {
  return {
    id: row.id,
    resourceId: row.resource_id,
    type: row.type || "custom",
    title: row.title,
    description: row.description,
    url: row.url,
    thumbnailUrl: row.thumbnail_url,
    metadata: row.metadata ?? {},
    sortOrder: row.sort_order ?? 0,
  };
}

export async function getPublishedResources(): Promise<PublicResource[]> {
  const supabase = getServerClient();
  if (!supabase) {
    console.warn("[resources] Supabase client unavailable.");
    return [];
  }

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[resources] Failed to fetch published resources:", error.message);
    return [];
  }

  return (data as ResourceRow[]).map(toPublicResource);
}

export async function getFeaturedResources(limit = 4): Promise<PublicResource[]> {
  const supabase = getServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[resources] Failed to fetch featured resources:", error.message);
    return [];
  }

  return (data as ResourceRow[]).map(toPublicResource);
}

export async function getResourceBySlug(slug: string): Promise<PublicResource | null> {
  const supabase = getServerClient();
  if (!supabase) return null;

  const normalizedSlug = slug.toLowerCase();

  // 1. Try exact primary slug lookup
  let { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("slug", normalizedSlug)
    .eq("published", true)
    .maybeSingle();

  // 2. Fall back to checking aliases array if primary slug matches nothing
  if (!data) {
    const { data: aliasData, error: aliasError } = await supabase
      .from("resources")
      .select("*")
      .contains("aliases", [normalizedSlug])
      .eq("published", true)
      .maybeSingle();

    if (aliasData) {
      data = aliasData;
      error = null;
    } else if (aliasError) {
      error = aliasError;
    }
  }

  if (error || !data) {
    if (error) console.error("[resources] Failed to fetch resource by slug/alias:", error.message);
    return null;
  }

  const resource = toPublicResource(data as ResourceRow);
  const items = await getResourceItems(resource.id);
  resource.items = items;

  return resource;
}

export async function getResourceItems(resourceId: string): Promise<PublicResourceItem[]> {
  const supabase = getServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("resource_items")
    .select("*")
    .eq("resource_id", resourceId)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[resources] Failed to fetch resource items:", error.message);
    return [];
  }

  return (data as ResourceItemRow[]).map(toPublicItem);
}
