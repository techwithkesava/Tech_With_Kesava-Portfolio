import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { verifySessionToken } from "@/lib/admin/session";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/config";

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication session cookie
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "resources";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabase = getAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase service-role client is missing or unconfigured." },
        { status: 500 }
      );
    }

    // Sanitize filename and create unique path
    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("[upload-error]", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error("[api-upload-catch]", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
