"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import type { PublicVideo } from "@/lib/data/videos";

function VideoPlayerModal({
  video,
  onClose,
}: {
  video: PublicVideo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-black aspect-video">
              <iframe
                src={`${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display text-base md:text-lg font-semibold text-white leading-tight">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                  Playing directly on TechWithKesava
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="flex-shrink-0 w-9 h-9 rounded-xl border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-text-secondary hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function VideosSection({
  videos,
}: {
  videos: PublicVideo[];
}) {
  const [active, setActive] = useState<PublicVideo | null>(null);

  if (videos.length === 0) return null;

  return (
    <>
      <section className="section bg-[#08090D] border-t border-[#272A33]">
        <div className="section-container">
          <SectionHeader
            label="Videos"
            heading="Watch & learn"
            description="Practical tutorials and deep dives — playable right here on the website."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.button
                key={video.id}
                type="button"
                onClick={() => setActive(video)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card card-gradient-border group text-left cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnailUrl || ""}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B2C] to-[#FF4F1F] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#FF6B2C]/30">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[11px] font-medium text-[#FF6B2C] bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 rounded-full px-2 py-0.5">
                      {video.category}
                    </span>
                    {video.featured && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 border border-amber-400/20 bg-amber-400/5 rounded-full px-2.5 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold text-white leading-tight">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="mt-1.5 text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <VideoPlayerModal video={active} onClose={() => setActive(null)} />
    </>
  );
}
