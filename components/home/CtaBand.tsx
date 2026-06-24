import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * CtaBand — the page's closing call to action. Deliberately COPPER (the one bold
 * colour), so it's distinct from the slate footer CTA directly beneath it. With
 * `roofline` on, its TOP edge takes the signature pitch so the band reads as
 * sitting "under a roof" — the second and final use of the roofline on the page
 * (the hero is the first). Phone + free-estimate, click-to-call everywhere.
 *
 * Shared across home / services index / service detail. Pass `roofline={false}`
 * on inner pages so the gable cut is reserved for the home page's hero pairing.
 */
export function CtaBand({
  title = "Get an honest answer about your roof",
  intro = "Book a free, no-obligation assessment. We'll get on the roof, show you what we find, and put a clear, written estimate in your hands — repair or replacement.",
  roofline = false,
}: {
  title?: string;
  intro?: string;
  roofline?: boolean;
}) {
  return (
    <section
      className={cn(
        "bg-[var(--color-copper-500)] text-white",
        roofline ? "roofline-top pb-16 pt-24 sm:pb-24 sm:pt-32" : "py-16 sm:py-24",
      )}
    >
      <div className="container-site">
        <Reveal
          as="div"
          className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="eyebrow text-white/85">Free estimate</span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">{intro}</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <Button href={site.phone.href} variant="onDark" size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button
              href="/contact"
              size="lg"
              className="border border-white/70 bg-transparent text-white shadow-none hover:border-white hover:bg-white/10"
            >
              Request a free estimate
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
