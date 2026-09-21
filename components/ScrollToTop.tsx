"use client";

// Floating "back to top" button — fades/scales in once the page has scrolled
// past one viewport height, sits above the footer in the bottom-right corner.

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-olive text-cream-100 shadow-[0_20px_40px_-15px_rgba(42,38,34,0.5)] transition-all duration-300 hover:bg-olive-800 sm:bottom-8 sm:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
