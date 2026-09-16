import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { getDestinations, getHotels } from "@/lib/hotels";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [hotels, destinations] = await Promise.all([
    getHotels({ publishedOnly: true }),
    getDestinations(),
  ]);

  const staticRoutes = [
    "",
    "/hotels",
    "/destinations",
    "/search",
    "/guides",
    "/faq",
    "/about",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...destinations.map((d) => ({
      url: absoluteUrl(`/destinations/${d.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: d.featured ? 0.85 : 0.65,
    })),
    ...hotels.map((h) => ({
      url: absoluteUrl(`/hotels/${h.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: h.seoPriority === "P1" ? 0.9 : 0.6,
    })),
    ...guides.map((g) => ({
      url: absoluteUrl(`/guides/${g.slug}`),
      lastModified: new Date(g.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
