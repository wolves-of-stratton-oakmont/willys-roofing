import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { TrustPillars } from "@/components/about/TrustPillars";
import { site } from "@/lib/site";
import { primaryArea, nearbyAreas } from "@/lib/serviceAreas";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Willy's Roofing is a locally owned, licensed and insured roofing company serving the Greater Hamilton and Niagara region. Meet the crew and our approach to honest, quality roofing.",
};

// ABOUT — Wave 2 (DALE). Honest company story; no fabricated years/awards/counts.
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <TrustPillars />
      {/*
        The numbered 01–05 process lives canonically in the shared
        ProcessSequence (home, /services, every /services/[slug]). About
        deliberately does NOT repeat it — the "how we work" idea is carried by
        the AboutStory narrative — so the sequence has one visual treatment
        sitewide and About keeps its distinct story/values/trust focus.
      */}

      {/* Service-area mention + closing CTA (tailored to this page). */}
      <Section spacing="lg">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-8 shadow-[var(--shadow-sm)] sm:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-copper-600)]">
                Local &amp; accountable
              </p>
              <h2 className="mt-4 text-3xl text-[var(--color-slate-800)] sm:text-4xl">
                Rooted in {primaryArea.name}, working across the region
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-slate-600)]">
                From our home base in {primaryArea.name} we cover{" "}
                {nearbyAreas
                  .slice(0, 4)
                  .map((a) => a.name)
                  .join(", ")}{" "}
                and the communities in between. If your roof is in the{" "}
                {site.serviceRegion}, we&rsquo;d be glad to take a look.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={site.phone.href} size="lg">
                  <Icon name="Phone" size={18} />
                  {site.phone.display}
                </Button>
                <Button href="/service-areas" variant="outline" size="lg">
                  See our service areas
                </Button>
              </div>
            </div>

            {/* Quiet contact rail. */}
            <ul className="space-y-4 border-t border-[var(--color-slate-100)] pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <li className="flex items-start gap-3">
                <Icon name="Clock" size={18} className="mt-0.5 shrink-0 text-[var(--color-copper-600)]" />
                <span className="text-sm leading-relaxed text-[var(--color-slate-600)]">
                  {site.emergencyNote}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="ClipboardCheck" size={18} className="mt-0.5 shrink-0 text-[var(--color-copper-600)]" />
                <span className="text-sm leading-relaxed text-[var(--color-slate-600)]">
                  Free, no-obligation written estimates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Quote" size={18} className="mt-0.5 shrink-0 text-[var(--color-copper-600)]" />
                <span className="text-sm leading-relaxed text-[var(--color-slate-600)]">
                  Read what neighbours say on our{" "}
                  <Link
                    href="/reviews"
                    className="font-semibold text-[var(--color-slate-700)] underline decoration-[var(--color-copper-300)] underline-offset-2 hover:text-[var(--color-copper-600)]"
                  >
                    reviews page
                  </Link>
                  .
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
