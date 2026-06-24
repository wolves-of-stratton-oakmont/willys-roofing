import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/lib/process";

/**
 * ProcessSequence — "How we work", rendered as the 01→05 sequence.
 *
 * This is the ONLY place numbered markers appear, because the content genuinely
 * is an ordered sequence — a roof is built eave-to-ridge, in order. The numbers
 * are set big in the display face and read as measured course ticks against a
 * connecting rule that runs down the steps (the "eave-to-ridge" line). Restrained
 * everywhere else; the structure here carries real meaning.
 *
 * Drop-in for both the home page and the services index (it renders its own
 * Section). Pass `tone="muted"` to sit it on the alternating band.
 */
export function ProcessSequence({
  tone = "default",
  eyebrow = "How we work",
  title = "Five steps from first look to final sweep",
  intro = "No mystery, no pressure. Here is exactly what working with us looks like — the same process on a single repair as on a full replacement.",
}: {
  tone?: "default" | "muted";
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <Section tone={tone} spacing="lg">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-slate-100)] sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 70}
            className="relative flex flex-col bg-[var(--color-chalk-50)] p-6 lg:p-7"
          >
            {/* number as a measured tick */}
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-extrabold leading-none text-[var(--color-copper-500)] sm:text-4xl">
                {step.number}
              </span>
              <span
                className="h-px flex-1 bg-[var(--color-slate-200)]"
                aria-hidden="true"
              />
              <Icon
                name={step.icon}
                size={20}
                className="shrink-0 text-[var(--color-slate-400)]"
              />
            </div>

            <h3 className="mt-5 text-lg text-[var(--color-slate-800)]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate-500)]">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
