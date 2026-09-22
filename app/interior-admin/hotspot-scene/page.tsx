"use client";

// Homepage hotspot scene editor — eyebrow/title/intro, scene image, and
// interactive hotspot points. Lives on its own route, split out of Settings.

import { useEffect, useState } from "react";
import { getSettingsAdmin, updateSettings, ApiError } from "@/lib/adminApi";
import ImageUploader from "@/components/admin/ImageUploader";
import HotspotPositionEditor from "@/components/admin/HotspotPositionEditor";

type Settings = {
  hotspot?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    image?: { url: string };
    points?: { x: number; y: number; title: string; body: string }[];
  };
  [key: string]: unknown;
};

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

export default function HotspotScenePage() {
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium text-ink sm:text-3xl">Homepage Hotspot Scene</h1>
          <p className="mt-1.5 text-sm font-light text-stone">
            The interactive scene image and hotspot points shown on the homepage.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="eyebrow w-fit rounded-full bg-olive px-7 py-3.5 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-ink/10 bg-cream p-6">
        <div className="space-y-5">
          <TextField
            label="Eyebrow"
            value={data.hotspot?.eyebrow}
            onChange={(v) => set("hotspot.eyebrow", v)}
          />
          <TextField
            label="Title"
            value={data.hotspot?.title}
            onChange={(v) => set("hotspot.title", v)}
          />
          <div>
            <label className="eyebrow mb-2 block">Intro</label>
            <textarea
              value={data.hotspot?.intro ?? ""}
              onChange={(e) => set("hotspot.intro", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-ink/15 bg-cream-100 px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
            />
          </div>
          <ImageUploader
            label="Scene image"
            value={data.hotspot?.image}
            onChange={(img) => set("hotspot.image", img)}
            folder="misc"
          />
          <HotspotPositionEditor
            image={data.hotspot?.image}
            points={data.hotspot?.points ?? []}
            onChange={(v) => set("hotspot.points", v)}
          />
        </div>
      </div>
    </div>
  );
}
