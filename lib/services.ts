/**
 * Roofing services offered by Willy's Roofing.
 * Page builders RENDER this data — do not invent divergent service copy.
 *
 * `icon` is a lucide-react icon name (PascalCase). Builders import it like:
 *   import { Home as Icon } from "lucide-react"
 * or resolve dynamically via a small icon map in their component.
 *
 * `image` / `heroImage` are local /public string paths. Beacon downloads the
 * actual files (see IMAGE MANIFEST in DESIGN_SPEC.md). Reference as strings —
 * never `import` them — so the build stays green before assets land.
 */

export type Service = {
  slug: string;
  title: string;
  /** Short tagline shown on cards. */
  tagline: string;
  /** 1–2 sentence summary for cards and meta description. */
  shortDescription: string;
  /** Long-form copy for the service detail page (2–3 paragraphs). */
  longDescription: string[];
  /** Bullet features / inclusions. */
  features: string[];
  /** lucide-react icon name. */
  icon: string;
  /** Card / grid thumbnail. */
  image: string;
  /** Wide hero image for the service detail page. */
  heroImage: string;
  /** Whether to surface this service in the top-level "popular" rail. */
  featured: boolean;
};

export const services: Service[] = [
  {
    slug: "asphalt-shingle-roofing",
    title: "Asphalt Shingle Roofing",
    tagline: "Replacement & new installs",
    shortDescription:
      "Complete tear-off and replacement with premium architectural shingles built for Ontario's freeze-thaw winters and summer storms.",
    longDescription: [
      "Architectural asphalt shingles are the workhorse of the southern Ontario rooftop — and the system underneath the shingle is what determines whether your roof lasts 12 years or 30. We do a full tear-off down to the deck, replace any rotten or delaminated sheathing, and rebuild the roof as a system: ice-and-water shield at the eaves and valleys, a breathable synthetic underlayment across the field, proper drip edge, and balanced intake-and-exhaust ventilation.",
      "We install premium laminate shingles from manufacturers like GAF, IKO and Malarkey, and we register the manufacturer's warranty in your name. Crews are trained to the manufacturer's spec — correct nailing pattern, correct fastener depth, sealed penetrations — because a shingle warranty is only worth the installation behind it.",
      "Every replacement ends with a full ground clean-up and a magnetic sweep of your lawn, driveway and gardens for stray nails. You get a written workmanship warranty in addition to the manufacturer's coverage.",
    ],
    features: [
      "Full tear-off to the deck & sheathing inspection",
      "Ice-and-water shield at eaves, valleys & penetrations",
      "Premium architectural (laminate) shingles",
      "Balanced ridge & soffit ventilation",
      "Manufacturer warranty registered in your name",
      "Magnetic nail sweep & full site clean-up",
    ],
    icon: "Home",
    image: "/images/services/asphalt-shingles.jpg",
    heroImage: "/images/services/asphalt-shingles-hero.jpg",
    featured: true,
  },
  {
    slug: "roof-repair",
    title: "Roof Repair",
    tagline: "Leaks, missing shingles & flashing",
    shortDescription:
      "Fast, lasting repairs for leaks, wind-blown shingles, failed flashing and pipe boots — diagnosed properly, not just patched.",
    longDescription: [
      "Not every roof needs replacing. A surprising number of leaks trace back to a single failed detail: a cracked pipe boot, a lifted shingle course after a windstorm, a separated chimney flashing, or a valley that was never lined correctly. We find the actual source of the water — which is often a metre or more uphill from where it shows up on your ceiling — and fix the cause, not just the stain.",
      "We carry common shingle colours and flashing stock on the truck, so most repairs are completed in a single visit. If your roof is near the end of its life and a repair would be throwing good money after bad, we'll tell you that honestly and show you photos of what we found.",
      "Storm hit overnight? We offer emergency tarping to stop active water entry and protect your interior until a permanent repair can be scheduled.",
    ],
    features: [
      "True leak diagnosis (we trace it to the source)",
      "Shingle, flashing, valley & pipe-boot repairs",
      "Emergency tarping for active leaks",
      "Photo report of what we found & fixed",
      "Honest repair-vs-replace advice",
    ],
    icon: "Wrench",
    image: "/images/services/roof-repair.jpg",
    heroImage: "/images/services/roof-repair-hero.jpg",
    featured: true,
  },
  {
    slug: "flat-roofing",
    title: "Flat & Low-Slope Roofing",
    tagline: "EPDM, TPO & modified bitumen",
    shortDescription:
      "Watertight membrane systems for flat and low-slope sections — rear additions, porches, dormers and commercial buildings.",
    longDescription: [
      "Flat and low-slope roofs shed water differently than a steep shingle roof, and they fail differently too — usually at seams, terminations and drains. They need a true membrane system, not shingles. We install and repair EPDM rubber, TPO and SBS modified-bitumen (torch-down) systems sized to the building and the slope.",
      "Low-slope sections are common in this area on rear additions, garage and porch roofs, and dormers, as well as on commercial and multi-unit buildings. We detail the perimeter, penetrations and drains carefully — that's where the warranty really lives — and ensure positive drainage so water doesn't pond.",
      "Whether it's a single porch roof or a full commercial deck, we'll spec the right membrane for the exposure and give you a clear, written scope.",
    ],
    features: [
      "EPDM, TPO & modified-bitumen systems",
      "Residential additions, porches & dormers",
      "Commercial & multi-unit low-slope decks",
      "Proper drainage & ponding correction",
      "Fully detailed seams, drains & terminations",
    ],
    icon: "SquareStack",
    image: "/images/services/flat-roof.jpg",
    heroImage: "/images/services/flat-roof-hero.jpg",
    featured: true,
  },
  {
    slug: "eavestrough-and-gutters",
    title: "Eavestrough & Gutters",
    tagline: "Troughs, downspouts & guards",
    shortDescription:
      "Seamless aluminum eavestrough, downspouts and leaf guards that move water away from your roof, fascia and foundation.",
    longDescription: [
      "Your eavestrough is part of your roofing system — when it overflows or pulls away from the fascia, water ends up behind the boards, in the soffit, and against your foundation. We install seamless aluminum eavestrough formed on-site to the exact length of each run, in a colour matched to your trim, with downspouts routed to carry water well clear of the house.",
      "We can add leaf guards to reduce cleaning on tree-lined lots, and we replace rotten fascia and soffit while we're up there so the new trough has something solid to hang from. Capacity and slope are set correctly so heavy Ontario downpours and spring melt actually drain.",
      "Eavestrough work pairs naturally with a roof replacement, but we're happy to do it as a standalone job.",
    ],
    features: [
      "Seamless aluminum eavestrough (formed on-site)",
      "Correctly sloped runs & downspout routing",
      "Leaf-guard / gutter-guard options",
      "Fascia & soffit repair and replacement",
      "Colour-matched to your existing trim",
    ],
    icon: "Waves",
    image: "/images/services/eavestrough.jpg",
    heroImage: "/images/services/eavestrough-hero.jpg",
    featured: false,
  },
  {
    slug: "skylights",
    title: "Skylights",
    tagline: "Install, replace & re-flash",
    shortDescription:
      "Skylight installation, replacement and leak-proof re-flashing that brings in daylight without bringing in water.",
    longDescription: [
      "A skylight is only as good as the flashing kit around it. Most skylight leaks aren't the glass — they're a worn seal or a flashing that was installed without the proper step-and-saddle detail. We install and replace skylights using the manufacturer's flashing kit, integrated correctly with your shingles and underlayment.",
      "We work with leading skylight brands and can replace an old, fogged or leaking unit with a modern, energy-efficient one — including options that open for ventilation. If you're already replacing your roof, it's the ideal time to add or upgrade a skylight while the area is open.",
      "Every skylight we touch gets a proper flashing kit and a water test before we call it done.",
    ],
    features: [
      "New skylight installation",
      "Replacement of fogged or leaking units",
      "Manufacturer flashing kits, installed to spec",
      "Fixed, vented & energy-efficient options",
      "Coordinated with roof replacement",
    ],
    icon: "PanelTop",
    image: "/images/services/skylight.jpg",
    heroImage: "/images/services/skylight-hero.jpg",
    featured: false,
  },
  {
    slug: "attic-ventilation-and-insulation",
    title: "Attic Ventilation & Insulation",
    tagline: "Stop ice dams & heat buildup",
    shortDescription:
      "Balanced ventilation and attic insulation that fights ice dams in winter, heat buildup in summer, and premature shingle wear.",
    longDescription: [
      "Most premature roof failures in this climate start in the attic. Without balanced intake (soffit) and exhaust (ridge) ventilation, warm moist air gets trapped: in winter it melts the snow on your roof and refreezes at the cold eave, building ice dams that force water back under the shingles; in summer it bakes the underside of the deck and ages your shingles from below.",
      "We assess the whole system — intake, exhaust, insulation depth and air sealing — and correct what's out of balance. That can mean adding soffit vents, installing a continuous ridge vent, baffling the eaves so insulation doesn't choke the airflow, and topping up insulation to current levels.",
      "Better ventilation protects your shingle warranty, lowers your energy bills, and is one of the best-value upgrades you can make during a roof replacement.",
    ],
    features: [
      "Balanced soffit-intake & ridge-exhaust venting",
      "Ice-dam prevention at the eaves",
      "Attic insulation top-up to current levels",
      "Air sealing & eave baffles",
      "Protects shingle warranty & lowers bills",
    ],
    icon: "Wind",
    image: "/images/services/attic-ventilation.jpg",
    heroImage: "/images/services/attic-ventilation-hero.jpg",
    featured: false,
  },
  {
    slug: "emergency-roof-repair",
    title: "Emergency Roof Repair",
    tagline: "24/7 storm & leak response",
    shortDescription:
      "Storm damage, a tree on the roof, or water pouring into the house — rapid emergency tarping and repair to stop the damage now.",
    longDescription: [
      "When a windstorm strips shingles, a branch punctures the deck, or water is actively coming through your ceiling, you don't have days to wait. We provide emergency response across our service area to stop active water entry — tarping the affected area, clearing debris, and protecting your interior and belongings.",
      "Once the emergency is contained, we document the damage with photos for your records and your insurer, and we walk you through the permanent repair or replacement. We're familiar with the insurance claim process for storm and wind damage and can work directly with your adjuster.",
      "Call us the moment it happens — the faster the roof is covered, the less interior, drywall and mould damage you'll be dealing with later.",
    ],
    features: [
      "Rapid emergency tarping to stop active leaks",
      "Storm, wind & fallen-tree damage",
      "Photo documentation for insurance claims",
      "We work directly with your adjuster",
      "Permanent repair or replacement to follow",
    ],
    icon: "ShieldAlert",
    image: "/images/services/emergency-repair.jpg",
    heroImage: "/images/services/emergency-repair-hero.jpg",
    featured: true,
  },
];

/** Convenience lookups for page builders. */
export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const featuredServices = services.filter((s) => s.featured);
