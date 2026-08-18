import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import type { AiToolRow } from "@/lib/supabase/schema";
import AiToolsManager from "./AiToolsManager";

export const metadata: Metadata = { title: "AI Tools" };
export const dynamic = "force-dynamic";

export default async function AiToolsAdminPage() {
  await requireAdmin();

  const supabase = getAdminClient();
  let items: AiToolRow[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("ai_tools")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      items = data as AiToolRow[];
    } else if (error) {
      console.error("[admin] Failed to load AI tools:", error.message);
    }
  }

  return <AiToolsManager initialItems={items} />;
}
