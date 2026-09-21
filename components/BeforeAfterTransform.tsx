"use client";

// "Real-life transformations" — a drag-to-reveal before/after comparison,
// mirroring the reference: a labeled pink pill eyebrow, centered heading and
// copy, a draggable image slider, then two confirmation bullet points.

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

const BEFORE = "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80";
const AFTER = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80";

export default function BeforeAfterTransform() {
  const [pos, setPos] = useState(50);
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
    <section className="bg-ink text-cream-100">
      <div className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-8 sm:py-16">
        <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-clay/15 px-4 py-1.5 !text-clay">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Real-Life Transformations
        </span>
        <h2 className="font-serif mt-5 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
          Drag to experience the transformation
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] font-light leading-relaxed text-cream-100/70">
          Move the slider to compare the original space with the completed
          interior. See how intelligent planning, custom detailing, layered
          lighting, and carefully selected materials can transform an
          ordinary room into a polished and highly functional luxury
          interior.
        </p>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative mt-12 aspect-[16/9] w-full touch-none select-none overflow-hidden rounded-2xl"
        >
          {/* After (base layer) */}
          <Image src={AFTER} alt="After the transformation" fill sizes="1100px" className="object-cover" draggable={false} />
          <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-100">
            After
          </span>

          {/* Before (clipped layer) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image src={BEFORE} alt="Before the transformation" fill sizes="1100px" className="object-cover" draggable={false} />
            <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-100">
              Before
            </span>
          </div>

          {/* Handle */}
          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-cream-100"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-cream-100 bg-clay text-cream-100 shadow-lg">
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
          {[
            "A personalized concept developed around the client's lifestyle, room dimensions, and aesthetic preferences.",
            "A finished space executed according to the approved layout, materials, furniture details, and functional requirements.",
          ].map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl border border-cream-100/15 px-5 py-4">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-clay text-[11px] text-cream-100">✓</span>
              <p className="text-sm font-light leading-relaxed text-cream-100/80">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
