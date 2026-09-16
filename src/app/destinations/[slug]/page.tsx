import Image from "next/image";
import { notFound } from "next/navigation";
import { HotelCard } from "@/components/HotelCard";
import { JsonLd } from "@/components/JsonLd";
import {
  getDestinationBySlug,
  getDestinations,
  getHotels,
  imageForDestination,
} from "@/lib/hotels";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  return buildMetadata({
    title: `Hotels in ${destination.name}, Cuba`,
    description: `Find hotels in ${destination.name}, Cuba. ${destination.tagline} Browse ${destination.hotelCount} listings on Cuba Hotels.`,
    path: `/destinations/${destination.slug}`,
    image: imageForDestination(destination.slug),
  });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const hotels = await getHotels({
    destinationSlug: destination.slug,
    publishedOnly: false,
  });
  const published = hotels.filter((h) => h.published);

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.tagline,
    url: absoluteUrl(`/destinations/${destination.slug}`),
    image: imageForDestination(destination.slug),
    containedInPlace: {
      "@type": "Country",
      name: "Cuba",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${destination.name} a good place to stay in Cuba?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${destination.name} is a ${destination.region} destination known for ${destination.tagline.toLowerCase()} Cuba Hotels currently lists ${destination.hotelCount} properties linked to this area.`,
        },
      },
      {
        "@type": "Question",
        name: `How many hotels does Cuba Hotels list in ${destination.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Cuba Hotels lists ${destination.hotelCount} hotels associated with ${destination.name}, with ${published.length} currently published for browsing.`,
        },
      },
    ],
  };

  return (
    <div>
      <JsonLd data={[placeSchema, faqSchema]} />
      <section className="relative min-h-[52vh] overflow-hidden text-white">
        <Image
          src={imageForDestination(destination.slug)}
          alt={`${destination.name}, Cuba travel destination`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">
            {destination.region}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Hotels in {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{destination.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(6,46,43,0.06)] sm:p-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            Why stay in {destination.name}?
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            {destination.name} sits in {destination.region} and is one of the places
            travelers search when planning Cuba hotel stays. Use this hub to compare
            published properties, then open individual hotel pages for former names,
            management groups, and verification notes.
          </p>
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          {published.length} published hotels
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(published.length ? published : hotels.slice(0, 9)).map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
