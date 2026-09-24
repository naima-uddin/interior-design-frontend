"use client";

// Frosted, editorial navbar for an interior-design studio. Transparent over the
// hero, settling onto a cream frosted surface on scroll. Includes hover
// dropdowns for "Projects" (by category) and "Services".

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  projectCategoriesWithCounts,
  SERVICES,
  type Service,
  type Category,
} from "@/lib/data";
import NavDrawer from "@/components/NavDrawer";
import SearchOverlay from "@/components/SearchOverlay";

type NavProps = {
  projectCategories?: (Category & { count: number })[];
  services?: Service[];
  siteName?: string;
};

const LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

type Item = { name: string; href: string; count?: number };

function NavDropdown({
  label,
  href,
  items,
  onToggle,
  solid,
}: {
  label: string;
  href: string;
  items: Item[];
  onToggle: (open: boolean) => void;
  solid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const set = (v: boolean) => {
    setOpen(v);
    onToggle(v);
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
    >
      <Link
        href={href}
        className={`eyebrow flex items-center gap-1.5 !tracking-[0.18em] transition-colors ${solid ? "text-ink/80! hover:text-ink!" : "text-white/90! hover:text-white!"
          }`}
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </Link>

      {open && (
        <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4">
          <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-ink/10 bg-cream-100 p-2 shadow-[0_30px_70px_-30px_rgba(42,38,34,0.45)]">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-light text-ink/85 transition hover:bg-cream-200 hover:text-ink"
              >
                {it.name}
                {it.count != null && (
                  <span className="text-xs text-stone-400">{it.count}</span>
                )}
              </Link>
            ))}
            <Link
              href={href}
              className="eyebrow mt-1 flex items-center gap-2 rounded-xl border-t border-ink/10 px-4 py-3 !tracking-[0.16em] text-ink transition hover:text-clay"
            >
              View all
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ projectCategories, services, siteName = "Velor" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [searchOpen, setSearchOpen] = useState(false);
  const [anyDropdown, setAnyDropdown] = useState(0); // count of open desktop dropdowns

  const cats = projectCategories?.length
    ? projectCategories
    : projectCategoriesWithCounts();
  const svcs = services?.length ? services : SERVICES;

  const projectItems: Item[] = cats.map((c) => ({
    name: c.name,
    href: `/projects?category=${c.slug}`,
    count: c.count,
  }));
  const serviceItems: Item[] = svcs.map((s) => ({
    name: s.name,
    href: `/services/${s.slug}`,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || anyDropdown > 0 || searchOpen;
  const track = (v: boolean) => setAnyDropdown((n) => Math.max(0, n + (v ? 1 : -1)));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid
          ? "border-b border-[#383927]/60 bg-cream/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
          }`}
      >
        <nav className="mx-auto grid h-14 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 md:h-16 lg:px-8">

        {/* Left: wordmark */}
        <Link
          href="/"
          className={`font-serif text-lg font-medium uppercase transition-colors sm:text-2xl md:text-[1.7rem] ${solid ? "text-ink" : "text-white"
            }`}
          style={{ letterSpacing: "0.42em" }}
        >
          <span className="pl-[0.42em]">{siteName}</span>
        </Link>

        {/* Center: primary links + dropdowns (desktop) */}
        <div className="hidden items-center justify-center gap-7 lg:flex">
          <NavDropdown label="Projects" href="/projects" items={projectItems} onToggle={track} solid={solid} />
          <NavDropdown label="Services" href="/services" items={serviceItems} onToggle={track} solid={solid} />
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`eyebrow !tracking-[0.18em] transition-colors ${solid ? "text-ink/80! hover:text-ink!" : "text-white/90! hover:text-white!"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: icons */}
        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={`grid h-10 w-10 place-items-center transition ${solid ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white"
              }`}
          >
            <SearchIcon />
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`grid h-10 w-10 place-items-center transition ${solid ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white"
              }`}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>
      </header>

      <NavDrawer open={open} onClose={() => setOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3.2-3.2" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 12H7L6 8Z" />
      <path strokeLinecap="round" d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
