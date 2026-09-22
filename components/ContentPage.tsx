// Shared layout for simple, dashboard-managed content pages (About, Privacy
// Policy, Terms & Conditions, Cookies). Body paragraphs are authored as
// "Heading. Rest of the paragraph…" — when that pattern is detected each
// paragraph renders as a numbered, titled section with a jump-to nav;
// otherwise (e.g. About's flowing narrative) it renders as plain copy with a
// styled drop cap, matching the Journal article layout.

import PageHero from "@/components/PageHero";
import type { Page } from "@/lib/data";

type Section = { heading: string; text: string };

// A paragraph counts as a titled section when it opens with a short label
// ("Word(s).") within the first ~44 characters, followed by more text that
// itself contains a further sentence — this is how privacy/terms/cookies
// copy is authored, and reliably excludes narrative paragraphs like About's.
function parseSection(para: string): Section | null {
  const m = para.match(/^([A-Z][A-Za-z0-9&'’/\- ]{1,42}[.:?])\s+([\s\S]+)$/);
  if (!m) return null;
  const [, heading, rest] = m;
  if (heading.length > 44 || !/[.!?]\s|[.!?]$/.test(rest)) return null;
  return { heading: heading.replace(/[.:]$/, ""), text: rest };
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ContentPage({
  page,
  eyebrow,
}: {
  page: Page;
  eyebrow: string;
}) {
  const sections = page.body.map(parseSection);
  const titled = sections.every((s) => s !== null) && sections.length > 1;

  return (
    <main className="bg-cream pb-24">
      <PageHero
        eyebrow={eyebrow}
        title={page.title}
        subtitle={page.intro}
        breadcrumb={[{ label: page.title }]}
      />

      {titled ? (
        <section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
            {/* Jump-to nav */}
            <nav className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow text-ink/50">On this page</p>
                <ul className="mt-4 space-y-3 border-l border-ink/10 pl-4">
                  {(sections as Section[]).map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#${slugify(s.heading)}`}
                        className="block text-[13px] font-light leading-snug text-stone transition hover:text-clay"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Sections */}
            <div className="space-y-5">
              {(sections as Section[]).map((s, i) => (
                <div
                  key={i}
                  id={slugify(s.heading)}
                  className="scroll-mt-28 rounded-2xl border border-ink/10 bg-cream-100 p-6 sm:p-8"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-serif shrink-0 text-3xl leading-none text-clay/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-serif text-xl font-medium text-ink">
                        {s.heading}
                      </h2>
                      <p className="mt-2.5 text-[15px] font-light leading-relaxed text-stone">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
          {page.body.map((para, i) => (
            <p
              key={i}
              className={`text-[17px] leading-[1.8] text-ink/85 ${i > 0 ? "mt-6" : ""} ${
                i === 0
                  ? "first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-clay"
                  : ""
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </main>
  );
}
