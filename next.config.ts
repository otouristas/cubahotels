import type { NextConfig } from "next";
import hotelsData from "./src/data/hotels.json";

const formerRedirects = hotelsData.hotels
  .filter((h) => h.formerSlug && h.formerSlug !== h.slug)
  .map((h) => ({
    source: `/hotels/${h.formerSlug}`,
    destination: `/hotels/${h.slug}`,
    permanent: true as const,
  }));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return formerRedirects;
  },
};

export default nextConfig;
