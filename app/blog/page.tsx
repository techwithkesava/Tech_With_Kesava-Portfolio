import type { Metadata } from "next";
import { getPublishedBlogs } from "@/lib/data/blogs";
import BlogListClient from "../components/blog/BlogListClient";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return <BlogListClient posts={posts} />;
}
