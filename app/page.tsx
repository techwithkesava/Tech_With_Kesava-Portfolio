import { getPublishedAiTools } from "@/lib/data/ai-tools";
import { getPublishedVideos } from "@/lib/data/videos";
import HomeContent from "./components/home/HomeContent";

export const revalidate = 300;

export default async function HomePage() {
  const [aiTools, videos] = await Promise.all([
    getPublishedAiTools(),
    getPublishedVideos(),
  ]);

  return <HomeContent aiTools={aiTools} videos={videos} />;
}
