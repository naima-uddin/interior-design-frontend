"use client";

// ─────────────────────────────────────────────────────────────────────────
// Banner — the homepage hero.
// Adapted from the original "BannerClassic" blur-window design into VELOR's
// warm interior palette, and made self-contained on static data (lib/data.ts)
// so it renders with no backend. The mechanism is unchanged: the same image is
// painted twice — a full-bleed BLURRED surround, and a razor-sharp copy clipped
// to a centred rounded "window" that lines up perfectly on top. Title sits
// bottom-left over the calm blurred paper; a glassy description card sits
// top-right inside the window.
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { SLIDES, type Slide } from "@/lib/data";

// slides come from the API (homepage payload); fall back to static SLIDES.

// The centred sharp window. Horizontal inset caps it and centres it on wide
// screens; vertical insets leave room for the fixed navbar (top) and the
// title / thumbnail band (bottom). On small screens the "window" collapses
// to a true full-bleed image (no blurred border) so the banner covers the
// full device width edge to edge.
const SIDE_DESKTOP = "max(2%, calc((100% - 1320px) / 2))";

// words wrapped in *asterisks* render in a serif italic accent
const renderHighlight = (text: string) =>
  String(text)
    .split(/(\*[^*]+\*)/g)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className="font-serif font-normal italic text-clay">
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      ),
    );

export default function Banner({ slides: input }: { slides?: Slide[] }) {
  const slides: Slide[] = input?.length ? input : SLIDES;
  const [current, setCurrent] = useState(0);
  const [compact, setCompact] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const TEXT_SIDE = compact ? "20px" : SIDE_DESKTOP;
  const INSET = compact
    ? { top: "56px", bottom: "0px", left: "0px", right: "0px" }
    : { top: "8%", bottom: "13%", left: SIDE_DESKTOP, right: SIDE_DESKTOP };
  const WINDOW_CLIP = compact
    ? "inset(0px round 0px)"
    : `inset(8% ${SIDE_DESKTOP} 13% ${SIDE_DESKTOP} round 28px)`;

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (total <= 1) return;
    autoRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % total),
      7000,
    );
  }, [total]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [startAuto]);

  const goTo = (idx: number) => {
    setCurrent(((idx % total) + total) % total);
    startAuto();
  };

  const stop = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };

  const slide = slides[current] ?? slides[0];
  if (!slide) return <section className="h-[70vh] bg-cream" />;

  const thumbs = slides.map((s, i) => ({ s, i }));

  return (
    <section
      className="relative h-[42vh] min-h-72 w-full overflow-hidden bg-cream sm:h-[70vh] sm:min-h-120 md:h-[80vh] md:min-h-140 lg:h-[85vh] lg:max-h-220"
      onMouseEnter={stop}
      onMouseLeave={startAuto}
    >
      {/* ── Layer 1: full-bleed BLURRED image (the surround) ── */}
      <div className="absolute inset-0 ">
        {slides.map((s, i) => (
          <Image
            key={s._id}
            src={s.image.url}
            alt=""
            fill
            aria-hidden
            priority={i === 0}
            quality={45}
            sizes="100vw"
            className={`scale-105 object-cover object-center blur-[3px] brightness-[1.04] saturate-[0.92] transition-opacity duration-700 ease-out ${i === current ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      {/* Warm veil + vignette so the surround reads as calm cream paper */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/55 via-cream/30 to-cream/65" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 82% at 50% 34%, transparent 40%, rgba(237,233,226,0.72) 100%)",
        }}
      />

      {/* ── Layer 2: the SAME image kept SHARP, clipped to the centred window ── */}
      <div className="absolute inset-0 " style={{ clipPath: WINDOW_CLIP }}>
        {slides.map((s, i) => (
          <div
            key={s._id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={s.image.url}
              alt={s.title.replace(/\*/g, "")}
              fill
              priority={i === 0}
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* gentle shade inside the window for card legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-olive-800/35 via-transparent to-transparent" />
      </div>

      {/* ── Window frame: hairline border + soft shadow onto the paper (desktop/tablet only) ── */}
      {!compact && (
        <div
          className="pointer-events-none absolute rounded-[28px] border border-white/50 shadow-[0_50px_110px_-40px_rgba(42,38,34,0.55)]"
          style={INSET}
        />
      )}

      {/* ── Content anchored to the window ── */}
      <div className="absolute" style={INSET}>
        {/* badge — top-left */}
        {slide.badge && (
          <span className="eyebrow absolute left-5 top-5 inline-block rounded-full border border-white/30 bg-[#383927]-800/25 px-3.5 py-1.5 !text-[9px] !text-white/90 backdrop-blur-md sm:left-7 sm:top-7">
            {slide.badge}
          </span>
        )}

        {/* description card — top-right */}
        {(slide.subtitle || slide.buttonText) && (
          <div className="absolute right-5 top-16 hidden max-w-42 rounded-3xl border border-white/20 bg-[#383927]-800/20 px-3 py-4 text-right backdrop-blur-xl sm:right-7 sm:top-7 sm:block sm:max-w-xs sm:px-2 sm:py-4">
            {slide.subtitle && (
              <p className="text-[13px] font-light leading-relaxed text-white/95">
                {slide.subtitle}
              </p>
            )}
            {slide.buttonText && slide.buttonLink && (
              <Link
                href={slide.buttonLink}
                className="eyebrow mt-5 inline-flex items-center gap-2 rounded-full bg-cream-100 px-5 py-2.5 !tracking-[0.16em] !text-ink shadow-sm transition hover:bg-white"
              >
                {slide.buttonText}
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            )}
          </div>
        )}

        {/* dots — bottom-center of the window */}
        {total > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s._id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-7 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"
                  }`}
              />
            ))}
          </div>
        )}
      </div>



      {/* ── Big title — bottom-left, over the blurred paper ── */}
      <h1
        style={{ left: TEXT_SIDE }}
        className="font-serif absolute bottom-[3%] max-w-[62%] text-balance text-[2rem] font-semibold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem] "
      >
        {renderHighlight(slide.title)}
      </h1>

      {/* ── Thumbnails — bottom-right, over the blurred paper ── */}
      {thumbs.length > 0 && (
        <div
          style={{ right: TEXT_SIDE }}
          className="absolute bottom-[3%] hidden items-center gap-2.5 sm:flex"
        >
          {thumbs.map(({ s, i }) => (
            <button
              key={s._id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`group relative h-12 w-12 overflow-hidden rounded-xl border bg-white shadow-lg transition hover:scale-105 lg:h-14 lg:w-14 ${i === current
                ? "border-[#383927] ring-2 ring-[#383927]/30"
                : "border-white/70 ring-1 ring-ink/5"
                }`}
            >
              <Image
                src={s.image.url}
                alt={s.title.replace(/\*/g, "")}
                fill
                sizes="80px"
                className="object-cover transition group-hover:scale-110"
              />
            </button>
          ))}
        </div>
      )}

    </section>
  );
}
