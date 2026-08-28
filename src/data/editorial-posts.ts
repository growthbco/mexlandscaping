import type { Post } from "./posts";
import { posts } from "./posts";

type EditorialPost = Pick<Post, "title" | "description" | "ogImage" | "paragraphs">;

const editorialBySlug: Record<string, EditorialPost> = {
  "commercial-snow-plowing-keeping-your-business-accessible": {
    title: "How Commercial Snow Planning Keeps a Property Accessible",
    description:
      "A practical guide to planning plowing, de-icing, and documented storm response for commercial properties in Montgomery County.",
    ogImage: "/images/driveway.webp",
    paragraphs: [
      "Commercial snow management starts before the first forecast. A useful site plan identifies priority entrances, fire lanes, loading areas, pedestrian routes, drainage points, and safe places to stack snow. Agreeing on those details early helps a crew work quickly when conditions change overnight.",
      "Plowing is only part of the job. Refreeze often creates the greater risk, especially at shaded walks, sloped drives, and areas where roof or parking-lot runoff crosses a pedestrian route. A complete plan should pair plowing with appropriate salting or de-icing and include return visits when temperatures or precipitation require them.",
      "Property managers also benefit from documented service. Records of arrival times, conditions, work performed, and materials applied create a clear operating history for owners, tenants, and insurers. They also make it easier to adjust the plan after a storm exposes an overlooked trouble spot.",
      "Before winter, walk the property with your snow contractor and confirm trigger depths, priority zones, communication contacts, and where cleared snow can be stored without blocking visibility or drainage. Mex Landscaping provides per-storm and seasonal snow management for commercial properties across Norristown, Montgomery County, and the Main Line.",
    ],
  },
  "essential-lawn-mowing-practices-for-a-thriving-garden": {
    title: "Lawn Mowing Practices That Support Healthier Turf",
    description:
      "Straightforward mowing, watering, and seasonal practices for healthier lawns in southeastern Pennsylvania.",
    ogImage: "/images/sod-seeded.webp",
    paragraphs: [
      "Healthy turf depends more on consistency than on cutting it as short as possible. Removing too much of the leaf blade stresses the plant, exposes soil to heat, and makes it easier for weeds to establish. A practical rule is to remove no more than one-third of the grass height in a single mowing.",
      "Sharp mower blades matter. A clean cut heals quickly; a dull blade tears the grass and leaves pale, frayed tips. Change direction periodically so the turf does not lean or compact along the same wheel pattern, and avoid mowing saturated soil where equipment can leave ruts.",
      "Water deeply and less frequently so roots grow down into the soil rather than remaining near the surface. Morning watering reduces evaporation while allowing the lawn to dry before evening. Exact needs vary with soil, shade, slope, and recent rainfall, so the property should guide the schedule.",
      "Compaction, drainage, and thin soil cannot be solved by mowing alone. Aeration, overseeding, grading, or soil improvement may be needed when a lawn stays thin despite consistent care. Mex Landscaping can assess the site and recommend the combination that fits the property rather than applying the same program everywhere.",
    ],
  },
  "essential-guide-to-choosing-and-installing-the-perfect-landscape-lighting": {
    title: "A Homeowner's Guide to Landscape Lighting",
    description:
      "How to plan low-voltage lighting for safer paths, stronger curb appeal, and comfortable outdoor living after dark.",
    ogImage: "/images/lighting-dusk.webp",
    paragraphs: [
      "Good landscape lighting is designed in layers. Path and step lights support safe movement, subtle uplighting reveals the form of trees and masonry, and carefully placed accents draw attention to entrances or architectural details. The goal is depth and visibility, not uniform brightness across the entire yard.",
      "Fixture placement matters as much as fixture selection. Lights should avoid direct glare from normal seating areas, windows, and approaches to the house. Beam width, color temperature, mounting position, and the surrounding plant growth all affect how the installation will look in real use.",
      "Low-voltage LED systems use relatively little energy and make it easy to control schedules with timers or smart transformers. Weather-resistant connections, correctly sized transformers, and protected cable routes help the system remain dependable through seasonal maintenance and freeze-thaw cycles.",
      "The best time to plan lighting is alongside planting and hardscape, but an existing property can also be upgraded thoughtfully. Mex Landscaping designs and installs lighting across Norristown and the Main Line, coordinating fixtures with paths, walls, trees, and outdoor living spaces so the finished system feels intentional.",
    ],
  },
  "essential-winter-landscaping-maintenance-tips-for-a-thriving-lawn": {
    title: "Winter Landscape Preparation for Southeastern Pennsylvania",
    description:
      "A practical fall checklist for protecting lawns, plantings, drainage, and paved surfaces through winter weather.",
    ogImage: "/images/curb-colonial.webp",
    paragraphs: [
      "Winter preparation is mostly about sending the property into cold weather clean, hydrated, and able to drain. Remove heavy leaf buildup from turf and drainage paths, but leave appropriate organic cover in planted beds where it can protect soil and beneficial insects.",
      "New trees and shrubs should enter winter well watered. Check mulch depth and keep mulch away from trunks and stems; a thin, even layer protects roots more effectively than a mound against the plant. Pruning should be selective because timing varies by species and spring-flowering plants may already be carrying next season's buds.",
      "Inspect downspouts, swales, drain inlets, and low areas before the ground freezes. Water trapped beside a foundation or under a paved surface can create damage during freeze-thaw cycles. Correcting the path of runoff is more useful than repeatedly repairing the symptom after winter.",
      "Finally, confirm snow-storage and de-icing plans before the first storm. Avoid piling salted snow onto sensitive plantings, and choose materials with nearby masonry, concrete, pets, and vegetation in mind. A short property walk in fall can prevent expensive surprises in spring.",
    ],
  },
  "expert-retaining-wall-builders-near-me-custom-solutions-for-your-landscape": {
    title: "What Makes a Retaining Wall Last?",
    description:
      "The structural, drainage, and material decisions that separate a durable retaining wall from a short-term landscape repair.",
    ogImage: "/images/wall-stone-house.webp",
    paragraphs: [
      "A retaining wall has two jobs: hold back soil safely and fit the landscape around it. The visible stone or block matters, but the excavation, base, backfill, drainage, and reinforcement behind the face determine whether the wall stays straight through years of water and freeze-thaw cycles.",
      "Drainage is essential because saturated soil places far more pressure on a wall. A properly built system gives water a path through free-draining stone and away from the structure. Taller walls or difficult slopes may also require engineered reinforcement and local permits, which should be resolved before construction begins.",
      "Material should be chosen for the property and the wall's purpose. Natural fieldstone can complement traditional homes and mature landscapes, while segmental block offers consistent engineering options for curves, tiers, and seating walls. The right choice balances appearance, access, height, soil conditions, and budget.",
      "A site visit should evaluate the entire grade, not only the failing wall. Mex Landscaping builds retaining and seating walls across Norristown and the Main Line and coordinates them with steps, planting, drainage, driveways, and outdoor living areas so the solution improves the property as a whole.",
    ],
  },
};

export const curatedPostSlugs = Object.keys(editorialBySlug);

export const isCuratedPost = (slug: string) => slug in editorialBySlug;

export const editorialPost = (post: Post): Post => ({
  ...post,
  ...(editorialBySlug[post.slug] ?? {}),
  ...(isCuratedPost(post.slug) ? { updatedDate: "2026-08-28" } : {}),
});

export const curatedPosts = posts.filter((post) => isCuratedPost(post.slug)).map(editorialPost);
