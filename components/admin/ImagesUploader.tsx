"use client";

// Multi-image gallery editor: a grid of ImageUploader slots plus an "Add"
// tile. Backed by an array of { url } objects, matching the storefront shape.

import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default function ImagesUploader({
  value,
  onChange,
  folder,
  label,
}: {
  value?: { url: string }[];
  onChange: (images: { url: string }[]) => void;
  folder: string;
  label?: string;
}) {
  const images = value?.length ? value : [];
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const setAt = (i: number, img: { url: string }) => {
    const next = [...images];
    next[i] = img;
    onChange(next);
  };
  const removeAt = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const addSlot = () => onChange([...images, { url: "" }]);

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div>
      {label && <label className="eyebrow mb-2 block">{label}</label>}
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => {
              e.preventDefault();
              if (i !== overIndex) setOverIndex(i);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex !== null) reorder(dragIndex, i);
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            className={`relative cursor-grab transition active:cursor-grabbing ${
              dragIndex === i ? "opacity-40" : ""
            } ${overIndex === i && dragIndex !== null && dragIndex !== i ? "ring-2 ring-olive ring-offset-2" : ""}`}
          >
            <ImageUploader value={img} onChange={(v) => setAt(i, v)} folder={folder} />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-cream-100 shadow"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSlot}
          className="flex aspect-4/3 w-full max-w-56 min-w-32 items-center justify-center rounded-xl border border-dashed border-ink/25 text-stone-400 transition hover:border-olive hover:text-olive"
        >
          + Add image
        </button>
      </div>
    </div>
  );
}
