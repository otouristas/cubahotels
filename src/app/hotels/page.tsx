import type { Metadata } from "next";
import { HotelCard } from "@/components/HotelCard";
import { JsonLd } from "@/components/JsonLd";
import { getHotels, getStats } from "@/lib/hotels";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cuba Hotel Directory",
  description:
    "Browse published Cuba hotels by destination, group, and 2026 SEO priority — including renamed former Meliá, Tryp, Sol, and Iberostar properties.",
  path: "/hotels",
});

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; priority?: string }>;
}) {
  const params = await searchParams;
  const hotels = await getHotels({
    query: params.q,
    priority: params.priority ? [params.priority] : undefined,
  });
  const stats = getStats();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cuba Hotels directory",
    numberOfItems: hotels.length,
    itemListElement: hotels.slice(0, 50).map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/hotels/${h.slug}`),
      name: h.name,
    })),
  };

  return (
    <div className="surface-grid pt-28">
      <JsonLd data={itemList} />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">
          Directory
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
          Cuba hotels
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          {hotels.length} published listings from {stats.hotels} properties in the master
          inventory. Backlog and low-confidence rows stay offline until verified.
        </p>

        <form className="mt-8 flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={params.q || ""}
            placeholder="Filter by hotel, former name, destination…"
            className="min-w-[240px] flex-1 rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sea/30"
          />
          <select
            name="priority"
            defaultValue={params.priority || ""}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm"
          >
            <option value="">All priorities</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          <button type="submit" className="btn-sun px-5 py-3 text-sm">
            Filter
          </button>
        </form>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
