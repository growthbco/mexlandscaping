---
domain: mexlandscaping.com
audited_at: 2026-09-03T22:51:06.861Z
pages_audited: 62
findings_total: 5
findings_by_severity:
  critical: 0
  high: 1
  medium: 4
  low: 0
---

# SEO Audit — mexlandscaping.com

**Crawled origin:** https://mexlandscaping.com at 2026-09-03T22:51:06.861Z
**Pages audited:** 62 (complete capture)
**Evidence base:** `.seoagent/audit/evidence.md`

## 🚨 Biggest Issue

### [High] sitemap.xml is missing or unreachable

**Confirmed** · Evidence: evidence.md § sitemap.xml — Not fetched (HTTP 404)

The live site's `/sitemap.xml` returns 404. The robots.txt references `sitemap-index.xml`, which returns HTTP 500. Without a working sitemap, search engines rely purely on link discovery — new and deep pages (especially the 25+ location pages) get found late or never.

👉 **Fix:** Verify the Astro build is outputting the sitemap correctly and that Vercel is serving it. The `@astrojs/sitemap` integration is configured, so this is likely a build/deploy issue. After fixing, submit to Google Search Console.

## ⚠️ Also Worth Fixing

### [Medium] 2 internal pages missing meta tags — `/crm` and `/project-intake`

**Confirmed** · Evidence: evidence.md § Site-wide rollup

These internal tool pages are missing canonical tags, meta descriptions, and JSON-LD schema. The `/crm` page also has 2 H1s.

**Assessment:** These are internal CRM/admin pages, not meant for public search. They're already excluded from the sitemap via `astro.config.mjs` filter. **No action recommended** — the noindex internal-tools pattern is appropriate. If these pages appear in search results, add `<meta name="robots" content="noindex">` explicitly.

### [Medium] OKF bundle not published

**Confirmed** · Evidence: WebFetch — `/.well-known/okf/index.md` returns 404

The `.seoagent/okf/` directory exists but the OKF bundle isn't served at `/.well-known/okf/`. This limits AI search engine (ChatGPT, Perplexity, Claude) understanding of the business.

👉 **Fix:** Fill `.seoagent/okf/index.md` with real business details, then `seoagent sync` will publish to `public/.well-known/okf/`.

## ✅ What's Working

1. **Strong local SEO schema:** Homepage has `LandscapingBusiness` + `WebSite` JSON-LD. All 20+ service pages have `Service`, `BreadcrumbList`, and `FAQPage` schema.

2. **All public pages have proper head tags:** Title, meta description, canonical, Open Graph, Twitter cards verified on 60/62 pages (exceptions are the 2 internal tools).

3. **Images all have alt text:** Zero missing-alt images across the entire crawl.

4. **No orphan pages:** Internal linking analysis shows every indexable page has at least one inbound link.

5. **llms.txt is live:** The site serves a proper `llms.txt` at the root, making it AI-readable.

6. **Location page coverage:** 25 location-specific pages (Norristown, King of Prussia, Bryn Mawr, etc.) with proper schema and meta tags.

## What do you want to do?

1. **Investigate sitemap 500 error** — check Vercel build logs, verify `@astrojs/sitemap` output
2. **Fill OKF bundle** — complete `.seoagent/okf/index.md` for AI search visibility
3. **Run `seoagent login`** — connect Search Console for indexing coverage data and keyword insights
4. **Plan content strategy** — once sitemap is fixed, run keyword research phase

---

## Technical Findings Summary

All findings from `.seoagent/audit/findings.md` carried forward:

| Severity | Finding | Status |
|---|---|---|
| High | sitemap.xml missing (404) | Open — deployment issue |
| Medium | 2 pages missing canonical | Declined — internal tools |
| Medium | 2 pages missing meta description | Declined — internal tools |
| Medium | 1 page with multiple H1s (/crm) | Declined — internal tool |
| Medium | 2 pages missing JSON-LD | Declined — internal tools |

**Declined findings rationale:** The `/crm` and `/project-intake` pages are internal CRM tools, excluded from the sitemap, and not intended for search indexing. Adding SEO elements would be unnecessary overhead.
