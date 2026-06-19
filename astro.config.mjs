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
      changefreq: 'monthly',
      priority: 0.7,
      // Paid landing pages are noindex; keep them out of the sitemap.
      filter: (page) => !page.includes('/lp/'),
    }),
  ],
});
