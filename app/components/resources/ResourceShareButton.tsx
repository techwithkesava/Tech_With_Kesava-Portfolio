"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export default function ResourceShareButton({
  title,
  text,
  url,
}: {
  title: string;
  text?: string;
  url?: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      console.error("Clipboard write failed");
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-white bg-[#FF6B2C] hover:bg-[#FF4F1F] shadow-[0_4px_16px_rgba(255,107,44,0.25)] transition-all duration-200 active:scale-95"
        aria-label="Share resource"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" /> Copied!
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" /> Share
          </>
        )}
      </button>

      {copied && (
        <div className="absolute right-0 top-full mt-2 z-50 px-3 py-1.5 rounded-lg bg-[#181B25] border border-[#FF6B2C]/30 text-white text-xs font-medium shadow-xl flex items-center gap-1.5 whitespace-nowrap animate-in fade-in slide-in-from-top-1">
          <Copy className="w-3 h-3 text-[#FF6B2C]" />
          Resource link copied!
        </div>
      )}
    </div>
  );
}
