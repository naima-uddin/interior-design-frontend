import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main>
      {/* Cover hero */}
      <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden bg-olive-800">
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1260px] px-5 pb-10 sm:px-8 sm:pb-14">
            <Skeleton className="h-3 w-48 bg-cream-100/20" />
            <Skeleton className="mt-4 h-7 w-32 rounded-full bg-cream-100/20" />
            <Skeleton className="mt-4 h-12 w-2/3 max-w-2xl bg-cream-100/20" />
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="bg-olive-800">
        <div className="mx-auto grid max-w-[1260px] grid-cols-2 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-20 bg-cream-100/20" />
              <Skeleton className="h-4 w-28 bg-cream-100/20" />
            </div>
          ))}
        </div>
      </section>

      {/* Overview + scope */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1260px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <div className="lg:pt-1">
            <Skeleton className="h-3 w-28" />
            <div className="mt-5 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
