// "Made to belong." — full-bleed lifestyle band with a dark overlay, a big
// serif headline on the left, and a divided list of three feature points on
// the right, mirroring the "Form meets function" reference.

import Link from "next/link";
import Image from "next/image";
import { SPACES_IMAGE } from "@/lib/data";

const POINTS = [
  {
    title: "Think blueprints",
    body: "Every project starts with a clear floor plan and a layout built around how you actually live.",
    icon: <BlueprintIcon />,
  },
  {
    title: "Furniture placing",
    body: "Pieces chosen and placed for flow, comfort and scale — never just to fill a room.",
    icon: <ChairIcon />,
  },
  {
    title: "Plants are important",
    body: "Greenery and natural texture, layered in to keep every space feeling alive.",
    icon: <PlantIcon />,
  },
];

export default function MadeToBelong({ image }: { image?: { url: string } | null }) {
  const cover = image?.url ? image : SPACES_IMAGE;
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src={cover.url}
        alt="A space designed to belong"
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />

      <div className="relative mx-auto grid max-w-[1260px] gap-12 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Text panel */}
        <div className="flex flex-col justify-center">
          <span className="eyebrow !text-cream-100/60">Making a functional home</span>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-cream-100 sm:text-5xl lg:text-[3.4rem]">
            Form meets
            <br />
            function.
          </h2>
          <div className="mt-6 h-px w-16 bg-cream-100/30" />
          <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed text-cream-100/75">
            We don&apos;t believe in moving to a new place and replicating the
            one you left behind. Where&apos;s the fun in that?
          </p>
          <Link
            href="/spaces"
            className="eyebrow group mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-cream-100/30 px-6 py-3.5 text-cream-100 transition hover:border-cream-100 hover:bg-cream-100 hover:text-ink"
          >
            Find out more
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Feature points */}
        <ul className="flex flex-col justify-center divide-y divide-cream-100/15">
          {POINTS.map((p) => (
            <li key={p.title} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
              <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream-100/25 text-cream-100">
                {p.icon}
              </span>
              <div>
                <h3 className="font-serif text-xl font-medium text-cream-100">{p.title}</h3>
                <div className="mt-2 h-px w-8 bg-clay/70" />
                <p className="mt-2 max-w-xs text-[13px] font-light uppercase tracking-wide text-cream-100/60">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BlueprintIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h7v7M13 4v6h7" />
    </svg>
  );
}

function ChairIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12v7a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15v5M16 15v5" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11C12 6 8 5 5 5c0 4 2 7 7 7ZM12 9c0-4 3-5 6-5 0 3.5-2 6-6 6" />
      <path strokeLinecap="round" d="M8 21h8" />
    </svg>
  );
}
