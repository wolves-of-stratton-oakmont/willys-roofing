"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger delay in ms (applied as a transition-delay). */
  delay?: number;
  /** Render element tag. */
  as?: React.ElementType;
  className?: string;
  /** Only animate the first time it enters the viewport (default true). */
  once?: boolean;
};

/**
 * Reveal — scroll-triggered fade-and-rise wrapper.
 *
 * The actual transition lives in globals.css under `[data-reveal]`, which also
 * carries the `prefers-reduced-motion` fallback (instantly visible, no motion).
 * This component just flips `data-revealed` when the element scrolls into view.
 *
 * Keep usage restrained — reveal section blocks and cards, not every element.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Lazy initial state: SSR renders hidden; on the client, reduced-motion
  // users start revealed so the effect never needs a synchronous setState.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show immediately, skip the observer.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      // Defer to a microtask so this isn't a synchronous in-effect setState.
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-reveal=""
      data-revealed={revealed ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
