import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs — Velor",
  description:
    "Answers to common questions about our interior design process, timelines, pricing and service areas.",
};

export default function FaqsPage() {
  return (
    <main className="pb-8">
      <PageHero
        eyebrow="FAQs"
        title="Good questions, answered."
        subtitle="Everything you might want to know before starting a project with us."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "FAQs", href: "/faqs" },
        ]}
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <FaqAccordion />

          <div className="mt-14 rounded-3xl border border-ink/10 bg-cream-100 p-8 text-center sm:p-10">
            <h2 className="font-serif text-2xl font-medium text-ink">Still have a question?</h2>
            <p className="mt-2 text-sm font-light text-stone">
              Our team is happy to help — book a free consultation and we&apos;ll talk it through.
            </p>
            <Link
              href="/contact"
              className="eyebrow mt-6 inline-flex items-center gap-2 rounded-full bg-olive px-7 py-4 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800"
            >
              Get in touch
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
