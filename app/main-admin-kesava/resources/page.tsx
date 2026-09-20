import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import type { ResourceRow, ResourceItemRow } from "@/lib/supabase/schema";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = { title: "Manage Resources | Admin" };
export const dynamic = "force-dynamic";

type AdminResourceItem = ResourceItemRow & { clicks?: number };
type AdminResourceWithItems = ResourceRow & {
  items: AdminResourceItem[];
  totalClicks: number;
};

export default async function AdminResourcesPage() {
  await requireAdmin();

  const supabase = getAdminClient();
  let resources: AdminResourceWithItems[] = [];

  if (supabase) {
    const { data: resData } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (resData) {
      const { data: itemData } = await supabase.from("resource_items").select("*");
      const { data: clickData } = await supabase.from("resource_clicks").select("*");

      const allItems = (itemData as ResourceItemRow[]) || [];
      const allClicks = (clickData as { resource_id: string | null; resource_item_id: string | null }[]) || [];

      resources = (resData as ResourceRow[]).map((r) => {
        const rItems = allItems.filter((i) => i.resource_id === r.id);
        const rClicks = allClicks.filter((c) => c.resource_id === r.id);

        return {
          ...r,
          items: rItems.map((item) => {
            const itemClicks = allClicks.filter((c) => c.resource_item_id === item.id).length;
            return { ...item, clicks: itemClicks };
          }),
          totalClicks: rClicks.length,
        };
      });
    }
  }

  return <ResourcesClient resources={resources} />;
}
