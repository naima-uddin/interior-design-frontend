// Compact page header for inner pages. Sits below the fixed navbar (top
// padding accounts for it) with an eyebrow, a large serif title and an
// optional supporting line. Optional breadcrumb on the right.

import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <section className="bg-cream pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        {breadcrumb && (
          <nav className="eyebrow mb-6 flex items-center gap-2 !tracking-[0.16em] text-stone">
            {breadcrumb.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-stone-400">/</span>}
                <Link href={c.href} className="transition hover:text-ink">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col gap-5 border-b border-ink/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="font-serif mt-4 text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="max-w-sm text-[15px] font-light leading-relaxed text-stone">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
