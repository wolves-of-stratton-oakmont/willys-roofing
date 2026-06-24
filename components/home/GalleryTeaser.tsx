import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/**
 * GalleryTeaser — a small, curated set of finished-work photos with a link to
 * the full /gallery. An asymmetric tiled layout (one tall feature + four
 * supporting tiles) keeps it from reading like a generic 3-up image strip.
 */

type Tile = { src: string; alt: string; className: string };

// A handful of the manifest gallery images, arranged as a feature + grid.
const tiles: Tile[] = [
  {
    src: "/images/gallery/project-01.jpg",
    alt: "Completed asphalt shingle roof on a detached Ontario home",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/gallery/project-04.jpg",
    alt: "Re-flashed brick chimney on a finished roof",
    className: "",
  },
  {
    src: "/images/gallery/project-06.jpg",
    alt: "Snow-covered roof through an Ontario winter",
    className: "",
  },
  {
    src: "/images/gallery/project-09.jpg",
    alt: "Finished roof photographed at golden hour",
    className: "",
  },
  {
    src: "/images/gallery/project-07.jpg",
    alt: "Close-up detail of fresh architectural shingles",
    className: "",
  },
];

export function GalleryTeaser() {
  return (
    <Section spacing="lg">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="Recent work"
          title="Roofs we've finished across the region"
          intro="A look at completed shingle and flat-roof projects, chimney re-flashes and detail work from around Stoney Creek and the wider Hamilton–Niagara area."
          maxWidth={false}
          className="max-w-2xl"
        />
        <Button href="/gallery" variant="outline" className="shrink-0">
          View full gallery
        </Button>
      </div>

      <Reveal
        as="div"
        className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4"
      >
        {tiles.map((tile, i) => (
          <Link
            key={tile.src}
            href="/gallery"
            aria-label={`View gallery — ${tile.alt}`}
            className={`group relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-slate-200)] ${tile.className}`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={
                i === 0
                  ? "(min-width: 640px) 36rem, 50vw"
                  : "(min-width: 640px) 18rem, 50vw"
              }
              className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-[var(--color-slate-900)]/0 transition-colors duration-[var(--dur-mid)] group-hover:bg-[var(--color-slate-900)]/15"
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-slate-900)]/60 text-[var(--color-chalk-50)] opacity-0 backdrop-blur transition-opacity duration-[var(--dur-mid)] group-hover:opacity-100">
              <Icon name="ArrowUpRight" size={16} />
            </span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
