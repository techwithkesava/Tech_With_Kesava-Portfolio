"use client";

import { useState } from "react";
import { extractYouTubeId, getYouTubeThumbnailUrl } from "@/lib/youtube";
import type { VideoRow } from "@/lib/supabase/schema";
import type { VideoInput } from "../actions/videos";
import Field from "./Field";
import Toggle from "./Toggle";
import { btnPrimary, btnSecondary, inputClass, textareaClass } from "./styles";

export default function VideoForm({
  initial,
  onCancel,
  onSave,
  saving,
}: {
  initial?: VideoRow | null;
  onCancel: () => void;
  onSave: (input: VideoInput) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    youtube_url: initial?.youtube_url ?? "",
    description: initial?.description ?? "",
    thumbnail_url: initial?.thumbnail_url ?? "",
    category: initial?.category ?? "General",
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const videoId = extractYouTubeId(form.youtube_url);
  const previewThumb = videoId ? getYouTubeThumbnailUrl(videoId) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.youtube_url.trim()) next.youtube_url = "YouTube URL is required.";
    else if (!videoId) next.youtube_url = "Enter a valid YouTube URL (watch, youtu.be, or shorts).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      title: form.title,
      youtube_url: form.youtube_url,
      description: form.description,
      thumbnail_url: form.thumbnail_url,
      category: form.category,
      featured: form.featured,
      published: form.published,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Title" error={errors.title}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title")(e.target.value)}
          placeholder="e.g. Building a RAG System from Scratch"
          className={inputClass}
        />
      </Field>

      <Field
        label="YouTube URL"
        error={errors.youtube_url}
        hint="Supports watch?v=, youtu.be, /shorts/ and /embed/ links."
      >
        <input
          type="text"
          value={form.youtube_url}
          onChange={(e) => set("youtube_url")(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          className={inputClass}
        />
      </Field>

      {videoId && (
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <img
            src={previewThumb || ""}
            alt=""
            className="h-14 w-24 rounded-md object-cover"
          />
          <div className="text-xs text-[#9ca3af]">
            <p className="font-medium text-white">Video detected</p>
            <p className="mt-0.5 break-all font-mono text-[11px]">ID: {videoId}</p>
            <p className="mt-0.5">Plays inline on the website.</p>
          </div>
        </div>
      )}

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => set("description")(e.target.value)}
          placeholder="Optional short description."
          className={textareaClass}
          rows={3}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Custom Thumbnail URL" hint="Optional. Uses the YouTube thumbnail by default.">
          <input
            type="url"
            value={form.thumbnail_url}
            onChange={(e) => set("thumbnail_url")(e.target.value)}
            placeholder="https://.../thumbnail.jpg"
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <input
            type="text"
            value={form.category}
            onChange={(e) => set("category")(e.target.value)}
            placeholder="e.g. AI, Tutorials"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Featured</p>
          <p className="text-xs text-[#6b7280]">Highlight on the videos section.</p>
        </div>
        <Toggle checked={form.featured} onChange={set("featured")} label="Featured" />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Published</p>
          <p className="text-xs text-[#6b7280]">Only published videos appear publicly.</p>
        </div>
        <Toggle checked={form.published} onChange={set("published")} label="Published" />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} disabled={saving} className={btnSecondary}>
          Cancel
        </button>
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Add Video"}
        </button>
      </div>
    </form>
  );
}
