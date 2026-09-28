import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects — Velor",
  description:
    "Completed home interior design projects across Bangladesh — living rooms, bedrooms, kitchens, closets and full apartments.",
};

export default async function ProjectsPage() {
  // Fetch the full list at build time — the grid filters client-side, reading
  // the URL ?category= as its initial selection.
  const { items, categories } = await getProjects();

  return (
    <main className="pb-8">
      <PageHero
        eyebrow="Projects"
        title="Interiors we've brought to life."
        subtitle="A portfolio of completed homes across Bangladesh — each designed around how its owners actually live."
        breadcrumb={[{ label: "Projects" }]}
      />
      <Suspense fallback={null}>
        <ProjectsGrid projects={items} categories={categories} />
      </Suspense>
    </main>
  );
}
