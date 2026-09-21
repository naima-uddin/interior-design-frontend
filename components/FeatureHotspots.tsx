"use client";

// Interactive "explore the space" section. A large interior photo with small
// pulsing dots; hovering or clicking a dot reveals a popover with that detail.
// The active detail also mirrors into a caption below on small screens.

import { useState } from "react";
import Image from "next/image";
import { HOTSPOT_SCENE } from "@/lib/data";

type Scene = typeof HOTSPOT_SCENE;

export default function FeatureHotspots({ scene }: { scene?: Scene | null }) {
  const { eyebrow, title, intro, image, points } = scene ?? HOTSPOT_SCENE;
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="bg-[#e7e0d5]">
      <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed text-stone">
            {intro}
          </p>
        </div>

        {/* Image with hotspots */}
        <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-cream-200 sm:aspect-[16/7]">
          <Image
            src="/79837bd2-762f-42a2-9bed-e38d9ea6d0e7.png"
            alt="Interior scene with interactive details"
            fill
            sizes="(min-width:1024px) 1200px, 100vw"
            className="object-cover"
          />
          {/* subtle darkening so white dots and popovers read clearly */}
          <div className="absolute inset-0 bg-[#383927]-800/10" />

          {points.map((pt, i) => {
            const isActive = active === i;
            // Flip the popover to the left half when the dot is on the right edge.
            const flip = pt.x > 60;
            return (
              <div
                key={pt.title}
                className="absolute"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                {/* Dot */}
                <button
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={pt.title}
                  className="group relative -translate-x-1/2 -translate-y-1/2"
                >
                  {/* pulse ring */}
                  <span
                    className={`absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-100/50 ${isActive ? "opacity-0" : "animate-ping"
                      }`}
                  />
                  <span
                    className={`relative grid h-7 w-7 place-items-center rounded-full border-2 border-white text-[11px] font-semibold shadow-lg transition ${isActive
                      ? "bg-clay text-cream-100 scale-110"
                      : "bg-white/85 text-ink group-hover:bg-clay group-hover:text-cream-100"
                      }`}
                  >
                    {i + 1}
                  </span>
                </button>

                {/* Popover */}
                {isActive && (
                  <div
                    className={`absolute top-1/2 z-10 w-56 -translate-y-1/2 rounded-2xl border border-white/40 bg-cream-100/95 p-4 shadow-[0_24px_50px_-20px_rgba(42,38,34,0.6)] backdrop-blur-md ${flip ? "right-6" : "left-6"
                      }`}
                  >
                    <p className="eyebrow !text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-serif mt-1 text-lg font-medium text-ink">
                      {pt.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-light leading-relaxed text-stone">
                      {pt.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend / quick jump chips */}
        <div className="mt-2 flex flex-wrap gap-2.5">
          {points.map((pt, i) => (
            <button
              key={pt.title}
              onClick={() => setActive(i)}
              className={`eyebrow flex items-center gap-2 rounded-full border px-4 py-2.5 !tracking-[0.14em] transition ${active === i
                ? "border-clay bg-clay !text-cream-100"
                : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
                }`}
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-current text-[8px]">
                <span className={active === i ? "text-clay" : "text-cream-100"}>
                  {i + 1}
                </span>
              </span>
              {pt.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
