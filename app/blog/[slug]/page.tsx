import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { POSTS, getPostBySlug } from "@/lib/data";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found — Velor" };
  return { title: `${post.title} — Velor`, description: post.excerpt };
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-cream pb-20">
      <article>
        {/* Header */}
        <header className="mx-auto max-w-3xl px-5 pt-28 text-center sm:px-8 sm:pt-36">
          <nav className="eyebrow mb-6 flex items-center justify-center gap-2 !tracking-[0.16em] text-stone">
            <Link href="/" className="transition hover:text-ink">Home</Link>
            <span className="text-stone-400">/</span>
            <Link href="/blog" className="transition hover:text-ink">Journal</Link>
          </nav>
          <div className="eyebrow flex items-center justify-center gap-3">
            <span className="text-clay">{post.category}</span>
            <span className="text-stone-400">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="eyebrow mt-6 !tracking-[0.14em] text-stone-400">
            {post.author} · {fmtDate(post.date)}
          </p>
        </header>

        {/* Cover */}
        <div className="mx-auto mt-10 max-w-[1000px] px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream-200">
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              priority
              sizes="1000px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-12 max-w-2xl px-5 sm:px-8">
          {post.body.map((para, i) => (
            <p
              key={i}
              className={`text-[17px] leading-[1.8] text-ink/85 ${i > 0 ? "mt-6" : ""} ${
                i === 0 ? "first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-clay" : ""
              }`}
            >
              {para}
            </p>
          ))}

          <div className="mt-12 border-t border-ink/10 pt-8">
            <Link href="/blog" className="eyebrow inline-flex items-center gap-2 text-ink/80 transition hover:text-clay">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Back to Journal
            </Link>
          </div>
        </div>
      </article>

      {/* More posts */}
      {more.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1260px] px-5 sm:px-8">
          <h2 className="font-serif mb-10 text-3xl font-medium tracking-tight text-ink">
            Keep reading
          </h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
                  <Image
                    src={p.cover.url}
                    alt={p.title}
                    fill
                    sizes="(min-width:640px) 380px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="font-serif mt-4 text-lg font-medium leading-snug text-ink transition-colors group-hover:text-clay">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
