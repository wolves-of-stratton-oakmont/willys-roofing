import Image from "next/image";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { trustBadges } from "@/lib/trust";

/**
 * HomeHero — the thesis.
 *
 * The most characteristic thing in an Ontario roofer's world is the roof itself,
 * read AS a roof against the sky. So the hero photo is clipped with the signature
 * `.roofline-bottom` gable edge: the image literally becomes "the roof", and the
 * brand promise + CTAs sit underneath it. A mono "spec tag" overlay (location /
 * licensed) reinforces the tape-measure voice, and a copper course-rule seams the
 * pitch. This is the page's one bold move; everything below it stays quiet.
 *
 * Layout: two columns on desktop (promise left, roof right); stacks on mobile
 * with the roof on top — which is exactly what the signature wants to say.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-chalk-100)]">
      {/* faint measure-grid wash in the upper field, behind everything */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        aria-hidden="true"
      >
        <div className="blueprint-grid h-full w-full opacity-40" />
      </div>

      <div className="container-site relative grid items-center gap-10 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
        {/* ---- Promise column ---- */}
        <div className="order-2 lg:order-1">
          <Reveal as="div">
            <span className="eyebrow">
              {site.primaryCity}, {site.regionShort} · Roofing
            </span>
          </Reveal>

          <Reveal as="h1" delay={70} className="mt-5">
            <span className="block text-4xl text-[var(--color-slate-800)] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
              The roof over your head,
            </span>
            <span
              className="mt-1 block text-5xl text-[var(--color-copper-600)] sm:text-6xl lg:text-[4.2rem] lg:leading-[0.98]"
              style={{ fontStretch: "112%", letterSpacing: "-0.02em" }}
            >
              done right the first time.
            </span>
          </Reveal>

          <Reveal as="p" delay={140} className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-slate-500)]">
            Locally owned, licensed and insured roofers serving {site.primaryCity},
            Hamilton and the Niagara region. We get on the roof, give you a
            straight answer, and install it as a complete system — then clean up
            like we were never there.
          </Reveal>

          <Reveal as="div" delay={210} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Get a free estimate
            </Button>
            <Button href={site.phone.href} variant="secondary" size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
          </Reveal>

          {/* trust ticks */}
          <Reveal as="ul" delay={280} className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-slate-600)]"
              >
                <Icon
                  name={b.icon}
                  size={16}
                  className="text-[var(--color-copper-500)]"
                />
                {b.label}
              </li>
            ))}
          </Reveal>
        </div>

        {/* ---- Roof column: the photo IS the roof (roofline-bottom gable) ---- */}
        <Reveal as="div" delay={120} className="order-1 lg:order-2">
          <div className="relative">
            <div className="roofline-bottom relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] bg-[var(--color-slate-200)] shadow-[var(--shadow-lg)] sm:aspect-[5/4]">
              <Image
                src="/images/hero/main.jpg"
                alt="Newly shingled gable roof of a two-storey home against a clear Ontario sky"
                fill
                priority
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
              {/* a touch of slate at the eaves so the spec tag stays legible */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-slate-900)]/35 to-transparent"
                aria-hidden="true"
              />
              {/* spec tag — the tape-measure / inspection voice */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-slate-900)]/70 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-chalk-50)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper-400)]" />
                Pitch 3:12 · {site.regionShort}
              </div>
            </div>

            {/* copper course-rule seam directly under the gable point */}
            <div className="course-rule mt-5" aria-hidden="true" />

            {/* small spec line, like a drawing caption */}
            <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-slate-400)]">
              Installed to manufacturer spec · {site.emergencyNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
