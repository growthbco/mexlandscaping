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
import { snowProfilesA } from "./snow-profiles-a";
import { snowProfilesB } from "./snow-profiles-b";

// Merged per-city snow content (Phase 3). See ./snow-profiles-{a,b}.ts.
const snowProfiles: Record<string, SnowProfile> = {
  ...snowProfilesA,
  ...snowProfilesB,
};

export type LocationKind = "design" | "snow";

export type LocationPage = {
  path: string;
  kind: LocationKind;
  city: City;
};

export type LocBlock = { heading: string; text: string };
export type Faq = { q: string; a: string };

// Per-city snow-management content (Phase 3). Differentiates the snow
// location pages by local geography and property mix (commercial corridors,
// estate driveways, hilly streets, walkable suburbs). Populated in
// ./snow-profiles-a.ts and ./snow-profiles-b.ts.
export type SnowProfile = {
  metaDescription: string;
  intro: string;
  snowBody: LocBlock[];
  snowFaqs: Faq[];
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

// ---------------------------------------------------------------------------
// Priority-city profiles: unique, locally-grounded design-build copy + FAQs.
// Local facts (county, township, neighboring towns, terrain/character) are
// true and public. No fabricated project counts, stats, or claims.
// ---------------------------------------------------------------------------

export type GalleryItem = { src: string; alt: string; caption: string };

type CityProfile = {
  metaDescription: string;
  intro: string;
  designBody: LocBlock[];
  designFaqs: Faq[];
  /** Optional real project photos rendered as a captioned grid on the page. */
  gallery?: GalleryItem[];
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
        text: "Norristown is our home base, and we take real pride in the work we do across the borough and the rest of Montgomery County. As a <a href=\"/landscape-design/\">design-build company</a>, we plan and install your project with one accountable team: full landscape redesigns, custom <a href=\"/patios/\">patios</a>, retaining and seating walls, walkways, driveways, fire features, and <a href=\"/outdoor-living/\">outdoor living spaces</a>. From the first sketch to the final stone, the people who design your space are the people who build it.",
      },
      {
        heading: "Built for Norristown's established properties",
        text: "Much of Norristown is made up of established neighborhoods with mature trees, older homes, and lots that slope toward the Schuylkill. Those properties bring real character and a few real challenges: tight grades, dated drainage, and hardscape that has settled over the decades. We handle them every day, with proper base prep, drainage, and grading that protect both your landscape and your foundation while bringing the space up to a modern standard.",
      },
      {
        heading: "Hardscaping and outdoor living in Norristown",
        text: "A patio, a fire pit, and a seating wall can turn an ordinary Norristown backyard into the place everyone gathers. We build paver and natural stone patios, <a href=\"/retaining-walls/\">retaining and seating walls</a>, walkways and steps, paver driveways, and complete outdoor living spaces with <a href=\"/fire-pits/\">fire features</a> and <a href=\"/outdoor-kitchens/\">outdoor kitchens</a>. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
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
        heading: "Expert landscape design in King of Prussia",
        text: "Every project starts with landscape design: a site-specific plan that balances plantings, hardscape, grading, and flow before anything is built. For King of Prussia properties that often means designing around newer construction, connecting a patio to the house cleanly, and planning four-season interest so the yard looks intentional from day one. Because the designer and the build crew are the same company, the plan you approve is the landscape you get.",
      },
      {
        heading: "Landscaping for King of Prussia neighborhoods",
        text: "From long-established streets to newer subdivisions, King of Prussia homes deserve outdoor spaces that match the quality of the neighborhood. We create complete landscape designs with layered plantings, custom hardscape, drainage, and lighting, all planned together. Whether you are finishing a new-construction yard or reimagining an older property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Patios and retaining walls for King of Prussia homes",
        text: "Hardscaping is where a King of Prussia backyard becomes an outdoor room. We build paver and natural stone patios on engineered, compacted bases that stay level through Pennsylvania freeze-thaw, and retaining and seating walls that turn sloped or unusable ground into level living space. Fire pits, walkways, steps, and outdoor kitchens complete the picture, all matched to the home's materials and style.",
      },
      {
        heading: "Landscape lighting and drainage in King of Prussia",
        text: "The details that make a landscape work long-term are the ones you plan up front. We install low-voltage landscape lighting that extends evenings outdoors and adds safety and presence after dark, and we engineer drainage, French drains, dry wells, downspout routing, and grading, so water moves away from the house instead of pooling in the lawn. Both are designed into the master plan rather than bolted on later.",
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
    gallery: [
      {
        src: "/images/pergola-patio.webp",
        alt: "Custom cedar pergola built over a paver patio by Mex Landscaping",
        caption: "Custom cedar pergola over a paver patio",
      },
      {
        src: "/images/wall-block-curved.webp",
        alt: "Curved block retaining wall with steps built by Mex Landscaping",
        caption: "Curved retaining wall and steps",
      },
      {
        src: "/images/walkway-cobble.webp",
        alt: "Paver walkway with cobblestone edging installed by Mex Landscaping",
        caption: "Paver walkway with cobble edging",
      },
    ],
    designFaqs: [
      {
        q: "Do you offer landscape design services in King of Prussia?",
        a: "Yes. Landscape design is the core of what we do in King of Prussia. We create a site-specific plan covering plantings, hardscape, grading, drainage, and lighting, then our own crews build it. One accountable team from the first sketch to the finished space.",
      },
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

  "plymouth-meeting": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Plymouth Meeting, PA. Mex Landscaping builds high-end outdoor spaces across Plymouth Township. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Plymouth Meeting, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for homes and businesses in Plymouth Township. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Plymouth Meeting, PA",
        text: "Plymouth Meeting, in Plymouth Township, Montgomery County, mixes established residential neighborhoods with a busy commercial core around the mall and nearby office parks. We design and build for both: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and outdoor living spaces. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Landscaping for Plymouth Meeting properties",
        text: "Plymouth Meeting homes range from settled, well-treed streets to newer developments, and each calls for its own approach. We create complete landscape plans with layered, four-season plantings, custom hardscape, drainage, and lighting, all designed together. Whether you are finishing a newer yard or refreshing an older property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Residential and commercial outdoor spaces",
        text: "With its blend of homes and corporate offices, Plymouth Meeting keeps us working on both sides. For homeowners, we build patios, retaining and seating walls, fire features, outdoor kitchens, and full landscape installations. For offices, HOAs, and commercial sites near the Plymouth Meeting Mall area, we provide polished commercial landscape installation and maintenance that keep a property looking sharp and reflecting well on the business.",
      },
      {
        heading: "Serving Plymouth Township and nearby communities",
        text: "We serve Plymouth Meeting along with Conshohocken, Norristown, Lafayette Hill, Blue Bell, and the surrounding Montgomery County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Plymouth Meeting do you serve?",
        a: "We serve Plymouth Meeting and the rest of Plymouth Township, along with neighboring communities including Conshohocken, Norristown, Lafayette Hill, and Blue Bell. We are based nearby in Montgomery County, so we cover the area regularly.",
      },
      {
        q: "Do you do commercial landscaping in Plymouth Meeting?",
        a: "Yes. Given Plymouth Meeting's mix of homes and corporate offices, we provide commercial landscape installation and maintenance for offices, HOAs, and businesses, in addition to residential design-build work. We can pair an installation with a recurring maintenance plan to keep the property sharp year-round.",
      },
      {
        q: "Do I need a permit for hardscaping in Plymouth Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and permit requirements vary by township. We are familiar with local requirements and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in Plymouth Meeting?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting, for both homes and commercial properties.",
      },
      {
        q: "How do I get a free estimate in Plymouth Meeting?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Plymouth Meeting property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  gladwyne: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Gladwyne, PA. Mex Landscaping builds high-end outdoor spaces for Main Line estate properties. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Gladwyne, PA: landscape redesigns, natural stone patios, retaining walls, fire features, and complete outdoor living for the Main Line's wooded estate properties. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Gladwyne, PA",
        text: "Gladwyne, in Lower Merion Township, is one of the Main Line's most affluent communities, known for large, wooded estate lots and mature trees. We design and build to that standard: full landscape redesigns, natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build firm, the same team plans and installs your project, so the craftsmanship stays consistent from concept to completion.",
      },
      {
        heading: "Built for Gladwyne's wooded estate lots",
        text: "Gladwyne properties tend to be large and heavily wooded, with mature specimen trees and established grounds that reward a careful, design-led approach. We plan landscapes that work with the existing canopy: layered, four-season plantings, natural stone hardscape that suits the setting, and grading and drainage that protect mature trees and the surrounding terrain. The goal is work that feels like it has always belonged on the estate.",
      },
      {
        heading: "Hardscaping and outdoor living for larger properties",
        text: "On an estate lot, hardscape can do a lot more than connect a door to a driveway. We build expansive natural stone patios, walkways and steps, retaining and seating walls, fire features, and full outdoor living spaces with outdoor kitchens, all built in-house with the engineered base and drainage that keep them level for decades. On wooded, sloping ground, retaining walls and terracing turn challenging grade into usable, beautiful space.",
      },
      {
        heading: "Serving Gladwyne and the Main Line",
        text: "We serve Gladwyne along with neighboring Main Line communities including Bryn Mawr, Villanova, Penn Valley, and the rest of Lower Merion Township. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your vision, and put together a clear, detailed plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "Do you work on large estate properties in Gladwyne?",
        a: "Yes. Many Gladwyne lots are large and heavily wooded, and we take a design-led approach suited to estate grounds, working with mature trees, planning natural stone hardscape that fits the setting, and protecting the terrain through careful grading and drainage.",
      },
      {
        q: "What areas around Gladwyne do you serve?",
        a: "We serve Gladwyne and the surrounding Main Line in Lower Merion Township, including Bryn Mawr, Villanova, and Penn Valley, along with the broader Montgomery County area.",
      },
      {
        q: "Can you handle wooded or sloping Gladwyne lots?",
        a: "Regularly. Gladwyne's wooded estate lots often have grade and mature trees to work around. We plan retaining walls, terracing, and drainage that turn sloping ground into usable space while protecting the existing canopy and the surrounding landscape.",
      },
      {
        q: "Do I need a permit for hardscaping in Lower Merion Township?",
        a: "Often, depending on the project. At-grade patios may not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and handle what your project needs.",
      },
      {
        q: "How do I get a free estimate in Gladwyne?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Gladwyne property, walk the grounds with you, discuss materials and design, and provide a clear, no-obligation price.",
      },
    ],
  },

  "newtown-square": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Newtown Square, PA. Mex Landscaping builds high-end outdoor spaces across Newtown Township. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Newtown Square, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for Newtown Township properties. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Newtown Square, PA",
        text: "Newtown Square, in Newtown Township, Delaware County, is a suburban community with a healthy mix of established neighborhoods and some larger lots. We design and build to fit: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Landscaping for Newtown Square properties",
        text: "Newtown Square homes range from settled subdivisions to properties with room to spread out, and each rewards a tailored plan rather than a one-size-fits-all package. We create complete landscape designs with layered, four-season plantings, custom hardscape, drainage, and lighting, all planned together. Whether you have a compact yard or a larger lot, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Hardscaping and outdoor living in Newtown Square",
        text: "A patio, a fire feature, and a seating wall can turn an ordinary Newtown Square backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Serving Newtown Township and nearby communities",
        text: "We serve Newtown Square along with Broomall, Edgmont, Marple, and the surrounding Delaware County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Newtown Square do you serve?",
        a: "We serve Newtown Square and the rest of Newtown Township, along with neighboring communities including Broomall, Edgmont, and Marple, across Delaware County and the surrounding area.",
      },
      {
        q: "Can you design landscaping for larger Newtown Square lots?",
        a: "Yes. Some Newtown Square properties have room to spread out, and we plan complete landscapes for them, bringing together plantings, expansive hardscape, drainage, and lighting so a larger lot reads as one cohesive, finished space.",
      },
      {
        q: "Do I need a permit for hardscaping in Newtown Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we begin.",
      },
      {
        q: "What outdoor projects do you build in Newtown Square?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Newtown Square?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Newtown Square property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  "east-norriton": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in East Norriton, PA. Mex Landscaping is based next door in Norristown and builds high-end outdoor spaces. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in East Norriton, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living. We are based right next door in Norristown. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in East Norriton, PA",
        text: "East Norriton, in East Norriton Township, sits directly next to Norristown, our home base, so this is very much our backyard. We design and build complete outdoor spaces here with one accountable team: full landscape redesigns, custom patios, retaining and seating walls, walkways, driveways, fire features, and outdoor living spaces. From the first sketch to the final stone, the people who design your space are the people who build it.",
      },
      {
        heading: "Built for East Norriton's established neighborhoods",
        text: "East Norriton is made up largely of established suburban neighborhoods with settled homes, mature plantings, and yards that have matured over the decades. Those properties bring real character along with a few practical challenges: dated drainage, settled hardscape, and grading that has shifted over time. We handle them with proper base prep, drainage, and grading that protect your landscape and foundation while bringing the space up to a modern standard.",
      },
      {
        heading: "Hardscaping and outdoor living in East Norriton",
        text: "A patio, a fire pit, and a seating wall can turn an ordinary East Norriton backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire features, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Your neighbors' landscaping company",
        text: "Being based in Norristown means we are minutes from East Norriton, not driving in from another county. We serve the township along with West Norriton, Norristown, Plymouth Meeting, and the surrounding Montgomery County communities. Call (484) 261-6650 or request a free estimate, and we will come see the property, talk through your goals, and put together a clear plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "Are you local to East Norriton?",
        a: "Yes. We are based right next door in Norristown, so we are minutes from East Norriton and familiar with the area's properties and conditions. We serve the township along with West Norriton, Norristown, and Plymouth Meeting.",
      },
      {
        q: "Do you handle established or settled East Norriton lots?",
        a: "Regularly. Many East Norriton properties are in established neighborhoods with older drainage and settled hardscape. We address grade and water as part of the design, with proper base prep, regrading, and drainage solutions where needed, so the finished space holds up.",
      },
      {
        q: "Do I need a permit for a patio or retaining wall in East Norriton?",
        a: "It depends on the project. An at-grade patio often does not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in East Norriton?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting. We can do a single feature or transform the whole property.",
      },
      {
        q: "How do I get a free estimate in East Norriton?",
        a: "Call (484) 261-6650 or request an estimate online. Because we are based right next door in Norristown, we can usually get out to your East Norriton property quickly, measure the space, talk through ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  malvern: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Malvern, PA. Mex Landscaping builds high-end outdoor spaces for Chester County homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Malvern, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for Chester County homes. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Malvern, PA",
        text: "Malvern is an affluent borough in Chester County, surrounded by a suburban landscape of established homes and newer developments near Frazer and the Great Valley. We design and build to match: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Landscaping for Malvern properties",
        text: "Malvern homes range from settled in-town streets to newer subdivisions in the surrounding township, and each deserves a tailored plan rather than a packaged solution. We create complete landscape designs with layered, four-season plantings, custom hardscape, drainage, and lighting, all planned together. Whether you are finishing a new-construction yard or refreshing an established property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Hardscaping and outdoor living in Malvern",
        text: "From a natural stone patio off the back of the house to a full outdoor living space with a fire feature and kitchen, we build the hardscape that makes a Malvern property truly usable. Patios, walkways, retaining and seating walls, driveways, fire pits, and outdoor kitchens are all built in-house with the engineered base and drainage that keep them level and beautiful for decades.",
      },
      {
        heading: "Serving Malvern and the surrounding area",
        text: "We serve Malvern along with Paoli, Frazer, the Great Valley area, and the surrounding Chester County communities. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your vision, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Malvern do you serve?",
        a: "We serve Malvern along with nearby Chester County communities including Paoli, Frazer, and the Great Valley area. We cover the surrounding Main Line and Chester County area regularly.",
      },
      {
        q: "Do you handle full landscape redesigns for Malvern homes?",
        a: "Yes. We do everything from refreshing a single area to reimagining an entire property, with a complete design that brings together plantings, hardscape, drainage, and lighting. Designing it all together is what produces a cohesive, finished result.",
      },
      {
        q: "Do I need a permit for hardscaping in the Malvern area?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township and borough. We are familiar with local rules and handle what your project needs.",
      },
      {
        q: "What outdoor projects do you build in Malvern?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Malvern?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Malvern property, walk the space, discuss materials and design ideas, and provide a clear, no-obligation price.",
      },
    ],
  },

  paoli: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Paoli, PA. Mex Landscaping builds high-end outdoor spaces for Main Line homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Paoli, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for this classic Main Line train town. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Paoli, PA",
        text: "Paoli is a classic Main Line train town spanning Tredyffrin and Willistown townships in Chester County, with established homes and a walkable, settled character. We design and build to match: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team handles the design and the construction, so your finished space is cohesive and built to last.",
      },
      {
        heading: "Landscaping for Paoli's established properties",
        text: "Paoli homes tend to be settled and full of character, which calls for a thoughtful, design-led approach rather than a one-size-fits-all package. We create complete landscape plans with layered plantings for four-season interest, custom hardscape, drainage, and lighting, all designed together. Whether you are refreshing a single area or reimagining the whole property, we work to your goals with a clear plan and an honest budget.",
      },
      {
        heading: "Hardscaping and outdoor living in Paoli",
        text: "From a natural stone patio off the back of the house to a full outdoor living space with a fire feature and kitchen, we build the hardscape that makes a Paoli property truly usable. Patios, walkways, retaining and seating walls, driveways, fire pits, and outdoor kitchens are all built in-house with the engineered base and drainage that keep them level and beautiful for decades.",
      },
      {
        heading: "Serving Paoli and the surrounding Main Line",
        text: "We serve Paoli along with nearby Main Line communities including Malvern, Berwyn, Devon, and the surrounding Chester County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, discuss your vision, and provide a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What townships and areas around Paoli do you serve?",
        a: "We serve Paoli across Tredyffrin and Willistown townships, along with nearby Main Line communities including Malvern, Berwyn, and Devon, and the surrounding Chester County area.",
      },
      {
        q: "Do you handle full landscape redesigns for Paoli homes?",
        a: "Yes. We do everything from refreshing a single area to reimagining an entire property, with a complete design that brings together plantings, hardscape, drainage, and lighting. Designing it all together is what produces a cohesive result on an established Paoli property.",
      },
      {
        q: "Do I need a permit for hardscaping in the Paoli area?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township. We know the local landscape and handle what your project needs.",
      },
      {
        q: "What outdoor projects do you build in Paoli?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Paoli?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Paoli property, walk the space, discuss materials and design ideas, and provide a clear, no-obligation price.",
      },
    ],
  },

  villanova: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Villanova, PA. Mex Landscaping builds high-end outdoor spaces for Main Line homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Villanova, PA: landscape redesigns, natural stone patios, retaining walls, fire features, and complete outdoor living for the Main Line's gracious homes. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Villanova, PA",
        text: "Villanova sits at the heart of the Main Line, straddling Radnor and Lower Merion townships, and is known both for Villanova University and for gracious, established homes. We design and build to that standard: full landscape redesigns, natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build firm, the same team plans and installs your project, so the craftsmanship stays consistent from concept to completion.",
      },
      {
        heading: "Landscaping for Villanova's gracious homes",
        text: "Many Villanova properties feature established architecture, mature trees, and settled grounds that deserve a careful, design-led approach. We plan landscapes that respect the character of the home: layered, four-season plantings, natural stone hardscape that complements the architecture, and grading and drainage that protect mature trees and older foundations. The aim is work that looks like it has always belonged on the property.",
      },
      {
        heading: "Hardscaping and outdoor living that fit the architecture",
        text: "On a property with real architectural character, the hardscape has to match. We build patios, walkways, walls, and outdoor living spaces in natural flagstone, bluestone, and full stone, matching color and texture to the home so new work reads as original rather than added on. Fire features, seating walls, and outdoor kitchens are designed to feel integral to the property, not dropped in.",
      },
      {
        heading: "Landscape construction and installation in Villanova",
        text: "Design is only half the job; landscape construction is where a plan becomes a property. Our own crews handle the full installation: excavation and grading, drainage, engineered base work, stone and paver construction, planting, and lighting. Unlike firms that design on paper and hand the plan to a separate construction crew, the people who design your Villanova landscape are the people who build it, so nothing is lost between the drawing and the ground. We also execute plans from independent landscape architects when a design already exists.",
      },
      {
        heading: "Serving Villanova and the Main Line",
        text: "We serve Villanova along with neighboring Main Line communities including Bryn Mawr, Wayne, Rosemont, and Radnor, across both Radnor and Lower Merion townships. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your vision, and put together a clear, detailed plan and price.",
      },
    ],
    gallery: [
      {
        src: "/images/wall-stone-after.webp",
        alt: "Hand-laid natural fieldstone retaining wall and stone steps by Mex Landscaping",
        caption: "Hand-laid natural fieldstone wall and steps",
      },
      {
        src: "/images/firepit-lit.webp",
        alt: "Custom stone fire pit and patio at dusk built by Mex Landscaping",
        caption: "Custom stone fire pit at dusk",
      },
      {
        src: "/images/design-maple-beds.webp",
        alt: "Layered planting beds installed around a mature maple by Mex Landscaping",
        caption: "Layered planting beds around a mature maple",
      },
    ],
    designFaqs: [
      {
        q: "Do you handle landscape construction in Villanova?",
        a: "Yes. Our own crews handle the complete landscape construction: excavation, grading, drainage, engineered bases, stone and paver work, planting, and lighting. We build the landscapes we design, and we can also execute an existing plan from an independent landscape architect.",
      },
      {
        q: "What areas around Villanova do you serve?",
        a: "We serve Villanova and the surrounding Main Line across Radnor and Lower Merion townships, including Bryn Mawr, Wayne, Rosemont, and Radnor.",
      },
      {
        q: "Do you work on gracious or established properties in Villanova?",
        a: "Yes. Many Villanova homes have established architecture and mature landscapes, and we take a design-led approach that respects that character, matching natural stone and planting style to the home and protecting mature trees and older foundations through careful grading and drainage.",
      },
      {
        q: "Can you match natural stone to a Villanova home?",
        a: "Yes. We work in natural flagstone, bluestone, and full stone, and we match color, texture, and detailing so new patios, walkways, and walls complement the existing architecture and look like they have always been part of the property.",
      },
      {
        q: "Do I need a permit for hardscaping in Radnor or Lower Merion Township?",
        a: "Often, depending on the project. At-grade patios may not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and handle what your project needs.",
      },
      {
        q: "How do I get a free estimate in Villanova?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Villanova property, walk the space with you, discuss materials and design, and provide a clear, no-obligation price.",
      },
    ],
  },

  eagleville: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Eagleville, PA. Mex Landscaping is based nearby in Norristown and builds high-end outdoor spaces. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Eagleville, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for Lower Providence Township. We are based nearby in Norristown. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Eagleville, PA",
        text: "Eagleville, in Lower Providence Township, Montgomery County, is a suburban community just minutes from our Norristown home base. We design and build complete outdoor spaces here with one accountable team: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and outdoor living spaces. From the first sketch to the final stone, the people who design your space are the people who build it.",
      },
      {
        heading: "Landscaping for Eagleville properties",
        text: "Eagleville is a settled suburban community with a mix of established neighborhoods and newer homes, each rewarding a tailored plan rather than a packaged solution. We create complete landscape designs with layered, four-season plantings, custom hardscape, drainage, and lighting, all planned together. Whether you are finishing a newer yard or refreshing an established property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Hardscaping and outdoor living in Eagleville",
        text: "A patio, a fire feature, and a seating wall can turn an ordinary Eagleville backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Serving Eagleville and nearby communities",
        text: "Being based in Norristown means we are minutes from Eagleville. We serve the area along with Norristown, Audubon, Collegeville, and the surrounding Montgomery County communities. Call (484) 261-6650 or request a free estimate, and we will come see the property, talk through your goals, and put together a clear plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "Are you local to Eagleville?",
        a: "Yes. We are based nearby in Norristown, so we are minutes from Eagleville and familiar with the area. We serve Lower Providence Township along with Norristown, Audubon, and Collegeville.",
      },
      {
        q: "What areas around Eagleville do you serve?",
        a: "We serve Eagleville and the rest of Lower Providence Township, along with neighboring communities including Norristown, Audubon, and Collegeville, across the surrounding Montgomery County area.",
      },
      {
        q: "Do I need a permit for a patio or retaining wall in Eagleville?",
        a: "It depends on the project. An at-grade patio often does not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in Eagleville?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting. We can do a single feature or transform the whole property.",
      },
      {
        q: "How do I get a free estimate in Eagleville?",
        a: "Call (484) 261-6650 or request an estimate online. Because we are based nearby in Norristown, we can usually get out to your Eagleville property quickly, measure the space, talk through ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  broomall: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Broomall, PA. Mex Landscaping builds high-end outdoor spaces across Marple Township. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Broomall, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for Marple Township properties. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Broomall, PA",
        text: "Broomall, in Marple Township, Delaware County, is an established suburban community of settled neighborhoods and well-treed yards. We design and build to fit: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Built for Broomall's established neighborhoods",
        text: "Broomall is made up largely of established suburban streets with settled homes, mature plantings, and yards that have matured over the decades. Those properties bring real character along with a few practical challenges: dated drainage, settled hardscape, and grading that has shifted over time. We handle them with proper base prep, drainage, and grading that protect your landscape and foundation while bringing the space up to a modern standard.",
      },
      {
        heading: "Hardscaping and outdoor living in Broomall",
        text: "A patio, a fire pit, and a seating wall can turn an ordinary Broomall backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire features, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Serving Marple Township and nearby communities",
        text: "We serve Broomall along with Newtown Square, Havertown, Springfield, and the surrounding Delaware County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Broomall do you serve?",
        a: "We serve Broomall and the rest of Marple Township, along with neighboring communities including Newtown Square, Havertown, and Springfield, across Delaware County and the surrounding area.",
      },
      {
        q: "Do you handle established or settled Broomall lots?",
        a: "Regularly. Many Broomall properties are in established neighborhoods with older drainage and settled hardscape. We address grade and water as part of the design, with proper base prep, regrading, and drainage solutions where needed, so the finished space holds up.",
      },
      {
        q: "Do I need a permit for a patio or retaining wall in Marple Township?",
        a: "It depends on the project. An at-grade patio often does not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in Broomall?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting. We can do a single feature or transform the whole property.",
      },
      {
        q: "How do I get a free estimate in Broomall?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Broomall property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  "blue-bell": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Blue Bell, PA. Mex Landscaping builds high-end outdoor spaces across Whitpain Township. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Blue Bell, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for homes and businesses in Whitpain Township. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Blue Bell, PA",
        text: "Blue Bell, in Whitpain Township, Montgomery County, is an affluent suburban community that blends gracious homes with corporate offices. We design and build for both: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Landscaping for Blue Bell properties",
        text: "Blue Bell homes tend to be settled and well-appointed, deserving outdoor spaces that match the quality of the neighborhood. We create complete landscape designs with layered, four-season plantings, custom hardscape, drainage, and lighting, all planned together. Whether you are finishing a newer yard or reimagining an established property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Residential and commercial outdoor spaces",
        text: "With its mix of affluent homes and corporate offices, Blue Bell keeps us working on both sides. For homeowners, we build patios, retaining and seating walls, fire features, outdoor kitchens, and full landscape installations. For offices, HOAs, and commercial sites, we provide polished commercial landscape installation and maintenance that keep a property looking sharp and reflecting well on the business.",
      },
      {
        heading: "Serving Whitpain Township and nearby communities",
        text: "We serve Blue Bell along with Plymouth Meeting, Ambler, Norristown, and the surrounding Montgomery County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Blue Bell do you serve?",
        a: "We serve Blue Bell and the rest of Whitpain Township, along with neighboring communities including Plymouth Meeting, Ambler, and Norristown, across the surrounding Montgomery County area.",
      },
      {
        q: "Do you do commercial landscaping in Blue Bell?",
        a: "Yes. Given Blue Bell's mix of affluent homes and corporate offices, we provide commercial landscape installation and maintenance for offices, HOAs, and businesses, in addition to residential design-build work. We can pair an installation with a recurring maintenance plan to keep the property sharp year-round.",
      },
      {
        q: "Do I need a permit for hardscaping in Whitpain Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we begin.",
      },
      {
        q: "What outdoor projects do you build in Blue Bell?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting, for both homes and commercial properties.",
      },
      {
        q: "How do I get a free estimate in Blue Bell?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Blue Bell property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  worcester: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Worcester, PA. Mex Landscaping builds high-end outdoor spaces on Worcester Township's larger lots. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Worcester, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for Worcester Township's larger lots. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Worcester, PA",
        text: "Worcester, in Worcester Township, Montgomery County, has a more rural and open character than many of its neighbors, with larger lots and room to spread out. We design and build to suit: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Built for Worcester's larger lots",
        text: "With its more open, semi-rural setting and larger properties, Worcester rewards landscape design that makes the most of the space. We plan complete landscapes for bigger lots: layered, four-season plantings, expansive hardscape, drainage, and lighting, all designed together so the property reads as one cohesive, finished space. We work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Hardscaping and outdoor living in Worcester",
        text: "On a larger Worcester property, hardscape can do a lot more than connect a door to a driveway. We build generous natural stone and paver patios, walkways and steps, retaining and seating walls, driveways, fire features, and full outdoor living spaces with outdoor kitchens, all built in-house with the engineered base and drainage that keep them level and beautiful for decades.",
      },
      {
        heading: "Serving Worcester and nearby communities",
        text: "We serve Worcester along with Collegeville, Blue Bell, Lansdale, and the surrounding Montgomery County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Worcester do you serve?",
        a: "We serve Worcester and the rest of Worcester Township, along with neighboring communities including Collegeville, Blue Bell, and Lansdale, across the surrounding Montgomery County area.",
      },
      {
        q: "Can you design landscaping for larger Worcester lots?",
        a: "Yes. Worcester's more open, semi-rural setting means many properties are larger, and we plan complete landscapes for them, bringing together plantings, expansive hardscape, drainage, and lighting so a bigger lot reads as one cohesive, finished space.",
      },
      {
        q: "Do I need a permit for hardscaping in Worcester Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we begin.",
      },
      {
        q: "What outdoor projects do you build in Worcester?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Worcester?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Worcester property, walk the space, discuss materials and design ideas, and provide a clear, no-obligation price.",
      },
    ],
  },

  whitemarsh: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Whitemarsh, PA. Mex Landscaping builds high-end outdoor spaces in Whitemarsh Township's wooded areas. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Whitemarsh, PA: landscape redesigns, natural stone patios, retaining walls, fire features, and complete outdoor living for the township's wooded, affluent properties. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Whitemarsh, PA",
        text: "Whitemarsh Township, in Montgomery County, is known for its wooded, affluent areas and gracious homes. We design and build to that standard: full landscape redesigns, natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build firm, the same team plans and installs your project, so the craftsmanship stays consistent from concept to completion.",
      },
      {
        heading: "Built for Whitemarsh's wooded properties",
        text: "Many Whitemarsh properties are well-treed and set on character-rich grounds that reward a careful, design-led approach. We plan landscapes that work with the existing canopy: layered, four-season plantings, natural stone hardscape that suits the setting, and grading and drainage that protect mature trees and older foundations. The goal is work that feels like it has always belonged on the property.",
      },
      {
        heading: "Hardscaping and outdoor living in Whitemarsh",
        text: "On a wooded, character-rich property, the hardscape should match the setting. We build natural stone and paver patios, walkways and steps, retaining and seating walls, driveways, fire features, and full outdoor living spaces with outdoor kitchens, all built in-house with the engineered base and drainage that keep them level for decades. On sloping, wooded ground, retaining walls and terracing turn challenging grade into usable space.",
      },
      {
        heading: "Serving Whitemarsh and nearby communities",
        text: "We serve Whitemarsh along with Lafayette Hill, Conshohocken, Plymouth Meeting, and the surrounding Montgomery County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your vision, and put together a clear plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Whitemarsh do you serve?",
        a: "We serve Whitemarsh Township along with neighboring communities including Lafayette Hill, Conshohocken, and Plymouth Meeting, across the surrounding Montgomery County area.",
      },
      {
        q: "Can you handle wooded or sloping Whitemarsh lots?",
        a: "Regularly. Whitemarsh's wooded properties often have grade and mature trees to work around. We plan retaining walls, terracing, and drainage that turn sloping ground into usable space while protecting the existing canopy and the surrounding landscape.",
      },
      {
        q: "Can you match natural stone to a Whitemarsh home?",
        a: "Yes. We work in natural flagstone, bluestone, and full stone, and we match color, texture, and detailing so new patios, walkways, and walls complement the home and the wooded setting and look like they have always been part of the property.",
      },
      {
        q: "Do I need a permit for hardscaping in Whitemarsh Township?",
        a: "Often, depending on the project. At-grade patios may not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and handle what your project needs.",
      },
      {
        q: "How do I get a free estimate in Whitemarsh?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Whitemarsh property, walk the space with you, discuss materials and design, and provide a clear, no-obligation price.",
      },
    ],
  },

  radnor: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Radnor, PA. Mex Landscaping builds high-end outdoor spaces for Main Line homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Radnor, PA: landscape redesigns, natural stone patios, retaining walls, fire features, and complete outdoor living for the Main Line's established homes. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Radnor, PA",
        text: "Radnor Township, in Delaware County, is one of the Main Line's most established and affluent communities, with gracious homes and settled, well-treed grounds. We design and build to that standard: full landscape redesigns, natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build firm, the same team plans and installs your project, so the craftsmanship stays consistent from concept to completion.",
      },
      {
        heading: "Landscaping for Radnor's established homes",
        text: "Many Radnor properties feature established architecture, mature trees, and settled grounds that deserve a careful, design-led approach. We plan landscapes that respect the character of the home: layered, four-season plantings, natural stone hardscape that complements the architecture, and grading and drainage that protect mature trees and older foundations. The aim is work that looks like it has always belonged on the property.",
      },
      {
        heading: "Hardscaping and outdoor living that fit the architecture",
        text: "On a property with real architectural character, the hardscape has to match. We build patios, walkways, walls, and outdoor living spaces in natural flagstone, bluestone, and full stone, matching color and texture to the home so new work reads as original rather than added on. Fire features, seating walls, and outdoor kitchens are designed to feel integral to the property, not dropped in.",
      },
      {
        heading: "Serving Radnor and the Main Line",
        text: "We serve Radnor along with neighboring Main Line communities including Wayne, Villanova, St. Davids, and Bryn Mawr. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your vision, and put together a clear, detailed plan and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Radnor do you serve?",
        a: "We serve Radnor Township and the surrounding Main Line, including Wayne, Villanova, St. Davids, and Bryn Mawr, across Delaware County and the broader area.",
      },
      {
        q: "Do you work on established properties in Radnor?",
        a: "Yes. Many Radnor homes have established architecture and mature landscapes, and we take a design-led approach that respects that character, matching natural stone and planting style to the home and protecting mature trees and older foundations through careful grading and drainage.",
      },
      {
        q: "Can you match natural stone to a Radnor home?",
        a: "Yes. We work in natural flagstone, bluestone, and full stone, and we match color, texture, and detailing so new patios, walkways, and walls complement the existing architecture and look like they have always been part of the property.",
      },
      {
        q: "Do I need a permit for hardscaping in Radnor Township?",
        a: "Often, depending on the project. At-grade patios may not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and handle what your project needs.",
      },
      {
        q: "How do I get a free estimate in Radnor?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Radnor property, walk the space with you, discuss materials and design, and provide a clear, no-obligation price.",
      },
    ],
  },

  "marple-township": {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Marple Township, PA. Mex Landscaping builds high-end outdoor spaces across Marple and Broomall. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Marple Township, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living across Marple and Broomall. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Marple Township, PA",
        text: "Marple Township, in Delaware County and home to Broomall, is an established suburban community of settled neighborhoods and well-treed yards. We design and build to fit: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Built for Marple's established neighborhoods",
        text: "Marple Township is made up largely of established suburban streets with settled homes, mature plantings, and yards that have matured over the decades. Those properties bring real character along with a few practical challenges: dated drainage, settled hardscape, and grading that has shifted over time. We handle them with proper base prep, drainage, and grading that protect your landscape and foundation while bringing the space up to a modern standard.",
      },
      {
        heading: "Hardscaping and outdoor living in Marple Township",
        text: "A patio, a fire pit, and a seating wall can turn an ordinary Marple backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire features, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Serving Marple Township and nearby communities",
        text: "We serve Marple Township, including Broomall, along with Newtown Square, Havertown, Springfield, and the surrounding Delaware County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas in and around Marple Township do you serve?",
        a: "We serve all of Marple Township, including Broomall, along with neighboring communities such as Newtown Square, Havertown, and Springfield, across Delaware County and the surrounding area.",
      },
      {
        q: "Do you handle established or settled Marple lots?",
        a: "Regularly. Many Marple Township properties are in established neighborhoods with older drainage and settled hardscape. We address grade and water as part of the design, with proper base prep, regrading, and drainage solutions where needed, so the finished space holds up.",
      },
      {
        q: "Do I need a permit for a patio or retaining wall in Marple Township?",
        a: "It depends on the project. An at-grade patio often does not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in Marple Township?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting. We can do a single feature or transform the whole property.",
      },
      {
        q: "How do I get a free estimate in Marple Township?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Marple Township property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  havertown: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Havertown, PA. Mex Landscaping builds high-end outdoor spaces across Haverford Township. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Havertown, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for Haverford Township's walkable neighborhoods. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Havertown, PA",
        text: "Havertown, in Haverford Township, Delaware County, is an established, walkable suburban community with settled neighborhoods and plenty of character. We design and build to fit: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Built for Havertown's established neighborhoods",
        text: "Havertown is known for its walkable, established streets, where many lots are settled and compact. Smart design matters even more on a tighter footprint. We plan patios, walkways, seating walls, and fire features that make the most of a smaller yard, creating a genuine outdoor room without crowding the space. Thoughtful layout, built-in seating, and integrated lighting let a modest yard work hard and feel like a true extension of the home.",
      },
      {
        heading: "Hardscaping and outdoor living in Havertown",
        text: "A patio, a fire pit, and a seating wall can turn an ordinary Havertown backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire features, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Serving Haverford Township and nearby communities",
        text: "We serve Havertown along with Ardmore, Broomall, Springfield, and the surrounding Delaware County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Havertown do you serve?",
        a: "We serve Havertown and the rest of Haverford Township, along with neighboring communities including Ardmore, Broomall, and Springfield, across Delaware County and the surrounding area.",
      },
      {
        q: "Can you make a smaller Havertown yard more usable?",
        a: "Absolutely. Many Havertown lots are compact, and we specialize in getting the most out of them, with patios, seating walls, fire features, and lighting laid out to create a real outdoor room without crowding the space. Smart design is what makes a smaller yard feel like a genuine extension of the home.",
      },
      {
        q: "Do I need a permit for a patio or retaining wall in Haverford Township?",
        a: "It depends on the project. An at-grade patio often does not require a permit, while taller retaining walls and structural work frequently do, and requirements vary by township. We are familiar with local rules and will tell you what your specific project needs before we start.",
      },
      {
        q: "What outdoor projects do you build in Havertown?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting. We can do a single feature or transform the whole property.",
      },
      {
        q: "How do I get a free estimate in Havertown?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Havertown property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  collegeville: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Collegeville, PA. Mex Landscaping builds high-end outdoor spaces in this growing Montgomery County borough. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Collegeville, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for this growing Montgomery County community. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Collegeville, PA",
        text: "Collegeville, a borough in Montgomery County and home to Ursinus College, is a growing suburban community with a mix of established homes and newer developments. We design and build to fit: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team plans your project and installs it, so the finished space is cohesive from the first sketch to the last stone.",
      },
      {
        heading: "Landscaping for Collegeville properties",
        text: "Collegeville is growing, with everything from settled streets to new-construction neighborhoods, and each rewards its own plan rather than a packaged solution. We create complete landscape designs with layered, four-season plantings, custom hardscape, drainage, and lighting, all planned together. Whether you are finishing a new-construction yard or refreshing an established property, we work to your goals and budget with a clear plan and a realistic timeline.",
      },
      {
        heading: "Hardscaping and outdoor living in Collegeville",
        text: "A patio, a fire feature, and a seating wall can turn an ordinary Collegeville backyard into the place everyone gathers. We build paver and natural stone patios, retaining and seating walls, walkways and steps, paver driveways, fire pits, and complete outdoor living spaces with outdoor kitchens. Because we handle every piece in-house, the hardscape, plantings, drainage, and lighting all work together as one finished space.",
      },
      {
        heading: "Serving Collegeville and nearby communities",
        text: "We serve Collegeville along with Trappe, Eagleville, Skippack, and the surrounding Montgomery County area. Call (484) 261-6650 or request a free estimate, and we will visit the property, talk through your goals, and put together a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What areas around Collegeville do you serve?",
        a: "We serve Collegeville along with neighboring communities including Trappe, Eagleville, and Skippack, across the surrounding Montgomery County area.",
      },
      {
        q: "Do you landscape new-construction yards in Collegeville?",
        a: "Yes. With Collegeville growing, we often work on newer homes, planning a complete landscape that brings together plantings, hardscape, drainage, and lighting so a fresh yard becomes a cohesive, finished outdoor space.",
      },
      {
        q: "Do I need a permit for hardscaping in Collegeville?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township and borough. We are familiar with local rules and will tell you what your specific project needs before we begin.",
      },
      {
        q: "What outdoor projects do you build in Collegeville?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Collegeville?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Collegeville property, measure the space, talk through materials and design ideas, and give you a clear, no-obligation price.",
      },
    ],
  },

  berwyn: {
    metaDescription:
      "Landscape design, hardscaping, patios, and outdoor living in Berwyn, PA. Mex Landscaping builds high-end outdoor spaces for Main Line homes. Free estimate: (484) 261-6650.",
    intro:
      "Mex Landscaping designs and builds high-end outdoor spaces in Berwyn, PA: landscape redesigns, patios, retaining walls, fire features, and complete outdoor living for this established Main Line community. One team, design through build.",
    designBody: [
      {
        heading: "Landscape design and hardscaping in Berwyn, PA",
        text: "Berwyn is an established Main Line community spanning Easttown and Tredyffrin townships in Chester County, with settled homes and a classic, walkable character. We design and build to match: full landscape redesigns, paver and natural stone patios, retaining and seating walls, walkways, driveways, fire features, and complete outdoor living. As a design-build company, one accountable team handles the design and the construction, so your finished space is cohesive and built to last.",
      },
      {
        heading: "Landscaping for Berwyn's established properties",
        text: "Berwyn homes tend to be settled and full of character, which calls for a thoughtful, design-led approach rather than a one-size-fits-all package. We create complete landscape plans with layered plantings for four-season interest, custom hardscape, drainage, and lighting, all designed together. Whether you are refreshing a single area or reimagining the whole property, we work to your goals with a clear plan and an honest budget.",
      },
      {
        heading: "Hardscaping and outdoor living in Berwyn",
        text: "From a natural stone patio off the back of the house to a full outdoor living space with a fire feature and kitchen, we build the hardscape that makes a Berwyn property truly usable. Patios, walkways, retaining and seating walls, driveways, fire pits, and outdoor kitchens are all built in-house with the engineered base and drainage that keep them level and beautiful for decades.",
      },
      {
        heading: "Serving Berwyn and the surrounding Main Line",
        text: "We serve Berwyn along with nearby Main Line communities including Devon, Paoli, Wayne, and Daylesford. Call (484) 261-6650 or request a free estimate, and we will visit the property, discuss your vision, and provide a clear scope and price.",
      },
    ],
    designFaqs: [
      {
        q: "What townships and areas around Berwyn do you serve?",
        a: "We serve Berwyn across Easttown and Tredyffrin townships, along with nearby Main Line communities including Devon, Paoli, Wayne, and Daylesford, and the surrounding Chester County area.",
      },
      {
        q: "Do you handle full landscape redesigns for Berwyn homes?",
        a: "Yes. We do everything from refreshing a single area to reimagining an entire property, with a complete design that brings together plantings, hardscape, drainage, and lighting. Designing it all together is what produces a cohesive result on an established Berwyn property.",
      },
      {
        q: "Do I need a permit for hardscaping in Easttown or Tredyffrin Township?",
        a: "It depends on the project. At-grade patios often do not require a permit, while taller retaining walls and structural work may, and requirements vary by township. We know the local landscape and handle what your project needs.",
      },
      {
        q: "What outdoor projects do you build in Berwyn?",
        a: "Full landscape design and installation, paver and natural stone patios, retaining and seating walls, walkways and steps, driveways, fire pits and fire features, outdoor kitchens, drainage, and landscape lighting.",
      },
      {
        q: "How do I get a free estimate in Berwyn?",
        a: "Call (484) 261-6650 or request an estimate online. We will come to your Berwyn property, walk the space, discuss materials and design ideas, and provide a clear, no-obligation price.",
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
      image: "/images/design-front-beds.webp",
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
        "Drainage, lighting & split rail fencing",
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
      gallery: profile?.gallery,
      cta: `Call (484) 261-6650 for a free design consultation in ${city}, PA.`,
    };
  }
  const snow = snowProfiles[page.city.slug];
  return {
    icon: "snow" as const,
    image: undefined as string | undefined,
    h1: `Commercial Snow Management Services in ${city}, PA`,
    crumb: "Snow Management",
    metaTitle: snow
      ? `Snow Removal & Management in ${city}, PA | Mex Landscaping`
      : (undefined as string | undefined),
    metaDescription: snow?.metaDescription ?? (undefined as string | undefined),
    intro:
      snow?.intro ??
      `Stay safe and accessible all winter with expert snow management services in ${city}, PA. Mex Landscaping provides 24/7 snow removal, plowing, and de-icing for residential and commercial properties.`,
    highlights: [
      "24/7 storm monitoring & response",
      "Plowing for lots & driveways",
      "Salting & de-icing",
      "Documented commercial service",
    ],
    body: snow?.snowBody ?? [
      {
        heading: `Keep your ${city} property clear & hazard-free`,
        text: `When the snow falls in ${city}, you need a team that's already on the road. We monitor every storm and respond around the clock to keep your driveways, walkways, and parking lots clear and safe.`,
      },
      {
        heading: "Plowing, salting & de-icing",
        text: `From pre-treatment ahead of a storm to plowing and post-storm de-icing, we handle the full job, with documented service that keeps commercial properties compliant and protected.`,
      },
    ],
    faqs: (snow?.snowFaqs ?? undefined) as Faq[] | undefined,
    gallery: undefined as GalleryItem[] | undefined,
    cta: `Call (484) 261-6650 to set up snow management in ${city}, PA before the next storm.`,
  };
}
