import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { trustSignals } from "@/lib/trust";

/**
 * What you can count on — the four honest trust pillars (lib/trust.ts) on a
 * dark slate band with the faint blueprint measure-grid behind. No fabricated
 * numbers; these are commitments a licensed local roofer can stand behind.
 */
export function TrustPillars() {
  return (
    <Section
      tone="slate"
      spacing="lg"
      className="relative overflow-hidden"
    >
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          tone="onDark"
          eyebrow="What you can count on"
          title="The promises behind every roof"
          intro="No invented awards or numbers — just the things a licensed, insured local roofer should put in writing and stand behind."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/10 sm:grid-cols-2">
          {trustSignals.map((signal, i) => (
            <Reveal
              as="li"
              key={signal.title}
              delay={i * 70}
              className="flex flex-col gap-4 bg-[var(--color-slate-800)] p-7 sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-copper-500)]/15 text-[var(--color-copper-300)] ring-1 ring-inset ring-[var(--color-copper-300)]/25">
                <Icon name={signal.icon} size={22} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold tracking-tight text-[var(--color-chalk-50)]">
                  {signal.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[var(--color-slate-300)]">
                  {signal.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
