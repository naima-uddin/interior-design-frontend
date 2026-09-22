"use client";

// "Real-life transformations" — a drag-to-reveal before/after comparison,
// mirroring the reference: a labeled pink pill eyebrow, centered heading and
// copy, a draggable image slider, then two confirmation bullet points.

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { BEFORE_AFTER } from "@/lib/data";

type BeforeAfterData = {
  title?: string;
  intro?: string;
  beforeImage?: { url: string };
  afterImage?: { url: string };
  points?: { text: string }[];
};

export default function BeforeAfterTransform({ data }: { data?: BeforeAfterData | null }) {
  const d = {
    title: data?.title || BEFORE_AFTER.title,
    intro: data?.intro || BEFORE_AFTER.intro,
    beforeImage: data?.beforeImage?.url ? data.beforeImage : BEFORE_AFTER.beforeImage,
    afterImage: data?.afterImage?.url ? data.afterImage : BEFORE_AFTER.afterImage,
    points: data?.points?.length ? data.points : BEFORE_AFTER.points,
  };
  const [pos, setPos] = useState(30);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="bg-olive-800 text-cream-100">
      <div className="mx-auto max-w-[1100px] px-5 py-6 text-center sm:px-8 sm:py-8">

        <h2 className="font-serif mt-2 text-2xl font-semibold uppercase tracking-tight sm:text-3xl md:text-4xl">
          {d.title}
        </h2>
        <p className="mx-auto mt-2 max-w-4xl text-sm font-light leading-relaxed text-cream-100/70 sm:text-[15px]">
          {d.intro}
        </p>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative mt-4 aspect-21/9 w-full touch-none select-none overflow-hidden rounded-2xl sm:mt-2"
        >
          {/* After (base layer) */}
          <Image src={d.afterImage.url} alt="After the transformation" fill sizes="(min-width:1100px) 1100px, 100vw" className="object-cover" draggable={false} />
          <span className="absolute right-2 top-2 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream-100 sm:right-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-[11px]">
            After
          </span>

          {/* Before (clipped layer) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image src={d.beforeImage.url} alt="Before the transformation" fill sizes="(min-width:1100px) 1100px, 100vw" className="object-cover" draggable={false} />
            <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream-100 sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-[11px]">
              Before
            </span>
          </div>

          {/* Handle */}
          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-cream-100"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-cream-100 bg-clay text-cream-100 shadow-lg sm:h-11 sm:w-11">
              <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 hidden text-left sm:grid sm:grid-cols-2 sm:gap-6">
          {d.points.map((p) => (
            <div key={p.text} className="flex items-start gap-3 rounded-2xl border border-cream-100/15 px-5 py-4">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-clay text-[11px] text-cream-100">✓</span>
              <p className="text-sm font-light leading-relaxed text-cream-100/80">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
