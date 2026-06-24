import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import { serviceAreaNames } from "@/lib/serviceAreas";
import { EstimateForm } from "@/components/contact/EstimateForm";
import { ContactRail } from "@/components/contact/ContactRail";

/**
 * CONTACT — "Get a free estimate". Owned by VEGA.
 *
 * The page is the business's intake desk. Two real paths sit side by side: the
 * phone (the fastest, most human path — leads the right-hand rail) and the
 * estimate form (the considered path — the left column). Honest throughout:
 * the form's success copy never claims an email was sent unless a provider is
 * configured server-side (see app/api/contact/route.ts).
 */

export const metadata: Metadata = {
  title: "Contact & Free Estimate",
  description:
    "Request a free, no-obligation roofing estimate from Willy's Roofing, or call 416-414-8452. Serving GTA, Hamilton, Burlington and the Niagara region.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* 1 — Page header (slate band, single h1) */}
      <Section tone="slate" spacing="md">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow="Get a free estimate"
          title="Let's talk about your roof"
          intro="Tell us what's going on and we'll get you a free, no-obligation estimate. For an active leak or storm damage, calling is the fastest way to reach us."
          maxWidth
        />
      </Section>

      {/* 2 — Two columns: estimate form (considered path) + contact rail (call) */}
      <Section spacing="lg">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Form is the client island; rail is static. */}
          <Reveal>
            <EstimateForm />
          </Reveal>

          {/* Semantic landmark lives on the real element; Reveal only animates,
              so the aria-label is never dropped by the wrapper. */}
          <aside aria-label="Other ways to reach us">
            <Reveal delay={80}>
              <ContactRail />
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* 3 — Where we work: honest area chips (distinct from the footer CTA). */}
      <Section tone="muted" spacing="md">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Service area"
              title="Roofing across the Hamilton & Niagara region"
              intro={`Based in ${site.primaryCity}, we cover the towns below. Don't see yours? It's worth a call — we likely still reach you.`}
              maxWidth={false}
              className="max-w-2xl"
            />
            <a
              href={site.phone.href}
              className="inline-flex shrink-0 items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-copper-600)] underline-offset-4 hover:underline"
            >
              <Icon name="Phone" size={16} aria-hidden />
              {site.phone.display}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {serviceAreaNames.map((name) => (
              <li
                key={name}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-slate-200)] bg-[var(--color-chalk-50)] px-3 py-1.5 text-sm text-[var(--color-slate-600)]"
              >
                <Icon
                  name="MapPin"
                  size={13}
                  className="text-[var(--color-copper-500)]"
                  aria-hidden
                />
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
