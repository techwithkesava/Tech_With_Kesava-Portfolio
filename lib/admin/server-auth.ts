import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_ROUTE_PREFIX,
} from "@/lib/admin/config";
import { verifySessionToken } from "@/lib/admin/session";

export async function getAdminSession(): Promise<{ username: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<{ username: string }> {
  const session = await getAdminSession();
  if (!session) {
    redirect(ADMIN_ROUTE_PREFIX);
  }
  return session;
}
