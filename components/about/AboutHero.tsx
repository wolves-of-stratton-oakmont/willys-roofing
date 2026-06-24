import Image from "next/image";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

/**
 * About hero — a slate band that opens with the company's stance, paired with
 * a single crew photo carrying the signature roof-pitch (.roofline-bottom) cut.
 * This is the one place the roofline edge is spent on this page.
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-slate-800)] text-[var(--color-chalk-100)]">
      {/* faint measure grid behind the band — subtle, on-brand texture */}
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden="true" />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <Eyebrow tone="onDark">About Willy's Roofing</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl font-extrabold text-[var(--color-chalk-50)] sm:text-5xl">
            We get on the roof, tell you the truth, and build it to last.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-slate-200)]">
            Willy's Roofing is a locally owned roofing company working out of
            GTA, across the {site.serviceRegion}. We treat a roof as a
            complete system — shingles, flashing, ventilation and all — and we
            leave your property the way we found it. No upsell theatre, no
            disappearing crews.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button href="/contact" variant="onDark" size="lg">
              Book a free assessment
            </Button>
          </div>
        </div>

        {/* Crew photo with the signature gable cut on its bottom edge. */}
        <div className="relative">
          <div className="roofline-bottom relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-700)] pb-[var(--pitch-rise)] shadow-[var(--shadow-lg)] sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/about/team.jpg"
              alt="The Willy's Roofing crew on a residential job site in the Hamilton area"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
