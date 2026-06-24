import { cn } from "@/lib/cn";

/**
 * Eyebrow — the spec-sheet label with the signature copper "course-tick"
 * lead-in (styled by the `.eyebrow` class in globals.css). Use above section
 * headings. On dark tones, pass tone="onDark" to lift the colour.
 */
export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "onDark" && "text-[var(--color-copper-300)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  /** Optional supporting paragraph beneath the title. */
  intro?: React.ReactNode;
  /** Text alignment. */
  align?: "left" | "center";
  /** Colour treatment for dark backgrounds. */
  tone?: "default" | "onDark";
  /** Heading level for correct document outline. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  /** Constrain intro/title width for readability when centered. */
  maxWidth?: boolean;
  className?: string;
};

/**
 * Standard section header: eyebrow + heading + optional intro.
 * Used across every page for consistent typographic rhythm.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
  as: Heading = "h2",
  maxWidth = true,
  className,
}: SectionHeaderProps) {
  const onDark = tone === "onDark";
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        align === "center" && maxWidth && "mx-auto",
        maxWidth && "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={onDark ? "onDark" : "default"}
          className={align === "center" ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        className={cn(
          "mt-4 text-balance text-3xl sm:text-4xl",
          onDark ? "text-[var(--color-chalk-50)]" : "text-[var(--color-slate-800)]",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            onDark
              ? "text-[var(--color-slate-200)]"
              : "text-[var(--color-slate-500)]",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
