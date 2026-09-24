import { PageHeroSkeleton, Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="pb-20">
      <PageHeroSkeleton />
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1260px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Info column */}
          <div>
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-4 h-8 w-56" />
            <div className="mt-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border-b border-ink/10 py-5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-2.5 h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-3xl border border-ink/10 bg-cream-100 p-6 sm:p-9">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="mt-2 h-3.5 w-64" />
            <div className="mt-7 space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
