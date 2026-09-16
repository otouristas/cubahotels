import type { Metadata } from "next";
import { DestinationCard } from "@/components/DestinationCard";
import { JsonLd } from "@/components/JsonLd";
import { getDestinations } from "@/lib/hotels";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cuba Destinations",
  description:
    "Explore Cuba hotel destinations: Havana, Varadero, Cayo Coco, Cayo Santa María, Holguín, Trinidad, Santiago de Cuba, and more GEO pages.",
  path: "/destinations",
});

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  const featured = destinations.filter((d) => d.featured);
  const rest = destinations.filter((d) => !d.featured);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cuba hotel destinations",
    itemListElement: destinations.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      url: absoluteUrl(`/destinations/${d.slug}`),
    })),
  };

  return (
    <div className="surface-grid pt-28">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">
          GEO destinations
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
          Where to stay in Cuba
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Destination hubs answer “where should I stay?” with hotel counts, regions, and
          internal links for travelers and AI answer surfaces.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">Featured</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <DestinationCard key={d.slug} destination={d} tall />
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          All destinations
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
