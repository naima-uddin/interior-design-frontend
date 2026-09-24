import { Skeleton, CardGridSkeleton } from "@/components/Skeleton";

// Home fallback — full-bleed banner placeholder followed by a couple of the
// section grids that make up the landing page.
export default function Loading() {
  return (
    <main>
      {/* Banner */}
      <section className="relative">
        <Skeleton className="h-[82vh] min-h-[520px] w-full rounded-none" />
      </section>

      {/* A featured section */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-20">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-4 h-9 w-72 max-w-full" />
        </div>
      </section>
      <CardGridSkeleton count={6} />
    </main>
  );
}
