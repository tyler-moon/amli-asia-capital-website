import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Public launch approved 2026-07-08 — indexable.
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    }
  };
}
