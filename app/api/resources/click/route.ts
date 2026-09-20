import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resourceId, resourceItemId } = body;

    if (!resourceId && !resourceItemId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = getServerClient();
    if (supabase) {
      const referrer = req.headers.get("referer") || null;
      const userAgent = req.headers.get("user-agent") || null;

      await supabase.from("resource_clicks").insert({
        resource_id: resourceId || null,
        resource_item_id: resourceItemId || null,
        referrer: referrer ? referrer.substring(0, 500) : null,
        user_agent: userAgent ? userAgent.substring(0, 500) : null,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[resource-click-error]", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
