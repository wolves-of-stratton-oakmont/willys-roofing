import { cn } from "@/lib/cn";

type StatProps = {
  /** Large headline value, e.g. "24/7", "Free", "100%". */
  value: string;
  /** Supporting label beneath. */
  label: string;
  tone?: "default" | "onDark";
  className?: string;
};

/**
 * Stat — a single honest "by the numbers" figure. The value is set in the
 * display face; we deliberately avoid fabricated counts (see lib/trust.ts).
 * Pair these in a row inside a Section.
 */
export function Stat({ value, label, tone = "default", className }: StatProps) {
  const onDark = tone === "onDark";
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl",
          onDark ? "text-[var(--color-copper-300)]" : "text-[var(--color-copper-500)]",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "mt-2 text-sm leading-snug",
          onDark ? "text-[var(--color-slate-200)]" : "text-[var(--color-slate-500)]",
        )}
      >
        {label}
      </span>
    </div>
  );
}
