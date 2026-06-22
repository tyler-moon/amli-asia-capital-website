import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://capital.amli.group/",
      lastModified: new Date("2026-06-11"),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
