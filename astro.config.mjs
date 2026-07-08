// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical host matches the existing site (www) to preserve SEO signals.
  site: 'https://www.mexlandscaping.com',
  // Original WordPress URLs all end in a trailing slash — keep them identical.
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      // changefreq/priority are ignored by Google; lastmod is the signal that matters.
      lastmod: new Date(),
      // Keep noindex pages out of the sitemap: paid landers, internal tools,
      // legal pages, and the empty press-release placeholder.
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/project-intake/') &&
        !page.includes('/privacy-policy/') &&
        !page.includes('/terms-conditions/') &&
        !page.includes('/press-release/'),
    }),
  ],
});
