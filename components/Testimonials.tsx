// Client testimonials — three quote cards with avatar, name and project.

import Image from "next/image";
import { TESTIMONIALS, type Testimonial } from "@/lib/data";

export default function Testimonials({ items }: { items?: Testimonial[] }) {
  const list = items?.length ? items : TESTIMONIALS;
  return (
    <section className="bg-cream-100">
      <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-12 text-center">
          <span className="eyebrow">Kind words</span>
          <h2 className="font-serif mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Homes we&apos;re proud of.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {list.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-ink/10 bg-cream p-7"
            >
              <div className="flex gap-1 text-clay">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.9 3.1 1.1-6.6L.4 6.9l6.6-1L10 0l3 5.9 6.6 1-4.8 4.6 1.1 6.6z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-serif mt-5 flex-1 text-lg font-normal leading-snug text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full bg-cream-200">
                  <Image src={t.avatar.url} alt={t.name} fill sizes="44px" className="object-cover" />
                </span>
                <span>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="eyebrow mt-0.5 !tracking-[0.12em]">{t.role}</p>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
