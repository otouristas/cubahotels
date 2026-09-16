import { NextResponse } from "next/server";
import { getHotels } from "@/lib/hotels";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || undefined;
  const destination = searchParams.get("destination") || undefined;
  const priority = searchParams.get("priority");
  const limit = searchParams.get("limit");

  const hotels = await getHotels({
    query: q,
    destinationSlug: destination || undefined,
    priority: priority ? [priority] : undefined,
    limit: limit ? Number(limit) : undefined,
    publishedOnly: searchParams.get("all") !== "1",
  });

  return NextResponse.json({
    source: process.env.HOTELS_API_URL ? "remote" : "local",
    count: hotels.length,
    hotels,
  });
}
