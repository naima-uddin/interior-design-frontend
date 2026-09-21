"use client";

// FAQ accordion — one panel open at a time, animated chevron.

import { useState } from "react";
import { FAQS } from "@/lib/data";

export default function FaqAccordion({
  faqs,
}: {
  faqs?: { q: string; a: string }[];
}) {
  const items = faqs?.length ? faqs : FAQS;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-lg font-medium text-ink sm:text-xl">
                {f.q}
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${isOpen ? "rotate-45 border-olive bg-[#383927] text-cream-100" : "border-ink/20 text-ink"
                  }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-[15px] font-light leading-relaxed text-stone">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
