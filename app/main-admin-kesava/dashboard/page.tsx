import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Database, FileText, Video, Wrench } from "lucide-react";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import type { AdminStats } from "@/lib/supabase/schema";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

async function fetchStats(): Promise<AdminStats | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;

  const count = async (table: "ai_tools" | "videos" | "blogs") => {
    const total = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    const published = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    const totalCount = total.count ?? 0;
    const publishedCount = published.count ?? 0;

    return {
      total: totalCount,
      published: publishedCount,
      drafts: Math.max(totalCount - publishedCount, 0),
    };
  };

  const [aiTools, videos, blogs] = await Promise.all([
    count("ai_tools"),
    count("videos"),
    count("blogs"),
  ]);

  return { aiTools, videos, blogs };
}

function StatCard({
  title,
  icon: Icon,
  href,
  accent,
  stats,
}: {
  title: string;
  icon: typeof Wrench;
  href: string;
  accent: string;
  stats: { total: number; published: number; drafts: number };
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-white/10 bg-[#0f1017] p-6 transition-colors hover:border-white/20"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4 text-[#6b7280] transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
      <p className="text-sm text-[#9ca3af]">{title}</p>
      <p className="mt-1 text-3xl font-bold">{stats.total}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-[#6b7280]">
        <span>
          <span className="text-emerald-400">{stats.published}</span> Published
        </span>
        <span className="h-1 w-1 rounded-full bg-[#6b7280]" />
        <span>
          <span className="text-[#9ca3af]">{stats.drafts}</span> Drafts
        </span>
      </div>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await fetchStats();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-[#9ca3af]">
        Overview of your dynamic content on TechWithKesava.
      </p>

      {!stats && (
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
          <Database className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            Supabase is not configured yet. Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
            <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to your{" "}
            <code className="font-mono">.env</code> file and restart the dev server.
          </span>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total AI Tools"
          icon={Wrench}
          href="/main-admin-kesava/ai-tools"
          accent="bg-blue-600/20 text-blue-400"
          stats={stats?.aiTools ?? { total: 0, published: 0, drafts: 0 }}
        />
        <StatCard
          title="Total Videos"
          icon={Video}
          href="/main-admin-kesava/videos"
          accent="bg-red-600/20 text-red-400"
          stats={stats?.videos ?? { total: 0, published: 0, drafts: 0 }}
        />
        <StatCard
          title="Total Blogs"
          icon={FileText}
          href="/main-admin-kesava/blogs"
          accent="bg-purple-600/20 text-purple-400"
          stats={stats?.blogs ?? { total: 0, published: 0, drafts: 0 }}
        />
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-[#0f1017] p-6">
        <h2 className="text-sm font-semibold text-white">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "Add AI Tool", href: "/main-admin-kesava/ai-tools" },
            { label: "Add Video", href: "/main-admin-kesava/videos" },
            { label: "Write Blog", href: "/main-admin-kesava/blogs" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
