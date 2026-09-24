"use client";

// Info Control — one place to control the site's identity (name / tagline /
// description) and the whole footer. Reads and writes the same singleton
// settings document as the Settings page; each editor loads the full document,
// edits its own slice, and saves the whole thing back (so the pages don't
// clobber each other's fields).

import { useEffect, useRef, useState } from "react";
import { getSettingsAdmin, updateSettings, ApiError } from "@/lib/adminApi";
import { Section, TextField, TextArea, setPath } from "@/components/admin/SettingsFields";
import ObjectListEditor from "@/components/admin/ObjectListEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import { SITE_INFO, FOOTER } from "@/lib/data";

type Info = {
  branding?: {
    logo?: { url: string } | null;
    favicon?: { url: string } | null;
  };
  siteInfo?: {
    name?: string;
    tagline?: string;
    description?: string;
  };
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
  // Any other settings fields loaded from the backend are preserved untouched.
  [key: string]: unknown;
};

export default function InfoControlPage() {
  const [data, setData] = useState<Info | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  // Always-current mirror of `data` so back-to-back branding uploads merge onto
  // the latest doc instead of a stale render closure (which would let one save
  // clobber the other).
  const dataRef = useRef<Info | null>(null);
  dataRef.current = data;

  useEffect(() => {
    getSettingsAdmin<Info>()
      .then((s) =>
        // Seed identity + footer with defaults when the backend has none yet,
        // so the editor shows the current live content instead of blanks.
        setData({
          ...s,
          siteInfo: { ...SITE_INFO, ...(s.siteInfo ?? {}) },
          footer: { ...FOOTER, ...(s.footer ?? {}) },
        }),
      )
      .catch(() => setError("Failed to load site info."));
  }, []);

  const set = (path: string, value: unknown) => setData((prev) => setPath(prev, path, value));

  // Logo/favicon persist immediately on upload — no "Save all" needed — so a
  // reload always keeps them. We save the freshly-computed doc (not the async
  // state) to avoid a stale write.
  const setBranding = async (key: "logo" | "favicon", img: { url: string }) => {
    const next = setPath(dataRef.current, `branding.${key}`, img);
    dataRef.current = next;
    setData(next);
    setError("");
    try {
      await updateSettings(next);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save image.");
    }
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
          <h1 className="font-serif text-2xl font-medium text-ink sm:text-3xl">Info Control</h1>
          <p className="mt-1.5 text-sm font-light text-stone">
            Site name, tagline and the entire footer — controlled from here.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="eyebrow w-fit rounded-full bg-olive px-7 py-3.5 tracking-[0.16em]! text-cream-100! transition hover:bg-olive-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save all"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <Section title="Branding">
        <p className="-mt-1 text-sm font-light text-stone">
          Upload a logo and favicon here — they replace the text wordmark in the
          navbar and the browser tab icon across the whole site. These save
          automatically on upload (no need to press “Save all”).
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <ImageUploader
            label="Logo (navbar) — use a transparent PNG/SVG"
            folder="branding"
            value={data.branding?.logo}
            onChange={(img) => setBranding("logo", img)}
          />
          <ImageUploader
            label="Favicon (browser tab) — square, e.g. 512×512"
            folder="branding"
            value={data.branding?.favicon}
            onChange={(img) => setBranding("favicon", img)}
          />
        </div>
      </Section>

      <Section title="Site identity">
        <TextField
          label="Site name (navbar wordmark)"
          value={data.siteInfo?.name}
          onChange={(v) => set("siteInfo.name", v)}
        />
        <TextField
          label="Tagline"
          value={data.siteInfo?.tagline}
          onChange={(v) => set("siteInfo.tagline", v)}
        />
        <TextArea
          label="Description"
          value={data.siteInfo?.description}
          onChange={(v) => set("siteInfo.description", v)}
        />
      </Section>

      <Section title="Footer">
        <TextField
          label="Footer brand (leave blank to use the site name)"
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
