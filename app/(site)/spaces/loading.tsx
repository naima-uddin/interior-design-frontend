import { PageHeroSkeleton, CardGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="pb-24">
      <PageHeroSkeleton />
      <CardGridSkeleton count={6} />
    </main>
  );
}
