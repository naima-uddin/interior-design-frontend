import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/data";
import { getService, getServices } from "@/lib/api";
import ProcessSteps from "@/components/ProcessSteps";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Not found — Velor" };
  return { title: `${service.name} — Velor`, description: service.summary };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const all = await getServices();
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <main>
      {/* Intro */}
      <section className="bg-cream pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
          <nav className="eyebrow mb-8 flex items-center gap-2 !tracking-[0.16em] text-stone">
            <Link href="/" className="transition hover:text-ink">Home</Link>
            <span className="text-stone-400">/</span>
            <Link href="/services" className="transition hover:text-ink">Services</Link>
            <span className="text-stone-400">/</span>
            <span className="text-ink">{service.name}</span>
          </nav>

          <div className="grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow">{service.tagline}</span>
              <h1 className="font-serif mt-4 text-4xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-stone">
                {service.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#383927] px-6 py-3.5 !tracking-[0.16em] !text-cream-100 transition hover:bg-[#383927]-800"
                >
                  Book a free consultation
                </Link>
                <Link
                  href="/projects"
                  className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 !tracking-[0.16em] text-ink transition hover:border-ink/50"
                >
                  See our work
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
              <Image
                src={service.image.url}
                alt={service.name}
                fill
                priority
                sizes="(min-width:1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-20">
          <span className="eyebrow">What&apos;s included</span>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream p-6"
              >
                <span className="font-serif text-2xl text-clay/50">0{i + 1}</span>
                <p className="pt-1 text-sm font-light leading-relaxed text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps className="bg-cream" />

      {/* Other services */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
              Other services
            </h2>
            <Link href="/services" className="eyebrow inline-flex items-center gap-2 text-ink/80 transition hover:text-ink">
              All services
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream transition hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                  <Image
                    src={s.image.url}
                    alt={s.name}
                    fill
                    sizes="(min-width:1024px) 280px, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-medium text-ink transition-colors group-hover:text-clay">
                    {s.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
