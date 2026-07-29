"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  GraduationCap,
  Briefcase,
  Target,
  Code2,
  Brain,
  Database,
  Cloud,
  Wrench,
  Cpu,
  Shield,
  Zap,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import TimelineItem from "../components/TimelineItem";
import AnimatedCounter from "../components/AnimatedCounter";
import TechBadge from "../components/TechBadge";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming",
    skills: ["Python", "SQL", "Java", "C++"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    skills: [
      "Scikit-Learn",
      "NumPy",
      "Pandas",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    icon: Cpu,
    title: "LLM & GenAI",
    skills: [
      "Transformers",
      "RAG",
      "Prompt Engineering",
      "LoRA Fine-Tuning",
      "Embeddings",
      "Vector Databases",
    ],
  },
  {
    icon: Shield,
    title: "AI Safety",
    skills: ["Guardrails", "Prompt Injection Defense", "Output Filtering"],
  },
  {
    icon: Zap,
    title: "Backend",
    skills: ["FastAPI", "REST APIs", "Async Processing"],
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["PostgreSQL", "Redis"],
  },
  {
    icon: Cloud,
    title: "Cloud",
    skills: ["AWS EC2", "AWS S3"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "GitHub", "Docker", "VS Code"],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ════════════════ PAGE HEADER ════════════════ */}
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 inline-flex">About Me</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Kesava Sai Veerendra{" "}
              <span className="gradient-text">Kantipudi</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              AI Engineer • LLM Developer • Tech Educator
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-muted">
              <MapPin className="w-4 h-4" />
              Rajahmundry, India
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ PROFESSIONAL SUMMARY ════════════════ */}
      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3"
            >
              <h2 className="section-heading text-2xl md:text-3xl mb-6">
                Building intelligence systems that{" "}
                <span className="gradient-text">matter</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  I&apos;m an AI Engineer specializing in building real-world intelligence
                  systems using Large Language Models and machine learning. My work focuses
                  on the critical intersection of AI capability and production reliability.
                </p>
                <p>
                  I&apos;ve developed Retrieval-Augmented Generation systems that transform how
                  organizations interact with their data, built scalable AI APIs that handle
                  production workloads, and engineered AI safety middleware that protects
                  against prompt injection attacks.
                </p>
                <p>
                  Beyond engineering, I&apos;m deeply committed to making AI technology
                  accessible. Through tutorials, roadmaps, and educational content, I help
                  aspiring developers navigate the rapidly evolving AI landscape.
                </p>
              </div>
            </motion.div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <GlassCard delay={0}>
                <AnimatedCounter end={800} suffix="+" label="Problems Solved" />
              </GlassCard>
              <GlassCard delay={0.1}>
                <AnimatedCounter end={7} suffix="" label="Certifications" />
              </GlassCard>
              <GlassCard delay={0.2}>
                <AnimatedCounter end={19} suffix="+" label="AI Projects" />
              </GlassCard>
              <GlassCard delay={0.3}>
                <div className="text-center">
                  <span className="stat-number">8.5</span>
                  <p className="mt-2 text-sm text-text-secondary">GPA</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ TIMELINE ════════════════ */}
      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Education */}
            <div>
              <SectionHeader
                label="Education"
                heading="Academic Journey"
                align="left"
              />
              <TimelineItem
                title="B.Tech — AI & Machine Learning"
                subtitle="Aditya College of Engineering & Technology"
                period="2023 — 2027"
                description="Pursuing specialization in Artificial Intelligence and Machine Learning with a focus on LLM systems, deep learning architectures, and production AI engineering. Maintaining an 8.5 GPA while building real-world AI projects."
                index={0}
              />
            </div>

            {/* Experience */}
            <div>
              <SectionHeader
                label="Experience"
                heading="Professional Work"
                align="left"
              />
              <TimelineItem
                title="Data Specialist Intern"
                subtitle="Technical Hub"
                period="May 2025 — June 2025"
                index={0}
              >
                <ul className="mt-3 space-y-2">
                  {[
                    "Built analytics workflows for data-driven insights",
                    "Developed data pipelines for automated processing",
                    "Automated reporting systems for stakeholders",
                    "Worked with real-world datasets at scale",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm text-text-secondary flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TimelineItem>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ SKILLS ════════════════ */}
      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          <SectionHeader
            label="Technical Skills"
            heading="Technologies I work with"
            description="A comprehensive toolkit spanning AI/ML, backend engineering, and cloud infrastructure."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, i) => (
              <GlassCard key={cat.title} delay={i * 0.06}>
                <cat.icon className="w-6 h-6 text-accent-blue mb-3" />
                <h3 className="font-display text-base font-semibold text-white mb-3">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <TechBadge key={s} name={s} />
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ ACHIEVEMENTS ════════════════ */}
      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          <SectionHeader
            label="Achievements"
            heading="Milestones reached"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "800+ Coding Problems",
                desc: "Consistently solving algorithmic challenges across platforms.",
              },
              {
                icon: Cpu,
                title: "AI/ML Project Builder",
                desc: "Building production-grade AI systems from concept to deployment.",
              },
              {
                icon: Briefcase,
                title: "Technical Content Creator",
                desc: "Creating educational content for the developer community.",
              },
              {
                icon: GraduationCap,
                title: "Multiple Certifications",
                desc: "Industry-validated credentials from Microsoft, AWS, Oracle, and more.",
              },
            ].map((item, i) => (
              <GlassCard key={item.title} delay={i * 0.08}>
                <item.icon className="w-7 h-7 text-accent-blue mb-3" />
                <h3 className="font-display text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="section">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">
              Interested in working together?
            </h2>
            <p className="text-text-secondary max-w-md mx-auto mb-8">
              I&apos;m always open to discussing AI projects, collaborations, or tech education opportunities.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
