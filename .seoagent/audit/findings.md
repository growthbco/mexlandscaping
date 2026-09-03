---
domain: mexlandscaping.com
origin: https://mexlandscaping.com
source_render: false
generated_at: 2026-09-03T22:51:06.861Z
findings: 5
source_evidence: .seoagent/audit/evidence.md
note: >-
  MACHINE-GENERATED findings report derived from the live-crawl evidence.
  The audit (audit/latest.md) BUILDS ON this file — it must carry every
  finding below forward (adding GSC context and prioritization on top),
  never re-derive or truncate the list. Do not hand-edit; re-run
  `seoagent crawl` to regenerate.
---

# Technical findings — mexlandscaping.com (from the live crawl)

Derived by code from `.seoagent/audit/evidence.md` (crawled https://mexlandscaping.com at 2026-09-03T22:51:06.861Z). Every finding below is **Confirmed** against that evidence. Reporting every one of these is non-negotiable — session economy trims bookkeeping, never findings.

## [High] sitemap.xml is missing or unreachable

**Confirmed** · Evidence: evidence.md § sitemap.xml — Not fetched

**Check:** `sitemap_missing`

Fetching /sitemap.xml returned HTTP 404 (or the response was not valid sitemap XML).

**Why it matters:** Without a sitemap, search engines rely purely on link discovery — new and deep pages get found late or never.

**Suggested fix:** Generate and serve a sitemap.xml listing every canonical public URL, and submit it to Google Search Console.

## [Medium] 2 pages have no canonical tag in the server HTML

**Confirmed** · Evidence: evidence.md § Site-wide rollup — Pages missing canonical

**Check:** `canonical_missing`

The server HTML of these pages contains no `<link rel="canonical">`.

Affected URLs:
- https://mexlandscaping.com/crm
- https://mexlandscaping.com/project-intake

**Why it matters:** Without a self-referencing canonical, URL variants (query strings, trailing slashes, http/https, www) can split ranking signals across duplicates.

**Suggested fix:** Add a self-referencing `<link rel="canonical" href="{full URL}">` to each listed page.

## [Medium] 2 pages are missing a meta description

**Confirmed** · Evidence: evidence.md § Site-wide rollup — Pages missing meta description

**Check:** `meta_description_missing`

These pages serve no `<meta name="description">` in the server HTML.

Affected URLs:
- https://mexlandscaping.com/crm
- https://mexlandscaping.com/project-intake

**Why it matters:** Google writes its own snippet for these results — usually worse copy than yours — which depresses click-through rate.

**Suggested fix:** Add a unique 150–160 character meta description (primary keyword + a soft CTA) to each listed page.

## [Medium] 1 page has multiple H1s

**Confirmed** · Evidence: evidence.md § Site-wide rollup — Pages with multiple H1s

**Check:** `h1_multiple`

These pages serve more than one `<h1>` in the document, sending conflicting topic signals.

Affected URLs:
- https://mexlandscaping.com/crm

**Why it matters:** A single clear H1 tells crawlers (and AI answer engines) what the page is about; multiple H1s dilute that signal.

**Suggested fix:** Keep exactly one `<h1>` per page and demote the others to `<h2>`/`<h3>`.

## [Medium] 2 pages serve no structured data (zero JSON-LD)

**Confirmed** · Evidence: evidence.md § Site-wide rollup — Pages with no structured data (zero JSON-LD)

**Check:** `json_ld_missing`

The server HTML of these pages contains no `<script type="application/ld+json">` block at all.

Affected URLs:
- https://mexlandscaping.com/crm
- https://mexlandscaping.com/project-intake

**Why it matters:** Structured data powers rich results and gives AI search engines an unambiguous machine-readable summary of the page; pages without it compete on prose alone.

**Suggested fix:** Add the JSON-LD type matching each page (Organization/WebSite on the homepage, Article/BlogPosting on posts, etc.) — only on the pages listed here; other crawled pages already serve schema.

## Already present on the live site — never recommend adding these

The crawl confirms the following already exist in the live server HTML. If the repo source lacks any of them, the **repo source is stale — the live page already serves it; reconcile the source** with what is live. Never phrase these as "add X".

- https://mexlandscaping.com/ — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/landscape-design — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/lawn-installation — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/tree-plant-installation — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-lighting — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/storm-water-management — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/commercial-landscape-installations — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/hardscape-services — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/patios — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/walkways — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/driveways — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/retaining-walls — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/architectural-stone-facades — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/concrete-masonry — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/outdoor-living — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/fire-pits — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/outdoor-kitchens — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/water-features — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/split-rail-fencing — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/snow-management-services — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/commercial-snow-plowing — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/24-7-emergency-snow-services — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/sidewalk-snow-removal — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/salting-de-icing — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/our-work — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/about-us — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/contact-us — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/landscape-design-hardscaping-in-norristown-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-king-of-prussia-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-bryn-mawr-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-wayne-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-conshohocken-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-plymouth-meeting-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-gladwyne-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-newtown-square-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-east-norriton-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-malvern-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-paoli-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-villanova-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-eagleville-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-broomall-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-blue-bell-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-worcester-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-whitemarsh-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-radnor-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-marple-township-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-havertown-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-collegeville-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-berwyn-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-haverford-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-devon-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/landscape-design-hardscaping-in-ardmore-pa — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/service-areas — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/privacy-policy — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/terms-conditions — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/projects — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, CollectionPage, BreadcrumbList)
- https://mexlandscaping.com/commercial-landscaping — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite, Service, BreadcrumbList, FAQPage)
- https://mexlandscaping.com/blog — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/crm — <title>
- https://mexlandscaping.com/press-release — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
- https://mexlandscaping.com/project-intake — <title>
- https://mexlandscaping.com/thank-you — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (LandscapingBusiness, WebSite)
