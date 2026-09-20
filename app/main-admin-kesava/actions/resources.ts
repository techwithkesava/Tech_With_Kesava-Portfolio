"use server";

import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin/server-auth";
import type { ResourceInsert, ResourceUpdate, ResourceItemInsert, ResourceItemUpdate, ResourceItemType } from "@/lib/supabase/schema";

export type ActionResult = { success: true } | { success: false; error: string };

export async function createResource(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const aliasesString = String(formData.get("aliases") || "");
  const aliases = aliasesString ? aliasesString.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean) : [];
  const description = String(formData.get("description") || "").trim() || null;
  const thumbnailUrl = String(formData.get("thumbnail_url") || "").trim() || null;
  const category = String(formData.get("category") || "General").trim();
  const tagsString = String(formData.get("tags") || "");
  const tags = tagsString ? tagsString.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const featured = formData.get("featured") === "true";
  const published = formData.get("published") === "true";

  if (!title || !slug) {
    return { success: false, error: "Title and slug are required." };
  }

  const payload: ResourceInsert = {
    title,
    slug,
    aliases,
    description,
    thumbnail_url: thumbnailUrl,
    category,
    tags,
    featured,
    published,
  };

  const { error } = await supabase.from("resources").insert(payload);
  if (error) {
    console.error("[createResource]", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function updateResource(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const aliasesString = String(formData.get("aliases") || "");
  const aliases = aliasesString ? aliasesString.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean) : [];
  const description = String(formData.get("description") || "").trim() || null;
  const thumbnailUrl = String(formData.get("thumbnail_url") || "").trim() || null;
  const category = String(formData.get("category") || "General").trim();
  const tagsString = String(formData.get("tags") || "");
  const tags = tagsString ? tagsString.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const featured = formData.get("featured") === "true";
  const published = formData.get("published") === "true";

  if (!title || !slug) {
    return { success: false, error: "Title and slug are required." };
  }

  const payload: ResourceUpdate = {
    title,
    slug,
    aliases,
    description,
    thumbnail_url: thumbnailUrl,
    category,
    tags,
    featured,
    published,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("resources").update(payload).eq("id", id);
  if (error) {
    console.error("[updateResource]", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/resources");
  revalidatePath(`/resources/${slug}`);
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function deleteResource(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) {
    console.error("[deleteResource]", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function toggleResourcePublish(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const { error } = await supabase
    .from("resources")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function toggleResourceFeatured(id: string, featured: boolean): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const { error } = await supabase
    .from("resources")
    .update({ featured, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function createResourceItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const resourceId = String(formData.get("resource_id") || "").trim();
  const type = String(formData.get("type") || "custom") as ResourceItemType;
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const url = String(formData.get("url") || "").trim();
  const thumbnailUrl = String(formData.get("thumbnail_url") || "").trim() || null;
  const sortOrder = parseInt(String(formData.get("sort_order") || "0"), 10);
  const published = formData.get("published") === "true";

  if (!resourceId || !title || !url) {
    return { success: false, error: "Resource ID, title, and URL are required." };
  }

  const payload: ResourceItemInsert = {
    resource_id: resourceId,
    type,
    title,
    description,
    url,
    thumbnail_url: thumbnailUrl,
    sort_order: isNaN(sortOrder) ? 0 : sortOrder,
    published,
  };

  const { error } = await supabase.from("resource_items").insert(payload);
  if (error) {
    console.error("[createResourceItem]", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function updateResourceItem(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const type = String(formData.get("type") || "custom") as ResourceItemType;
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const url = String(formData.get("url") || "").trim();
  const thumbnailUrl = String(formData.get("thumbnail_url") || "").trim() || null;
  const sortOrder = parseInt(String(formData.get("sort_order") || "0"), 10);
  const published = formData.get("published") === "true";

  if (!title || !url) {
    return { success: false, error: "Title and URL are required." };
  }

  const payload: ResourceItemUpdate = {
    type,
    title,
    description,
    url,
    thumbnail_url: thumbnailUrl,
    sort_order: isNaN(sortOrder) ? 0 : sortOrder,
    published,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("resource_items").update(payload).eq("id", id);
  if (error) {
    console.error("[updateResourceItem]", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}

export async function deleteResourceItem(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return { success: false, error: "Supabase admin client unconfigured." };

  const { error } = await supabase.from("resource_items").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/resources");
  revalidatePath("/main-admin-kesava/resources");
  return { success: true };
}
