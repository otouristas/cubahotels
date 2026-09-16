import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guides } from "@/content/guides";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    image: guide.image,
    type: "article",
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.date,
    dateModified: guide.date,
    image: guide.image,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };

  return (
    <article className="pt-28">
      <JsonLd data={article} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">
          {guide.category} · {guide.date}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          {guide.title}
        </h1>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={guide.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:896px) 100vw, 896px"
            priority
          />
        </div>
        <p className="mt-8 rounded-2xl bg-foam p-5 text-lg leading-relaxed text-ink">
          <strong>Quick answer:</strong> {guide.answerFirst}
        </p>
        <div className="prose-cuba mt-10 space-y-8 pb-20">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold text-ink">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
