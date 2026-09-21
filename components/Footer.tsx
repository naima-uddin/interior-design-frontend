"use client";

// Deep-olive footer: wordmark + tagline, three link columns, a newsletter
// capture, socials, and the legal strip — mirroring the reference layout.

import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Collection", "Spaces", "New Arrivals"],
  },
  {
    title: "Company",
    links: ["Our Story", "Sustainability", "Journal"],
  },
  {
    title: "Support",
    links: ["Contact", "Shipping & Returns", "Care Guide"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-olive text-cream-100">
      <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-medium uppercase tracking-[0.4em]">
              Velor
            </p>
            <p className="eyebrow mt-3 !text-cream-100/50">A more human home</p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow !text-cream-100/50">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm font-light text-cream-100/85 transition hover:text-cream-100"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p className="eyebrow !text-cream-100/50">Join a calmer inbox</p>
            <form
              className="mt-4 flex items-center gap-2 border-b border-cream-100/25 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full bg-transparent text-sm font-light text-cream-100 placeholder:text-cream-100/40 focus:outline-none"
              />
              <button aria-label="Subscribe" className="text-cream-100 transition hover:translate-x-0.5">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
            <div className="mt-5 flex items-center gap-4 text-cream-100/70">
              {["Instagram", "Pinterest", "Facebook", "YouTube"].map((s) => (
                <Link key={s} href="#" aria-label={s} className="transition hover:text-cream-100">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-cream-100/25 text-[10px]">
                    {s[0]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream-100/15 pt-6 sm:flex-row sm:items-center">
          <p className="eyebrow !text-cream-100/45 !tracking-[0.2em]">
            © 2026 Velor. All rights reserved.
          </p>
          <p className="eyebrow !text-cream-100/45 !tracking-[0.2em]">
            Beautiful spaces. Brighter lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
