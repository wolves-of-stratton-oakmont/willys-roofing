import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  /** Max-width preset. Default "site" = 1200px. */
  width?: "prose" | "site" | "wide";
  className?: string;
  as?: React.ElementType;
};

const widthClass = {
  prose: "max-w-[var(--container-prose)]",
  site: "max-w-[var(--container-site)]",
  wide: "max-w-[var(--container-wide)]",
} as const;

/**
 * Centred, padded content container. The single horizontal-rhythm authority —
 * use this instead of ad-hoc max-width/padding so every section lines up.
 */
export function Container({
  children,
  width = "site",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        widthClass[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
