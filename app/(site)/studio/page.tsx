import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { STUDIO, COMPANY, SERVICES } from "@/lib/data";

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

      {/* About Us — passion for design */}
      <section className="bg-cream-100">
        <div className="mx-auto grid max-w-[1260px] items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          {/* Image collage with floating badges */}
          <div className="relative">
            <div className="grid grid-cols-[1.3fr_1fr] gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-200">
                <Image
                  src={STUDIO.portrait.url}
                  alt="A living space styled by Velor"
                  fill
                  sizes="(min-width:1024px) 320px, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-square overflow-hidden rounded-2xl bg-cream-200">
                <Image
                  src={STUDIO.workshop.url}
                  alt="A dining space styled by Velor"
                  fill
                  sizes="(min-width:1024px) 220px, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -top-6 right-2 grid h-16 w-16 place-items-center rounded-full bg-[#383927] text-center text-cream-100 shadow-lg sm:right-8">
              <div>
                <p className="text-lg font-semibold leading-none">95%</p>
                <p className="mt-1 text-[8px] font-light leading-none">Positive Feedback</p>
              </div>
            </div>

            <div className="absolute -bottom-6 left-2 grid h-28 w-28 place-items-center rounded-full border border-ink/10 bg-cream-100 text-center shadow-lg sm:left-8">
              <div>
                <p className="font-serif text-2xl font-semibold leading-none text-ink">15+</p>
                <p className="mt-1.5 text-[10px] font-light leading-tight text-stone">
                  Years Of
                  <br />
                  Experience
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="eyebrow">→ About Us</span>
            <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Our passion for design, your
              <br />
              <span className="text-stone-400">vision realized</span>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] font-light leading-relaxed text-stone">
              Our dedicated team of designers works closely with you to
              understand your vision and bring it to life with thoughtful
              attention to detail. Whether it&apos;s transforming a single
              room or an entire home.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {["Creative expertise", "Client-centered approach"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm font-light text-ink/80">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#383927] text-[10px] text-cream-100">
                    ✓
                  </span>
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-8">
              <Link
                href="/services"
                className="eyebrow group inline-flex w-fit items-center gap-2 rounded-full bg-[#383927] px-7 py-3.5 text-cream-100 transition hover:bg-olive-600"
              >
                Read more
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cream-200 text-ink">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-xs font-light text-stone">Need Any Help?</p>
                  <p className="text-sm font-medium text-ink">{COMPANY.contact.phones[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">→ Our Services</span>
              <h2 className="font-serif mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                Innovative design services for every need
              </h2>
            </div>
            <p className="max-w-sm text-[15px] font-light leading-relaxed text-stone">
              We offer a range of bespoke interior design services tailored to
              your unique needs. From concept development to final
              installation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-200"
              >
                <Image
                  src={s.image.url}
                  alt={s.name}
                  fill
                  sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream-100/90 text-ink transition group-hover:bg-[#383927] group-hover:text-cream-100">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-xl font-medium text-cream-100">{s.name}</h3>
                  <p className="mt-2 max-w-xs text-[13px] font-light leading-relaxed text-cream-100/85">
                    {s.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="eyebrow group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 text-ink transition hover:border-olive hover:bg-[#383927] hover:text-cream-100"
            >
              See all services
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#383927] text-cream-100">
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
              className="eyebrow group mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-ink transition hover:border-olive hover:bg-[#383927] hover:text-cream-100"
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

function PhoneIcon() {
  return (
    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
