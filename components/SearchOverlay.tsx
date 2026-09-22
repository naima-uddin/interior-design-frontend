"use client";

// Command-palette style search launched from the navbar search icon.
// Filters the static site content (products, projects, services, journal
// posts) client-side and links straight through to the matching detail page.

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, PROJECTS, SERVICES, POSTS } from "@/lib/data";

const MAX_PER_GROUP = 4;

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submit = () => {
    const term = query.trim();
    if (!term) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  useEffect(() => {
    if (!open) return;
    setQuery("");
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    const match = (s: string | undefined | null) =>
      !!s && s.toLowerCase().includes(q);

    const products = PRODUCTS.filter(
      (p) => match(p.title) || match(p.tagline) || match(p.category)
    ).slice(0, MAX_PER_GROUP);
    const projects = PROJECTS.filter(
      (p) => match(p.title) || match(p.location) || match(p.category)
    ).slice(0, MAX_PER_GROUP);
    const services = SERVICES.filter(
      (s) => match(s.name) || match(s.tagline)
    ).slice(0, MAX_PER_GROUP);
    const posts = POSTS.filter(
      (p) => match(p.title) || match(p.excerpt) || match(p.category)
    ).slice(0, MAX_PER_GROUP);

    return { products, projects, services, posts };
  }, [q]);

  const hasResults =
    results &&
    (results.products.length ||
      results.projects.length ||
      results.services.length ||
      results.posts.length);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed inset-x-0 top-0 z-[70] flex justify-center px-4 transition-all duration-300 ease-out ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="mt-20 w-full max-w-2xl overflow-hidden rounded-2xl border border-ink/10 bg-cream-100 shadow-[0_40px_90px_-30px_rgba(42,38,34,0.55)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex items-center gap-3 border-b border-ink/10 px-5 py-4"
          >
            <svg className="h-4.5 w-4.5 shrink-0 text-ink/50" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3.2-3.2" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, projects, services, journal…"
              className="w-full bg-transparent text-[15px] font-light text-ink placeholder:text-ink/40 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/60 transition hover:bg-cream-200 hover:text-ink"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </form>

          {q && (
            <div className="max-h-[65vh] overflow-y-auto p-3">
              {!hasResults && (
                <p className="px-3 py-8 text-center text-sm font-light text-ink/50">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}

              {results && results.products.length > 0 && (
                <ResultGroup label="Products">
                  {results.products.map((p) => (
                    <ResultRow
                      key={p._id}
                      href={`/product/${p.slug}`}
                      onClose={onClose}
                      image={p.images[0]?.url}
                      title={p.title}
                      subtitle={p.tagline}
                    />
                  ))}
                </ResultGroup>
              )}

              {results && results.projects.length > 0 && (
                <ResultGroup label="Projects">
                  {results.projects.map((p) => (
                    <ResultRow
                      key={p._id}
                      href={`/projects/${p.slug}`}
                      onClose={onClose}
                      image={p.cover.url}
                      title={p.title}
                      subtitle={p.location}
                    />
                  ))}
                </ResultGroup>
              )}

              {results && results.services.length > 0 && (
                <ResultGroup label="Services">
                  {results.services.map((s) => (
                    <ResultRow
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClose={onClose}
                      image={s.image.url}
                      title={s.name}
                      subtitle={s.tagline}
                    />
                  ))}
                </ResultGroup>
              )}

              {results && results.posts.length > 0 && (
                <ResultGroup label="Journal">
                  {results.posts.map((p) => (
                    <ResultRow
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      onClose={onClose}
                      image={p.cover.url}
                      title={p.title}
                      subtitle={p.excerpt}
                    />
                  ))}
                </ResultGroup>
              )}

              {hasResults ? (
                <button
                  type="button"
                  onClick={submit}
                  className="eyebrow mt-1 flex w-full items-center justify-center gap-2 rounded-xl border-t border-ink/10 px-3 py-3 !tracking-[0.16em] text-ink transition hover:text-clay"
                >
                  See all results for &ldquo;{query.trim()}&rdquo;
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ResultGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="eyebrow px-3 pb-1 pt-2 !text-[11px] !text-ink/45">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function ResultRow({
  href,
  onClose,
  image,
  title,
  subtitle,
}: {
  href: string;
  onClose: () => void;
  image?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-cream-200"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ink/5">
        {image && <Image src={image} alt={title} fill sizes="44px" className="object-cover" />}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-light text-ink">{title}</span>
        <span className="block truncate text-[12px] font-light text-ink/50">{subtitle}</span>
      </span>
    </Link>
  );
}
