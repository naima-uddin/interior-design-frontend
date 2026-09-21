// "What we do" — a preview grid of the studio's services, linking into the
// full /services page and individual service pages.

import Link from "next/link";
import Image from "next/image";
import { SERVICES, type Service } from "@/lib/data";

export default function ServicesPreview({ services: input }: { services?: Service[] }) {
  const services = (input?.length ? input : SERVICES).slice(0, 6);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Our Services</span>
            <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Everything your space needs, in one studio.
            </h2>
          </div>
          <Link
            href="/services"
            className="eyebrow inline-flex w-fit items-center gap-2 text-ink/80 transition hover:text-ink"
          >
            All services
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-cream-200"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={s.image.url}
                  alt={s.name}
                  fill
                  sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-800/80 via-olive-800/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow !text-cream-100/70">{s.tagline}</p>
                <h3 className="font-serif mt-1.5 text-xl text-cream-100">{s.name}</h3>
                <p className="mt-2 max-w-xs text-[13px] font-light leading-relaxed text-cream-100/0 transition-all duration-300 group-hover:text-cream-100/85">
                  {s.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
