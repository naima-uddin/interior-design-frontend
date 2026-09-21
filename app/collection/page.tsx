import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CollectionGrid from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "Collection — Velor",
  description:
    "Sofas, seating, tables, storage and lighting — considered pieces made to belong in your home.",
};

export default function CollectionPage() {
  return (
    <main className="pb-8">
      <PageHero
        eyebrow="The Collection"
        title="Considered pieces, made to last."
        subtitle="Honest materials and quiet forms across every room — designed slowly, built to be lived with for years."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Collection", href: "/collection" },
        ]}
      />
      <CollectionGrid />
    </main>
  );
}
