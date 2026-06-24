import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Stretch to fill the container width. */
  block?: boolean;
  className?: string;
};

/**
 * Button / CTA — the site's primary action primitive.
 *
 * • Renders an <a> (via next/link) when `href` is provided, else a <button>.
 * • Variants: primary = copper (the one bold action colour); secondary = slate;
 *   outline = bordered; ghost = quiet text; onDark = for use on slate bands.
 * • Focus ring and reduced-motion are inherited from globals.css.
 *
 * Builders: prefer this over hand-rolled links so every CTA looks identical.
 */
const base =
  "group inline-flex items-center justify-center gap-2 font-semibold tracking-tight " +
  "rounded-[var(--radius-sm)] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] " +
  "select-none whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-55";

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base sm:text-lg",
};

const variantClass: Record<Variant, string> = {
  // Copper — the single boldest action on the page.
  primary:
    "bg-[var(--color-copper-500)] text-white shadow-[var(--shadow-copper)] " +
    "hover:bg-[var(--color-copper-600)] hover:-translate-y-0.5 active:translate-y-0",
  // Slate — strong but secondary.
  secondary:
    "bg-[var(--color-slate-700)] text-white shadow-[var(--shadow-sm)] " +
    "hover:bg-[var(--color-slate-800)] hover:-translate-y-0.5 active:translate-y-0",
  // Outline — bordered, for lower-emphasis actions on light backgrounds.
  outline:
    "border border-[var(--color-slate-300)] bg-transparent text-[var(--color-slate-700)] " +
    "hover:border-[var(--color-slate-700)] hover:bg-[var(--color-slate-800)]/[0.04]",
  // Ghost — quiet text action.
  ghost:
    "bg-transparent text-[var(--color-slate-700)] hover:bg-[var(--color-slate-800)]/[0.06]",
  // On dark slate bands — light fill with copper-leaning hover.
  onDark:
    "bg-[var(--color-chalk-50)] text-[var(--color-slate-800)] " +
    "hover:bg-white hover:-translate-y-0.5 active:translate-y-0",
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** External links open in a new tab with safe rel. */
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    block = false,
    className,
  } = props;

  const classes = cn(
    base,
    sizeClass[size],
    variantClass[variant],
    block && "w-full",
    className,
  );

  // Link mode — strip style-only props so only valid <a> attributes remain.
  if (props.href !== undefined) {
    const {
      href,
      external,
      children: _children,
      variant: _variant,
      size: _size,
      block: _block,
      className: _className,
      ...rest
    } = props;
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </Link>
    );
  }

  // Button mode.
  const {
    children: _children,
    variant: _variant,
    size: _size,
    block: _block,
    className: _className,
    ...rest
  } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
