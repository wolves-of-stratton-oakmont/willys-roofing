"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import type { Faq } from "@/lib/faqs";

/**
 * FaqAccordion — an accessible disclosure list for one FAQ category.
 *
 * Each row is a real <button aria-expanded aria-controls> that toggles a
 * region panel (id-linked). Items open/close independently so a visitor can
 * compare answers. The open/close height + chevron transitions are CSS-only,
 * so they're already covered by the global prefers-reduced-motion contract.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  // Track open rows by index within this category.
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const baseId = useId();

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className="divide-y divide-[var(--color-slate-100)] border-y border-[var(--color-slate-100)]">
      {items.map((faq, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={faq.question}>
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    "flex-1 font-display text-lg font-extrabold tracking-tight transition-colors duration-[var(--dur-fast)] sm:text-xl",
                    isOpen
                      ? "text-[var(--color-copper-600)]"
                      : "text-[var(--color-slate-800)] group-hover:text-[var(--color-copper-600)]",
                  )}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-soft)]",
                    isOpen
                      ? "rotate-180 border-[var(--color-copper-500)] bg-[var(--color-copper-500)] text-white"
                      : "border-[var(--color-slate-200)] text-[var(--color-slate-500)] group-hover:border-[var(--color-slate-300)]",
                  )}
                >
                  <Icon name="ChevronDown" size={18} />
                </span>
              </button>
            </h3>

            {/* Panel: `hidden` removes the closed answer from the a11y tree and
                the tab order entirely (no half-open trap). The chevron carries
                the motion; the answer reveals instantly, which is the most
                accessible behaviour for a disclosure. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-prose pr-12 leading-relaxed text-[var(--color-slate-600)]">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
