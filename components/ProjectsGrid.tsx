"use client";

// Projects grid with category filter chips. The initial category comes from the
// page (URL ?category=...) so the navbar dropdown links land pre-filtered.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PROJECTS,
  projectCategoriesWithCounts,
  type Project,
  type Category,
} from "@/lib/data";

export default function ProjectsGrid({
  initialCategory = "all",
  projects: input,
  categories,
}: {
  initialCategory?: string;
  projects?: Project[];
  categories?: (Category & { count: number })[];
}) {
  const all = input?.length ? input : PROJECTS;
  const cats = categories?.length ? categories : projectCategoriesWithCounts();
  const valid = cats.some((c) => c.slug === initialCategory)
    ? initialCategory
    : "all";
  const [active, setActive] = useState<string>(valid);

  const chips = [{ slug: "all", name: "All", count: all.length }, ...cats];
  const projects =
    active === "all" ? all : all.filter((p) => p.category === active);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1260px] px-5 py-10 sm:px-8 sm:py-14">
        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap items-center gap-2.5">
          {chips.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`eyebrow rounded-full border px-5 py-2.5 !tracking-[0.14em] transition ${
                active === c.slug
                  ? "border-olive bg-olive !text-cream-100"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p._id}
              href={`/projects/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream-100 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(42,38,34,0.5)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                <Image
                  src={p.cover.url}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span className="eyebrow absolute left-4 top-4 rounded-full bg-cream-100/85 px-3 py-1.5 !text-[9px] backdrop-blur-md">
                  {p.area}
                </span>
              </div>
              <div className="px-5 py-5">
                <h3 className="font-serif text-lg font-medium leading-snug text-ink transition-colors group-hover:text-clay">
                  {p.title}
                </h3>
                <p className="eyebrow mt-2 !tracking-[0.14em]">{p.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
