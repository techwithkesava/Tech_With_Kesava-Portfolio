/**
 * Centralized admin authentication configuration.
 *
 * This is the ONLY place demo credentials are referenced. In a future
 * iteration this can be swapped for Supabase Auth without touching the rest
 * of the admin dashboard — only the functions in lib/admin/session.ts
 * (and the login server action) need to change.
 */

export const ADMIN_AUTH = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

export const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "techwithkesava-dev-session-secret";

export const ADMIN_COOKIE_NAME = "twk_admin_session";

export const ADMIN_ROUTE_PREFIX = "/main-admin-kesava";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
