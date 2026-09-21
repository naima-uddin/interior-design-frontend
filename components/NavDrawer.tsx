"use client";

// Off-canvas utility drawer opened from the navbar hamburger — on both
// desktop and mobile. Dark panel with latest projects, services checklist,
// contact details and an about blurb, mirroring the reference sidebar.

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { PROJECTS, SERVICES, COMPANY } from "@/lib/data";

const SOCIALS = ["Facebook", "Twitter", "Instagram", "YouTube", "WhatsApp"];

export default function NavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const projects = PROJECTS.slice(0, 4);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-[420px] flex-col overflow-y-auto bg-olive-800 text-cream-100 shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-cream-100/12 px-7 py-6">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-xl font-medium uppercase tracking-[0.3em] text-cream-100"
          >
            Velor
          </Link>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-cream-100 transition hover:bg-cream-100/10"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-8 px-7 py-8">
          {/* Quick links (primary nav, for smaller screens) */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 lg:hidden">
            {[
              { label: "Projects", href: "/projects" },
              { label: "Services", href: "/services" },
              { label: "Collection", href: "/collection" },
              { label: "Studio", href: "/studio" },
              { label: "Journal", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="eyebrow !tracking-[0.16em] text-cream-100/85 transition hover:text-clay"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-cream-100/12 lg:hidden" />

          {/* Latest projects */}
          <div>
            <p className="eyebrow !text-cream-100/50">Latest Projects</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {projects.map((p) => (
                <Link
                  key={p._id}
                  href={`/projects/${p.slug}`}
                  onClick={onClose}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-cream-100/10"
                >
                  <Image
                    src={p.cover.url}
                    alt={p.title}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-cream-100/12" />

          {/* Services */}
          <div>
            <p className="eyebrow !text-cream-100/50">Our Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 text-[14px] font-light text-cream-100/85 transition hover:text-clay"
                  >
                    <svg className="h-3.5 w-3.5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-cream-100/12" />

          {/* Contact */}
          <div>
            <p className="eyebrow !text-cream-100/50">Contact Us</p>
            <ul className="mt-4 space-y-3 text-[14px] font-light text-cream-100/85">
              <li className="flex items-start gap-3">
                <ClockIcon /> {COMPANY.contact.hours}
              </li>
              <li className="flex items-start gap-3">
                <PinIcon /> {COMPANY.contact.office}
              </li>
              <li className="flex items-start gap-3">
                <MailIcon />
                <a href={`mailto:${COMPANY.contact.email}`} className="transition hover:text-clay">
                  {COMPANY.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="h-px bg-cream-100/12" />

          {/* About */}
          <div>
            <p className="eyebrow !text-cream-100/50">About Us</p>
            <p className="mt-4 text-[14px] font-light leading-relaxed text-cream-100/75">
              Transform your home, office, or commercial space with
              professional interior design services tailored to your vision
              and lifestyle. Our experienced designers create customized
              interiors, from concept development to final styling, ensuring
              every space reflects beauty, functionality, and attention to
              detail.
            </p>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-4">
            {SOCIALS.map((s) => (
              <Link
                key={s}
                href="#"
                aria-label={s}
                className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-[11px] text-cream-100/80 transition hover:border-clay hover:text-clay"
              >
                {s[0]}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

function ClockIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  );
}
