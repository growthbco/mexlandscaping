#!/usr/bin/env bash
# Crawl mexlandscaping.com for real per-page SEO data.
set -u
BASE="https://www.mexlandscaping.com"
OUT="$(dirname "$0")/.cache/mex-seo.tsv"
mkdir -p "$(dirname "$0")/.cache"
echo -e "path\ttitle\tdescription\tcanonical\tog_image\th1" > "$OUT"

cities=(villanova norristown eagleville broomall blue-bell worcester whitemarsh radnor marple-township havertown collegeville berwyn paoli malvern king-of-prussia east-norriton newtown-square gladwyne plymouth-meeting conshohocken wayne bryn-mawr)

paths=(
  "/"
  "/storm-water-management/" "/property-maintenance/" "/landscape-lighting/"
  "/lawn-installation/" "/landscape-design/" "/service-areas/" "/about-us/"
  "/blog/" "/snow-management-services/" "/24-7-emergency-snow-services/"
  "/sidewalk-snow-removal/" "/salting-de-icing/" "/commercial-snow-plowing/"
  "/contact-us/" "/leaf-cleanups/" "/snow-removal/" "/terms-conditions/"
  "/privacy-policy/" "/landscaping-services-in-norristown-pa/" "/weeding/"
  "/trimming/" "/tree-plant-installation/" "/shrubs-and-bushes/" "/patios/"
  "/our-work/" "/landscaping-king-of-prussia/" "/hardscape-services/"
  "/fall-cleanups/" "/fall-aeration-seeding/" "/driveways/"
  "/commercial-landscape-installations/" "/architectural-stone-facades/"
  "/press-release/"
)
for c in "${cities[@]}"; do
  paths+=("/lawn-mowing-services-in-${c}-pa/")
  paths+=("/snow-management-services-in-${c}-pa/")
done

extract() {
  # $1 = html, $2 = perl regex group
  perl -0777 -ne "print \"\$1\" if /$2/si" 2>/dev/null
}

for p in "${paths[@]}"; do
  html=$(curl -s -L --max-time 25 "${BASE}${p}")
  title=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<title>(.*?)<\/title>/si' | tr -d '\n' | sed 's/\t/ /g')
  desc=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<meta\s+name=["'"'"']description["'"'"']\s+content=["'"'"'](.*?)["'"'"']/si' | tr -d '\n' | sed 's/\t/ /g')
  canon=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<link\s+rel=["'"'"']canonical["'"'"']\s+href=["'"'"'](.*?)["'"'"']/si' | tr -d '\n')
  ogimg=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<meta\s+property=["'"'"']og:image["'"'"']\s+content=["'"'"'](.*?)["'"'"']/si' | tr -d '\n')
  h1=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<h1[^>]*>(.*?)<\/h1>/si' | sed 's/<[^>]*>//g' | tr -d '\n' | sed 's/\t/ /g')
  echo -e "${p}\t${title}\t${desc}\t${canon}\t${ogimg}\t${h1}" >> "$OUT"
  echo "fetched ${p}"
done
echo "DONE -> $OUT ($(wc -l < "$OUT") lines)"
