import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/ProcessSteps";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Velor",
  description:
    "Full-service interior design — home, bedroom, living, kitchen, bathroom, custom furniture and more, from concept to handover.",
};

export default function ServicesPage() {
  return (
    <main className="pb-8">
      <PageHero
        eyebrow="Our Services"
        title="Everything your space needs."
        subtitle="Design, custom manufacturing and project management under one roof — for a single room or a whole home."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-14 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream-100 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(42,38,34,0.5)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-cream-200">
                  <Image
                    src={s.image.url}
                    alt={s.name}
                    fill
                    sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow">{s.tagline}</p>
                  <h3 className="font-serif mt-2 text-xl font-medium text-ink transition-colors group-hover:text-clay">
                    {s.name}
                  </h3>
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-stone">
                    {s.summary}
                  </p>
                  <span className="eyebrow mt-4 inline-flex items-center gap-2 text-ink/70 transition group-hover:text-clay">
                    Learn more
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps className="bg-cream-100" />
    </main>
  );
}
