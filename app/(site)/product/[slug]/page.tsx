import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, relatedProducts, CATEGORIES } from "@/lib/data";
import { getProduct, getProducts } from "@/lib/api";
import { fmtPrice } from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";

// Pre-render every product page at build time.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Not found — Velor" };
  return {
    title: `${product.title} — Velor`,
    description: product.description,
  };
}

const specRow = (label: string, value: string) => (
  <div className="flex justify-between gap-6 border-b border-ink/10 py-3.5">
    <dt className="eyebrow !tracking-[0.16em]">{label}</dt>
    <dd className="text-right text-sm font-light text-ink">{value}</dd>
  </div>
);

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const catName =
    CATEGORIES.find((c) => c.slug === product.category)?.name ?? "Collection";
  const { items: allProducts } = await getProducts();
  const related = relatedProducts(product, 3, allProducts);

  return (
    <main className="bg-cream pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        {/* Breadcrumb */}
        <nav className="eyebrow mb-8 flex items-center gap-2 !tracking-[0.16em] text-stone">
          <Link href="/" className="transition hover:text-ink">Home</Link>
          <span className="text-stone-400">/</span>
          <Link href="/collection" className="transition hover:text-ink">Collection</Link>
          <span className="text-stone-400">/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        {/* Gallery + details */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} alt={product.title} />

          <div className="lg:pt-4">
            <span className="eyebrow">{catName}</span>
            <h1 className="font-serif mt-3 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-4 flex items-center gap-3 text-lg text-ink">
              {fmtPrice(product.price)}
              {product.compareAtPrice && (
                <span className="text-base text-stone-400 line-through">
                  {fmtPrice(product.compareAtPrice)}
                </span>
              )}
            </p>

            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-stone">
              {product.description}
            </p>

            <AddToCart colours={product.colours} />

            {/* Specs */}
            <dl className="mt-10">
              {specRow("Materials", product.materials)}
              {specRow("Dimensions", product.dimensions)}
              {specRow("Lead time", "4–6 weeks, made to order")}
              {specRow("Delivery", "Free white-glove, worldwide")}
            </dl>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-ink/10 pt-14">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
                You may also like
              </h2>
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
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
