import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main>
      <section className="bg-cream pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
          <Skeleton className="h-3 w-56" />
          <div className="grid items-center gap-10 pb-16 pt-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <Skeleton className="h-3 w-32" />
              <Skeleton className="mt-4 h-11 w-4/5" />
              <div className="mt-6 max-w-md space-y-2.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="mt-4 h-5 w-40" />
              <div className="mt-8 flex flex-wrap gap-3">
                <Skeleton className="h-12 w-52 rounded-full" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
