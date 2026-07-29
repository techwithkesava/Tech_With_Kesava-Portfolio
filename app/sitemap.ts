import { MetadataRoute } from "next";
import { blogPosts } from "./data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techwithkesava.vercel.app";

  // Base/static routes
  const routes = ["", "/about", "/projects", "/certifications", "/tutorials", "/roadmaps", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
