"use client";

import { useState } from "react";

const OFFICE_ADDRESS =
  "House 127 (2nd floor), Road 05, Mohakhali New DOHS, Dhaka 1206";
const OFFICE_LABEL = "Velor Studio";

function mapEmbedSrc(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function ContactMap() {
  const [query, setQuery] = useState("");
  const [embedQuery, setEmbedQuery] = useState(`${OFFICE_LABEL}, ${OFFICE_ADDRESS}`);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) setEmbedQuery(q);
  }

  function resetToOffice() {
    setQuery("");
    setEmbedQuery(`${OFFICE_LABEL}, ${OFFICE_ADDRESS}`);
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a place or address on the map…"
          className="w-full rounded-full border border-ink/15 bg-cream-100 px-5 py-2.5 text-sm font-light text-ink outline-none transition focus:border-clay sm:flex-1"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="eyebrow shrink-0 rounded-full bg-[#383927] px-5 py-2.5 text-white! transition hover:bg-ink"
          >
            Search
          </button>
          <button
            type="button"
            onClick={resetToOffice}
            className="eyebrow shrink-0 rounded-full border border-ink/15 px-5 py-2.5 text-cream-500 transition hover:border-clay hover:text-clay"
          >
            Our studio
          </button>
        </div>
      </form>

      <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-ink/10">
        <iframe
          title={`Map — ${OFFICE_ADDRESS}`}
          src={mapEmbedSrc(embedQuery)}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm font-light text-stone">
        <p>{OFFICE_ADDRESS}</p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${OFFICE_LABEL}, ${OFFICE_ADDRESS}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow text-clay transition hover:text-ink"
        >
          Get directions →
        </a>
      </div>
    </div>
  );
}
