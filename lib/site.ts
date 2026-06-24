/**
 * Site-wide constants for Willy's Roofing.
 * Single source of truth for company facts, contact details, and navigation.
 *
 * OWNER NOTE: Items marked "EDIT BEFORE LAUNCH" are honest placeholders the
 * business owner should confirm or replace (email, social handles, hours).
 * The phone number is REAL and is used for click-to-call everywhere.
 */

export const site = {
  name: "Willy's Roofing",
  shortName: "Willy's Roofing",
  legalName: "Willy's Roofing",
  tagline: "Roofing done right, the first time.",
  /** One-line description used for SEO + OpenGraph defaults. */
  description:
    "Willy's Roofing is a locally owned roofing company serving GTA, Hamilton and the Niagara region. Asphalt shingle replacement, repairs, flat roofing, eavestrough and emergency roof service — licensed, insured and backed by a written workmanship warranty. Free, no-obligation estimates.",

  // --- Contact -----------------------------------------------------------
  phone: {
    display: "416-414-8452", // REAL number — do not change.
    href: "tel:+14164148452",
    e164: "+14164148452",
  },
  /** EDIT BEFORE LAUNCH — placeholder inbox until the owner provides one. */
  email: {
    display: "info@willysroofing.ca",
    href: "mailto:info@willysroofing.ca",
  },

  // --- Location / service region ----------------------------------------
  // No fabricated street address. We present a service region, not a storefront.
  primaryCity: "GTA",
  region: "Ontario",
  regionShort: "ON",
  country: "Canada",
  /** Used in copy like "the {serviceRegion}". */
  serviceRegion: "Greater Hamilton & Niagara region",
  geo: {
    // GTA, ON — used for LocalBusiness structured data only.
    latitude: 43.2168,
    longitude: -79.7624,
  },

  // --- Hours (EDIT BEFORE LAUNCH — typical local-trade hours) -----------
  hours: [
    { day: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
    { day: "Saturday", time: "8:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ] as ReadonlyArray<{ day: string; time: string }>,
  /** Shown near the phone CTA. */
  emergencyNote: "24/7 emergency tarping & leak response",

  // --- Social (EDIT BEFORE LAUNCH — placeholders) -----------------------
  social: {
    facebook: "https://facebook.com/willysroofing",
    instagram: "https://instagram.com/willysroofing",
    google: "https://www.google.com/search?q=Above+All+Roofing+Stoney+Creek",
  } as Record<string, string>,

  // --- SEO ---------------------------------------------------------------
  // Used as metadataBase. EDIT BEFORE LAUNCH to the real production domain.
  url: "https://www.willysroofing.ca",
  ogImage: "/images/og/willys-roofing-og.jpg",
} as const;

/** Primary navigation — consumed by Header and Footer. */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
] as const;

/** Secondary/legal links for the footer. */
export const footerLegalLinks = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export type NavLink = (typeof navLinks)[number];
