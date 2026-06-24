import { cn } from "@/lib/cn";

/**
 * Willy's Roofing — brand lockup.
 *
 * The mark is an asphalt-shingle gable seen in three-quarter view, built from
 * stacked, ascending "courses": a copper ridge cap (the part that sits ABOVE
 * ALL) over three weathered-slate courses, finished with an overhanging eave
 * board. The off-centre ridge reads as a real pitched roof rather than a
 * symmetrical pyramid, and the copper cap echoes the site's copper "course
 * rule" signature. Geometry matches /public/logo*.svg and /app/icon.svg.
 *
 * The wordmark is live text — Archivo (display) for "ABOVE ALL" and IBM Plex
 * Mono for the spaced "ROOFING" label — so it inherits the loaded brand fonts
 * and stays crisp at every size.
 *
 * API preserved from the Wave-1 placeholder so Header/Footer keep rendering:
 *   variant : "onLight" | "onDark"  — colour treatment for the surface
 *   full    : boolean               — show the "ROOFING" label (false = compact)
 *   className                       — forwarded to the root span
 *
 * Rendered aria-hidden (decorative): Header wraps it in a labelled home link,
 * so the surrounding context already announces the brand.
 */

type LogoProps = {
  /** Colour treatment for the surface it sits on. */
  variant?: "onLight" | "onDark";
  /** Show the full lockup (with the "Roofing" label) vs. a compact lockup. */
  full?: boolean;
  className?: string;
};

export function Logo({
  variant = "onLight",
  full = true,
  className,
}: LogoProps) {
  const onDark = variant === "onDark";

  // Course colours flip per surface so the gable always reads with contrast;
  // the copper ridge cap is constant — it is the one bold note.
  const courseOuter = onDark ? "#C8D5DE" : "#28384A"; // slate-700 / light slate
  const courseMid = onDark ? "#96A8B8" : "#3A4D61"; // slate-600 mid course
  const courseInner = onDark ? "#E0E9EF" : "#28384A";
  const copperCap = "#C26B2C"; // copper-500 — the ridge cap

  const wordColour = onDark
    ? "text-[var(--color-chalk-50)]"
    : "text-[var(--color-slate-800)]";
  const labelColour = onDark
    ? "text-[var(--color-copper-300)]" // copper-300 reads better on slate
    : "text-[var(--color-copper-600)]";

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-hidden="true"
    >
      {/* The gable mark — stacked courses with a copper ridge cap. */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 48 48"
        fill="none"
        className="shrink-0"
        focusable="false"
      >
        {/* weathered-slate courses, eave → ridge */}
        <path d="M7.41 29.8 L38.8 29.8 L42 33 L6 33 Z" fill={courseOuter} />
        <path d="M10.49 22.8 L31.8 22.8 L38 29 L7.76 29 Z" fill={courseMid} />
        <path d="M13.57 15.8 L24.8 15.8 L31 22 L10.84 22 Z" fill={courseInner} />
        {/* copper ridge cap — "above all" */}
        <path d="M15.6 8 L18.4 8 L24 15 L13.92 15 Z" fill={copperCap} />
        {/* overhanging eave board */}
        <rect x="4" y="33.7" width="40" height="3" rx="0.6" fill={courseOuter} />
      </svg>

      {/* Wordmark — live Archivo + IBM Plex Mono so it inherits brand fonts. */}
      <span className="inline-flex flex-col leading-[0.95]">
        <span
          className={cn(
            "font-display text-[1.32rem] font-extrabold uppercase tracking-[-0.02em]",
            wordColour,
          )}
        >
          Above All
        </span>
        {full ? (
          <span
            className={cn(
              "font-mono text-[0.62rem] font-medium uppercase tracking-[0.38em]",
              labelColour,
            )}
          >
            Roofing
          </span>
        ) : null}
      </span>
    </span>
  );
}
