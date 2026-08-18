"use client";
import { motion } from "framer-motion";
import { Brain, Code2, BarChart3, Shield, ArrowRight, CheckCircle, Circle } from "lucide-react";
import GlassCard from "../components/GlassCard";

const roadmaps = [
  {
    icon: Brain, title: "AI Engineer Roadmap", color: "from-accent-blue to-accent-purple",
    description: "A structured path from Python fundamentals to building production AI systems.",
    steps: ["Python & Math Foundations", "ML Algorithms & Scikit-Learn", "Deep Learning & Neural Networks", "NLP & Transformers", "LLMs, RAG & Embeddings", "Production AI & MLOps"],
    status: "active",
  },
  {
    icon: Code2, title: "Python Roadmap", color: "from-[#3776ab] to-[#ffd43b]",
    description: "Master Python from basics to advanced patterns for AI and backend development.",
    steps: ["Core Python Syntax", "Data Structures & OOP", "File I/O & Error Handling", "Libraries: NumPy, Pandas", "Web APIs with FastAPI", "Async & Advanced Patterns"],
    status: "active",
  },
  {
    icon: BarChart3, title: "Data Science Roadmap", color: "from-[#10b981] to-[#059669]",
    description: "From data analysis to machine learning — a complete data science journey.",
    steps: ["Statistics & Probability", "Data Wrangling with Pandas", "Visualization & EDA", "Machine Learning Fundamentals", "Feature Engineering", "Model Deployment"],
    status: "coming-soon",
  },
  {
    icon: Shield, title: "Cybersecurity Roadmap", color: "from-[#ef4444] to-[#f97316]",
    description: "Essential security knowledge for developers building AI and web applications.",
    steps: ["Networking Fundamentals", "Web Security Basics", "Authentication & Authorization", "AI Safety & Adversarial ML", "Secure API Development", "Threat Modeling"],
    status: "coming-soon",
  },
];

export default function RoadmapsPage() {
  return (
    <>
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label mb-4 inline-flex">Roadmaps</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Your path to <span className="gradient-text">mastery</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Structured learning paths designed to take you from fundamentals to production-ready skills.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-6">
            {roadmaps.map((rm, i) => (
              <GlassCard key={rm.title} delay={i * 0.1} className="relative">
                {rm.status === "coming-soon" && (
                  <div className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-accent-purple bg-accent-purple/10 border border-accent-purple/20 rounded-full px-3 py-1">
                    Coming Soon
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rm.color} flex items-center justify-center mb-4`}>
                  <rm.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{rm.title}</h3>
                <p className="text-sm text-text-secondary mb-6">{rm.description}</p>
                <div className="space-y-3">
                  {rm.steps.map((step, si) => (
                    <div key={step} className="flex items-center gap-3">
                      {rm.status === "active" && si < 2 ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-text-muted flex-shrink-0" />
                      )}
                      <span className={`text-sm ${rm.status === "active" && si < 2 ? "text-white" : "text-text-secondary"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                {rm.status === "active" && (
                  <a href="#" className="btn-ghost mt-6 text-sm">
                    Start Learning <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
