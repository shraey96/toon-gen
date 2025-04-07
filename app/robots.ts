import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/app",
          "/how-it-works",
          "/features",
          "/styles",
          "/privacy",
          "/terms",
        ],
        disallow: [
          "/app/", // Disallow sub-routes of /app
          "/api/",
          "/_next/",
          "/static/",
        ],
        crawlDelay: 10,
      },
    ],
    sitemap: "https://zappytoon.com/sitemap.xml",
  };
}
