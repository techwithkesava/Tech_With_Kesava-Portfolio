"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Video,
  FileText,
  FolderKanban,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { logout } from "./actions/auth";

const nav = [
  { href: "/main-admin-kesava/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/main-admin-kesava/resources", label: "Resources", icon: FolderKanban },
  { href: "/main-admin-kesava/ai-tools", label: "AI Tools", icon: Wrench },
  { href: "/main-admin-kesava/videos", label: "Videos", icon: Video },
  { href: "/main-admin-kesava/blogs", label: "Blogs", icon: FileText },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/main-admin-kesava");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/10 bg-[#0a0b10] md:flex">
          <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">TechWithKesava</p>
              <p className="text-[11px] uppercase tracking-wider text-blue-400">Admin</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-white/[0.06] text-white"
                    : "text-[#9ca3af] hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-1 border-t border-white/10 p-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#9ca3af] transition-colors hover:bg-white/[0.03] hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> View Website
            </a>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile header */}
        <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0a0b10] px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold">Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-rose-400"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>

        {/* Mobile nav */}
        <div className="fixed inset-x-0 top-[57px] z-30 flex gap-1 overflow-x-auto border-b border-white/10 bg-[#0a0b10] px-3 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-white/[0.08] text-white"
                  : "text-[#9ca3af]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 px-4 pb-10 pt-[104px] md:pl-60 md:pt-8 md:px-8 md:pb-16">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
