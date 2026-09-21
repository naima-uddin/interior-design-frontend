"use client";

// Frosted, editorial navbar. Transparent over the hero, then it settles onto a
// cream frosted surface once the page scrolls — a small premium touch that
// keeps the logo legible over both the image and the paper background.

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Spaces", href: "/spaces" },
  { label: "Studio", href: "/studio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-ink/8 bg-cream/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1260px] items-center justify-between px-5 sm:h-20 sm:px-8">
        {/* Left: primary links (desktop) */}
        <div className="hidden flex-1 items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="eyebrow !tracking-[0.18em] text-ink/80 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Center: wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl font-medium uppercase tracking-[0.42em] text-ink sm:text-[1.7rem]"
          style={{ letterSpacing: "0.42em" }}
        >
          <span className="pl-[0.42em]">Velor</span>
        </Link>

        {/* Right: icons */}
        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
          <button aria-label="Search" className="text-ink/80 transition hover:text-ink">
            <SearchIcon />
          </button>
          <button aria-label="Bag" className="text-ink/80 transition hover:text-ink">
            <BagIcon />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="text-ink/80 transition hover:text-ink md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/8 bg-cream/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-[1260px] flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="eyebrow !tracking-[0.18em] py-2 text-ink/80"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3.2-3.2" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 12H7L6 8Z" />
      <path strokeLinecap="round" d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
