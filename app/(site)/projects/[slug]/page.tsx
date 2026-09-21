import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS, relatedProjects, projectCategoryName } from "@/lib/data";
import { getProject, getProjects } from "@/lib/api";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Not found — Velor" };
  return { title: `${project.title} — Velor`, description: project.overview };
}

const meta = (label: string, value: string) => (
  <div>
    <p className="eyebrow !text-cream-100/55">{label}</p>
    <p className="mt-1.5 text-sm font-light text-cream-100">{value}</p>
  </div>
);

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { items: allProjects } = await getProjects();
  const related = relatedProjects(project, 3, allProjects);

  return (
    <main>
      {/* Cover hero */}
      <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden bg-[#383927]">
        <Image
          src={project.cover.url}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-800/85 via-olive-800/25 to-olive-800/40" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1260px] px-5 pb-10 sm:px-8 sm:pb-14">
            <nav className="eyebrow mb-4 flex items-center gap-2 !tracking-[0.16em] text-cream-100/70">
              <Link href="/" className="transition hover:text-cream-100">Home</Link>
              <span>/</span>
              <Link href="/projects" className="transition hover:text-cream-100">Projects</Link>
            </nav>
            <span className="eyebrow rounded-full bg-cream-100/15 px-3.5 py-1.5 !text-cream-100/90 backdrop-blur-sm">
              {projectCategoryName(project.category)}
            </span>
            <h1 className="font-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-cream-100 sm:text-5xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="bg-[#383927] text-cream-100">
        <div className="mx-auto grid max-w-[1260px] grid-cols-2 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-4">
          {meta("Location", project.location)}
          {meta("Area", `${project.area} apartment`)}
          {meta("Completed", project.year)}
          {meta("Duration", project.duration)}
        </div>
      </section>

      {/* Overview + scope */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1260px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <span className="eyebrow">Overview</span>
            <p className="font-serif mt-5 text-2xl font-normal leading-snug tracking-tight text-ink sm:text-[1.9rem]">
              {project.overview}
            </p>
          </div>
          <div className="lg:pt-1">
            <span className="eyebrow">Scope of work</span>
            <ul className="mt-5 space-y-3.5">
              {project.scope.map((s) => (
                <li key={s} className="flex items-start gap-3 border-b border-ink/10 pb-3.5 text-sm font-light text-ink">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream pb-20">
        <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
          <span className="eyebrow">Gallery</span>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((im, i) => (
              <div
                key={im.url}
                className={`relative overflow-hidden rounded-2xl bg-cream-200 ${i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
              >
                <Image
                  src={im.url}
                  alt={`${project.title} — view ${i + 1}`}
                  fill
                  sizes="(min-width:640px) 620px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related + CTA */}
      {related.length > 0 && (
        <section className="bg-cream-100">
          <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
                More projects
              </h2>
              <Link
                href="/projects"
                className="eyebrow inline-flex items-center gap-2 text-ink/80 transition hover:text-ink"
              >
                View all
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p._id}
                  href={`/projects/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(42,38,34,0.5)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                    <Image
                      src={p.cover.url}
                      alt={p.title}
                      fill
                      sizes="(min-width:1024px) 380px, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="px-5 py-5">
                    <h3 className="font-serif text-lg font-medium leading-snug text-ink transition-colors group-hover:text-clay">
                      {p.title}
                    </h3>
                    <p className="eyebrow mt-2 !tracking-[0.14em]">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
