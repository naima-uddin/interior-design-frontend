"use client";

// Multi-image gallery editor: a grid of ImageUploader slots plus an "Add"
// tile. Backed by an array of { url } objects, matching the storefront shape.

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

  const setAt = (i: number, img: { url: string }) => {
    const next = [...images];
    next[i] = img;
    onChange(next);
  };
  const removeAt = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const addSlot = () => onChange([...images, { url: "" }]);

  return (
    <div>
      {label && <label className="eyebrow mb-2 block">{label}</label>}
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative">
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
