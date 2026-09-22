"use client";

// Dedicated editor for the homepage "Before / After Transform" band — lives
// under the site Setting singleton (key: "site"), same document the general
// Settings page edits, so we load/save the full doc but only expose the
// beforeAfter slice here.

import { useEffect, useState } from "react";
import { getSettingsAdmin, updateSettings, ApiError } from "@/lib/adminApi";
import ObjectListEditor from "@/components/admin/ObjectListEditor";
import ImageUploader from "@/components/admin/ImageUploader";

type Settings = {
  [key: string]: unknown;
  beforeAfter?: {
    title?: string;
    intro?: string;
    beforeImage?: { url: string };
    afterImage?: { url: string };
    points?: Record<string, unknown>[];
  };
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-cream p-6">
      <h2 className="font-serif mb-5 text-xl font-medium text-ink">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-cream-100 px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
      />
    </div>
  );
}

export default function BeforeAfterSettingsPage() {
  const [data, setData] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSettingsAdmin<Settings>()
      .then(setData)
      .catch(() => setError("Failed to load settings."));
  }, []);

  const set = (path: string, value: unknown) => {
    setData((prev) => {
      const next: Settings = structuredClone(prev || {});
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cur: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = cur[keys[i]] ?? {};
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await updateSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (error && !data) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-stone-400">Loading…</p>;

  return (
    <div className="max-w-4xl space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium text-ink">Before / After Transform</h1>
          <p className="mt-1.5 text-sm font-light text-stone">
            The homepage drag-to-reveal comparison band — heading, copy, both images and the checklist.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="eyebrow rounded-full bg-olive px-7 py-3.5 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <Section title="Content">
        <TextField
          label="Heading"
          value={data.beforeAfter?.title}
          onChange={(v) => set("beforeAfter.title", v)}
        />
        <div>
          <label className="eyebrow mb-2 block">Intro</label>
          <textarea
            value={data.beforeAfter?.intro ?? ""}
            onChange={(e) => set("beforeAfter.intro", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-ink/15 bg-cream-100 px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUploader
            label="Before image"
            value={data.beforeAfter?.beforeImage}
            onChange={(img) => set("beforeAfter.beforeImage", img)}
            folder="misc"
          />
          <ImageUploader
            label="After image"
            value={data.beforeAfter?.afterImage}
            onChange={(img) => set("beforeAfter.afterImage", img)}
            folder="misc"
          />
        </div>
        <ObjectListEditor
          label="Checklist points"
          value={data.beforeAfter?.points}
          onChange={(v) => set("beforeAfter.points", v)}
          fields={[{ key: "text", label: "Text", type: "textarea" }]}
        />
      </Section>
    </div>
  );
}
