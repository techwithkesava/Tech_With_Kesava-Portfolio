"use server";

import { cookies } from "next/headers";
import {
  ADMIN_AUTH,
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin/config";
import {
  createSessionToken,
  hashPassword,
  safeEqual,
} from "@/lib/admin/session";

export type LoginResult = { success: true } | { success: false; error: string };

export async function login(
  _prevState: unknown,
  formData: FormData
): Promise<LoginResult> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!username || !password) {
    return { success: false, error: "Please enter both username and password." };
  }

  const [inputUserHash, expectedUserHash, inputPassHash, expectedPassHash] =
    await Promise.all([
      hashPassword(username),
      hashPassword(ADMIN_AUTH.username),
      hashPassword(password),
      hashPassword(ADMIN_AUTH.password),
    ]);

  if (
    !safeEqual(inputUserHash, expectedUserHash) ||
    !safeEqual(inputPassHash, expectedPassHash)
  ) {
    return { success: false, error: "Invalid username or password." };
  }

  const token = await createSessionToken(ADMIN_AUTH.username);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return { success: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
