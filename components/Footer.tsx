import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { site, navLinks } from "@/lib/site";
import { services } from "@/lib/services";
import { serviceAreaNames } from "@/lib/serviceAreas";

/**
 * Site footer — the credibility + navigation anchor at the bottom of every
 * page. Dark slate band with: a final CTA, brand blurb + contact, quick links,
 * services, the service-area list, hours, and a legal/social bottom bar.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-slate-900)] text-[var(--color-slate-300)]">
      {/* Signature copper course-rule cap */}
      <div className="course-rule" aria-hidden="true" />

      {/* Final CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-extrabold text-[var(--color-chalk-50)] sm:text-3xl">
              Ready for a roof done right?
            </p>
            <p className="mt-2 max-w-xl text-[var(--color-slate-300)]">
              Book a free, no-obligation roof assessment. We&rsquo;ll give you
              an honest answer and a clear written estimate.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button href="/contact" variant="onDark" size="lg">
              Free estimate
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-site grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-12">
        {/* Brand + contact */}
        <div className="col-span-2 md:col-span-4">
          <Logo variant="onDark" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-slate-400)]">
            Locally owned roofing for {site.serviceRegion}. Licensed, insured,
            and backed by a written workmanship warranty.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={site.phone.href}
                className="flex items-center gap-3 font-semibold text-[var(--color-chalk-50)] transition-colors hover:text-[var(--color-copper-300)]"
              >
                <Icon name="Phone" size={16} className="text-[var(--color-copper-300)]" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={site.email.href}
                className="flex items-center gap-3 transition-colors hover:text-[var(--color-copper-300)]"
              >
                <Icon name="Mail" size={16} className="text-[var(--color-copper-300)]" />
                {site.email.display}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="MapPin" size={16} className="text-[var(--color-copper-300)]" />
              {site.primaryCity}, {site.regionShort} &amp; surrounding area
            </li>
          </ul>

          {/* Social */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Willy's Roofing on Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/5 text-[var(--color-slate-300)] transition-colors hover:bg-white/10 hover:text-[var(--color-chalk-50)]"
            >
              <Icon name="Facebook" size={18} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Willy's Roofing on Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/5 text-[var(--color-slate-300)] transition-colors hover:bg-white/10 hover:text-[var(--color-chalk-50)]"
            >
              <Icon name="Instagram" size={18} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-copper-300)]">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--color-slate-300)] transition-colors hover:text-[var(--color-chalk-50)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-[var(--color-slate-300)] transition-colors hover:text-[var(--color-chalk-50)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-copper-300)]">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-[var(--color-slate-300)] transition-colors hover:text-[var(--color-chalk-50)]"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Service areas + hours */}
        <div className="col-span-2 md:col-span-3">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-copper-300)]">
            Service areas
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-slate-400)]">
            {serviceAreaNames.join(" · ")}
          </p>

          <h2 className="mt-7 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-copper-300)]">
            Hours
          </h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-[var(--color-slate-400)]">{h.day}</span>
                <span className="text-[var(--color-slate-300)]">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--color-slate-400)] sm:flex-row">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <Icon name="MapPin" size={13} className="text-[var(--color-slate-500)]" />
            Proudly serving {site.primaryCity} &amp; the {site.serviceRegion}.
          </p>
        </div>
      </div>
    </footer>
  );
}
