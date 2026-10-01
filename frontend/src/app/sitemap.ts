import type { MetadataRoute } from "next";
import { SERVICES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
