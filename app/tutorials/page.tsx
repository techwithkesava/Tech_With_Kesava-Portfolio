"use client";
import { motion } from "framer-motion";
import { Play, BookOpen, Code2, Brain, Shield, Zap, ArrowRight, Clock, ExternalLink } from "lucide-react";
import GlassCard from "../components/GlassCard";
import SectionHeader from "../components/SectionHeader";

const categories = [
  {
    icon: Code2, title: "Python", color: "from-[#3776ab] to-[#ffd43b]",
    description: "From fundamentals to advanced patterns — master Python for AI and backend development.",
    tutorials: [
      { title: "Python for AI Engineers — Complete Guide", duration: "45 min", level: "Beginner" },
      { title: "Advanced Python Patterns for ML", duration: "30 min", level: "Intermediate" },
      { title: "FastAPI from Zero to Production", duration: "60 min", level: "Advanced" },
    ],
  },
  {
    icon: Brain, title: "AI & Machine Learning", color: "from-accent-blue to-accent-purple",
    description: "Deep dives into machine learning algorithms, neural networks, and production AI systems.",
    tutorials: [
      { title: "Building Your First RAG System", duration: "50 min", level: "Intermediate" },
      { title: "Embeddings & Vector Search Explained", duration: "35 min", level: "Intermediate" },
      { title: "Production ML Pipeline Design", duration: "40 min", level: "Advanced" },
    ],
  },
  {
    icon: Zap, title: "Power Platform", color: "from-[#742774] to-[#00a4ef]",
    description: "Microsoft Power Platform tutorials — from Power Apps to Power Automate.",
    tutorials: [
      { title: "Power Platform Developer Cert Prep", duration: "90 min", level: "Intermediate" },
      { title: "Building Custom Connectors", duration: "40 min", level: "Advanced" },
    ],
  },
  {
    icon: Shield, title: "Cybersecurity", color: "from-[#ef4444] to-[#f97316]",
    description: "Essential cybersecurity for developers — secure coding, AI safety, and threat modeling.",
    tutorials: [
      { title: "AI Safety & Prompt Injection Defense", duration: "45 min", level: "Intermediate" },
      { title: "Secure API Development with FastAPI", duration: "30 min", level: "Intermediate" },
    ],
  },
];

export default function TutorialsPage() {
  return (
    <>
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label mb-4 inline-flex">Tutorials</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Learn by <span className="gradient-text">building</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Practical, project-based tutorials covering Python, AI, Power Platform, and Cybersecurity.
            </p>
          </motion.div>
        </div>
      </section>

      {categories.map((cat, idx) => (
        <section key={cat.title} className={`section border-t border-[#272A33] ${idx % 2 === 0 ? "bg-[#0D0F14]/60" : "bg-[#08090D]"}`}>
          <div className="section-container">
            <SectionHeader label={cat.title} heading={cat.description} align="left" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.tutorials.map((tut, i) => (
                <GlassCard key={tut.title} delay={i * 0.08}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#272A33] bg-[#0D0F14]">
                      {tut.level}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2 leading-tight">{tut.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#FF6B2C]" />{tut.duration}</span>
                  </div>
                  <a href="https://www.youtube.com/channel/UC7KDLruKwCaq2LGelUVcUMA" target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 text-xs">
                    Watch Tutorial <ArrowRight className="w-3 h-3" />
                  </a>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section bg-[#08090D] border-t border-[#272A33]">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <BookOpen className="w-8 h-8 text-[#FF6B2C] mx-auto mb-4" />
            <h2 className="section-heading text-2xl mb-4">More tutorials coming every week</h2>
            <p className="text-text-secondary max-w-md mx-auto mb-6">
              Subscribe to TechWithKesava on YouTube for new tutorials, deep dives, and project walkthroughs.
            </p>
            <a href="https://www.youtube.com/channel/UC7KDLruKwCaq2LGelUVcUMA" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
              Subscribe on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
