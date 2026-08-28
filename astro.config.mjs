// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const legacyPostPaths = [
  '/complete-drip-irrigation-setup-guide-key-steps-for-efficient-watering/',
  '/key-guidelines-for-drafting-effective-commercial-snow-removal-contracts/',
  '/trimming-seeding-norristowns-spring-landscaping/',
  '/spruce-up-your-norristown-yard-landscaping-and-trimming-guide/',
  '/spring-landscaping-in-norristown-aeration-seeding/',
  '/trimming-tricks-norristowns-guide-to-perfect-yard-maintenance/',
  '/norristowns-aeration-seeding-secrets-for-lush-lawns/',
  '/mowing-weeding-norristowns-essential-spring-landscaping/',
  '/norristown-landscaping-spring-cleanup-tree-installation-tips/',
  '/norristown-green-scape-aeration-to-weeding/',
  '/norristown-lawn-care-mowing-to-seeding/',
  '/norristown-landscaping-spring-cleanups-tree-care/',
];

// https://astro.build/config
export default defineConfig({
  // Canonical host matches the existing site (www) to preserve SEO signals.
  site: 'https://mexlandscaping.com',
  // Original WordPress URLs all end in a trailing slash — keep them identical.
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      // Keep noindex pages out of the sitemap: paid landers, internal tools,
      // legal pages, conversion pages, and superseded legacy articles.
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/crm/') &&
        !page.includes('/project-intake/') &&
        !page.includes('/privacy-policy/') &&
        !page.includes('/terms-conditions/') &&
        !page.includes('/press-release/') &&
        !page.includes('/thank-you/') &&
        !legacyPostPaths.some((path) => page.endsWith(path)),
    }),
  ],
});
