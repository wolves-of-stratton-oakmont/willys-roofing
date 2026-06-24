"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";
import { site, navLinks } from "@/lib/site";

/**
 * Site header — sticky, responsive.
 *
 * Structure:
 *   [utility bar]  service region · emergency note · phone (desktop)
 *   [main bar]     logo · primary nav · phone CTA / "Free estimate"
 *   [mobile menu]  full-screen slide-down with nav + phone CTA
 *
 * The phone number is the most important conversion element — it is present
 * and tappable at every breakpoint. Click-to-call uses site.phone.href.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle elevation once the user scrolls past the hero top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change + lock body scroll while open.
  // Deferred to a microtask so it isn't a synchronous in-effect setState.
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — hidden on small screens to save vertical space. */}
      <div className="hidden bg-[var(--color-slate-900)] text-[var(--color-slate-200)] lg:block">
        <div className="container-site flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono uppercase tracking-[0.18em]">
            <Icon name="MapPin" size={14} className="text-[var(--color-copper-300)]" />
            <span>Serving {site.serviceRegion}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Icon name="ShieldCheck" size={14} className="text-[var(--color-copper-300)]" />
              {site.emergencyNote}
            </span>
            <a
              href={site.phone.href}
              className="flex items-center gap-2 font-semibold text-[var(--color-chalk-50)] transition-colors hover:text-[var(--color-copper-300)]"
            >
              <Icon name="Phone" size={14} />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-[var(--color-slate-100)] bg-[var(--color-chalk-50)]/95 shadow-[var(--shadow-sm)] backdrop-blur"
            : "border-transparent bg-[var(--color-chalk-50)]",
        )}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 py-3">
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 xl:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-[var(--color-copper-600)]"
                    : "text-[var(--color-slate-600)] hover:text-[var(--color-slate-900)]",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--color-copper-500)]" />
                ) : null}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-bold text-[var(--color-slate-800)] transition-colors hover:text-[var(--color-copper-600)] sm:flex xl:hidden"
            >
              <Icon name="Phone" size={16} className="text-[var(--color-copper-500)]" />
              {site.phone.display}
            </a>
            <Button href="/contact" size="md" className="hidden sm:inline-flex">
              Free estimate
            </Button>
            {/* Phone-only compact call button */}
            <a
              href={site.phone.href}
              aria-label={`Call ${site.name} at ${site.phone.display}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-copper-500)] text-white shadow-[var(--shadow-copper)] sm:hidden"
            >
              <Icon name="Phone" size={18} />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-slate-200)] text-[var(--color-slate-700)] xl:hidden"
            >
              <Icon name={open ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-b border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] xl:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "flex items-center justify-between border-b border-[var(--color-slate-100)] py-3.5 text-base font-semibold",
                isActive(link.href)
                  ? "text-[var(--color-copper-600)]"
                  : "text-[var(--color-slate-700)]",
              )}
            >
              {link.label}
              <Icon name="ChevronRight" size={18} className="text-[var(--color-slate-300)]" />
            </Link>
          ))}

          <div className="mt-5 flex flex-col gap-3">
            <Button href={site.phone.href} size="lg" block>
              <Icon name="Phone" size={18} />
              Call {site.phone.display}
            </Button>
            <Button href="/contact" variant="outline" size="lg" block>
              Request a free estimate
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
