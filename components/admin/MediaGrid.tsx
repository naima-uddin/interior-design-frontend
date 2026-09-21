"use client";

// Shared Cloudinary media grid — folder tabs, thumbnails, cursor "Load more".
// Used standalone on the Media Library page, and inside MediaPickerModal when
// choosing an existing image for a form field.

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { listMedia, deleteMedia, type MediaItem, ApiError } from "@/lib/adminApi";
import { RESOURCES } from "@/lib/adminResources";

const FOLDERS = [
  { key: "all", label: "All" },
  ...Array.from(new Set(RESOURCES.map((r) => r.uploadFolder))).map((f) => ({
    key: f,
    label: f[0].toUpperCase() + f.slice(1),
  })),
];

export default function MediaGrid({
  onSelect,
  selectable,
  deletable = true,
}: {
  onSelect?: (item: MediaItem) => void;
  selectable?: boolean;
  deletable?: boolean;
}) {
  const [folder, setFolder] = useState("all");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (f: string, after?: string | null, replace = false) => {
    setLoading(true);
    setError("");
    try {
      const data = await listMedia(f, after);
      setItems((prev) => (replace ? data.items : [...prev, ...data.items]));
      setCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(folder, null, true);
  }, [folder, load]);

  const remove = async (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this image from Cloudinary? This can't be undone.")) return;
    try {
      await deleteMedia(item.publicId);
      setItems((prev) => prev.filter((i) => i.publicId !== item.publicId));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {FOLDERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFolder(f.key)}
            className={`eyebrow rounded-full border px-4 py-2 !tracking-[0.14em] transition ${
              folder === f.key
                ? "border-olive bg-olive !text-cream-100"
                : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((item) => (
          <button
            key={item.publicId}
            type="button"
            onClick={() => selectable && onSelect?.(item)}
            className={`group relative aspect-square overflow-hidden rounded-xl bg-cream-200 ${
              selectable ? "cursor-pointer ring-1 ring-ink/10 hover:ring-2 hover:ring-olive" : ""
            }`}
          >
            <Image
              src={item.url}
              alt=""
              fill
              sizes="180px"
              className="object-cover transition group-hover:scale-105"
            />
            {deletable && (
              <span
                onClick={(e) => remove(item, e)}
                role="button"
                aria-label="Delete"
                className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-ink/70 text-xs text-cream-100 opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
              >
                ×
              </span>
            )}
            {selectable && (
              <span className="absolute inset-0 flex items-end bg-olive-800/0 p-2 opacity-0 transition group-hover:bg-olive-800/25 group-hover:opacity-100">
                <span className="eyebrow rounded-full bg-cream-100 px-2.5 py-1 !text-[8px]">
                  Select
                </span>
              </span>
            )}
          </button>
        ))}
        {items.length === 0 && !loading && (
          <p className="col-span-full py-10 text-center text-sm text-stone-400">
            No images in this folder yet.
          </p>
        )}
      </div>

      {cursor && (
        <div className="mt-6 text-center">
          <button
            onClick={() => load(folder, cursor)}
            disabled={loading}
            className="eyebrow rounded-full border border-ink/15 px-6 py-3 text-ink/70 transition hover:border-ink/40 hover:text-ink disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
