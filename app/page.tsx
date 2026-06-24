import { HomeHero } from "@/components/home/HomeHero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyAboveAll } from "@/components/home/WhyAboveAll";
import { ProcessSequence } from "@/components/home/ProcessSequence";
import { StatsBand } from "@/components/home/StatsBand";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { ReviewsTeaser } from "@/components/home/ReviewsTeaser";
import { ServiceAreaTeaser } from "@/components/home/ServiceAreaTeaser";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schemas";

/**
 * HOME — Willy's Roofing.
 *
 * The hero is the thesis: a real Ontario roof, clipped into the signature gable
 * (.roofline-bottom), with the brand promise + click-to-call. Below it the page
 * proceeds in the order spec'd in DESIGN_SPEC.md §8: trust strip, services,
 * why-us, the 01–05 process, honest stats, finished work, reviews, where-we-work,
 * and a closing copper CTA band (distinct from the slate footer CTA).
 *
 * Title/description are inherited from the root layout's metadata defaults
 * (canonical "/" is set there), so no per-page metadata export is needed here.
 */
export default function HomePage() {
  return (
    <>
      {/* LocalBusiness (RoofingContractor) structured data — VEGA, Wave 3. */}
      <JsonLd data={localBusinessSchema()} />
      <HomeHero />
      <TrustStrip />
      <ServicesOverview />
      <WhyAboveAll />
      <ProcessSequence tone="muted" />
      <StatsBand />
      <GalleryTeaser />
      <ReviewsTeaser />
      <ServiceAreaTeaser />
      <CtaBand roofline />
    </>
  );
}
