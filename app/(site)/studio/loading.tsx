import { PageHeroSkeleton, Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="pb-24">
      <PageHeroSkeleton />
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1260px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-9 w-1/2" />
            <div className="space-y-2.5 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
