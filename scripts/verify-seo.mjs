import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(join(root, path), 'utf8');
const sitemap = read('dist/sitemap-0.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 99, '118 sitemap pages minus 19 consolidated pages');
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap URLs');

const config = JSON.parse(read('vercel.json'));
const towns = ['norristown', 'king-of-prussia', 'wayne', 'bryn-mawr', 'conshohocken',
  'plymouth-meeting', 'blue-bell', 'havertown', 'gladwyne', 'radnor'];
const retired = towns.flatMap((town) => [
  ...(town === 'norristown' ? [] : [`/drainage-in-${town}-pa/`]),
  `/retaining-walls-in-${town}-pa/`,
]);

for (const path of retired) {
  const rules = config.redirects.filter((rule) => rule.source === path);
  assert.equal(rules.length, 1, `One redirect for ${path}`);
  assert.equal(rules[0].statusCode, 301, `Permanent redirect for ${path}`);
  const destination = path.startsWith('/drainage-') ? '/storm-water-management/' : '/retaining-walls/';
  assert.equal(rules[0].destination, `https://mexlandscaping.com${destination}`);
  assert(!urls.includes(`https://mexlandscaping.com${path}`), `Retired URL excluded: ${path}`);
  assert(!existsSync(join(root, 'dist', path, 'index.html')), `No duplicate page built: ${path}`);
}

const htmlFor = (path) => read(`dist${path}index.html`);
for (const url of urls) {
  const { origin, pathname } = new URL(url);
  assert.equal(origin, 'https://mexlandscaping.com');
  assert(pathname.endsWith('/'), `Trailing slash: ${url}`);
  const html = htmlFor(pathname);
  assert(!html.includes('<optgroup label="Our Work">'), `Portfolio links are not estimate services: ${url}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `One H1: ${url}`);
  assert(html.includes(`rel="canonical" href="${url}"`), `Self canonical: ${url}`);
  assert(!/<meta[^>]*name="robots"[^>]*noindex/i.test(html), `Indexable sitemap page: ${url}`);
  assert(!html.includes('"@type":"LandscapingBusiness"'), `Supported schema: ${url}`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]));
  assert(schemas.some((schema) => schema['@type'] === 'HomeAndConstructionBusiness'), `Business schema: ${url}`);
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const path = match[1];
    if (path.startsWith('//') || path.startsWith('/api/')) continue;
    assert(!retired.includes(path), `No internal link to retired URL: ${url} -> ${path}`);
    assert(existsSync(join(root, 'dist', path)) || existsSync(join(root, 'public', path)), `Local link resolves: ${url} -> ${path}`);
  }
}

assert(htmlFor('/salting-de-icing/').includes('<title>Salting &amp; De-Icing Services | Norristown &amp; Main Line | Mex Landscaping</title>'));
const description = (path) => htmlFor(path).match(/<meta name="description" content="([^"]*)"/)[1];
assert.notEqual(description('/fall-cleanups/'), description('/leaf-cleanups/'));
assert(urls.includes('https://mexlandscaping.com/drainage-in-norristown-pa/'));
assert(htmlFor('/drainage-in-norristown-pa/').includes('drainage-flood-before-yard.jpg'));
assert(htmlFor('/drainage-in-norristown-pa/').includes('drainage-french-drain-graded.jpg'));
assert(htmlFor('/storm-water-management/').includes('href="/drainage-in-norristown-pa/"'));
assert(htmlFor('/projects/').includes('"@type":"ItemList"'));
assert(htmlFor('/').includes('href="/projects/"'));
assert.equal(urls.filter((url) => url.includes('/landscape-design-hardscaping-in-')).length, 25);
assert.equal(urls.filter((url) => url.includes('/snow-management-services-in-')).length, 25);
for (const path of ['/sitemap_index.xml', '/page-sitemap.xml', '/post-sitemap.xml']) {
  assert(config.redirects.some((r) => r.source === path && r.destination === 'https://mexlandscaping.com/sitemap-index.xml' && r.statusCode === 301));
}
console.log(`SEO checks passed: ${urls.length} indexable pages, ${retired.length} permanent consolidations, all 50 broader town pages retained, schema/canonicals/internal links verified.`);
