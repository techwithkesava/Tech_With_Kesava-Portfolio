import "server-only";

import { getServerClient } from "@/lib/supabase/server";
import type { BlogRow } from "@/lib/supabase/schema";

export interface PublicBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  author: string;
  featured: boolean;
}

function formatMonthYear(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function toPublic(row: BlogRow): PublicBlog {
  const dateSource = row.published_at ?? row.created_at;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    category: row.category || "General",
    date: formatMonthYear(dateSource),
    readTime: row.read_time || "5 min read",
    content: row.content,
    author: row.author || "Kesava Kantipudi",
    featured: row.featured,
  };
}

export async function getPublishedBlogs(): Promise<PublicBlog[]> {
  const supabase = getServerClient();
  if (!supabase) {
    console.warn(
      "[blogs] Supabase not configured (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
    return [];
  }

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[blogs] Failed to fetch published blogs:", error.message);
    return [];
  }

  return (data as BlogRow[]).map(toPublic);
}

export async function getPublishedBlogBySlug(
  slug: string
): Promise<PublicBlog | null> {
  const supabase = getServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;

  return toPublic(data as BlogRow);
}
