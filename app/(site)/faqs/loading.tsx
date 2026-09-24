import { PageHeroSkeleton, Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="pb-8">
      <PageHeroSkeleton />
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-6 py-6">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
