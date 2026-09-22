"use client";

// Floating bottom-right promo card — a dismissible nudge toward the
// portfolio, mirroring the reference "limited time offer" widget.

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PortfolioPromo() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-24 right-5 z-40 w-70 max-w-[calc(100vw-3rem)] transition-all duration-500 sm:bottom-28 sm:right-8 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
    >
      <div className="relative rounded-2xl border border-cream-100/10 bg-[#2b2c19] px-5 py-2 text-cream-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full text-cream-100/60 transition hover:bg-cream-100/10 hover:text-cream-100"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>


        <h3 className="font-serif mt-3 text-lg leading-snug text-cream-100">
          See our full <span className="text-clay">portfolio</span>
        </h3>
        <p className="mt-2 text-[13px] font-light leading-relaxed text-cream-100/70">
          Browse completed interiors across Bangladesh — real spaces, real
          clients, real results.
        </p>

        <Link
          href="/projects"
          className="eyebrow group mt-4 inline-flex items-center gap-2 rounded-full bg-cream-100 px-4 py-1.5 !text-ink"
        >
          View Portfolio
          <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
