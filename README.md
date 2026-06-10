# Mex Landscaping

Marketing + lead-generation website for **Mex Landscaping** (Norristown, PA) —
landscaping, snow management, and hardscape services across the Main Line.

A full rebuild of the original WordPress site in **Astro + Tailwind CSS v4**,
statically generated and SEO-preserving (every original URL, title, and meta
description is carried over 1:1).

## Stack

- **[Astro](https://astro.build)** (static output, 96 prerendered pages)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **`@astrojs/sitemap`** — auto-generated `sitemap-index.xml`
- **[Web3Forms](https://web3forms.com)** — serverless lead capture (no backend)
- Fonts: Fraunces (display) + Inter (body)

## Local development

```bash
pnpm install
cp .env.example .env      # add your Web3Forms key
pnpm dev                  # http://localhost:4321
pnpm build                # static build → ./dist
pnpm preview              # serve the build locally
```

## Lead capture (Web3Forms)

Forms post directly to Web3Forms — no server required, so it deploys anywhere
static.

1. Create a free key at <https://web3forms.com> tied to `team@mexlandscaping.com`.
2. Set `PUBLIC_WEB3FORMS_KEY` in `.env` (and in your host's env vars).

Leads are emailed to the address associated with the key.

## SEO

- **URLs preserved exactly** (flat WordPress slugs, trailing slashes) so existing
  rankings and backlinks carry over — no redirects needed.
- Real `<title>` + meta descriptions per page, pulled from the live site.
- Canonicals on `https://www.mexlandscaping.com` (matches the original host).
- JSON-LD on every page: `LandscapingBusiness`, plus `Service` / `Article` and
  `BreadcrumbList` where relevant.
- `sitemap-index.xml` + `robots.txt` generated at build.

## Content structure

```
src/
├── data/
│   ├── site.ts              # business NAP, nav, cities, reviews, FAQs
│   ├── services.ts          # service pages (structure + body copy)
│   ├── locations.ts         # programmatic per-city local-SEO pages
│   ├── seo.generated.ts     # AUTO: real per-page titles/descriptions
│   └── posts.ts             # AUTO: blog posts (crawled from live site)
├── pages/
│   ├── index.astro          # home
│   ├── [slug].astro         # services + location pages + blog posts
│   ├── about-us / contact-us / service-areas / our-work / blog ...
│   └── 404.astro
├── components/              # Header, Footer, LeadForm, Cta, templates/ ...
└── layouts/BaseLayout.astro # <head>, SEO, JSON-LD
```

### Regenerating SEO + blog data from the live site

```bash
bash scripts/crawl-mex.sh      # page titles/descriptions/OG → scripts/.cache
bash scripts/crawl-posts.sh    # blog post content → scripts/.cache
node scripts/generate-data.mjs # writes src/data/seo.generated.ts + posts.ts
```

## Replacing placeholders

- **Project photos** — the hero tiles and `/our-work/` gallery use brand
  gradients. Drop real images into `public/` and swap them in.
- **Web3Forms key** — see above.
- **Social links** — confirm the URLs in `src/data/site.ts`.
