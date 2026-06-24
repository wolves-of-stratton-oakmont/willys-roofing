import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";

/**
 * sitemap.xml — every indexable URL on the site.
 *
 * Coverage: the 9 top-level routes + one URL per service slug (7), built from
 * lib/services so the sitemap can never drift from the real service list.
 * Absolute URLs are derived from site.url (the production domain / metadataBase).
 *
 * Priorities are relative hints, not promises: home highest, then the primary
 * conversion + service pages, then supporting pages.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  // Top-level routes with intentional priority/frequency hints.
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
    { path: "/service-areas", priority: 0.7, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.6, changeFrequency: "yearly" },
  ];

  const topLevel: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // One entry per service detail page (/services/[slug]).
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...topLevel, ...servicePages];
}
