import "server-only";

import { getServerClient } from "@/lib/supabase/server";
import type { AiToolRow } from "@/lib/supabase/schema";

export interface PublicAiTool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  imageUrl: string | null;
  tags: string[];
  featured: boolean;
}

function toPublic(row: AiToolRow): PublicAiTool {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    url: row.url,
    category: row.category || "General",
    imageUrl: row.image_url,
    tags: row.tags ?? [],
    featured: row.featured,
  };
}

export async function getPublishedAiTools(): Promise<PublicAiTool[]> {
  const supabase = getServerClient();
  if (!supabase) {
    console.warn(
      "[ai-tools] Supabase not configured (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
    return [];
  }

  const { data, error } = await supabase
    .from("ai_tools")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[ai-tools] Failed to fetch published tools:", error.message);
    return [];
  }

  return (data as AiToolRow[]).map(toPublic);
}
