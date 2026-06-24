import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import type { ServiceArea } from "@/lib/serviceAreas";

/**
 * AreaCard — one service-area town: name + local blurb (lib/serviceAreas.ts).
 * The primary/home-base area is marked with a copper "home base" flag.
 */
export function AreaCard({ area }: { area: ServiceArea }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[var(--radius-lg)] border bg-[var(--color-chalk-50)] p-6 shadow-[var(--shadow-xs)] transition-all duration-[var(--dur-mid)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]",
        area.primary
          ? "border-[var(--color-copper-500)]/35"
          : "border-[var(--color-slate-100)] hover:border-[var(--color-slate-200)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-[var(--color-slate-800)]">
          <Icon
            name="MapPin"
            size={18}
            className={
              area.primary
                ? "text-[var(--color-copper-500)]"
                : "text-[var(--color-slate-400)]"
            }
          />
          {area.name}
        </h3>
        {area.primary ? (
          <span className="inline-flex shrink-0 items-center rounded-[var(--radius-xs)] bg-[var(--color-copper-500)] px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white">
            Home base
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-600)]">
        {area.blurb}
      </p>
    </article>
  );
}
