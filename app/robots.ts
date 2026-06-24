import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt — let search engines crawl the whole public site and point them at
 * the sitemap. We disallow /api/ (the contact endpoint is a POST action, not a
 * page worth indexing). The sitemap + host use the production domain (site.url).
 */

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
