# Cuba Hotels

Marketing + directory site for **Cuba Hotels** (`cubahotels.travel`), seeded from the Cuba Hotel Master Database 2026 workbook.

## Stack

- Next.js App Router
- Tailwind CSS v4
- Local JSON inventory with API-ready data layer (`HOTELS_API_URL`)

## Scripts

```bash
npm run dev
npm run build
npm start
```

## Data

- Source workbook: `data-raw/cuba-brief.xlsx`
- Generated inventory: `src/data/hotels.json`
- Re-export with the Python snippet used during setup (openpyxl), or swap `src/lib/hotels.ts` to remote API.

## SEO / AEO / GEO

- Per-page metadata, Open Graph, canonical URLs
- `sitemap.xml` + `robots.txt` (including AI crawlers)
- JSON-LD: Organization/TravelAgency, WebSite+SearchAction, Hotel, TouristDestination, FAQPage, Article, Breadcrumbs, ItemList
- Destination GEO hubs + former-name 301 redirects
- Answer-first guide/FAQ copy

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://cubahotels.travel
# Optional later:
# HOTELS_API_URL=https://api.example.com
```
