"use client";

// "Book a meeting" contact form. Local-only submit for now (no backend) — shows
// a confirmed state. Wires to /api/contact later.

import { useState } from "react";
import { SERVICES, type Service } from "@/lib/data";

export default function ContactForm({ services }: { services?: Service[] }) {
  const options = services?.length ? services : SERVICES;
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-olive/20 bg-[#383927]/5 p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#383927] text-cream-100">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif mt-5 text-2xl font-medium text-ink">Thank you.</h3>
        <p className="mt-2 text-sm font-light text-stone">
          Your request has been received — a designer will reach out within one
          working day.
        </p>
        <button
          onClick={() => setSent(false)}
          className="eyebrow mt-6 text-clay transition hover:text-ink"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+880 1XXX XXXXXX" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
        <div>
          <label className="eyebrow mb-2 block">Service</label>
          <select
            name="service"
            defaultValue=""
            className="h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-sm text-ink focus:border-olive focus:outline-none"
          >
            <option value="" disabled>
              Select a service
            </option>
            {options.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="eyebrow mb-2 block">Tell us about your project</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Location, size, timeline, and what you have in mind…"
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone-400 focus:border-olive focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="eyebrow h-13 w-full rounded-full bg-[#383927] px-6 py-4 !tracking-[0.18em] !text-cream-100 transition hover:bg-[#383927]-800"
      >
        Request a free consultation
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-sm text-ink placeholder:text-stone-400 focus:border-olive focus:outline-none"
      />
    </div>
  );
}
