"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play, X, Download } from "lucide-react";
import type { PublicResourceItem } from "@/lib/data/resources";
import { getResourceItemIcon, getResourceItemBadgeColor } from "./ResourceCategory";
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "@/lib/youtube";

export default function ResourceItem({
  item,
  resourceId,
}: {
  item: PublicResourceItem;
  resourceId?: string;
}) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const IconComponent = getResourceItemIcon(item.type);
  const badgeColorClass = getResourceItemBadgeColor(item.type);

  // YouTube logic
  const ytId = item.type === "video" ? extractYouTubeId(item.url) : null;
  const videoThumbnail = ytId ? getYouTubeThumbnailUrl(ytId, "hqdefault") : item.thumbnailUrl;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // Record click asynchronously
    if (typeof window !== "undefined") {
      fetch("/api/resources/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: resourceId || item.resourceId,
          resourceItemId: item.id,
        }),
      }).catch(() => {});
    }

    if (item.type === "video" && ytId) {
      e.preventDefault();
      setShowVideoModal(true);
    }
  };

  return (
    <>
      <div className="group relative w-full mb-3 rounded-xl bg-[#12141C] border border-[#272A33] hover:border-[#FF6B2C]/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,107,44,0.12)] overflow-hidden">
        <a
          href={item.url}
          target={item.url.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center gap-3.5 p-3.5 sm:p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/50 rounded-xl"
        >
          {/* Icon / Thumbnail Box */}
          <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#181B25] border border-[#272A33] overflow-hidden flex items-center justify-center">
            {videoThumbnail ? (
              <Image
                src={videoThumbnail}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : item.thumbnailUrl ? (
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className={`p-2.5 rounded-lg border ${badgeColorClass}`}>
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}

            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center shadow-md">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${badgeColorClass}`}>
                {item.type}
              </span>
              {item.type === "github" && typeof item.metadata?.language === "string" && (
                <span className="text-[10px] text-[#A1A1AA] bg-white/[0.05] px-1.5 py-0.5 rounded">
                  {item.metadata.language}
                </span>
              )}
            </div>

            <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FF6B2C] transition-colors truncate">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-[11px] sm:text-xs text-[#A1A1AA] line-clamp-1 mt-0.5">
                {item.description}
              </p>
            )}
          </div>

          {/* Action indicator icon */}
          <div className="flex-shrink-0 text-[#A1A1AA] group-hover:text-[#FF6B2C] transition-colors p-1">
            {item.type === "download" || item.type === "document" ? (
              <Download className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
          </div>
        </a>
      </div>

      {/* Video Modal optimization */}
      {showVideoModal && ytId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0F1117] border border-[#272A33] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#272A33]">
              <h4 className="text-sm font-semibold text-white truncate pr-4">{item.title}</h4>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-[#A1A1AA] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${getYouTubeEmbedUrl(ytId)}?autoplay=1`}
                title={item.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
