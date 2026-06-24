"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { galleryItems, type GalleryItem } from "./galleryItems";

/**
 * GalleryGrid — the visual centrepiece.
 *
 * An editorial, deliberately-sized layout (a few feature tiles among standard
 * ones) rather than a uniform stock grid. Each tile is a real <figure> with a
 * visible, honest caption (work + roof type + area) — captions stay on the page
 * for honesty and accessibility, not hover-only.
 *
 * Clicking/Enter opens an accessible lightbox: role="dialog" + aria-modal, a
 * focus trap, Escape to close, ←/→ to move between projects, and focus returns
 * to the originating tile on close. Motion is handled by globals.css, which
 * already honours prefers-reduced-motion.
 */

// Editorial emphasis (desktop). Column-span only — no row-spans — so the grid
// is robust across breakpoints; rhythm comes from varied column width + aspect.
// Mobile stays single-column for legibility.
const spanClass: Record<NonNullable<GalleryItem["span"]>, string> = {
  feature: "sm:col-span-2",
  wide: "sm:col-span-2",
  tall: "",
  regular: "",
};

const aspectClass: Record<NonNullable<GalleryItem["span"]>, string> = {
  feature: "aspect-[16/10]",
  wide: "aspect-[16/9]",
  tall: "aspect-[4/5]",
  regular: "aspect-[4/3]",
};

export function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Remember which tile opened the lightbox so focus can return to it.
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // Last index that was open, tracked outside render so we can restore focus
  // to the correct tile after the lightbox closes (index follows arrow nav).
  const lastOpenRef = useRef<number | null>(null);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + galleryItems.length) % galleryItems.length,
      ),
    [],
  );

  // Focus management: remember the open tile while open; when the lightbox
  // closes (openIndex → null), return focus to the tile it was opened from.
  useEffect(() => {
    if (openIndex !== null) {
      lastOpenRef.current = openIndex;
    } else if (lastOpenRef.current !== null) {
      triggerRefs.current[lastOpenRef.current]?.focus();
      lastOpenRef.current = null;
    }
  }, [openIndex]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {galleryItems.map((item, i) => {
          const span = item.span ?? "regular";
          return (
            <Reveal
              as="li"
              key={item.src}
              delay={(i % 3) * 80}
              className={cn("min-w-0", spanClass[span])}
            >
              <figure className="group relative h-full">
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[i] = el;
                  }}
                  onClick={() => open(i)}
                  aria-label={`View larger: ${item.caption} (${item.area})`}
                  className={cn(
                    "relative block w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-100)] shadow-[var(--shadow-sm)] transition-shadow duration-[var(--dur-mid)] hover:shadow-[var(--shadow-md)]",
                    aspectClass[span],
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      span === "feature" || span === "wide"
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  {/* readability scrim for the tag chip + expand affordance */}
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-slate-900)]/55 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center rounded-[var(--radius-xs)] bg-[var(--color-slate-900)]/70 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--color-chalk-50)] backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span
                    className="pointer-events-none absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-chalk-50)]/90 text-[var(--color-slate-800)] opacity-0 transition-opacity duration-[var(--dur-fast)] group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Icon name="ArrowUpRight" size={16} />
                  </span>
                </button>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="text-sm leading-snug text-[var(--color-slate-600)]">
                    {item.caption}
                  </span>
                  <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-slate-400)]">
                    {item.area}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </ul>

      {openIndex !== null ? (
        <Lightbox index={openIndex} onClose={close} onStep={step} />
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------------- */

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const item = galleryItems[index];
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Lock body scroll while open; restore on close. (Focus return to the
  // originating tile is handled by the parent, keyed on openIndex.)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Move initial focus into the dialog on open.
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Keyboard: Escape closes, arrows navigate, Tab is trapped to the dialog.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onStep(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onStep(-1);
      } else if (e.key === "Tab") {
        const root = panelRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // The lightbox only mounts in response to a client click, but guard the
  // portal target so this is safe under any server render too.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Project photo: ${item.caption}`}
    >
      {/* backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[var(--color-slate-900)]/85 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        className="relative z-[1] flex w-full max-w-5xl flex-col"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-slate-800)] shadow-[var(--shadow-lg)]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
          />
        </div>

        {/* caption + controls bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[var(--color-chalk-100)]">
          <div className="min-w-0">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-copper-300)]">
              {item.tag} · {item.area}
            </p>
            <p className="mt-1 text-sm text-[var(--color-slate-200)]">
              {item.caption}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="mr-1 font-mono text-xs tabular-nums text-[var(--color-slate-400)]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
            </span>
            <LightboxButton label="Previous project" onClick={() => onStep(-1)}>
              <Icon name="ChevronRight" size={20} className="rotate-180" />
            </LightboxButton>
            <LightboxButton label="Next project" onClick={() => onStep(1)}>
              <Icon name="ChevronRight" size={20} />
            </LightboxButton>
            <LightboxButton ref={closeBtnRef} label="Close" onClick={onClose}>
              <Icon name="X" size={20} />
            </LightboxButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function LightboxButton({
  ref,
  label,
  onClick,
  children,
}: {
  ref?: React.Ref<HTMLButtonElement>;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-white/15 bg-white/5 text-[var(--color-chalk-50)] transition-colors duration-[var(--dur-fast)] hover:border-white/30 hover:bg-white/10"
    >
      {children}
    </button>
  );
}
