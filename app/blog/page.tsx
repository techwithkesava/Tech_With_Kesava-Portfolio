"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { blogPosts } from "../data/blogPosts";

const featured = blogPosts[0];
const posts = blogPosts.slice(1);

const categoryColors: Record<string, string> = {
  "AI Engineering": "text-accent-blue border-accent-blue/20 bg-accent-blue/5",
  "AI Safety": "text-red-400 border-red-400/20 bg-red-400/5",
  Certifications: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  Backend: "text-amber-400 border-amber-400/20 bg-amber-400/5",
  Career: "text-accent-purple border-accent-purple/20 bg-accent-purple/5",
};

export default function BlogPage() {
  return (
    <>
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label mb-4 inline-flex">Blog</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Thoughts & <span className="gradient-text">insights</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Technical articles, certification journeys, project breakdowns, and learning experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section border-t border-[rgba(255,255,255,0.06)] pt-12">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card card-gradient-border p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-blue/[0.04] rounded-full blur-[80px]" />
            <div className="relative z-10">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-blue bg-accent-blue/10 border border-accent-blue/20 rounded-full px-3 py-1">
                Featured
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-4 mb-3">{featured.title}</h2>
              <p className="text-text-secondary leading-relaxed max-w-2xl mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-text-muted mb-6">
                <span className={`px-2 py-0.5 rounded-full border ${categoryColors[featured.category]}`}>{featured.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                <span>{featured.date}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="btn-ghost">Read Article <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="section">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <GlassCard key={post.title} delay={i * 0.06}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${categoryColors[post.category] || "text-text-muted border-border"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-text-muted">{post.date}</span>
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-2 leading-tight">{post.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="btn-ghost text-xs">Read <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
