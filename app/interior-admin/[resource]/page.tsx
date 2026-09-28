// Server wrapper so `output: export` can pre-render one page per resource key.
// The interactive list lives in ResourceListClient.

import { RESOURCES } from "@/lib/adminResources";
import ResourceListClient from "./ResourceListClient";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ resource: r.key }));
}

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  return <ResourceListClient resourceKey={resource} />;
}
