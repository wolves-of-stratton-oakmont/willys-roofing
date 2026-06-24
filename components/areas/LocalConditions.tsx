import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/**
 * LocalConditions — why local knowledge matters on this stretch of the map.
 * Genuinely regional, weather-aware content (escarpment wind, lake-effect snow,
 * freeze-thaw ice dams, older housing stock) — this is what makes the
 * service-areas page specific to the Hamilton–Niagara bench, not templated.
 */

const conditions: ReadonlyArray<{
  icon: string;
  title: string;
  body: string;
}> = [
  {
    icon: "Wind",
    title: "Escarpment wind",
    body: "Along the Niagara bench and up on the mountain, gusts coming over the escarpment find every loose shingle and lifted edge. We fasten and seal for uplift, not just for looks.",
  },
  {
    icon: "ShieldAlert",
    title: "Lake-effect snow & ice dams",
    body: "Snow rolling off Lake Ontario piles up fast. In a poorly vented attic it melts, runs to the cold eave, and refreezes into ice dams that push water back under the shingles. We fix the cause — the ventilation — not just the symptom.",
  },
  {
    icon: "Waves",
    title: "Freeze-thaw cycles",
    body: "Our winters swing above and below freezing again and again. That movement works at caulk, flashing and worn shingles until they let go. We detail the vulnerable points so they hold through the cycle.",
  },
  {
    icon: "Home",
    title: "Older housing stock",
    body: "Century homes in the lower city, post-war bungalows on the mountain, steep-pitched valley homes in Dundas — each needs a different eye. We roof to the house in front of us, not a one-size template.",
  },
];

export function LocalConditions() {
  return (
    <Section spacing="lg">
      <SectionHeader
        eyebrow="Built for this weather"
        title="Why local knowledge matters on these roofs"
        intro="A roof in the Hamilton–Niagara region has to answer to the escarpment, the lake and a hard freeze-thaw winter. Knowing the conditions is half of installing for them."
      />

      <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {conditions.map((c, i) => (
          <Reveal
            as="li"
            key={c.title}
            delay={(i % 2) * 80}
            className="flex gap-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-copper-100)] text-[var(--color-copper-600)] ring-1 ring-inset ring-[var(--color-copper-500)]/15">
              <Icon name={c.icon} size={22} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-tight text-[var(--color-slate-800)]">
                {c.title}
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--color-slate-600)]">
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
