// Featured Pieces — three editorial product cards with a hover "+" add action,
// exactly mirroring the reference layout (image mat, name + tagline + price).

import Link from "next/link";
import Image from "next/image";
import { FEATURED } from "@/lib/data";

const price = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

export default function FeaturedPieces() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-10 flex items-end justify-between">
          <span className="eyebrow">Featured Pieces</span>
          <Link
            href="/collection"
            className="eyebrow inline-flex items-center gap-2 text-ink/80 transition hover:text-ink"
          >
            View all
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((p) => (
            <article key={p._id} className="group">
              <Link href={p.href} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200">
                  <Image
                    src={p.image.url}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </Link>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <Link href={p.href}>
                    <h3 className="font-serif text-xl font-medium text-ink transition-colors group-hover:text-clay">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="eyebrow mt-1.5">{p.tagline}</p>
                  <p className="mt-2 text-sm text-ink">{price(p.price)}</p>
                </div>

                <button
                  aria-label={`Add ${p.title}`}
                  className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-olive hover:bg-olive hover:text-cream-100"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
