import type { Metadata } from "next";
import { getPublishedResources } from "@/lib/data/resources";
import ResourceHub from "@/app/components/resources/ResourceHub";

export const metadata: Metadata = {
  title: "Creator Resource Hub | Tech With Kesava",
  description:
    "Explore curated guides, source code repositories, documents, AI tools, tutorials, and resources by Kesava Kantipudi.",
  openGraph: {
    title: "Creator Resource Hub | Tech With Kesava",
    description:
      "Explore curated guides, source code repositories, documents, AI tools, tutorials, and resources by Kesava Kantipudi.",
    url: "https://techwithkesava.com/resources",
    siteName: "Tech With Kesava",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Resource Hub | Tech With Kesava",
    description:
      "Explore curated guides, source code repositories, documents, AI tools, tutorials, and resources by Kesava Kantipudi.",
  },
};

export const revalidate = 60;

export default async function ResourcesPage() {
  const resources = await getPublishedResources();

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#08090D] flex flex-col items-center">
      <ResourceHub resources={resources} />
    </main>
  );
}
