import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { featuredServices } from "@/lib/services";

/**
 * ServicesOverview (home) — a SectionHeader plus a grid of the featured
 * services as cards, with a link through to the full /services index. Renders
 * `featuredServices` from lib so card copy never diverges from the data.
 */
export function ServicesOverview() {
  return (
    <Section spacing="lg">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="What we do"
          title="Roofing services, start to finish"
          intro="From a single repair to a full tear-off and replacement, we handle the whole roof as one system — shingles, flashing, ventilation and the eavestrough that ties it together."
          maxWidth={false}
          className="max-w-2xl"
        />
        <Button href="/services" variant="outline" className="shrink-0">
          All services
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((service, i) => (
          <Reveal as="div" key={service.slug} delay={(i % 3) * 80}>
            <ServiceCard service={service} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
