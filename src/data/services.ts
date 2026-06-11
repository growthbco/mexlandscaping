// Service pages, keyed by their live URL path. Positioned around high-end
// design/build, hardscaping, outdoor living, and concrete & masonry — with the
// commodity maintenance pages kept (for SEO) but demoted to a secondary group.
// Real per-page titles/descriptions still come from src/data/seo.generated.ts
// where they exist; new premium pages define their own meta inline.

export type ServiceCategory =
  | "design-build"
  | "hardscaping"
  | "outdoor-living"
  | "concrete-masonry"
  | "snow"
  | "maintenance";

export type Service = {
  path: string;
  title: string;
  category: ServiceCategory;
  icon: "leaf" | "stone" | "flame" | "brick" | "drop" | "snow" | "light";
  image?: string; // /images/...
  /** Inline meta for NEW pages not in the live-site crawl. */
  metaTitle?: string;
  metaDescription?: string;
  intro: string;
  highlights: string[];
  body: { heading: string; text: string }[];
  featured?: boolean;
};

export const categoryLabels: Record<ServiceCategory, string> = {
  "design-build": "Landscape Design & Build",
  hardscaping: "Hardscaping",
  "outdoor-living": "Outdoor Living",
  "concrete-masonry": "Concrete & Masonry",
  snow: "Snow Management",
  maintenance: "Property Maintenance",
};

export const categoryHubs: Record<ServiceCategory, string> = {
  "design-build": "/landscape-design/",
  hardscaping: "/hardscape-services/",
  "outdoor-living": "/outdoor-living/",
  "concrete-masonry": "/concrete-masonry/",
  snow: "/snow-management-services/",
  maintenance: "/property-maintenance/",
};

export const categoryIcon: Record<ServiceCategory, Service["icon"]> = {
  "design-build": "leaf",
  hardscaping: "stone",
  "outdoor-living": "flame",
  "concrete-masonry": "brick",
  snow: "snow",
  maintenance: "leaf",
};

// Categories that headline the brand (drive the homepage + primary nav).
export const premiumCategories: ServiceCategory[] = [
  "design-build",
  "hardscaping",
  "outdoor-living",
  "concrete-masonry",
];

export const services: Service[] = [
  // ---------------- DESIGN & BUILD ----------------
  {
    path: "/landscape-design/",
    title: "Landscape Design & Build",
    category: "design-build",
    icon: "leaf",
    image: "/images/landscape-design.webp",
    featured: true,
    intro:
      "Full-service landscape design and installation, from a complete property redesign to refined planting, lighting, and grading. We design it, then our own crews build it.",
    highlights: [
      "Complete property redesigns",
      "Custom planting & bed design",
      "3D-informed planning & phasing",
      "Design-build under one roof",
    ],
    body: [
      {
        heading: "Designed and built by one team",
        text: "A great outdoor space starts with a great plan. We design thoughtful, site-specific landscapes that balance structure, planting, light, and flow, then build them with our own crews, so the vision that's drawn is the vision that's delivered.",
      },
      {
        heading: "From full redesign to refined detail",
        text: "Whether you're reimagining the entire property or elevating a single area, we work to your goals and budget with a clear plan, a realistic timeline, and craftsmanship in every detail.",
      },
    ],
  },
  {
    path: "/landscaping-services-in-norristown-pa/",
    title: "Landscaping Services",
    category: "design-build",
    icon: "leaf",
    image: "/images/landscape-design.webp",
    intro:
      "Award-winning landscape design, installation, and refinement for distinctive homes and commercial properties across the Main Line.",
    highlights: [
      "Design & installation",
      "Planting & bed renovation",
      "Lighting & drainage",
      "Residential & commercial",
    ],
    body: [
      {
        heading: "A professional design & installation company",
        text: "Mex Landscaping brings creative design and meticulous installation to properties across Norristown and the Main Line. It's the kind of work that makes a home feel finished and a commercial property feel cared for.",
      },
      {
        heading: "One trusted partner for the whole property",
        text: "Design, planting, lighting, drainage, hardscape, and outdoor living. Instead of juggling contractors, you get one accountable team that knows your property end to end.",
      },
    ],
  },
  {
    path: "/lawn-installation/",
    title: "Lawn Installation",
    category: "design-build",
    icon: "leaf",
    image: "/images/lawn-install.webp",
    intro:
      "New sod and seeded lawns engineered to establish fast and last, with the soil prep and grading that make the difference.",
    highlights: [
      "Soil prep & precision grading",
      "Premium sod or seed blends",
      "Drainage-aware installation",
      "Establishment guidance",
    ],
    body: [
      {
        heading: "A lawn built to thrive",
        text: "Whether you want fresh sod for instant green or a seeded lawn built for durability, we prepare the soil, grade for drainage, and install turf suited to your light and traffic.",
      },
      {
        heading: "Set up for the long run",
        text: "We don't just lay turf and leave. We set your new lawn up to root deeply and give you the guidance to keep it lush.",
      },
    ],
  },
  {
    path: "/tree-plant-installation/",
    title: "Tree & Plant Installation",
    category: "design-build",
    icon: "leaf",
    image: "/images/landscape-design.webp",
    intro:
      "Specimen trees, layered shrubs, and perennial plantings, sourced healthy and placed with a designer's eye.",
    highlights: [
      "Specimen & native selections",
      "Layered, four-season interest",
      "Proper siting & amended soil",
      "Establishment care",
    ],
    body: [
      {
        heading: "Planting with intention",
        text: "We source healthy trees, shrubs, and perennials and place them with proper spacing, soil amendment, and an eye for how the planting will read in every season.",
      },
      {
        heading: "The right plant, the right place",
        text: "Every selection is matched to your light, soil, and design so the planting looks deliberate and stays healthy for years.",
      },
    ],
  },
  {
    path: "/landscape-lighting/",
    title: "Landscape Lighting",
    category: "design-build",
    icon: "light",
    image: "/images/lighting.jpg",
    featured: true,
    intro:
      "Architectural low-voltage lighting that transforms your property after dark, highlighting the home, the trees, and the spaces you've built.",
    highlights: [
      "Architectural & path lighting",
      "Tree uplighting & moonlighting",
      "Smart controls & timers",
      "Weatherproof, low-maintenance",
    ],
    body: [
      {
        heading: "Your property, transformed after dusk",
        text: "Professionally designed lighting brings drama and warmth to your home, trees, and hardscape while improving safety and extending your evenings outside.",
      },
      {
        heading: "Designed, not just installed",
        text: "We compose light and shadow with energy-efficient LED fixtures and weatherproof wiring, with smart controls so it all takes care of itself.",
      },
    ],
  },
  {
    path: "/storm-water-management/",
    title: "Drainage & Storm Water Management",
    category: "design-build",
    icon: "drop",
    image: "/images/drainage.webp",
    intro:
      "Engineered drainage that protects your property and your investment from standing water and erosion.",
    highlights: [
      "Drainage assessment & grading",
      "French drains & dry wells",
      "Erosion control",
      "Downspout & runoff management",
    ],
    body: [
      {
        heading: "Move water where it belongs",
        text: "Standing water and erosion damage both your landscape and your foundation. We design and install grading, French drains, dry wells, and swales to keep water moving away from your property.",
      },
      {
        heading: "Protect the investment",
        text: "Good drainage is invisible when it's done right, and expensive when it's ignored. We solve the root cause so the problem doesn't return.",
      },
    ],
  },
  {
    path: "/commercial-landscape-installations/",
    title: "Commercial Landscape Installations",
    category: "design-build",
    icon: "leaf",
    image: "/images/commercial.jpg",
    intro:
      "Polished commercial landscapes that elevate your property and reflect well on your business.",
    highlights: [
      "Design & installation",
      "Commercial-grade plantings",
      "Drainage & grading",
      "Ongoing maintenance plans",
    ],
    body: [
      {
        heading: "Curb appeal that means business",
        text: "Your landscape is the first thing clients and tenants see. We design and install commercial landscapes that look sharp, hold up to use, and reflect well on your brand.",
      },
      {
        heading: "Installed and maintained",
        text: "Pair your installation with a recurring maintenance plan and keep the property looking its best year-round with one accountable partner.",
      },
    ],
  },

  // ---------------- HARDSCAPING ----------------
  {
    path: "/hardscape-services/",
    title: "Hardscaping",
    category: "hardscaping",
    icon: "stone",
    image: "/images/patio.jpg",
    featured: true,
    intro:
      "Patios, walls, walkways, and driveways built to last decades: the structural backbone of a high-end outdoor space.",
    highlights: [
      "Patios & walkways",
      "Retaining & seating walls",
      "Driveways & steps",
      "Engineered base & drainage",
    ],
    body: [
      {
        heading: "Built-to-last stonework",
        text: "We design and build hardscapes that hold for decades, with the proper base prep and drainage that keep everything level and tight. Patios, walls, walkways, and driveways, built for how you live outside.",
      },
      {
        heading: "Where the difference is hidden",
        text: "The longevity of any hardscape lives in the base you never see. We never cut corners there, and that's why our work lasts.",
      },
    ],
  },
  {
    path: "/patios/",
    title: "Patios",
    category: "hardscaping",
    icon: "stone",
    image: "/images/patio.jpg",
    featured: true,
    intro:
      "Paver and natural-stone patios designed as true outdoor rooms: level, durable, and built for years of gatherings.",
    highlights: [
      "Paver & natural stone",
      "Engineered base & drainage",
      "Custom shapes, borders & inlays",
      "Sealing & finishing",
    ],
    body: [
      {
        heading: "Your outdoor living room",
        text: "We design and build patios with proper base prep and drainage so they stay level and beautiful. Choose from a wide range of pavers, natural stone, and finishes to match your home.",
      },
      {
        heading: "Built on a base that lasts",
        text: "A beautiful patio is only as good as what's underneath it. Our engineered base and drainage keep your patio tight and level for decades.",
      },
    ],
  },
  {
    path: "/walkways/",
    title: "Walkways & Steps",
    category: "hardscaping",
    icon: "stone",
    image: "/images/walkway.jpg",
    metaTitle: "Walkways & Steps | Paver & Stone Walkways | Mex Landscaping",
    metaDescription:
      "Custom paver and natural-stone walkways and steps in Norristown, PA. Mex Landscaping builds durable, elegant paths that elevate your property. Free estimate.",
    intro:
      "Paver and natural-stone walkways and steps that guide guests through your property with craftsmanship and curb appeal.",
    highlights: [
      "Paver & natural stone paths",
      "Stone & block steps",
      "Lighting integration",
      "Proper base & drainage",
    ],
    body: [
      {
        heading: "Crafted paths and steps",
        text: "A well-built walkway is an invitation. We design and build paths and steps that connect your spaces beautifully, with the base and drainage to stay level and safe for years.",
      },
      {
        heading: "Detail that elevates the whole property",
        text: "Borders, inlays, and integrated lighting turn a simple path into a defining feature of your landscape.",
      },
    ],
  },
  {
    path: "/driveways/",
    title: "Driveways",
    category: "hardscaping",
    icon: "stone",
    image: "/images/driveway.jpg",
    featured: true,
    intro:
      "Paver and stone driveways with lasting curb appeal, plus the engineered base to handle weight and weather.",
    highlights: [
      "Heavy-duty base preparation",
      "Paver & stone finishes",
      "Drainage integration",
      "Clean borders & transitions",
    ],
    body: [
      {
        heading: "First impressions, built to last",
        text: "A well-built driveway is the first thing guests see. We install paver and stone driveways with the base and drainage they need to handle weight and weather for years.",
      },
      {
        heading: "Curb appeal that holds up",
        text: "From classic pavers to natural stone, we finish every driveway with clean borders and transitions that elevate the whole property.",
      },
    ],
  },
  {
    path: "/retaining-walls/",
    title: "Retaining & Seating Walls",
    category: "hardscaping",
    icon: "stone",
    image: "/images/stone-wall.jpg",
    metaTitle: "Retaining Walls & Seating Walls | Mex Landscaping | Norristown PA",
    metaDescription:
      "Engineered retaining walls and seating walls in Norristown, PA. Mex Landscaping builds structural, beautiful walls that hold slopes and add usable space. Free estimate.",
    intro:
      "Engineered retaining walls and seating walls that hold slopes, create usable space, and anchor your outdoor design.",
    highlights: [
      "Engineered, code-aware builds",
      "Block, natural stone & timber",
      "Tiered & seating walls",
      "Proper drainage & backfill",
    ],
    body: [
      {
        heading: "Structure that's also a feature",
        text: "Retaining walls control erosion, manage grade, and turn an unusable slope into level, livable space. We build engineered walls that are as durable as they are beautiful.",
      },
      {
        heading: "Walls you can build a space around",
        text: "Seating walls, tiered terraces, and stone-faced walls do double duty, solving grade while defining patios, fire features, and gardens.",
      },
    ],
  },
  {
    path: "/architectural-stone-facades/",
    title: "Architectural Stone & Facades",
    category: "hardscaping",
    icon: "stone",
    image: "/images/stone-wall.jpg",
    intro:
      "Natural and manufactured stone veneer that adds richness and texture to columns, walls, and entries.",
    highlights: [
      "Natural & manufactured veneer",
      "Columns, walls & entries",
      "Weather-resistant detailing",
      "Custom color & texture matching",
    ],
    body: [
      {
        heading: "Texture and richness, built in",
        text: "Architectural stone facades add depth and character to columns, walls, and outdoor structures. We install natural and manufactured veneer with clean, durable detailing.",
      },
      {
        heading: "Elevate your curb appeal",
        text: "The right stone facade transforms a plain surface into a striking feature, and we match color and texture to your home for a seamless look.",
      },
    ],
  },

  // ---------------- OUTDOOR LIVING ----------------
  {
    path: "/outdoor-living/",
    title: "Outdoor Living Spaces",
    category: "outdoor-living",
    icon: "flame",
    image: "/images/fire-pit.webp",
    featured: true,
    metaTitle: "Outdoor Living Spaces | Fire Pits & Outdoor Kitchens | Mex Landscaping",
    metaDescription:
      "Custom outdoor living spaces in Norristown, PA: fire pits, fire features, outdoor kitchens, and water features. Mex Landscaping designs and builds it all. Free estimate.",
    intro:
      "Custom outdoor living spaces with fire features, kitchens, and water features, designed to extend your season and the way you use your home.",
    highlights: [
      "Fire pits & fire features",
      "Outdoor kitchens & bars",
      "Water features",
      "Pergolas & seating walls",
    ],
    body: [
      {
        heading: "Rooms without walls",
        text: "The best outdoor spaces feel like an extension of the home. We design and build complete outdoor living environments: fire features, kitchens, water, and the hardscape that ties them together.",
      },
      {
        heading: "Designed around how you live",
        text: "Whether it's quiet evenings by the fire or hosting a crowd, we plan the space around the way you'll actually use it, then build it to last.",
      },
    ],
  },
  {
    path: "/fire-pits/",
    title: "Fire Pits & Fire Features",
    category: "outdoor-living",
    icon: "flame",
    image: "/images/fire-pit.webp",
    featured: true,
    metaTitle: "Fire Pits & Fire Features | Custom Built | Mex Landscaping Norristown PA",
    metaDescription:
      "Custom fire pits and fire features in Norristown, PA. Mex Landscaping builds wood-burning and gas fire features in stone and block to match your patio. Free estimate.",
    intro:
      "Custom-built fire pits and fire features: the centerpiece of a great outdoor space, built in stone and block to match your patio.",
    highlights: [
      "Wood-burning & gas features",
      "In-ground & built-up designs",
      "Matching stone & finishes",
      "Integrated seating walls",
    ],
    body: [
      {
        heading: "The heart of the backyard",
        text: "A fire feature turns a patio into a destination. We build custom in-ground and built-up fire pits, wood-burning or gas, in stone, block, and brick, sized and finished to match your space.",
      },
      {
        heading: "Built safely, built to last",
        text: "Proper siting, clearances, and materials mean your fire feature is as safe as it is beautiful, and it pairs naturally with seating walls and patio lighting.",
      },
    ],
  },
  {
    path: "/outdoor-kitchens/",
    title: "Outdoor Kitchens",
    category: "outdoor-living",
    icon: "flame",
    image: "/images/patio.jpg",
    metaTitle: "Outdoor Kitchens | Custom Built-In Grills & Bars | Mex Landscaping",
    metaDescription:
      "Custom outdoor kitchens in Norristown, PA. Mex Landscaping builds stone and paver outdoor kitchens with built-in grills, counters, and bars. Free estimate.",
    intro:
      "Built-in outdoor kitchens and bars in stone and stainless, designed for real cooking and real gatherings.",
    highlights: [
      "Built-in grills & counters",
      "Stone & paver construction",
      "Bars & seating",
      "Utilities & lighting integration",
    ],
    body: [
      {
        heading: "Cook, host, and stay outside",
        text: "We build durable outdoor kitchens with built-in grills, stone counters, and bar seating: the anchor of an outdoor space made for entertaining.",
      },
      {
        heading: "Coordinated with your whole space",
        text: "Materials, lighting, and layout are designed to flow with your patio, fire feature, and landscape for one cohesive result.",
      },
    ],
  },
  {
    path: "/water-features/",
    title: "Water Features",
    category: "outdoor-living",
    icon: "drop",
    image: "/images/landscape-design.webp",
    metaTitle: "Water Features | Fountains & Ponds | Mex Landscaping Norristown PA",
    metaDescription:
      "Custom water features in Norristown, PA: fountains, ponds, and waterfalls designed and built by Mex Landscaping. Add tranquility to your landscape. Free estimate.",
    intro:
      "Fountains, ponds, and waterfalls that bring sound, movement, and tranquility to your landscape.",
    highlights: [
      "Fountains & bubblers",
      "Ponds & waterfalls",
      "Low-maintenance recirculation",
      "Lighting & planting integration",
    ],
    body: [
      {
        heading: "The sound of moving water",
        text: "A well-placed water feature adds calm and character to any outdoor space. We design and build fountains, ponds, and waterfalls that fit naturally into your landscape.",
      },
      {
        heading: "Beautiful and low-maintenance",
        text: "Modern recirculation and thoughtful placement keep your water feature stunning and simple to care for.",
      },
    ],
  },

  // ---------------- CONCRETE & MASONRY ----------------
  {
    path: "/concrete-masonry/",
    title: "Concrete & Masonry",
    category: "concrete-masonry",
    icon: "brick",
    image: "/images/driveway.jpg",
    featured: true,
    metaTitle: "Concrete & Masonry | Stamped Concrete & Stonework | Mex Landscaping",
    metaDescription:
      "Concrete and masonry in Norristown, PA: poured and stamped concrete patios, driveways, steps, and stonework by Mex Landscaping. Built to last. Free estimate.",
    intro:
      "Poured and stamped concrete, plus full masonry: the structural craft behind patios, driveways, steps, and walls that endure.",
    highlights: [
      "Poured & stamped concrete",
      "Concrete patios & driveways",
      "Steps, footings & slabs",
      "Brick & stone masonry",
    ],
    body: [
      {
        heading: "Concrete done right",
        text: "From stamped-concrete patios to driveways, steps, and slabs, we pour, finish, and cure concrete that stays level and crack-resistant, with finishes that look far from ordinary.",
      },
      {
        heading: "Masonry craftsmanship",
        text: "Brick and stone masonry, structural walls, and footings: the kind of foundational work that holds your whole project together for the long haul.",
      },
    ],
  },

  // ---------------- SNOW MANAGEMENT (secondary) ----------------
  {
    path: "/snow-management-services/",
    title: "Commercial Snow Management",
    category: "snow",
    icon: "snow",
    intro:
      "Reliable 24/7 snow management that keeps your property safe, clear, and accessible all winter long.",
    highlights: [
      "24/7 storm response",
      "Plowing & de-icing",
      "Documented commercial service",
      "Residential & commercial",
    ],
    body: [
      {
        heading: "Trusted commercial snow removal",
        text: "When snow and ice arrive, our 24/7 snow management prevents hazards with expert plowing and de-icing, keeping your driveways, walkways, and lots clear, safe, and accessible.",
      },
      {
        heading: "Per-storm or seasonal",
        text: "Choose per-storm billing or a flat seasonal contract with priority response. Either way, we show up before you need to leave and document the work.",
      },
    ],
  },
  {
    path: "/commercial-snow-plowing/",
    title: "Commercial Snow Plowing",
    category: "snow",
    icon: "snow",
    intro:
      "Expert commercial snow plowing that keeps your business open, safe, and liability-ready all winter.",
    highlights: [
      "Parking lot plowing",
      "Ice removal & salt",
      "Sidewalk & entry clearing",
      "Documented service",
    ],
    body: [
      {
        heading: "Keep your business accessible",
        text: "We clear parking lots, manage ice, and apply salt with documented service so your customers and staff stay safe through every storm.",
      },
      {
        heading: "Reliable when it matters most",
        text: "We plan routes and crews to keep your property clear before you open, because a snow contractor is only as good as their response time.",
      },
    ],
  },
  {
    path: "/24-7-emergency-snow-services/",
    title: "24/7 Emergency Snow Services",
    category: "snow",
    icon: "snow",
    intro:
      "Round-the-clock emergency snow response so a storm never shuts your property down.",
    highlights: [
      "24/7 monitoring & response",
      "Rapid plowing & de-icing",
      "Priority commercial coverage",
      "Salt & ice management",
    ],
    body: [
      {
        heading: "Storms don't keep business hours",
        text: "Our 24/7 emergency snow services keep your property safe and clear whenever the weather hits. We monitor conditions and respond around the clock.",
      },
      {
        heading: "Priority response, documented",
        text: "Commercial clients get priority coverage with documented service records for peace of mind and easy insurance reporting.",
      },
    ],
  },
  {
    path: "/sidewalk-snow-removal/",
    title: "Sidewalk Snow Removal",
    category: "snow",
    icon: "snow",
    intro: "Clear, safe sidewalks and entries that protect your visitors and limit liability.",
    highlights: ["Sidewalk & walkway clearing", "Entry & step de-icing", "Salt application", "Commercial & multi-unit"],
    body: [
      { heading: "Safe walkways, reduced liability", text: "Sidewalks and entries are where slip-and-fall risk is highest. We clear and treat them thoroughly so your visitors stay safe and you stay protected." },
      { heading: "Part of a complete plan", text: "Combine sidewalk clearing with plowing and de-icing for full-property coverage from a single team." },
    ],
  },
  {
    path: "/salting-de-icing/",
    title: "Salting & De-Icing",
    category: "snow",
    icon: "snow",
    intro: "Professional salting and de-icing that stops ice before it becomes a hazard.",
    highlights: ["Pre-treatment & post-storm salting", "Lots, walkways & entries", "Ice melt management", "Documented application"],
    body: [
      { heading: "Get ahead of the ice", text: "We pre-treat ahead of storms and re-apply as needed to prevent dangerous refreeze, keeping surfaces safe and walkable." },
      { heading: "Applied right, recorded right", text: "We apply the right product at the right rate and document service, so your property stays safe and your records stay clean." },
    ],
  },
  {
    path: "/snow-removal/",
    title: "Snow Removal",
    category: "snow",
    icon: "snow",
    intro: "Dependable snow removal for residential and commercial properties across the Main Line.",
    highlights: ["Driveway & lot plowing", "Walkway clearing", "De-icing & salt", "Per-storm or seasonal"],
    body: [
      { heading: "Skip the shoveling", text: "We keep your property safe and clear all winter, from driveways to lots and walkways, with reliable response on every snowfall." },
      { heading: "Coverage that fits", text: "Choose per-storm or seasonal coverage for homes, businesses, and HOAs, with priority response when it counts." },
    ],
  },

  // ---------------- MAINTENANCE (secondary, kept for SEO) ----------------
  {
    path: "/property-maintenance/",
    title: "Property Maintenance",
    category: "maintenance",
    icon: "leaf",
    intro: "Reliable, scheduled upkeep for the properties we design and build, and for clients who simply want it done right.",
    highlights: ["Mowing, edging & blowing", "Bed weeding & mulching", "Seasonal color", "Commercial & HOA contracts"],
    body: [
      { heading: "Keep it looking its best", text: "From bed care to seasonal transitions, we keep your landscape polished all season, so your time stays yours." },
      { heading: "Homes and businesses", text: "Recurring maintenance plans for single-family homes, commercial properties, and HOAs, with consistent crews and dependable scheduling." },
    ],
  },
  {
    path: "/weeding/",
    title: "Weeding",
    category: "maintenance",
    icon: "leaf",
    intro: "Regular weeding that keeps your beds crisp, clean, and intentional all season.",
    highlights: ["Hand & selective weeding", "Clean bed edging", "Pre-emergent options", "Debris haul-away"],
    body: [
      { heading: "Tidy beds, season-long", text: "We clear invasive growth and maintain clean edges throughout the growing season, so your landscape always looks cared for." },
      { heading: "Part of a healthy landscape", text: "Removing competition keeps your plants healthier and your beds looking their best." },
    ],
  },
  {
    path: "/trimming/",
    title: "Trimming & Pruning",
    category: "maintenance",
    icon: "leaf",
    intro: "Expert trimming and pruning that keeps plantings shapely and your landscape sharp.",
    highlights: ["Shrub & hedge shaping", "Clean edging", "Species-correct timing", "Debris haul-away"],
    body: [
      { heading: "Crisp and well-shaped", text: "We shape shrubs and maintain clean edges so your whole property reads as polished and well kept." },
      { heading: "Timed for plant health", text: "We prune at the right time for each species to protect blooms and encourage dense, healthy growth." },
    ],
  },
  {
    path: "/shrubs-and-bushes/",
    title: "Shrubs & Bushes",
    category: "maintenance",
    icon: "leaf",
    intro: "Expert pruning and care for healthy, shapely shrubs and bushes.",
    highlights: ["Species-specific pruning", "Hedge shaping & renewal", "Disease & pest checks", "Seasonal timing"],
    body: [
      { heading: "Healthy, shapely, vibrant", text: "Proper pruning keeps shrubs and bushes dense and well-proportioned, pruned at the right time for each species." },
      { heading: "Renewal and rescue", text: "Overgrown shrubs can often be brought back with the right renewal pruning. We'll tell you honestly what's worth saving." },
    ],
  },
  {
    path: "/fall-cleanups/",
    title: "Fall Cleanups",
    category: "maintenance",
    icon: "leaf",
    intro: "Leaf removal and bed prep that puts your property to bed for winter.",
    highlights: ["Full-property leaf removal", "Perennial cutback", "Bed & gutter clearing", "Debris haul-away"],
    body: [
      { heading: "A fresh start for the season", text: "We clear leaves and debris, cut back perennials, and prep beds so your property is clean through winter and ready to rebound in spring." },
      { heading: "Done thoroughly, hauled away", text: "No piles left behind. We remove the debris and leave your property tidy." },
    ],
  },
  {
    path: "/leaf-cleanups/",
    title: "Leaf Cleanup",
    category: "maintenance",
    icon: "leaf",
    intro: "Thorough leaf cleanup to keep your lawn healthy through fall.",
    highlights: ["Full-property removal", "Lawn & bed clearing", "Recurring fall visits", "Debris haul-away"],
    body: [
      { heading: "Don't let leaves smother your lawn", text: "A thick blanket of leaves blocks light and traps moisture. We clear them thoroughly so your lawn stays healthy into winter." },
      { heading: "Recurring visits", text: "Leaves don't fall all at once, so we can schedule recurring cleanups so your property stays clear from first drop to last." },
    ],
  },
  {
    path: "/fall-aeration-seeding/",
    title: "Aeration & Overseeding",
    category: "maintenance",
    icon: "leaf",
    intro: "Thicker, healthier turf through core aeration and overseeding at the ideal time of year.",
    highlights: ["Core aeration", "Overseeding with quality blends", "Starter fertilization", "Best-time fall scheduling"],
    body: [
      { heading: "The best thing for a tired lawn", text: "Core aeration relieves compaction; paired with overseeding, it's the most effective way to thicken a thin, worn lawn." },
      { heading: "Timed for results", text: "Fall is the ideal window in our area, when cooler temps and good moisture give new grass the best chance to establish." },
    ],
  },
];

export const servicePaths = services.map((s) => s.path);

export function getService(path: string) {
  return services.find((s) => s.path === path);
}

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}

export function metaForService(s: Service, fallbackTitle?: string) {
  return {
    title: s.metaTitle ?? fallbackTitle,
    description: s.metaDescription,
  };
}
