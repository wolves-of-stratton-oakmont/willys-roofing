import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { faqs, faqCategories, type Faq } from "@/lib/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roofing FAQ",
  description:
    "Straight answers to common roofing questions for Ontario homeowners — repair vs. replacement, cost and estimates, warranties, insurance claims, attic ventilation and more.",
};

// Stable, URL-safe anchor id for each category.
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Group the flat FAQ list by category, preserving the declared category order.
function groupByCategory() {
  return faqCategories
    .map((category) => ({
      category,
      id: slugify(category),
      items: faqs.filter((f) => f.category === category),
    }))
    .filter((g) => g.items.length > 0);
}

// FAQPage structured data (JSON-LD). `<` is escaped per Next.js guidance to
// avoid HTML injection through the serialized payload.
function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// FAQ — Wave 2 (DALE). Accessible accordion grouped by faqCategories + FAQPage
// JSON-LD. Page is a server component; the accordion itself is the client part.
export default function FaqPage() {
  const groups = groupByCategory();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)).replace(/</g, "\\u003c"),
        }}
      />

      <Section tone="slate" spacing="md">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow="Questions, answered"
          title="Roofing questions, straight answers"
          intro="The questions Ontario homeowners ask us most — about repairs versus replacement, what it costs, warranties, insurance claims and getting a roof through our winters."
        />
      </Section>

      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Category jump-rail — sticky on desktop. */}
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-copper-600)]">
              Browse by topic
            </p>
            <ul className="mt-4 space-y-1">
              {groups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--color-slate-600)] transition-colors hover:bg-[var(--color-chalk-200)] hover:text-[var(--color-slate-800)]"
                  >
                    {g.category}
                    <span className="font-mono text-xs tabular-nums text-[var(--color-slate-400)]">
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-5">
              <p className="font-display text-base font-extrabold tracking-tight text-[var(--color-slate-800)]">
                Still wondering?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate-600)]">
                Call and ask. We&rsquo;re happy to talk through your roof with no
                obligation.
              </p>
              <a
                href={site.phone.href}
                className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--color-copper-600)] transition-colors hover:text-[var(--color-copper-700)]"
              >
                <Icon name="Phone" size={16} />
                {site.phone.display}
              </a>
            </div>
          </nav>

          {/* Accordion groups. */}
          <div className="min-w-0 space-y-14">
            {groups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="scroll-mt-28">
                <div className="mb-2 flex items-center gap-3">
                  <h2
                    id={`${g.id}-heading`}
                    className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-slate-800)]"
                  >
                    {g.category}
                  </h2>
                  <span className="h-px flex-1 bg-[var(--color-slate-100)]" aria-hidden="true" />
                </div>
                <FaqAccordion items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing CTA. */}
      <Section tone="muted" spacing="md">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl text-[var(--color-slate-800)] sm:text-3xl">
              Have a question we didn&rsquo;t cover?
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-slate-600)]">
              Get a real answer about your roof — and a free, no-obligation
              estimate while we&rsquo;re at it.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button href="/contact" variant="primary" size="lg">
              Ask us anything
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
