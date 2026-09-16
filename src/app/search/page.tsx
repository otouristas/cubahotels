import { HotelCard } from "@/components/HotelCard";
import { SearchWidget } from "@/components/SearchWidget";
import { getHotels } from "@/lib/hotels";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Search Cuba Hotels",
  description:
    "Search Cuba hotels by destination, current name, or former brand name. Availability API coming soon.",
  path: "/search",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}) {
  const params = await searchParams;
  const hotels = await getHotels({ query: params.q, limit: 24 });

  return (
    <div className="surface-grid pt-28">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Search stays
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Find hotels by place or name. Date fields are captured for the upcoming rates
          API — results below use the local master inventory today.
        </p>
        <div className="mt-8">
          <SearchWidget />
        </div>
        {(params.checkIn || params.checkOut || params.guests) && (
          <p className="mt-4 text-sm text-muted">
            Requested{" "}
            {[
              params.checkIn && `check-in ${params.checkIn}`,
              params.checkOut && `check-out ${params.checkOut}`,
              params.guests && `${params.guests} guests`,
            ]
              .filter(Boolean)
              .join(" · ")}
            . Live availability will attach here via API.
          </p>
        )}
        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          {params.q ? `Results for “${params.q}”` : "Featured matches"}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
        {!hotels.length ? (
          <p className="mt-8 text-muted">No hotels matched. Try a destination like Havana or Varadero.</p>
        ) : null}
      </div>
    </div>
  );
}
