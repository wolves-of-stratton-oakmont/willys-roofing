/**
 * Honest, editable trust signals for Willy's Roofing.
 *
 * IMPORTANT (honesty): No fabricated numbers — no invented "years in business",
 * award names, certification logos, or review counts. Everything here is a
 * claim a small, legitimate, licensed roofer can stand behind. If the owner
 * later confirms specifics (e.g. an exact founding year, a manufacturer
 * certification, a real Google rating), those can be added then.
 *
 * `icon` is a lucide-react icon name.
 */

export type TrustSignal = {
  title: string;
  description: string;
  icon: string;
};

/** Primary "why choose us" pillars. */
export const trustSignals: TrustSignal[] = [
  {
    title: "Licensed & fully insured",
    description:
      "We carry liability insurance and WSIB coverage, so you're never exposed to risk for work happening on your property.",
    icon: "BadgeCheck",
  },
  {
    title: "Written workmanship warranty",
    description:
      "Our labour is guaranteed in writing, on top of the manufacturer's material warranty registered in your name.",
    icon: "ScrollText",
  },
  {
    title: "Free, no-obligation estimates",
    description:
      "We get on the roof, assess the real condition, and give you an honest, itemized quote — at no cost and no pressure.",
    icon: "ClipboardCheck",
  },
  {
    title: "Locally owned & operated",
    description:
      "We live and work in the Hamilton–Niagara region. We're accountable to our neighbours, and we stand behind every roof.",
    icon: "MapPin",
  },
];

/**
 * Compact promise/strip items (used in the hero trust bar and CTA bands).
 * Short labels only — these reinforce, they don't make new claims.
 */
export const trustBadges: ReadonlyArray<{ label: string; icon: string }> = [
  { label: "Licensed & insured", icon: "BadgeCheck" },
  { label: "Free estimates", icon: "ClipboardCheck" },
  { label: "Workmanship warranty", icon: "ShieldCheck" },
  { label: "Locally owned", icon: "MapPin" },
];

/**
 * Honest "by the numbers" style stats. These avoid fabricated counts:
 * they are commitments and ranges, not invented totals. Builders should
 * render `value` large (display/mono) with `label` beneath.
 *
 * OWNER NOTE: replace any of these with verified figures once available
 * (for example a real number of completed roofs, or a Google star rating).
 */
export const honestStats: ReadonlyArray<{
  value: string;
  label: string;
}> = [
  { value: "24/7", label: "Emergency leak response" },
  { value: "Free", label: "No-obligation roof estimates" },
  { value: "100%", label: "Magnetic nail sweep on every job" },
  { value: "Written", label: "Workmanship warranty, every roof" },
];
