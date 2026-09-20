"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import heroImg from "@/images/hero.png";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Cpu,
  Shield,
  Zap,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import GlassCard from "../GlassCard";
import AnimatedCounter from "../AnimatedCounter";
import ProjectCard from "../ProjectCard";
import CertificationCard from "../CertificationCard";
import AiToolsSection from "./AiToolsSection";
import VideosSection from "./VideosSection";
import type { PublicAiTool } from "@/lib/data/ai-tools";
import type { PublicVideo } from "@/lib/data/videos";

const roles = [
  "AI Engineer",
  "LLM Developer",
  "Tech Educator",
  "Microsoft Certified",
  "Content Creator",
];

const skills = [
  "Python", "FastAPI", "Transformers", "RAG", "LangChain", "PyTorch",
  "Scikit-Learn", "NumPy", "Pandas", "PostgreSQL", "Redis", "Docker",
  "AWS", "Git", "REST APIs", "Prompt Engineering", "Vector Databases",
  "LoRA", "Embeddings", "AI Safety",
];

const projects = [
  {
    title: "Collaborative AI Agent Orchestration",
    description:
      "Multi-agent orchestration system built with LangGraph enabling collaborative AI agents to work together on complex tasks through structured workflows.",
    tech: ["Python", "LangGraph", "LLMs", "Multi-Agent"],
    features: [
      "Agent Collaboration",
      "Workflow Orchestration",
      "State Management",
      "Task Decomposition",
    ],
    href: "https://github.com/kesavakantipudi/Collaborative-AI-Agent-Orchestration-Framework-with-LangGraph",
  },
  {
    title: "Multimodal RAG System",
    description:
      "Production-grade multimodal RAG system that processes both documents and images, enabling semantic search and question answering across mixed-media corpora.",
    tech: ["Python", "RAG", "Vision AI", "LangChain", "Vector DB"],
    features: [
      "Document Analysis",
      "Image Understanding",
      "Multimodal Search",
      "Grounded Responses",
    ],
    href: "https://github.com/kesavakantipudi/Multimodal-RAG-System-for-Document-and-Image-Analysis",
  },
  {
    title: "Prompt Injection Defense System",
    description:
      "Multi-layered AI safety middleware that detects and prevents prompt injection attacks through input sanitization, output filtering, and behavioral analysis.",
    tech: ["Python", "Transformers", "FastAPI", "AI Safety"],
    features: [
      "Attack Detection",
      "Input Sanitization",
      "Output Filtering",
      "Safety Middleware",
    ],
    href: "https://github.com/kesavakantipudi/Prompt-Injection-Defense-System-for-LLM-Applications",
  },
];

const certifications = [
  { title: "Power Platform Developer Associate", issuer: "Microsoft", category: "Microsoft", image: "/images/certifications/microsoft-certified-associate-badge.svg" },
  { title: "Power Platform Solution Architect Expert", issuer: "Microsoft", category: "Microsoft", image: "/images/certifications/microsoft-certified-expert-badge.svg" },
  { title: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", category: "AWS", image: "/images/certifications/aws-certified-ai-practitioner.png" },
  { title: "Java Foundations Associate", issuer: "Oracle", category: "Oracle", image: "/images/certifications/Java Foundation Associate badge.jpg" },
];

export default function HomeContent({
  aiTools,
  videos,
}: {
  aiTools: PublicAiTool[];
  videos: PublicVideo[];
}) {
  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-[calc(100vh-80px)] lg:min-h-screen flex items-center justify-center px-6 pt-28 pb-12 lg:py-20 overflow-hidden bg-[#08090D]">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        {/* Ambient radial glows behind subject and background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 75% 45%, rgba(255, 107, 44, 0.10), transparent 30%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.07), transparent 30%), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.05), transparent 30%), radial-gradient(circle at 20% 30%, rgba(255, 107, 44, 0.08), transparent 35%)",
          }}
        />

        <div className="relative z-10 max-w-[1340px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px]">
            
            {/* LEFT CONTENT (Approx 52-55% -> 7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              {/* Role badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6"
              >
                {roles.map((role) => (
                  <span
                    key={role}
                    className="tech-badge text-[11px]"
                  >
                    {role}
                  </span>
                ))}
              </motion.div>

              {/* Heading */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-[#F8FAFC] mb-6">
                Building AI.{" "}
                <span className="gradient-text">Teaching Tech.</span>
                <br />
                Sharing Knowledge.
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                AI Engineer specializing in building production-grade intelligence systems
                using LLMs, RAG, and machine learning. Microsoft Certified Professional
                turning complex AI into practical solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                <Link href="/projects" className="btn-primary w-full sm:w-auto">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/tutorials" className="btn-outline w-full sm:w-auto">
                  <BookOpen className="w-4 h-4" /> Watch Tutorials
                </Link>
                <Link href="/contact" className="btn-outline w-full sm:w-auto">
                  Contact Me
                </Link>
              </div>
            </motion.div>

            {/* RIGHT IMAGE (Approx 45-48% -> 5 cols - NO CARD, NO BORDER, SEAMLESS INTEGRATION) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end items-end mt-6 lg:mt-0"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[530px] flex justify-center lg:justify-end">
                {/* Soft glow highlight behind the subject */}
                <div className="absolute inset-0 -z-10 bg-radial from-[#FF6B2C]/15 via-[#8B5CF6]/08 to-transparent blur-3xl rounded-full scale-110 pointer-events-none" />

                <Image
                  src={heroImg}
                  alt="Kesava Kantipudi - Tech With Kesava"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 530px"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] [mask-image:radial-gradient(ellipse_at_center,_black_70%,_transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,_black_70%,_transparent_100%)]"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border border-[#272A33] flex justify-center pt-1.5 bg-[#0D0F14]">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-[#FF6B2C]"
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════ ABOUT PREVIEW ════════════════ */}
      <section className="section bg-[#0D0F14]/60 border-t border-[#272A33]">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-4 inline-flex">About Me</span>
              <h2 className="section-heading mt-4">
                Engineering AI systems that{" "}
                <span className="gradient-text">actually work</span>
              </h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                I&apos;m Kesava — an AI Engineer focused on building reliable, production-ready
                AI applications. From RAG pipelines to AI safety middleware, I develop
                systems that solve real problems at scale.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Currently pursuing B.Tech in AI &amp; Machine Learning with an 8.5 GPA,
                while building real-world AI systems and teaching technology
                to a growing community.
              </p>
              <Link href="/about" className="btn-ghost mt-6 inline-flex">
                Learn more about me <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <GlassCard delay={0}>
                <AnimatedCounter end={1000} suffix="+" label="Problems Solved" />
              </GlassCard>
              <GlassCard delay={0.1}>
                <AnimatedCounter end={7} suffix="" label="Certifications" />
              </GlassCard>
              <GlassCard delay={0.2}>
                <AnimatedCounter end={30} suffix="+" label="AI Projects" />
              </GlassCard>
              <GlassCard delay={0.3}>
                <AnimatedCounter end={8} label="Tech Stacks" duration={1.5} />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FEATURED PROJECTS ════════════════ */}
      <section className="section bg-[#08090D] border-t border-[#272A33]">
        <div className="section-container">
          <SectionHeader
            label="Featured Work"
            heading="Projects that push boundaries"
            description="Production-grade AI systems built with scalability, safety, and real-world impact in mind."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} {...p} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/projects" className="btn-outline">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ SKILLS MARQUEE ════════════════ */}
      <section className="py-12 bg-[#0D0F14] border-t border-b border-[#272A33] overflow-hidden">
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="text-sm font-medium text-text-muted whitespace-nowrap flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C]/50" />
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════ CERTIFICATIONS PREVIEW ════════════════ */}
      <section className="section bg-[#08090D]">
        <div className="section-container">
          <SectionHeader
            label="Certifications"
            heading="Industry-recognized credentials"
            description="Validated expertise from Microsoft, AWS, and leading technology organizations."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((c, i) => (
              <CertificationCard key={c.title} {...c} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/certifications" className="btn-outline">
              View All Certifications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ WHAT I DO ════════════════ */}
      <section className="section bg-[#0D0F14]/60 border-t border-[#272A33]">
        <div className="section-container">
          <SectionHeader
            label="Expertise"
            heading="What I build & teach"
            description="Combining deep engineering skills with a passion for education."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "LLM & GenAI Systems",
                desc: "RAG pipelines, fine-tuning, embeddings, and production LLM architectures.",
              },
              {
                icon: Shield,
                title: "AI Safety & Guardrails",
                desc: "Prompt injection defense, output filtering, and safety middleware.",
              },
              {
                icon: Zap,
                title: "Scalable APIs",
                desc: "FastAPI services with async processing, caching, and rate limiting.",
              },
              {
                icon: Cpu,
                title: "Machine Learning",
                desc: "Feature engineering, model evaluation, and production ML pipelines.",
              },
              {
                icon: Code2,
                title: "Full-Stack Development",
                desc: "Web applications with modern frameworks, databases, and cloud infrastructure.",
              },
              {
                icon: BookOpen,
                title: "Tech Education",
                desc: "Tutorials, roadmaps, and content making AI accessible to everyone.",
              },
            ].map((item, i) => (
              <GlassCard key={item.title} delay={i * 0.08}>
                <item.icon className="w-8 h-8 text-[#FF6B2C] mb-4" />
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ AI TOOLS ════════════════ */}
      <AiToolsSection tools={aiTools} />

      {/* ════════════════ VIDEOS ════════════════ */}
      <VideosSection videos={videos} />

      {/* ════════════════ CTA ════════════════ */}
      <section className="section bg-[#08090D]">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl p-10 md:p-16 text-center bg-[#13161D]"
            style={{
              border: "1px solid #272A33",
            }}
          >
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6B2C]/[0.08] rounded-full blur-[80px]" />

            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-[#FF6B2C] mx-auto mb-4" />
              <h2 className="section-heading mb-4">
                Let&apos;s build something{" "}
                <span className="gradient-text">extraordinary</span>
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto mb-8">
                Whether it&apos;s an AI system, a collaboration, or just a conversation
                about technology — I&apos;d love to connect.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://github.com/kesavakantipudi" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <ExternalLink className="w-4 h-4" /> View GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
