import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import type { BlogRow } from "@/lib/supabase/schema";
import BlogsManager from "./BlogsManager";

export const metadata: Metadata = { title: "Blogs" };
export const dynamic = "force-dynamic";

export default async function BlogsAdminPage() {
  await requireAdmin();

  const supabase = getAdminClient();
  let items: BlogRow[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      items = data as BlogRow[];
    } else if (error) {
      console.error("[admin] Failed to load blogs:", error.message);
    }
  }

  return <BlogsManager initialItems={items} />;
}
