import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/lib/services";

/**
 * RelatedServices — a rail of other services shown on a detail page, excluding
 * the current one. Reuses the shared ServiceCard so the listing matches the
 * services index exactly. Capped at three to keep the page focused.
 *
 * `tone` lets the caller keep the page's section rhythm intact (DESIGN_SPEC §5).
 * On the detail page it sits after the muted ProcessSequence, so it's passed
 * "default" there to avoid two muted bands in a row.
 */
export function RelatedServices({
  currentSlug,
  tone = "muted",
}: {
  currentSlug: string;
  tone?: "default" | "muted";
}) {
  const related = services.filter((s) => s.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <Section tone={tone} spacing="lg">
      <SectionHeader
        eyebrow="Related services"
        title="The rest of the roof"
        intro="A roof works as one system. These are the services that most often pair with this one."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((service, i) => (
          <Reveal as="div" key={service.slug} delay={i * 80}>
            <ServiceCard service={service} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
