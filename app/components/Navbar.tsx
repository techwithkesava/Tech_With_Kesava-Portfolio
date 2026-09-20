"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Blog", href: "/blog" },
  { label: "AI Tools", href: "/ai-tools" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/main-admin-kesava")) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#08090D]/80 backdrop-blur-xl border-b border-[#272A33]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="TechWithKesava Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-display text-base font-semibold text-[#F8FAFC] tracking-tight group-hover:text-[#FF6B2C] transition-colors">
              TechWithKesava
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                  pathname === l.href
                    ? "text-[#FF6B2C] bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 font-semibold"
                    : "text-[#A1A1AA] hover:text-[#FF6B2C] hover:bg-[#FF6B2C]/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 text-[13px] font-semibold py-2 px-5 rounded-xl text-white bg-[#FF6B2C] hover:bg-[#FF4F1F] shadow-[0_4px_16px_rgba(255,107,44,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Let&apos;s Connect
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[#F8FAFC] p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-20 bg-[#08090D]/95 backdrop-blur-xl lg:hidden border-b border-[#272A33]"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all ${
                      pathname === l.href
                        ? "text-[#FF6B2C] bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 font-semibold"
                        : "text-[#A1A1AA] hover:text-[#FF6B2C] hover:bg-[#FF6B2C]/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05 }}
                className="mt-4"
              >
                <Link href="/contact" className="btn-primary w-full text-center">
                  Let&apos;s Connect
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
