"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource } from "@/lib/adminResources";
import ResourceTable from "@/components/admin/ResourceTable";

export default function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: key } = use(params);
  const resource = getResource(key);
  if (!resource) notFound();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium text-ink">{resource.label}</h1>
          <p className="mt-1.5 text-sm font-light text-stone">
            {resource.singular} entries shown on the storefront.
          </p>
        </div>
        <Link
          href={`/interior-admin/${resource.key}/new`}
          className="eyebrow rounded-full bg-olive px-6 py-3 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800"
        >
          + New {resource.singular}
        </Link>
      </div>

      <ResourceTable resource={resource} />
    </div>
  );
}
