import { PageHeroSkeleton, ProseSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="bg-cream pb-24">
      <PageHeroSkeleton />
      <ProseSkeleton paragraphs={6} />
    </main>
  );
}
