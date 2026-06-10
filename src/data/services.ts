// Flat service pages, keyed by their exact live URL path (SEO-preserving).
// Titles/descriptions/OG come from src/data/seo.generated.ts; this file holds
// the page structure, category, and hand-authored body copy.

export type ServiceCategory = "landscaping" | "snow" | "hardscape";

export type Service = {
  path: string; // e.g. "/patios/"
  title: string; // fallback display title
  category: ServiceCategory;
  icon: "leaf" | "snow" | "stone" | "fence";
  intro: string;
  highlights: string[];
  body: { heading: string; text: string }[];
};

export const categoryLabels: Record<ServiceCategory, string> = {
  landscaping: "Landscaping",
  snow: "Snow Management",
  hardscape: "Hardscape",
};

export const categoryHubs: Record<ServiceCategory, string> = {
  landscaping: "/landscaping-services-in-norristown-pa/",
  snow: "/snow-management-services/",
  hardscape: "/hardscape-services/",
};

export const services: Service[] = [
  // ---------------- LANDSCAPING ----------------
  {
    path: "/landscaping-services-in-norristown-pa/",
    title: "Landscaping Services",
    category: "landscaping",
    icon: "leaf",
    intro:
      "From award-winning design to seasonal upkeep, Mex Landscaping handles every detail of your outdoor space so it looks its best in every season.",
    highlights: [
      "Custom landscape design & installation",
      "Recurring property maintenance",
      "Planting, lighting & drainage",
      "Residential & commercial",
    ],
    body: [
      {
        heading: "Full-service landscaping for Norristown & the Main Line",
        text: "Mex Landscaping is a professional landscape design and installation company. We bring your outdoor vision to life and keep it thriving all year — combining creative design with the kind of reliable, detail-oriented care that keeps clients coming back season after season.",
      },
      {
        heading: "One team for the whole property",
        text: "Design, lawns, lighting, planting, drainage, and seasonal cleanups — instead of juggling multiple contractors, you get a single trusted crew that knows your property and shows up when promised.",
      },
    ],
  },
  {
    path: "/landscape-design/",
    title: "Landscape Design",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Thoughtful, creative landscape designs that balance beauty and function — built around how you actually use your yard.",
    highlights: [
      "On-site consultation & assessment",
      "Detailed planting & layout plans",
      "Designs for sun, shade & slope",
      "Budget-conscious, phased options",
    ],
    body: [
      {
        heading: "Designs tailored to your property",
        text: "Great landscapes start with a great plan. We map planting beds, focal points, flow, and seasonal interest into a design that fits your home, your style, and your budget — then build it with our own crews.",
      },
      {
        heading: "A clear plan before the first dig",
        text: "You'll see exactly what we're proposing and why, with a clear timeline and phased options so you can invest at a pace that works for you.",
      },
    ],
  },
  {
    path: "/lawn-installation/",
    title: "Lawn Installation",
    category: "landscaping",
    icon: "leaf",
    intro:
      "New sod and seeded lawns that take root and last — with the soil prep and grading that make the difference.",
    highlights: [
      "Soil prep & grading",
      "Premium sod or seed blends",
      "Drainage-aware installation",
      "Establishment care guidance",
    ],
    body: [
      {
        heading: "A lawn built to thrive",
        text: "Whether you want fresh sod for instant green or a seeded lawn built for durability, we prepare the soil, grade for drainage, and install turf suited to your light and traffic conditions.",
      },
      {
        heading: "Set up for the long run",
        text: "We don't just lay turf and leave — we set your new lawn up to establish strong roots and give you the guidance to keep it lush.",
      },
    ],
  },
  {
    path: "/landscape-lighting/",
    title: "Landscape Lighting",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Low-voltage landscape lighting for beauty, safety, and curb appeal that extends your evenings outdoors.",
    highlights: [
      "Path, accent & uplighting",
      "Energy-efficient LED fixtures",
      "Timers & smart controls",
      "Weatherproof, low-maintenance wiring",
    ],
    body: [
      {
        heading: "Light up your nightscape",
        text: "Professionally installed landscape lighting highlights your trees, pathways, and architecture while improving safety around steps and entries — turning your yard into a place you enjoy after dark.",
      },
      {
        heading: "Efficient and durable",
        text: "We use energy-efficient LED fixtures and weatherproof wiring, with timers and smart controls so your lighting takes care of itself.",
      },
    ],
  },
  {
    path: "/property-maintenance/",
    title: "Property Maintenance",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Reliable, scheduled upkeep for residential and commercial properties — so your landscape always looks its best.",
    highlights: [
      "Mowing, edging & blowing",
      "Bed weeding & mulching",
      "Seasonal color rotations",
      "Commercial & HOA contracts",
    ],
    body: [
      {
        heading: "Polished all season, hands-off for you",
        text: "From mowing and edging to bed care and seasonal transitions, we handle the routine so you don't have to. Your time is valuable — trust us to keep your property season-ready without the hassle.",
      },
      {
        heading: "Built for homes and businesses",
        text: "We offer recurring maintenance plans for single-family homes, commercial properties, and HOAs, with consistent crews and dependable scheduling.",
      },
    ],
  },
  {
    path: "/storm-water-management/",
    title: "Storm Water Management",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Drainage solutions that protect your property from standing water, erosion, and water damage.",
    highlights: [
      "Drainage assessment & grading",
      "French drains & dry wells",
      "Erosion control planting",
      "Downspout & runoff management",
    ],
    body: [
      {
        heading: "Move water where it belongs",
        text: "Standing water and erosion hurt both your landscape and your foundation. We design and install grading, French drains, dry wells, and swales to keep water moving away from your property.",
      },
      {
        heading: "Protect your investment",
        text: "Good drainage is invisible when it's done right — and expensive when it's ignored. We solve the root cause so the problem doesn't come back.",
      },
    ],
  },
  {
    path: "/tree-plant-installation/",
    title: "Tree & Plant Installation",
    category: "landscaping",
    icon: "leaf",
    intro:
      "The right trees, shrubs, and perennials — sourced healthy and planted to thrive for years.",
    highlights: [
      "Native & ornamental selections",
      "Proper siting for light & soil",
      "Amended soil & mulching",
      "Establishment watering guidance",
    ],
    body: [
      {
        heading: "Plants that establish and last",
        text: "We source healthy trees, shrubs, and perennials and plant them with proper soil amendment and spacing so they establish quickly and grow strong.",
      },
      {
        heading: "The right plant, the right place",
        text: "We match every selection to your light, soil, and design so your planting looks intentional and stays healthy.",
      },
    ],
  },
  {
    path: "/weeding/",
    title: "Weeding",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Regular weeding that keeps your beds crisp, clean, and looking intentional all season.",
    highlights: [
      "Hand & selective weeding",
      "Clean bed edging",
      "Pre-emergent options",
      "Debris haul-away",
    ],
    body: [
      {
        heading: "Tidy beds, season-long",
        text: "We clear invasive growth and maintain clean edges throughout the growing season, so your landscape always looks cared for.",
      },
      {
        heading: "Part of a healthy landscape",
        text: "Weeding isn't just cosmetic — removing competition keeps your plants healthier and your beds looking their best.",
      },
    ],
  },
  {
    path: "/trimming/",
    title: "Trimming",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Expert trimming and edging that keeps your plantings shapely and your landscape sharp.",
    highlights: [
      "Shrub & hedge shaping",
      "Clean lawn & bed edging",
      "Seasonal timing",
      "Debris haul-away",
    ],
    body: [
      {
        heading: "Crisp, well-shaped, intentional",
        text: "We shape shrubs and maintain clean edges so your whole property reads as polished and well kept.",
      },
      {
        heading: "Timed for plant health",
        text: "We trim at the right time for each species to protect blooms and encourage healthy, dense growth.",
      },
    ],
  },
  {
    path: "/shrubs-and-bushes/",
    title: "Shrubs and Bushes",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Expert pruning and care for healthy, shapely shrubs and bushes that elevate your outdoor space.",
    highlights: [
      "Species-specific pruning",
      "Hedge shaping & renewal",
      "Disease & pest checks",
      "Seasonal timing",
    ],
    body: [
      {
        heading: "Healthy, shapely, vibrant",
        text: "Proper pruning keeps shrubs and bushes dense, healthy, and well-proportioned. We prune at the right time for each species to protect blooms and growth.",
      },
      {
        heading: "Renewal and rescue",
        text: "Overgrown or neglected shrubs can often be brought back with the right renewal pruning — we'll tell you honestly what's worth saving.",
      },
    ],
  },
  {
    path: "/fall-cleanups/",
    title: "Fall Cleanups",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Leaf removal and bed prep that puts your yard to bed for winter and ready to rebound in spring.",
    highlights: [
      "Full-property leaf removal",
      "Perennial cutback",
      "Bed & gutter clearing",
      "Debris haul-away",
    ],
    body: [
      {
        heading: "A fresh start for the season",
        text: "We clear leaves and debris, cut back perennials, and prep beds so your property is clean through winter and set up to thrive when spring arrives.",
      },
      {
        heading: "Done thoroughly, hauled away",
        text: "No piles left behind — we remove the debris and leave your property tidy.",
      },
    ],
  },
  {
    path: "/leaf-cleanups/",
    title: "Leaf Cleanup",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Thorough leaf cleanup in Norristown and across the Main Line to keep your lawn healthy through fall.",
    highlights: [
      "Full-property leaf removal",
      "Lawn & bed clearing",
      "Recurring fall visits",
      "Debris haul-away",
    ],
    body: [
      {
        heading: "Don't let leaves smother your lawn",
        text: "A thick blanket of leaves blocks light and traps moisture, inviting disease. We clear them thoroughly so your lawn stays healthy heading into winter.",
      },
      {
        heading: "Recurring visits through the season",
        text: "Leaves don't fall all at once — we can schedule recurring cleanups so your property stays clear from first drop to last.",
      },
    ],
  },
  {
    path: "/fall-aeration-seeding/",
    title: "Fall Aeration & Seeding",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Thicker, healthier turf through core aeration and overseeding at the ideal time of year.",
    highlights: [
      "Core aeration",
      "Overseeding with quality blends",
      "Starter fertilization",
      "Best-time fall scheduling",
    ],
    body: [
      {
        heading: "The best thing you can do for a tired lawn",
        text: "Core aeration relieves compaction and lets air, water, and nutrients reach the roots. Paired with overseeding, it's the most effective way to thicken a thin, worn lawn.",
      },
      {
        heading: "Timed for results",
        text: "Fall is the ideal window for aeration and seeding in our area — cooler temps and good moisture give new grass the best chance to establish.",
      },
    ],
  },
  {
    path: "/commercial-landscape-installations/",
    title: "Commercial Landscape Installations",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Professional commercial landscape installations that elevate your property and impress your visitors.",
    highlights: [
      "Design & installation",
      "Commercial-grade plantings",
      "Drainage & grading",
      "Ongoing maintenance plans",
    ],
    body: [
      {
        heading: "Curb appeal that means business",
        text: "Your landscape is the first thing clients and tenants see. We design and install commercial landscapes that look sharp, hold up to use, and reflect well on your business.",
      },
      {
        heading: "Installed and maintained",
        text: "Pair your installation with a recurring maintenance plan and keep your property looking its best year-round with one accountable partner.",
      },
    ],
  },
  {
    path: "/landscaping-king-of-prussia/",
    title: "Landscaping King of Prussia",
    category: "landscaping",
    icon: "leaf",
    intro:
      "Full-service landscaping for King of Prussia homes and businesses — design, installation, and year-round care.",
    highlights: [
      "Landscape design & installation",
      "Lawn care & maintenance",
      "Planting, lighting & drainage",
      "Free local estimates",
    ],
    body: [
      {
        heading: "Your King of Prussia landscaping team",
        text: "Mex Landscaping brings award-winning design and reliable, year-round care to King of Prussia. From a full landscape redesign to recurring maintenance, we're the local team property owners trust.",
      },
      {
        heading: "Local, dependable, and detail-driven",
        text: "We know the area and the properties here. Call us for a free estimate and a clear plan for your outdoor space.",
      },
    ],
  },

  // ---------------- SNOW ----------------
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
        heading: "Trusted commercial snow removal in Norristown",
        text: "When snow and ice arrive, our 24/7 snow management prevents hazards with expert plowing and de-icing. We keep your driveways, walkways, and lots clear so your property stays safe and accessible.",
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
      "Parking lot plowing & clearing",
      "Ice removal & salt application",
      "Sidewalk & entry clearing",
      "Documented, contracted service",
    ],
    body: [
      {
        heading: "Keep your business accessible",
        text: "Mex Landscaping offers expert commercial snow plowing services. We clear parking lots, manage ice, and apply salt with documented service so your customers and staff stay safe.",
      },
      {
        heading: "Reliable when it matters most",
        text: "A snow contractor is only as good as their response time. We plan routes and crews to keep your property clear before you open.",
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
      "24/7 storm monitoring & response",
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
    intro:
      "Clear, safe sidewalks and entries that protect your visitors and limit your liability.",
    highlights: [
      "Sidewalk & walkway clearing",
      "Entry & step de-icing",
      "Salt application",
      "Commercial & multi-unit",
    ],
    body: [
      {
        heading: "Safe walkways, reduced liability",
        text: "Sidewalks and entries are where slip-and-fall risk is highest. We clear and treat them thoroughly so your visitors stay safe and you stay protected.",
      },
      {
        heading: "Part of a complete plan",
        text: "Combine sidewalk clearing with plowing and de-icing for full-property coverage from a single team.",
      },
    ],
  },
  {
    path: "/salting-de-icing/",
    title: "Salting & De-Icing",
    category: "snow",
    icon: "snow",
    intro:
      "Professional salting and de-icing that stops ice before it becomes a hazard.",
    highlights: [
      "Pre-treatment & post-storm salting",
      "Lots, walkways & entries",
      "Ice melt management",
      "Documented application",
    ],
    body: [
      {
        heading: "Get ahead of the ice",
        text: "Our professional salting and de-icing services keep surfaces safe and walkable. We pre-treat ahead of storms and re-apply as needed to prevent dangerous refreeze.",
      },
      {
        heading: "Applied right, recorded right",
        text: "We apply the right product at the right rate and document service, so your property stays safe and your records stay clean.",
      },
    ],
  },
  {
    path: "/snow-removal/",
    title: "Snow Removal",
    category: "snow",
    icon: "snow",
    intro:
      "Dependable snow removal for residential and commercial properties across the Main Line.",
    highlights: [
      "Driveway & lot plowing",
      "Walkway clearing",
      "De-icing & salt",
      "Per-storm or seasonal",
    ],
    body: [
      {
        heading: "Skip the shoveling",
        text: "Mex Landscaping offers expert snow removal services. We keep your property safe and clear this winter — driveways, lots, and walkways — with reliable response on every snowfall.",
      },
      {
        heading: "Coverage that fits",
        text: "Choose per-storm or seasonal coverage for homes, businesses, and HOAs, with priority response when it counts.",
      },
    ],
  },

  // ---------------- HARDSCAPE ----------------
  {
    path: "/hardscape-services/",
    title: "Hardscape Services",
    category: "hardscape",
    icon: "stone",
    intro:
      "Patios, walls, and walkways that turn a yard into a destination — built durable and beautiful.",
    highlights: [
      "Patios & walkways",
      "Retaining walls",
      "Driveways & stone facades",
      "Engineered base & drainage",
    ],
    body: [
      {
        heading: "Built-to-last stonework",
        text: "We design and build hardscapes that hold up for decades — with proper base prep and drainage that keep everything level and beautiful. From patios to walls to walkways, we build for how you live outside.",
      },
      {
        heading: "Where the difference is hidden",
        text: "The longevity of any hardscape lives in the base you never see. We never cut corners there — that's why our work lasts.",
      },
    ],
  },
  {
    path: "/patios/",
    title: "Patios",
    category: "hardscape",
    icon: "stone",
    intro:
      "Paver and natural-stone patios built for years of gatherings — level, durable, and beautiful.",
    highlights: [
      "Paver & natural stone options",
      "Engineered base & drainage",
      "Custom shapes & borders",
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
    path: "/driveways/",
    title: "Driveways",
    category: "hardscape",
    icon: "stone",
    intro:
      "Paver and stone driveways with lasting curb appeal and the base to handle weight and weather.",
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
        text: "From classic pavers to natural stone, we finish your driveway with clean borders and transitions that elevate your whole property.",
      },
    ],
  },
  {
    path: "/architectural-stone-facades/",
    title: "Architectural Stone & Facades",
    category: "hardscape",
    icon: "stone",
    intro:
      "Stone veneer that elevates walls, columns, and entries with rich, durable detailing.",
    highlights: [
      "Natural & manufactured veneer",
      "Columns, walls & entries",
      "Weather-resistant installation",
      "Custom color & texture matching",
    ],
    body: [
      {
        heading: "Texture and richness, built in",
        text: "Add depth and character with architectural stone facades on columns, walls, and outdoor structures. We install natural and manufactured veneer with clean, durable detailing.",
      },
      {
        heading: "Elevate your curb appeal",
        text: "The right stone facade transforms a plain surface into a striking feature — and we match color and texture to your home for a seamless look.",
      },
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
