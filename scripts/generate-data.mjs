// Regenerate src/data/seo.generated.ts and src/data/posts.ts from the crawl cache.
// Usage:
//   bash scripts/crawl-mex.sh && bash scripts/crawl-posts.sh
//   node scripts/generate-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const cache = resolve(here, ".cache");
const dataDir = resolve(root, "src/data");

const decode = (s = "") =>
  s
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

const tsLit = (s) =>
  "`" + String(s).replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";

// ---- SEO map ----
const seoRows = readFileSync(resolve(cache, "mex-seo.tsv"), "utf8").trim().split("\n").slice(1);
const seo = {};
for (const row of seoRows) {
  const [path, title, description, , ogImage, h1] = row.split("\t");
  seo[path] = { title: decode(title), description: decode(description), ogImage: ogImage || "", h1: decode(h1) };
}
let seoOut = `// AUTO-GENERATED from the live mexlandscaping.com crawl. Real per-page SEO.
// Regenerate with: node scripts/generate-data.mjs

export type SeoMeta = { title: string; description: string; ogImage: string; h1: string };

export const seoByPath: Record<string, SeoMeta> = {
`;
for (const [path, m] of Object.entries(seo)) {
  seoOut += `  ${JSON.stringify(path)}: { title: ${tsLit(m.title)}, description: ${tsLit(m.description)}, ogImage: ${JSON.stringify(m.ogImage)}, h1: ${tsLit(m.h1)} },\n`;
}
seoOut += `};

export function seoFor(path: string): SeoMeta | undefined {
  return seoByPath[path];
}
`;
mkdirSync(dataDir, { recursive: true });
writeFileSync(resolve(dataDir, "seo.generated.ts"), seoOut);

// ---- Posts ----
const BOILERPLATE_MIN_REPEAT = 4;
const postRows = readFileSync(resolve(cache, "mex-posts.tsv"), "utf8").trim().split("\n").slice(1);
const parsed = postRows.map((row) => {
  const [slug, title, description, published, ogImage, body] = row.split("\t");
  const paras = (body || "").split("||").map((p) => decode(p)).filter((p) => p.length > 60);
  return { slug, title: decode(title), description: decode(description), published, ogImage, paras };
});
const freq = {};
for (const p of parsed) for (const para of p.paras) freq[para] = (freq[para] || 0) + 1;
for (const p of parsed) p.paras = p.paras.filter((para) => freq[para] < BOILERPLATE_MIN_REPEAT);
parsed.sort((a, b) => (a.published < b.published ? 1 : -1));

let postsOut = `// AUTO-GENERATED from the live mexlandscaping.com blog crawl.
// Regenerate with: node scripts/generate-data.mjs

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  ogImage: string;
  paragraphs: string[];
};

export const posts: Post[] = [
`;
for (const p of parsed) {
  const cleanTitle = p.title.replace(/\s*\|\s*Mex Landscaping.*$/i, "").replace(/\s*-\s*Mex Landscaping.*$/i, "");
  postsOut += `  {
    slug: ${JSON.stringify(p.slug)},
    title: ${tsLit(cleanTitle)},
    description: ${tsLit(p.description)},
    date: ${JSON.stringify((p.published || "").slice(0, 10))},
    ogImage: ${JSON.stringify(p.ogImage)},
    paragraphs: [\n${p.paras.map((x) => "      " + tsLit(x)).join(",\n")}\n    ],
  },\n`;
}
postsOut += `];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
`;
writeFileSync(resolve(dataDir, "posts.ts"), postsOut);

console.log(`Wrote seo.generated.ts (${Object.keys(seo).length}) and posts.ts (${parsed.length})`);
