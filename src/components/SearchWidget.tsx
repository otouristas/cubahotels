"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const destinations = [
  "Havana",
  "Varadero",
  "Cayo Coco",
  "Cayo Santa María",
  "Holguín",
  "Trinidad",
  "Santiago de Cuba",
  "Cayo Largo",
];

export function SearchWidget({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where) params.set("q", where);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`relative z-20 mx-auto w-full max-w-5xl rounded-2xl bg-white/95 p-3 shadow-[0_24px_60px_rgba(6,46,43,0.22)] backdrop-blur ${
        compact ? "" : "sm:p-4"
      }`}
    >
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto]">
        <label className="block rounded-xl bg-foam px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Where to?
          </span>
          <input
            list="cuba-destinations"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Search destination or hotel"
            className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/70"
          />
          <datalist id="cuba-destinations">
            {destinations.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </label>
        <label className="block rounded-xl bg-foam px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Check in
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
          />
        </label>
        <label className="block rounded-xl bg-foam px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Check out
          </span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
          />
        </label>
        <label className="block rounded-xl bg-foam px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn-sun px-6 py-3 text-sm md:self-stretch">
          Search
        </button>
      </div>
    </form>
  );
}
