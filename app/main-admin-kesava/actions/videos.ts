"use server";

import { getAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin/server-auth";
import { extractYouTubeId } from "@/lib/youtube";

export type VideoInput = {
  title: string;
  description: string;
  youtube_url: string;
  thumbnail_url: string;
  category: string;
  featured: boolean;
  published: boolean;
};

export type ActionResult = { success: true } | { success: false; error: string };

function validateVideo(input: VideoInput): string | null {
  if (!input.title || !input.title.trim()) {
    return "Title is required.";
  }
  if (!input.youtube_url || !input.youtube_url.trim()) {
    return "A YouTube URL is required.";
  }
  if (!extractYouTubeId(input.youtube_url)) {
    return "That does not look like a valid YouTube URL.";
  }
  return null;
}

export async function createVideo(input: VideoInput): Promise<ActionResult> {
  await requireAdmin();

  const error = validateVideo(input);
  if (error) return { success: false, error };

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const videoId = extractYouTubeId(input.youtube_url) as string;

  const { error: dbError } = await supabase.from("videos").insert({
    title: input.title.trim(),
    description: input.description?.trim() || null,
    youtube_url: input.youtube_url.trim(),
    youtube_video_id: videoId,
    thumbnail_url: input.thumbnail_url?.trim() || null,
    category: (input.category || "General").trim() || "General",
    featured: Boolean(input.featured),
    published: Boolean(input.published),
    published_at: Boolean(input.published) ? new Date().toISOString() : null,
  });

  if (dbError) {
    console.error("[admin] createVideo failed:", dbError.message);
    return { success: false, error: "Failed to create the video. Please try again." };
  }

  return { success: true };
}

export async function updateVideo(
  id: string,
  input: VideoInput
): Promise<ActionResult> {
  await requireAdmin();

  const error = validateVideo(input);
  if (error) return { success: false, error };

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const videoId = extractYouTubeId(input.youtube_url) as string;

  const { error: dbError } = await supabase
    .from("videos")
    .update({
      title: input.title.trim(),
      description: input.description?.trim() || null,
      youtube_url: input.youtube_url.trim(),
      youtube_video_id: videoId,
      thumbnail_url: input.thumbnail_url?.trim() || null,
      category: (input.category || "General").trim() || "General",
      featured: Boolean(input.featured),
      published: Boolean(input.published),
    })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] updateVideo failed:", dbError.message);
    return { success: false, error: "Failed to update the video. Please try again." };
  }

  return { success: true };
}

export async function deleteVideo(id: string): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not configured. Add the environment variables first.",
    };
  }

  const { error: dbError } = await supabase.from("videos").delete().eq("id", id);

  if (dbError) {
    console.error("[admin] deleteVideo failed:", dbError.message);
    return { success: false, error: "Failed to delete the video. Please try again." };
  }

  return { success: true };
}

export async function toggleVideoPublish(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { error: dbError } = await supabase
    .from("videos")
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] toggleVideoPublish failed:", dbError.message);
    return { success: false, error: "Failed to update publish state." };
  }

  return { success: true };
}

export async function toggleVideoFeatured(id: string, featured: boolean): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getAdminClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const { error: dbError } = await supabase
    .from("videos")
    .update({ featured })
    .eq("id", id);

  if (dbError) {
    console.error("[admin] toggleVideoFeatured failed:", dbError.message);
    return { success: false, error: "Failed to update featured state." };
  }

  return { success: true };
}
