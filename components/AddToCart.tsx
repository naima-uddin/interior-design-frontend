"use client";

// Colour swatch picker + quantity stepper + add-to-cart button.
// Local UI state only for now (no cart backend yet) — shows a brief confirmed
// state so the interaction feels complete. Wires to the cart API later.

import { useState } from "react";

export default function AddToCart({ colours }: { colours: string[] }) {
  const [colour, setColour] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const add = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

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
              className={`h-8 w-8 rounded-full ring-1 ring-ink/15 transition ${
                i === colour
                  ? "ring-2 ring-offset-2 ring-offset-cream ring-olive"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Quantity + Add */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-14 w-fit items-center rounded-full border border-ink/15">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-14 w-12 place-items-center text-ink/70 transition hover:text-ink"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M5 12h14" />
            </svg>
          </button>
          <span className="w-8 text-center text-sm tabular-nums text-ink">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="grid h-14 w-12 place-items-center text-ink/70 transition hover:text-ink"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        <button
          onClick={add}
          className="eyebrow h-14 flex-1 rounded-full bg-olive !tracking-[0.18em] !text-cream-100 transition hover:bg-olive-800"
        >
          {added ? "Added to bag ✓" : "Add to bag"}
        </button>
      </div>

      <p className="text-xs font-light text-stone">
        Free white-glove delivery · Made to order in 4–6 weeks
      </p>
    </div>
  );
}
