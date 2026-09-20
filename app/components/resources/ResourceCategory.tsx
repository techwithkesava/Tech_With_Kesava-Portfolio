"use client";

import {
  Github,
  FileText,
  Play,
  Image as ImageIcon,
  Globe,
  Download,
  Wrench,
  GraduationCap,
  Share2,
  ExternalLink,
} from "lucide-react";
import type { ResourceItemType } from "@/lib/supabase/schema";

export function getResourceItemIcon(type: ResourceItemType) {
  switch (type) {
    case "github":
      return Github;
    case "document":
      return FileText;
    case "video":
      return Play;
    case "image":
      return ImageIcon;
    case "website":
      return Globe;
    case "download":
      return Download;
    case "article":
      return FileText;
    case "tool":
      return Wrench;
    case "course":
      return GraduationCap;
    case "social":
      return Share2;
    default:
      return ExternalLink;
  }
}

export function getResourceItemBadgeColor(type: ResourceItemType) {
  switch (type) {
    case "github":
      return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    case "video":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    case "document":
    case "article":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "download":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "tool":
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    case "course":
      return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    default:
      return "text-[#FF6B2C] bg-[#FF6B2C]/10 border-[#FF6B2C]/20";
  }
}
