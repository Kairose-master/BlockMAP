import type { MetadataRoute } from "next";
import { COINS, PLACES } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/coin`, priority: 0.9, changeFrequency: "weekly" },
    ...COINS.map((c) => ({ url: `${SITE_URL}/coin/${c.symbol.toLowerCase()}`, priority: 0.8, changeFrequency: "weekly" as const })),
    ...PLACES.map((p) => ({ url: `${SITE_URL}/place/${p.id}`, priority: 0.6, changeFrequency: "monthly" as const })),
  ];
}
