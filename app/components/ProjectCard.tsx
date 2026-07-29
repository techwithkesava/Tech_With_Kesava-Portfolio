"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  index?: number;
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  features,
  index = 0,
  href = "#",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card card-gradient-border group"
    >
      {/* Gradient top border accent */}
      <div className="h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-transparent" />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-1">
              {title}
            </h3>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-text-muted group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <ul className="grid grid-cols-2 gap-2">
            {features.map((f) => (
              <li
                key={f}
                className="text-xs text-text-secondary flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-accent-blue flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
