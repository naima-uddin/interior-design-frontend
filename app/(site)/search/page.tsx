import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata: Metadata = {
  title: "Search — Velor",
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
