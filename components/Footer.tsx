// Deep, near-black footer: brand + CTA on the left, a heading, contact
// details and two address columns on the right, then a legal strip —
// mirroring the reference layout.

"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY } from "@/lib/data";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "FAQs", href: "/faqs" },
  { label: "Studio", href: "/studio" },
  { label: "Spaces", href: "/spaces" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/studio" },
  { label: "Our Story", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-olive-800 text-cream-100">
      <div className="mx-auto max-w-[1260px] px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          {/* Brand + CTA */}
          <div>
            <p className="font-serif text-2xl font-medium uppercase tracking-[0.3em]">
              Velor
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-cream-100/60">
              Supporting modern living through thoughtfully designed
              interiors, furniture and timeless spaces for every home.
            </p>
            <Link
              href="/collection"
              className="eyebrow mt-7 inline-flex w-fit items-center rounded-full bg-cream-100 px-7 py-3.5 !text-ink transition hover:bg-cream-100/90"
            >
              Explore Collection
            </Link>

            <div className="mt-8 grid grid-cols-3 gap-6 sm:grid-cols-3">
              <FooterCol title="Quick Links" links={QUICK_LINKS} collapseAt={3} />
              <FooterCol title="Support" links={SUPPORT_LINKS} />
              <FooterCol title="Company" links={COMPANY_LINKS} />
            </div>
          </div>

          {/* Heading + contact */}
          <div className="lg:border-l lg:border-cream-100/10 lg:pl-14">
            <h2 className="font-serif max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Designing Homes For Inspired Living
            </h2>

            <div className="mt-6 space-y-1.5">
              <p className="text-lg font-light text-cream-100">{COMPANY.contact.phones[0]}</p>
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="block text-sm font-light text-cream-100/70 transition hover:text-cream-100"
              >
                {COMPANY.contact.email}
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow !text-cream-100/45">Office</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-cream-100/75">
                  {COMPANY.contact.office}
                </p>
              </div>
              <div>
                <p className="eyebrow !text-cream-100/45">Factory</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-cream-100/75">
                  {COMPANY.contact.factory}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <div>
                <p className="eyebrow !text-cream-100/45">Follow Us</p>
                <div className="mt-3 flex items-center gap-3">
                  {["Instagram", "Facebook", "Pinterest"].map((s) => (
                    <Link
                      key={s}
                      href="#"
                      aria-label={s}
                      className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-[10px] text-cream-100/80 transition hover:border-cream-100 hover:text-cream-100"
                    >
                      {s[0]}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow !text-cream-100/45">Let&apos;s Chat</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY.contact.phones[0].replace(/\D/g, "")}`}
                    aria-label="WhatsApp"
                    className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-cream-100/80 transition hover:border-cream-100 hover:text-cream-100"
                  >
                    <ChatIcon />
                  </a>
                  <a
                    href={`mailto:${COMPANY.contact.email}`}
                    aria-label="Email"
                    className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-cream-100/80 transition hover:border-cream-100 hover:text-cream-100"
                  >
                    <SendIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream-100/12 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs font-light text-cream-100/45">
            © 2026 Velor. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-light text-cream-100/45">
            <Link href="#" className="transition hover:text-cream-100">Privacy Policy</Link>
            <Link href="#" className="transition hover:text-cream-100">Terms &amp; Conditions</Link>
            <Link href="#" className="transition hover:text-cream-100">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  collapseAt,
}: {
  title: string;
  links: { label: string; href: string }[];
  collapseAt?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = !!collapseAt && links.length > collapseAt;
  const visible = collapsible && !expanded ? links.slice(0, collapseAt) : links;

  return (
    <div>
      <p className="eyebrow !text-cream-100/45">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {visible.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-[13px] font-light text-cream-100/75 transition hover:text-cream-100">
              {l.label}
            </Link>
          </li>
        ))}
        {collapsible && !expanded && (
          <li>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Show more links"
              className="grid h-6 w-6 place-items-center rounded-full border border-cream-100/25 text-[13px] leading-none text-cream-100/75 transition hover:border-cream-100 hover:text-cream-100"
            >
              +
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}
