"use server";

import { getAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin/server-auth";

export type BlogInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
};

export type ActionResult = { success: true } | { success: false; error: string };

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function validateBlog(input: BlogInput): string | null {
  if (!input.title || !input.title.trim()) {
    return "Title is required.";
  }
  if (!input.content || !input.content.trim()) {
    return "Content is required.";
  }
  const slug = input.slug?.trim() || slugify(input.title);
  if (!SLUG_PATTERN.test(slug)) {
    return "Slug may only contain lowercase letters, numbers, and hyphens.";
  }
  return null;
}

function mapRow(r: unknown) {
  return r as { id: string; published: boolean; published_at: string | null };
}

export async function createBlog(input: BlogInput): Promise<ActionResult> {
  await requireAdmin();

  const error = validateBlog(input);
  if (error) return { success: false, error };

  const slug = input.slug?.trim() || slugify(input.title);

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { error: dbError } = await supabase.from("blogs").insert({
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt?.trim() || null,
    content: input.content,
    cover_image_url: input.cover_image_url?.trim() || null,
    category: (input.category || "General").trim() || "General",
    tags: Array.isArray(input.tags)
      ? input.tags.map((t) => t.trim()).filter(Boolean)
      : [],
    author: input.author?.trim() || "Kesava Kantipudi",
    featured: Boolean(input.featured),
    published: Boolean(input.published),
    published_at: Boolean(input.published) ? new Date().toISOString() : null,
  });

  if (dbError) {
    if (dbError.code === "23505") {
      return { success: false, error: "A blog with this slug already exists." };
    }
    console.error("[admin] createBlog failed:", dbError.message);
    return { success: false, error: "Failed to create the blog. Please try again." };
  }

  return { success: true };
}

export async function updateBlog(
  id: string,
  input: BlogInput
): Promise<ActionResult> {
  await requireAdmin();

  const error = validateBlog(input);
  if (error) return { success: false, error };

  const slug = input.slug?.trim() || slugify(input.title);

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { data: existing } = await supabase
    .from("blogs")
    .select("id, published, published_at")
    .eq("id", id)
    .maybeSingle();

  const wasPublished = existing ? mapRow(existing).published : false;
  const shouldStampPublishTime = Boolean(input.published) && !wasPublished;

  const { error: dbError } = await supabase
    .from("blogs")
    .update({
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt?.trim() || null,
      content: input.content,
      cover_image_url: input.cover_image_url?.trim() || null,
      category: (input.category || "General").trim() || "General",
      tags: Array.isArray(input.tags)
        ? input.tags.map((t) => t.trim()).filter(Boolean)
        : [],
      author: input.author?.trim() || "Kesava Kantipudi",
      featured: Boolean(input.featured),
      published: Boolean(input.published),
      ...(shouldStampPublishTime
        ? { published_at: new Date().toISOString() }
        : {}),
    })
    .eq("id", id);

  if (dbError) {
    if (dbError.code === "23505") {
      return { success: false, error: "A blog with this slug already exists." };
    }
    console.error("[admin] updateBlog failed:", dbError.message);
    return { success: false, error: "Failed to update the blog. Please try again." };
  }

  return { success: true };
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { error: dbError } = await supabase.from("blogs").delete().eq("id", id);

  if (dbError) {
    console.error("[admin] deleteBlog failed:", dbError.message);
    return { success: false, error: "Failed to delete the blog. Please try again." };
  }

  return { success: true };
}

export async function toggleBlogPublish(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { error: dbError } = await supabase
    .from("blogs")
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] toggleBlogPublish failed:", dbError.message);
    return { success: false, error: "Failed to update publish state." };
  }

  return { success: true };
}

export async function toggleBlogFeatured(id: string, featured: boolean): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { error: dbError } = await supabase
    .from("blogs")
    .update({ featured })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] toggleBlogFeatured failed:", dbError.message);
    return { success: false, error: "Failed to update featured state." };
  }

  return { success: true };
}
