"use client";

// Singleton site-settings editor: company/contact info, product & project
// categories, "why choose us" points, the process timeline, and the homepage
// hotspot scene. One document, one save button. (Site name + footer live in
// the separate Info Control page, which edits the same document.)

import { useEffect, useState } from "react";
import { getSettingsAdmin, updateSettings, ApiError } from "@/lib/adminApi";
import ObjectListEditor from "@/components/admin/ObjectListEditor";
import StringListEditor from "@/components/admin/StringListEditor";
import { Section, TextField } from "@/components/admin/SettingsFields";

type Settings = {
  company?: {
    founded?: string;
    stats?: Record<string, unknown>[];
    contact?: {
      office?: string;
      factory?: string;
      phones?: string[];
      email?: string;
      hours?: string;
      cities?: string[];
    };
  };
  productCategories?: Record<string, unknown>[];
  projectCategories?: Record<string, unknown>[];
  whyChoose?: Record<string, unknown>[];
  process?: Record<string, unknown>[];
  // siteInfo / footer are edited in Info Control; preserved untouched here.
  [key: string]: unknown;
};

export default function SettingsPage() {
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
          <h1 className="font-serif text-2xl font-medium text-ink sm:text-3xl">Site Settings</h1>
          <p className="mt-1.5 text-sm font-light text-stone">
            Company info, categories, and the homepage&apos;s why-choose / process content.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="eyebrow w-fit rounded-full bg-olive px-7 py-3.5 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save all"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <Section title="Company">
        <TextField
          label="Founded (year)"
          value={data.company?.founded}
          onChange={(v) => set("company.founded", v)}
        />
        <ObjectListEditor
          label="Stats (shown in Why Choose Us band)"
          value={data.company?.stats}
          onChange={(v) => set("company.stats", v)}
          fields={[
            { key: "value", label: "Value", type: "text" },
            { key: "label", label: "Label", type: "text" },
          ]}
        />
      </Section>

      <Section title="Contact">
        <TextField
          label="Office address"
          value={data.company?.contact?.office}
          onChange={(v) => set("company.contact.office", v)}
        />
        <TextField
          label="Factory address"
          value={data.company?.contact?.factory}
          onChange={(v) => set("company.contact.factory", v)}
        />
        <StringListEditor
          label="Phone numbers"
          value={data.company?.contact?.phones}
          onChange={(v) => set("company.contact.phones", v)}
        />
        <TextField
          label="Email"
          value={data.company?.contact?.email}
          onChange={(v) => set("company.contact.email", v)}
        />
        <TextField
          label="Hours"
          value={data.company?.contact?.hours}
          onChange={(v) => set("company.contact.hours", v)}
        />
        <StringListEditor
          label="Cities served"
          value={data.company?.contact?.cities}
          onChange={(v) => set("company.contact.cities", v)}
        />
      </Section>

      <Section title="Product categories">
        <ObjectListEditor
          value={data.productCategories}
          onChange={(v) => set("productCategories", v)}
          fields={[
            { key: "slug", label: "Slug", type: "text" },
            { key: "name", label: "Name", type: "text" },
          ]}
        />
      </Section>

      <Section title="Project categories">
        <ObjectListEditor
          value={data.projectCategories}
          onChange={(v) => set("projectCategories", v)}
          fields={[
            { key: "slug", label: "Slug", type: "text" },
            { key: "name", label: "Name", type: "text" },
          ]}
        />
      </Section>

      <Section title="Why Choose Us">
        <ObjectListEditor
          value={data.whyChoose}
          onChange={(v) => set("whyChoose", v)}
          fields={[
            { key: "title", label: "Title", type: "text" },
            { key: "body", label: "Body", type: "textarea" },
          ]}
        />
      </Section>

      <Section title="Process steps">
        <ObjectListEditor
          value={data.process}
          onChange={(v) => set("process", v)}
          fields={[
            { key: "step", label: "Step (e.g. 01)", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "body", label: "Body", type: "textarea" },
          ]}
        />
      </Section>
    </div>
  );
}
