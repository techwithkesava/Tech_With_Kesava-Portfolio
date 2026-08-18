"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { VideoRow } from "@/lib/supabase/schema";
import {
  createVideo,
  deleteVideo,
  toggleVideoFeatured,
  toggleVideoPublish,
  updateVideo,
  type VideoInput,
} from "../actions/videos";
import AdminPageHeader from "../components/AdminPageHeader";
import VideoForm from "../components/VideoForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import Pill from "../components/Pill";
import StatusMessage from "../components/StatusMessage";
import Modal from "../components/Modal";
import Toggle from "../components/Toggle";
import { btnGhost, btnPrimary } from "../components/styles";

type Notice = { type: "success" | "error"; text: string } | null;

export default function VideosManager({
  initialItems,
}: {
  initialItems: VideoRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<VideoRow[]>(initialItems);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<VideoRow | null>(null);
  const [deleting, setDeleting] = useState<VideoRow | null>(null);
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

  const handleSave = async (input: VideoInput) => {
    setSaving(true);
    const res = editing
      ? await updateVideo(editing.id, input)
      : await createVideo(input);
    setSaving(false);
    if (res.success) {
      setCreating(false);
      setEditing(null);
      flash("success", editing ? "Video updated." : "Video added.");
      router.refresh();
    } else {
      flash("error", res.error);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    const res = await deleteVideo(deleting.id);
    setSaving(false);
    setDeleting(null);
    if (res.success) {
      flash("success", "Video deleted.");
      router.refresh();
    } else {
      flash("error", res.error);
    }
  };

  const handlePublish = async (item: VideoRow) => {
    setBusyId(item.id);
    const res = await toggleVideoPublish(item.id, !item.published);
    setBusyId(null);
    if (res.success) router.refresh();
    else flash("error", res.error);
  };

  const handleFeatured = async (item: VideoRow) => {
    setBusyId(item.id);
    const res = await toggleVideoFeatured(item.id, !item.featured);
    setBusyId(null);
    if (res.success) router.refresh();
    else flash("error", res.error);
  };

  return (
    <div>
      <AdminPageHeader
        title="Videos"
        subtitle="YouTube videos that play inline on the website."
        action={
          <button onClick={() => { setCreating(true); setEditing(null); }} className={btnPrimary}>
            <Plus className="h-4 w-4" /> Add Video
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
          title="No videos yet"
          message="Add a YouTube video and viewers can watch it right on the website."
          action={
            <button onClick={() => setCreating(true)} className={btnPrimary}>
              <Plus className="h-4 w-4" /> Add Video
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111118]">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#6b7280]">
                <th className="px-4 py-3 font-medium">Video</th>
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
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-[60px] flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                        <img
                          src={`https://i.ytimg.com/vi/${item.youtube_video_id}/mqdefault.jpg`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="max-w-[280px] truncate font-medium text-white">{item.title}</p>
                        <p className="max-w-[280px] truncate text-xs text-[#6b7280]">{item.youtube_url}</p>
                      </div>
                    </div>
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
        title={editing ? `Edit: ${editing.title}` : "Add Video"}
        wide
      >
        <VideoForm
          initial={editing}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSave={handleSave}
          saving={saving}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Delete video"
        message={`Are you sure you want to delete "${deleting?.title}"? This cannot be undone.`}
        loading={saving}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
