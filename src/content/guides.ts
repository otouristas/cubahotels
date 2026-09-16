export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  answerFirst: string;
  sections: { heading: string; body: string }[];
};

export const guides: Guide[] = [
  {
    slug: "best-areas-to-stay-in-havana",
    title: "Best Areas to Stay in Havana in 2026",
    excerpt:
      "Old Havana, Vedado, and Miramar compared for first-time visitors booking Cuba hotels.",
    category: "Havana",
    date: "2026-09-01",
    readMinutes: 7,
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80",
    answerFirst:
      "Most first-time visitors should stay in Old Havana for walkable plazas or Vedado for mid-century hotels and nightlife; Miramar suits quieter, modern stays near embassies and beaches.",
    sections: [
      {
        heading: "Old Havana for heritage stays",
        body: "Boutique and palace hotels put you beside Plaza Vieja, the Malecón edge, and evening music. Expect character rooms, rooftop bars, and shorter walks to museums.",
      },
      {
        heading: "Vedado for classic city hotels",
        body: "Vedado concentrates larger city hotels, including properties formerly under international brands now operating under Cuban groups after 2026 name updates.",
      },
      {
        heading: "Miramar and Havana East for resorts",
        body: "Choose Miramar or Playa/Havana East when you want pools, beach access, and a calmer base with taxi or tour connections into the historic center.",
      },
    ],
  },
  {
    slug: "varadero-vs-cayo-coco",
    title: "Varadero vs Cayo Coco: Which Beach Hotel Base?",
    excerpt:
      "A clear comparison of Cuba’s two busiest beach hotel destinations for couples and families.",
    category: "Beaches",
    date: "2026-08-20",
    readMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    answerFirst:
      "Pick Varadero for the longest beach strip and easy day trips toward Havana; pick Cayo Coco (Jardines del Rey) for quieter cay resorts and all-inclusive island pacing.",
    sections: [
      {
        heading: "When Varadero wins",
        body: "Varadero offers dense hotel choice, nightlife options, and simpler logistics if you also want a Havana city break in the same trip.",
      },
      {
        heading: "When Cayo Coco wins",
        body: "Cayo Coco and nearby Cayo Guillermo favor resort-forward stays, turquoise lagoons, and fewer town distractions — ideal for pure beach weeks.",
      },
    ],
  },
  {
    slug: "cuba-hotel-name-changes-2026",
    title: "Cuba Hotel Name Changes in 2026: What Travelers Need to Know",
    excerpt:
      "Former Meliá, Tryp, Sol, and Iberostar names mapped to current Cuba Hotels listings.",
    category: "Travel Tips",
    date: "2026-08-22",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    answerFirst:
      "In August 2026, multiple Cuba hotels formerly branded Meliá, Tryp, Sol, and Iberostar were confirmed under new local operating names — search both current and former names when booking.",
    sections: [
      {
        heading: "Why names changed",
        body: "Management and brand transitions shifted several high-search properties to Cuban group operations. Cuba Hotels preserves former-name aliases so travelers still find the right property page.",
      },
      {
        heading: "How to search safely",
        body: "Use the hotel directory filters or search box with either the new name (for example Hotel Habana Libre) or the former brand name. Our pages redirect former-name URLs to the canonical listing.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
