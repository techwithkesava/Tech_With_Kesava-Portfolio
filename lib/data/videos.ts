import "server-only";

import { getServerClient } from "@/lib/supabase/server";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";
import type { VideoRow } from "@/lib/supabase/schema";

export interface PublicVideo {
  id: string;
  title: string;
  description: string | null;
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string | null;
  category: string;
  featured: boolean;
  publishedAt: string | null;
}

function toPublic(row: VideoRow): PublicVideo {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    videoId: row.youtube_video_id,
    embedUrl: `https://www.youtube.com/embed/${row.youtube_video_id}`,
    thumbnailUrl: row.thumbnail_url ?? getYouTubeThumbnailUrl(row.youtube_video_id),
    category: row.category || "General",
    featured: row.featured,
    publishedAt: row.published_at,
  };
}

export async function getPublishedVideos(): Promise<PublicVideo[]> {
  const supabase = getServerClient();
  if (!supabase) {
    console.warn(
      "[videos] Supabase not configured (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
    return [];
  }

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[videos] Failed to fetch published videos:", error.message);
    return [];
  }

  return (data as VideoRow[]).map(toPublic);
}
