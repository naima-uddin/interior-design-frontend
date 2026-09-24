"use client";

// Singleton site-settings editor: company/contact info, product & project
// categories, "why choose us" points, the process timeline, and the homepage
// hotspot scene. One document, one save button.

import { useEffect, useState } from "react";
import { getSettingsAdmin, updateSettings, ApiError } from "@/lib/adminApi";
import ObjectListEditor from "@/components/admin/ObjectListEditor";
import StringListEditor from "@/components/admin/StringListEditor";
import { FOOTER } from "@/lib/data";

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
  footer?: {
    brand?: string;
    blurb?: string;
    headline?: string;
    ctaLabel?: string;
    ctaHref?: string;
    copyright?: string;
    navLinks?: Record<string, unknown>[];
    socials?: Record<string, unknown>[];
    legalLinks?: Record<string, unknown>[];
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

function TextArea({
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
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-ink/15 bg-cream-100 px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [data, setData] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSettingsAdmin<Settings>()
      .then((s) =>
        // Seed footer with defaults when the backend has none yet, so the
        // editor shows the current live footer content instead of blanks.
        setData({ ...s, footer: { ...FOOTER, ...(s.footer ?? {}) } }),
      )
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
            Company info, categories, homepage why-choose / process content, and the site footer.
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

      <Section title="Footer">
        <TextField
          label="Brand name"
          value={data.footer?.brand}
          onChange={(v) => set("footer.brand", v)}
        />
        <TextArea
          label="Blurb (short paragraph under the brand)"
          value={data.footer?.blurb}
          onChange={(v) => set("footer.blurb", v)}
        />
        <TextField
          label="Headline (large text on the right)"
          value={data.footer?.headline}
          onChange={(v) => set("footer.headline", v)}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="CTA button label"
            value={data.footer?.ctaLabel}
            onChange={(v) => set("footer.ctaLabel", v)}
          />
          <TextField
            label="CTA button link"
            value={data.footer?.ctaHref}
            onChange={(v) => set("footer.ctaHref", v)}
          />
        </div>
        <TextField
          label="Copyright line"
          value={data.footer?.copyright}
          onChange={(v) => set("footer.copyright", v)}
        />
        <ObjectListEditor
          label="Navigation links (grouped by column name)"
          value={data.footer?.navLinks}
          onChange={(v) => set("footer.navLinks", v)}
          fields={[
            { key: "column", label: "Column", type: "text" },
            { key: "label", label: "Label", type: "text" },
            { key: "href", label: "Link", type: "text" },
          ]}
        />
        <ObjectListEditor
          label="Social links"
          value={data.footer?.socials}
          onChange={(v) => set("footer.socials", v)}
          fields={[
            { key: "label", label: "Name (e.g. Instagram)", type: "text" },
            { key: "href", label: "URL", type: "text" },
          ]}
        />
        <ObjectListEditor
          label="Legal links (bottom strip)"
          value={data.footer?.legalLinks}
          onChange={(v) => set("footer.legalLinks", v)}
          fields={[
            { key: "label", label: "Label", type: "text" },
            { key: "href", label: "Link", type: "text" },
          ]}
        />
      </Section>
    </div>
  );
}
