"use client";

// Colour swatch picker + enquire action.
// There is no cart checkout — every purchase intent routes to the contact form
// where a designer follows up, so the primary action links to /contact.

import { useState } from "react";
import Link from "next/link";

export default function AddToCart({
  colours,
  product,
}: {
  colours: string[];
  product?: string;
}) {
  const [colour, setColour] = useState(0);

  const contactHref = product
    ? `/contact?product=${encodeURIComponent(product)}`
    : "/contact";

  return (
    <div className="mt-8 space-y-7">
      {/* Colours */}
      <div>
        <p className="eyebrow mb-3">Finish</p>
        <div className="flex items-center gap-3">
          {colours.map((c, i) => (
            <button
              key={c}
              onClick={() => setColour(i)}
              aria-label={`Finish ${i + 1}`}
              className={`h-9 w-9 rounded-full ring-1 ring-ink/15 transition ${
                i === colour
                  ? "ring-2 ring-offset-2 ring-offset-cream ring-olive"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Enquire */}
      <Link
        href={contactHref}
        className="eyebrow grid h-14 w-full place-items-center rounded-full bg-olive !tracking-[0.18em] !text-cream-100 transition hover:bg-olive-800"
      >
        Enquire now
      </Link>

      <p className="text-xs font-light text-stone">
        Free white-glove delivery · Made to order in 4–6 weeks
      </p>
    </div>
  );
}
