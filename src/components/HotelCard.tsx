import Image from "next/image";
import Link from "next/link";
import type { Hotel } from "@/lib/hotels";
import { imageForDestination } from "@/lib/hotels";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(6,46,43,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(6,46,43,0.14)]">
      <Link href={`/hotels/${hotel.slug}`} className="block">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={imageForDestination(hotel.destinationSlug)}
            alt={`${hotel.name} in ${hotel.destination}`}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 rounded-full bg-deep/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {hotel.seoPriority}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sea">
            {hotel.destination.split("/")[0].trim()}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">
            {hotel.name}
          </h3>
          {hotel.formerName ? (
            <p className="mt-1 text-xs text-muted">Formerly {hotel.formerName}</p>
          ) : null}
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">{hotel.group || "Cuba lodging"}</span>
            <span className="font-semibold text-lagoon">View stay →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
