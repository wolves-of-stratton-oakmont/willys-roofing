import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/testimonials";

/**
 * TestimonialCard — a single placeholder review rendered honestly: quote, a
 * copper star rating, and "First name L. · City" attribution (the way real
 * local reviews are credited). A large quotation glyph anchors the card. These
 * are PLACEHOLDERS until the owner adds real reviews — see lib/testimonials.ts.
 */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const { quote, name, city, rating } = testimonial;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-7 shadow-[var(--shadow-xs)]",
        className,
      )}
    >
      {/* rating */}
      <div
        className="flex items-center gap-0.5 text-[var(--color-copper-500)]"
        role="img"
        aria-label={`Rated ${rating} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={16}
            className={cn(
              i < rating
                ? "fill-current"
                : "text-[var(--color-slate-200)]",
            )}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1">
        <Icon
          name="Quote"
          size={24}
          className="text-[var(--color-copper-300)]"
        />
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-slate-700)]">
          {quote}
        </p>
      </blockquote>

      <figcaption className="mt-6 border-t border-[var(--color-slate-100)] pt-4 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-slate-500)]">
        <span className="font-semibold text-[var(--color-slate-700)]">
          {name}
        </span>
        <span className="px-1.5 text-[var(--color-slate-300)]">·</span>
        {city}
      </figcaption>
    </figure>
  );
}
