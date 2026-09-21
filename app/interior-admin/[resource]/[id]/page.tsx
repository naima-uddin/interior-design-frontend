"use client";

// Create/edit page for a single resource item. id === "new" renders an empty
// form (create mode); any other id fetches that item from the admin list
// (which includes inactive items) and pre-fills the form (edit mode).

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource } from "@/lib/adminResources";
import { listAll } from "@/lib/adminApi";
import ResourceForm from "@/components/admin/ResourceForm";

export default function ResourceEditPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource: key, id } = use(params);
  const resource = getResource(key);
  if (!resource) notFound();

  const isNew = id === "new";
  const [initial, setInitial] = useState<Record<string, unknown> | null>(isNew ? {} : null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    listAll(resource!.key)
      .then((data) => {
        const item = data.items.find((i) => (i as { _id: string })._id === id);
        if (!item) {
          setError("Item not found.");
          return;
        }
        setInitial(item);
      })
      .catch(() => setError("Failed to load item."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isNew]);

  return (
    <div className="max-w-3xl">
      <Link
        href={`/interior-admin/${resource.key}`}
        className="eyebrow mb-6 inline-flex items-center gap-2 text-ink/60 transition hover:text-ink"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Back to {resource.label}
      </Link>

      <h1 className="font-serif text-3xl font-medium text-ink">
        {isNew ? `New ${resource.singular}` : `Edit ${resource.singular}`}
      </h1>

      <div className="mt-8">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!error && initial && (
          <ResourceForm resource={resource} initial={initial} id={isNew ? undefined : id} />
        )}
        {!error && !initial && <p className="text-sm text-stone-400">Loading…</p>}
      </div>
    </div>
  );
}
