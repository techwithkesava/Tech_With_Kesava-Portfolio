"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ShieldAlert } from "lucide-react";
import Link from "next/link";
import type { PublicBlog } from "@/lib/data/blogs";

const categoryColors: Record<string, string> = {
  "AI Engineering": "text-accent-blue border-accent-blue/20 bg-accent-blue/5",
  "AI Safety": "text-red-400 border-red-400/20 bg-red-400/5",
  Certifications: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  Backend: "text-amber-400 border-amber-400/20 bg-amber-400/5",
  Career: "text-accent-purple border-accent-purple/20 bg-accent-purple/5",
};

export default function BlogPostClient({ post }: { post: PublicBlog | null }) {
  const router = useRouter();

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <h1 className="text-3xl font-display font-bold text-white mb-2">Article Not Found</h1>
        <p className="text-text-secondary mb-6 max-w-md">
          The blog post you are looking for does not exist or has been moved.
        </p>
        <Link href="/blog" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-accent-blue/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-accent-purple/[0.03] blur-[120px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push("/blog")}
            className="btn-outline py-2 px-4 text-xs font-medium inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </button>
        </motion.div>

        {/* Post Metadata Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
                categoryColors[post.category] || "text-text-muted border-border"
              }`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary border-y border-[rgba(255,255,255,0.06)] py-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent-blue" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent-purple" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card card-gradient-border p-8 md:p-12 relative overflow-hidden"
        >
          <article className="blog-content">
            <div
              className="text-text-secondary leading-relaxed space-y-6 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </motion.div>
      </div>
    </div>
  );
}
