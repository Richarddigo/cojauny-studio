import type { MetadataRoute } from "next";

const BASE_URL = "https://studio.cojauny.com";
const locales = ["en", "es", "de", "fr"] as const;

const routes = [
  "",
  "/projects",
  "/services",
  "/contact",
  "/legal/impressum",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/terms",
  "/legal/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "monthly" : "yearly",
        priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
