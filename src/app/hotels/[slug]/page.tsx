import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SearchWidget } from "@/components/SearchWidget";
import {
  getHotelBySlug,
  getHotels,
  hotelBlurb,
  imageForDestination,
} from "@/lib/hotels";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const hotels = await getHotels({ publishedOnly: false });
  return hotels.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) return {};
  const place = hotel.destination.split("/")[0].trim();
  const title = `${hotel.name} — Hotel in ${place}, Cuba`;
  const description = hotelBlurb(hotel);
  return buildMetadata({
    title,
    description,
    path: `/hotels/${hotel.slug}`,
    image: imageForDestination(hotel.destinationSlug),
    noIndex: !hotel.published,
  });
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const related = (
    await getHotels({ destinationSlug: hotel.destinationSlug, limit: 4 })
  ).filter((h) => h.slug !== hotel.slug);

  const place = hotel.destination.split("/")[0].trim();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotelBlurb(hotel),
    url: absoluteUrl(`/hotels/${hotel.slug}`),
    image: imageForDestination(hotel.destinationSlug),
    address: {
      "@type": "PostalAddress",
      addressLocality: place,
      addressCountry: "CU",
    },
    ...(hotel.formerName
      ? { alternateName: [hotel.formerName] }
      : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hotels",
        item: absoluteUrl("/hotels"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hotel.name,
        item: absoluteUrl(`/hotels/${hotel.slug}`),
      },
    ],
  };

  return (
    <div>
      <JsonLd data={[schema, breadcrumb]} />
      <section className="relative min-h-[48vh] overflow-hidden text-white">
        <Image
          src={imageForDestination(hotel.destinationSlug)}
          alt={`${hotel.name} location atmosphere in ${place}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">
            {place} · {hotel.seoPriority}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold sm:text-5xl">
            {hotel.name}
          </h1>
          {hotel.formerName ? (
            <p className="mt-3 text-white/85">Formerly known as {hotel.formerName}</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <article>
            <h2 className="font-display text-2xl font-bold text-ink">
              About this Cuba hotel
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{hotelBlurb(hotel)}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Destination", hotel.destination],
                ["Group / management", hotel.group || "To confirm"],
                ["Former brand", hotel.formerBrand || "—"],
                ["Status", hotel.status],
                ["Confidence", hotel.confidence || "—"],
                ["Last verified", hotel.lastVerified || "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--line)] bg-white p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{value}</p>
                </div>
              ))}
            </div>

            {hotel.notes ? (
              <p className="mt-6 rounded-2xl bg-foam p-4 text-sm text-muted">
                <strong className="text-ink">Editor note:</strong> {hotel.notes}
              </p>
            ) : null}

            {hotel.sourceUrl ? (
              <p className="mt-4 text-sm text-muted">
                Source:{" "}
                <a
                  href={hotel.sourceUrl}
                  className="font-semibold text-lagoon underline-offset-2 hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Official listing reference
                </a>
              </p>
            ) : null}

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink">
                Check dates for {hotel.name}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Live rates arrive with the hotel API. Search is wired and ready.
              </p>
              <div className="mt-4">
                <SearchWidget compact />
              </div>
            </div>
          </article>

          <aside className="h-fit rounded-3xl bg-deep p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sun">
              Plan this stay
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold">{place}</h2>
            <p className="mt-3 text-sm text-white/75">
              Explore more hotels in this destination or jump back to the full directory.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/destinations/${hotel.destinationSlug}`}
                className="btn-sun px-4 py-3 text-center text-sm"
              >
                {place} hotels
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-4 py-3 text-center text-sm hover:bg-white/10"
              >
                Ask a Cuba specialist
              </Link>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-ink">
              More hotels in {place}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/hotels/${h.slug}`}
                    className="block rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-sea"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
