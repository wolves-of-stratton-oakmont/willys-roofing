import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { primaryArea, nearbyAreas } from "@/lib/serviceAreas";
import { site } from "@/lib/site";

/**
 * ServiceAreaTeaser — grounds the brand locally. The primary city is called out
 * with the region photo; nearby towns appear as tappable chips that lead to the
 * full /service-areas page. Reinforces "locally owned & accountable" without any
 * fabricated project counts.
 */
export function ServiceAreaTeaser() {
  return (
    <Section spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* region image */}
        <Reveal as="div">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
            <Image
              src="/images/areas/region.jpg"
              alt="Aerial view of a residential neighbourhood's rooftops in the Hamilton–Niagara region"
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-slate-900)]/70 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-chalk-50)] backdrop-blur">
              <Icon name="MapPin" size={13} className="text-[var(--color-copper-300)]" />
              Based in {primaryArea.name}, {site.regionShort}
            </span>
          </div>
        </Reveal>

        {/* copy + chips */}
        <div>
          <SectionHeader
            eyebrow="Where we work"
            title={`Roofing across ${site.serviceRegion}`}
            intro={primaryArea.blurb}
            maxWidth={false}
          />

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-slate-400)]">
            Also serving
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {nearbyAreas.map((area) => (
              <li key={area.name}>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-slate-200)] bg-[var(--color-chalk-50)] px-3 py-1.5 text-sm font-medium text-[var(--color-slate-600)] transition-colors hover:border-[var(--color-copper-400)] hover:text-[var(--color-copper-600)]"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/service-areas" variant="outline">
              See all service areas
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
