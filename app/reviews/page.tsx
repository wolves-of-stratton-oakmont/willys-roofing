import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ReviewsBoard } from "@/components/reviews/ReviewsBoard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What homeowners across the Hamilton and Niagara region value about Willy's Roofing — honest assessments, fair pricing, clean job sites, and roofing done right.",
};

// REVIEWS — Wave 2 (DALE). Renders placeholder testimonials as representative
// reviews. Deliberately presents NO aggregate rating, NO review count, and NO
// third-party-verification claim (see the notice + lib/testimonials.ts).
export default function ReviewsPage() {
  return (
    <>
      <Section tone="slate" spacing="md">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow="In their words"
          title="What homeowners say about working with us"
          intro="The themes we hear most: a straight answer, a price that doesn't move, a tidy site, and a roof that holds up through an Ontario winter."
        />
      </Section>

      {/* Honest disclosure — calm, in the interface's voice, clearly visible. */}
      <Section spacing="sm">
        <div className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[var(--color-copper-500)]/30 bg-[var(--color-copper-100)]/45 p-5 sm:p-6">
          <Icon
            name="ClipboardCheck"
            size={22}
            className="mt-0.5 shrink-0 text-[var(--color-copper-600)]"
          />
          <div className="text-sm leading-relaxed text-[var(--color-slate-600)]">
            <p className="font-semibold text-[var(--color-slate-700)]">
              A note on these reviews
            </p>
            <p className="mt-1">
              The reviews below are representative examples of the feedback we
              aim for while we gather verified reviews from recent customers.
              They&rsquo;re shown to give you a feel for how we work — not as a
              scored or third-party-verified rating. To read public reviews,{" "}
              <a
                href={site.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-copper-600)] underline decoration-[var(--color-copper-300)] underline-offset-2 hover:text-[var(--color-copper-700)]"
              >
                look us up on Google
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section spacing="md">
        <ReviewsBoard />
      </Section>

      {/* Closing CTA — invite the visitor to become the next review. */}
      <Section tone="muted" spacing="md">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl text-[var(--color-slate-800)] sm:text-3xl">
              See for yourself
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-slate-600)]">
              The best way to judge a roofer is to get them on your roof. Book a
              free assessment and we&rsquo;ll give you the honest version.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button href="/contact" variant="primary" size="lg">
              Book a free assessment
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
