"use client";
import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

interface CertificationCardProps {
  title: string;
  issuer: string;
  category: string;
  image?: string;
  index?: number;
}

export default function CertificationCard({
  title,
  issuer,
  category,
  image,
  index = 0,
}: CertificationCardProps) {
  const categoryColors: Record<string, string> = {
    Microsoft: "from-[#00a4ef] to-[#0078d4]",
    AWS: "from-[#ff9900] to-[#e68a00]",
    Oracle: "from-[#f80000] to-[#c00000]",
    NPTEL: "from-[#1a73e8] to-[#1557b0]",
    Snowflake: "from-[#29b5e8] to-[#1d9bd1]",
    "IT Specialist": "from-[#6366f1] to-[#4f46e5]",
  };

  const gradient = categoryColors[category] || "from-accent-blue to-accent-purple";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card card-gradient-border p-6 group"
    >
      <div className="flex items-start gap-4">
        {image ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img
              src={image}
              alt={`${title} badge`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
          >
            <Award className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-sm md:text-base font-semibold text-white leading-tight">
            {title}
          </h3>
          <p className="text-xs text-text-secondary mt-1">{issuer}</p>
          <div className="flex items-center gap-1.5 mt-3">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
