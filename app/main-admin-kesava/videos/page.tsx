import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import type { VideoRow } from "@/lib/supabase/schema";
import VideosManager from "./VideosManager";

export const metadata: Metadata = { title: "Videos" };
export const dynamic = "force-dynamic";

export default async function VideosAdminPage() {
  await requireAdmin();

  const supabase = getAdminClient();
  let items: VideoRow[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      items = data as VideoRow[];
    } else if (error) {
      console.error("[admin] Failed to load videos:", error.message);
    }
  }

  return <VideosManager initialItems={items} />;
}
