import Image from "next/image";
import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { HotelCard } from "@/components/HotelCard";
import { JsonLd } from "@/components/JsonLd";
import { SearchWidget } from "@/components/SearchWidget";
import { TrustBar } from "@/components/TrustBar";
import { faqs } from "@/content/faqs";
import { guides } from "@/content/guides";
import {
  getDestinations,
  getHotels,
  getStats,
  imageForDestination,
} from "@/lib/hotels";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cuba Hotels — Book Stays Across the Island",
  description: siteConfig.description,
  path: "/",
  image: imageForDestination("havana"),
});

export default async function HomePage() {
  const [destinations, featuredHotels, p1Hotels] = await Promise.all([
    getDestinations({ featuredOnly: true, limit: 6 }),
    getHotels({ priority: ["P1", "P2"], limit: 6 }),
    getHotels({ priority: ["P1"], limit: 4 }),
  ]);
  const stats = getStats();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 4).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="relative min-h-[92vh] overflow-hidden text-white">
        <Image
          src={imageForDestination("havana")}
          alt="Classic cars and colorful streets in Havana, Cuba"
          fill
          priority
          loading="eager"
          className="hero-media object-cover"
          sizes="100vw"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-28 pt-32 sm:px-6 lg:px-8">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.22em] text-sun">
            Explore. Stay. Discover Cuba.
          </p>
          <h1 className="reveal reveal-delay-1 mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
            {siteConfig.tagline}. Browse {stats.published}+ verified listings across
            Havana, Varadero, the cays, and beyond — with 2026 name updates built in.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Link href="/destinations" className="btn-sun px-6 py-3 text-sm">
              Explore Destinations
            </Link>
            <Link href="/guides/cuba-hotel-name-changes-2026" className="btn-ghost px-6 py-3 text-sm">
              2026 Name Guide
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-4 sm:px-6 lg:px-8">
          <SearchWidget />
        </div>
      </section>

      <div className="h-24 sm:h-28" />

      <TrustBar />

      <section className="surface-grid px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">
              Destinations
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              Popular Cuba places you&apos;ll love
            </h2>
            <p className="mt-3 text-muted">
              GEO-optimized destination hubs help travelers — and answer engines —
              understand where to stay across the island.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} tall />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/destinations"
              className="inline-flex rounded-full bg-deep px-5 py-3 text-sm font-semibold text-white hover:bg-lagoon"
            >
              View all destinations
            </Link>
          </div>
        </div>
      </section>

      <section className="section-wave bg-deep px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
            <Image
              src={imageForDestination("varadero")}
              alt="Turquoise water and beach resorts in Varadero"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">
              Why Cuba Hotels
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              More than a list — a clear map of where Cuba stays
            </h2>
            <p className="mt-4 text-white/75">
              We prioritize high-intent destinations and confirmed 2026 renames first,
              then expand the long-tail directory as verification improves.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "Published hotels", value: `${stats.published}+` },
                { label: "Destinations", value: `${stats.destinations}` },
                { label: "Priority P1 stays", value: `${stats.p1}` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-[11px] uppercase tracking-wide text-white/60">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-sun">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">
                Handpicked
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
                Priority hotels for 2026 searches
              </h2>
            </div>
            <Link href="/hotels" className="text-sm font-semibold text-lagoon hover:text-sea">
              View all hotels →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.slug} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src={imageForDestination("cayo-santa-maria")}
            alt="Caribbean cay shoreline"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-lagoon/80" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 text-white lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="floaty inline-flex rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wide text-deep">
              Early planners
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Book early for cay season & city festivals
            </h2>
            <p className="mt-3 text-white/85">
              Secure high-demand stays in Cayo Santa María, Varadero, and Havana before
              peak travel weeks fill.
            </p>
          </div>
          <Link href="/search" className="btn-sun px-6 py-3 text-sm">
            Start your search
          </Link>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Travel insights & guides
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Answer-first guides written for SEO, AEO, and GEO destination intent.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(6,46,43,0.08)]"
              >
                <Link href={`/guides/${guide.slug}`}>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={guide.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-sea">
                      {guide.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{guide.excerpt}</p>
                    <p className="mt-4 text-sm font-semibold text-lagoon">Read more →</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">
            What travelers ask before booking Cuba
          </h2>
          <div className="mt-8 space-y-4 text-left">
            {faqs.slice(0, 3).map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-[var(--line)] bg-mist px-5 py-4"
              >
                <summary className="cursor-pointer font-semibold text-ink">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <Link href="/faq" className="mt-6 inline-block text-sm font-semibold text-lagoon">
            See all FAQs →
          </Link>
        </div>
      </section>

      <section className="bg-sun px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-deep">
              Get Cuba hotel deals & rename alerts
            </h2>
            <p className="mt-2 text-deep/80">
              Destination tips, inventory updates, and early-stay offers — no spam.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2" action="/contact" method="get">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="flex-1 rounded-full border-0 bg-white px-4 py-3 text-sm text-ink outline-none"
            />
            <button type="submit" className="rounded-full bg-deep px-5 py-3 text-sm font-semibold text-white">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="sr-only" aria-hidden={false}>
        <h2>Featured P1 hotels</h2>
        <ul>
          {p1Hotels.map((h) => (
            <li key={h.slug}>
              <a href={absoluteUrl(`/hotels/${h.slug}`)}>{h.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
