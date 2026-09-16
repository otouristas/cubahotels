import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%231a7a72' d='M0 80 L40 70 L80 85 L120 60 L160 75 L200 50 L240 70 L280 45 L320 65 L360 40 L400 70 L440 55 L480 75 L520 50 L560 70 L600 45 L640 65 L680 55 L720 75 L760 50 L800 70 L840 55 L880 65 L920 45 L960 70 L1000 55 L1040 75 L1080 50 L1120 70 L1160 55 L1200 65 L1200 120 L0 120 Z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundSize: "1200px 110px",
          backgroundPosition: "bottom",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sun">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sun">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sun">
            Popular
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/destinations/havana" className="hover:text-sun">
                Havana hotels
              </Link>
            </li>
            <li>
              <Link href="/destinations/varadero" className="hover:text-sun">
                Varadero hotels
              </Link>
            </li>
            <li>
              <Link href="/destinations/cayo-coco" className="hover:text-sun">
                Cayo Coco hotels
              </Link>
            </li>
            <li>
              <Link href="/destinations/cayo-santa-maria" className="hover:text-sun">
                Cayo Santa María hotels
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sun">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-sun">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.phone}</li>
            <li>
              <Link href="/contact" className="hover:text-sun">
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-4 py-5 text-center text-xs text-white/50 sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. ·{" "}
        <Link href="/faq" className="hover:text-sun">
          FAQ
        </Link>
      </div>
    </footer>
  );
}
