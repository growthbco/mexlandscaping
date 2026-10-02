# SEO Roadmap — mexlandscaping.com

Generated from the initial SEOAgent audit on 2026-09-03.

## Priority 1 — Technical fixes (blocking)

- [ ] **Sitemap delivery** — `/sitemap.xml` returns 404, `sitemap-index.xml` returns 500. Investigate Astro build and Vercel deployment. The `@astrojs/sitemap` integration is configured correctly in `astro.config.mjs`.
- [ ] **Submit sitemap to GSC** — Once sitemap is serving 200, submit to Google Search Console.

## Priority 2 — AI search readiness

- [ ] **Fill OKF bundle** — Complete `.seoagent/okf/index.md` with business facts. Run `seoagent okf validate` then `seoagent sync` to publish.

## Priority 3 — Cloud integration (optional but recommended)

- [ ] **Connect SEOAgent Cloud** — `seoagent login` enables Search Console data, indexing verdicts, and keyword strategy features.
- [ ] **Schedule recurring audit** — Set up weekly SEOAgent run per `references/recurring-runs.md`.

## Priority 4 — Content strategy (after sitemap fixed)

- [ ] **Keyword research** — `seoagent keywords --seed` with GSC data once connected.
- [ ] **Blog content plan** — The blog exists (`/blog`) but has limited content. Plan pillar/cluster strategy for local landscaping topics.

## Deferred — Not recommended

- ~~Add SEO to `/crm` and `/project-intake`~~ — Internal tools, not for search indexing.

---

*Updated: 2026-09-03 by SEOAgent bootstrap*
