import { NextResponse } from "next/server";
import { getHotelBySlug } from "@/lib/hotels";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) {
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
  }
  return NextResponse.json({
    source: process.env.HOTELS_API_URL ? "remote" : "local",
    hotel,
  });
}
