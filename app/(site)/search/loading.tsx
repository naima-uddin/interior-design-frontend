import { PageHeroSkeleton, CardGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="pb-8">
      <PageHeroSkeleton />
      <CardGridSkeleton count={6} />
    </main>
  );
}
