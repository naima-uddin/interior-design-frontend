import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { getServices, getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact — Velor",
  description:
    "Book a free interior design consultation. Visit our Dhaka studio or reach us by phone and email.",
};

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/10 py-5">
      <p className="eyebrow">{label}</p>
      <div className="mt-2 text-sm font-light leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export default async function ContactPage() {
  const [{ company }, services] = await Promise.all([
    getSettings(),
    getServices(),
  ]);
  const contact = company.contact;
  return (
    <main className="pb-20">
      <PageHero
        eyebrow="Contact"
        title="Let's plan your space."
        subtitle="Book a free consultation and tell us about your project — we'll take it from there."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1260px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Info column */}
          <div>
            <span className="eyebrow">Studio & factory</span>
            <h2 className="font-serif mt-4 text-3xl font-medium tracking-tight text-ink">
              Come say hello.
            </h2>

            <div className="mt-8">
              <InfoRow label="Office">{contact.office}</InfoRow>
              <InfoRow label="Factory">{contact.factory}</InfoRow>
              <InfoRow label="Phone">
                <div className="flex flex-col gap-1">
                  {contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="transition hover:text-clay">
                      {p}
                    </a>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="Email">
                <a href={`mailto:${contact.email}`} className="transition hover:text-clay">
                  {contact.email}
                </a>
              </InfoRow>
              <InfoRow label="Hours">{contact.hours}</InfoRow>
            </div>

            <div className="mt-8">
              <p className="eyebrow mb-3">We serve</p>
              <div className="flex flex-wrap gap-2">
                {contact.cities.map((c) => (
                  <span
                    key={c}
                    className="eyebrow rounded-full border border-ink/15 px-4 py-2 !tracking-[0.12em] text-ink/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-3xl border border-ink/10 bg-cream-100 p-6 sm:p-9">
            <h2 className="font-serif text-2xl font-medium text-ink">Book a meeting</h2>
            <p className="mt-1.5 text-sm font-light text-stone">
              Fields marked required help us prepare for your call.
            </p>
            <div className="mt-7">
              <ContactForm services={services} />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder band */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
          <div className="relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-olive/5">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-olive/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <p className="eyebrow mt-3">Mohakhali New DOHS, Dhaka</p>
              <p className="mt-1 text-sm font-light text-stone">Interactive map connects when the site goes live.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
