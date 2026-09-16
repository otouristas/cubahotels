import data from "@/data/hotels.json";

export type Hotel = (typeof data.hotels)[number];
export type Destination = (typeof data.destinations)[number];

/** Data access layer — swap internals for HOTELS_API_URL later without changing UI. */
const apiBase = process.env.HOTELS_API_URL;

async function fromApi<T>(path: string): Promise<T | null> {
  if (!apiBase) return null;
  try {
    const res = await fetch(`${apiBase.replace(/\/$/, "")}${path}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function getStats() {
  return data.stats;
}

export function getSiteMeta() {
  return data.site;
}

export async function getHotels(options?: {
  publishedOnly?: boolean;
  destinationSlug?: string;
  query?: string;
  priority?: string[];
  limit?: number;
}): Promise<Hotel[]> {
  const remote = await fromApi<{ hotels: Hotel[] }>("/hotels");
  let hotels = remote?.hotels ?? data.hotels;

  if (options?.publishedOnly !== false) {
    hotels = hotels.filter((h) => h.published);
  }
  if (options?.destinationSlug) {
    hotels = hotels.filter((h) => h.destinationSlug === options.destinationSlug);
  }
  if (options?.priority?.length) {
    hotels = hotels.filter((h) => options.priority!.includes(h.seoPriority));
  }
  if (options?.query) {
    const q = options.query.toLowerCase().trim();
    hotels = hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        (h.formerName?.toLowerCase().includes(q) ?? false) ||
        h.destination.toLowerCase().includes(q) ||
        (h.group?.toLowerCase().includes(q) ?? false),
    );
  }
  if (options?.limit) hotels = hotels.slice(0, options.limit);
  return hotels;
}

export async function getHotelBySlug(slug: string): Promise<Hotel | undefined> {
  const remote = await fromApi<Hotel>(`/hotels/${slug}`);
  if (remote && "slug" in remote) return remote;
  return data.hotels.find((h) => h.slug === slug || h.formerSlug === slug);
}

export async function getDestinations(options?: {
  featuredOnly?: boolean;
  limit?: number;
}): Promise<Destination[]> {
  const remote = await fromApi<{ destinations: Destination[] }>("/destinations");
  let destinations = remote?.destinations ?? data.destinations;
  if (options?.featuredOnly) {
    destinations = destinations.filter((d) => d.featured);
  }
  destinations = [...destinations].sort((a, b) => b.hotelCount - a.hotelCount);
  if (options?.limit) destinations = destinations.slice(0, options.limit);
  return destinations;
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | undefined> {
  const remote = await fromApi<Destination>(`/destinations/${slug}`);
  if (remote && "slug" in remote) return remote;
  return data.destinations.find((d) => d.slug === slug);
}

export function getFormerNameRedirects(): { source: string; destination: string }[] {
  return data.hotels
    .filter((h) => h.formerSlug && h.formerSlug !== h.slug)
    .map((h) => ({
      source: `/hotels/${h.formerSlug}`,
      destination: `/hotels/${h.slug}`,
    }));
}

export const destinationImages: Record<string, string> = {
  havana: "/images/havana.jpg",
  "old-havana": "/images/travel.jpg",
  varadero: "/images/varadero.jpg",
  "cayo-coco": "/images/cayo.jpg",
  "cayo-guillermo": "/images/cayo.jpg",
  "cayo-santa-maria": "/images/cayo-santa-maria.jpg",
  holguin: "/images/holguin.jpg",
  guardalavaca: "/images/holguin.jpg",
  trinidad: "/images/trinidad.jpg",
  "santiago-de-cuba": "/images/santiago.jpg",
  "cayo-largo": "/images/cayo.jpg",
  camaguey: "/images/travel.jpg",
};

export function imageForDestination(slug: string): string {
  return destinationImages[slug] || "/images/varadero.jpg";
}

export function hotelBlurb(hotel: Hotel): string {
  const place = hotel.destination.split("/")[0].trim();
  const former = hotel.formerName
    ? ` Formerly known as ${hotel.formerName}.`
    : "";
  const group = hotel.group ? ` Managed by ${hotel.group}.` : "";
  return `${hotel.name} is a Cuba hotel listing in ${place}.${former}${group} Check availability and destination context on Cuba Hotels.`;
}
