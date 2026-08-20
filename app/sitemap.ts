import type { MetadataRoute } from "next";

import { articles, projects, site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/studio", "/services", "/journal", "/careers", "/contact", "/privacy", "/terms"];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("monthly" as const) : ("yearly" as const),
      priority: route === "" ? 1 : route === "/work" ? 0.9 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/journal/${article.slug}`,
      lastModified: new Date(article.dateIso),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
  ];
}
