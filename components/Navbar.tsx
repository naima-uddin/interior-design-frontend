"use client";

// Frosted, editorial navbar. Transparent over the hero, then it settles onto a
// cream frosted surface once the page scrolls. Includes a "Projects" dropdown
// (hover on desktop, expand on mobile) listing the project categories.

import Link from "next/link";
import { useEffect, useState } from "react";
import { projectCategoriesWithCounts } from "@/lib/data";

const LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Spaces", href: "/spaces" },
  { label: "Studio", href: "/studio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [projOpen, setProjOpen] = useState(false); // desktop dropdown
  const [mobileProj, setMobileProj] = useState(false); // mobile submenu
  const categories = projectCategoriesWithCounts();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || projOpen
          ? "border-b border-ink/8 bg-cream/85 backdrop-blur-xl"
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

          {/* Projects dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProjOpen(true)}
            onMouseLeave={() => setProjOpen(false)}
          >
            <Link
              href="/projects"
              className="eyebrow flex items-center gap-1.5 !tracking-[0.18em] text-ink/80 transition-colors hover:text-ink"
            >
              Projects
              <svg
                className={`h-3 w-3 transition-transform ${projOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </Link>

            {projOpen && (
              <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4">
                <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream-100 p-2 shadow-[0_30px_70px_-30px_rgba(42,38,34,0.45)]">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/projects?category=${c.slug}`}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-light text-ink/85 transition hover:bg-cream-200 hover:text-ink"
                    >
                      {c.name}
                      <span className="text-xs text-stone-400">{c.count}</span>
                    </Link>
                  ))}
                  <Link
                    href="/projects"
                    className="eyebrow mt-1 flex items-center gap-2 rounded-xl border-t border-ink/10 px-4 py-3 !tracking-[0.16em] text-ink transition hover:text-clay"
                  >
                    View all projects
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl font-medium uppercase text-ink sm:text-[1.7rem]"
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

            {/* Mobile Projects submenu */}
            <button
              onClick={() => setMobileProj((v) => !v)}
              className="eyebrow flex items-center justify-between !tracking-[0.18em] py-2 text-ink/80"
            >
              Projects
              <svg
                className={`h-3.5 w-3.5 transition-transform ${mobileProj ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {mobileProj && (
              <div className="mb-2 flex flex-col gap-1 border-l border-ink/10 pl-4">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/projects?category=${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="py-1.5 text-sm font-light text-ink/75"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  onClick={() => setOpen(false)}
                  className="eyebrow py-2 !tracking-[0.16em] text-clay"
                >
                  View all projects →
                </Link>
              </div>
            )}
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
