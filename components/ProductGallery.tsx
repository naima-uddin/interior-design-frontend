"use client";

// Product image gallery — one large image plus selectable thumbnails.
// Client component so the active image can change on click/keyboard.

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  alt,
}: {
  images: { url: string }[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 sm:flex-col">
          {images.map((im, i) => (
            <button
              key={im.url}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-20 overflow-hidden rounded-xl transition ring-1 ${
                i === active
                  ? "ring-2 ring-olive"
                  : "ring-ink/10 hover:ring-ink/30"
              }`}
            >
              <Image src={im.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-cream-200">
        <Image
          key={images[active].url}
          src={images[active].url}
          alt={alt}
          fill
          priority
          sizes="(min-width:1024px) 620px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
