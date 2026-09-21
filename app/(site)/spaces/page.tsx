import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getSpaces } from "@/lib/api";

export const metadata: Metadata = {
  title: "Spaces — Velor",
  description:
    "A lookbook of real homes designed to feel effortless, enduring and entirely yours.",
};

export default async function SpacesPage() {
  const { items: SPACES } = await getSpaces();
  return (
    <main className="pb-24">
      <PageHero
        eyebrow="Spaces"
        title="Made to belong."
        subtitle="Real homes, quietly composed — a lookbook of the rooms our pieces were made for."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Spaces", href: "/spaces" },
        ]}
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-14 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPACES.map((s) => (
              <article
                key={s._id}
                className={`group ${s.tall ? "lg:row-span-2" : ""}`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-cream-200 ${s.tall ? "aspect-[3/4] lg:h-full" : "aspect-[4/3]"
                    }`}
                >
                  <Image
                    src={s.image.url}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-800/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="eyebrow !text-cream-100/70">{s.location}</p>
                    <h2 className="font-serif mt-1.5 text-2xl text-cream-100">{s.title}</h2>
                    <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-cream-100/85">
                      {s.blurb}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#383927] text-cream-100">
        <div className="mx-auto flex max-w-[1260px] flex-col items-center gap-6 px-5 py-20 text-center sm:px-8">
          <span className="eyebrow !text-cream-100/60">Studio Services</span>
          <h2 className="font-serif max-w-2xl text-3xl font-normal leading-tight tracking-tight sm:text-[2.6rem]">
            Designing a whole space? Let our studio help you compose it.
          </h2>
          <Link
            href="/studio"
            className="eyebrow mt-2 inline-flex items-center gap-3 rounded-full bg-cream-100 px-7 py-4 !tracking-[0.18em] !text-ink transition hover:bg-white"
          >
            Meet the studio
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
