// Reusable editorial product card — image mat, name + tagline + price, and a
// hover "+" add action. Used by Featured Pieces and the Collection grid.

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

export const fmtPrice = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src={product.images[0].url}
            alt={product.title}
            fill
            sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 100vw"
            className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-8"
          />
          {product.isNew && (
            <span className="eyebrow absolute left-4 top-4 rounded-full bg-cream-100/85 px-3 py-1.5 !text-[9px] backdrop-blur-md">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="eyebrow absolute right-4 top-4 rounded-full bg-clay px-3 py-1.5 !text-[9px] !text-cream-100">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-xl font-medium text-ink transition-colors group-hover:text-clay">
              {product.title}
            </h3>
          </Link>
          <p className="eyebrow mt-1.5">{product.tagline}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink">
            {fmtPrice(product.price)}
            {product.compareAtPrice && (
              <span className="text-stone-400 line-through">
                {fmtPrice(product.compareAtPrice)}
              </span>
            )}
          </p>
        </div>

        <Link
          href={`/product/${product.slug}`}
          aria-label={`View ${product.title}`}
          className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-olive hover:bg-[#383927] hover:text-cream-100"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
