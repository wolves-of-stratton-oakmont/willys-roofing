import Image from "next/image";
import { Section } from "@/components/Section";
import { Eyebrow } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

/**
 * Our story — honest, locally grounded narrative paired with a craftsmanship
 * photo. Deliberately avoids fabricated specifics (no founding year, no counts).
 * The copy is editable by the owner; everything here is true of a small,
 * licensed, insured local roofer.
 */
export function AboutStory() {
  return (
    <Section spacing="lg">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Image column with a quiet copper measure-tick caption rail. */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-100)] shadow-[var(--shadow-md)]">
              <Image
                src="/images/about/craftsmanship.jpg"
                alt="A roofer's hands fastening architectural shingles in straight, measured courses"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-start gap-3 font-mono text-xs leading-relaxed text-[var(--color-slate-500)]">
              <span className="mt-[2px] h-3 w-[2px] shrink-0 bg-[var(--color-copper-500)]" aria-hidden="true" />
              Every course laid straight, fastened to manufacturer spec — the
              part of the job nobody sees is the part that keeps the water out.
            </figcaption>
          </figure>
        </Reveal>

        {/* Narrative column. */}
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-slate-800)] sm:text-4xl">
            A trades-proud local roofer, accountable to its neighbours
          </h2>

          <div className="mt-6 max-w-prose space-y-5 text-lg leading-relaxed text-[var(--color-slate-600)]">
            <p>
              Willy's Roofing was built on a simple idea: a roof is the one
              part of a house you can&rsquo;t afford to get wrong, and most
              homeowners are asked to trust it to someone they just met. We set
              out to be the roofer people in our own community would actually
              recommend to a neighbour — because we have to see them again.
            </p>
            <p>
              We work across GTA, Hamilton, Burlington and the wider
              Niagara bench, and we know this region&rsquo;s housing and its
              weather. Century homes in the lower city, post-war bungalows on
              the mountain, new builds out toward the lake — each one calls for
              a different eye, and the freeze-thaw winters here punish a roof
              that was rushed or cheaped out on.
            </p>
            <p>
              So we do it as a system. We get on the roof and read the whole
              thing — the shingles, the flashing, the valleys, the
              ventilation, and the attic underneath. We tell you the truth
              about what we find, even when the honest answer is that you only
              need a repair. Then we install to manufacturer spec, register
              your warranty, and clean up like we were never there.
            </p>
          </div>

          {/* A short, honest "what that means" list — no invented metrics. */}
          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {beliefs.map((b) => (
              <li
                key={b.title}
                className="border-l-2 border-[var(--color-copper-500)] pl-4"
              >
                <p className="font-display text-base font-extrabold tracking-tight text-[var(--color-slate-800)]">
                  {b.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate-500)]">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const beliefs = [
  {
    title: "The honest recommendation",
    body: "If a repair will do, we’ll say so. We’d rather earn the replacement when you actually need it.",
  },
  {
    title: "Installed as a system",
    body: "Shingles, underlayment, flashing and ventilation work together — or they fail together. We don’t cut the parts you can’t see.",
  },
  {
    title: "Tidy from start to finish",
    body: "We protect the property going in and run a magnetic nail sweep going out. You should be able to walk the yard barefoot.",
  },
  {
    title: "Here after the job",
    body: "We’re local and we’re not going anywhere. A written workmanship warranty means a name and number that answers.",
  },
] as const;
