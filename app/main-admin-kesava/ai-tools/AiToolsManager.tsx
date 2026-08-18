"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { AiToolRow } from "@/lib/supabase/schema";
import {
  createAiTool,
  deleteAiTool,
  toggleAiToolFeatured,
  toggleAiToolPublish,
  updateAiTool,
  type AiToolInput,
} from "../actions/ai-tools";
import AdminPageHeader from "../components/AdminPageHeader";
import AiToolForm from "../components/AiToolForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import Pill from "../components/Pill";
import StatusMessage from "../components/StatusMessage";
import Modal from "../components/Modal";
import Toggle from "../components/Toggle";
import { btnGhost, btnPrimary } from "../components/styles";

type Notice = { type: "success" | "error"; text: string } | null;

export default function AiToolsManager({
  initialItems,
}: {
  initialItems: AiToolRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<AiToolRow[]>(initialItems);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<AiToolRow | null>(null);
  const [deleting, setDeleting] = useState<AiToolRow | null>(null);
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

  const handleSave = async (input: AiToolInput) => {
    setSaving(true);
    const res = editing
      ? await updateAiTool(editing.id, input)
      : await createAiTool(input);
    setSaving(false);
    if (res.success) {
      setCreating(false);
      setEditing(null);
      flash("success", editing ? "AI tool updated." : "AI tool created.");
      router.refresh();
    } else {
      flash("error", res.error);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    const res = await deleteAiTool(deleting.id);
    setSaving(false);
    setDeleting(null);
    if (res.success) {
      flash("success", "AI tool deleted.");
      router.refresh();
    } else {
      flash("error", res.error);
    }
  };

  const handlePublish = async (item: AiToolRow) => {
    setBusyId(item.id);
    const res = await toggleAiToolPublish(item.id, !item.published);
    setBusyId(null);
    if (res.success) router.refresh();
    else flash("error", res.error);
  };

  const handleFeatured = async (item: AiToolRow) => {
    setBusyId(item.id);
    const res = await toggleAiToolFeatured(item.id, !item.featured);
    setBusyId(null);
    if (res.success) router.refresh();
    else flash("error", res.error);
  };

  return (
    <div>
      <AdminPageHeader
        title="AI Tools"
        subtitle="Manage the AI tools shown on the public website."
        action={
          <button onClick={() => { setCreating(true); setEditing(null); }} className={btnPrimary}>
            <Plus className="h-4 w-4" /> New AI Tool
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
          title="No AI tools yet"
          message="Create your first AI tool and it will appear on the public website once published."
          action={
            <button onClick={() => setCreating(true)} className={btnPrimary}>
              <Plus className="h-4 w-4" /> New AI Tool
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111118]">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#6b7280]">
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Tags</th>
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
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt=""
                          className="h-9 w-9 flex-shrink-0 rounded-lg border border-white/10 object-cover"
                        />
                      ) : (
                        <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{item.name}</p>
                        <p className="truncate text-xs text-[#6b7280]">{item.url}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#9ca3af]">{item.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-[#9ca3af]">
                          {t}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-[11px] text-[#6b7280]">+{item.tags.length - 2}</span>
                      )}
                      {item.tags.length === 0 && <span className="text-[11px] text-[#6b7280]">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={item.featured}
                        disabled={busyId === item.id}
                        onChange={() => handleFeatured(item)}
                        label={`Featured: ${item.name}`}
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
                        label={`Published: ${item.name}`}
                      />
                      <Pill kind={item.published ? "published" : "draft"}>
                        {item.published ? "Published" : "Draft"}
                      </Pill>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        className={`${btnGhost} !text-[#9ca3af] hover:!text-blue-400`}
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
        title={editing ? `Edit: ${editing.name}` : "New AI Tool"}
        wide
      >
        <AiToolForm
          initial={editing}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSave={handleSave}
          saving={saving}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Delete AI tool"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
        loading={saving}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
