"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { BlogRow } from "@/lib/supabase/schema";
import {
  createBlog,
  deleteBlog,
  toggleBlogFeatured,
  toggleBlogPublish,
  updateBlog,
  type BlogInput,
} from "../actions/blogs";
import AdminPageHeader from "../components/AdminPageHeader";
import BlogForm from "../components/BlogForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import Pill from "../components/Pill";
import StatusMessage from "../components/StatusMessage";
import Modal from "../components/Modal";
import Toggle from "../components/Toggle";
import { btnGhost, btnPrimary } from "../components/styles";

type Notice = { type: "success" | "error"; text: string } | null;

export default function BlogsManager({
  initialItems,
}: {
  initialItems: BlogRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<BlogRow[]>(initialItems);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<BlogRow | null>(null);
  const [deleting, setDeleting] = useState<BlogRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const flash = (type: "success" | "error", text: string) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 4000);
  };

  const handleSave = async (input: BlogInput) => {
    setSaving(true);
    const res = editing
      ? await updateBlog(editing.id, input)
      : await createBlog(input);
    setSaving(false);
    if (res.success) {
      setCreating(false);
      setEditing(null);
      flash("success", editing ? "Blog updated." : "Blog created.");
      router.refresh();
    } else {
      flash("error", res.error);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    const res = await deleteBlog(deleting.id);
    setSaving(false);
    setDeleting(null);
    if (res.success) {
      flash("success", "Blog deleted.");
      router.refresh();
    } else {
      flash("error", res.error);
    }
  };

  const handlePublish = async (item: BlogRow) => {
    setBusyId(item.id);
    const res = await toggleBlogPublish(item.id, !item.published);
    setBusyId(null);
    if (res.success) router.refresh();
    else flash("error", res.error);
  };

  const handleFeatured = async (item: BlogRow) => {
    setBusyId(item.id);
    const res = await toggleBlogFeatured(item.id, !item.featured);
    setBusyId(null);
    if (res.success) router.refresh();
    else flash("error", res.error);
  };

  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        subtitle="Manage blog posts shown on /blog."
        action={
          <button onClick={() => { setCreating(true); setEditing(null); }} className={btnPrimary}>
            <Plus className="h-4 w-4" /> New Blog
          </button>
        }
      />

      {notice && (
        <div className="mb-5">
          <StatusMessage type={notice.type}>{notice.text}</StatusMessage>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          title="No blogs yet"
          message="Write your first blog post and it will appear on /blog once published."
          action={
            <button onClick={() => setCreating(true)} className={btnPrimary}>
              <Plus className="h-4 w-4" /> New Blog
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111118]">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#6b7280]">
                <th className="px-4 py-3 font-medium">Post</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="max-w-[320px] truncate font-medium text-white">{item.title}</p>
                    <p className="truncate text-xs text-[#6b7280]">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Not published"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-[#9ca3af]">{item.slug}</span>
                  </td>
                  <td className="px-4 py-3 text-[#9ca3af]">{item.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={item.featured}
                        disabled={busyId === item.id}
                        onChange={() => handleFeatured(item)}
                        label={`Featured: ${item.title}`}
                      />
                      {item.featured && <Pill kind="featured">Featured</Pill>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={item.published}
                        disabled={busyId === item.id}
                        onChange={() => handlePublish(item)}
                        label={`Published: ${item.title}`}
                      />
                      <Pill kind={item.published ? "published" : "draft"}>
                        {item.published ? "Published" : "Draft"}
                      </Pill>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        className={`${btnGhost} hover:!text-blue-400`}
                        onClick={() => setEditing(item)}
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        className={`${btnGhost} hover:!text-rose-400`}
                        onClick={() => setDeleting(item)}
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={creating || !!editing}
        onClose={() => { setCreating(false); setEditing(null); }}
        title={editing ? `Edit: ${editing.title}` : "New Blog Post"}
        wide
      >
        <BlogForm
          initial={editing}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSave={handleSave}
          saving={saving}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Delete blog"
        message={`Are you sure you want to delete "${deleting?.title}"? This cannot be undone.`}
        loading={saving}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
