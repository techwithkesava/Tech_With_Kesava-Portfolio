"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import type { PublicResource } from "@/lib/data/resources";

export default function ResourceCard({ resource }: { resource: PublicResource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group relative flex flex-col justify-between rounded-xl bg-[#0F1117] border border-[#272A33] p-5 hover:border-[#FF6B2C]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,107,44,0.15)] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-[#FF6B2C]/5 rounded-full blur-2xl group-hover:bg-[#FF6B2C]/15 transition-all duration-300 pointer-events-none" />

      <div>
        {/* Thumbnail & Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-12 h-12 rounded-xl bg-[#181B25] border border-[#272A33] overflow-hidden flex items-center justify-center">
            {resource.thumbnailUrl ? (
              <Image
                src={resource.thumbnailUrl}
                alt={resource.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Layers className="w-6 h-6 text-[#FF6B2C]" />
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {resource.featured && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#FF6B2C] bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 px-2 py-0.5 rounded-md">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
            <span className="text-[10px] font-medium text-[#A1A1AA] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md">
              {resource.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-white group-hover:text-[#FF6B2C] transition-colors mb-2 line-clamp-1">
          {resource.title}
        </h3>

        {/* Description */}
        {resource.description && (
          <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2 mb-4">
            {resource.description}
          </p>
        )}
      </div>

      {/* Footer / CTA */}
      <div className="pt-3 border-t border-[#272A33]/60 flex items-center justify-between text-xs font-semibold text-[#FF6B2C]">
        <span>Explore Collection</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
