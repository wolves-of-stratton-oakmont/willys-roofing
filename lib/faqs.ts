/**
 * Frequently asked roofing questions for Willy's Roofing.
 * Real, useful answers written for southern Ontario homeowners.
 * Rendered on the FAQ page and (optionally) as FAQPage structured data.
 */

export type Faq = {
  question: string;
  answer: string;
  /** Loose grouping for the FAQ page. */
  category: "General" | "Cost & Estimates" | "Process" | "Materials & Warranty";
};

export const faqs: Faq[] = [
  {
    question: "How do I know if I need a roof repair or a full replacement?",
    answer:
      "It depends on the age and overall condition of the roof, not just the leak. A roof under about 15 years old with an isolated problem — a few wind-blown shingles, a failed flashing, a cracked pipe boot — is usually a repair. If your shingles are curling, cracking or shedding granules across the whole roof, or the roof is past 20 years, a replacement is often the smarter spend. We get up there, assess the real condition, and give you an honest recommendation with photos — including telling you when a repair is the better call.",
    category: "General",
  },
  {
    question: "How long does a roof replacement take?",
    answer:
      "Most residential asphalt shingle roofs in this area are completed in one to three days, depending on the size of the roof, the number of layers being torn off, the complexity of the rooflines, and the weather. We'll give you a realistic timeline in your written estimate, and we keep the site tidy at the end of each day.",
    category: "Process",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. Every estimate is free and carries no obligation. We come out, inspect the roof and attic, and provide a detailed, itemized written quote so you know exactly what's included and what it costs before you decide anything.",
    category: "Cost & Estimates",
  },
  {
    question: "How much does a new roof cost?",
    answer:
      "There's no honest one-size-fits-all number — the cost depends on the size and pitch of your roof, how many old layers need to come off, the condition of the wood underneath, the shingle you choose, and extras like ventilation, eavestrough or skylights. That's exactly why we provide a free, detailed estimate specific to your home rather than a guess over the phone. The quote you sign is the price you pay.",
    category: "Cost & Estimates",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Willy's Roofing is fully insured and carries WSIB coverage for our crew. That protects you from any liability for work happening on your property. We're happy to provide proof of coverage on request.",
    category: "General",
  },
  {
    question: "What warranty comes with my new roof?",
    answer:
      "You get two layers of protection. The shingle manufacturer provides a material warranty, which we register in your name, and Willy's Roofing provides its own written workmanship warranty on the installation. We'll go over the specific terms of both with you before the job starts.",
    category: "Materials & Warranty",
  },
  {
    question: "Can you help with my insurance claim for storm damage?",
    answer:
      "Yes. For wind, hail and fallen-tree damage, we document the damage with photographs for your records and your insurer, and we can work directly with your adjuster. If you have an active leak, call us right away — we offer emergency tarping to stop the water and limit the interior damage before the claim is even settled.",
    category: "Process",
  },
  {
    question: "What's the best time of year to replace a roof in Ontario?",
    answer:
      "Roofing can be done across most of the year here. Late spring through fall offers the most reliable weather and the best shingle sealing conditions, but we install in colder months too using cold-weather techniques and hand-sealing where needed. The best time is really before a worn-out roof starts leaking — waiting until it fails usually means paying for interior repairs as well.",
    category: "General",
  },
  {
    question: "Why does proper attic ventilation matter so much?",
    answer:
      "In our freeze-thaw climate, an under-ventilated attic is the hidden cause of a lot of roof problems. Trapped warm air melts rooftop snow that refreezes at the cold eaves, building ice dams that push water back under the shingles. In summer, the same trapped heat bakes the shingles from below and shortens their life. Balanced intake-and-exhaust ventilation protects your roof, helps prevent ice dams, and can even lower your energy bills — which is why we assess it on every job.",
    category: "Materials & Warranty",
  },
  {
    question: "Do you clean up after the job?",
    answer:
      "Always. We protect your property before we start, keep the site tidy throughout, and finish with a full ground clean-up and a magnetic sweep of the lawn, driveway and garden beds to catch every stray nail. You should be able to walk the yard barefoot when we leave.",
    category: "Process",
  },
];

/** Distinct categories in display order. */
export const faqCategories = [
  "General",
  "Cost & Estimates",
  "Process",
  "Materials & Warranty",
] as const;
