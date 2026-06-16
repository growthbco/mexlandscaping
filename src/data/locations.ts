// Programmatic local-SEO location pages — repositioned to premium.
// The per-city "lawn mowing" pages were repurposed into "Landscape Design &
// Hardscaping in {city}" pages (new slugs; old lawn-mowing URLs 301 → these via
// vercel.json). Snow per-city pages are kept (real titles from seo.generated).
//
// Priority cities (Phase 1) get genuinely differentiated copy + FAQs in
// `cityProfiles` below, built around true local geography/character so they
// read as unique pages rather than templated doorway pages. Remaining cities
// fall back to the base template until Phase 2.

import { cities, type City } from "./site";

export type LocationKind = "design" | "snow";

export type LocationPage = {
  path: string;
  kind: LocationKind;
  city: City;
};

export type LocBlock = { heading: string; text: string };
export type Faq = { q: string; a: string };

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

// ---------------------------------------------------------------------------
// Priority-city profiles: unique, locally-grounded design-build copy + FAQs.
// Local facts (county, township, neighboring towns, terrain/character) are
// true and public. No fabricated project counts, stats, or claims.
// ---------------------------------------------------------------------------

type CityProfile = {
  metaDescription: string;
  intro: string;
  designBody: LocBlock[];
  designFaqs: Faq[];
};

const cityProfiles: Record<string, CityProfile> = {
  norristown: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Norristown, PA. Mex Landscaping is based in Norristown and builds high-end outdoor spaces. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping is based in Norristown, PA, and we design and build high-end outdoor spaces right here in our home town: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living. One local team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Norristown, PA",
        text: "Norristown is our home base, and we take real pride in the work we do across the borough and the rest of Montgomery County. As a design-build company, we plan and install your project with one accountable team: full landscape redesigns, custom patios, retaining and seating walls, walkways, driveways, fire features, and outdoor living spaces. From the first sketch to the final stone, the people who design your space are the people who build it.",
      },
      {
        heading: "Built for Norristown's established properties",
        text: "Much of Norristown is made up of established neighborhoods with mature trees, older homes, and lots that slope toward the Schuylkill. Those properties bring real character and a few real challenges: tight grades, dated drainage, and hardscape that has settled over the decades. We handle them every day, with proper base prep, drainage, and grading that protect both your landscape and your foundation while bringing the space up to a modern standard.",
      },
      {
        heading: "Hardscaping and outdoor living in Norristown",
        text: "A patio, a fire pit, and a seating wall can turn an ordinary Norristown backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, and complete outdoor living spaces with fire features and outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Your neighbors' landscaping company",
        text: "Being based in Norristown means we are minutes away, not driving in from another county. We serve the borough along with East Norriton, West Norriton, Bridgeport, and the surrounding Montgomery County communities. Call (484) 261-6650 or request a free estimate, and we will come see the property, talk through your goals, and put together a clear plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "Is Mex Landscaping based in Norristown?",
        a: "Yes. Norristown is our home base, so we are local, close by, and familiar with the area's properties and conditions. We serve the borough along with East Norriton, West Norriton, Bridgeport, and the surrounding Montgomery County communities.",
      },
      {
        q: "Do you handle sloped or drainage-prone Norristown lots?",
        a: "Regularly. Many Norristown properties slope toward the river and have older or undersized drainage. We address grade and water as part of the design, with proper base prep, regrading, French drains or dry wells where needed, and retaining walls to create level, usable space.",
      },
      {
        q: "Do I need a permit for a patio or retaining wall in Norristown?",
        a: "It depends on the project. An at-grade patio often does not require a permit, while taller retaining walls and structural work frequently do under Norristown borough rules. We are familiar with local requirements and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in Norristown?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits and fire features, outdoor kitchens, drainage solutions, and landscape lighting. We can do a single feature or transform the whole property.",
      },
      {
        q: "How do I get a free estimate in Norristown?",
        a: "Call (484) 261-6650 or request an estimate through the site. Because we are based in town, we can usually get out to see your Norristown property quickly, measure the space, talk through materials and ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  "king-of-prussia": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in King of Prussia, PA. Mex Landscaping designs and builds high-end outdoor spaces in Upper Merion. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in King of Prussia, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for homes and businesses across Upper Merion Township. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in King of Prussia, PA",
        text: "King of Prussia, in Upper Merion Township, blends established residential neighborhoods with newer developments and a major commercial corridor. We design and build for all of it: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and outdoor living spaces. As a design-build company, one accountable team plans your project and installs it, so the result is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Landscaping for King of Prussia neighborhoods",
        text: "From long-established streets to newer subdivisions, King of Prussia homes deserve outdoor spaces that match the quality of the neighborhood. We create complete landscape designs with layered plantings, custom hardscape, drainage, and lighting, all planned together. Whether you are finishing a new-construction yard or reimagining an older property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Residential and commercial outdoor spaces",
        text: "King of Prussia is as much a business hub as a residential community, and we work on both sides. For homeowners, we build patios, walls, fire features, outdoor kitchens, and full landscape installations. For commercial properties, HOAs, and offices near the corporate corridor, we provide polished commercial landscape installations and ongoing maintenance that keep a property looking sharp and reflecting well on the business.",
      },
      {
        heading: "Serving Upper Merion and the surrounding area",
        text: "We are right nearby in Montgomery County and serve King of Prussia along with Wayne, Bridgeport, Norristown, and the rest of Upper Merion and the surrounding communities. Call (484) 261-6650 or request a free estimate, and we will visit the property, discuss your goals, and provide a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What parts of King of Prussia do you serve?",
        a: "We serve all of King of Prussia and Upper Merion Township, along with neighboring areas including Wayne, Bridgeport, and Norristown. We are based nearby in Montgomery County, so we cover the King of Prussia area regularly.",
      },
      {
        q: "Do you do commercial landscaping in King of Prussia?",
        a: "Yes. With King of Prussia's large commercial presence, we provide commercial landscape installation and maintenance for offices, HOAs, and businesses, in addition to residential design-build work. We can pair an installation with a recurring maintenance plan so the property stays sharp year-round.",
      },
      {
        q: "Do I need a permit for hardscaping in Upper Merion Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may under Upper Merion Township rules. We are familiar with local requirements and will tell you what your specific project needs before we begin.",
      },
      {
        q: "What outdoor projects do you build in King of Prussia?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting, for both homes and commercial properties.",
      },
      {
        q: "How do I get a free estimate in King of Prussia?",
        a: "Call (484) 261-6650 or request an estimate online. We will come out to your King of Prussia property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  "bryn-mawr": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Bryn Mawr, PA. Mex Landscaping builds high-end outdoor spaces for Main Line homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Bryn Mawr, PA: landscape redesigns, natural stone patios, retaining walls, fire features, and complete outdoor living for the Main Line's distinctive homes. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Bryn Mawr, PA",
        text: "Bryn Mawr sits at the heart of the Main Line, straddling Lower Merion and Radnor townships, and it is known for gracious, established homes and mature landscapes. We design and build to that standard: full landscape redesigns, natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build firm, the same team plans and installs your project, so the craftsmanship is consistent from concept to completion.",
      },
      {
        heading: "Landscaping for Bryn Mawr's historic homes",
        text: "Many Bryn Mawr properties feature historic stone architecture, mature trees, and established plantings that deserve a careful, design-led approach. We plan landscapes that respect the character of the home: layered, four-season plantings, natural stone hardscape that complements original architecture, and grading and drainage that protect mature trees and older foundations. The aim is work that looks like it has always belonged on the property.",
      },
      {
        heading: "Hardscaping and outdoor living that fit the architecture",
        text: "On a property with real architectural character, the hardscape has to match. We build patios, walkways, walls, and outdoor living spaces in natural flagstone, bluestone, and full stone, matching color and texture to the home so new work reads as original rather than added on. Fire features, seating walls, and outdoor kitchens are designed to feel integral to the estate, not dropped in.",
      },
      {
        heading: "Serving Bryn Mawr and the Main Line",
        text: "We serve Bryn Mawr along with neighboring Main Line communities including Haverford, Rosemont, Villanova, Gladwyne, and Ardmore. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your vision, and put together a clear, detailed plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "Do you work on historic or estate properties in Bryn Mawr?",
        a: "Yes. Many Bryn Mawr homes have historic stone architecture and mature landscapes, and we take a design-led approach that respects that character, matching natural stone and planting style to the home and protecting mature trees and older foundations through careful grading and drainage.",
      },
      {
        q: "What areas around Bryn Mawr do you serve?",
        a: "We serve Bryn Mawr and the surrounding Main Line, including Haverford, Rosemont, Villanova, Gladwyne, and Ardmore, across both Lower Merion and Radnor townships.",
      },
      {
        q: "Can you match natural stone to an older Bryn Mawr home?",
        a: "Yes. We work in natural flagstone, bluestone, and full stone, and we match color, texture, and detailing so new patios, walkways, and walls complement the original architecture and look like they have always been part of the property.",
      },
      {
        q: "Do I need a permit for hardscaping in Lower Merion Township?",
        a: "Often, depending on the project. At-grade patios may not require a permit, while taller retaining walls and structural work frequently do under Lower Merion or Radnor township rules. We are familiar with local requirements and handle what your project needs.",
      },
      {
        q: "How do I get a free estimate in Bryn Mawr?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Bryn Mawr property, walk the space with you, discuss materials and design, and provide a clear, no-obligation price.",
      },
    ],
  },

  wayne: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Wayne, PA. Mex Landscaping builds high-end outdoor spaces for Main Line homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Wayne, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for the Main Line's established homes. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Wayne, PA",
        text: "Wayne is one of the Main Line's most established communities, spanning Radnor and Tredyffrin townships, with gracious homes and a walkable, classic character. We design and build outdoor spaces to match: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and outdoor living. As a design-build company, one accountable team handles the design and the construction, so your finished space is cohesive and built to last.",
      },
      {
        heading: "Landscaping for Wayne's established properties",
        text: "Wayne homes tend to be settled, well-treed, and full of character, which calls for a thoughtful, design-led approach rather than a one-size-fits-all package. We create complete landscape plans with layered plantings for four-season interest, custom hardscape, drainage, and lighting, all designed together. Whether you are refreshing a single area or reimagining the whole property, we work to your goals with a clear plan and honest budget.",
      },
      {
        heading: "Hardscaping and outdoor living in Wayne",
        text: "From a natural stone patio off the back of the house to a full outdoor living space with a fire feature and kitchen, we build the hardscape that makes a Wayne property truly usable. Patios, walkways, retaining and seating walls, driveways, fire pits, and outdoor kitchens are all built in-house with the engineered base and drainage that keep them level and beautiful for decades.",
      },
      {
        heading: "Serving Wayne and the surrounding Main Line",
        text: "We serve Wayne along with nearby Main Line communities including Devon, Strafford, St. Davids, Radnor, and Villanova. Call (484) 261-6650 or request a free estimate, and we will visit the property, discuss your vision, and provide a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What townships and areas around Wayne do you serve?",
        a: "We serve Wayne across Radnor and Tredyffrin townships, along with nearby Main Line communities including Devon, Strafford, St. Davids, Radnor, and Villanova.",
      },
      {
        q: "Do you handle full landscape redesigns for Wayne homes?",
        a: "Yes. We do everything from refreshing a single area to reimagining an entire property, with a complete design that brings together plantings, hardscape, drainage, and lighting. Designing it all together is what produces a cohesive, finished result on an established Wayne property.",
      },
      {
        q: "Do I need a permit for hardscaping in Radnor or Tredyffrin Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may under Radnor or Tredyffrin township rules. We know the local requirements and handle what your project needs.",
      },
      {
        q: "What outdoor projects do you build in Wayne?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Wayne?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Wayne property, walk the space, discuss materials and design ideas, and provide a clear, no-obligation price.",
      },
    ],
  },

  conshohocken: {
    metaDescription:
      "Landscape design, hardscaping, retaining walls, and outdoor living in Conshohocken, PA. Mex Landscaping builds high-end outdoor spaces on Conshohocken's hillside lots. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Conshohocken, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living, built for the borough's hilly lots. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Conshohocken, PA",
        text: "Conshohocken is a revitalized riverfront borough in Montgomery County, with steep streets, a mix of rowhomes, twins, and newer development, and plenty of properties built on a grade. We design and build outdoor spaces suited to that terrain: landscape redesigns, patios, retaining and seating walls, walkways and steps, fire features, and outdoor living. As a design-build company, one team plans and installs the work, so the result is cohesive and engineered for the site.",
      },
      {
        heading: "Built for Conshohocken's hillside lots",
        text: "Conshohocken's hilly geography means a lot of properties have slope to manage, and that is exactly where retaining walls and terracing earn their keep. We build engineered retaining walls that turn a steep, unusable bank into level, livable yard, with the drainage and base prep that keep them straight for decades. Terraced walls can break a tall grade into a series of planting beds or level landings that look as good as they perform.",
      },
      {
        heading: "Making the most of a Conshohocken yard",
        text: "Many Conshohocken lots are compact, so smart design matters even more. We plan patios, walkways, seating walls, and fire features that maximize a smaller footprint, creating a genuine outdoor room without crowding the space. Thoughtful layout, built-in seating, and integrated lighting let a modest yard work hard and feel like a true extension of the home.",
      },
      {
        heading: "Serving Conshohocken and nearby communities",
        text: "We serve Conshohocken along with West Conshohocken, Plymouth Meeting, Lafayette Hill, Norristown, and the surrounding Montgomery County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, assess the grade and drainage, and put together a clear plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "Do you build retaining walls for Conshohocken's sloped lots?",
        a: "Yes, and it is some of our most common work in the area. Conshohocken's hilly terrain means many properties need retaining walls or terracing to create usable space. We build engineered walls with proper drainage and base prep so they hold the grade and stay straight for decades.",
      },
      {
        q: "Can you make a small Conshohocken yard more usable?",
        a: "Absolutely. We specialize in getting the most out of compact lots, with patios, seating walls, fire features, and lighting laid out to create a real outdoor room without crowding the space. Smart design is what makes a smaller yard feel like a genuine extension of the home.",
      },
      {
        q: "What areas around Conshohocken do you serve?",
        a: "We serve Conshohocken and West Conshohocken, along with Plymouth Meeting, Lafayette Hill, Norristown, and the surrounding Montgomery County communities.",
      },
      {
        q: "Do I need a permit for a retaining wall in Conshohocken?",
        a: "Often, yes. Taller retaining walls and structural work typically require a permit under Conshohocken borough rules, especially given how much grade is involved on local lots. We are familiar with the requirements and handle the engineering and permitting your wall needs.",
      },
      {
        q: "How do I get a free estimate in Conshohocken?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Conshohocken property, assess the slope and drainage, talk through your goals, and provide a clear, no-obligation price.",
      },
    ],
  },
};

export function locationContent(page: LocationPage) {
  const city = page.city.name;
  if (page.kind === "design") {
    const profile = cityProfiles[page.city.slug];
    return {
      icon: "leaf" as const,
      image: "/images/patio.jpg",
      h1: `Landscape Design & Hardscaping in ${city}, PA`,
      crumb: "Design & Hardscaping",
      metaTitle: `Landscape Design & Hardscaping in ${city}, PA | Mex Landscaping`,
      metaDescription:
        profile?.metaDescription ??
        `Premium landscape design, hardscaping, patios, and outdoor living in ${city}, PA. Mex Landscaping designs and builds high-end outdoor spaces. Free estimate: (484) 261-6650.`,
      intro:
        profile?.intro ??
        `Mex Landscaping designs and builds high-end outdoor spaces in ${city}, PA: landscape redesigns, patios, fire features, walls, and complete outdoor living. One team, design through build.`,
      highlights: [
        "Landscape design & full redesigns",
        "Patios, walkways & retaining walls",
        "Fire pits & outdoor living",
        "Concrete, masonry & stone facades",
      ],
      body: profile?.designBody ?? [
        {
          heading: `Design-build landscaping for ${city}`,
          text: `From a complete property redesign to a custom patio and fire feature, we bring design and construction together under one roof for ${city} homeowners. You get a clear plan, skilled crews, and a finished space built to last.`,
        },
        {
          heading: "Hardscape, outdoor living & more",
          text: `Patios, walkways, driveways, retaining and seating walls, outdoor kitchens, water features, and architectural stone. It's the structural craft that turns a ${city} yard into an outdoor destination.`,
        },
      ],
      faqs: profile?.designFaqs as Faq[] | undefined,
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
    faqs: undefined as Faq[] | undefined,
    cta: `Call (484) 261-6650 to set up snow management in ${city}, PA before the next storm.`,
  };
}
