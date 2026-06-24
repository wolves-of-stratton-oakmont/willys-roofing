import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "default" | "muted" | "slate" | "copper";

type SectionProps = {
  children: React.ReactNode;
  /** Background tone. "slate"/"copper" are dark/accent bands. */
  tone?: Tone;
  /** Vertical padding scale. */
  spacing?: "sm" | "md" | "lg";
  /** Constrain inner content with a Container (default true). */
  contained?: boolean;
  /** Container width when contained. */
  width?: "prose" | "site" | "wide";
  id?: string;
  className?: string;
  /** Inner container className. */
  innerClassName?: string;
  as?: React.ElementType;
};

/**
 * Vertical section primitive — owns section background + vertical rhythm.
 * Section owns the y-padding; Container owns the x-padding. They never both
 * set the same axis, so specificity never collides.
 */
const toneClass: Record<Tone, string> = {
  default: "bg-[var(--color-chalk-100)] text-[var(--color-ink)]",
  muted: "bg-[var(--color-chalk-200)] text-[var(--color-ink)]",
  slate: "bg-[var(--color-slate-800)] text-[var(--color-chalk-100)]",
  copper: "bg-[var(--color-copper-500)] text-white",
};

const spacingClass = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
} as const;

export function Section({
  children,
  tone = "default",
  spacing = "md",
  contained = true,
  width = "site",
  id,
  className,
  innerClassName,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(toneClass[tone], spacingClass[spacing], className)}
    >
      {contained ? (
        <Container width={width} className={innerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Tag>
  );
}
