/**
 * Gallery items for Willy's Roofing.
 *
 * Image paths are the canonical manifest paths (DESIGN_SPEC.md §10 — exactly
 * /images/gallery/project-NN.jpg). Captions are honest and specific (work +
 * roof type + area) WITHOUT fabricated "before/after" claims, project counts,
 * or invented addresses. The owner can refine these per real job once live.
 *
 * `span` drives the editorial layout (a few feature tiles among standard ones)
 * so the showcase reads as curated, not a uniform stock grid.
 *
 * OWNER NOTE: swap these for photos of your own completed roofs before launch,
 * keeping each caption truthful to the job shown.
 */

export type GalleryItem = {
  src: string;
  /** Descriptive alt for screen readers / SEO. */
  alt: string;
  /** Short, scannable mono tag, e.g. "Asphalt shingles". */
  tag: string;
  /** One honest line about the job, shown as the figure caption. */
  caption: string;
  /** Service area / town this kind of work is shown in. */
  area: string;
  /** Layout emphasis in the editorial grid. */
  span?: "feature" | "tall" | "wide" | "regular";
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/project-01.jpg",
    alt: "A completed charcoal asphalt shingle roof on a detached two-storey home",
    tag: "Asphalt shingles",
    caption: "Full architectural-shingle replacement on a detached home.",
    area: "GTA",
    span: "feature",
  },
  {
    src: "/images/gallery/project-02.jpg",
    alt: "A roofing crew fastening the final courses of a new shingle roof",
    tag: "Replacement",
    caption: "Crew closing out a tear-off and re-roof in a single visit.",
    area: "Hamilton",
    span: "regular",
  },
  {
    src: "/images/gallery/project-03.jpg",
    alt: "A roof with a dormer, showing shingles cut and woven neatly around the detail",
    tag: "Detailing",
    caption: "Shingles cut and stepped cleanly around a dormer.",
    area: "Dundas",
    span: "regular",
  },
  {
    src: "/images/gallery/project-04.jpg",
    alt: "A brick chimney with fresh metal step-flashing where it meets the shingles",
    tag: "Flashing",
    caption: "Re-flashed chimney — the usual source of a stubborn leak.",
    area: "Ancaster",
    span: "tall",
  },
  {
    src: "/images/gallery/project-05.jpg",
    alt: "A two-storey home with a newly shingled gable roof against an overcast sky",
    tag: "Gable roof",
    caption: "New gable roof, balanced ventilation included.",
    area: "Burlington",
    span: "wide",
  },
  {
    src: "/images/gallery/project-06.jpg",
    alt: "Snow sitting evenly on a residential roof in winter with no ice damming at the eaves",
    tag: "Winter performance",
    caption: "Snow shedding evenly — a sign the attic is venting right.",
    area: "Waterdown",
    span: "regular",
  },
  {
    src: "/images/gallery/project-07.jpg",
    alt: "Close-up texture of freshly laid architectural asphalt shingles in straight courses",
    tag: "Workmanship",
    caption: "Straight, consistent courses across the field of the roof.",
    area: "Grimsby",
    span: "regular",
  },
  {
    src: "/images/gallery/project-08.jpg",
    alt: "The exterior of a suburban Ontario home with a clean, recently finished roof",
    tag: "Curb appeal",
    caption: "A finished re-roof that quietly lifts the whole house.",
    area: "Beamsville",
    span: "regular",
  },
  {
    src: "/images/gallery/project-09.jpg",
    alt: "A finished residential roof catching warm low light at golden hour",
    tag: "Completed",
    caption: "Job wrapped, site cleared, nails swept — done right.",
    area: "GTA",
    span: "feature",
  },
  {
    src: "/images/gallery/project-10.jpg",
    alt: "A completed low-slope flat roof with a continuous rubber membrane",
    tag: "Flat roof",
    caption: "Low-slope membrane over a porch addition, fully sealed.",
    area: "Hamilton",
    span: "regular",
  },
  {
    src: "/images/gallery/project-11.jpg",
    alt: "A skylight set neatly into a new shingle roof with watertight flashing",
    tag: "Skylights",
    caption: "Skylight reset and flashed watertight during a re-roof.",
    area: "Oakville",
    span: "regular",
  },
  {
    src: "/images/gallery/project-12.jpg",
    alt: "A detail of a grey standing-seam metal roof on a residential home",
    tag: "Metal roofing",
    caption: "Standing-seam detail for a longer-life roof system.",
    area: "Lincoln",
    span: "wide",
  },
];
