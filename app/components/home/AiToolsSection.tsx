"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import TechBadge from "../../components/TechBadge";
import type { PublicAiTool } from "@/lib/data/ai-tools";

export default function AiToolsSection({
  tools,
}: {
  tools: PublicAiTool[];
}) {
  if (tools.length === 0) return null;

  return (
    <section className="section border-t border-[rgba(255,255,255,0.06)]">
      <div className="section-container">
        <SectionHeader
          label="AI Tools"
          heading="Tools I use & recommend"
          description="Hand-picked AI tools that I rely on for building, learning, and shipping faster."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card card-gradient-border group"
            >
              {/* Gradient top border accent */}
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
      </div>
    </section>
  );
}
