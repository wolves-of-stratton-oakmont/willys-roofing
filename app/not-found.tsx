import Link from "next/link";
import { Section } from "@/components/Section";
import { Eyebrow } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Global 404 — renders for any unmatched URL and for `notFound()` calls
 * (e.g. an unknown /services/[slug]). It renders INSIDE the root layout, so
 * the Header and Footer wrap it automatically.
 *
 * Honest + helpful: orients a lost visitor back to the routes that matter,
 * and offers click-to-call. Uses the Ridgeline signature (roofline slope +
 * copper course-tick eyebrow). One <h1>, responsive, reduced-motion-safe
 * (no JS motion here), visible copper focus ring (global :focus-visible).
 */
export default function NotFound() {
  // A few popular destinations to recover toward.
  const quickLinks = [
    { label: "All services", href: "/services" },
    { label: "Get a free estimate", href: "/contact" },
    { label: "Service areas", href: "/service-areas" },
    { label: "Reviews", href: "/reviews" },
  ];
  const popularServices = services.slice(0, 4);

  return (
    <Section tone="slate" spacing="lg">
      <div className="relative mx-auto max-w-2xl text-center">
        {/* Signature: a single roof-pitch accent above the code, drawn as a
            shallow gable in copper to echo the Ridgeline. Decorative. */}
        <svg
          width="72"
          height="34"
          viewBox="0 0 72 34"
          fill="none"
          aria-hidden="true"
          className="mx-auto mb-8"
        >
          <path
            d="M4 28 L36 5 L68 28"
            stroke="var(--color-copper-500)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 31 L36 16 L56 31"
            stroke="var(--color-slate-400)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <Eyebrow tone="onDark" className="justify-center">
          Error 404 · Page not found
        </Eyebrow>

        <h1 className="mt-5 text-4xl text-[var(--color-chalk-50)] sm:text-5xl">
          This page slipped through a gap in the roof
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-slate-200)]">
          The page you&rsquo;re after may have moved or never existed. Let&rsquo;s
          get you back on solid footing — here&rsquo;s where most visitors are
          headed.
        </p>

        {/* Primary recovery actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            <Icon name="Home" size={18} />
            Back to home
          </Button>
          <Button href={site.phone.href} variant="onDark" size="lg">
            <Icon name="Phone" size={18} />
            {site.phone.display}
          </Button>
        </div>

        {/* Quick links */}
        <nav
          aria-label="Helpful links"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
        >
          {quickLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-2">
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="text-[var(--color-slate-500)]"
                >
                  ·
                </span>
              ) : null}
              <Link
                href={link.href}
                className="rounded-[var(--radius-sm)] text-sm font-semibold text-[var(--color-copper-300)] underline-offset-4 transition-colors hover:text-[var(--color-copper-400)] hover:underline"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Popular services to recover toward */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-slate-400)]">
            Looking for one of these?
          </p>
          <ul className="mt-5 grid gap-3 text-left sm:grid-cols-2">
            {popularServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-[var(--color-copper-400)] hover:bg-white/[0.07]"
                >
                  <Icon
                    name={s.icon}
                    size={22}
                    className="shrink-0 text-[var(--color-copper-300)]"
                  />
                  <span>
                    <span className="block font-semibold text-[var(--color-chalk-50)]">
                      {s.title}
                    </span>
                    <span className="block text-sm text-[var(--color-slate-300)]">
                      {s.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
