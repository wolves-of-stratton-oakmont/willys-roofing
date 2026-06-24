/**
 * ⚠️ PLACEHOLDER TESTIMONIALS — REPLACE BEFORE LAUNCH ⚠️
 *
 * OWNER / BEACON / DALE: These reviews are realistic, modest placeholders so
 * the site has something to render. They are NOT real customers. Before the
 * site goes live, the business owner MUST replace these with genuine reviews
 * (e.g. copied from Google, HomeStars, or Facebook with permission). Do not
 * publish invented testimonials as if they were real.
 *
 * Format intentionally uses first name + last initial + city, matching how
 * real local reviews are typically attributed. `rating` is out of 5.
 */

export type Testimonial = {
  quote: string;
  name: string;
  city: string;
  rating: number;
  /** Optional: which service the review relates to (for filtering). */
  service?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "From the estimate to the final clean-up, everything was exactly as promised. The crew protected our gardens, finished in two days, and you genuinely couldn't tell anyone had been in the yard. The new roof looks fantastic.",
    name: "Karen M.",
    city: "Stoney Creek",
    rating: 5,
    service: "asphalt-shingle-roofing",
  },
  {
    quote:
      "We had a leak that two other companies just wanted to fix by replacing the whole roof. Above All found the actual problem — a cracked pipe boot — and repaired it the same afternoon for a fraction of the price. Honest people.",
    name: "Dave R.",
    city: "Hamilton",
    rating: 5,
    service: "roof-repair",
  },
  {
    quote:
      "A branch came through our roof during a storm and they had it tarped within a couple of hours of my call. They documented everything for our insurance and handled the adjuster directly. Lifesavers.",
    name: "Priya S.",
    city: "Burlington",
    rating: 5,
    service: "emergency-roof-repair",
  },
  {
    quote:
      "Professional from start to finish. The quote was detailed and itemized, the price didn't change, and they registered the shingle warranty in our name like they said they would. Highly recommend.",
    name: "Tom B.",
    city: "Grimsby",
    rating: 5,
    service: "asphalt-shingle-roofing",
  },
  {
    quote:
      "Our flat porch roof had leaked for years. They installed a proper rubber membrane and explained exactly why the old one kept failing. Bone dry through the whole winter since.",
    name: "Linda C.",
    city: "Ancaster",
    rating: 5,
    service: "flat-roofing",
  },
  {
    quote:
      "They fixed our ice-dam problem by sorting out the attic ventilation, not just the shingles. First winter in years without water stains on the bedroom ceiling. Wish we'd called them sooner.",
    name: "Mark D.",
    city: "Dundas",
    rating: 5,
    service: "attic-ventilation-and-insulation",
  },
  {
    quote:
      "New eavestrough and downspouts that finally move water away from the foundation. On time, fair price, and they cleaned up every last bit. Great local company.",
    name: "Sandra V.",
    city: "Beamsville",
    rating: 5,
    service: "eavestrough-and-gutters",
  },
  {
    quote:
      "Replaced two skylights that had been fogged and leaking for years. The difference in light is incredible and there's been no sign of a leak. Tidy, respectful crew.",
    name: "Greg H.",
    city: "Waterdown",
    rating: 5,
    service: "skylights",
  },
];

/** Average rating, derived (not fabricated) from the placeholder set above. */
export const averageRating =
  Math.round(
    (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) *
      10,
  ) / 10;
