import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Cuba Hotels",
  description:
    "Contact Cuba Hotels for destination advice, partnership inquiries, or inventory questions.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="surface-grid pt-28">
      <div className="mx-auto max-w-xl px-4 pb-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Contact us
        </h1>
        <p className="mt-3 text-muted">
          Tell us where you want to stay. We reply by email — booking API automation
          comes later.
        </p>
        {params.email ? (
          <p className="mt-4 rounded-2xl bg-foam px-4 py-3 text-sm text-lagoon">
            Thanks — we&apos;ll follow up at {params.email}.
          </p>
        ) : null}
        <form className="mt-8 space-y-4 rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(6,46,43,0.08)]">
          <label className="block text-sm">
            <span className="font-semibold text-ink">Name</span>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-sea/30"
            />
          </label>
          <label className="block text-sm">
            <span className="font-semibold text-ink">Email</span>
            <input
              type="email"
              name="email"
              defaultValue={params.email || ""}
              required
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-sea/30"
            />
          </label>
          <label className="block text-sm">
            <span className="font-semibold text-ink">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-sea/30"
              placeholder="Destination, dates, hotel preferences…"
            />
          </label>
          <button type="submit" className="btn-sun w-full px-5 py-3 text-sm">
            Send message
          </button>
          <p className="text-center text-xs text-muted">
            Or email{" "}
            <a className="font-semibold text-lagoon" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
