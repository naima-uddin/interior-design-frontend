// "Shop by Room" — four tall image tiles with a hover-lift, mirroring the
// editorial reference. Sits between Featured Pieces and the Spaces block.

import Link from "next/link";
import Image from "next/image";
import { ROOMS, type Room } from "@/lib/data";

export default function ShopByRoom({ rooms }: { rooms?: Room[] }) {
  const items = rooms?.length ? rooms : ROOMS;
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1260px] px-5 pb-4 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">Shop by Room</span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl -mb-2">
              Every corner, considered.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((room) => (
            <Link key={room.name} href={room.href} className="group relative block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-200">
                <Image
                  src={room.image.url}
                  alt={room.name}
                  fill
                  sizes="(min-width:1024px) 280px, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-800/40 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="font-serif text-xl text-cream-100">{room.name}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/50 text-cream-100 transition group-hover:bg-cream-100 group-hover:text-ink">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
