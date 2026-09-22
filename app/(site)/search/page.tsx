import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getProducts, getProjects, getServices, getPosts } from "@/lib/api";
import type { Product, Project, Service, Post } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search — Velor",
};

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const sp = await searchParams;
  const raw = sp.q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const q = query.toLowerCase();
  const match = (s: string | undefined | null) =>
    !!s && s.toLowerCase().includes(q);

  const [{ items: allProducts }, { items: allProjects }, allServices, allPosts] =
    await Promise.all([getProducts(), getProjects(), getServices(), getPosts()]);

  const products: Product[] = q
    ? allProducts.filter((p) => match(p.title) || match(p.tagline) || match(p.category))
    : [];
  const projects: Project[] = q
    ? allProjects.filter((p) => match(p.title) || match(p.location) || match(p.category))
    : [];
  const services: Service[] = q
    ? allServices.filter((s) => match(s.name) || match(s.tagline))
    : [];
  const posts: Post[] = q
    ? allPosts.filter((p) => match(p.title) || match(p.excerpt) || match(p.category))
    : [];

  const total = products.length + projects.length + services.length + posts.length;

  return (
    <main className="pb-8">
      <PageHero
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search Velor"}
        subtitle={
          query
            ? `${total} result${total === 1 ? "" : "s"} across products, projects, services and the journal.`
            : "Try a product, project, service or journal topic."
        }
        breadcrumb={[{ label: "Search" }]}
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-14 sm:px-8">
          {!q && (
            <p className="text-[15px] font-light text-stone">
              Use the search icon in the navbar to look something up.
            </p>
          )}

          {q && total === 0 && (
            <p className="text-[15px] font-light text-stone">
              No results found for &ldquo;{query}&rdquo;. Try a different term.
            </p>
          )}

          {products.length > 0 && (
            <ResultSection title="Products">
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((p) => (
                  <Link key={p._id} href={`/product/${p.slug}`} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-200">
                      {p.images[0]?.url && (
                        <Image
                          src={p.images[0].url}
                          alt={p.title}
                          fill
                          sizes="(min-width:1024px) 280px, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <h3 className="font-serif mt-4 text-lg font-medium text-ink transition-colors group-hover:text-clay">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm font-light text-stone">{p.tagline}</p>
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {projects.length > 0 && (
            <ResultSection title="Projects">
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <Link key={p._id} href={`/projects/${p.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
                      {p.cover?.url && (
                        <Image
                          src={p.cover.url}
                          alt={p.title}
                          fill
                          sizes="(min-width:1024px) 380px, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <h3 className="font-serif mt-4 text-lg font-medium text-ink transition-colors group-hover:text-clay">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm font-light text-stone">{p.location}</p>
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {services.length > 0 && (
            <ResultSection title="Services">
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
                      {s.image?.url && (
                        <Image
                          src={s.image.url}
                          alt={s.name}
                          fill
                          sizes="(min-width:1024px) 380px, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <h3 className="font-serif mt-4 text-lg font-medium text-ink transition-colors group-hover:text-clay">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-sm font-light text-stone">{s.tagline}</p>
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {posts.length > 0 && (
            <ResultSection title="Journal">
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
                      {p.cover?.url && (
                        <Image
                          src={p.cover.url}
                          alt={p.title}
                          fill
                          sizes="(min-width:1024px) 380px, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <h3 className="font-serif mt-4 text-lg font-medium text-ink transition-colors group-hover:text-clay">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm font-light leading-relaxed text-stone">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}
        </div>
      </section>
    </main>
  );
}

function ResultSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 last:mb-0">
      <h2 className="eyebrow border-b border-ink/10 pb-4">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}
