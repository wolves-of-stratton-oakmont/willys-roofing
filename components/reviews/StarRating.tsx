import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

/**
 * StarRating — renders a single review's own rating (out of 5). This reflects
 * the per-review value only; the Reviews page deliberately shows NO aggregate
 * rating or review count (the testimonials are honest placeholders, not a
 * verified third-party score). See lib/testimonials.ts.
 */
export function StarRating({
  rating,
  className,
  tone = "default",
}: {
  rating: number;
  className?: string;
  tone?: "default" | "onDark";
}) {
  const full = Math.round(Math.max(0, Math.min(5, rating)));
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${full} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="Star"
          size={16}
          strokeWidth={i < full ? 0 : 1.75}
          className={cn(
            i < full
              ? "fill-[var(--color-copper-500)] text-[var(--color-copper-500)]"
              : tone === "onDark"
                ? "text-[var(--color-slate-500)]"
                : "text-[var(--color-slate-300)]",
          )}
        />
      ))}
    </div>
  );
}
