import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { SectionHeader, Eyebrow } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { AreaCard } from "@/components/areas/AreaCard";
import { LocalConditions } from "@/components/areas/LocalConditions";
import { site } from "@/lib/site";
import { primaryArea, nearbyAreas, serviceAreaNames } from "@/lib/serviceAreas";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Willy's Roofing serves Stoney Creek, Hamilton, Burlington, Grimsby, Beamsville, Ancaster, Dundas, Waterdown, Oakville, Lincoln, Smithville, Vineland and the wider Niagara region.",
};

// SERVICE AREAS — Wave 2 (DALE). primaryArea + nearbyAreas with genuinely local,
// weather-aware copy. No fabricated project counts or addresses.
export default function ServiceAreasPage() {
  return (
    <>
      <Section tone="slate" spacing="md">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow="Where we work"
          title="Roofing across the Hamilton & Niagara region"
          intro={`From our home base in ${primaryArea.name}, we cover ${serviceAreaNames.length} communities from the lakeshore to the escarpment — and the areas in between.`}
        />
      </Section>

      {/* Primary area highlight — the home base, with the one signature
          roofline accent spent here (the image "roof" the content sits under). */}
      <Section spacing="lg">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Home base</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-slate-800)] sm:text-4xl">
              {primaryArea.name}, Ontario
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-slate-600)]">
              {primaryArea.blurb}
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-slate-600)]">
              Stoney Creek runs from the Lake Ontario shoreline up to the
              Niagara Escarpment, and the homes change as the land rises —
              lakeside properties taking the wind, established streets in the
              old village, and newer subdivisions climbing the mountain. We know
              the housing stock and the weather that beats on it, because we
              live and work here too.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} size="lg">
                <Icon name="Phone" size={18} />
                {site.phone.display}
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Request a free estimate
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="roofline-top relative aspect-[5/4] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-100)] pt-[var(--pitch-rise)] shadow-[var(--shadow-md)]">
                <Image
                  src="/images/areas/stoney-creek.jpg"
                  alt="A tree-lined residential street in Stoney Creek, Ontario, with detached homes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why local knowledge matters — the regional-conditions thesis. */}
      <LocalConditions />

      {/* Nearby areas grid. */}
      <Section tone="muted" spacing="lg">
        <SectionHeader
          eyebrow="The wider region"
          title="Towns we cover"
          intro="Same crew, same standard, whether you're on the bench, in the valley or out toward the lake."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pin the home base first, then the nearby towns. */}
          {[primaryArea, ...nearbyAreas].map((area, i) => (
            <Reveal as="li" key={area.name} delay={(i % 3) * 60}>
              <AreaCard area={area} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Don't see your town? + CTA. */}
      <Section spacing="lg">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-slate-800)] p-8 text-[var(--color-chalk-100)] shadow-[var(--shadow-md)] sm:p-12">
          <div
            className="blueprint-grid pointer-events-none absolute inset-0 opacity-50"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-xl">
              <Eyebrow tone="onDark">Not on the list?</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-chalk-50)] sm:text-4xl">
                Don&rsquo;t see your town?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-slate-200)]">
                These are the communities we cover most, but our crew travels
                across the {site.serviceRegion}. Give us a call — if we can help
                with your roof, we will, and if we can&rsquo;t, we&rsquo;ll point
                you to someone who can.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button href={site.phone.href} size="lg">
                <Icon name="Phone" size={18} />
                {site.phone.display}
              </Button>
              <Button href="/contact" variant="onDark" size="lg">
                Ask about your area
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
