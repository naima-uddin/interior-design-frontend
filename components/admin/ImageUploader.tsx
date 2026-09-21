"use client";

// Single-image uploader: drag/click to pick a file, uploads straight to
// Cloudinary via the backend (/api/upload), shows a preview + progress state.
// Value is always the plain { url } shape the storefront expects.

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/adminApi";

export default function ImageUploader({
  value,
  onChange,
  folder,
  label,
}: {
  value?: { url: string } | null;
  onChange: (image: { url: string }) => void;
  folder: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = () => inputRef.current?.click();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const url = await uploadImage(file, folder);
      onChange({ url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {label && <label className="eyebrow mb-2 block">{label}</label>}
      <div
        onClick={pick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className="group relative flex aspect-4/3 w-full max-w-56 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-ink/25 bg-cream-200 transition hover:border-olive"
      >
        {value?.url ? (
          <Image src={value.url} alt="" fill sizes="220px" className="object-cover" />
        ) : (
          <span className="eyebrow px-4 text-center text-stone-400">
            Click or drop image
          </span>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-cream/80 backdrop-blur-sm">
            <span className="eyebrow">Uploading…</span>
          </div>
        )}
        {value?.url && !busy && (
          <div className="absolute inset-0 flex items-end justify-end bg-olive-800/0 p-2 opacity-0 transition group-hover:bg-olive-800/20 group-hover:opacity-100">
            <span className="eyebrow rounded-full bg-cream-100 px-3 py-1.5 !text-[9px]">
              Replace
            </span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
