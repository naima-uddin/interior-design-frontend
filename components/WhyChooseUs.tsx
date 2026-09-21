// "Why choose us" — a dark-olive band pairing a stats column with the five
// trust factors, plus a company image. Agency-style credibility block.

import Image from "next/image";
import { WHY_CHOOSE, COMPANY } from "@/lib/data";

export default function WhyChooseUs({
  items,
  company,
}: {
  items?: { title: string; body: string }[];
  company?: typeof COMPANY | null;
}) {
  const points = items?.length ? items : WHY_CHOOSE;
  const stats = (company ?? COMPANY).stats;
  return (
    <section className="bg-[#383927] text-cream-100">
      <div className="mx-auto max-w-[1260px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: intro + image + stats */}
          <div>
            <span className="eyebrow !text-cream-100/60">Why Velor</span>
            <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
              A studio you can build a home with.
            </h2>
            <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-cream-100/75">
              Design, manufacturing and project management under one roof — so
              your project runs smoothly from the first sketch to the day you
              move in.
            </p>

            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Inside the Velor workshop"
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl font-medium sm:text-4xl">{s.value}</p>
                  <p className="eyebrow mt-2 !text-cream-100/55 !tracking-[0.14em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: trust factors */}
          <ul className="flex flex-col justify-center divide-y divide-cream-100/12">
            {points.map((w, i) => (
              <li key={w.title} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                <span className="font-serif text-2xl text-clay/80">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-medium text-cream-100">{w.title}</h3>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-cream-100/70">
                    {w.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
