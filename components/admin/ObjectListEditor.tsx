"use client";

// Editable list of small objects (e.g. { slug, name } categories, or
// { title, body } why-choose points) — each row renders one input per field,
// used by the Settings page for its various sub-arrays.

export type ObjField = { key: string; label: string; type?: "text" | "textarea" | "number" };

export default function ObjectListEditor({
  value,
  onChange,
  fields,
  label,
}: {
  value?: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
  fields: ObjField[];
  label?: string;
}) {
  const items = value?.length ? value : [];

  const setAt = (i: number, key: string, v: unknown) => {
    const next = items.map((row, idx) => (idx === i ? { ...row, [key]: v } : row));
    onChange(next);
  };
  const removeAt = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, Object.fromEntries(fields.map((f) => [f.key, ""]))]);

  return (
    <div>
      {label && <label className="eyebrow mb-2 block">{label}</label>}
      <div className="space-y-3">
        {items.map((row, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-cream-100 p-4">
            <div className="grid flex-1 gap-2.5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block text-[10px] uppercase tracking-wide text-stone-400">
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={(row[f.key] as string) ?? ""}
                      onChange={(e) => setAt(i, f.key, e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 text-sm text-ink focus:border-olive focus:outline-none"
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={(row[f.key] as string | number) ?? ""}
                      onChange={(e) =>
                        setAt(i, f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
                      }
                      className="w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 text-sm text-ink focus:border-olive focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label="Remove"
              className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/60 transition hover:border-red-300 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" onClick={add} className="eyebrow text-clay transition hover:text-ink">
          + Add
        </button>
      </div>
    </div>
  );
}
