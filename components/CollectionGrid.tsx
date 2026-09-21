"use client";

// Collection grid with category filter chips. Client component so filtering is
// instant; reads the static PRODUCTS/CATEGORIES for now.

import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type Product, type Category } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function CollectionGrid({
  products: input,
  categories,
}: {
  products?: Product[];
  categories?: Category[];
}) {
  const all = input?.length ? input : PRODUCTS;
  const cats = categories?.length ? categories : CATEGORIES;
  const [active, setActive] = useState<string>("all");

  const chips = [{ slug: "all", name: "All" }, ...cats];

  const products = useMemo(
    () => (active === "all" ? all : all.filter((p) => p.category === active)),
    [active, all],
  );

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1260px] px-5 py-10 sm:px-8 sm:py-14">
        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap items-center gap-2.5">
          {chips.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`eyebrow rounded-full border px-5 py-2.5 !tracking-[0.16em] transition ${
                active === c.slug
                  ? "border-olive bg-olive !text-cream-100"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
          <span className="eyebrow ml-auto hidden text-stone-400 sm:block">
            {products.length} pieces
          </span>
        </div>

        {/* Grid */}
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
