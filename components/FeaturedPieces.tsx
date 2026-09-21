// Featured Pieces — three editorial product cards, mirroring the reference.

import Link from "next/link";
import { FEATURED } from "@/lib/data";
import ProductCard from "./ProductCard";

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
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
