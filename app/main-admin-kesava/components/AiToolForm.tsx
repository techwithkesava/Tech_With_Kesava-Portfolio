"use client";

import { useState } from "react";
import type { AiToolRow } from "@/lib/supabase/schema";
import type { AiToolInput } from "../actions/ai-tools";
import Field from "./Field";
import Toggle from "./Toggle";
import { btnPrimary, btnSecondary, inputClass, textareaClass } from "./styles";

export default function AiToolForm({
  initial,
  onCancel,
  onSave,
  saving,
}: {
  initial?: AiToolRow | null;
  onCancel: () => void;
  onSave: (input: AiToolInput) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    url: initial?.url ?? "",
    category: initial?.category ?? "General",
    image_url: initial?.image_url ?? "",
    tagsText: (initial?.tags ?? []).join(", "),
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    try {
      const url = new URL(form.url);
      if (!/^https?:$/.test(url.protocol)) throw new Error();
    } catch {
      next.url = "Enter a valid URL (http:// or https://).";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      name: form.name,
      description: form.description,
      url: form.url,
      category: form.category,
      image_url: form.image_url,
      tags: form.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: form.featured,
      published: form.published,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Name" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
          placeholder="e.g. ChatGPT"
          className={inputClass}
        />
      </Field>

      <Field label="Description" error={errors.description}>
        <textarea
          value={form.description}
          onChange={(e) => set("description")(e.target.value)}
          placeholder="Short description shown on the public website."
          className={textareaClass}
          rows={3}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="URL" error={errors.url}>
          <input
            type="url"
            value={form.url}
            onChange={(e) => set("url")(e.target.value)}
            placeholder="https://tool.example.com"
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <input
            type="text"
            value={form.category}
            onChange={(e) => set("category")(e.target.value)}
            placeholder="e.g. Chatbots, Image Generation"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Image / Logo URL" hint="Optional. Falls back to a gradient icon.">
          <input
            type="url"
            value={form.image_url}
            onChange={(e) => set("image_url")(e.target.value)}
            placeholder="https://.../logo.png"
            className={inputClass}
          />
        </Field>
        <Field label="Tags" hint="Comma-separated, e.g. LLM, RAG, Free">
          <input
            type="text"
            value={form.tagsText}
            onChange={(e) => set("tagsText")(e.target.value)}
            placeholder="LLM, Free, API"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Featured</p>
          <p className="text-xs text-[#6b7280]">Show in the featured slot.</p>
        </div>
        <Toggle checked={form.featured} onChange={set("featured")} label="Featured" />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Published</p>
          <p className="text-xs text-[#6b7280]">Only published tools appear publicly.</p>
        </div>
        <Toggle checked={form.published} onChange={set("published")} label="Published" />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} disabled={saving} className={btnSecondary}>
          Cancel
        </button>
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Create Tool"}
        </button>
      </div>
    </form>
  );
}
