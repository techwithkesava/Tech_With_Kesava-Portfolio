"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Youtube, Instagram, Mail, ArrowUpRight } from "lucide-react";

import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
];

const resourceLinks = [
  { label: "Tutorials", href: "/tutorials" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/kesavakantipudi", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/kesavakantipudi", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC7KDLruKwCaq2LGelUVcUMA", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/tech_with_kesava/", icon: Instagram },
  { label: "Email", href: "mailto:techwithkesava@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)]">
      {/* Gradient divider */}
      <div className="gradient-divider" />

      <div className="section-container px-6 md:px-8">
        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-10 pb-8 md:pt-20 md:pb-16 overflow-hidden"
        >
          <p className="footer-wordmark text-center">TECHWITHKESAVA</p>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pb-10 md:pb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="TechWithKesava Logo"
                width={28}
                height={28}
                className="w-7 h-7 rounded-lg object-contain"
              />
              <span className="font-display text-sm font-semibold text-white">
                TechWithKesava
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-[260px]">
              AI Engineer building production-grade intelligence systems. Teaching technology to the next generation.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-medium">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-medium">
              Resources
            </p>
            <ul className="space-y-3">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-medium">
              Connect
            </p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-accent-blue transition-colors inline-flex items-center gap-1.5"
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.06)] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} TechWithKesava. All rights reserved.
          </p>
          <a
            href="https://github.com/kesavakantipudi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-1"
          >
            Built with precision <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
