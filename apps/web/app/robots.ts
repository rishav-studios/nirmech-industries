import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nirmech.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemaps.xml`,
    ],
    host: baseUrl,
  };
}


