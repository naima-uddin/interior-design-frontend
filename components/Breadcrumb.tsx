// Shared breadcrumb trail — a small home icon, muted links, chevron
// separators, and the current page styled distinctly (bold ink, no link).
// Used by PageHero and every detail page (product/project/service/post) so
// the trail looks identical site-wide.

import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

// "light" = default (dark text on the cream page background).
// "dark" = for trails laid over a photo/dark hero (e.g. project detail cover).
export default function Breadcrumb({
  items,
  variant = "light",
}: {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`eyebrow flex items-center gap-2 !tracking-[0.14em] ${dark ? "text-cream-100/70" : "text-stone"}`}
    >
      <Link
        href="/"
        aria-label="Home"
        className={`grid h-8 w-8 place-items-center rounded-full transition ${
          dark
            ? "text-cream-100/70 hover:bg-cream-100/15 hover:text-cream-100"
            : "text-stone/70 hover:bg-cream-200 hover:text-ink"
        }`}
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 10v9h13v-9" />
        </svg>
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.href ?? item.label} className="flex items-center gap-2">
            <svg
              className={`h-3 w-3 ${dark ? "text-cream-100/40" : "text-stone-400/70"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
            {isLast || !item.href ? (
              <span
                aria-current="page"
                className={`max-w-[16rem] truncate font-medium ${dark ? "text-cream-100" : "text-ink"}`}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={`max-w-[12rem] truncate transition ${dark ? "hover:text-cream-100" : "hover:text-ink"}`}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
