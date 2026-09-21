"use client";

// Editable list of plain strings (colours, scope bullets, body paragraphs…).
// Each row is a text input with a remove button, plus an "Add" row.

export default function StringListEditor({
  value,
  onChange,
  label,
  placeholder,
  multiline,
}: {
  value?: string[];
  onChange: (items: string[]) => void;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const items = value?.length ? value : [];

  const setAt = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const removeAt = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);
  const fieldClass =
    "w-full rounded-xl border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-olive focus:outline-none";

  return (
    <div>
      {label && <label className="eyebrow mb-2 block">{label}</label>}
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                value={v}
                placeholder={placeholder}
                rows={3}
                onChange={(e) => setAt(i, e.target.value)}
                className={fieldClass}
              />
            ) : (
              <input
                value={v}
                placeholder={placeholder}
                onChange={(e) => setAt(i, e.target.value)}
                className={fieldClass}
              />
            )}
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label="Remove"
              className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/60 transition hover:border-red-300 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="eyebrow text-clay transition hover:text-ink"
        >
          + Add item
        </button>
      </div>
    </div>
  );
}
