"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <p className="font-display text-[8rem] md:text-[12rem] font-black leading-none gradient-text">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-white mt-2 mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary max-w-sm mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
