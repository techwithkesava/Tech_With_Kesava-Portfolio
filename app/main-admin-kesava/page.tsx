"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, ShieldCheck, User } from "lucide-react";
import { login } from "./actions/auth";
import StatusMessage from "./components/StatusMessage";
import { btnPrimary, inputClass } from "./components/styles";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(null, new FormData(e.currentTarget));

    if (result.success) {
      router.replace("/main-admin-kesava/dashboard");
      router.refresh();
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#0f1017] p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold">Admin Login</h1>
            <p className="mt-1 text-sm text-[#9ca3af]">
              TechWithKesava CMS — authorized access only
            </p>
          </div>

          {error && (
            <div className="mb-5">
              <StatusMessage type="error">{error}</StatusMessage>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="admin"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`${btnPrimary} w-full`}>
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#6b7280]">
          This area is private. You will be redirected if you are not authorized.
        </p>
      </div>
    </div>
  );
}
