import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cuba Hotels FAQ",
  description:
    "Answers about Cuba Hotels, 2026 hotel renames, destinations, booking timeline, and verification sources.",
  path: "/faq",
});

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="surface-grid pt-28">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-3 text-muted">
          Clear answers for travelers and answer engines.
        </p>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <section
              key={faq.question}
              className="rounded-2xl border border-[var(--line)] bg-white p-5"
            >
              <h2 className="font-display text-xl font-semibold text-ink">
                {faq.question}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
