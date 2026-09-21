// Compact page header for inner pages. Sits below the fixed navbar (top
// padding accounts for it) with a breadcrumb, an eyebrow, a large serif title
// and an optional supporting line.

import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return (
    <section className="bg-cream pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <div className="mt-6 flex flex-col gap-5 border-b border-ink/10 pb-10 md:flex-row md:items-end md:justify-between">
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
