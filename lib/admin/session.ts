/**
 * Admin session management — pure Web Crypto implementation so it runs in
 * both the Edge runtime (middleware) and the Node.js runtime (server actions).
 *
 * A session is a signed token: `base64url(payload).base64url(hmac)` where the
 * HMAC is computed with ADMIN_SESSION_SECRET. This keeps route protection
 * server-side and future-proof: swapping in Supabase Auth later only requires
 * changing this module and the login/logout actions.
 */
import {
  ADMIN_SESSION_SECRET,
  SESSION_MAX_AGE_SECONDS,
} from "./config";

const encoder = new TextEncoder();

function toBase64Url(value: string): string {
  return btoa(unescape(encodeURIComponent(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const base64 = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  return decodeURIComponent(escape(atob(base64)));
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return arrayBufferToBase64Url(signature);
}

export async function hashPassword(password: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  return arrayBufferToBase64Url(digest);
}

export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function createSessionToken(username: string): Promise<string> {
  return (async () => {
    const payload = {
      sub: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
    };
    const encoded = toBase64Url(JSON.stringify(payload));
    const signature = await sign(encoded, ADMIN_SESSION_SECRET);
    return `${encoded}.${signature}`;
  })();
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ username: string } | null> {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;

  const expected = await sign(encoded, ADMIN_SESSION_SECRET);
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encoded)) as {
      sub?: string;
      exp?: number;
    };
    if (!payload.sub || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { username: payload.sub };
  } catch {
    return null;
  }
}
