"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import heroImg from "@/images/hero.png";
import ResourceCard from "./ResourceCard";
import type { PublicResource } from "@/lib/data/resources";
import { Youtube, Instagram, Github, Linkedin, MessageCircle, Send, Search } from "lucide-react";

const CATEGORIES = [
  "All",
  "AI",
  "Development",
  "Tutorials",
  "Documents",
  "Projects",
  "Tools",
  "Free Resources",
];

const SOCIALS = [
  { label: "YouTube", href: "https://youtube.com/@techwithkesava", icon: Youtube },
  { label: "Instagram", href: "https://instagram.com/techwithkesava", icon: Instagram },
  { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029Vb8OU9I6RGJE8WulZv0a", icon: MessageCircle },
  { label: "Telegram Channel", href: "https://t.me/+J0cg_cHpMfY1MWE1", icon: Send },
  { label: "GitHub", href: "https://github.com/kesavakantipudi", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/kesavakantipudi", icon: Linkedin },
];

export default function ResourceHub({ resources }: { resources: PublicResource[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredResources = useMemo(() => {
    return resources.filter((r) => r.featured);
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory =
        selectedCategory === "All" ||
        r.category.toLowerCase() === selectedCategory.toLowerCase() ||
        r.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === "" ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-[480px] sm:max-w-[540px] md:max-w-[800px] lg:max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
      {/* ════════════════ PROFILE / HEADER CARD ════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0F1117] border border-[#272A33] p-6 sm:p-8 text-center mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FF6B2C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar / Hero Image */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#FF6B2C]/40 shadow-[0_0_25px_rgba(255,107,44,0.25)] mb-4 bg-[#181B25]">
            <Image
              src={heroImg}
              alt="Tech With Kesava"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
            Tech With Kesava
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#FF6B2C] mb-3">
            AI • Tech • Creator
          </p>

          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-md mb-6">
            AI Engineer building practical AI systems and sharing what I learn.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#181B25] border border-[#272A33] text-[#A1A1AA] hover:text-[#FF6B2C] hover:border-[#FF6B2C]/40 hover:bg-[#FF6B2C]/10 transition-all duration-200"
                  aria-label={s.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════ FEATURED RESOURCES ════════════════ */}
      {featuredResources.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF6B2C]" />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Featured Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      )}

      {/* ════════════════ ALL RESOURCES & FILTERS ════════════════ */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              All Resources
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0F1117] border border-[#272A33] text-xs text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF6B2C] transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? "bg-[#FF6B2C] text-white border-[#FF6B2C] shadow-[0_4px_16px_rgba(255,107,44,0.3)]"
                  : "bg-[#0F1117] text-[#A1A1AA] border-[#272A33] hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource List / Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl bg-[#0F1117] border border-[#272A33] p-6">
            <p className="text-sm text-[#A1A1AA]">No resources found for your search/filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
