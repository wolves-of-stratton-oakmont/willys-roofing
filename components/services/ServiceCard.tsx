import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/services";

/**
 * ServiceCard — the shared roofing-service card used on the home overview and
 * the /services index. A calm, disciplined card: a photo on top (NOT clipped —
 * the roofline edge is reserved for the hero/CTA so it stays special), a copper
 * icon chip, title, tagline and short description, with a "Learn more" affordance
 * that slides its arrow on hover. The whole card is a single link target.
 *
 * Two layouts:
 *   • "card"  — vertical photo-card for a 3-up grid (home + services grid).
 *   • "row"   — wide horizontal media-row (an alternative dense listing).
 */
export function ServiceCard({
  service,
  layout = "card",
  imagePriority = false,
  className,
}: {
  service: Service;
  layout?: "card" | "row";
  imagePriority?: boolean;
  className?: string;
}) {
  const href = `/services/${service.slug}`;

  if (layout === "row") {
    return (
      <Link
        href={href}
        className={cn(
          "group grid grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] shadow-[var(--shadow-xs)] transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-[var(--color-slate-200)] hover:shadow-[var(--shadow-md)] sm:grid-cols-[14rem_1fr] lg:grid-cols-[18rem_1fr]",
          className,
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
          <Image
            src={service.image}
            alt={`${service.title} — ${service.tagline}`}
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 14rem, 100vw"
            priority={imagePriority}
            className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-col p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-copper-100)] text-[var(--color-copper-600)]">
              <Icon name={service.icon} size={20} />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-slate-400)]">
              {service.tagline}
            </span>
          </div>
          <h3 className="mt-4 text-xl text-[var(--color-slate-800)]">
            {service.title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-slate-500)]">
            {service.shortDescription}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-copper-600)]">
            Learn more
            <Icon
              name="ArrowRight"
              size={16}
              className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] shadow-[var(--shadow-xs)] transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[var(--color-slate-200)] hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} — ${service.tagline}`}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
          priority={imagePriority}
          className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
        />
        {/* copper icon chip floats over the lower-left of the image */}
        <span className="absolute bottom-0 left-5 translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-copper-100)] bg-[var(--color-chalk-50)] text-[var(--color-copper-600)] shadow-[var(--shadow-sm)]">
          <Icon name={service.icon} size={22} />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-9">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-slate-400)]">
          {service.tagline}
        </span>
        <h3 className="mt-2 text-xl text-[var(--color-slate-800)]">
          {service.title}
        </h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-[var(--color-slate-500)]">
          {service.shortDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-copper-600)]">
          Learn more
          <Icon
            name="ArrowRight"
            size={16}
            className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
