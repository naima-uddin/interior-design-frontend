"use client";

// Dashboard overview — a card per resource with its item count, linking
// straight into that resource's list.

import { useEffect, useState } from "react";
import Link from "next/link";
import { RESOURCES } from "@/lib/adminResources";
import { listAll } from "@/lib/adminApi";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    RESOURCES.forEach((r) => {
      listAll(r.key)
        .then((data) => setCounts((c) => ({ ...c, [r.key]: data.items.length })))
        .catch(() => {});
    });
  }, []);

  return (
    <div>
      <h1 className="font-serif text-3xl font-medium text-ink">Dashboard</h1>
      <p className="mt-1.5 text-sm font-light text-stone">
        Manage every piece of content that appears on velor.studio.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {RESOURCES.map((r) => (
          <Link
            key={r.key}
            href={`/interior-admin/${r.key}`}
            className="rounded-2xl border border-ink/10 bg-cream-100 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-25px_rgba(42,38,34,0.4)]"
          >
            <p className="font-serif text-3xl font-medium text-ink">
              {counts[r.key] ?? "—"}
            </p>
            <p className="eyebrow mt-2">{r.label}</p>
          </Link>
        ))}
        <Link
          href="/interior-admin/settings"
          className="rounded-2xl border border-dashed border-ink/20 p-5 text-ink/60 transition hover:border-olive hover:text-olive"
        >
          <p className="font-serif text-2xl">⚙</p>
          <p className="eyebrow mt-2">Site Settings</p>
        </Link>
      </div>
    </div>
  );
}
