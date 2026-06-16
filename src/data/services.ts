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
  /** Optional keyword-rich FAQ block (also emitted as FAQPage schema). */
  faqs?: { q: string; a: string }[];
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
        heading: "Landscape design and build under one roof",
        text: "A great outdoor space starts with a great plan. Mex Landscaping is a design-build landscaping firm serving Norristown and the Main Line, which means the same team that designs your landscape also builds it. We design thoughtful, site-specific plans that balance structure, planting, light, grading, and flow, then install them with our own crews. The vision that gets drawn is the vision that gets delivered, with no gap between the designer's intent and the finished result.",
      },
      {
        heading: "What a landscape design includes",
        text: "A complete design considers far more than where the plants go. We plan the hardscape and circulation, the planting palette for four-season interest, grading and drainage, lighting, and how each area connects to the next and to the house. For larger properties we phase the work so a big vision can be built in stages. The goal is a landscape that looks intentional, functions in every season, and grows in beautifully over time.",
      },
      {
        heading: "Planting design that looks good all year",
        text: "Thoughtful planting is what separates a designed landscape from a collection of shrubs. We layer specimen trees, structural evergreens, flowering shrubs, ornamental grasses, and perennials so there is texture and color across spring, summer, fall, and winter. Every selection is matched to your light, soil, and maintenance appetite, and placed with proper spacing so the planting reads as deliberate the day it goes in and only gets better as it matures.",
      },
      {
        heading: "Full redesign or a single refined area",
        text: "Some clients are reimagining an entire property; others want to elevate one tired area or finally finish the front of the house. We work at both scales. You get a clear plan, a realistic timeline, an honest budget, and the same attention to detail whether we are rebuilding the whole landscape or perfecting a single garden bed and entry.",
      },
      {
        heading: "Residential and commercial design in Norristown and the Main Line",
        text: "We provide landscape design and installation for homes and commercial properties across Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Every project begins with a free consultation to understand your goals, your property, and your budget. Call (484) 261-6650 or request a free estimate to start the conversation.",
      },
    ],
    faqs: [
      {
        q: "What does design-build landscaping mean?",
        a: "Design-build means one company handles both the design and the construction of your landscape. Instead of hiring a designer, then finding a separate contractor to interpret the plan, you work with a single accountable team from concept to completion. It keeps the design grounded in what can actually be built on your site and avoids costly miscommunication.",
      },
      {
        q: "How much does landscape design cost?",
        a: "It depends on the size and complexity of the property and how much of it you want to address. A focused plan for one area is modest; a full-property master plan with hardscape, planting, lighting, and drainage is a larger investment. We discuss scope and budget up front and provide a clear estimate so you can decide how to proceed or phase the work.",
      },
      {
        q: "Can you work in phases to fit my budget?",
        a: "Yes. We can create a full master plan, then build it in stages over time. Designing the whole vision first is important because it ensures each phase connects cleanly with the next, so a project built over a couple of seasons still looks like one cohesive landscape when it is done.",
      },
      {
        q: "Do you handle plantings, hardscape, lighting, and drainage together?",
        a: "Yes. Because we do all of it in-house, your patio, walls, plantings, lighting, and drainage are designed to work as one system. That coordination is hard to get when separate contractors handle each piece, and it is a big part of why design-build produces a more finished, cohesive result.",
      },
      {
        q: "Do you design for commercial properties too?",
        a: "We do. We design and install landscapes for commercial properties, HOAs, and businesses across the Main Line, and we can pair the installation with a recurring maintenance plan so the property stays sharp year-round with one accountable partner.",
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
        heading: "Full-service hardscaping in Norristown and the Main Line",
        text: "Hardscaping is the structural backbone of any outdoor space: the patios, walkways, walls, driveways, and steps that give a yard its shape and make it usable. Mex Landscaping is a design-build hardscape contractor serving Norristown and the Main Line, and we handle every piece in-house. Because one team designs and builds the whole project, the stonework, grading, and drainage all work together instead of being stitched together by different crews.",
      },
      {
        heading: "Everything we build in stone and paver",
        text: "Our hardscaping covers paver and natural stone patios, walkways and garden paths, steps and stairs, retaining and seating walls, paver and stone driveways, fire pits and fire features, outdoor kitchens, and architectural stone veneer. We work in concrete pavers, natural flagstone and bluestone, full stone and boulders, brick, and porcelain, matching materials to your home and how each space will be used.",
      },
      {
        heading: "The engineered base behind every project",
        text: "Good hardscaping is built from the bottom up. Every patio, walkway, wall, and driveway we install starts with excavation to the proper depth, a compacted aggregate base, and drainage built in so water moves away instead of pooling or freezing under the surface. Edge restraints, geogrid where walls require it, and polymeric jointing lock everything in place. The base is invisible once we are done, and it is the single biggest reason our work stays level and tight for decades.",
      },
      {
        heading: "Designed as one cohesive outdoor space",
        text: "The best results come from planning the hardscape as a whole. A patio flows into a walkway, a seating wall frames a fire pit, lighting traces the steps, and the driveway and entry share the same materials. We design the elements to connect, then build them in a logical sequence so the finished property looks intentional and complete rather than assembled piece by piece over the years.",
      },
      {
        heading: "Your local design-build hardscape contractor",
        text: "We build hardscaping throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Whether you need a single patio or a full backyard transformation, it starts with a free on-site estimate and a clear plan. Call (484) 261-6650 or request a free estimate to begin.",
      },
    ],
    faqs: [
      {
        q: "What is hardscaping?",
        a: "Hardscaping refers to the hard, built elements of a landscape: patios, walkways, driveways, retaining and seating walls, steps, fire features, and stonework. Softscaping is the living side, such as lawns, plantings, and trees. A complete outdoor space usually blends both, and we design and build the hardscape so the softscape has structure to grow around.",
      },
      {
        q: "Do you design as well as build?",
        a: "Yes. We are a design-build contractor, which means the same team plans your project and installs it. That avoids the common problem of a design that looks good on paper but does not account for grading, drainage, or how the pieces connect on a real site. You get one accountable point of contact from concept through completion.",
      },
      {
        q: "How much does a hardscaping project cost?",
        a: "It varies widely depending on scope, materials, square footage, and site conditions like slope and drainage. A single walkway is a modest project; a full backyard with a patio, walls, fire pit, and lighting is a larger investment. We provide a detailed, no-obligation estimate so you can see exactly what each element costs and phase the work if you like.",
      },
      {
        q: "Can a large project be done in phases?",
        a: "Yes, and many clients do exactly that. We can design the full vision up front, then build it in stages that fit your budget and timeline while making sure earlier phases are built to connect cleanly with what comes later. Planning the whole thing first is what keeps a phased project from looking piecemeal.",
      },
      {
        q: "What areas do you serve?",
        a: "We provide hardscaping throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, Conshohocken, Plymouth Meeting, and the surrounding communities. If you are nearby and not sure whether we cover your town, just call and ask.",
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
        heading: "Paver and natural stone patios, designed and built",
        text: "A patio is the foundation of any great backyard, and we build ours to be the room you spend the most time in. Mex Landscaping designs and installs custom paver patios, flagstone patios, and natural stone patios for homes across Norristown and the Main Line. From the first layout sketch to the final swept joint, one team handles the design and the build, so the patio that's drawn is the patio you get.",
      },
      {
        heading: "Patio materials that match your home",
        text: "The right material sets the whole tone. We install concrete pavers in a wide range of colors and textures, natural flagstone and bluestone, travertine, clay brick, and large-format porcelain. Pavers offer the best mix of durability, value, and repairability; natural stone brings a timeless, high-end look. We walk you through the options, show you real samples, and recommend the surface that fits your home's style, your budget, and the way water moves across your yard.",
      },
      {
        heading: "The engineered base that makes a patio last",
        text: "Most failed patios fail underground. Settling, heaving, and weeds almost always trace back to a base that was rushed. We excavate to the proper depth, install and compact a graded aggregate base, and build in drainage and slope so water runs off instead of pooling. Polymeric sand locks the joints, and edge restraints hold everything tight. It is the part of the job you never see, and it is exactly why our patios stay level and crack-free for decades.",
      },
      {
        heading: "Designed for how you actually use the yard",
        text: "A patio works best as part of a bigger plan. We size and shape the space around real use: dining, lounging, a grill zone, a path to the door. From there we can integrate a fire pit, a seating wall, steps, low-voltage lighting, and surrounding plantings so the whole area reads as one finished outdoor room rather than a slab dropped in the grass.",
      },
      {
        heading: "Patio installation across Norristown and the Main Line",
        text: "We install patios throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Every project starts with a free on-site estimate where we measure the space, talk through materials, and give you a clear scope and price. Call (484) 261-6650 or request a free estimate to get your patio on the schedule.",
      },
    ],
    faqs: [
      {
        q: "How much does a paver patio cost in the Norristown area?",
        a: "Patio pricing depends on size, the material you choose, site access, and how much grading or drainage work the space needs. Pavers generally cost less than natural stone, and a simple, level patio costs less than one with curves, walls, steps, or a fire feature. We give you an itemized, no-obligation estimate after seeing the space so there are no surprises.",
      },
      {
        q: "Are pavers or stamped concrete better for a patio?",
        a: "Both look great, but they age differently. Pavers flex with our freeze-thaw winters and individual units can be lifted and reset if needed, so repairs are simple and nearly invisible. Stamped concrete is a single poured slab that can crack over time and is harder to repair seamlessly. We install both and will give you an honest recommendation for your property.",
      },
      {
        q: "How long does it take to install a patio?",
        a: "Most residential patios take a few days to a week of on-site work once we start, depending on size, material, and any walls, steps, or drainage involved. We give you a realistic timeline with your estimate and keep you updated as the work progresses.",
      },
      {
        q: "Do I need a permit for a patio in Montgomery County?",
        a: "An at-grade patio often does not require a permit, but rules vary by township and borough, and anything involving structures, significant grading, or proximity to property lines may. We are familiar with local requirements across Montgomery County and will let you know what applies to your project before we begin.",
      },
      {
        q: "Can you add a fire pit, lighting, or a seating wall to my patio?",
        a: "Yes, and it is usually most efficient to plan them together. Because we handle hardscaping, outdoor living, and landscape lighting in-house, we can build the patio with the base, conduit, and footings already in place for a fire feature, seating walls, or low-voltage lighting, so everything ties together cleanly.",
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
        heading: "Paver and stone driveways built for weight and weather",
        text: "Your driveway is the largest piece of hardscape on the property and the first thing anyone sees. Mex Landscaping designs and installs paver driveways, natural stone driveways, and Belgian block aprons and borders for homes across Norristown and the Main Line. A driveway carries thousands of pounds every day, so we engineer ours from the ground up to handle real loads and decades of freeze-thaw without rutting, cracking, or settling.",
      },
      {
        heading: "Driveway materials and finishes",
        text: "Interlocking concrete pavers are the workhorse choice: extremely strong, available in many colors and patterns, and easy to repair because individual units can be lifted and reset. Natural stone and cobble deliver an old-world, high-end look, and Belgian block makes a clean, classic border or apron. We help you choose a finish that complements the home's architecture and holds its color and texture for years.",
      },
      {
        heading: "The heavy-duty base under every driveway",
        text: "A driveway lives or dies on its base. We excavate to the correct depth for vehicle loads, install and compact a deep aggregate base in lifts, and integrate drainage so water never sits under or runs across the surface. Edge restraints and a proper apron transition keep the pavers locked in at the street and the garage. This engineered foundation is the difference between a driveway that looks great for twenty years and one that fails in three.",
      },
      {
        heading: "Drainage and curb appeal that work together",
        text: "A driveway has to shed water correctly or it will undermine itself and your foundation. We grade for positive drainage and can add channel drains or permeable sections where runoff is a concern. Then we finish with clean borders, banding, and transitions to walkways and entries so the driveway reads as a designed feature, not just a place to park.",
      },
      {
        heading: "Driveway installation in Norristown and across the Main Line",
        text: "We replace and install driveways throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Every project begins with a free on-site estimate covering material, base, drainage, and a clear price. Call (484) 261-6650 or request a free estimate to get started.",
      },
    ],
    faqs: [
      {
        q: "How much does a paver driveway cost?",
        a: "Driveway cost depends on square footage, the material you choose, how much existing surface has to be removed, and the base and drainage the site needs. Pavers cost more up front than asphalt but last far longer and are easy to repair, which often makes them the better long-term value. We provide a detailed, no-obligation estimate after measuring your driveway.",
      },
      {
        q: "Are pavers better than asphalt or poured concrete for a driveway?",
        a: "For longevity and looks, yes. Pavers handle our freeze-thaw cycles by flexing slightly instead of cracking, individual units can be reset if a tree root or settling shifts them, and they add real curb appeal. Asphalt is cheaper initially but needs ongoing sealing and resurfacing, and poured concrete can crack and is hard to repair invisibly.",
      },
      {
        q: "How long does a driveway installation take?",
        a: "Most residential paver driveways take roughly one to two weeks of on-site work, depending on size, demolition of the old surface, and any drainage or grading involved. We give you a firm timeline with your estimate and coordinate so you keep vehicle access where possible during the work.",
      },
      {
        q: "Can you replace my old asphalt or concrete driveway with pavers?",
        a: "Yes. We remove the existing surface, correct the grade and base, address any drainage problems, and install your new paver or stone driveway on a properly engineered foundation. Replacing a tired driveway is one of the highest-impact upgrades you can make to a home's curb appeal.",
      },
      {
        q: "Will a new driveway help with water pooling or runoff?",
        a: "It can. Because we regrade and rebuild the base, a new driveway is the ideal time to fix drainage. We slope the surface to shed water correctly and can integrate channel drains or permeable paving where runoff is an issue, protecting both the driveway and your foundation.",
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
        heading: "Engineered retaining walls that hold for good",
        text: "A retaining wall does real structural work: it holds back soil, controls erosion, and turns a steep, unusable slope into level, livable yard. Mex Landscaping designs and builds retaining walls and seating walls across Norristown and the Main Line, from low garden walls to tall tiered systems. We build them to engineering standards so they handle the load behind them and stay straight and true for decades, not just for a season or two.",
      },
      {
        heading: "Wall materials: block, natural stone, and boulders",
        text: "We build with segmental retaining wall block, natural stone veneer, dry-stacked and mortared stone, and natural boulders. Segmental block systems are engineered, cost-effective, and available in finishes that mimic natural stone. Full natural stone and boulder walls bring a rugged, high-end character. We match the material to the wall's height, the load it carries, and the look of your home and landscape.",
      },
      {
        heading: "Why drainage and base prep make or break a wall",
        text: "The walls that bulge, lean, and topple almost always failed for the same reasons: no drainage and a weak base. Water building up behind a wall creates enormous pressure. We install a compacted base, geogrid reinforcement where height requires it, free-draining backfill, and drain pipe so water has somewhere to go. That hidden detailing is what separates a wall that lasts from one you rebuild in five years.",
      },
      {
        heading: "Seating walls and tiered terraces that add usable space",
        text: "Walls can do double duty. A seating wall rings a patio or fire pit with built-in seating and definition. Tiered or terraced walls break a tall grade into a series of planting beds or level landings, which often looks better and performs better than one tall wall. We design walls that solve a grading problem and create an outdoor room at the same time.",
      },
      {
        heading: "Retaining wall contractor for Norristown and the Main Line",
        text: "We build retaining and seating walls throughout Montgomery County and the Main Line, including the sloped lots common in Norristown, Conshohocken, and the surrounding areas. Every wall starts with a free on-site assessment of the grade, soil, and drainage so we can recommend the right system. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How much does a retaining wall cost?",
        a: "Cost depends mostly on height, length, and material, plus how much excavation, reinforcement, and drainage the site requires. Taller walls need engineering and reinforcement, which adds cost, while a low garden or seating wall is more modest. We assess the grade and soil on-site and give you a clear, itemized estimate.",
      },
      {
        q: "Do tall retaining walls need engineering or a permit?",
        a: "Often, yes. Many townships require engineered drawings and a permit for walls over a certain height, typically around four feet, and for walls that carry extra load such as a driveway above them. We are familiar with local requirements across Montgomery County and the Main Line and will handle the engineering and permitting your wall needs.",
      },
      {
        q: "Why do retaining walls fail, and how do you prevent it?",
        a: "The two biggest causes are poor drainage and a weak base. We prevent both with a compacted aggregate base, free-draining gravel backfill, drain pipe to relieve water pressure, and geogrid reinforcement on taller walls. Building it right underground is the entire reason our walls stay put.",
      },
      {
        q: "Can a retaining wall double as seating?",
        a: "Absolutely. Seating walls are one of the most popular features we build. We can cap a wall at seat height around a patio or fire pit so it provides structure, definition, and built-in seating all at once, which is a great way to add capacity without crowding the space with furniture.",
      },
      {
        q: "Can you fix or replace a leaning or failing wall?",
        a: "Yes. We assess whether the existing wall can be rebuilt or needs full replacement, identify the drainage or base issue that caused the failure, and build the new wall correctly so the problem does not return. Catching a leaning wall early often saves cost versus waiting for it to collapse.",
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
        heading: "Custom outdoor living spaces, designed and built",
        text: "The best backyards feel like another room of the house, just without the walls. Mex Landscaping designs and builds complete outdoor living spaces across Norristown and the Main Line: fire pits and fireplaces, outdoor kitchens and bars, covered structures, water features, and the patios, walls, and lighting that tie everything together. One team designs the whole environment and builds it, so the space functions as a unified outdoor room rather than a set of disconnected features.",
      },
      {
        heading: "Fire features, kitchens, and water",
        text: "An outdoor living space is built from the features you will actually use. We build custom fire pits and fireplaces for cooler evenings, full outdoor kitchens with built-in grills, counters, and bar seating for entertaining, and water features that add sound and calm. Pergolas, seating walls, and shade structures define the space, and we coordinate the materials so the kitchen, fire feature, and patio all clearly belong together.",
      },
      {
        heading: "Designed around how you actually live outside",
        text: "Before we build anything, we figure out how you want to use the yard. Quiet evenings around a fire call for a different layout than hosting twenty people for dinner. We plan zones for cooking, dining, lounging, and gathering, size the hardscape to match, and lay out traffic flow so the space feels comfortable whether it is just your family or a full party.",
      },
      {
        heading: "Lighting and comfort that extend the season",
        text: "The right details keep you outside longer. Low-voltage lighting makes the space usable and beautiful after dark, a fire feature pushes the season into spring and fall, and thoughtful layout keeps cooking, seating, and traffic from colliding. We build these comfort elements into the plan from the start rather than tacking them on later.",
      },
      {
        heading: "Outdoor living builders for Norristown and the Main Line",
        text: "We design and build outdoor living spaces throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Whether you are starting with a blank yard or adding to an existing patio, it begins with a free on-site consultation. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What is included in an outdoor living space?",
        a: "It is whatever fits how you use the yard. Common elements include a patio, a fire pit or fireplace, an outdoor kitchen or bar, seating walls, a pergola or shade structure, water features, and landscape lighting. We design the combination around your priorities and budget, and because we build it all in-house, the pieces are coordinated to work as one space.",
      },
      {
        q: "How much does an outdoor living space cost?",
        a: "Cost depends entirely on scope, from a patio with a fire pit to a full setup with an outdoor kitchen, fireplace, and covered structure. We give you an itemized estimate so you can see what each feature adds, and many clients build in phases, starting with the patio and fire feature and adding the kitchen or other elements later.",
      },
      {
        q: "Can you build an outdoor kitchen and fire feature together?",
        a: "Yes, and planning them together is the smart move. We can lay out the kitchen, fire feature, seating, and patio as one design, run any gas and electrical and set footings during the build, and match the stone and finishes so the whole space looks intentional rather than assembled over time.",
      },
      {
        q: "Should I add a fire pit or a fireplace?",
        a: "Both extend your season; the right choice depends on the space and the feel you want. A fire pit is open, social, and great for gathering a group around the flame. An outdoor fireplace is more of an architectural focal point and can provide a bit of wind shelter and directed heat. We help you weigh layout, budget, and use to decide.",
      },
      {
        q: "Can you add to my existing patio?",
        a: "Often, yes. We can assess your current patio and base, then add a fire feature, seating wall, kitchen, or lighting that ties into what you already have. If the existing hardscape is not built to support new features, we will tell you honestly what is needed to do it right.",
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
        heading: "Custom fire pits that anchor the backyard",
        text: "A fire feature turns an ordinary patio into a destination, the spot everyone gathers around once the sun goes down. Mex Landscaping designs and builds custom fire pits and fire features for homes across Norristown and the Main Line. These are not drop-in kits; we build permanent, custom features in stone, block, and brick, sized and finished to match your patio and the way you want to use the space.",
      },
      {
        heading: "Wood-burning and gas fire features",
        text: "We build both wood-burning and gas fire features, and the right choice comes down to how you like to use it. Wood-burning pits deliver the classic crackle, aroma, and bigger flame that many people love. Gas fire pits and fireplaces light instantly, burn cleanly, and shut off with a switch, which makes them effortless for a quick evening outside. We will walk you through the trade-offs and handle the gas line where one is needed.",
      },
      {
        heading: "In-ground pits, built-up features, and fireplaces",
        text: "From a simple in-ground fire pit to a built-up circular feature with a sitting ledge to a full outdoor fireplace, we build the format that fits your space. We match the stone, block, or brick to your patio and surrounding hardscape so the feature looks original to the design rather than added on afterward, and we can pair it with a surrounding seating wall for built-in seating.",
      },
      {
        heading: "Built safely, sited correctly",
        text: "A fire feature has to be built right to be enjoyed without worry. We handle proper siting and clearances from the house and plantings, fire-rated materials and liners, drainage so the pit does not hold water, and code-aware gas work where applicable. Done correctly, your fire feature is as safe as it is beautiful, and it pairs naturally with seating walls, patio lighting, and the rest of your outdoor space.",
      },
      {
        heading: "Fire pit installation in Norristown and the Main Line",
        text: "We build fire pits and fire features throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether as part of a new patio or an addition to an existing one. It starts with a free on-site estimate. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "Should I get a wood-burning or gas fire pit?",
        a: "It comes down to how you will use it. Wood-burning gives you the traditional crackle, scent, and larger flame, but takes fuel, tending, and cleanup. Gas lights instantly, burns clean, and turns off with a switch, which makes it far more convenient for spur-of-the-moment evenings. We build both and will help you choose based on your habits and the space.",
      },
      {
        q: "How much does a custom fire pit cost?",
        a: "A simple in-ground wood-burning pit is the most affordable option, while a built-up gas feature or full outdoor fireplace with a gas line and matching stonework costs more. Pricing depends on size, materials, and whether gas needs to be run. We provide a clear, no-obligation estimate after seeing your space.",
      },
      {
        q: "Can you add a fire pit to my existing patio?",
        a: "Usually, yes. We assess your patio and its base, then build the fire feature so it integrates with the existing hardscape and drainage. If gas is involved, we coordinate the line. If the patio needs reinforcement to carry a built-up feature, we will tell you up front.",
      },
      {
        q: "Are custom-built fire pits safe near the house?",
        a: "When they are built and sited correctly, yes. We follow proper clearances from structures and plantings, use fire-rated materials and liners, build in drainage, and keep gas work code-aware. Correct siting and materials are exactly what makes the difference between a safe permanent feature and a hazard.",
      },
      {
        q: "Can a fire pit include built-in seating?",
        a: "Yes. A seating wall built around the fire feature is one of the most popular combinations we install. It rings the fire with permanent seating, defines the space, and adds capacity without filling the patio with furniture. We design the two together so the proportions and materials match.",
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
        heading: "Concrete and masonry contractor for Norristown and the Main Line",
        text: "Concrete and masonry are the structural craft behind a property that lasts. Mex Landscaping provides poured and stamped concrete and full masonry services across Norristown and the Main Line, from patios and driveways to steps, slabs, walls, and stonework. We pour, finish, and build with the prep and detailing that keep concrete level and crack-resistant and masonry tight and true, year after year through our freeze-thaw winters.",
      },
      {
        heading: "Stamped and decorative concrete",
        text: "Concrete does not have to look plain. Stamped concrete can mimic the look of pavers, brick, flagstone, or natural stone at a single poured surface, and decorative finishes and colors add character to patios, walkways, and pool surrounds. We form, pour, and finish stamped-concrete patios, driveways, and steps with proper joints and curing so the surface stays attractive and resists cracking.",
      },
      {
        heading: "Poured concrete driveways, steps, and slabs",
        text: "For driveways, walkways, steps, footings, and slabs, we pour concrete on a properly prepared and compacted base with the right reinforcement and control joints. That groundwork is what keeps a slab from heaving and cracking over time. Whether it is a new garage slab, a set of front steps, or a full driveway, we build it to stay level and solid.",
      },
      {
        heading: "Brick and stone masonry",
        text: "Our masonry work covers brick and natural stone, structural and freestanding walls, piers and columns, steps, footings, and repairs. Masonry is foundational work in every sense, the kind of craftsmanship that holds a whole project together and reads as permanent. We match mortar, color, and coursing carefully so new masonry blends with existing work or stands on its own as a clean, deliberate feature.",
      },
      {
        heading: "Built to last across Montgomery County",
        text: "We provide concrete and masonry throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Every project starts with a free on-site estimate covering prep, materials, finish, and a clear price. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "Is stamped concrete or pavers better for a patio or driveway?",
        a: "Each has its place. Stamped concrete gives a continuous, custom-patterned surface and can cost less to install than pavers, but it is a single slab that can crack and is harder to repair invisibly. Pavers flex with freeze-thaw and individual units can be reset. We install both and will give you an honest recommendation for your project and budget.",
      },
      {
        q: "Why does concrete crack, and how do you prevent it?",
        a: "Most cracking comes from a poor base, missing control joints, or improper curing. We prevent it by excavating and compacting a proper base, adding reinforcement and correctly spaced control joints, and curing the concrete properly. Doing the groundwork right is what keeps a slab level and crack-resistant for the long haul.",
      },
      {
        q: "Can you match or repair existing brick or stonework?",
        a: "Yes. We take care to match mortar color, joint style, and coursing so repairs and additions blend with your existing masonry. Whether it is a damaged section of wall, worn steps, or new work alongside old, we aim for a result that looks original rather than patched.",
      },
      {
        q: "How much does concrete or masonry work cost?",
        a: "It depends on the type of work, the square footage or wall area, the finish you choose, and the site prep required. A plain slab is more economical than a large stamped-concrete patio or detailed stonework. We provide a clear, itemized estimate after assessing the project on-site.",
      },
      {
        q: "Do you handle the base prep and drainage too?",
        a: "Yes. We handle the full job, including excavation, base preparation, reinforcement, and drainage. That foundational prep is exactly what determines whether concrete and masonry last, so we never treat it as an afterthought or hand it off to someone else.",
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
