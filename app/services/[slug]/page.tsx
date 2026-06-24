import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { Eyebrow } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ServiceHero } from "@/components/services/ServiceHero";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ProcessSequence } from "@/components/home/ProcessSequence";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/components/seo/schemas";
import { services, getService, serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * SERVICE DETAIL — Willy's Roofing.
 *
 * Next.js 16: `params` is a Promise and must be awaited. We pre-render every
 * known slug via generateStaticParams and 404 anything else (dynamicParams =
 * false). Per-service metadata is generated below.
 *
 * Body: a slate hero (ServiceHero), the long description in a prose column with
 * a sticky "what's included" card, the shared 01–05 process, a related-services
 * rail and a closing CTA.
 */

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.shortDescription,
      images: [{ url: service.heroImage, alt: `${service.title} — ${service.tagline}` }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      {/* Service structured data (provider → the business node) — VEGA, Wave 3. */}
      <JsonLd data={serviceSchema(service)} />
      <ServiceHero service={service} />

      {/* Long description + inclusions */}
      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          {/* Prose column */}
          <div>
            <Eyebrow>The work</Eyebrow>
            <div className="mt-5 max-w-prose space-y-5">
              {service.longDescription.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-[var(--color-slate-600)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Inclusions card — sticky on desktop */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-7 shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-copper-100)] text-[var(--color-copper-600)]">
                  <Icon name={service.icon} size={22} />
                </span>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  What&rsquo;s included
                </h2>
              </div>

              <ul className="mt-6 space-y-3.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Icon
                      name="Check"
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--color-copper-500)]"
                    />
                    <span className="text-[0.95rem] leading-relaxed text-[var(--color-slate-700)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-[var(--color-slate-100)] pt-6">
                <p className="text-sm leading-relaxed text-[var(--color-slate-500)]">
                  Every job is licensed, insured and backed by a written
                  workmanship warranty.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button href="/contact" block>
                    Get a free estimate
                  </Button>
                  <Button href={site.phone.href} variant="outline" block>
                    <Icon name="Phone" size={16} />
                    {site.phone.display}
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* How we work */}
      <ProcessSequence
        tone="muted"
        title="How a project comes together"
        intro="The same five steps apply to this service as to every roof we touch — a clear path from first look to final clean-up."
      />

      {/* default tone (not muted) so it alternates against the muted process above */}
      <RelatedServices currentSlug={service.slug} tone="default" />

      <CtaBand
        title={`Ready to talk about ${service.title.toLowerCase()}?`}
        intro="Book a free, no-obligation assessment. We'll get on the roof, show you what we find, and put a clear written estimate in your hands."
      />
    </>
  );
}

// Keep static params honest if the services list changes.
export const dynamicParams = false;
void services;
