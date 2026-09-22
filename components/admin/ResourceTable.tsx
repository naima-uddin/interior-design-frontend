"use client";

// Generic list view: fetches every item (incl. inactive) for a resource,
// renders a simple table with a thumbnail, title/subtitle, up/down reorder,
// active toggle, and edit/delete actions.
//
// Reordering renumbers the whole (currently sorted) list sequentially on each
// move and persists only the rows whose order actually changed — this stays
// correct even if some items share an order value or have gaps (e.g. newly
// created items default to order 0).

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ResourceConfig } from "@/lib/adminResources";
import { listAll, deleteItem, updateItem, ApiError } from "@/lib/adminApi";

type Item = Record<string, unknown> & { _id: string; order?: number; isActive?: boolean };

function firstImageUrl(item: Item, resource: ResourceConfig): string | null {
  const imgField = resource.fields.find((f) => f.type === "image" || f.type === "images");
  if (!imgField) return null;
  const v = item[imgField.key];
  if (imgField.type === "image") return (v as { url?: string })?.url || null;
  const arr = v as { url?: string }[] | undefined;
  return arr?.[0]?.url || null;
}

export default function ResourceTable({ resource }: { resource: ResourceConfig }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [reordering, setReordering] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await listAll<Item>(resource.key);
      setItems(data.items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load");
    }
  }, [resource.key]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (item: Item) => {
    const label = String(item[resource.titleField] ?? "this item");
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    await deleteItem(resource.key, item._id);
    load();
  };

  const toggleActive = async (item: Item) => {
    await updateItem(resource.key, item._id, { isActive: !item.isActive });
    load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    if (!items) return;
    const target = index + dir;
    if (target < 0 || target >= items.length) return;

    const original = items;
    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    const renumbered = reordered.map((it, i) => ({ ...it, order: i }));

    setItems(renumbered); // optimistic
    setReordering(true);
    try {
      const changed = renumbered.filter(
        (it, i) => original.find((o) => o._id === it._id)?.order !== i,
      );
      await Promise.all(
        changed.map((it) => updateItem(resource.key, it._id, { order: it.order })),
      );
    } catch {
      setError("Failed to save new order — reloading.");
    } finally {
      setReordering(false);
      load();
    }
  };

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!items) return <p className="text-sm text-stone-400">Loading…</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full min-w-160 text-left text-sm">
        <thead className="bg-cream-200 text-ink/60">
          <tr>
            <th className="w-14 px-3 py-3"></th>
            <th className="w-16 px-4 py-3"></th>
            <th className="px-2 py-3 font-normal">
              <span className="eyebrow">{resource.singular}</span>
            </th>
            <th className="w-24 px-4 py-3 font-normal">
              <span className="eyebrow">Active</span>
            </th>
            <th className="w-40 px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/8 bg-cream">
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-stone-400">
                No {resource.label.toLowerCase()} yet.
              </td>
            </tr>
          )}
          {items.map((item, index) => {
            const img = firstImageUrl(item, resource);
            return (
              <tr key={item._id} className="align-middle">
                <td className="px-3 py-3">
                  <div className="flex flex-col items-center gap-0.5">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0 || reordering}
                      aria-label="Move up"
                      className="grid h-6 w-6 place-items-center rounded text-ink/50 transition hover:bg-cream-200 hover:text-ink disabled:opacity-20"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === items.length - 1 || reordering}
                      aria-label="Move down"
                      className="grid h-6 w-6 place-items-center rounded text-ink/50 transition hover:bg-cream-200 hover:text-ink disabled:opacity-20"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {img ? (
                    <span className="relative block h-11 w-11 overflow-hidden rounded-lg bg-cream-200">
                      <Image src={img} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="block h-11 w-11 rounded-lg bg-cream-200" />
                  )}
                </td>
                <td className="px-2 py-3">
                  <p className="font-medium text-ink">
                    {String(item[resource.titleField] ?? "—")}
                  </p>
                  {resource.subtitleField && (
                    <p className="text-xs text-stone-400">
                      {String(item[resource.subtitleField] ?? "")}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(item)}
                    className={`h-6 w-11 rounded-full transition ${
                      item.isActive ? "bg-olive" : "bg-ink/15"
                    }`}
                    aria-label="Toggle active"
                  >
                    <span
                      className={`block h-5 w-5 translate-x-0.5 rounded-full bg-cream-100 transition-transform ${
                        item.isActive ? "translate-x-[22px]" : ""
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/interior-admin/${resource.key}/${item._id}`}
                      className="eyebrow text-ink/70 transition hover:text-ink"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(item)}
                      className="eyebrow text-red-400 transition hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
