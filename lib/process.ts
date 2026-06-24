/**
 * "How we work" — the Willy's Roofing project process.
 * This IS a real sequence, so numbered markers (01–05) are appropriate.
 * `icon` is a lucide-react icon name.
 */

export type ProcessStep = {
  /** Zero-padded order label, e.g. "01". */
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Free roof assessment",
    description:
      "We come out, get on the roof, and inspect the whole system — shingles, flashing, ventilation and the attic. You get a straight answer on whether you need a repair or a replacement, with photos of what we found.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Clear written estimate",
    description:
      "You receive a detailed, itemized quote with the exact materials, scope and warranty in writing. No pressure, no hidden line items, and no surprises once the work starts. Questions answered before you sign.",
    icon: "FileText",
  },
  {
    number: "03",
    title: "Scheduling & prep",
    description:
      "We lock in a date, order your materials, and prep the site — protecting your gardens, windows, AC unit and driveway before a single shingle comes off.",
    icon: "CalendarCheck",
  },
  {
    number: "04",
    title: "Installation done right",
    description:
      "Our crew installs your roof as a complete system, to manufacturer spec, in as few days as the weather allows. We keep the site tidy each day and keep you informed of progress.",
    icon: "Hammer",
  },
  {
    number: "05",
    title: "Clean-up & warranty",
    description:
      "We do a full ground clean-up, run a magnetic sweep for nails, and walk the finished job with you. Then we register your manufacturer warranty and hand over our written workmanship guarantee.",
    icon: "ShieldCheck",
  },
];
