import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import type { Service } from "@/lib/services";

/**
 * ServiceHero — the detail-page hero for a single service. A slate band (so it
 * relates to the global header) with the service's wide heroImage filling the
 * right two-fifths on desktop, a breadcrumb, the title + tagline + short
 * description, and both CTAs. The image carries a slate scrim on its left edge
 * so the seam into the band is seamless.
 */
export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-slate-800)] text-[var(--color-chalk-100)]">
      {/* hero image — full-bleed on the right, scrimmed into the slate */}
      <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block" aria-hidden="true">
        <Image
          src={service.heroImage}
          alt=""
          fill
          priority
          sizes="44vw"
          className="object-cover"
        />
        {/* left-edge gradient blends the photo into the slate band */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-slate-800)] via-[var(--color-slate-800)]/55 to-transparent" />
        {/* faint top scrim for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-900)]/40 to-transparent" />
      </div>

      <div className="container-site relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-slate-300)]">
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-[var(--color-copper-300)]"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-[var(--color-slate-500)]">
                /
              </li>
              <li className="text-[var(--color-copper-300)]">{service.title}</li>
            </ol>
          </nav>

          <div className="mt-5 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white/[0.06] text-[var(--color-copper-300)] ring-1 ring-inset ring-white/10">
              <Icon name={service.icon} size={24} />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-slate-300)]">
              {service.tagline}
            </span>
          </div>

          <h1 className="mt-5 text-4xl text-[var(--color-chalk-50)] sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-slate-200)]">
            {service.shortDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Get a free estimate
            </Button>
            <Button href={site.phone.href} variant="onDark" size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
          </div>
        </div>
      </div>

      {/* mobile/tablet image below the copy (the desktop one is absolute) */}
      <div className="relative aspect-[16/9] w-full lg:hidden">
        <Image
          src={service.heroImage}
          alt={`${service.title} — ${service.tagline}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--color-slate-800)] to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
