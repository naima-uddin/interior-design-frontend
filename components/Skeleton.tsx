// ─────────────────────────────────────────────────────────────────────────
// Skeleton primitives — used by the route-level loading.tsx files to show an
// instant, warm placeholder while a Server Component streams in. Colours track
// the design tokens (cream surfaces, ink fills) so the shimmer reads on-brand.
// Server-compatible (no "use client"): loading.tsx wraps page.tsx in a
// <Suspense> boundary and renders these while the page's data is fetched.
// ─────────────────────────────────────────────────────────────────────────

/** Base shimmer block. Compose with width/height/rounding via `className`. */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded bg-ink/[0.08] ${className}`}
    />
  );
}

/** Placeholder for the compact inner-page header (mirrors PageHero). */
export function PageHeroSkeleton() {
  return (
    <section className="bg-cream pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        <Skeleton className="h-3 w-40" />
        <div className="mt-6 flex flex-col gap-5 border-b border-ink/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-xl">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-4 h-11 w-full max-w-md sm:h-14" />
            <Skeleton className="mt-3 h-11 w-2/3 sm:h-14" />
          </div>
          <div className="w-full max-w-sm space-y-2.5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** A single image-over-caption card, as used across the grids. */
export function CardSkeleton({
  aspect = "aspect-[4/3]",
  lines = 2,
}: {
  aspect?: string;
  lines?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream-100">
      <Skeleton className={`w-full rounded-none ${aspect}`} />
      <div className="space-y-2.5 px-5 py-5">
        <Skeleton className="h-5 w-4/5" />
        {Array.from({ length: Math.max(0, lines - 1) }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-1/2" />
        ))}
      </div>
    </div>
  );
}

/** Filter-chip row placeholder (projects / collection grids). */
export function ChipRowSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="mb-10 flex flex-wrap items-center gap-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-24 rounded-full" />
      ))}
    </div>
  );
}

/** A responsive grid of card skeletons, optionally preceded by filter chips. */
export function CardGridSkeleton({
  count = 6,
  chips = false,
  aspect = "aspect-[4/3]",
}: {
  count?: number;
  chips?: boolean;
  aspect?: string;
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1260px] px-5 py-10 sm:px-8 sm:py-14">
        {chips && <ChipRowSkeleton />}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} aspect={aspect} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Long-form copy placeholder (About / Journal article / legal pages). */
export function ProseSkeleton({ paragraphs = 4 }: { paragraphs?: number }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      {Array.from({ length: paragraphs }).map((_, p) => (
        <div key={p} className={`space-y-3 ${p > 0 ? "mt-8" : ""}`}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}
