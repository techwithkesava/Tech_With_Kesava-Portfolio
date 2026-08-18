import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_ROUTE_PREFIX,
} from "./lib/admin/config";
import { verifySessionToken } from "./lib/admin/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  const isLoginRoute =
    pathname === ADMIN_ROUTE_PREFIX || pathname === `${ADMIN_ROUTE_PREFIX}/`;

  if (isLoginRoute) {
    // Already authenticated → go straight to the dashboard.
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = `${ADMIN_ROUTE_PREFIX}/dashboard`;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Any other /main-admin-kesava/* route requires a valid session.
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_ROUTE_PREFIX;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main-admin-kesava/:path*"],
};
