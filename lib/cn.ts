import clsx, { type ClassValue } from "clsx";

/**
 * Class-name helper. Thin wrapper over clsx so every component composes
 * conditional classes the same way. (No tailwind-merge — our component
 * variants are written to not produce conflicting utility classes.)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
