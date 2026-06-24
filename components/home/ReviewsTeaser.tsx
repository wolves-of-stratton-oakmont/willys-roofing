import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "@/lib/testimonials";

/**
 * ReviewsTeaser — three placeholder reviews with a link to the full /reviews
 * page. Kept honest: these are modest placeholders, not presented as verified
 * counts or averages (see lib/testimonials.ts).
 */
export function ReviewsTeaser() {
  const featured = testimonials.slice(0, 3);

  return (
    <Section tone="muted" spacing="lg">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="In their words"
          title="What homeowners say after the trucks leave"
          intro="Real, modest praise for honest work — repairs done right, clean sites, and roofs that hold up through Ontario winters."
          maxWidth={false}
          className="max-w-2xl"
        />
        <Button href="/reviews" variant="outline" className="shrink-0">
          Read all reviews
        </Button>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featured.map((t, i) => (
          <Reveal as="div" key={`${t.name}-${t.city}`} delay={i * 80}>
            <TestimonialCard testimonial={t} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
