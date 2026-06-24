import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { StarRating } from "./StarRating";
import { testimonials, type Testimonial } from "@/lib/testimonials";

/**
 * ReviewsBoard — renders the placeholder testimonials as representative
 * customer reviews.
 *
 * HONESTY (per brief): these are realistic placeholders, not verified reviews.
 * This board therefore shows NO aggregate star rating and NO "X reviews" count,
 * and makes no third-party-verification claim. Each card shows only its own
 * review's content + per-review rating. The first review is featured as a
 * pull-quote; the rest flow in a balanced multi-column layout.
 */

// Short, readable labels for the optional `service` slug on a testimonial.
// Local to this view so it doesn't couple to lib/services or imply more than
// the testimonial states.
const serviceLabels: Record<string, string> = {
  "asphalt-shingle-roofing": "Shingle replacement",
  "roof-repair": "Roof repair",
  "flat-roofing": "Flat roofing",
  "eavestrough-and-gutters": "Eavestrough",
  skylights: "Skylights",
  "attic-ventilation-and-insulation": "Ventilation",
  "emergency-roof-repair": "Emergency repair",
};

export function ReviewsBoard() {
  const [featured, ...rest] = testimonials;

  return (
    <div className="space-y-6">
      {/* Featured pull-quote */}
      {featured ? (
        <Reveal>
          <FeaturedReview review={featured} />
        </Reveal>
      ) : null}

      {/* Balanced masonry via CSS columns — avoids ragged row heights. */}
      <div className="gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {rest.map((review, i) => (
          <Reveal key={`${review.name}-${review.city}`} delay={(i % 3) * 70}>
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FeaturedReview({ review }: { review: Testimonial }) {
  return (
    <figure className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-800)] p-8 text-[var(--color-chalk-100)] shadow-[var(--shadow-md)] sm:p-12">
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <Icon
        name="Quote"
        size={48}
        strokeWidth={1.5}
        className="relative text-[var(--color-copper-400)]"
      />
      <blockquote className="relative mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-[var(--color-chalk-50)] sm:text-3xl">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="relative mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
        <StarRating rating={review.rating} tone="onDark" />
        <span className="font-display text-base font-extrabold tracking-tight text-[var(--color-chalk-50)]">
          {review.name}
        </span>
        <span className="text-sm text-[var(--color-slate-300)]">
          {review.city}, ON
        </span>
        {review.service && serviceLabels[review.service] ? (
          <span className="ml-auto inline-flex items-center rounded-[var(--radius-xs)] border border-white/15 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--color-copper-300)]">
            {serviceLabels[review.service]}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="flex break-inside-avoid flex-col rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-6 shadow-[var(--shadow-xs)] transition-shadow duration-[var(--dur-mid)] hover:shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={review.rating} />
        {review.service && serviceLabels[review.service] ? (
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--color-slate-400)]">
            {serviceLabels[review.service]}
          </span>
        ) : null}
      </div>
      <blockquote className="mt-4 leading-relaxed text-[var(--color-slate-600)]">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-baseline gap-2 border-t border-[var(--color-slate-100)] pt-4">
        <span className="font-display text-sm font-extrabold tracking-tight text-[var(--color-slate-800)]">
          {review.name}
        </span>
        <span className="text-sm text-[var(--color-slate-500)]">
          {review.city}, ON
        </span>
      </figcaption>
    </figure>
  );
}
