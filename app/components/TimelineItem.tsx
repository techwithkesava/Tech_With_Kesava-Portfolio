"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  children?: ReactNode;
  index?: number;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  description,
  children,
  index = 0,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      <div className="timeline-line" />

      {/* Dot */}
      <div className="timeline-dot absolute left-0 top-1" />

      {/* Content */}
      <div>
        <span className="text-xs text-accent-blue font-medium">{period}</span>
        <h3 className="font-display text-lg font-semibold text-white mt-1">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
        {description && (
          <p className="text-sm text-text-secondary leading-relaxed mt-3">
            {description}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  );
}
