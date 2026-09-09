// Keep a service/town page only when we have distinct local project evidence.
// The September 2026 audit found that town-name substitution alone produced
// duplicate pages. Historical definitions remain here to document the URLs;
// consolidated URLs have explicit permanent redirects in vercel.json.

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
      "Explore a real {town} French drain and yard-regrading project, with before-and-after photos. Request an on-site assessment for your property's drainage needs.",
    intro:
      "Standing water, a soggy lawn, or runoff near the foundation calls for a site-specific assessment. Our {town} project below shows how French drain installation and yard regrading can work together, with photographs of the property before and after the work.",
    image: "/images/drainage-french-drain-graded.jpg",
    relatedService: { label: "Drainage & Storm Water", href: "/storm-water-management/" },
    relatedProject: {
      label: "See a French drain project we did in Norristown",
      href: "/projects/basement-flooding-french-drain-grading/",
    },
    sections: [
      {
        heading: "Start with the water's path",
        text: "During an assessment we look at the ground around the house, downspout discharge, low spots, and possible outlets. Photos or video taken during rain help show where water collects and how long it remains. Basement moisture can have several causes, so the work should address the conditions found on your property rather than assume that every home needs the same drain.",
      },
      {
        heading: "How we fix it",
        text: "French drains collect water through a gravel-filled trench and perforated pipe; regrading changes the route of surface runoff. Dry creek beds and stone-lined swales are options for an open surface-water route. The selection depends on elevations, soil conditions, access, and a suitable discharge point. The slope and dimensions are determined for the site, not taken from a one-size-fits-all specification.",
      },
      {
        heading: "Why homeowners in {town} call Mex Landscaping",
        text: "Drainage done wrong just relocates the problem. Our work is led by a Pennsylvania-licensed landscape architect, so systems are diagnosed, graded, and sized for the water they actually have to carry, then compacted and finished to last. We serve {town} and the surrounding Main Line and Montgomery County, and every project starts with a free on-site estimate so you get a real solution and a firm price, not a guess.",
      },
    ],
    faqs: [
      {
        q: "Why does my basement flood when it rains in {town}?",
        a: "Runoff, downspout discharge, groundwater, and building conditions can all contribute. An on-site assessment helps determine whether exterior grading or drainage is appropriate and whether the situation also needs a building or waterproofing specialist.",
      },
      {
        q: "How much does a French drain cost in {town}?",
        a: "It depends on the length and depth of the run, where the water can discharge, and site access, so there is no honest flat number. We give you a firm price after a free on-site estimate, once we have diagnosed where the water is coming from and where it needs to go.",
      },
      {
        q: "Do I need a French drain or regrading?",
        a: "They address different water paths and may be used together, as shown in our Norristown project. We assess the source of the water, elevations, and discharge options before recommending either approach.",
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

const historicalServiceLocationPages: ServiceLocationPage[] = serviceDefs.flatMap((service) =>
  svcLocTowns.map((town) => ({
    path: `/${service.urlPrefix}-${town.slug}-pa/`,
    service,
    town,
  })),
);

// Norristown drainage has a documented local case study. The other 19 routes
// consolidate into the matching core service; no invented local jobs or facts.
export const serviceLocationPages = historicalServiceLocationPages.filter(
  ({ service, town }) => service.key === "drainage" && town.slug === "norristown",
);

export const consolidatedServiceLocationPages = historicalServiceLocationPages.filter(
  (page) => !serviceLocationPages.includes(page),
);

export function fillTown(text: string, townName: string): string {
  return text.split("{town}").join(townName);
}
