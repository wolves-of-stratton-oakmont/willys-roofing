/**
 * ContactRail — the "reach a person" column on /contact.
 *
 * Framed as the roofer's intake desk: the phone is the single fastest path to a
 * roof, so it leads as a prominent copper-accented click-to-call block on slate.
 * Below it: email, hours (mono / spec-sheet), and the honest service region.
 *
 * This is a server component — no interactivity, just real contact facts pulled
 * from lib/site. Signature is used sparingly: a course-tick eyebrow plus one
 * faint blueprint-grid behind the call block; nothing else competes with it.
 */

import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/SectionHeader";
import { site } from "@/lib/site";
import { primaryArea, nearbyAreas } from "@/lib/serviceAreas";

export function ContactRail() {
  return (
    <div className="flex flex-col gap-5">
      {/* Primary: call now. The fastest, most human path — spend copper here. */}
      <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-800)] text-[var(--color-chalk-100)] shadow-[var(--shadow-md)]">
        <div className="blueprint-grid p-7 sm:p-8">
          <Eyebrow tone="onDark">Fastest way to reach us</Eyebrow>

          <a
            href={site.phone.href}
            className="mt-4 inline-flex items-baseline gap-3 font-display text-4xl font-extrabold tracking-tight text-[var(--color-chalk-50)] transition-colors hover:text-[var(--color-copper-300)] sm:text-5xl"
          >
            <Icon
              name="Phone"
              size={28}
              className="translate-y-1 text-[var(--color-copper-300)]"
              aria-hidden
            />
            {site.phone.display}
          </a>

          <p className="mt-4 max-w-sm text-[var(--color-slate-200)]">
            Call or text for a free estimate, or if you have an active leak. We
            answer real questions and give honest answers — even if the honest
            answer is &ldquo;you only need a repair.&rdquo;
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-copper-300)]">
            <Icon name="ShieldAlert" size={14} aria-hidden />
            {site.emergencyNote}
          </p>
        </div>
      </div>

      {/* Email + hours + area, in a quiet paper card. */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-7 shadow-[var(--shadow-xs)] sm:p-8">
        <dl className="flex flex-col divide-y divide-[var(--color-slate-100)]">
          {/* Email */}
          <div className="flex items-start gap-4 pb-5">
            <RailIcon name="Mail" />
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-slate-400)]">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={site.email.href}
                  className="font-medium text-[var(--color-slate-700)] underline-offset-4 hover:text-[var(--color-copper-600)] hover:underline"
                >
                  {site.email.display}
                </a>
              </dd>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4 py-5">
            <RailIcon name="Clock" />
            <div className="min-w-0 flex-1">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-slate-400)]">
                Hours
              </dt>
              <dd className="mt-2">
                <ul className="space-y-1.5">
                  {site.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between gap-4 text-sm text-[var(--color-slate-600)]"
                    >
                      <span>{h.day}</span>
                      <span className="font-mono tabular-nums text-[var(--color-slate-500)]">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </div>

          {/* Service region (honest — a region, not a storefront address). */}
          <div className="flex items-start gap-4 pt-5">
            <RailIcon name="MapPin" />
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-slate-400)]">
                Where we work
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--color-slate-600)]">
                Based in {primaryArea.name}, {site.regionShort} — serving the{" "}
                {site.serviceRegion}, including {nearbyAreas.slice(0, 5).map((a) => a.name).join(", ")} and
                surrounding towns.
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}

function RailIcon({ name }: { name: string }) {
  return (
    <span
      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-copper-100)] text-[var(--color-copper-600)]"
      aria-hidden="true"
    >
      <Icon name={name} size={18} />
    </span>
  );
}
