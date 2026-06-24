/**
 * schema.org structured-data builders for Willy's Roofing.
 *
 * HONESTY: every field is backed by real data from lib/site / lib/services /
 * lib/serviceAreas. No fabricated street address (we expose a service region +
 * the primary city only), no invented prices, ratings, award or founding-year.
 * Hours come from site.hours (owner-confirmable placeholders, same as the UI).
 *
 * Consumed via <JsonLd data={...} /> on the home page (LocalBusiness) and each
 * /services/[slug] page (Service). The site's stable @id lets the Service nodes
 * reference the business as their provider.
 */

import { site } from "@/lib/site";
import { serviceAreaNames } from "@/lib/serviceAreas";
import type { Service } from "@/lib/services";

const BASE = site.url.replace(/\/$/, "");
/** Stable identifier for the business node, reused as the provider reference. */
const ORG_ID = `${BASE}/#organization`;

/** Map "Monday – Friday" style labels to schema.org day tokens. */
const DAY_TOKENS: Record<string, string[]> = {
  monday: ["Monday"],
  tuesday: ["Tuesday"],
  wednesday: ["Wednesday"],
  thursday: ["Thursday"],
  friday: ["Friday"],
  saturday: ["Saturday"],
  sunday: ["Sunday"],
};

/**
 * Turn site.hours into schema.org OpeningHoursSpecification entries.
 * Skips "Closed" days. Parses "7:00 AM – 6:00 PM" into 24h opens/closes.
 * Defensive: if a row doesn't parse, it's omitted rather than emitting garbage.
 */
function openingHours() {
  const spec: Array<Record<string, unknown>> = [];

  for (const { day, time } of site.hours) {
    if (/closed/i.test(time)) continue;

    const days = expandDays(day);
    if (days.length === 0) continue;

    const range = parseTimeRange(time);
    if (!range) continue;

    spec.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens: range.opens,
      closes: range.closes,
    });
  }

  return spec;
}

/** "Monday – Friday" → [Mon..Fri]; "Saturday" → [Sat]. */
function expandDays(label: string): string[] {
  const order = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const parts = label.toLowerCase().split(/[–-]/).map((p) => p.trim());

  if (parts.length === 2) {
    const start = order.indexOf(firstDayKey(parts[0]));
    const end = order.indexOf(firstDayKey(parts[1]));
    if (start !== -1 && end !== -1 && end >= start) {
      return order.slice(start, end + 1).flatMap((k) => DAY_TOKENS[k]);
    }
  }
  const single = firstDayKey(parts[0]);
  return DAY_TOKENS[single] ?? [];
}

function firstDayKey(s: string): string {
  return Object.keys(DAY_TOKENS).find((k) => s.startsWith(k.slice(0, 3))) ?? "";
}

/** "7:00 AM – 6:00 PM" → { opens: "07:00", closes: "18:00" }. */
function parseTimeRange(time: string): { opens: string; closes: string } | null {
  const m = time.match(
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i,
  );
  if (!m) return null;
  const to24 = (h: string, min: string | undefined, mer: string) => {
    let hour = parseInt(h, 10) % 12;
    if (/pm/i.test(mer)) hour += 12;
    return `${String(hour).padStart(2, "0")}:${(min ?? "00").padStart(2, "0")}`;
  };
  return {
    opens: to24(m[1], m[2], m[3]),
    closes: to24(m[4], m[5], m[6]),
  };
}

/**
 * RoofingContractor (a LocalBusiness subtype) for the home page.
 * areaServed lists the real towns; address carries region + city only.
 */
export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: BASE,
    logo: `${BASE}/logo.svg`,
    image: `${BASE}${site.ogImage}`,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email.display,
    address: {
      "@type": "PostalAddress",
      // No fabricated street address — region + city are honest.
      addressLocality: site.primaryCity,
      addressRegion: site.regionShort,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: serviceAreaNames.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: openingHours(),
    sameAs: Object.values(site.social),
  };
}

/**
 * Service schema for a single /services/[slug] page. References the business as
 * provider via its @id; areaServed mirrors the business's coverage.
 */
export function serviceSchema(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription,
    url: `${BASE}/services/${service.slug}`,
    image: `${BASE}${service.heroImage}`,
    category: "Roofing",
    provider: {
      "@type": "RoofingContractor",
      "@id": ORG_ID,
      name: site.name,
      telephone: site.phone.e164,
      url: BASE,
    },
    areaServed: serviceAreaNames.map((name) => ({
      "@type": "City",
      name,
    })),
  };
}
