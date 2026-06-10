#!/usr/bin/env bash
set -u
BASE="https://www.mexlandscaping.com"
OUT="$(dirname "$0")/.cache/mex-posts.tsv"
mkdir -p "$(dirname "$0")/.cache"
echo -e "slug\ttitle\tdescription\tpublished\tog_image\tbody" > "$OUT"

posts=(
  commercial-snow-plowing-keeping-your-business-accessible
  essential-guide-to-choosing-and-installing-the-perfect-landscape-lighting
  complete-drip-irrigation-setup-guide-key-steps-for-efficient-watering
  essential-winter-landscaping-maintenance-tips-for-a-thriving-lawn
  key-guidelines-for-drafting-effective-commercial-snow-removal-contracts
  expert-retaining-wall-builders-near-me-custom-solutions-for-your-landscape
  essential-lawn-mowing-practices-for-a-thriving-garden
  mowing-weeding-norristowns-essential-spring-landscaping
  spruce-up-your-norristown-yard-landscaping-and-trimming-guide
  norristown-landscaping-spring-cleanups-tree-care
  trimming-seeding-norristowns-spring-landscaping
  trimming-tricks-norristowns-guide-to-perfect-yard-maintenance
  norristowns-aeration-seeding-secrets-for-lush-lawns
  norristown-lawn-care-mowing-to-seeding
  norristown-landscaping-spring-cleanup-tree-installation-tips
  spring-landscaping-in-norristown-aeration-seeding
  norristown-green-scape-aeration-to-weeding
)

for s in "${posts[@]}"; do
  html=$(curl -s -L --max-time 30 "${BASE}/${s}/")
  title=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<title>(.*?)<\/title>/si' | tr -d '\n' | sed 's/\t/ /g')
  desc=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<meta\s+name=["'"'"']description["'"'"']\s+content=["'"'"'](.*?)["'"'"']/si' | tr -d '\n' | sed 's/\t/ /g')
  pub=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /article:published_time["'"'"']\s+content=["'"'"'](.*?)["'"'"']/si' | tr -d '\n')
  ogimg=$(printf '%s' "$html" | perl -0777 -ne 'print "$1" if /<meta\s+property=["'"'"']og:image["'"'"']\s+content=["'"'"'](.*?)["'"'"']/si' | tr -d '\n')
  # Extract paragraph text from the post content; strip tags, join with ||
  body=$(printf '%s' "$html" | perl -0777 -ne '
    while (/<p[^>]*>(.*?)<\/p>/sig) {
      my $t=$1; $t=~s/<[^>]*>//g; $t=~s/\s+/ /g; $t=~s/^\s+|\s+$//g;
      print "$t||" if length($t) > 60;
    }' | sed 's/\t/ /g')
  echo -e "${s}\t${title}\t${desc}\t${pub}\t${ogimg}\t${body}" >> "$OUT"
  echo "post ${s}"
done
echo "DONE -> $OUT"
