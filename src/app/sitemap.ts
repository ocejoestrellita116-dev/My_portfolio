import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site-content";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-03-13T00:00:00.000Z");

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...siteContent.caseStudies.map((caseStudy) => ({
      url: absoluteUrl(`/cases/${caseStudy.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
