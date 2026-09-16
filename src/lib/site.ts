export const siteConfig = {
  name: "Cuba Hotels",
  shortName: "CubaHotels",
  domain: "cubahotels.travel",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cubahotels.travel",
  tagline: "Your Cuba stay, clearly mapped",
  description:
    "Compare hotels across Havana, Varadero, Cayo Coco, Cayo Santa María, Holguín, Trinidad, and more. Updated 2026 names, destination guides, and booking-ready hotel pages.",
  email: "hello@cubahotels.travel",
  phone: "+1 (800) 555-CUBA",
  locale: "en_US",
  twitter: "@cubahotels",
} as const;

export const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/hotels", label: "Hotels" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
] as const;
