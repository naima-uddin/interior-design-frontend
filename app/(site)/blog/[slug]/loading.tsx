import { Skeleton, ProseSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="bg-cream pb-24">
      {/* Header */}
      <header className="mx-auto flex max-w-3xl flex-col items-center px-5 pt-28 sm:px-8 sm:pt-36">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="mt-5 h-10 w-11/12" />
        <Skeleton className="mt-3 h-10 w-2/3" />
        <Skeleton className="mt-6 h-3 w-40" />
      </header>

      {/* Cover */}
      <div className="mx-auto mt-10 max-w-[1000px] px-5 sm:px-8">
        <Skeleton className="aspect-[16/9] w-full rounded-3xl" />
      </div>

      {/* Body */}
      <ProseSkeleton paragraphs={5} />
    </main>
  );
}
