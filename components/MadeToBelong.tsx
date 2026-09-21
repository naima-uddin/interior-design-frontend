// "Made to belong." — the Spaces block. Text panel on the left over cream,
// a full-height lifestyle image on the right, mirroring the reference.

import Link from "next/link";
import Image from "next/image";
import { SPACES_IMAGE } from "@/lib/data";

export default function MadeToBelong({ image }: { image?: { url: string } | null }) {
  const cover = image?.url ? image : SPACES_IMAGE;
  return (
    <section className="bg-cream-100">
      <div className="mx-auto grid max-w-[1260px] items-stretch gap-0 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Text panel */}
        <div className="flex flex-col justify-center py-4 lg:py-10">
          <span className="eyebrow">Spaces</span>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Made to
            <br />
            belong.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed text-stone">
            Spaces for real life. Designed to feel effortless, enduring and
            entirely yours — considered from the floor plan to the final object
            on the shelf.
          </p>
          <Link
            href="/spaces"
            className="eyebrow group mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-ink transition hover:border-olive hover:bg-[#383927] hover:text-cream-100"
          >
            Explore spaces
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Image */}
        <div className="relative min-h-[340px] overflow-hidden rounded-2xl sm:min-h-[460px] lg:min-h-[540px]">
          <Image
            src={cover.url}
            alt="A dining space designed to belong"
            fill
            sizes="(min-width:1024px) 700px, 100vw"
            className="object-cover"
          />
          <span className="eyebrow absolute right-5 top-5 rounded-full bg-cream-100/80 px-3.5 py-1.5 !text-[9px] backdrop-blur-md">
            Same beautiful days ahead
          </span>
        </div>
      </div>
    </section>
  );
}
