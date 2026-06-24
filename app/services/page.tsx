import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProcessSequence } from "@/components/home/ProcessSequence";
import { CtaBand } from "@/components/home/CtaBand";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roofing Services",
  description:
    "Asphalt shingle replacement, roof repair, flat roofing, eavestrough, skylights, attic ventilation and 24/7 emergency roof service across the Hamilton–Niagara region.",
  alternates: { canonical: "/services" },
};

/**
 * SERVICES (index) — every service from lib/services rendered as a rich card,
 * linking through to its /services/[slug] detail page. Slate page header (the
 * single h1), the full grid, the shared 01–05 process strip, then a CTA band.
 */
export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <Section tone="slate" spacing="lg">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow="What we do"
          title="Full-service roofing for southern Ontario homes"
          intro={`From a single repair to a complete tear-off and replacement, here is the work we do across ${site.serviceRegion} — every roof installed and repaired as a complete system.`}
        />
      </Section>

      {/* Services grid */}
      <Section spacing="lg">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="div" key={service.slug} delay={(i % 3) * 80}>
              <ServiceCard
                service={service}
                imagePriority={i < 3}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <ProcessSequence
        tone="muted"
        eyebrow="How we work"
        title="The same careful process on every job"
        intro="Whether it's one flashing detail or a whole new roof, we follow the same five steps — so you always know what's happening and what comes next."
      />

      <CtaBand
        title="Not sure which service you need?"
        intro="That's what the free assessment is for. We'll get on the roof, tell you honestly whether it's a repair or a replacement, and put it in writing."
      />
    </>
  );
}
