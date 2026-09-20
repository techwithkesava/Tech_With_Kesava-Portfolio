"use client";
import { motion } from "framer-motion";
import CertificationCard from "../components/CertificationCard";

const certifications = [
  {
    title: "Power Platform Developer Associate",
    issuer: "Microsoft",
    category: "Microsoft",
    image: "/images/certifications/microsoft-certified-associate-badge.svg"
  },
  {
    title: "Power Platform Solution Architect Expert",
    issuer: "Microsoft",
    category: "Microsoft",
    image: "/images/certifications/microsoft-certified-expert-badge.svg"
  },
  {
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    category: "AWS",
    image: "/images/certifications/aws-certified-ai-practitioner.png"
  },
  {
    title: "Java Foundations Associate",
    issuer: "Oracle",
    category: "Oracle",
    image: "/images/certifications/Java Foundation Associate badge.jpg"
  },
  {
    title: "Database Foundations Associate",
    issuer: "Oracle",
    category: "Oracle",
    image: "/images/certifications/Oracle database badge.jpg"
  },
  {
    title: "SnowPro Associate Platform",
    issuer: "Snowflake",
    category: "Snowflake",
    image: "/images/certifications/SnowPro.png"
  },
  {
    title: "IT Specialist — HTML & CSS",
    issuer: "Certiport / Pearson",
    category: "IT Specialist",
    image: "/images/certifications/it-specialist-html-and-css.png"
  },
];

const categories = [
  { name: "Microsoft", count: 2, color: "from-[#00a4ef] to-[#0078d4]" },
  { name: "AWS", count: 1, color: "from-[#ff9900] to-[#e68a00]" },
  { name: "Oracle", count: 2, color: "from-[#f80000] to-[#c00000]" },
  { name: "Snowflake", count: 1, color: "from-[#29b5e8] to-[#1d9bd1]" },
  { name: "IT Specialist", count: 1, color: "from-[#6366f1] to-[#4f46e5]" },
];

export default function CertificationsPage() {
  return (
    <>
      {/* Header */}
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 inline-flex">Certifications</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Industry{" "}
              <span className="gradient-text">recognized</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Validated expertise from the world&apos;s leading technology organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-8 px-6 border-t border-[#272A33] bg-[#0D0F14]/60">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#272A33] bg-[#13161D]"
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${cat.color}`} />
                <span className="text-sm text-text-secondary">{cat.name}</span>
                <span className="text-xs text-text-muted">({cat.count})</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="section bg-[#08090D]">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.title} {...cert} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
