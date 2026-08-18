"use server";

import { getAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin/server-auth";

export type AiToolInput = {
  name: string;
  description: string;
  url: string;
  category: string;
  image_url: string;
  tags: string[];
  featured: boolean;
  published: boolean;
};

export type ActionResult = { success: true } | { success: false; error: string };

function validateAiTool(input: AiToolInput): string | null {
  if (!input.name || !input.name.trim()) {
    return "Name is required.";
  }
  if (!input.description || !input.description.trim()) {
    return "Description is required.";
  }
  try {
    const url = new URL(input.url);
    if (!/^https?:$/.test(url.protocol)) throw new Error();
  } catch {
    return "Please enter a valid URL (http:// or https://).";
  }
  return null;
}

function normalizeInput(input: AiToolInput) {
  return {
    name: input.name.trim(),
    description: input.description.trim(),
    url: input.url.trim(),
    category: (input.category || "General").trim() || "General",
    image_url: input.image_url?.trim() || null,
    tags: Array.isArray(input.tags)
      ? input.tags.map((t) => t.trim()).filter(Boolean)
      : [],
    featured: Boolean(input.featured),
    published: Boolean(input.published),
  };
}

export async function createAiTool(input: AiToolInput): Promise<ActionResult> {
  await requireAdmin();

  const error = validateAiTool(input);
  if (error) return { success: false, error };

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { error: dbError } = await supabase.from("ai_tools").insert(normalizeInput(input));

  if (dbError) {
    console.error("[admin] createAiTool failed:", dbError.message);
    return { success: false, error: "Failed to create the AI tool. Please try again." };
  }

  return { success: true };
}

export async function updateAiTool(
  id: string,
  input: AiToolInput
): Promise<ActionResult> {
  await requireAdmin();

  const error = validateAiTool(input);
  if (error) return { success: false, error };

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { error: dbError } = await supabase
    .from("ai_tools")
    .update(normalizeInput(input))
    .eq("id", id);

  if (dbError) {
    console.error("[admin] updateAiTool failed:", dbError.message);
    return { success: false, error: "Failed to update the AI tool. Please try again." };
  }

  return { success: true };
}

export async function deleteAiTool(id: string): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { error: dbError } = await supabase.from("ai_tools").delete().eq("id", id);

  if (dbError) {
    console.error("[admin] deleteAiTool failed:", dbError.message);
    return { success: false, error: "Failed to delete the AI tool. Please try again." };
  }

  return { success: true };
}

export async function toggleAiToolPublish(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { error: dbError } = await supabase
    .from("ai_tools")
    .update({ published })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] toggleAiToolPublish failed:", dbError.message);
    return { success: false, error: "Failed to update publish state." };
  }

  return { success: true };
}

export async function toggleAiToolFeatured(id: string, featured: boolean): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { error: dbError } = await supabase
    .from("ai_tools")
    .update({ featured })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] toggleAiToolFeatured failed:", dbError.message);
    return { success: false, error: "Failed to update featured state." };
  }

  return { success: true };
}
