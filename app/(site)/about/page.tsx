import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/api";
import ContentPage from "@/components/ContentPage";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("about");
  if (!page) return { title: "Not found — Velor" };
  return { title: `${page.title} — Velor`, description: page.intro };
}

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) notFound();
  return <ContentPage page={page} eyebrow="About Us" />;
}
