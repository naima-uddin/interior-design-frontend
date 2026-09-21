import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Journal — Velor",
  description:
    "Design notes, buying guides and ideas from the Velor studio — on materials, light, storage and living well.",
};

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="pb-8">
      <PageHero
        eyebrow="Journal"
        title="Notes on living well."
        subtitle="Ideas, guides and quiet thinking on materials, light and the making of a considered home."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/blog" },
        ]}
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-14 sm:px-8">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-8 overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-cream-200 lg:aspect-auto">
              <Image
                src={featured.cover.url}
                alt={featured.title}
                fill
                sizes="(min-width:1024px) 620px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="eyebrow flex items-center gap-3">
                <span className="text-clay">{featured.category}</span>
                <span className="text-stone-400">·</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="font-serif mt-4 text-3xl font-medium leading-tight tracking-tight text-ink transition-colors group-hover:text-clay sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-stone">
                {featured.excerpt}
              </p>
              <p className="eyebrow mt-6 !tracking-[0.14em] text-stone-400">
                {fmtDate(featured.date)}
              </p>
            </div>
          </Link>

          {/* Rest */}
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
                  <Image
                    src={p.cover.url}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 380px, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="eyebrow mt-5 flex items-center gap-3">
                  <span className="text-clay">{p.category}</span>
                  <span className="text-stone-400">·</span>
                  <span>{p.readingTime}</span>
                </div>
                <h3 className="font-serif mt-2.5 text-xl font-medium leading-snug text-ink transition-colors group-hover:text-clay">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
