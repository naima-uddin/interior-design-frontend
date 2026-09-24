"use client";

// Small shared form primitives for the singleton settings editors
// (Settings + Info Control). Kept here so both pages render identical fields.

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-cream p-6">
      <h2 className="font-serif mb-5 text-xl font-medium text-ink">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export function TextField({
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

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-xl border border-ink/15 bg-cream-100 px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
      />
    </div>
  );
}

// Deep-set a dot-path (e.g. "footer.brand") on a cloned object. Shared by both
// editors so their nested state updates behave identically.
export function setPath<T>(prev: T | null, path: string, value: unknown): T {
  const next = structuredClone(prev ?? ({} as T));
  const keys = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = next;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = cur[keys[i]] ?? {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return next as T;
}
