import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { trustSignals } from "@/lib/trust";

/**
 * WhyAboveAll — the four trust pillars on a slate band with the faint blueprint
 * measure-grid behind. A two-column layout: a craftsmanship photo anchors the
 * left, the four `trustSignals` pillars stack on the right. The dark band gives
 * the page a structural "core" between the lighter content sections.
 */
export function WhyAboveAll() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-slate-800)] py-20 text-[var(--color-chalk-100)] sm:py-28">
      {/* blueprint grid texture */}
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* image side */}
        <Reveal as="div" className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]">
            <Image
              src="/images/about/craftsmanship.jpg"
              alt="A roofer's hands fastening architectural shingles to manufacturer spec"
              fill
              sizes="(min-width: 1024px) 30rem, 100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-slate-900)]/40 to-transparent"
              aria-hidden="true"
            />
            {/* corner spec caption */}
            <span className="absolute bottom-4 left-4 rounded-[var(--radius-sm)] bg-[var(--color-slate-900)]/70 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-chalk-50)] backdrop-blur">
              Built as a system, not a patch
            </span>
          </div>
        </Reveal>

        {/* pillars side */}
        <div className="order-1 lg:order-2">
          <SectionHeader
            tone="onDark"
            eyebrow="Why Willy's Roofing"
            title="The roofer you'd recommend to your neighbour"
            intro="No hype, no fake urgency. Just licensed, insured work, an honest assessment, and a written guarantee you can hold us to."
            maxWidth={false}
          />

          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {trustSignals.map((signal, i) => (
              <Reveal as="li" key={signal.title} delay={i * 70} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white/[0.06] text-[var(--color-copper-300)] ring-1 ring-inset ring-white/10">
                  <Icon name={signal.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-base text-[var(--color-chalk-50)]">
                    {signal.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate-300)]">
                    {signal.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
