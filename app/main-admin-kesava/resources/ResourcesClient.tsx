"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  BarChart2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ResourceRow, ResourceItemRow } from "@/lib/supabase/schema";
import {
  createResource,
  updateResource,
  deleteResource,
  toggleResourcePublish,
  toggleResourceFeatured,
  createResourceItem,
  updateResourceItem,
  deleteResourceItem,
} from "../actions/resources";

type ExtendedResource = ResourceRow & {
  items: (ResourceItemRow & { clicks?: number })[];
  totalClicks: number;
};

export default function ResourcesClient({
  resources,
}: {
  resources: ExtendedResource[];
}) {
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState<ExtendedResource | null>(null);
  const [editingItem, setEditingItem] = useState<ResourceItemRow | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.slug.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);

    let res;
    if (selectedResource) {
      res = await updateResource(selectedResource.id, formData);
    } else {
      res = await createResource(formData);
    }

    if (!res.success) {
      setErrorMsg(res.error);
    } else {
      setShowResourceModal(false);
      setSelectedResource(null);
      window.location.reload();
    }
  };

  const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    if (selectedResource) {
      formData.append("resource_id", selectedResource.id);
    }

    let res;
    if (editingItem) {
      res = await updateResourceItem(editingItem.id, formData);
    } else {
      res = await createResourceItem(formData);
    }

    if (!res.success) {
      setErrorMsg(res.error);
    } else {
      setShowItemModal(false);
      setEditingItem(null);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Resource Management</h1>
          <p className="text-sm text-[#9ca3af]">Create, edit, and organize creator resources.</p>
        </div>

        <button
          onClick={() => {
            setSelectedResource(null);
            setShowResourceModal(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF6B2C] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#FF4F1F]"
        >
          <Plus className="h-4 w-4" /> Create Resource
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-lg border border-white/10 bg-[#0f1017] px-3.5 py-2">
        <Search className="mr-2 h-4 w-4 text-[#9ca3af]" />
        <input
          type="text"
          placeholder="Search resources by title, slug, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder-[#9ca3af] focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f1017]">
        <table className="w-full text-left text-sm text-[#9ca3af]">
          <thead className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase text-white">
            <tr>
              <th className="px-4 py-3.5">Resource Title</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Items</th>
              <th className="px-4 py-3.5">Total Clicks</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((r) => {
              const isExpanded = expandedId === r.id;
              return (
                <tbody key={r.id} className="divide-y divide-white/10">
                  <tr className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{r.title}</div>
                      <div className="text-xs text-[#6b7280]">/resources/{r.slug}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded bg-white/[0.06] px-2 py-0.5 text-xs text-white">
                        {r.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">{r.items.length} items</td>
                    <td className="px-4 py-4 text-emerald-400 font-mono font-medium">
                      <span className="inline-flex items-center gap-1">
                        <BarChart2 className="w-3.5 h-3.5" /> {r.totalClicks}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            await toggleResourcePublish(r.id, !r.published);
                            window.location.reload();
                          }}
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${
                            r.published
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {r.published ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {r.published ? "Published" : "Draft"}
                        </button>

                        <button
                          onClick={async () => {
                            await toggleResourceFeatured(r.id, !r.featured);
                            window.location.reload();
                          }}
                          className={`p-1 rounded ${
                            r.featured ? "text-amber-400" : "text-[#6b7280] hover:text-white"
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/resources/${r.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#9ca3af] hover:text-white"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedResource(r);
                            setShowResourceModal(true);
                          }}
                          className="p-1.5 text-[#9ca3af] hover:text-white"
                          title="Edit Resource"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : r.id)}
                          className="p-1.5 text-[#FF6B2C] hover:text-[#FF4F1F] font-semibold text-xs inline-flex items-center gap-0.5"
                        >
                          Items {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete resource "${r.title}"?`)) {
                              await deleteResource(r.id);
                              window.location.reload();
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-[#05060a]/80">
                      <td colSpan={6} className="px-6 py-4 border-b border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
                            Items inside {r.title} ({r.items.length})
                          </h4>
                          <button
                            onClick={() => {
                              setSelectedResource(r);
                              setEditingItem(null);
                              setShowItemModal(true);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-[#FF6B2C]/20 text-[#FF6B2C] border border-[#FF6B2C]/30 hover:bg-[#FF6B2C] hover:text-white transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Item
                          </button>
                        </div>

                        {r.items.length > 0 ? (
                          <div className="space-y-2">
                            {r.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-[#0f1017] border border-white/10 text-xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                                    {item.type}
                                  </span>
                                  <span className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                                    {item.title}
                                  </span>
                                  <span className="text-[#6b7280] truncate max-w-xs">{item.url}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-emerald-400 font-mono text-[11px]">
                                    {item.clicks || 0} clicks
                                  </span>
                                  <button
                                    onClick={() => {
                                      setSelectedResource(r);
                                      setEditingItem(item);
                                      setShowItemModal(true);
                                    }}
                                    className="p-1 text-[#9ca3af] hover:text-white"
                                    title="Edit item"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Delete item "${item.title}"?`)) {
                                        await deleteResourceItem(item.id);
                                        window.location.reload();
                                      }
                                    }}
                                    className="p-1 text-rose-400 hover:text-rose-300"
                                    title="Delete item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[#6b7280] italic">
                            No items added to this resource yet. Click &quot;Add Item&quot; to populate links.
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Resource Edit/Create Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0f1017] p-6 text-white shadow-2xl">
            <h2 className="text-lg font-bold mb-4">
              {selectedResource ? "Edit Resource" : "Create Resource"}
            </h2>
            {errorMsg && <p className="text-xs text-rose-400 mb-3">{errorMsg}</p>}
            <form onSubmit={handleSaveResource} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#9ca3af]">Title *</label>
                <input
                  name="title"
                  defaultValue={selectedResource?.title || ""}
                  required
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Primary Slug *</label>
                  <input
                    name="slug"
                    defaultValue={selectedResource?.slug || ""}
                    required
                    placeholder="airllm"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Aliases (comma separated)</label>
                  <input
                    name="aliases"
                    defaultValue={selectedResource?.aliases?.join(", ") || ""}
                    placeholder="air-llm, airllm-guide"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9ca3af]">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedResource?.description || ""}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Category</label>
                  <input
                    name="category"
                    defaultValue={selectedResource?.category || "AI"}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Thumbnail Image</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="res_thumbnail_url"
                      name="thumbnail_url"
                      defaultValue={selectedResource?.thumbnail_url || ""}
                      placeholder="https://... or upload"
                      className="w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                    />
                    <label className="flex-shrink-0 cursor-pointer rounded-lg border border-[#FF6B2C]/40 bg-[#FF6B2C]/10 px-3 py-2 text-xs font-semibold text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append("file", file);
                          fd.append("bucket", "resources");
                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: fd,
                            });
                            const data = await res.json();
                            if (data.url) {
                              const input = document.getElementById("res_thumbnail_url") as HTMLInputElement;
                              if (input) input.value = data.url;
                            } else {
                              alert(data.error || "Upload failed");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Upload error");
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    value="true"
                    defaultChecked={selectedResource?.published ?? true}
                    className="rounded border-white/10 text-[#FF6B2C]"
                  />
                  Published
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    value="true"
                    defaultChecked={selectedResource?.featured ?? false}
                    className="rounded border-white/10 text-[#FF6B2C]"
                  />
                  Featured
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowResourceModal(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-[#9ca3af] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#FF6B2C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#FF4F1F]"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Add/Edit Modal */}
      {showItemModal && selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0f1017] p-6 text-white shadow-2xl">
            <h2 className="text-lg font-bold mb-4">
              {editingItem ? "Edit Resource Item" : "Add Item to " + selectedResource.title}
            </h2>
            {errorMsg && <p className="text-xs text-rose-400 mb-3">{errorMsg}</p>}
            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Type</label>
                  <select
                    name="type"
                    defaultValue={editingItem?.type || "github"}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                  >
                    <option value="github">GitHub</option>
                    <option value="document">Document</option>
                    <option value="video">Video</option>
                    <option value="website">Website</option>
                    <option value="download">Download</option>
                    <option value="article">Article</option>
                    <option value="tool">Tool</option>
                    <option value="course">Course</option>
                    <option value="social">Social</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Title *</label>
                  <input
                    name="title"
                    defaultValue={editingItem?.title || ""}
                    required
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9ca3af]">URL *</label>
                <input
                  name="url"
                  defaultValue={editingItem?.url || ""}
                  required
                  placeholder="https://..."
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9ca3af]">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Sort Order</label>
                  <input
                    type="number"
                    name="sort_order"
                    defaultValue={editingItem?.sort_order ?? 0}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af]">Thumbnail Image</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="item_thumbnail_url"
                      name="thumbnail_url"
                      defaultValue={editingItem?.thumbnail_url || ""}
                      placeholder="https://... or upload"
                      className="w-full rounded-lg border border-white/10 bg-[#05060a] p-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]"
                    />
                    <label className="flex-shrink-0 cursor-pointer rounded-lg border border-[#FF6B2C]/40 bg-[#FF6B2C]/10 px-3 py-2 text-xs font-semibold text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append("file", file);
                          fd.append("bucket", "resources");
                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: fd,
                            });
                            const data = await res.json();
                            if (data.url) {
                              const input = document.getElementById("item_thumbnail_url") as HTMLInputElement;
                              if (input) input.value = data.url;
                            } else {
                              alert(data.error || "Upload failed");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Upload error");
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    value="true"
                    defaultChecked={editingItem?.published ?? true}
                    className="rounded border-white/10 text-[#FF6B2C]"
                  />
                  Published
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowItemModal(false);
                    setEditingItem(null);
                  }}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-[#9ca3af] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#FF6B2C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#FF4F1F]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
