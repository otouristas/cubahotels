"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-white/10 bg-deep/95 backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
            {siteConfig.name}
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-sun sm:inline">
            Travel
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm font-medium text-white/90 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-sun"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden text-sm font-medium text-white/90 hover:text-sun sm:inline"
          >
            Search
          </Link>
          <Link href="/hotels" className="btn-sun px-4 py-2.5 text-sm sm:px-5">
            Plan Your Stay
          </Link>
        </div>
      </div>
    </header>
  );
}
