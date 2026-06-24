import { Section } from "@/components/Section";
import { Stat } from "@/components/Stat";
import { Eyebrow } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { honestStats } from "@/lib/trust";

/**
 * StatsBand — honest "by the numbers" commitments on a slate band.
 *
 * These are commitments and ranges (24/7, Free, 100% nail sweep, Written
 * warranty), never fabricated totals — see lib/trust.ts. Set large in the
 * display face via the shared Stat component, divided like a spec sheet.
 */
export function StatsBand() {
  return (
    <Section tone="slate" spacing="lg">
      <div className="flex flex-col gap-3">
        <Eyebrow tone="onDark">By the numbers</Eyebrow>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-slate-200)]">
          Some things we promise on every job, no exceptions. No invented review
          counts here — just the standards we hold ourselves to.
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-12 lg:grid-cols-4">
        {honestStats.map((stat, i) => (
          <Reveal as="li" key={stat.label} delay={i * 70}>
            <Stat value={stat.value} label={stat.label} tone="onDark" />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
