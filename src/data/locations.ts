// Programmatic local-SEO location pages — repositioned to premium.
// The per-city "lawn mowing" pages were repurposed into "Landscape Design &
// Hardscaping in {city}" pages (new slugs; old lawn-mowing URLs 301 → these via
// vercel.json). Snow per-city pages are kept (real titles from seo.generated).

import { cities, type City } from "./site";

export type LocationKind = "design" | "snow";

export type LocationPage = {
  path: string;
  kind: LocationKind;
  city: City;
};

export const designPath = (slug: string) =>
  `/landscape-design-hardscaping-in-${slug}-pa/`;
export const snowPath = (slug: string) =>
  `/snow-management-services-in-${slug}-pa/`;

// Old lawn-mowing URLs we now redirect away from (used to build vercel.json).
export const oldLawnPath = (slug: string) =>
  `/lawn-mowing-services-in-${slug}-pa/`;

export const locationPages: LocationPage[] = cities.flatMap((city) => [
  { path: designPath(city.slug), kind: "design" as const, city },
  { path: snowPath(city.slug), kind: "snow" as const, city },
]);

export function getLocationPage(path: string) {
  return locationPages.find((p) => p.path === path);
}

export function locationContent(page: LocationPage) {
  const city = page.city.name;
  if (page.kind === "design") {
    return {
      icon: "leaf" as const,
      image: "/images/patio.jpg",
      h1: `Landscape Design & Hardscaping in ${city}, PA`,
      crumb: "Design & Hardscaping",
      metaTitle: `Landscape Design & Hardscaping in ${city}, PA | Mex Landscaping`,
      metaDescription: `Premium landscape design, hardscaping, patios, and outdoor living in ${city}, PA. Mex Landscaping designs and builds high-end outdoor spaces. Free estimate: (484) 261-6650.`,
      intro: `Mex Landscaping designs and builds high-end outdoor spaces in ${city}, PA: landscape redesigns, patios, fire features, walls, and complete outdoor living. One team, design through build.`,
      highlights: [
        "Landscape design & full redesigns",
        "Patios, walkways & retaining walls",
        "Fire pits & outdoor living",
        "Concrete, masonry & stone facades",
      ],
      body: [
        {
          heading: `Design-build landscaping for ${city}`,
          text: `From a complete property redesign to a custom patio and fire feature, we bring design and construction together under one roof for ${city} homeowners. You get a clear plan, skilled crews, and a finished space built to last.`,
        },
        {
          heading: "Hardscape, outdoor living & more",
          text: `Patios, walkways, driveways, retaining and seating walls, outdoor kitchens, water features, and architectural stone. It's the structural craft that turns a ${city} yard into an outdoor destination.`,
        },
      ],
      cta: `Call (484) 261-6650 for a free design consultation in ${city}, PA.`,
    };
  }
  return {
    icon: "snow" as const,
    image: undefined as string | undefined,
    h1: `Commercial Snow Management Services in ${city}, PA`,
    crumb: "Snow Management",
    metaTitle: undefined as string | undefined, // pulled from seo.generated
    metaDescription: undefined as string | undefined,
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
        text: `From pre-treatment ahead of a storm to plowing and post-storm de-icing, we handle the full job, with documented service that keeps commercial properties compliant and protected.`,
      },
    ],
    cta: `Call (484) 261-6650 to set up snow management in ${city}, PA before the next storm.`,
  };
}
