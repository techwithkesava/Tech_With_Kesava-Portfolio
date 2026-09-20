import { getPublishedAiTools } from "@/lib/data/ai-tools";
import { getPublishedVideos } from "@/lib/data/videos";
import { getFeaturedResources } from "@/lib/data/resources";
import HomeContent from "./components/home/HomeContent";

export const revalidate = 300;

export default async function HomePage() {
  const [aiTools, videos, resources] = await Promise.all([
    getPublishedAiTools(),
    getPublishedVideos(),
    getFeaturedResources(3),
  ]);

  return <HomeContent aiTools={aiTools} videos={videos} resources={resources} />;
}
