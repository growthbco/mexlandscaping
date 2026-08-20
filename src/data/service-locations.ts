// Service-in-location pages (GEO / AI-search play). These target the exact
// high-intent, localized queries homeowners ask ChatGPT/Perplexity and Google,
// e.g. "French drain in Norristown PA" or "retaining wall contractor Wayne PA".
// The audit (2026-08) showed competitors win these queries with dedicated
// service+town pages; this builds MEX's equivalent for the two validated,
// highest-intent services across the core service-area towns.
//
// Content is substantive (not thin): each page shares deep service expertise but
// is localized by town in the H1, intro, meta, area-served schema, and FAQ, and
// links to the matching real case study. {town} is interpolated at render time.

import { cities, type City } from "./site";

export type SvcFaq = { q: string; a: string };

export type ServiceDef = {
  key: string;
  /** URL becomes /{urlPrefix}-{townSlug}-pa/ */
  urlPrefix: string;
  /** Used in H1 as "{name} in {Town}, PA" */
  name: string;
  metaTitle: string; // may contain {town}
  metaDescription: string; // may contain {town}
  intro: string; // hero intro, may contain {town}
  image: string;
  relatedService: { label: string; href: string };
  relatedProject: { label: string; href: string };
  sections: { heading: string; text: string }[]; // may contain {town}
  faqs: SvcFaq[]; // may contain {town}
};

// Curated core towns (quality over quantity to avoid thin content at scale).
const CORE_TOWN_SLUGS = [
  "norristown",
  "king-of-prussia",
  "wayne",
  "bryn-mawr",
  "conshohocken",
  "plymouth-meeting",
  "blue-bell",
  "havertown",
  "gladwyne",
  "radnor",
];

export const svcLocTowns: City[] = cities.filter((c) => CORE_TOWN_SLUGS.includes(c.slug));

export const serviceDefs: ServiceDef[] = [
  {
    key: "drainage",
    urlPrefix: "drainage-in",
    name: "Drainage & French Drains",
    metaTitle: "French Drains & Yard Drainage in {town}, PA | Mex Landscaping",
    metaDescription:
      "Basement flooding, standing water, and drainage problems solved in {town}, PA. French drains, yard regrading, and dry creek beds designed by a licensed landscape architect. Free on-site estimates.",
    intro:
      "A basement that floods when it rains, a lawn that stays soggy for days, water pooling against the foundation: these are drainage problems, and they do not fix themselves. We solve them at the source for homeowners in {town}, PA, with French drains, yard regrading, and dry creek beds that move storm water off your property for good.",
    image: "/images/drainage-french-drain-graded.jpg",
    relatedService: { label: "Drainage & Storm Water", href: "/storm-water-management/" },
    relatedProject: {
      label: "See a French drain project we did in Norristown",
      href: "/projects/basement-flooding-french-drain-grading/",
    },
    sections: [
      {
        heading: "Drainage problems we solve in {town}",
        text: "If your basement takes on water every time it rains, water collects against the foundation, your yard stays soggy and unmowable, or mulch and soil wash out of the beds with every storm, the underlying issue is almost always that water has nowhere to go. On sloped {town} properties it can also mean runoff cutting channels across the yard or spilling toward the house. These are the exact problems our drainage work is built to fix, permanently, rather than moving them a few feet away.",
      },
      {
        heading: "How we fix it",
        text: "Our crew diagnoses where the water comes from and where it can safely discharge, then solves it with the right tools working together. A French drain, a buried gravel-wrapped perforated pipe, intercepts water in the ground and carries it away from the house. Yard regrading with heavy equipment reshapes the ground into a consistent natural slope, a minimum two percent, that pulls every storm off the foundation. Dry creek beds and rip-rap swales handle surface flow and read as landscaping the rest of the year, and downspouts are redirected to discharge onto the graded surface instead of dumping at the foundation.",
      },
      {
        heading: "Why homeowners in {town} call Mex Landscaping",
        text: "Drainage done wrong just relocates the problem. Our work is led by a Pennsylvania-licensed landscape architect, so systems are diagnosed, graded, and sized for the water they actually have to carry, then compacted and finished to last. We serve {town} and the surrounding Main Line and Montgomery County, and every project starts with a free on-site estimate so you get a real solution and a firm price, not a guess.",
      },
    ],
    faqs: [
      {
        q: "Why does my basement flood when it rains in {town}?",
        a: "Almost always because the yard has no slope to carry storm water away, so rain pools against the foundation and works its way inside. Sealing the basement from the inside rarely fixes it. The lasting solution is outside: a French drain to capture the water and a regrade that moves it away from the house.",
      },
      {
        q: "How much does a French drain cost in {town}?",
        a: "It depends on the length and depth of the run, where the water can discharge, and site access, so there is no honest flat number. We give you a firm price after a free on-site estimate, once we have diagnosed where the water is coming from and where it needs to go.",
      },
      {
        q: "Do I need a French drain or regrading?",
        a: "Often both. A French drain handles subsurface water; regrading handles surface water and pulls it off the foundation. We assess the property and recommend only what the drainage problem actually requires.",
      },
      {
        q: "Do you offer free drainage estimates in {town}?",
        a: "Yes. We provide free on-site estimates throughout {town} and the surrounding Main Line and Montgomery County. Call (484) 261-6650 to set one up.",
      },
    ],
  },
  {
    key: "retaining-walls",
    urlPrefix: "retaining-walls-in",
    name: "Retaining Walls",
    metaTitle: "Retaining Walls in {town}, PA | Mex Landscaping",
    metaDescription:
      "Engineered retaining walls in {town}, PA: segmental block and natural stone walls that hold slopes, drain properly, and last for decades. Designed by a licensed landscape architect. Free estimates.",
    intro:
      "A failing wall, a slope shedding soil, or a yard you cannot use because of the grade: a retaining wall built right solves all three. We design and build segmental block and natural stone retaining walls for homeowners in {town}, PA, engineered with the proper base and drainage so they hold for decades, not seasons.",
    image: "/images/wall-stone-after.webp",
    relatedService: { label: "Retaining & Seating Walls", href: "/retaining-walls/" },
    relatedProject: {
      label: "See a natural stone retaining wall we built",
      href: "/projects/natural-stone-retaining-wall-driveway/",
    },
    sections: [
      {
        heading: "Retaining walls we build in {town}",
        text: "We build segmental block walls, natural fieldstone walls, tiered walls, and seating walls, whatever the property and the look call for. Homeowners in {town} come to us to hold a slope that is failing or eroding, to carve level, usable space out of a hillside yard, to clean up the front of a property along the sidewalk, or to replace an old wall that is leaning, bulging, or already coming apart.",
      },
      {
        heading: "How we build a wall that lasts",
        text: "A retaining wall lives or dies on what you cannot see. Our crew excavates and compacts a proper aggregate base, builds in drainage behind the wall so water moves through instead of building pressure against it, sets the wall with the correct batter, and adds geogrid reinforcement into the slope on taller walls. We use heavy-duty equipment for the excavation and base work and premium block or stone for the face. Skipping the base and drainage is why so many walls fail in a few years; doing them right is why ours do not.",
      },
      {
        heading: "Why homeowners in {town} call Mex Landscaping",
        text: "Our work is led by a Pennsylvania-licensed landscape architect, so a wall is designed as an engineered structure and a finished part of the landscape at the same time, with drainage planned in from the start. We serve {town} and the surrounding Main Line and Montgomery County, and every wall starts with a free on-site estimate.",
      },
    ],
    faqs: [
      {
        q: "How much does a retaining wall cost in {town}?",
        a: "It depends on the length and height of the wall, the material, site access, and the drainage and base work required, so a flat number would be a guess. We give you a firm price after a free on-site estimate.",
      },
      {
        q: "Why do retaining walls fail?",
        a: "Almost always for two reasons: no drainage behind the wall, so water pressure builds and pushes it out, and an inadequate base. We build every wall with a compacted aggregate base and drainage behind the face, which is exactly what keeps it standing.",
      },
      {
        q: "Do I need an engineered retaining wall?",
        a: "Taller walls (generally over about four feet) and walls holding significant loads need engineering, and we handle that. Even shorter walls need proper base and drainage to last, which we build in as standard.",
      },
      {
        q: "Do you offer free retaining wall estimates in {town}?",
        a: "Yes. We provide free on-site estimates throughout {town} and the surrounding Main Line and Montgomery County. Call (484) 261-6650 to set one up.",
      },
    ],
  },
];

export type ServiceLocationPage = {
  path: string;
  service: ServiceDef;
  town: City;
};

export const serviceLocationPages: ServiceLocationPage[] = serviceDefs.flatMap((service) =>
  svcLocTowns.map((town) => ({
    path: `/${service.urlPrefix}-${town.slug}-pa/`,
    service,
    town,
  })),
);

export function fillTown(text: string, townName: string): string {
  return text.split("{town}").join(townName);
}
