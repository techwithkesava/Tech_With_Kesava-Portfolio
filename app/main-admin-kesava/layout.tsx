import type { Metadata } from "next";
import { getAdminSession } from "@/lib/admin/server-auth";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: { default: "Admin | TechWithKesava", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <div className="min-h-screen bg-[#05060a] text-white">{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
}
