import {
  // service icons
  Home,
  Wrench,
  SquareStack,
  Waves,
  PanelTop,
  Wind,
  ShieldAlert,
  // process icons
  Search,
  FileText,
  CalendarCheck,
  Hammer,
  ShieldCheck,
  // trust icons
  BadgeCheck,
  ScrollText,
  ClipboardCheck,
  MapPin,
  // common UI icons used by builders
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronDown,
  Clock,
  Quote,
} from "lucide-react";

/**
 * A glyph component shares lucide's render contract: it accepts size,
 * strokeWidth, className and aria-hidden. Both lucide icons and our inline
 * brand SVGs below conform to it.
 */
type GlyphProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
};
type Glyph = React.ComponentType<GlyphProps>;

/**
 * Brand icons (Facebook, Instagram) are no longer shipped by lucide-react,
 * so we provide small inline SVGs that match the lucide stroke style.
 */
function FacebookIcon({ size = 24, strokeWidth = 1.75, ...rest }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 24, strokeWidth = 1.75, ...rest }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Central icon registry. Data files (services, process, trust) store icon
 * names as strings; render them through this map so the set is consistent
 * and tree-shaken. Add new icons here if a data field needs one.
 */
export const icons: Record<string, Glyph> = {
  Home,
  Wrench,
  SquareStack,
  Waves,
  PanelTop,
  Wind,
  ShieldAlert,
  Search,
  FileText,
  CalendarCheck,
  Hammer,
  ShieldCheck,
  BadgeCheck,
  ScrollText,
  ClipboardCheck,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronDown,
  Clock,
  Quote,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};

export type IconName = keyof typeof icons;

export type IconProps = {
  /** Name of a registered lucide icon. Falls back to a neutral square. */
  name: string;
  className?: string;
  /** Pixel size; lucide default is 24. */
  size?: number;
  /** Stroke width; our design uses a slightly lighter 1.75 by default. */
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};

/**
 * <Icon name="Home" /> — renders a registered lucide icon by string name.
 * Decorative by default (aria-hidden); pass aria-hidden={false} + a label
 * upstream if the icon is meaningful on its own.
 */
export function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 1.75,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  const Cmp = icons[name] ?? SquareStack;
  return (
    <Cmp
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={ariaHidden}
    />
  );
}
