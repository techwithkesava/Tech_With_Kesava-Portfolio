"use client";

import { useState } from "react";
import type { BlogRow } from "@/lib/supabase/schema";
import type { BlogInput } from "../actions/blogs";
import Field from "./Field";
import Toggle from "./Toggle";
import { btnPrimary, btnSecondary, inputClass, textareaClass } from "./styles";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export default function BlogForm({
  initial,
  onCancel,
  onSave,
  saving,
}: {
  initial?: BlogRow | null;
  onCancel: () => void;
  onSave: (input: BlogInput) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    cover_image_url: initial?.cover_image_url ?? "",
    category: initial?.category ?? "General",
    tagsText: (initial?.tags ?? []).join(", "),
    author: initial?.author ?? "Kesava Kantipudi",
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const autoSlug = form.slug.trim() || slugify(form.title);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.content.trim()) next.content = "Content is required.";
    if (!SLUG_PATTERN.test(autoSlug)) next.slug = "Slug may only contain lowercase letters, numbers, and hyphens.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      title: form.title,
      slug: autoSlug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image_url: form.cover_image_url,
      category: form.category,
      tags: form.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      author: form.author,
      featured: form.featured,
      published: form.published,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" error={errors.title}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title")(e.target.value)}
            placeholder="Blog post title"
            className={inputClass}
          />
        </Field>
        <Field label="Slug" error={errors.slug} hint={`URL: /blog/${autoSlug || "..."}`}>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set("slug")(e.target.value)}
            placeholder="my-blog-post"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea
          value={form.excerpt}
          onChange={(e) => set("excerpt")(e.target.value)}
          placeholder="Short summary shown on the blog cards."
          className={textareaClass}
          rows={2}
        />
      </Field>

      <Field label="Content (HTML)" error={errors.content} hint="Accepts HTML — headings, paragraphs, lists, code.">
        <textarea
          value={form.content}
          onChange={(e) => set("content")(e.target.value)}
          placeholder="<p>Write your article here...</p>"
          className={textareaClass}
          rows={12}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cover Image URL" hint="Optional.">
          <input
            type="url"
            value={form.cover_image_url}
            onChange={(e) => set("cover_image_url")(e.target.value)}
            placeholder="https://.../cover.jpg"
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <input
            type="text"
            value={form.category}
            onChange={(e) => set("category")(e.target.value)}
            placeholder="e.g. AI Engineering"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tags" hint="Comma-separated.">
          <input
            type="text"
            value={form.tagsText}
            onChange={(e) => set("tagsText")(e.target.value)}
            placeholder="RAG, LLM, Production"
            className={inputClass}
          />
        </Field>
        <Field label="Author">
          <input
            type="text"
            value={form.author}
            onChange={(e) => set("author")(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Featured</p>
          <p className="text-xs text-[#6b7280]">Show as the featured post.</p>
        </div>
        <Toggle checked={form.featured} onChange={set("featured")} label="Featured" />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Published</p>
          <p className="text-xs text-[#6b7280]">Only published blogs appear on /blog.</p>
        </div>
        <Toggle checked={form.published} onChange={set("published")} label="Published" />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} disabled={saving} className={btnSecondary}>
          Cancel
        </button>
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Create Blog"}
        </button>
      </div>
    </form>
  );
}
