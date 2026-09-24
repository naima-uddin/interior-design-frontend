import { Skeleton, CardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="bg-cream pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        <Skeleton className="mb-8 h-3 w-56" />

        {/* Gallery + details */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="mt-4 flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="mt-3 h-11 w-4/5" />
            <Skeleton className="mt-5 h-6 w-32" />
            <div className="mt-6 max-w-md space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="mt-8 h-12 w-48 rounded-full" />
            <div className="mt-10 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between border-b border-ink/10 py-3.5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-24 border-t border-ink/10 pt-14">
          <Skeleton className="mb-10 h-8 w-56" />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} aspect="aspect-square" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
