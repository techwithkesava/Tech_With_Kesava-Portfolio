"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionHeader({
  label,
  heading,
  description,
  align = "center",
  children,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <span className="section-label mb-4 inline-flex">{label}</span>
      <h2 className="section-heading mt-4">{heading}</h2>
      {description && (
        <p
          className={`mt-4 text-text-secondary text-base md:text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}
