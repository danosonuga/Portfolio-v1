import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls = Object.keys(caseStudies).map((slug) => ({
    url: `https://danosonuga.vercel.app/work/${slug}`,
    lastModified: new Date(),
    priority: 0.8 as const,
  }));

  return [
    {
      url: "https://danosonuga.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
    ...caseStudyUrls,
  ];
}
