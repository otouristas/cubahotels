import Link from "next/link";

const items = [
  {
    title: "2026 name clarity",
    body: "Former international brands mapped to current operating names so you book the right property.",
  },
  {
    title: "Destination-first browsing",
    body: "GEO pages for Havana, Varadero, the cays, Holguín, Trinidad, and more — built for traveler intent.",
  },
  {
    title: "Verified inventory signals",
    body: "Confidence levels and sources from tourism offices and official listings before pages go live.",
  },
  {
    title: "API-ready booking path",
    body: "Search and hotel pages are structured for live rates later without rebuilding the experience.",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--line)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div key={item.title}>
            <div className="mb-3 h-10 w-10 rounded-full bg-foam ring-1 ring-[var(--line)]" />
            <h2 className="font-display text-lg font-semibold text-ink">{item.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
      <p className="sr-only">
        Learn more on our <Link href="/about">about page</Link>.
      </p>
    </section>
  );
}
