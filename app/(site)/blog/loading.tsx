import { PageHeroSkeleton, Skeleton, CardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="pb-8">
      <PageHeroSkeleton />
      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-14 sm:px-8">
          {/* Featured post */}
          <div className="grid gap-8 overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 lg:grid-cols-2">
            <Skeleton className="aspect-[16/10] w-full rounded-none lg:aspect-auto" />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-8 w-11/12" />
              <Skeleton className="h-8 w-2/3" />
              <div className="space-y-2.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
              </div>
              <Skeleton className="h-3 w-32" />
            </div>
          </div>

          {/* Rest */}
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} aspect="aspect-[4/3]" lines={3} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
