import Link from "next/link";
import { getStats } from "@/lib/hotels";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Cuba Hotels",
  description:
    "Cuba Hotels is building a verified, SEO-ready directory of Cuba stays with 2026 name clarity and an API-ready booking layer.",
  path: "/about",
});

export default function AboutPage() {
  const stats = getStats();
  return (
    <div className="surface-grid pt-28">
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">
          About
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
          Built for clear Cuba stays
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {siteConfig.name} helps travelers navigate Cuba&apos;s hotel landscape —
          including major 2026 operating-name changes — through destination hubs, hotel
          pages, and guides optimized for search and AI answers.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            ["Inventory", stats.hotels],
            ["Published", stats.published],
            ["Destinations", stats.destinations],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-2xl bg-white p-4 text-center">
              <p className="font-display text-2xl font-bold text-lagoon">{value}</p>
              <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 leading-relaxed text-muted">
          Hotel rates and live availability will connect through a dedicated API. Today
          the site ships with the master database inventory, former-name redirects, and a
          data layer that can switch to remote fetch without redesigning pages.
        </p>
        <Link href="/contact" className="btn-sun mt-8 inline-flex px-5 py-3 text-sm">
          Contact the team
        </Link>
      </div>
    </div>
  );
}
