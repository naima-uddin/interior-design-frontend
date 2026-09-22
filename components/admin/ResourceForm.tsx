"use client";

// Generic create/edit form — renders one input per FieldConfig from
// lib/adminResources.ts, plus the implicit `order` and `isActive` controls
// every resource carries. Submits via createItem/updateItem.

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ResourceConfig } from "@/lib/adminResources";
import { createItem, updateItem, ApiError } from "@/lib/adminApi";
import ImageUploader from "./ImageUploader";
import ImagesUploader from "./ImagesUploader";
import StringListEditor from "./StringListEditor";

type Values = Record<string, unknown>;

const MULTILINE_STRING_LIST = new Set(["body"]); // paragraph-style stringArray fields

export default function ResourceForm({
  resource,
  initial,
  id,
}: {
  resource: ResourceConfig;
  initial?: Values;
  id?: string; // present => edit mode
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => ({
    order: 0,
    isActive: true,
    ...initial,
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, v: unknown) => setValues((prev) => ({ ...prev, [key]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (id) {
        await updateItem(resource.key, id, values);
      } else {
        await createItem(resource.key, values);
      }
      router.push(`/interior-admin/${resource.key}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {resource.fields.map((f) => (
        <div key={f.key}>
          {f.type === "text" && (
            <>
              <label className="eyebrow mb-2 block">
                {f.label}
                {f.required && <span className="text-clay"> *</span>}
              </label>
              <input
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                required={f.required}
                className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
              />
              {f.help && <p className="mt-1.5 text-xs text-stone-400">{f.help}</p>}
            </>
          )}

          {f.type === "textarea" && (
            <>
              <label className="eyebrow mb-2 block">
                {f.label}
                {f.required && <span className="text-clay"> *</span>}
              </label>
              <textarea
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                required={f.required}
                rows={4}
                className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
              />
            </>
          )}

          {f.type === "number" && (
            <>
              <label className="eyebrow mb-2 block">
                {f.label}
                {f.required && <span className="text-clay"> *</span>}
              </label>
              <input
                type="number"
                value={(values[f.key] as number) ?? ""}
                onChange={(e) => set(f.key, e.target.value === "" ? undefined : Number(e.target.value))}
                required={f.required}
                className="w-full max-w-48 rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
              />
            </>
          )}

          {f.type === "boolean" && (
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!values[f.key]}
                onChange={(e) => set(f.key, e.target.checked)}
                className="h-4 w-4 accent-olive"
              />
              <span className="text-sm text-ink">{f.label}</span>
            </label>
          )}

          {f.type === "image" && (
            <ImageUploader
              label={f.label}
              value={values[f.key] as { url: string } | undefined}
              onChange={(img) => set(f.key, img)}
              folder={resource.uploadFolder}
            />
          )}

          {f.type === "images" && (
            <ImagesUploader
              label={f.label}
              value={values[f.key] as { url: string }[] | undefined}
              onChange={(imgs) => set(f.key, imgs)}
              folder={resource.uploadFolder}
            />
          )}

          {f.type === "stringArray" && (
            <StringListEditor
              label={f.label}
              value={values[f.key] as string[] | undefined}
              onChange={(items) => set(f.key, items)}
              placeholder={f.placeholder}
              multiline={MULTILINE_STRING_LIST.has(f.key)}
            />
          )}
        </div>
      ))}

      {/* Implicit fields every resource has */}
      <div className="grid grid-cols-1 gap-6 border-t border-ink/10 pt-6 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-2 block">Sort order</label>
          <input
            type="number"
            value={(values.order as number) ?? 0}
            onChange={(e) => set("order", Number(e.target.value))}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-3 pt-8">
          <input
            type="checkbox"
            checked={values.isActive !== false}
            onChange={(e) => set("isActive", e.target.checked)}
            className="h-4 w-4 accent-olive"
          />
          <span className="text-sm text-ink">Active (visible on the site)</span>
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-ink/10 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="eyebrow rounded-full bg-olive px-7 py-3.5 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : id ? "Save changes" : `Create ${resource.singular}`}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/interior-admin/${resource.key}`)}
          className="eyebrow text-ink/60 transition hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
