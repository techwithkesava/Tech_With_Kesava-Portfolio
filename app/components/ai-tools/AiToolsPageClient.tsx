"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, X } from "lucide-react";
import TechBadge from "../TechBadge";
import type { PublicAiTool } from "@/lib/data/ai-tools";

export default function AiToolsPageClient({
  tools,
}: {
  tools: PublicAiTool[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tools.map((t) => t.category)))],
    [tools]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const matchesQuery =
        q.length === 0 ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [tools, query, category]);

  if (tools.length === 0) {
    return (
      <section className="section">
        <div className="section-container">
          <p className="text-center text-text-secondary">
            No AI tools published yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 inline-flex">AI Tools</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Tools I <span className="gradient-text">use & recommend</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Hand-picked AI tools for building, learning, and shipping faster — with quick links so you can dive straight in.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          {/* Search + filter bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, tags…"
                className="w-full bg-white/[0.03] border border-[rgba(255,255,255,0.1)] rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder:text-text-muted outline-none transition-colors focus:border-accent-blue/50"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    category === cat
                      ? "text-white border-accent-blue/40 bg-accent-blue/10"
                      : "text-text-muted border-[rgba(255,255,255,0.1)] hover:text-white hover:border-white/25"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-text-secondary py-16">
              No tools match your search. Try a different keyword or category.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="card card-gradient-border group"
                >
                  <div className="h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-transparent" />

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        {tool.imageUrl ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <img
                              src={tool.imageUrl}
                              alt={`${tool.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="text-xs text-text-muted font-medium uppercase tracking-wider">
                            {tool.category}
                          </span>
                          <h3 className="font-display text-lg font-bold text-white leading-tight">
                            {tool.name}
                          </h3>
                        </div>
                      </div>
                      {tool.featured && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 border border-amber-400/20 bg-amber-400/5 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    {tool.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.tags.map((tag) => (
                          <TechBadge key={tag} name={tag} />
                        ))}
                      </div>
                    )}

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline w-full sm:w-auto"
                    >
                      Visit Tool <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
