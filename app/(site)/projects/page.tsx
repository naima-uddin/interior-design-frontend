import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects — Velor",
  description:
    "Completed home interior design projects across Bangladesh — living rooms, bedrooms, kitchens, closets and full apartments.",
};

export default async function ProjectsPage({
  searchParams,
}: PageProps<"/projects">) {
  const sp = await searchParams;
  const raw = sp.category;
  const category = Array.isArray(raw) ? raw[0] : raw ?? "all";
  // Fetch the full list — the grid filters client-side, so the URL category is
  // only the initial selection.
  const { items, categories } = await getProjects();

  return (
    <main className="pb-8">
      <PageHero
        eyebrow="Projects"
        title="Interiors we've brought to life."
        subtitle="A portfolio of completed homes across Bangladesh — each designed around how its owners actually live."
        breadcrumb={[{ label: "Projects" }]}
      />
      <ProjectsGrid
        initialCategory={category}
        projects={items}
        categories={categories}
      />
    </main>
  );
}
