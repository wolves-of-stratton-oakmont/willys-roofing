import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "See the kind of roofing work Willy's Roofing does across GTA, Hamilton, Burlington and the Niagara region — shingle replacements, flat roofs, flashing, skylights and repairs.",
};

// GALLERY — Wave 2 (DALE). The visual centrepiece: a curated, editorial grid
// with honest, specific captions and an accessible lightbox.
export default function GalleryPage() {
  return (
    <>
      <Section tone="slate" spacing="md">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow="Our recent work"
          title="Roofs we're proud to put our name on"
          intro="A look at the kind of work we do across the region — from full shingle replacements to the small details that decide whether a roof keeps the water out."
        />
      </Section>

      <Section spacing="lg">
        {/* Honest framing — no fabricated project counts or before/after claims. */}
        <p className="mb-10 max-w-prose font-mono text-xs leading-relaxed tracking-wide text-[var(--color-slate-500)]">
          Select a photo to view it larger. Captions describe the type of work
          shown and the area we do it in.
        </p>

        <GalleryGrid />
      </Section>

      {/* Closing CTA — tailored to the gallery context. */}
      <Section tone="muted" spacing="md">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl text-[var(--color-slate-800)] sm:text-3xl">
              Want your roof to be the next one?
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-slate-600)]">
              We&rsquo;ll come out, assess the whole system, and give you an
              honest, written estimate — at no cost.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button href="/contact" variant="primary" size="lg">
              Get a free estimate
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
