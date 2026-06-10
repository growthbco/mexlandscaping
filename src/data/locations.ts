// Programmatic local-SEO location pages. The real <title>/description for each
// come from src/data/seo.generated.ts (keyed by path); this file builds the
// on-page content per city. Note: the live site's H1s contain a "Lawn Moving"
// typo — we generate correct "Lawn Mowing" headings here.

import { cities, type City } from "./site";

export type LocationKind = "lawn" | "snow";

export type LocationPage = {
  path: string;
  kind: LocationKind;
  city: City;
};

export const lawnPath = (slug: string) => `/lawn-mowing-services-in-${slug}-pa/`;
export const snowPath = (slug: string) =>
  `/snow-management-services-in-${slug}-pa/`;

export const locationPages: LocationPage[] = cities.flatMap((city) => [
  { path: lawnPath(city.slug), kind: "lawn" as const, city },
  { path: snowPath(city.slug), kind: "snow" as const, city },
]);

export function getLocationPage(path: string) {
  return locationPages.find((p) => p.path === path);
}

export function locationContent(page: LocationPage) {
  const city = page.city.name;
  if (page.kind === "lawn") {
    return {
      icon: "leaf" as const,
      h1: `Professional Lawn Mowing Services in ${city}, PA`,
      crumb: "Lawn Mowing",
      intro: `Keep your lawn looking pristine year-round with professional lawn mowing services in ${city}, PA. Mex Landscaping delivers precise mowing, clean edging, and detailed trimming for homes and businesses.`,
      highlights: [
        "Precision mowing on a reliable schedule",
        "Crisp edging along walks & beds",
        "Detailed trimming around features",
        "Residential & commercial properties",
      ],
      body: [
        {
          heading: `Reliable lawn care for ${city} homes & businesses`,
          text: `A great-looking lawn comes down to consistency and care. Our ${city} crews mow at the right height for your grass, edge clean lines, and trim the spots a mower can't reach — so your property always looks sharp.`,
        },
        {
          heading: "Mowing, edging & trimming — done right",
          text: `We treat every visit like it matters: sharp blades, careful patterns, and a tidy cleanup that leaves no clippings behind. Sign up for recurring service and never think about your lawn again.`,
        },
      ],
      cta: `Call (484) 261-6650 for a free lawn mowing quote in ${city}, PA.`,
    };
  }
  return {
    icon: "snow" as const,
    h1: `Commercial Snow Management Services in ${city}, PA`,
    crumb: "Snow Management",
    intro: `Stay safe and accessible all winter with expert snow management services in ${city}, PA. Mex Landscaping provides 24/7 snow removal, plowing, and de-icing for residential and commercial properties.`,
    highlights: [
      "24/7 storm monitoring & response",
      "Plowing for lots & driveways",
      "Salting & de-icing",
      "Documented commercial service",
    ],
    body: [
      {
        heading: `Keep your ${city} property clear & hazard-free`,
        text: `When the snow falls in ${city}, you need a team that's already on the road. We monitor every storm and respond around the clock to keep your driveways, walkways, and parking lots clear and safe.`,
      },
      {
        heading: "Plowing, salting & de-icing",
        text: `From pre-treatment ahead of a storm to plowing and post-storm de-icing, we handle the full job — with documented service that keeps commercial properties compliant and protected.`,
      },
    ],
    cta: `Call (484) 261-6650 to set up snow management in ${city}, PA before the next storm.`,
  };
}
