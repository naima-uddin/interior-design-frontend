// Deep, near-black footer: brand + CTA on the left, a heading, contact
// details and two address columns on the right, then a legal strip —
// mirroring the reference layout.

"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY, FOOTER, type FooterConfig } from "@/lib/data";

type Contact = typeof COMPANY.contact;

// Group the flat nav-link list into ordered columns keyed by `column`.
function groupColumns(links: FooterConfig["navLinks"]) {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [];
  for (const l of links) {
    let col = cols.find((c) => c.title === l.column);
    if (!col) {
      col = { title: l.column, links: [] };
      cols.push(col);
    }
    col.links.push({ label: l.label, href: l.href });
  }
  return cols;
}

export default function Footer({
  footer = FOOTER,
  contact = COMPANY.contact,
}: {
  footer?: FooterConfig;
  contact?: Contact;
}) {
  const columns = groupColumns(footer.navLinks?.length ? footer.navLinks : FOOTER.navLinks);
  const phone = contact.phones?.[0] ?? "";
  const whatsapp = phone.replace(/\D/g, "");

  return (
    <footer className="bg-olive-800 text-cream-100">
      <div className="mx-auto max-w-[1260px] px-5 py-8 sm:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Brand + CTA */}
          <div>
            <p className="font-serif text-2xl font-medium uppercase tracking-[0.3em]">
              {footer.brand}
            </p>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-cream-100/60">
              {footer.blurb}
            </p>
            {footer.ctaLabel && (
              <Link
                href={footer.ctaHref || "/collection"}
                className="eyebrow mt-5 inline-flex w-fit items-center rounded-full bg-cream-100 px-7 py-3.5 !text-ink transition hover:bg-cream-100/90"
              >
                {footer.ctaLabel}
              </Link>
            )}

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {columns.map((col, i) => (
                <FooterCol
                  key={col.title}
                  title={col.title}
                  links={col.links}
                  collapseAt={i === 0 ? 3 : undefined}
                />
              ))}
            </div>
          </div>

          {/* Heading + contact */}
          <div className="lg:border-l lg:border-cream-100/10 lg:pl-14">
            <h2 className="font-serif max-w-sm text-2xl font-medium leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              {footer.headline}
            </h2>

            <div className="mt-4 space-y-1.5">
              {phone && <p className="text-lg font-light text-cream-100">{phone}</p>}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-sm font-light text-cream-100/70 transition hover:text-cream-100"
                >
                  {contact.email}
                </a>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow !text-cream-100/45">Office</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-cream-100/75">
                  {contact.office}
                </p>
              </div>
              <div>
                <p className="eyebrow !text-cream-100/45">Factory</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-cream-100/75">
                  {contact.factory}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-8">
              {footer.socials?.length > 0 && (
                <div>
                  <p className="eyebrow !text-cream-100/45">Follow Us</p>
                  <div className="mt-3 flex items-center gap-3">
                    {footer.socials.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href || "#"}
                        aria-label={s.label}
                        className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-[10px] text-cream-100/80 transition hover:border-cream-100 hover:text-cream-100"
                      >
                        {s.label[0]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="eyebrow !text-cream-100/45">Let&apos;s Chat</p>
                <div className="mt-3 flex items-center gap-3">
                  {whatsapp && (
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      aria-label="WhatsApp"
                      className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-cream-100/80 transition hover:border-cream-100 hover:text-cream-100"
                    >
                      <ChatIcon />
                    </a>
                  )}
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      aria-label="Email"
                      className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/20 text-cream-100/80 transition hover:border-cream-100 hover:text-cream-100"
                    >
                      <SendIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-cream-100/12 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs font-light text-cream-100/45">{footer.copyright}</p>
          <div className="flex items-center gap-6 text-xs font-light text-cream-100/45">
            {(footer.legalLinks?.length ? footer.legalLinks : FOOTER.legalLinks).map((l) => (
              <Link key={l.label} href={l.href} className="transition hover:text-cream-100">
                {l.label}
              </Link>
            ))}
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
        {visible.map((l, i) => {
          const isLast = i === visible.length - 1;
          const toggle = collapsible && isLast && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Show fewer links" : "Show more links"}
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-cream-100/25 text-[12px] leading-none text-cream-100/75 transition hover:border-cream-100 hover:text-cream-100"
            >
              {expanded ? "−" : "+"}
            </button>
          );
          return (
            <li key={l.label} className="flex items-center gap-2">
              <Link href={l.href} className="text-[13px] font-light text-cream-100/75 transition hover:text-cream-100">
                {l.label}
              </Link>
              {toggle}
            </li>
          );
        })}
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
