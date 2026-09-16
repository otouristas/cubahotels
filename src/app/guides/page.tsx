import Image from "next/image";
import Link from "next/link";
import { guides } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cuba Travel Guides",
  description:
    "Answer-first Cuba hotel guides for Havana areas, beach destination comparisons, and 2026 hotel name changes.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="surface-grid pt-28">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Travel tips & guides
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Structured for featured snippets and AI answers — direct answer first, then
          supporting detail.
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
                    {guide.category} · {guide.readMinutes} min
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                    {guide.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{guide.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
