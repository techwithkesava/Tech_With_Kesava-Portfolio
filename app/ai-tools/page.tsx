import type { Metadata } from "next";
import { getPublishedAiTools } from "@/lib/data/ai-tools";
import AiToolsPageClient from "../components/ai-tools/AiToolsPageClient";

export const metadata: Metadata = { title: "AI Tools" };
export const dynamic = "force-dynamic";

export default async function AiToolsPage() {
  const tools = await getPublishedAiTools();
  return <AiToolsPageClient tools={tools} />;
}
