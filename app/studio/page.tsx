import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { STUDIO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Studio — Velor",
  description:
    "The people, materials and places behind Velor — furniture for a more human home.",
};

export default function StudioPage() {
  return (
    <main className="pb-24">
      <PageHero
        eyebrow="Our Story"
        title="A more human home."
        subtitle="We make furniture the slow way — with people we know, materials that age well, and real homes in mind."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Studio", href: "/studio" },
        ]}
      />

      {/* Intro image + text */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1260px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
            <Image
              src={STUDIO.hero.url}
              alt="Inside the Velor studio"
              fill
              sizes="(min-width:1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              Beautiful things,
              <br /> made to be lived with.
            </h2>
            <p className="mt-6 text-[15px] font-light leading-relaxed text-stone">
              Velor began in 2014 with a simple idea: that the objects we live
              around should be honest, warm and built to last a lifetime. No
              trend cycles, no throwaway pieces — just considered design, natural
              materials and the quiet craft of people who care.
            </p>
            <p className="mt-4 text-[15px] font-light leading-relaxed text-stone">
              Every piece is made to order by a small circle of makers, so
              nothing is wasted and everything carries a little of the hand that
              built it.
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-olive text-cream-100">
        <div className="mx-auto grid max-w-[1260px] grid-cols-2 gap-8 px-5 py-16 sm:px-8 lg:grid-cols-4">
          {STUDIO.stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="font-serif text-4xl font-medium sm:text-5xl">{s.value}</p>
              <p className="eyebrow mt-3 !text-cream-100/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8">
          <span className="eyebrow">What we stand for</span>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {STUDIO.values.map((v, i) => (
              <div key={v.title}>
                <p className="font-serif text-5xl font-normal text-clay/40">
                  0{i + 1}
                </p>
                <h3 className="font-serif mt-4 text-2xl font-medium text-ink">{v.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-stone">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop feature */}
      <section className="bg-cream-100">
        <div className="mx-auto grid max-w-[1260px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200 lg:order-1">
            <Image
              src={STUDIO.workshop.url}
              alt="The workshop"
              fill
              sizes="(min-width:1024px) 680px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow">The Workshop</span>
            <h2 className="font-serif mt-4 text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              Made by hand, meant for years.
            </h2>
            <p className="mt-6 text-[15px] font-light leading-relaxed text-stone">
              From the first sketch to the final oiled finish, our pieces pass
              through a handful of skilled hands. It is slower, and we like it
              that way — it is how furniture earns its place in a home.
            </p>
            <Link
              href="/collection"
              className="eyebrow group mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-ink transition hover:border-olive hover:bg-olive hover:text-cream-100"
            >
              Explore the collection
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
