import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/hotels";
import { imageForDestination } from "@/lib/hotels";

export function DestinationCard({
  destination,
  tall = false,
}: {
  destination: Destination;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`group relative block overflow-hidden rounded-2xl ${
        tall ? "min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      <Image
        src={imageForDestination(destination.slug)}
        alt={`Hotels in ${destination.name}, Cuba`}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sun">
          {destination.region}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold">{destination.name}</h3>
        <p className="mt-1 text-sm text-white/80">
          {destination.hotelCount} hotels · Explore →
        </p>
      </div>
    </Link>
  );
}
