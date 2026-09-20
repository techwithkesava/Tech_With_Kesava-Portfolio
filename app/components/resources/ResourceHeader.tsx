"use client";

import Image from "next/image";
import heroImg from "@/images/hero.png";
import ResourceShareButton from "./ResourceShareButton";

export default function ResourceHeader({
  title,
  description,
  thumbnailUrl,
  category,
}: {
  title?: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  category?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0F1117] border border-[#272A33] p-6 sm:p-8 mb-6 shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FF6B2C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Profile Avatar / Collection Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#FF6B2C]/40 shadow-[0_0_25px_rgba(255,107,44,0.2)] mb-4 bg-[#181B25] flex items-center justify-center">
          <Image
            src={thumbnailUrl || heroImg}
            alt={title || "Tech With Kesava"}
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Creator Name & Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B2C] bg-[#FF6B2C]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B2C]/20">
            {category || "Resource Collection"}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 max-w-lg">
          {title || "Tech With Kesava"}
        </h1>

        {/* Description / Bio */}
        {description && (
          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-md mb-5">
            {description}
          </p>
        )}

        {/* Share Action */}
        <ResourceShareButton title={title || "Tech With Kesava Resources"} text={description || ""} />
      </div>
    </div>
  );
}
