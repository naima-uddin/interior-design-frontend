// "Latest Home Interior Design Projects" — a portfolio grid of completed work,
// mirroring the reference: image card + uppercase title + area subtitle.
// Shows the 8 most recent projects with a "View all" into /projects.

import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

export default function LatestProjects() {
  const projects = PROJECTS.slice(0, 8);

  return (
    <section className="bg-cream-100">
      <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Portfolio</span>
          <h2 className="font-serif mt-4 text-3xl font-semibold uppercase tracking-tight text-ink sm:text-4xl">
            Latest Home Interior Design Projects
          </h2>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-stone">
            Explore our portfolio of completed home interiors across Bangladesh —
            from drawing-room and living spaces to bedrooms, kitchens and full
            apartments. Each project reflects its owner&apos;s taste, practical
            needs and our approach to craft.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <Link
              key={p._id}
              href={`/projects/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(42,38,34,0.5)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                <Image
                  src={p.cover.url}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 280px, (min-width:640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="px-5 py-5 text-center">
                <h3 className="text-[11px] font-semibold uppercase leading-relaxed tracking-[0.08em] text-ink transition-colors group-hover:text-clay">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm font-light text-stone">
                  {p.area} Apartment
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="eyebrow group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 text-ink transition hover:border-olive hover:bg-olive hover:text-cream-100"
          >
            View all projects
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
