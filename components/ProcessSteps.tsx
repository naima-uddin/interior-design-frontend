// "How it works" — the six-step project process, shown as a connected grid of
// numbered cards. Reused on the homepage and services pages.

import { PROCESS } from "@/lib/data";

export default function ProcessSteps({
  className = "bg-cream",
  steps,
}: {
  className?: string;
  steps?: { step: string; title: string; body: string }[];
}) {
  const items = steps?.length ? steps : PROCESS;
  return (
    <section className={className}>
      <div className="mx-auto max-w-[1260px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            From first hello to handover.
          </h2>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-stone">
            A clear, six-step process that keeps your project calm, transparent
            and on schedule the whole way through.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.step} className="bg-cream-100 p-7 transition hover:bg-cream-200">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-medium text-clay/40">{p.step}</span>
                <h3 className="font-serif text-xl font-medium text-ink">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm font-light leading-relaxed text-stone">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
