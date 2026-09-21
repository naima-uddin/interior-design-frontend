"use client";

// Visual editor for the homepage hotspot scene: numbered dots sit directly on
// the scene image and can be dragged to reposition (updates x/y % live).
// Click empty space on the image to add a new point; title/body for each
// point are edited in the list below.

import { useRef, useState } from "react";
import Image from "next/image";

type Point = { x: number; y: number; title: string; body: string };

export default function HotspotPositionEditor({
  image,
  points,
  onChange,
}: {
  image?: { url: string };
  points: Point[];
  onChange: (points: Point[]) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const pctFromEvent = (e: { clientX: number; clientY: number }) => {
    const el = containerRef.current;
    if (!el) return { x: 50, y: 50 };
    const rect = el.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  };

  const updatePoint = (i: number, patch: Partial<Point>) => {
    onChange(points.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  };

  const removePoint = (i: number) => onChange(points.filter((_, idx) => idx !== i));

  const addPointAt = (e: React.MouseEvent) => {
    const { x, y } = pctFromEvent(e);
    onChange([...points, { x, y, title: "New point", body: "" }]);
  };

  const onDotPointerDown = (i: number) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragIndex(i);
  };

  const onContainerPointerMove = (e: React.PointerEvent) => {
    if (dragIndex === null) return;
    const { x, y } = pctFromEvent(e);
    updatePoint(dragIndex, { x, y });
  };

  const stopDrag = () => setDragIndex(null);

  return (
    <div>
      <label className="eyebrow mb-2 block">
        Hotspot points — drag a dot to move it, click empty space to add one
      </label>

      <div
        ref={containerRef}
        onClick={addPointAt}
        onPointerMove={onContainerPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
        className="relative aspect-16/7 w-full max-w-2xl touch-none select-none overflow-hidden rounded-2xl border border-ink/15 bg-cream-200"
        style={{ cursor: dragIndex === null ? "crosshair" : "grabbing" }}
      >
        {image?.url && (
          <Image
            src={image.url}
            alt=""
            fill
            sizes="700px"
            className="pointer-events-none object-cover"
            draggable={false}
          />
        )}

        {points.map((p, i) => (
          <button
            key={i}
            type="button"
            onPointerDown={onDotPointerDown(i)}
            onClick={(e) => e.stopPropagation()}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full border-2 border-white bg-clay text-[11px] font-semibold text-cream-100 shadow-lg active:cursor-grabbing"
            aria-label={`Move point ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-stone-400">
        {points.length} point{points.length === 1 ? "" : "s"} · positions save when you click
        &quot;Save all&quot;
      </p>

      <div className="mt-5 space-y-3">
        {points.map((p, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-cream-100 p-4">
            <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-clay text-[11px] font-semibold text-cream-100">
              {i + 1}
            </span>
            <div className="grid flex-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-wide text-stone-400">
                  Title
                </label>
                <input
                  value={p.title}
                  onChange={(e) => updatePoint(i, { title: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 text-sm text-ink focus:border-olive focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-wide text-stone-400">
                  Position (%)
                </label>
                <p className="rounded-lg border border-transparent px-3 py-2 text-sm text-stone-400">
                  x {p.x}, y {p.y}
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] uppercase tracking-wide text-stone-400">
                  Body
                </label>
                <textarea
                  value={p.body}
                  onChange={(e) => updatePoint(i, { body: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 text-sm text-ink focus:border-olive focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removePoint(i)}
              aria-label="Remove point"
              className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/60 transition hover:border-red-300 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
