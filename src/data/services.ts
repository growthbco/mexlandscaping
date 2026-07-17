// Service pages, keyed by their live URL path. Positioned around high-end
// design/build, hardscaping, outdoor living, and split rail fencing — with the
// commodity maintenance pages kept (for SEO) but demoted to a secondary group.
// Real per-page titles/descriptions still come from src/data/seo.generated.ts
// where they exist; new premium pages define their own meta inline.

export type ServiceCategory =
  | "design-build"
  | "hardscaping"
  | "outdoor-living"
  | "snow"
  | "maintenance";

export type ServiceGalleryItem = { src: string; alt: string; caption: string };

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
  /** Optional real project photos rendered as a captioned grid on the page. */
  gallery?: ServiceGalleryItem[];
  /** Optional keyword-rich FAQ block (also emitted as FAQPage schema). */
  faqs?: { q: string; a: string }[];
  featured?: boolean;
};

export const categoryLabels: Record<ServiceCategory, string> = {
  "design-build": "Landscape Design & Build",
  hardscaping: "Hardscaping",
  "outdoor-living": "Outdoor Living",
  snow: "Snow Management",
  maintenance: "Property Maintenance",
};

export const categoryHubs: Record<ServiceCategory, string> = {
  "design-build": "/landscape-design/",
  hardscaping: "/hardscape-services/",
  "outdoor-living": "/outdoor-living/",
  snow: "/snow-management-services/",
  maintenance: "/property-maintenance/",
};

export const categoryIcon: Record<ServiceCategory, Service["icon"]> = {
  "design-build": "leaf",
  hardscaping: "stone",
  "outdoor-living": "flame",
  snow: "snow",
  maintenance: "leaf",
};

// Categories that headline the brand (drive the homepage + primary nav).
export const premiumCategories: ServiceCategory[] = [
  "design-build",
  "hardscaping",
  "outdoor-living",
];

export const services: Service[] = [
  // ---------------- DESIGN & BUILD ----------------
  {
    path: "/landscape-design/",
    title: "Landscape Design & Build",
    category: "design-build",
    icon: "leaf",
    image: "/images/lighting-dusk.webp",
    featured: true,
    intro:
      "Full-service landscape design and installation, from a complete property redesign to refined planting, lighting, and grading. We design it, then our own crews build it.",
    gallery: [
      {
        src: "/images/curb-colonial.webp",
        alt: "Sculpted boxwood island bed in a fresh landscape design",
        caption: "Sculpted boxwood island bed",
      },
      {
        src: "/images/design-front-beds.webp",
        alt: "Fresh mulch beds and new plantings at the front of a home",
        caption: "Fresh mulch and new plantings",
      },
      {
        src: "/images/design-porch-beds.webp",
        alt: "River-rock foundation bed along a front porch",
        caption: "River-rock foundation bed",
      },
      {
        src: "/images/design-maple-beds.webp",
        alt: "Mulched planting beds with a Japanese maple",
        caption: "Beds with Japanese maple",
      },
      {
        src: "/images/curb-tan-house.webp",
        alt: "Fresh foundation beds and layered plantings at a home",
        caption: "Foundation beds and plantings",
      },
      {
        src: "/images/curb-craftsman.webp",
        alt: "Craftsman home with fresh curb appeal landscaping",
        caption: "Craftsman curb appeal",
      },
    ],
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
        text: "A complete design considers far more than where the plants go. We plan the <a href=\"/hardscape-services/\">hardscape</a> and circulation, the planting palette for four-season interest, grading and <a href=\"/storm-water-management/\">drainage</a>, <a href=\"/landscape-lighting/\">landscape lighting</a>, and how each area connects to the next and to the house. For larger properties we phase the work so a big vision can be built in stages. The goal is a landscape that looks intentional, functions in every season, and grows in beautifully over time.",
      },
      {
        heading: "Planting design that looks good all year",
        text: "Thoughtful planting is what separates a designed landscape from a collection of shrubs. We layer <a href=\"/tree-plant-installation/\">specimen trees and plantings</a>, structural evergreens, flowering shrubs, ornamental grasses, and perennials so there is texture and color across spring, summer, fall, and winter. Every selection is matched to your light, soil, and maintenance appetite, and placed with proper spacing so the planting reads as deliberate the day it goes in and only gets better as it matures.",
      },
      {
        heading: "Full redesign or a single refined area",
        text: "Some clients are reimagining an entire property; others want to elevate one tired area or finally finish the front of the house. We work at both scales. You get a clear plan, a realistic timeline, an honest budget, and the same attention to detail whether we are rebuilding the whole landscape or perfecting a single garden bed and entry.",
      },
      {
        heading: "Residential and commercial design in Norristown and the Main Line",
        text: "We provide landscape design and installation for homes and <a href=\"/commercial-landscaping/\">commercial properties</a> across Montgomery County and the Main Line, including <a href=\"/landscape-design-hardscaping-in-norristown-pa/\">Norristown</a>, <a href=\"/landscape-design-hardscaping-in-king-of-prussia-pa/\">King of Prussia</a>, <a href=\"/landscape-design-hardscaping-in-wayne-pa/\">Wayne</a>, Bryn Mawr, and Conshohocken. Every project begins with a free consultation to understand your goals, your property, and your budget. Call (484) 261-6650 or request a free estimate to start the conversation.",
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
    path: "/lawn-installation/",
    title: "Lawn Installation",
    category: "design-build",
    icon: "leaf",
    image: "/images/turf-deck.webp",
    intro:
      "New sod and seeded lawns engineered to establish fast and last, with the soil prep and grading that make the difference.",
    gallery: [
      {
        src: "/images/sod-seeded.webp",
        alt: "Freshly installed new lawn",
        caption: "New lawn installation",
      },
      {
        src: "/images/turf-pool.webp",
        alt: "Artificial turf lawn and bluestone beside a pool",
        caption: "Turf and bluestone at the pool",
      },
      {
        src: "/images/curb-stone-house.webp",
        alt: "Stone-front home with a healthy established lawn",
        caption: "Stone-front home and lawn",
      },
    ],
    highlights: [
      "Soil prep & precision grading",
      "Premium sod or seed blends",
      "Drainage-aware installation",
      "Establishment guidance",
    ],
    body: [
      {
        heading: "New lawn installation in Norristown and the Main Line",
        text: "A thick, healthy lawn is the backdrop the whole landscape is set against, and a tired or patchy one drags everything down. Mex Landscaping installs new sod and seeded lawns for homes and commercial properties across Norristown and the Main Line. Whether you want the instant green of fresh sod or a seeded lawn built for durability and value, we handle the work that actually determines success: removing old turf, correcting the grade, preparing the soil, and installing turf matched to your light and traffic.",
      },
      {
        heading: "Sod or seed: choosing the right approach",
        text: "Both methods can produce a beautiful lawn; the right one depends on your timeline, budget, and site. Sod gives you a finished, established-looking lawn almost immediately, which is ideal for slopes prone to erosion or when you want fast results. A seeded lawn costs less and lets us tailor the blend precisely to sun, shade, and wear. We help you weigh the trade-offs and select a premium turf or seed blend suited to our Montgomery County climate.",
      },
      {
        heading: "Soil prep and grading make the difference",
        text: "Most failed lawns fail before a single blade goes down. Compacted, poor soil and improper grading lead to thin turf, pooling water, and constant struggle. We grade for positive drainage so water sheds away from the house, then prepare and amend the soil to give roots something to grow into. This groundwork is invisible once the lawn is green, and it is the single biggest reason our installations establish quickly and stay healthy.",
      },
      {
        heading: "Set up for the long run",
        text: "We do not lay turf and walk away. A new lawn needs the right start to root deeply, so we set yours up to establish and give you clear guidance on watering and early care during the critical first weeks. A lawn that roots deeply is more drought-tolerant, more disease-resistant, and far easier to maintain. We can also fold ongoing lawn care into a recurring maintenance plan if you would rather hand it off entirely.",
      },
      {
        heading: "Lawn installation across Montgomery County",
        text: "We install new lawns throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Every project starts with a free on-site estimate where we look at your soil, grade, and light, then recommend sod or seed and give you a clear scope and price. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "Is sod or seed better for a new lawn?",
        a: "Both work well. Sod gives you an instant, established lawn and is great for slopes or when you want fast results, but it costs more up front. Seed is more economical and lets us tailor the blend to your conditions, though it takes longer to fill in. We recommend the right approach after seeing your site.",
      },
      {
        q: "How much does new lawn installation cost?",
        a: "Cost depends on the square footage, whether you choose sod or seed, how much old turf has to be removed, and the grading and soil prep the site needs. Sod costs more than seed up front. We provide a clear, no-obligation estimate after measuring the area and assessing the soil and grade.",
      },
      {
        q: "When is the best time to install a lawn?",
        a: "In our area, fall is often ideal for seeding because cooler temperatures and steady moisture help new grass establish, and spring is a strong second window. Sod can be installed across most of the growing season. We will advise on the best timing for your property and the method you choose.",
      },
      {
        q: "How long before I can use my new lawn?",
        a: "New sod typically needs a few weeks of careful watering before normal use so the roots can knit into the soil. A seeded lawn takes longer to fill in and should be kept off until it is well established. We give you specific guidance for your installation so the lawn gets the start it needs.",
      },
      {
        q: "Do you fix the drainage and soil, or just lay the lawn?",
        a: "We handle the full job, including grading for drainage and preparing the soil. That groundwork is exactly what determines whether a lawn thrives, so we never skip it. If your yard has standing water or compaction issues, installing a new lawn is the right time to correct them.",
      },
    ],
  },
  {
    path: "/tree-plant-installation/",
    title: "Tree & Plant Installation",
    category: "design-build",
    icon: "leaf",
    image: "/images/design-maple-beds.webp",
    intro:
      "Specimen trees, layered shrubs, and perennial plantings, sourced healthy and placed with a designer's eye.",
    gallery: [
      {
        src: "/images/design-maple-beds.webp",
        alt: "Japanese maple planted in a mulched bed",
        caption: "Japanese maple in a mulched bed",
      },
      {
        src: "/images/curb-colonial.webp",
        alt: "Sculpted boxwood plantings in an island bed",
        caption: "Sculpted boxwood plantings",
      },
      {
        src: "/images/curb-tan-house.webp",
        alt: "Foundation beds and layered plantings at a home",
        caption: "Foundation beds and plantings",
      },
    ],
    highlights: [
      "Specimen & native selections",
      "Layered, four-season interest",
      "Proper siting & amended soil",
      "Establishment care",
    ],
    body: [
      {
        heading: "Tree and plant installation, placed with a designer's eye",
        text: "Thoughtful planting is what separates a designed landscape from a random collection of shrubs. Mex Landscaping installs specimen trees, layered shrubs, and perennial plantings for properties across Norristown and the Main Line. We source healthy material and place it with proper spacing, amended soil, and an eye for how the planting will read in every season. The result looks deliberate the day it goes in and grows into something even better as it matures over the years.",
      },
      {
        heading: "Specimen trees, shrubs, and perennials",
        text: "A strong planting layers different roles. Specimen and shade trees give a property structure and scale, evergreens add year-round form and screening, flowering shrubs and perennials bring color and texture, and ornamental grasses add movement. We select a mix that delivers four-season interest, including native options well suited to Montgomery County, so there is something working in spring bloom, summer fullness, fall color, and winter structure rather than one short burst and a long flat stretch.",
      },
      {
        heading: "The right plant in the right place",
        text: "Even a beautiful plant struggles in the wrong spot. We match every selection to your light, soil, moisture, and how much maintenance you want to take on, then site it with proper spacing so it has room to reach mature size without crowding. Trees and shrubs go in with amended soil and correct planting depth, the details that quietly determine whether new plantings thrive or limp along for years. Good siting up front prevents most planting problems down the road.",
      },
      {
        heading: "Establishment care for healthy plantings",
        text: "Getting plants in the ground is only the start. New trees and shrubs need the right care through their first season to root in and establish, so we give you clear guidance on watering and early care, and we can fold ongoing plant health into a maintenance plan. We also coordinate plantings with your <a href=\"/hardscape-services/\">hardscape</a>, <a href=\"/landscape-lighting/\">lighting</a>, and lawn so the whole landscape reads as one cohesive design rather than separate projects placed side by side.",
      },
      {
        heading: "Planting installation in Norristown and the Main Line",
        text: "We install trees, shrubs, and perennials throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether as a single bed renovation or part of a full <a href=\"/landscape-design/\">landscape design</a>. It starts with a free on-site consultation where we look at your conditions and goals. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What is the best time of year to plant trees and shrubs?",
        a: "Spring and fall are generally the best windows in our area because milder temperatures and steady moisture help new plants establish with less stress. That said, with proper care many trees and shrubs can be planted across much of the growing season. We will advise on timing based on the specific plants and your site.",
      },
      {
        q: "Do you use native plants?",
        a: "Yes. We include native trees, shrubs, and perennials wherever they fit the design, since they are well adapted to Montgomery County conditions and tend to be lower maintenance and supportive of local pollinators. We blend natives with other quality selections to get the look, structure, and four-season interest the design calls for.",
      },
      {
        q: "How much does tree and plant installation cost?",
        a: "It depends on the number and size of plants, the species you choose, and any soil amendment or bed preparation involved. A single specimen tree is a modest project; a full bed renovation or a property-wide planting plan is a larger investment. We provide a clear estimate after seeing your site and discussing your goals.",
      },
      {
        q: "Will you make sure the plants survive?",
        a: "We plant healthy material with proper siting, soil amendment, and correct depth, which gives plantings the best chance to thrive, and we provide clear establishment guidance for the first season. Watering and early care matter a great deal, so we can also include ongoing plant health in a maintenance plan if you prefer to hand it off.",
      },
      {
        q: "Can you design the planting, not just install it?",
        a: "Absolutely. We are a design-build company, so we can create a planting plan that layers trees, shrubs, and perennials for four-season interest and coordinates with your hardscape, lawn, and lighting. Designing the planting first is what makes a landscape look intentional rather than like a series of one-off additions.",
      },
    ],
  },
  {
    path: "/landscape-lighting/",
    title: "Landscape Lighting",
    category: "design-build",
    icon: "light",
    image: "/images/lighting-dusk.webp",
    featured: true,
    intro:
      "Architectural low-voltage lighting that transforms your property after dark, highlighting the home, the trees, and the spaces you've built.",
    gallery: [
      {
        src: "/images/lighting-dusk.webp",
        alt: "Low-voltage architectural landscape lighting at dusk",
        caption: "Architectural lighting at dusk",
      },
      {
        src: "/images/firepit-lit.webp",
        alt: "Fire feature and patio glowing in the evening",
        caption: "Fire feature in the evening",
      },
    ],
    highlights: [
      "Architectural & path lighting",
      "Tree uplighting & moonlighting",
      "Smart controls & timers",
      "Weatherproof, low-maintenance",
    ],
    body: [
      {
        heading: "Landscape lighting that transforms a property after dark",
        text: "A property you spent years perfecting disappears at sunset unless it is lit well. Mex Landscaping designs and installs architectural low-voltage landscape lighting for homes across Norristown and the Main Line. Professionally designed lighting brings drama and warmth to the home's facade, the trees, and the hardscape you have built, while improving safety on steps and paths and extending the hours you actually spend outside. Done right, it makes a property look as considered at night as it does at noon.",
      },
      {
        heading: "Uplighting, path lighting, and moonlighting",
        text: "Great lighting design is about composing light and shadow, not flooding the yard. We use a layered mix of techniques: uplighting to graze the texture of stone facades and specimen trees, path and step lighting for safe, elegant circulation, moonlighting placed high in trees to cast a soft natural glow, and accent lighting to highlight focal points. Matching the right fixture and beam to each task is what gives a property depth and warmth instead of harsh, scattered glare.",
      },
      {
        heading: "Low-voltage LED built to last outdoors",
        text: "We install energy-efficient LED fixtures on a properly designed low-voltage system with weatherproof wiring and connections built to survive our seasons. LED draws very little power, runs cool, and lasts for years, which keeps operating costs low and maintenance minimal. We size the transformer and runs correctly and bury wiring cleanly so the system performs reliably and the daytime landscape stays uncluttered by visible hardware.",
      },
      {
        heading: "Smart controls and a system that runs itself",
        text: "The best lighting takes care of itself. We set up timers, photocells, and smart controls so the system comes on at dusk, dims or zones as you like, and turns off on schedule without you thinking about it. Because we also build <a href=\"/hardscape-services/\">hardscape</a> and <a href=\"/outdoor-living/\">outdoor living spaces</a>, we can integrate lighting into <a href=\"/patios/\">patios</a>, walls, steps, and trees as part of a unified design, running conduit during construction so fixtures tie in cleanly rather than being added on later.",
      },
      {
        heading: "Landscape lighting in Norristown and the Main Line",
        text: "We design and install landscape lighting throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether for a new build or an existing landscape. It starts with a free on-site consultation, often best at dusk, so we can plan the effect on your actual property. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How much does landscape lighting cost?",
        a: "Cost depends on the number of fixtures, the size of the property, the lighting effects you want, and how much wiring needs to be run. A focused entry and facade lighting plan is modest; lighting an entire property with trees, paths, and hardscape is a larger investment. We provide a clear estimate after walking the property and discussing the look you want.",
      },
      {
        q: "Is LED landscape lighting worth it?",
        a: "Yes. LED fixtures use a fraction of the power of older halogen systems, run cool, and last for years, which keeps both energy and maintenance costs low. The light quality is excellent and the long lifespan means far less fixture replacement, so an LED system is both better looking and more economical to run over time.",
      },
      {
        q: "Can you add lighting to an existing landscape?",
        a: "Absolutely. Low-voltage systems are well suited to existing properties because the wiring is shallow and can be installed with minimal disruption to established beds and lawns. We design the layout around your current landscape and hardscape so the lighting looks built-in rather than tacked on.",
      },
      {
        q: "Does landscape lighting improve safety?",
        a: "It does. Lighting steps, walkways, driveways, and entries reduces trip hazards and makes the property safer to navigate at night, while subtle perimeter and facade lighting also adds a layer of security. We balance safety lighting with the aesthetic effect so the property is both safer and more beautiful after dark.",
      },
      {
        q: "Do I need to turn the lights on and off myself?",
        a: "No. We set up timers, photocells, or smart controls so the system runs on its own, coming on at dusk and shutting off on schedule. You can also adjust zones and timing as you like. The goal is a system that simply works every night without you having to think about it.",
      },
    ],
  },
  {
    path: "/storm-water-management/",
    title: "Drainage & Storm Water Management",
    category: "design-build",
    icon: "drop",
    image: "/images/drainage-drycreek.webp",
    intro:
      "Yard drainage solutions built to last: French drains, dry wells, and grading that protect your property from standing water and erosion.",
    gallery: [
      {
        src: "/images/drainage-pipe.webp",
        alt: "French drain outlet discharging water away from the house",
        caption: "French drain outlet",
      },
      {
        src: "/images/drainage-riprap.webp",
        alt: "Rip-rap stone drainage swale on a slope",
        caption: "Rip-rap drainage swale",
      },
      {
        src: "/images/drainage-creek-steps.webp",
        alt: "Dry creek drainage channel with stone steps",
        caption: "Dry creek with stone steps",
      },
    ],
    highlights: [
      "Drainage assessment & grading",
      "French drains & dry wells",
      "Erosion control",
      "Downspout & runoff management",
    ],
    body: [
      {
        heading: "Drainage and storm water management that protects your property",
        text: "Water is the quiet enemy of every property. Standing water, soggy lawns, and erosion damage your landscape, and runoff that reaches the foundation threatens the house itself. Mex Landscaping designs and installs engineered drainage and storm water management across Norristown and the Main Line. We diagnose where water is actually coming from and where it needs to go, then build grading and drainage systems that move it away from your home reliably, season after season.",
      },
      {
        heading: "French drains, dry wells, and grading",
        text: "There is no single fix for every water problem, so we use the right tool for the site. A French drain intercepts and carries away subsurface water and is ideal for soggy lawns and water against a foundation. Dry wells collect and disperse concentrated runoff underground. Swales and regrading shed surface water across the yard, and channel drains capture it on hardscape. We often combine these into one system designed around how water genuinely moves on your property.",
      },
      {
        heading: "Downspouts, runoff, and erosion control",
        text: "A surprising amount of water trouble starts at the roof. Downspouts dumping against the house overwhelm the soil and send water exactly where you do not want it. We capture and route downspout discharge underground to a safe outlet, manage runoff from driveways and slopes, and install erosion control on banks and beds where soil is washing away. Controlling water at the source is usually the most effective and least invasive way to solve a drainage problem.",
      },
      {
        heading: "Solving the root cause, not the symptom",
        text: "Good drainage is invisible when it is done right and expensive when it is ignored. The difference is diagnosing the actual cause instead of chasing symptoms. We assess grade, soil, and the path water takes during a real storm, then design a system that addresses the source so the problem does not simply return next spring. Because we also do grading, <a href=\"/hardscape-services/\">hardscape</a>, and <a href=\"/tree-plant-installation/\">planting</a>, we can restore the landscape cleanly once the drainage work is complete.",
      },
      {
        heading: "Drainage solutions for Norristown and the Main Line",
        text: "We provide drainage and storm water management throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, where older lots and clay soils make water management a common challenge. It starts with a free on-site assessment of how water moves on your property. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What is a French drain and do I need one?",
        a: "A French drain is a gravel-filled trench with a perforated pipe that collects subsurface water and carries it to a safe outlet. It is one of the best solutions for a soggy lawn, water pooling in the yard, or moisture against a foundation. Whether you need one depends on the cause of your water problem, which we determine during an on-site assessment.",
      },
      {
        q: "How much does drainage work cost?",
        a: "It depends on the size of the area, the type of system, the length of pipe and trenching required, and where the water needs to be routed. A single downspout extension is modest; a full-property French drain and dry well system is a larger investment. We provide a clear estimate after assessing how water moves on your property.",
      },
      {
        q: "Why does water keep coming back after previous repairs?",
        a: "Usually because the previous work treated a symptom instead of the source. If the grade, soil, or water path was never properly diagnosed, the problem returns. We assess where water actually originates and where it needs to go, then design a system that addresses the root cause so it does not simply reappear.",
      },
      {
        q: "Can you fix water getting into my basement or against the foundation?",
        a: "Often, yes. A great deal of foundation moisture comes from poor surface grading and downspouts discharging too close to the house. We can regrade, route downspout water away underground, and install French drains to relieve hydrostatic pressure. We will assess your situation and tell you honestly what the property needs.",
      },
      {
        q: "Will the drainage work tear up my yard?",
        a: "Some trenching is unavoidable, but we work to keep disruption minimal and, because we are a full landscaping company, we restore the lawn, beds, and grade cleanly once the system is in. The finished drainage is designed to be invisible, doing its job underground while the landscape looks untouched.",
      },
    ],
  },
  {
    path: "/commercial-landscape-installations/",
    title: "Commercial Landscape Installations",
    category: "design-build",
    icon: "leaf",
    image: "/images/commercial-after.webp",
    intro:
      "Polished commercial landscapes that elevate your property and reflect well on your business.",
    gallery: [
      {
        src: "/images/commercial-before.webp",
        alt: "Bare commercial lot before landscape installation",
        caption: "Before: bare lot, staged material",
      },
      {
        src: "/images/commercial-after.webp",
        alt: "Commercial property with new shade trees and planted beds",
        caption: "After: new trees and planted beds",
      },
    ],
    highlights: [
      "Design & installation",
      "Commercial-grade plantings",
      "Drainage & grading",
      "Ongoing maintenance plans",
    ],
    body: [
      {
        heading: "Commercial landscape installation that means business",
        text: "Your landscape is the first thing clients, tenants, and visitors see, and it sets expectations before anyone reaches the door. Mex Landscaping designs and installs commercial landscapes for businesses, offices, retail, multifamily, and HOA properties across Norristown and the Main Line. We build landscapes that look sharp, hold up to real traffic, and reflect well on your brand, with the structure and durability a commercial property needs and the polish that makes it stand out from the lot next door.",
      },
      {
        heading: "Commercial-grade plantings and hardscape",
        text: "Commercial sites face heavier use and tighter expectations than most homes, so we plan accordingly. We select durable, low-maintenance plantings that look professional through every season, and we build hardscape, walkways, and entries to handle steady foot traffic. From the streetscape and parking islands to the main entrance, every element is chosen to perform under real-world conditions while keeping the property looking deliberate, clean, and well managed.",
      },
      {
        heading: "Drainage, grading, and lighting done right",
        text: "A commercial property has to manage water and stay safe and accessible. We grade for proper drainage, install storm water solutions where runoff is a concern, and can add landscape and entry lighting that improves both safety and after-hours presence. Because we handle planting, hardscape, drainage, and lighting in-house, the whole site is coordinated as one system rather than pieced together by separate vendors who never compare notes.",
      },
      {
        heading: "Installed and maintained by one partner",
        text: "A great installation only stays great if it is maintained. We can pair your commercial install with a recurring maintenance plan, so the same accountable team that built the landscape keeps it sharp year-round, from mowing and bed care to seasonal color and snow management in winter. One partner for installation and upkeep means consistent results, simpler scheduling, and one point of contact when you need something handled.",
      },
      {
        heading: "Commercial landscaping for Norristown and the Main Line",
        text: "We design, install, and maintain commercial landscapes throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken. Whether you manage a single building or a portfolio of properties, it starts with a free on-site consultation and a clear, professional proposal. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "Do you work with property managers and HOAs?",
        a: "Yes. We regularly work with property managers, business owners, and HOA boards across the Main Line. We provide clear proposals, dependable scheduling, and consistent crews, and we can combine installation with ongoing maintenance and winter snow management so the property is covered year-round under one accountable partner.",
      },
      {
        q: "How much does a commercial landscape installation cost?",
        a: "It depends on the size of the property, the scope of planting and hardscape, and any drainage, grading, or lighting involved. A refreshed entrance is modest compared with a full site redesign. We assess the property and provide a clear, itemized proposal, and we can phase larger projects to fit a budget cycle.",
      },
      {
        q: "Can you maintain the landscape after installation?",
        a: "Absolutely. Many commercial clients pair installation with a recurring maintenance plan so the same team that built the landscape keeps it looking professional all year. That continuity means the property stays consistent and you have one point of contact instead of juggling separate installation and maintenance vendors.",
      },
      {
        q: "Will the work disrupt my business or tenants?",
        a: "We plan commercial work to minimize disruption, scheduling around your hours and access needs and keeping the site safe and navigable throughout. We coordinate closely with you on timing and staging so customers, staff, and tenants are inconvenienced as little as possible while the work gets done.",
      },
      {
        q: "Do you handle snow management for commercial properties too?",
        a: "Yes. We provide commercial snow plowing, salting and de-icing, sidewalk clearing, and 24/7 storm response, with documented service. Pairing landscaping and snow management with one company means your property is covered in every season by a single accountable partner. Call (484) 261-6650 to discuss a plan.",
      },
    ],
  },

  // ---------------- HARDSCAPING ----------------
  {
    path: "/commercial-landscaping/",
    title: "Commercial Landscaping",
    category: "design-build",
    icon: "leaf",
    image: "/images/commercial-after.webp",
    metaTitle: "Commercial Landscaping & Grounds Management | Montgomery County, PA",
    metaDescription:
      "One partner for commercial landscaping, grounds maintenance, and snow management across Montgomery County and the Main Line. Documented service, single contract. (484) 261-6650.",
    intro:
      "One accountable partner for commercial properties: landscape installation, year-round grounds maintenance, and documented snow management under a single contract.",
    gallery: [
      {
        src: "/images/commercial-before.webp",
        alt: "Commercial lot before grounds installation",
        caption: "Before: unfinished commercial lot",
      },
      {
        src: "/images/commercial-after.webp",
        alt: "Commercial grounds after trees and bed installation",
        caption: "After: finished commercial grounds",
      },
      {
        src: "/images/design-front-beds.webp",
        alt: "Fresh planted beds and mulch at a building frontage",
        caption: "Fresh beds and plantings",
      },
    ],
    highlights: [
      "Single contract: landscaping + snow",
      "Licensed & insured, documentation on request",
      "Documented service records",
      "Offices, HOAs, retail & medical properties",
    ],
    body: [
      {
        heading: "Commercial landscaping for Montgomery County properties",
        text: "A commercial property's grounds are part of its first impression, its tenant experience, and its liability exposure. Mex Landscaping provides commercial landscaping across Norristown, King of Prussia, and Montgomery County: landscape installation and enhancements, year-round grounds maintenance, and winter snow management, all from one accountable company. Property managers get a single point of contact, a single invoice, and a property that consistently reflects well on the businesses inside it.",
      },
      {
        heading: "Built for property managers, not just properties",
        text: "Managing vendors is its own job, and we try to make ours the easiest line on your list. We are licensed and insured, with documentation available whenever your files or your insurer require it. Our snow and de-icing work is recorded per visit, so you have time-stamped service records if a slip-and-fall claim ever needs answering. Requests get a response, schedules are kept, and the crews that show up are our own, in uniform and accountable to us.",
      },
      {
        heading: "Landscape installation and enhancements",
        text: "Whether it is a bare new-construction lot or a tired frontage that needs to be brought back, we design and install commercial landscapes that stay presentable with realistic upkeep: shade trees, foundation and island beds, seasonal color, lawn installation, and the grading and drainage that keep it all healthy. Because we are a design-build company, the same team plans the installation and puts it in the ground.",
      },
      {
        heading: "Year-round grounds maintenance",
        text: "Consistency is what separates a managed property from a neglected one. Our recurring commercial maintenance covers mowing, edging, bed care, mulching, pruning, and seasonal cleanups on a fixed schedule, so the property looks cared for every week of the season, not just after a service call. Maintenance clients get priority scheduling for enhancements and repairs.",
      },
      {
        heading: "Snow management under the same contract",
        text: "The same company that maintains your grounds in July can keep them open and safe in January. We provide commercial snow plowing, sidewalk clearing, and salting and de-icing with 24/7 storm response and per-visit documentation, on per-storm or seasonal terms. One contract covering the whole year means no seasonal vendor scramble and no gaps in accountability.",
      },
      {
        heading: "Serving commercial properties across the region",
        text: "We serve offices, HOAs and communities, retail centers, medical and professional buildings, and multi-tenant properties across Norristown, King of Prussia, Plymouth Meeting, Conshohocken, Blue Bell, and the surrounding Montgomery County and Main Line area. Call (484) 261-6650 or request a proposal, and we will walk the property, understand how it is used, and put together a clear scope and price.",
      },
    ],
    faqs: [
      {
        q: "Can you provide a certificate of insurance (COI)?",
        a: "Yes. Mex Landscaping is fully licensed and insured, and documentation is available on request for your vendor files, property owner, or insurer.",
      },
      {
        q: "Can landscaping and snow management be on one contract?",
        a: "Yes, and that is how most of our commercial clients prefer it. A single year-round agreement covers grounds maintenance through the growing season and snow management through the winter, with one point of contact and one invoice.",
      },
      {
        q: "Do you document your snow and de-icing service?",
        a: "We do. Snow visits are recorded, including de-icing applications, so you have time-stamped service records for insurance and liability purposes. Documentation is a standard part of our commercial winter service, not an add-on.",
      },
      {
        q: "Do you handle multiple properties for one manager?",
        a: "Yes. We can quote and service a portfolio of properties under coordinated scheduling and consolidated billing. Walk us through the portfolio and we will build a proposal that covers each site appropriately.",
      },
      {
        q: "What types of commercial properties do you work with?",
        a: "Offices and corporate campuses, HOAs and residential communities, retail centers, medical and professional buildings, and multi-tenant properties across Montgomery County and the Main Line.",
      },
      {
        q: "How do we get a commercial proposal?",
        a: "Call (484) 261-6650 or request an estimate through the site. We will walk the property with you, discuss standards and budget, and provide a clear written scope covering installation, maintenance, snow, or all three.",
      },
    ],
  },
  {
    path: "/hardscape-services/",
    title: "Hardscaping",
    category: "hardscaping",
    icon: "stone",
    image: "/images/pergola-patio.webp",
    featured: true,
    intro:
      "Patios, walls, walkways, and driveways built to last decades: the structural backbone of a high-end outdoor space.",
    gallery: [
      {
        src: "/images/wall-block-curved.webp",
        alt: "Curved segmental block seat wall",
        caption: "Curved block seat wall",
      },
      {
        src: "/images/pergola-patio.webp",
        alt: "Paver patio with cedar pergola",
        caption: "Paver patio and pergola",
      },
      {
        src: "/images/walkway-cobble.webp",
        alt: "Paver walkway with cobblestone edging",
        caption: "Walkway with cobble edging",
      },
      {
        src: "/images/driveway-gravel-pad.webp",
        alt: "Stone parking pad with timber edging",
        caption: "Stone parking pad",
      },
    ],
    highlights: [
      "Patios & walkways",
      "Retaining & seating walls",
      "Driveways & steps",
      "Engineered base & drainage",
    ],
    body: [
      {
        heading: "Full-service hardscaping in Norristown and the Main Line",
        text: "Hardscaping is the structural backbone of any outdoor space: the patios, walkways, walls, driveways, and steps that give a yard its shape and make it usable. Mex Landscaping is a <a href=\"/landscape-design/\">design-build</a> hardscape contractor serving Norristown and the Main Line, and we handle every piece in-house. Because one team designs and builds the whole project, the stonework, grading, and drainage all work together instead of being stitched together by different crews.",
      },
      {
        heading: "Everything we build in stone and paver",
        text: "Our hardscaping covers paver and natural stone <a href=\"/patios/\">patios</a>, walkways and garden paths, steps and stairs, <a href=\"/retaining-walls/\">retaining and seating walls</a>, paver and stone driveways, fire pits and fire features, <a href=\"/outdoor-kitchens/\">outdoor kitchens</a>, and architectural stone veneer. We work in concrete pavers, natural flagstone and bluestone, full stone and boulders, brick, and porcelain, matching materials to your home and how each space will be used.",
      },
      {
        heading: "The engineered base behind every project",
        text: "Good hardscaping is built from the bottom up. Every patio, walkway, wall, and driveway we install starts with excavation to the proper depth, a compacted aggregate base, and drainage built in so water moves away instead of pooling or freezing under the surface. Edge restraints, geogrid where walls require it, and polymeric jointing lock everything in place. The base is invisible once we are done, and it is the single biggest reason our work stays level and tight for decades.",
      },
      {
        heading: "Designed as one cohesive outdoor space",
        text: "The best results come from planning the hardscape as a whole. A patio flows into a walkway, a seating wall frames a fire pit, <a href=\"/landscape-lighting/\">landscape lighting</a> traces the steps, and the driveway and entry share the same materials. We design the elements to connect, then build them in a logical sequence so the finished property looks intentional and complete rather than assembled piece by piece over the years.",
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
    image: "/images/pergola-patio.webp",
    featured: true,
    intro:
      "Paver and natural-stone patios designed as true outdoor rooms: level, durable, and built for years of gatherings.",
    gallery: [
      {
        src: "/images/pergola-patio.webp",
        alt: "Paver patio with a custom cedar pergola",
        caption: "Paver patio with cedar pergola",
      },
      {
        src: "/images/firepit-lit.webp",
        alt: "Gravel patio with a custom stone fire pit",
        caption: "Gravel patio and fire pit",
      },
      {
        src: "/images/turf-pool.webp",
        alt: "Bluestone paving and turf beside a pool",
        caption: "Bluestone by the pool",
      },
    ],
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
        text: "A patio works best as part of a bigger plan. We size and shape the space around real use: dining, lounging, a grill zone, a path to the door. From there we can integrate a <a href=\"/fire-pits/\">fire pit</a>, a <a href=\"/retaining-walls/\">seating wall</a>, steps, low-voltage <a href=\"/landscape-lighting/\">landscape lighting</a>, and surrounding plantings so the whole area reads as one finished outdoor room rather than a slab dropped in the grass.",
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
    image: "/images/walkway-cobble.webp",
    metaTitle: "Walkways & Steps | Paver & Stone Walkways | Mex Landscaping",
    metaDescription:
      "Custom paver and natural-stone walkways and steps in Norristown, PA. Mex Landscaping builds durable, elegant paths that elevate your property. Free estimate.",
    intro:
      "Paver and natural-stone walkways and steps that guide guests through your property with craftsmanship and curb appeal.",
    gallery: [
      {
        src: "/images/walkway-cobble.webp",
        alt: "Paver walkway with cobblestone edging",
        caption: "Walkway with cobblestone edging",
      },
      {
        src: "/images/drainage-creek-steps.webp",
        alt: "Natural stone steps crossing a dry creek bed",
        caption: "Stone steps over a dry creek",
      },
      {
        src: "/images/wall-stone-after.webp",
        alt: "Natural stone steps beside a fieldstone wall",
        caption: "Stone steps and fieldstone wall",
      },
    ],
    highlights: [
      "Paver & natural stone paths",
      "Stone & block steps",
      "Lighting integration",
      "Proper base & drainage",
    ],
    body: [
      {
        heading: "Paver and stone walkways and steps, designed and built",
        text: "A well-built walkway is an invitation, the path that guides guests to your door and ties the property together. Mex Landscaping designs and builds custom paver walkways, natural stone paths, and stone and block steps for homes across Norristown and the Main Line. From the front entry to garden paths and connections between outdoor spaces, we build walks and steps that look intentional and stay level and safe for years, because the structure underneath is done right.",
      },
      {
        heading: "Walkway materials that match your home",
        text: "The material sets the character of a path. We install concrete pavers in many colors and patterns, natural flagstone and bluestone for a timeless look, brick for classic charm, and large-format stone for a clean, modern feel. For steps, we build with natural stone, block, and matching stone treads. We help you choose a surface and pattern that complements your home's architecture and coordinates with your existing patio, driveway, and entry.",
      },
      {
        heading: "The base and drainage that keep a path safe",
        text: "A walkway that heaves, settles, or holds water becomes a trip hazard fast, and steps are even less forgiving. We excavate to the proper depth, install and compact a graded aggregate base, and build in slope so water sheds off instead of pooling or freezing. Edge restraints and polymeric jointing lock pavers in place, and steps are built with proper rise, run, and footing so they stay solid and safe through years of use and freeze-thaw.",
      },
      {
        heading: "Detail and lighting that elevate the property",
        text: "The difference between a plain path and a defining feature is in the detail. Borders, banding, and inlays give a walkway a finished, custom look, and integrated low-voltage lighting traces the path and steps for safety and drama after dark. Because we handle hardscape and lighting in-house, we can run conduit during construction so the lighting ties in cleanly, and we match materials so the walkway clearly belongs to the rest of your landscape.",
      },
      {
        heading: "Walkway and step installation in Norristown and the Main Line",
        text: "We build walkways and steps throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether as a standalone project or part of a larger hardscape plan. It starts with a free on-site estimate where we measure the run, talk through materials, and give you a clear scope and price. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How much does a walkway or set of steps cost?",
        a: "Cost depends on length, width, the material you choose, the number and type of steps, and any grading or drainage involved. A short paver walk is modest; a long natural stone path with steps and lighting is a larger project. We provide a clear, no-obligation estimate after measuring the space and discussing materials.",
      },
      {
        q: "What is the best material for a walkway?",
        a: "It depends on the look you want and how the path will be used. Pavers are durable, repairable, and come in many styles; natural flagstone and bluestone offer a timeless, high-end appearance; brick brings classic character. We show you real samples and recommend a material that suits your home, budget, and how water moves across the area.",
      },
      {
        q: "Can you build steps on a slope or to my entry?",
        a: "Yes. We build stone and block steps and stepped walkways to handle grade changes, entries, and connections between levels of the yard. Proper rise, run, and footing are essential for steps that feel comfortable and stay safe, so we engineer them correctly rather than improvising on site.",
      },
      {
        q: "Can you add lighting to a walkway or steps?",
        a: "Absolutely, and it is most efficient to plan it together. We can run low-voltage wiring during construction and install path and step lighting that improves safety after dark and gives the walk a polished look. Because we handle hardscape and lighting in-house, everything ties in cleanly rather than being retrofitted later.",
      },
      {
        q: "Will my walkway hold up to freeze-thaw winters?",
        a: "When it is built on a proper base, yes. The heaving and settling people associate with old walkways comes from a rushed or missing base. We excavate, compact a graded aggregate base, and build in drainage so water sheds off instead of freezing underneath, which is exactly what keeps a path level through our winters.",
      },
    ],
  },
  {
    path: "/driveways/",
    title: "Driveways",
    category: "hardscaping",
    icon: "stone",
    image: "/images/driveway-gravel-pad.webp",
    featured: true,
    intro:
      "Paver and stone driveways with lasting curb appeal, plus the engineered base to handle weight and weather.",
    gallery: [
      {
        src: "/images/driveway-gravel-pad.webp",
        alt: "Stone parking pad with timber edging",
        caption: "Stone parking pad with timber edge",
      },
      {
        src: "/images/wall-stone-house.webp",
        alt: "Driveway entrance framed by a natural fieldstone wall",
        caption: "Driveway entrance and stone wall",
      },
    ],
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
    image: "/images/wall-stone-after.webp",
    metaTitle: "Retaining Walls & Seating Walls | Mex Landscaping | Norristown PA",
    metaDescription:
      "Engineered retaining walls and seating walls in Norristown, PA. Mex Landscaping builds structural, beautiful walls that hold slopes and add usable space. Free estimate.",
    intro:
      "Engineered retaining walls and seating walls that hold slopes, create usable space, and anchor your outdoor design.",
    gallery: [
      {
        src: "/images/wall-stone-during.webp",
        alt: "Masons hand-laying a natural fieldstone retaining wall",
        caption: "Hand-laying the fieldstone wall",
      },
      {
        src: "/images/wall-stone-after.webp",
        alt: "Finished natural fieldstone wall with stone steps",
        caption: "Finished fieldstone wall and steps",
      },
      {
        src: "/images/wall-block-curved.webp",
        alt: "Curved segmental block seating wall",
        caption: "Curved segmental block seat wall",
      },
      {
        src: "/images/wall-timber-steps.webp",
        alt: "Timber retaining wall with built-in steps",
        caption: "Timber wall with built-in steps",
      },
      {
        src: "/images/wall-timber-L.webp",
        alt: "L-shaped timber retaining wall with drainage",
        caption: "L-shaped timber wall and drainage",
      },
      {
        src: "/images/wall-timber-long.webp",
        alt: "Long timber retaining wall holding a slope",
        caption: "Long timber retaining wall",
      },
    ],
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
        text: "Walls can do double duty. A seating wall rings a <a href=\"/patios/\">patio</a> or <a href=\"/fire-pits/\">fire pit</a> with built-in seating and definition. Tiered or terraced walls break a tall grade into a series of planting beds or level landings, which often looks better and performs better than one tall wall. We design walls that solve a grading problem and create an outdoor room at the same time.",
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
    image: "/images/wall-stone-house.webp",
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
        heading: "Architectural stone veneer and facades",
        text: "Stone veneer is one of the highest-impact ways to add depth, texture, and a sense of permanence to a property. Mex Landscaping installs natural and manufactured stone facades on columns, walls, entries, and outdoor structures across Norristown and the Main Line. A flat, ordinary surface becomes a rich architectural feature with the right stone and clean detailing. Whether you are dressing up an entry, a chimney, or a set of piers, we bring the craftsmanship that makes veneer look original to the home rather than applied on top.",
      },
      {
        heading: "Natural and manufactured stone options",
        text: "We work in both natural stone and manufactured stone veneer, and each has its place. Natural stone offers unmatched depth, variation, and longevity. Manufactured veneer is lighter, often more affordable, and available in a wide range of colors and profiles that convincingly mimic natural stone. We help you choose based on the look you want, the structure being faced, and your budget, then install it with proper preparation and detailing for a result that holds up outdoors.",
      },
      {
        heading: "Columns, walls, entries, and facades",
        text: "Stone facades transform the elements that frame a property. We face entry columns and piers, freestanding and retaining walls, the base of the home, chimneys, mailbox posts, and outdoor kitchen and fireplace surrounds. Adding stone to these focal points gives a property a cohesive, custom character and ties the architecture to the landscape. We coordinate the stone with your patios, walls, and other hardscape so the whole property reads as one deliberate design.",
      },
      {
        heading: "Weather-resistant detailing that lasts",
        text: "Stone veneer only performs as well as the work behind it. We install over proper substrate and weather-resistant detailing, with careful attention to moisture management, flashing where needed, and clean mortar joints and color matching. That detailing is what keeps a facade tight, dry, and looking sharp through our freeze-thaw winters rather than cracking or letting water behind it. Done correctly, architectural stone is as durable as it is striking.",
      },
      {
        heading: "Stone facade installation in Norristown and the Main Line",
        text: "We install architectural stone and facades throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether as a standalone upgrade or part of a larger hardscape or outdoor living project. It starts with a free on-site estimate where we look at the surface, discuss stone options, and match color and texture to your home. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between natural and manufactured stone veneer?",
        a: "Natural stone is quarried and offers the deepest color, variation, and longevity, but it is heavier and usually costs more. Manufactured veneer is a molded, colored product that is lighter, often more affordable, and made to mimic natural stone closely. Both look excellent when installed well; we help you choose based on the structure, the look, and your budget.",
      },
      {
        q: "How much does stone facade work cost?",
        a: "It depends on the square footage, whether you choose natural or manufactured stone, the complexity of the surface, and any prep required. Facing a single entry column is modest compared with a full chimney or the base of a house. We provide a clear estimate after seeing the surface and discussing material options.",
      },
      {
        q: "Can you match stone to my existing home or hardscape?",
        a: "Yes. Matching color, texture, and joint style so new stonework blends with your home and existing hardscape is a core part of the job. Whether you want the facade to disappear into the architecture or stand as a clean feature, we select and detail the stone to achieve a cohesive look.",
      },
      {
        q: "Will stone veneer hold up to our winters?",
        a: "When it is installed with proper substrate, moisture management, and detailing, yes. The failures people worry about, such as cracking or water getting behind the stone, come from poor preparation. We install over a sound base with weather-resistant detailing and quality mortar work so the facade stays tight and dry through freeze-thaw cycles.",
      },
      {
        q: "Can you add stone to columns or an outdoor kitchen?",
        a: "Absolutely. Entry columns, piers, fireplace and outdoor kitchen surrounds, and seating walls are some of the most popular places we apply stone veneer. Because we also build hardscape and outdoor living spaces, we can coordinate the stone with the rest of the project so it all matches and reads as one intentional design.",
      },
    ],
  },

  // ---------------- OUTDOOR LIVING ----------------
  {
    path: "/outdoor-living/",
    title: "Outdoor Living Spaces",
    category: "outdoor-living",
    icon: "flame",
    image: "/images/firepit-lit.webp",
    featured: true,
    metaTitle: "Outdoor Living Spaces | Fire Pits & Outdoor Kitchens | Mex Landscaping",
    metaDescription:
      "Custom outdoor living spaces in Norristown, PA: fire pits, fire features, outdoor kitchens, and water features. Mex Landscaping designs and builds it all. Free estimate.",
    intro:
      "Custom outdoor living spaces with fire features, kitchens, and water features, designed to extend your season and the way you use your home.",
    gallery: [
      {
        src: "/images/firepit-lit.webp",
        alt: "Custom stone fire pit and gravel patio at dusk",
        caption: "Fire pit and gravel patio",
      },
      {
        src: "/images/pergola-patio.webp",
        alt: "Cedar pergola built over a paver patio",
        caption: "Cedar pergola over a paver patio",
      },
      {
        src: "/images/turf-pool.webp",
        alt: "Turf lawn meeting bluestone paving beside a pool",
        caption: "Turf and bluestone by the pool",
      },
      {
        src: "/images/lighting-dusk.webp",
        alt: "Architectural landscape lighting at dusk",
        caption: "Architectural landscape lighting",
      },
    ],
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
        text: "An outdoor living space is built from the features you will actually use. We build custom <a href=\"/fire-pits/\">fire pits and fireplaces</a> for cooler evenings, full <a href=\"/outdoor-kitchens/\">outdoor kitchens</a> with built-in grills, counters, and bar seating for entertaining, and <a href=\"/water-features/\">water features</a> that add sound and calm. Pergolas, seating walls, and shade structures define the space, and we coordinate the materials so the kitchen, fire feature, and patio all clearly belong together.",
      },
      {
        heading: "Designed around how you actually live outside",
        text: "Before we build anything, we figure out how you want to use the yard. Quiet evenings around a fire call for a different layout than hosting twenty people for dinner. We plan zones for cooking, dining, lounging, and gathering, size the hardscape to match, and lay out traffic flow so the space feels comfortable whether it is just your family or a full party.",
      },
      {
        heading: "Lighting and comfort that extend the season",
        text: "The right details keep you outside longer. Low-voltage <a href=\"/landscape-lighting/\">landscape lighting</a> makes the space usable and beautiful after dark, a fire feature pushes the season into spring and fall, and thoughtful layout keeps cooking, seating, and traffic from colliding. We build these comfort elements into the plan from the start rather than tacking them on later.",
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
    image: "/images/firepit-lit.webp",
    featured: true,
    metaTitle: "Fire Pits & Fire Features | Custom Built | Mex Landscaping Norristown PA",
    metaDescription:
      "Custom fire pits and fire features in Norristown, PA. Mex Landscaping builds wood-burning and gas fire features in stone and block to match your patio. Free estimate.",
    intro:
      "Custom-built fire pits and fire features: the centerpiece of a great outdoor space, built in stone and block to match your patio.",
    gallery: [
      {
        src: "/images/firepit-lit.webp",
        alt: "Custom stone fire pit lit at dusk on a gravel patio",
        caption: "Stone fire pit at dusk",
      },
      {
        src: "/images/pergola-patio.webp",
        alt: "Cedar pergola over a paver patio",
        caption: "Cedar pergola and paver patio",
      },
      {
        src: "/images/lighting-dusk.webp",
        alt: "Landscape lighting extending the evening outdoors",
        caption: "Evening landscape lighting",
      },
    ],
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
    image: "/images/pergola-patio.webp",
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
        heading: "Custom outdoor kitchens built for real entertaining",
        text: "An outdoor kitchen turns a patio into the place everyone wants to be, where the cook stays part of the party instead of stuck inside. Mex Landscaping designs and builds custom outdoor kitchens for homes across Norristown and the Main Line. These are durable, built-in installations in stone and stainless, with the grills, counters, and bar seating that make outdoor cooking and hosting genuinely practical. We build them to anchor your outdoor living space and to hold up to years of real use and our seasons.",
      },
      {
        heading: "Built-in grills, counters, and bars",
        text: "We tailor each kitchen to how you cook and entertain. That can include a built-in grill, side burners, prep counters in stone or other durable surfaces, storage cabinetry, a sink, space for a refrigerator, and bar seating where guests can gather while you cook. We size and lay out the kitchen around your habits, whether you want a focused grill station or a full setup that handles a crowd, so the finished space works the way you actually use it.",
      },
      {
        heading: "Durable stone and paver construction",
        text: "An outdoor kitchen lives outside year-round, so it has to be built like hardscape, not furniture. We construct the base and structure in masonry and finish it in stone, veneer, or paver to match your patio and home. Built-in appliances are set into a solid, weather-resistant framework that handles heat, weather, and freeze-thaw. This is the same engineered, built-to-last approach we bring to our patios and walls, which is why our kitchens stay solid for the long haul.",
      },
      {
        heading: "Utilities and lighting integrated cleanly",
        text: "The features that make a kitchen effortless are easiest to build in from the start. We coordinate gas, electrical, water, and drainage during construction, and we integrate task and accent lighting so the kitchen is usable and inviting after dark. Because we design and build the whole outdoor living space, the kitchen flows with your patio, fire feature, and landscape, with materials, lighting, and layout coordinated for one cohesive, finished result rather than a grill island dropped onto a slab.",
      },
      {
        heading: "Outdoor kitchen installation in Norristown and the Main Line",
        text: "We design and build outdoor kitchens throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether as part of a new patio or an addition to an existing one. It starts with a free on-site consultation where we discuss layout, appliances, and materials. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How much does an outdoor kitchen cost?",
        a: "It depends heavily on size, the appliances you select, the finish materials, and how much gas, electric, water, and drainage need to be run. A compact built-in grill station is far more affordable than a full kitchen with multiple appliances, a sink, and bar seating. We provide an itemized estimate so you can see what each element adds and prioritize accordingly.",
      },
      {
        q: "Can you build an outdoor kitchen on my existing patio?",
        a: "Often, yes. We assess your patio and its base to confirm it can support a built-in kitchen, then build it to integrate with the existing hardscape and run any needed utilities. If the patio is not structured to carry the added weight, we will tell you honestly what is required to do it properly.",
      },
      {
        q: "What appliances can you include?",
        a: "We can build in a grill, side burners, a sink, refrigeration, storage cabinetry, and bar seating, configured around how you cook and entertain. We design the layout to fit the appliances you want and coordinate the gas, electric, and water during construction so everything is set in cleanly rather than retrofitted later.",
      },
      {
        q: "Will the kitchen hold up to winter weather?",
        a: "Yes. We build outdoor kitchens like hardscape, on a solid masonry structure finished in weather-resistant stone or paver, so the framework handles freeze-thaw and the elements. Built-in appliances are set to withstand outdoor conditions. With basic seasonal care, a well-built outdoor kitchen lasts for many years.",
      },
      {
        q: "Can you match the kitchen to my patio and fire pit?",
        a: "Absolutely, and planning them together is the smart approach. Because we design and build the entire outdoor living space, we coordinate the stone, finishes, lighting, and layout so the kitchen, patio, and fire feature all clearly belong together. Call (484) 261-6650 or request a free estimate to plan it as one cohesive space.",
      },
    ],
  },
  {
    path: "/water-features/",
    title: "Water Features",
    category: "outdoor-living",
    icon: "drop",
    image: "/images/drainage-creek-steps.webp",
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
        heading: "The sound of moving water in your landscape",
        text: "Few additions change the feel of an outdoor space like moving water. The sound softens traffic noise, draws birds, and brings a sense of calm that makes a yard feel like a retreat. Mex Landscaping designs and builds custom water features for homes across Norristown and the Main Line, including fountains, ponds, and waterfalls. We site and build each feature so it looks like it belongs in the landscape, becoming a natural focal point rather than an object set awkwardly into the yard.",
      },
      {
        heading: "Fountains, ponds, and waterfalls",
        text: "Different water features create different moods, so we build the type that fits your space and how much you want to tend it. Bubbling rocks and disappearing fountains add the sound and movement of water with no open pool to maintain, ideal for a clean, low-care accent. Ponds bring an aquatic garden with plants and fish, and waterfalls and streams add dramatic movement and sound. We help you choose the right feature for your landscape, budget, and maintenance preference.",
      },
      {
        heading: "Built to look natural and last",
        text: "A water feature has to be engineered correctly to look effortless. We build a proper foundation and basin, select pumps and plumbing sized to the feature, and arrange stone and planting so the water reads as a natural part of the landscape. Careful placement of the source, the flow, and the edges is what separates a convincing waterfall or stream from one that looks staged. The mechanical work is hidden so only the beauty shows.",
      },
      {
        heading: "Low-maintenance recirculation and integration",
        text: "Modern water features are far simpler to live with than people expect. Recirculating systems reuse the same water efficiently, and thoughtful design keeps upkeep minimal. We integrate the feature with your surrounding landscape, lighting, and hardscape so it ties into the larger design, and we can add low-voltage lighting to bring the water to life after dark. Because we build the full outdoor environment, the water feature is planned as part of the whole rather than added in isolation.",
      },
      {
        heading: "Water feature installation in Norristown and the Main Line",
        text: "We design and build water features throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, whether as a standalone accent or part of a complete outdoor living space. It starts with a free on-site consultation where we find the right spot and feature for your property. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "Are water features hard to maintain?",
        a: "Less than most people assume. Recirculating systems reuse the same water, and low-maintenance options like bubbling rocks and disappearing fountains have no open pool to tend. Ponds with fish and plants require more attention. We design around the level of upkeep you want and explain the care involved before we build so there are no surprises.",
      },
      {
        q: "How much does a water feature cost?",
        a: "It depends on the type and size, from a compact bubbling fountain to a large pond or multi-tier waterfall, plus the stone, pump, and plumbing involved and any lighting you add. We provide a clear estimate after discussing the feature you want and seeing where it will go on your property.",
      },
      {
        q: "What kind of water feature is best for a small yard?",
        a: "For smaller spaces, a bubbling rock, urn, or disappearing fountain is often ideal. It delivers the sound and movement of water in a compact footprint, has no open pool, and is easy to care for. We can recommend the right scale and style so the feature feels proportionate to your space.",
      },
      {
        q: "Can you add lighting to a water feature?",
        a: "Yes, and it makes a big difference. Low-voltage lighting set into or around the feature brings the water to life after dark and lets you enjoy it in the evening. Because we handle outdoor lighting in-house, we can integrate it cleanly during construction so the wiring is hidden and the effect is built in.",
      },
      {
        q: "Will a water feature attract mosquitoes?",
        a: "Properly designed features that keep water moving and recirculating do not provide the still, stagnant water mosquitoes need to breed. Moving water in fountains, waterfalls, and well-built ponds actually discourages them. We design the flow and circulation so the feature stays healthy and pleasant to be around.",
      },
    ],
  },

  // ---------------- CONCRETE & MASONRY ----------------
  // ---------------- FENCING ----------------
  {
    path: "/split-rail-fencing/",
    title: "Split Rail Fencing",
    category: "hardscaping",
    icon: "stone",
    image: "/images/rail-fence.webp",
    metaTitle: "Split Rail Fence Installation | Norristown & Main Line | Mex Landscaping",
    metaDescription:
      "Split rail and post-and-rail fence installation is a Mex Landscaping specialty. Classic 2-rail and 3-rail fencing set properly, across Norristown and the Main Line.",
    intro:
      "Split rail fencing is our specialty: classic post-and-rail fence lines that define a property beautifully without walling it in.",
    highlights: [
      "2-rail & 3-rail post-and-rail",
      "Property lines & pasture-style runs",
      "Welded wire backing for pets",
      "Posts set below the frost line",
    ],
    body: [
      {
        heading: "Split rail fence installation in Norristown and the Main Line",
        text: "Few fences suit this area like split rail. It defines a property line, frames a yard, and adds that established, estate-and-farmland character the Main Line is known for, all without blocking views or boxing the property in. Split rail fencing is a Mex Landscaping specialty: we install classic 2-rail and 3-rail post-and-rail fence lines for homes and properties across Norristown, Montgomery County, and the Main Line.",
      },
      {
        heading: "Built to stay straight, season after season",
        text: "A rail fence looks simple, but the difference between a crisp fence line and a wavy one is all in the installation. We lay out runs precisely, dig every post hole to proper depth below the frost line, and set posts so the line stays straight and the rails stay seated through freeze-thaw winters. Corners, gates, and grade changes are planned rather than improvised, which is what keeps a long run looking intentional across a sloped or curved property.",
      },
      {
        heading: "Keep the look, keep the dog in the yard",
        text: "The most common request we hear: the classic rail look, but pet-safe. We install welded wire mesh backing along the fence line, fastened cleanly to the rails, so dogs stay in the yard while the fence keeps its open, traditional character. From the street you see a rail fence; from the yard you get real containment.",
      },
      {
        heading: "Fencing that works with your landscape",
        text: "Because we are a landscape design-build company, your fence is planned as part of the property, not dropped onto it. We coordinate fence lines with driveways, planting beds, stone walls, and grading so gates land where you actually walk and the fence complements the landscape around it. Pairing a new fence line with fresh plantings or a driveway entrance is common, and one crew handles all of it.",
      },
      {
        heading: "Serving Norristown, Montgomery County, and the Main Line",
        text: "We install split rail fencing throughout the area, including Norristown, King of Prussia, Wayne, Bryn Mawr, Conshohocken, and the surrounding communities. Call (484) 261-6650 or request a free estimate, and we will walk the fence line with you, talk through rail style and gates, and give you a clear price.",
      },
    ],
    gallery: [
      {
        src: "/images/rail-fence.webp",
        alt: "Post-and-rail split rail fence installed by Mex Landscaping",
        caption: "Post-and-rail fence installation",
      },
      {
        src: "/images/driveway-gravel-pad.webp",
        alt: "Stone parking pad with timber edging alongside a fence line",
        caption: "Stone parking pad with timber edge",
      },
      {
        src: "/images/curb-colonial.webp",
        alt: "Colonial home with an open front landscape suited to rail fencing",
        caption: "Open front landscape",
      },
    ],
    faqs: [
      {
        q: "Do you specialize in split rail fencing?",
        a: "Yes. Split rail and post-and-rail fencing is a specialty of ours, not a sideline. We focus on this style because it suits the properties we work on across Norristown and the Main Line, and doing it constantly is what keeps our fence lines straight, our posts solid, and our pricing sharp.",
      },
      {
        q: "Can you make a split rail fence dog-proof?",
        a: "Yes. We add welded wire mesh backing along the inside of the fence, fastened cleanly so it nearly disappears from the street view. It is the standard way to keep the classic rail look while safely containing dogs, and we install it on a large share of our fence projects.",
      },
      {
        q: "What is the difference between 2-rail and 3-rail fencing?",
        a: "Height and visual weight. A 2-rail fence is lower and reads lighter, ideal for marking a property line or framing a front yard. A 3-rail fence is taller and more substantial, better for containment with wire backing and for a more estate-like presence. We help you choose based on the property and the job the fence needs to do.",
      },
      {
        q: "How long does a split rail fence installation take?",
        a: "Most residential fence lines are installed in a few days once materials are on site, depending on total length, gates, and terrain. We confirm the timeline with your estimate so you know what to expect before we start.",
      },
      {
        q: "Do you replace old or failing rail fences?",
        a: "Yes. We remove tired fence lines and set new posts and rails properly, rather than patching new rails into rotted posts. If sections of your fence are leaning or the rails keep falling, a proper reset is usually the better investment, and we can quote both options honestly.",
      },
    ],
  },
  {
    path: "/concrete-masonry/",
    title: "Outdoor Concrete & Masonry",
    category: "hardscaping",
    icon: "brick",
    image: "/images/wall-stone-after.webp",
    metaTitle: "Outdoor Concrete & Masonry | Patios, Steps & Stonework | Mex Landscaping",
    metaDescription:
      "Outdoor concrete and masonry for Norristown and the Main Line: stamped and poured concrete patios, walkways, steps, and landscape stonework. Outdoor projects only.",
    intro:
      "Stamped and poured concrete, stone steps, and landscape masonry, for outdoor projects only. We build the concrete and stonework that belongs in a landscape.",
    highlights: [
      "Stamped & poured concrete patios",
      "Concrete walkways, steps & pads",
      "Stone veneer on outdoor walls & columns",
      "Outdoor fireplaces & fire features",
    ],
    body: [
      {
        heading: "Outdoor concrete and masonry in Norristown and the Main Line",
        text: "Some outdoor spaces call for concrete and stone rather than pavers: a stamped concrete patio, a poured walkway, wide front steps, or stone veneer that dresses a landscape wall or entry column. Mex Landscaping handles that work as part of our design-build service across Norristown, Montgomery County, and the Main Line. Because it is planned alongside the grading, drainage, and planting around it, the finished concrete and stonework belongs to the landscape instead of just sitting in it.",
      },
      {
        heading: "Stamped and poured concrete done right",
        text: "Concrete succeeds or fails on preparation. We excavate to proper depth, build a compacted base, form cleanly, and place control joints where they belong so slabs cure strong and crack where they are designed to, not across the middle of your patio. Stamped finishes add the texture of stone or slate at a friendlier price point, and broom-finished concrete remains the workhorse for walkways, pads, and steps that need to perform through Pennsylvania freeze-thaw.",
      },
      {
        heading: "Landscape masonry and stonework",
        text: "Our masonry lives outdoors: natural and manufactured stone veneer on landscape walls, entry columns, and seating walls, stone steps and stoops, and the masonry structure behind outdoor fireplaces and fire features. It is the same craft you see in our fieldstone retaining walls, applied to the finishing details that give a property permanence and character.",
      },
      {
        heading: "What we do not do",
        text: "We keep this service focused on outdoor landscape projects, so a few things are outside our scope: chimney repair or rebuilds, brick repointing and structural repairs on the house itself, foundation work, interior masonry, and historic restoration. Those belong with a dedicated masonry repair contractor. If your project is part of the landscape, the patio, the steps, the outdoor fireplace, the stonework around the yard, it is exactly what we do.",
      },
      {
        heading: "One team for the whole outdoor project",
        text: "Concrete and masonry rarely travel alone. A stamped patio wants planting and lighting around it; new front steps deserve refreshed beds beside them; an outdoor fireplace anchors a whole outdoor room. As a design-build company we plan and build all of it together, so you get one accountable team and a finished space instead of a slab. Call (484) 261-6650 or request a free estimate and we will look at the project as a whole.",
      },
    ],
    gallery: [
      {
        src: "/images/wall-stone-during.webp",
        alt: "Mex Landscaping masons hand-laying natural fieldstone",
        caption: "Our masons laying natural fieldstone",
      },
      {
        src: "/images/wall-stone-after.webp",
        alt: "Finished natural stone wall and stone steps",
        caption: "Finished stone wall and steps",
      },
      {
        src: "/images/firepit-lit.webp",
        alt: "Custom stone fire pit built by Mex Landscaping",
        caption: "Custom stone fire pit",
      },
    ],
    faqs: [
      {
        q: "Do you repair chimneys or do brick repointing?",
        a: "No. Our concrete and masonry work is for outdoor landscape projects only: patios, walkways, steps, landscape stonework, and outdoor fire features. Chimney work, repointing, foundation repair, and historic restoration belong with a dedicated masonry repair contractor.",
      },
      {
        q: "Is stamped concrete or pavers better for a patio?",
        a: "Both can be excellent, and we build both. Stamped concrete costs less up front and gives a continuous surface with stone-like texture. Pavers cost more but handle freeze-thaw by flexing joint by joint and can be repaired spot by spot. We walk you through the trade-offs for your site and budget with no bias, since we install either one.",
      },
      {
        q: "What outdoor concrete work do you do?",
        a: "Stamped and poured concrete patios, walkways, steps and stoops, and pads for sheds, hoops, and equipment. Every pour gets proper excavation, a compacted base, clean forming, and control joints placed to manage cracking through our freeze-thaw winters.",
      },
      {
        q: "Do you build outdoor fireplaces?",
        a: "Yes. Outdoor fireplaces and fire features are landscape masonry at its best: a solid masonry structure finished in stone or veneer, planned as the anchor of an outdoor room. We design and build them as part of a complete outdoor living space.",
      },
      {
        q: "Can you match stone to my house or existing walls?",
        a: "Usually, yes. We work with natural and manufactured stone in a wide range of colors and profiles, and we match new stonework to existing walls, walkways, or the house itself so additions read as original rather than patched on.",
      },
    ],
  },
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
        heading: "Trusted commercial snow management in Montgomery County",
        text: "When snow and ice arrive, a property has to stay safe and open, and that takes planning, not luck. Mex Landscaping provides 24/7 commercial snow management across Norristown and the Main Line, keeping driveways, walkways, entries, and parking lots clear, safe, and accessible all winter. We combine plowing, de-icing, and sidewalk clearing into one coordinated service so your property is covered end to end and you are not chasing separate contractors when the forecast turns.",
      },
      {
        heading: "Plowing, de-icing, and sidewalk clearing",
        text: "Complete snow management is more than pushing snow off the lot. We plow drive lanes and parking areas, clear sidewalks, entries, and steps where slip-and-fall risk is highest, and apply salt and de-icing material to stop ice from forming and refreezing. Handling all of it as one service means nothing falls through the cracks between visits, and every part of the property, from the back of the lot to the front door, is addressed.",
      },
      {
        heading: "24/7 monitoring and storm response",
        text: "Storms do not wait for business hours. We monitor conditions and respond around the clock, working before you open so your staff, customers, and tenants arrive to a clear, safe property. Commercial clients get priority coverage, and we plan routes and crews so response time stays dependable even during a long or heavy event, because a snow contractor is only as good as how fast and reliably they show up.",
      },
      {
        heading: "Per-storm or seasonal, documented",
        text: "We offer both per-storm billing and flat seasonal contracts with priority response, so you can choose the structure that fits your budget and risk tolerance. Either way, we document our service with records of each visit and treatment, which gives you peace of mind and supports insurance and liability needs. For commercial properties, clear documentation is as important as the plowing itself.",
      },
      {
        heading: "Snow management for Norristown and the Main Line",
        text: "We provide commercial snow management throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, for offices, retail, multifamily, and HOA properties. Pairing snow management with our landscaping and maintenance means one accountable partner all year. Call (484) 261-6650 or request a free estimate to set up coverage before the season.",
      },
    ],
    faqs: [
      {
        q: "Do you offer per-storm or seasonal snow contracts?",
        a: "Both. Per-storm billing means you pay for service as storms occur, while a flat seasonal contract gives you predictable budgeting and priority response regardless of how much snow falls. We will help you choose the structure that fits your property and budget, and we document service either way.",
      },
      {
        q: "How quickly do you respond to a storm?",
        a: "We monitor conditions and respond around the clock, prioritizing commercial clients so the property is clear before you open. We plan routes and crews to keep response dependable even during long or heavy events. Response time is exactly what we build our service around, because that is what keeps your property safe and open.",
      },
      {
        q: "Do you handle sidewalks and entries, not just the lot?",
        a: "Yes. Complete snow management includes plowing drive lanes and parking areas plus clearing sidewalks, entries, and steps and applying de-icing material. Sidewalks and entries are where slip-and-fall risk is highest, so we treat them as a core part of the service, not an add-on.",
      },
      {
        q: "Do you document snow and ice service?",
        a: "We do. We keep records of each visit and treatment, which gives you peace of mind and supports your insurance and liability documentation. For commercial properties, that record of when service occurred is an important part of managing winter risk.",
      },
      {
        q: "Can you handle our landscaping and snow with one company?",
        a: "Yes, and many clients prefer it. Using one accountable partner for landscaping, maintenance, and winter snow management means consistent service, simpler scheduling, and a single point of contact year-round. Call (484) 261-6650 or request a free estimate to set up a plan.",
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
        heading: "Commercial snow plowing that keeps you open",
        text: "A closed or hazardous lot costs you customers, sales, and liability exposure. Mex Landscaping provides commercial snow plowing across Norristown and the Main Line that keeps your business open, safe, and accessible through every storm. We clear parking lots, drive lanes, and entries, manage ice, and document our service, so your customers, staff, and tenants can come and go safely no matter what the winter throws at the property.",
      },
      {
        heading: "Parking lots, drive lanes, and entries",
        text: "We plow the full footprint of a commercial property: parking areas, drive lanes, loading zones, and entrances. We push and stack snow where it will not block parking, sightlines, or access, and we clear right up to entries and sidewalks so there is a safe path from the lot to the door. Handling the whole site as one job keeps the property genuinely usable rather than partly cleared.",
      },
      {
        heading: "Ice removal and salt application",
        text: "Plowing alone does not make a lot safe. We apply salt and de-icing material to prevent ice from forming and to stop refreeze after plowing, focusing on high-traffic lanes, entries, and walkways where the risk is greatest. Pre-treating ahead of a storm and re-treating as conditions change keeps surfaces walkable and drivable, which is a major part of limiting slip-and-fall and accident liability on your property.",
      },
      {
        heading: "Reliable response, documented service",
        text: "A snow contractor is only as good as their response time. We plan routes and crews to keep your property clear before you open and respond around the clock during storms, with commercial clients getting priority coverage. We document each visit and treatment so you have clean records for insurance and liability. Choose per-storm or a flat seasonal contract, whichever fits your budget and risk needs.",
      },
      {
        heading: "Commercial plowing for Norristown and the Main Line",
        text: "We provide commercial snow plowing throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, for offices, retail, multifamily, and HOA properties. Set up coverage before the season so you are not scrambling when the first storm hits. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How much does commercial snow plowing cost?",
        a: "Cost depends on the size of the lot, the layout, where snow can be stacked, and whether you choose per-storm or seasonal billing. De-icing and sidewalk clearing add to the scope. We assess the property and provide a clear proposal so you know exactly what is covered and how it is billed before the season starts.",
      },
      {
        q: "When do you plow during a storm?",
        a: "We monitor conditions and respond around the clock, working to keep your property clear before you open and returning as needed during longer events. Commercial clients receive priority coverage. The exact trigger and frequency are set in your plan so expectations are clear before the snow flies.",
      },
      {
        q: "Do you apply salt and de-icer too?",
        a: "Yes. Plowing removes snow, but salt and de-icing material are what prevent ice and refreeze, especially in high-traffic lanes and entries. We can pre-treat ahead of a storm and re-treat as conditions change to keep surfaces safe, which is central to limiting liability on a commercial property.",
      },
      {
        q: "Do you provide service records for insurance?",
        a: "We do. We document each visit and treatment, giving you records that support insurance and liability requirements. For commercial properties, having proof of when service occurred is an important part of managing winter risk, so we make documentation a standard part of the service.",
      },
      {
        q: "Can you start coverage mid-season?",
        a: "In many cases, yes, though setting up before the season is ideal so your property is on the route from the first storm. Contact us as early as you can and we will work to get you covered. Call (484) 261-6650 or request a free estimate to discuss availability.",
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
        heading: "24/7 emergency snow response that never sleeps",
        text: "Snow rarely arrives at a convenient hour. A storm that starts overnight can shut a property down by morning if no one is watching. Mex Landscaping provides 24/7 emergency snow services across Norristown and the Main Line, monitoring conditions and responding around the clock so a storm never closes you down. Whether it hits at 2 a.m. or during the evening rush, we are ready to clear and treat your property and keep it safe and accessible.",
      },
      {
        heading: "Around-the-clock monitoring and rapid response",
        text: "Fast response starts with watching the weather, not reacting to it. We track conditions continuously through the season and mobilize crews as snow accumulates, so clearing begins promptly rather than after the property is already buried. Rapid plowing and de-icing during and after a storm keep snow from compacting into ice and keep access open, which matters most for properties that cannot afford to wait until daylight.",
      },
      {
        heading: "Plowing and de-icing whenever the weather hits",
        text: "Emergency response covers the full job: plowing drive lanes, parking, and access points, clearing entries and walkways, and applying salt and de-icing material to stop ice and refreeze. During a long or intense storm we return as needed to stay ahead of accumulation. The goal is simple, to keep your property usable and safe throughout the event rather than only after it ends.",
      },
      {
        heading: "Priority coverage, documented",
        text: "Commercial clients receive priority emergency coverage so the properties that most need to stay open are handled first. We document each visit and treatment, which gives you records for insurance and liability and peace of mind that service happened when it was needed. Combined with per-storm or seasonal plans, our 24/7 response means you have a partner watching the weather so you do not have to.",
      },
      {
        heading: "Emergency snow service for Norristown and the Main Line",
        text: "We provide 24/7 emergency snow services throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, for commercial and HOA properties. Set up coverage before winter so you have priority response when a storm hits. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What does 24/7 emergency snow service include?",
        a: "It includes around-the-clock monitoring and response, with plowing, de-icing, and entry and walkway clearing performed whenever a storm hits, day or night. We return as needed during long events to stay ahead of accumulation. Commercial clients receive priority coverage so critical properties are cleared first.",
      },
      {
        q: "Do you really respond in the middle of the night?",
        a: "Yes. We monitor conditions continuously and mobilize as snow accumulates, including overnight, so your property is clear and safe by the time people arrive. That around-the-clock response is the whole point of an emergency plan, especially for properties that cannot wait until morning.",
      },
      {
        q: "How does emergency service differ from a regular contract?",
        a: "Emergency 24/7 service emphasizes continuous monitoring and priority, rapid response at any hour, which is essential for properties that must stay open. It can be structured per-storm or as a seasonal contract. We will help you set the right plan based on how critical fast clearing is for your property.",
      },
      {
        q: "Is emergency snow service available for my property?",
        a: "We offer it for commercial and HOA properties across Montgomery County and the Main Line. The best step is to set up coverage before winter so you are on the priority route from the first storm. Call (484) 261-6650 or request a free estimate to confirm availability for your location.",
      },
      {
        q: "Do you document emergency service for insurance?",
        a: "Yes. We record each visit and treatment so you have documentation that supports insurance and liability needs. Having a clear record of when service occurred during a storm is an important part of managing winter risk on a commercial property.",
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
      {
        heading: "Sidewalk snow removal that protects your visitors",
        text: "Sidewalks and entries are where slip-and-fall risk is highest, and where a property owner's liability is greatest. Mex Landscaping provides thorough sidewalk snow removal across Norristown and the Main Line, clearing and treating walkways, entries, and steps so your visitors stay safe and you stay protected. While a plow handles the lot, the path from the parking space to the front door is what people actually walk, so we treat it as a priority rather than an afterthought.",
      },
      {
        heading: "Walkways, entries, and steps cleared and treated",
        text: "We clear sidewalks, building entrances, steps, and the connecting paths that pedestrians use, then apply salt or de-icing material to prevent ice and refreeze. Steps and entries get particular attention because they are the most common spots for a fall. Keeping these areas clear and walkable through a storm is one of the most direct ways to reduce the slip-and-fall exposure that worries commercial and multifamily property owners.",
      },
      {
        heading: "Done thoroughly, on time",
        text: "Sidewalk clearing only works if it happens reliably and early. We coordinate sidewalk service with our plowing routes so walkways are cleared before people arrive and re-treated as a storm continues. For multi-unit and commercial properties with significant pedestrian traffic, that consistency is essential, since a single icy entry can undo the safety of an otherwise clear property.",
      },
      {
        heading: "Part of a complete snow plan",
        text: "Sidewalk removal is most effective as part of full-property coverage. We combine sidewalk and entry clearing with plowing, de-icing, and salting so one team handles the entire property from the lot to the front door. That coordination means nothing falls between contractors, and we document the service for your insurance and liability records. Choose per-storm or seasonal coverage to fit your needs.",
      },
      {
        heading: "Sidewalk snow removal for Norristown and the Main Line",
        text: "We provide sidewalk snow removal throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, for commercial, multifamily, and HOA properties. Set up coverage before winter so your walkways are clear from the first storm. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "Why is sidewalk clearing so important?",
        a: "Sidewalks, entries, and steps are where slip-and-fall accidents most often happen, which makes them the area of greatest liability for a property owner. Keeping these pedestrian paths clear and treated is one of the most direct ways to keep visitors safe and protect yourself, which is why we treat it as a priority part of snow management.",
      },
      {
        q: "Do you treat steps and entries, not just flat sidewalks?",
        a: "Yes. Steps and building entrances get particular attention because they are the most common spots for a fall. We clear and apply de-icing material to walkways, steps, and entries so the entire pedestrian path stays as safe as possible through a storm.",
      },
      {
        q: "Can sidewalk removal be combined with plowing?",
        a: "Absolutely, and it is the most effective approach. We coordinate sidewalk and entry clearing with our plowing and de-icing so one team covers the whole property from the lot to the door. That keeps anything from falling between separate contractors and gives you a single point of accountability.",
      },
      {
        q: "How much does sidewalk snow removal cost?",
        a: "It depends on the length of walkway, the number of entries and steps, the foot traffic, and whether you choose per-storm or seasonal billing. We assess the property and provide a clear proposal, and it is often most economical bundled with plowing and de-icing as full-property coverage.",
      },
      {
        q: "Do you document sidewalk service?",
        a: "Yes. We record each visit and treatment so you have documentation for insurance and liability. Because sidewalks carry the highest slip-and-fall risk, having a record of when they were cleared and treated is especially valuable for commercial and multifamily property owners.",
      },
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
      {
        heading: "Professional salting and de-icing in Montgomery County",
        text: "Ice is often more dangerous than snow because it is harder to see and harder to clear once it forms. Mex Landscaping provides professional salting and de-icing across Norristown and the Main Line, stopping ice before it becomes a hazard. We treat parking lots, drive lanes, walkways, entries, and steps to keep surfaces safe and walkable through freezing temperatures, melt-and-refreeze cycles, and the storms that leave a thin, slick glaze behind.",
      },
      {
        heading: "Pre-treatment and post-storm application",
        text: "Timing is everything with ice control. Pre-treating surfaces before a storm helps prevent snow and ice from bonding to the pavement, which makes plowing more effective and reduces ice formation. After plowing, we apply salt or de-icing material to melt residual ice and prevent the refreeze that turns a cleared lot dangerous overnight. Applying at the right moments, not just once, is what keeps a property genuinely safe across a full event.",
      },
      {
        heading: "The right product at the right rate",
        text: "Effective de-icing is about applying the correct material at the correct rate for the conditions, not simply dumping salt. Over-applying wastes product and can harm plantings and surfaces, while under-applying leaves ice behind. We treat lots, walkways, and entries with the appropriate material and coverage for the temperature and situation, focusing on high-traffic and high-risk areas where safe footing and traction matter most.",
      },
      {
        heading: "Applied right, recorded right",
        text: "De-icing is a core part of limiting slip-and-fall and accident liability, so we document each application with records of when and where service occurred. That keeps your insurance and liability documentation clean and gives you proof that the property was treated. We coordinate salting and de-icing with plowing and sidewalk clearing so one team manages the full property and nothing is missed between visits.",
      },
      {
        heading: "Salting and de-icing for Norristown and the Main Line",
        text: "We provide salting and de-icing throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, for commercial, multifamily, and HOA properties. Bundle it with plowing and sidewalk clearing for complete winter coverage from one accountable team. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between salting and de-icing?",
        a: "Salting is one form of de-icing, the broader practice of preventing and melting ice on pavement. De-icing can use rock salt or other ice-melt products applied before a storm to prevent bonding or after plowing to melt residual ice and stop refreeze. We use the right material and timing for the conditions to keep surfaces safe.",
      },
      {
        q: "Why pre-treat before a storm?",
        a: "Pre-treating helps keep snow and ice from bonding to the pavement, which makes plowing cleaner and reduces ice formation. Getting ahead of a storm this way means less ice to fight afterward and safer surfaces throughout the event. It is one of the most effective parts of a complete ice-control plan.",
      },
      {
        q: "Will de-icing salt damage my pavement or plants?",
        a: "Applied correctly, at the right rate for conditions, de-icing material keeps surfaces safe without overuse. Over-application is what can harm plantings and surfaces, which is exactly why we apply the appropriate product and coverage rather than simply dumping salt. Proper application protects both safety and the property.",
      },
      {
        q: "Do you document de-icing applications?",
        a: "Yes. We record when and where we treat so you have clear documentation for insurance and liability. Since ice control is central to limiting slip-and-fall exposure, having proof that the property was treated during an event is an important part of managing winter risk.",
      },
      {
        q: "Can I get de-icing without full plowing service?",
        a: "Often yes, though salting and de-icing work best coordinated with plowing and sidewalk clearing as part of complete coverage. We can tailor a plan to your property's needs. Call (484) 261-6650 or request a free estimate to discuss the right combination of services.",
      },
    ],
  },
  // ---------------- MAINTENANCE (secondary, kept for SEO) ----------------
  {
    path: "/property-maintenance/",
    title: "Property Maintenance",
    category: "maintenance",
    icon: "leaf",
    image: "/images/design-front-beds.webp",
    intro: "Reliable, scheduled upkeep for the properties we design and build, and for clients who simply want it done right.",
    highlights: ["Mowing, edging & blowing", "Bed weeding & mulching", "Seasonal color", "Commercial & HOA contracts"],
    body: [
      {
        heading: "Property maintenance that keeps your landscape sharp",
        text: "A beautiful landscape stays beautiful only with consistent care. Mex Landscaping provides reliable, scheduled property maintenance for the landscapes we design and build, and for clients who simply want it done right. Across Norristown and the Main Line, we handle the recurring upkeep that keeps a property polished all season, from mowing and bed care to seasonal transitions, so your landscape always looks cared for and your time stays your own.",
      },
      {
        heading: "Mowing, edging, and bed care",
        text: "Our maintenance covers the work that keeps a property crisp week to week: mowing, edging, and blowing for a clean, even lawn, plus bed weeding, mulching, and trimming to keep plantings tidy and defined. We maintain clean edges where lawn meets bed, since that crisp line is what makes a whole property read as well kept. Consistent care also keeps plants healthier by removing competition and catching small problems early.",
      },
      {
        heading: "Seasonal transitions and color",
        text: "A landscape changes through the year, and good maintenance changes with it. We handle spring cleanups to wake the property up, seasonal color to keep beds vibrant, summer upkeep, and fall cleanups and cutbacks to put the landscape to bed for winter. Managing these transitions on the right schedule keeps the property looking intentional in every season rather than peaking briefly and then drifting.",
      },
      {
        heading: "Consistent crews, dependable scheduling",
        text: "The value of a maintenance plan is consistency, so we provide recurring service with dependable scheduling and crews that get to know your property. That continuity means the work is done the same way every visit and small issues are noticed before they grow. For commercial properties and HOAs, dependable scheduling and one accountable point of contact keep the property consistently presentable without you having to manage it.",
      },
      {
        heading: "Maintenance for homes and businesses on the Main Line",
        text: "We provide property maintenance throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, for single-family homes, commercial properties, and HOAs. We can also fold winter snow management into a year-round plan so one partner keeps your property sharp in every season. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What does a property maintenance plan include?",
        a: "Plans typically include mowing, edging, and blowing, bed weeding and mulching, trimming and pruning, seasonal color, and spring and fall cleanups, tailored to your property. We build the plan around what your landscape needs and how polished you want it kept, and we can add services like aeration or snow management.",
      },
      {
        q: "Do you maintain landscapes you did not install?",
        a: "Yes. While we maintain many of the landscapes we design and build, we also take on clients who simply want their existing property cared for properly. We assess what the landscape needs and set up a recurring plan that keeps it looking its best all season.",
      },
      {
        q: "How much does property maintenance cost?",
        a: "It depends on the size of the property, the scope of services, and how often you want visits. A basic mowing and bed-care plan differs from full-service maintenance with seasonal color and cleanups. We assess your property and provide a clear plan and price so you know exactly what is included.",
      },
      {
        q: "Do you work with commercial properties and HOAs?",
        a: "We do. We provide recurring maintenance for commercial properties and HOAs with consistent crews, dependable scheduling, and one accountable point of contact. We can also combine maintenance with snow management so the property is covered year-round by a single partner.",
      },
      {
        q: "Can you keep my property maintained year-round?",
        a: "Yes. We handle the full seasonal arc, from spring cleanup through summer upkeep, fall cleanups, and winter snow management, on a recurring schedule. One partner across all seasons keeps the property consistent and frees you from coordinating multiple vendors. Call (484) 261-6650 or request a free estimate.",
      },
    ],
  },
  {
    path: "/weeding/",
    title: "Weeding",
    category: "maintenance",
    icon: "leaf",
    image: "/images/design-maple-beds.webp",
    intro: "Regular weeding that keeps your beds crisp, clean, and intentional all season.",
    highlights: ["Hand & selective weeding", "Clean bed edging", "Pre-emergent options", "Debris haul-away"],
    body: [
      {
        heading: "Regular weeding that keeps beds crisp",
        text: "Nothing undoes a polished landscape faster than weeds taking over the beds. Mex Landscaping provides regular weeding for properties across Norristown and the Main Line, keeping garden beds clean, crisp, and intentional all season. We clear invasive growth and maintain the clean edges and tidy beds that make a whole property look cared for. Staying ahead of weeds on a regular schedule is far easier and more effective than letting them establish and then fighting them.",
      },
      {
        heading: "Hand weeding, edging, and pre-emergent options",
        text: "Effective weeding combines methods. We hand-pull and selectively remove weeds from beds, maintain clean bed edges that discourage grass and weeds from creeping in, and can apply pre-emergent treatments to reduce weed germination before it starts. We also haul away the debris so nothing is left behind. The combination keeps beds looking sharp while reducing how aggressively weeds return between visits.",
      },
      {
        heading: "Why regular weeding matters",
        text: "Weeds do more than look untidy. They compete with your plantings for water, nutrients, and light, which stresses the plants you actually want and leaves beds looking neglected. Removing that competition on a regular schedule keeps your shrubs, perennials, and other plantings healthier and gives the landscape the clean, deliberate look that good design deserves. It is small, consistent work that makes a big visual difference.",
      },
      {
        heading: "Part of complete property care",
        text: "Weeding is most effective as part of regular maintenance. We can fold it into a recurring plan alongside mowing, edging, mulching, and trimming so your beds and lawn stay consistently sharp without you thinking about it. Pairing weeding with mulch is especially effective, since a good mulch layer suppresses new weeds while keeping moisture in and beds looking finished.",
      },
      {
        heading: "Weeding service for Norristown and the Main Line",
        text: "We provide weeding throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, as a standalone service or part of a recurring maintenance plan. Keeping beds clean all season is one of the simplest ways to make a property look its best. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How often should beds be weeded?",
        a: "Most properties benefit from regular weeding throughout the growing season, since staying ahead of weeds is far easier than removing established ones. The right frequency depends on your beds, plantings, and how meticulous you want them kept. We can set up a recurring schedule that keeps your beds consistently crisp.",
      },
      {
        q: "Do you use pre-emergent or just pull weeds?",
        a: "We can do both. Hand-pulling and selective removal clear existing weeds, while pre-emergent treatments reduce germination before weeds appear. Pairing the two, often with a fresh mulch layer, gives the longest-lasting clean result. We tailor the approach to your beds and preferences.",
      },
      {
        q: "Does mulching help with weeds?",
        a: "Yes. A good mulch layer suppresses many new weeds by blocking light to germinating seeds, while also retaining moisture and giving beds a finished look. Weeding and mulching together are one of the most effective and cost-efficient ways to keep beds clean through the season.",
      },
      {
        q: "Can weeding be part of a maintenance plan?",
        a: "Absolutely. Weeding is most effective as part of recurring maintenance alongside mowing, edging, mulching, and trimming, so your property stays consistently sharp. We can include it in a regular plan tailored to your landscape and how polished you want it kept.",
      },
      {
        q: "Do you haul away the weeds and debris?",
        a: "Yes. We remove and haul away the weeds and debris so nothing is left behind and your beds are clean when we finish. Leaving a tidy property after every visit is part of how we keep your landscape looking its best.",
      },
    ],
  },
  {
    path: "/trimming/",
    title: "Trimming & Pruning",
    category: "maintenance",
    icon: "leaf",
    image: "/images/curb-colonial.webp",
    intro: "Expert trimming and pruning that keeps plantings shapely and your landscape sharp.",
    highlights: ["Shrub & hedge shaping", "Clean edging", "Species-correct timing", "Debris haul-away"],
    body: [
      {
        heading: "Expert trimming and pruning that keeps a landscape sharp",
        text: "Overgrown, shapeless shrubs make even a well-designed landscape look neglected. Mex Landscaping provides expert trimming and pruning for properties across Norristown and the Main Line, keeping shrubs, hedges, and ornamentals shapely and your whole property looking sharp. There is a real difference between cutting plants back and pruning them properly, and our crews shape plantings with an eye for both their natural form and how they fit the overall landscape.",
      },
      {
        heading: "Shrub shaping, hedge work, and clean edges",
        text: "We shape and maintain shrubs and hedges, define crisp hedge lines, and keep ornamentals tidy and proportioned. Clean, well-shaped plantings and defined edges are what make a property read as polished and intentional. We trim to maintain the size and form each plant should have in its spot, so beds stay open and balanced rather than crowded, leggy, or overgrown by the end of the season.",
      },
      {
        heading: "Timed and cut for plant health",
        text: "Good pruning is as much about timing and technique as appearance. Cutting at the wrong time can remove next season's blooms or stress a plant, so we prune each species at the appropriate time of year and make clean, correct cuts. Done right, pruning protects flowering, encourages dense, healthy growth, improves air circulation, and removes dead or damaged wood, which keeps plantings vigorous rather than simply smaller.",
      },
      {
        heading: "Part of complete property care",
        text: "Trimming and pruning are most effective as part of regular maintenance. We can include them in a recurring plan alongside mowing, weeding, mulching, and seasonal cleanups so your plantings stay shapely and your whole property stays consistently sharp. We also haul away all clippings and debris, leaving the landscape tidy after every visit rather than leaving piles behind.",
      },
      {
        heading: "Trimming and pruning for Norristown and the Main Line",
        text: "We provide trimming and pruning throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, as a standalone service or part of a recurring maintenance plan. Well-pruned plantings are one of the clearest signs of a property that is genuinely cared for. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "When is the best time to prune shrubs?",
        a: "It depends on the species. Many spring-flowering shrubs are best pruned right after they bloom, while others are pruned in late winter or at other times. Pruning at the wrong time can cut off next season's flowers or stress the plant, which is exactly why we time pruning by species rather than doing everything at once.",
      },
      {
        q: "What is the difference between trimming and pruning?",
        a: "Trimming generally refers to shaping and maintaining size and form, while pruning is the broader practice of making selective cuts for plant health, including removing dead or damaged wood and improving structure and airflow. We do both, shaping plantings to look sharp while keeping them healthy.",
      },
      {
        q: "Can you reshape overgrown shrubs and hedges?",
        a: "Yes. We can bring many overgrown shrubs and hedges back into shape, and in some cases use renewal pruning over time to rejuvenate a plant that has gotten leggy. We will assess the plantings and tell you honestly what can be restored and what is better replaced.",
      },
      {
        q: "Do you clean up the clippings?",
        a: "Always. We haul away all clippings and debris and leave the property tidy after every visit. A clean finish is part of the job, so your beds and lawn look better after we prune, not buried under cuttings.",
      },
      {
        q: "Can trimming be part of a maintenance plan?",
        a: "Absolutely. Trimming and pruning fit naturally into a recurring maintenance plan alongside mowing, weeding, mulching, and seasonal cleanups, so your plantings stay shapely all season. We can build a plan around your property and how polished you want it kept. Call (484) 261-6650 or request a free estimate.",
      },
    ],
  },
  {
    path: "/shrubs-and-bushes/",
    title: "Shrubs & Bushes",
    category: "maintenance",
    icon: "leaf",
    image: "/images/design-porch-beds.webp",
    intro: "Expert pruning and care for healthy, shapely shrubs and bushes.",
    highlights: ["Species-specific pruning", "Hedge shaping & renewal", "Disease & pest checks", "Seasonal timing"],
    body: [
      {
        heading: "Expert care for healthy shrubs and bushes",
        text: "Shrubs and bushes are the backbone of most plantings, giving beds structure, screening, and year-round form, but only when they are cared for well. Mex Landscaping provides expert pruning and care for shrubs and bushes across Norristown and the Main Line. We keep them healthy, shapely, and well-proportioned, pruning at the right time and in the right way for each species so they stay dense and vibrant rather than overgrown, sparse, or misshapen.",
      },
      {
        heading: "Species-specific pruning and shaping",
        text: "Different shrubs need different care, so we prune by species rather than applying one approach to everything. We shape hedges and foundation plantings, maintain ornamental and flowering shrubs, and make clean, correct cuts that respect each plant's natural form. Pruning at the appropriate time protects blooms on flowering shrubs and encourages dense, healthy growth, which keeps your plantings looking deliberate and full season after season.",
      },
      {
        heading: "Renewal pruning and rescue",
        text: "Overgrown or leggy shrubs are not always a lost cause. With the right renewal pruning, often staged over a season or two, many shrubs can be rejuvenated, encouraged to fill back in from the base and return to a healthy shape. We assess what you have and tell you honestly what is worth saving and what is better replaced, so you are not paying to nurse along a plant that has reached the end of its life.",
      },
      {
        heading: "Healthier plants through proper care",
        text: "Good shrub care is about health as much as appearance. Proper pruning removes dead and damaged wood, improves air circulation to reduce disease pressure, and keeps plants vigorous. While we work, we keep an eye out for signs of pests or disease and can flag issues early, when they are easiest to address. Healthy shrubs hold their shape, resist problems, and look far better than ones simply sheared back.",
      },
      {
        heading: "Shrub and bush care for Norristown and the Main Line",
        text: "We care for shrubs and bushes throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, as a standalone service or part of a recurring maintenance plan. Well-kept shrubs are one of the clearest signs of a property that is genuinely cared for. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How often should shrubs and bushes be pruned?",
        a: "Most shrubs benefit from pruning at least once a year, though timing and frequency vary by species and the look you want. Flowering shrubs in particular need to be pruned at the right time to avoid cutting off blooms. We prune on a schedule suited to each plant rather than treating them all the same.",
      },
      {
        q: "Can overgrown shrubs be saved?",
        a: "Often, yes. Many overgrown or leggy shrubs respond well to renewal pruning, sometimes staged over a season or two, which encourages them to fill back in and return to a healthy shape. We assess your plantings and tell you honestly which are worth restoring and which are better replaced.",
      },
      {
        q: "Do you prune flowering shrubs at the right time?",
        a: "Yes. Timing is critical for flowering shrubs, since pruning at the wrong point can remove the buds for next season's blooms. We prune each species at the appropriate time to protect flowering and encourage healthy growth, rather than shearing everything on a single visit.",
      },
      {
        q: "Will you check for pests or disease?",
        a: "We keep an eye out as we work. While pruning and shaping, we watch for signs of pests or disease and can flag issues early, when they are easiest and least costly to address. Catching a problem before it spreads is part of keeping your shrubs healthy.",
      },
      {
        q: "Can shrub care be part of a maintenance plan?",
        a: "Absolutely. Shrub and bush care fits naturally into a recurring maintenance plan alongside trimming, weeding, mulching, and cleanups, so your plantings stay healthy and shapely all season. We can build a plan around your property and how meticulous you want it kept. Call (484) 261-6650 or request a free estimate.",
      },
    ],
  },
  {
    path: "/fall-cleanups/",
    title: "Fall Cleanups",
    category: "maintenance",
    icon: "leaf",
    image: "/images/curb-tan-house.webp",
    intro: "Leaf removal and bed prep that puts your property to bed for winter.",
    highlights: ["Full-property leaf removal", "Perennial cutback", "Bed & gutter clearing", "Debris haul-away"],
    body: [
      {
        heading: "Fall cleanups that put your property to bed",
        text: "How a property is closed out in fall sets up how it looks the following spring. Mex Landscaping provides thorough fall cleanups across Norristown and the Main Line, clearing leaves and debris, cutting back perennials, and prepping beds so your landscape is clean through winter and ready to rebound when the season turns. A good fall cleanup is one of the highest-value services of the year, protecting the lawn and beds you have invested in through the months ahead.",
      },
      {
        heading: "Leaf removal, cutbacks, and bed prep",
        text: "A complete fall cleanup is more than raking leaves. We perform full-property leaf removal from lawns and beds, cut back spent perennials, clear out beds, and tidy the landscape for winter. We can also clear leaves from gutters and other problem areas where they cause trouble. Each piece matters: leaves left on the lawn smother grass, and beds full of debris invite pests and disease over winter.",
      },
      {
        heading: "Why fall cleanup protects your landscape",
        text: "A thick layer of fallen leaves blocks light and traps moisture against the lawn, which can lead to matting, mold, and dead patches by spring. Debris-filled beds give pests and disease a place to overwinter. Clearing it all out lets the lawn breathe, keeps beds healthy, and removes the mess that would otherwise greet you in spring. Doing it thoroughly in fall means far less repair work when the growing season returns.",
      },
      {
        heading: "Done thoroughly, hauled away",
        text: "We do not leave piles behind. After clearing leaves, cutting back, and prepping the beds, we remove and haul away all the debris so your property is genuinely clean and tidy heading into winter. For many clients, fall cleanup pairs naturally with aeration and overseeding earlier in the season and a spring cleanup afterward, all of which we can handle as part of a recurring maintenance plan.",
      },
      {
        heading: "Fall cleanups for Norristown and the Main Line",
        text: "We provide fall cleanups throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, as a standalone service or part of a recurring maintenance plan. Scheduling early helps ensure your property is handled before winter sets in. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "When should a fall cleanup be done?",
        a: "The ideal time is after most of the leaves have come down but before snow and hard freezes arrive, typically in mid to late fall. Because leaves do not all drop at once, some properties benefit from more than one visit. We help you schedule the timing so the property is properly closed out before winter.",
      },
      {
        q: "What is included in a fall cleanup?",
        a: "A full fall cleanup typically includes leaf removal from lawns and beds, cutting back spent perennials, clearing out beds, tidying the landscape for winter, and hauling away all debris. We can tailor the scope to your property and add related services like a final mow or gutter leaf clearing.",
      },
      {
        q: "Why not just leave the leaves?",
        a: "A thick layer of leaves blocks light and traps moisture against the lawn, which can cause matting, mold, and dead patches by spring, while debris-filled beds invite pests and disease over winter. Clearing it out protects the lawn and beds and means far less repair work when the growing season returns.",
      },
      {
        q: "Do you haul away the leaves and debris?",
        a: "Yes. We remove and haul away all the leaves and debris so your property is genuinely clean heading into winter, with no piles left behind. A tidy finish is part of every cleanup we do.",
      },
      {
        q: "Can fall cleanup be part of a maintenance plan?",
        a: "Absolutely. Fall cleanup fits naturally into a recurring maintenance plan alongside mowing, bed care, and spring cleanups, and pairs well with fall aeration and overseeding. We can handle the full seasonal arc so your property is cared for year-round. Call (484) 261-6650 or request a free estimate.",
      },
    ],
  },
  {
    path: "/leaf-cleanups/",
    title: "Leaf Cleanup",
    category: "maintenance",
    icon: "leaf",
    image: "/images/curb-colonial.webp",
    intro: "Thorough leaf cleanup to keep your lawn healthy through fall.",
    highlights: ["Full-property removal", "Lawn & bed clearing", "Recurring fall visits", "Debris haul-away"],
    body: [
      {
        heading: "Thorough leaf cleanup to protect your lawn",
        text: "Fallen leaves may look harmless, but left in place they can do real damage to a lawn. Mex Landscaping provides thorough leaf cleanup for properties across Norristown and the Main Line, clearing leaves from lawns and beds so your turf stays healthy through fall and into winter. We remove the blanket of leaves that would otherwise smother the grass, and we haul it all away so your property is clean rather than buried under cuttings and debris.",
      },
      {
        heading: "Full-property leaf removal",
        text: "We clear leaves from the whole property, lawns, beds, and the corners where leaves collect and pack down. We can also clear leaves from gutters and other problem spots where they cause damage. Pulling leaves out of beds matters as much as off the lawn, since wet, matted leaves in beds trap moisture against plant crowns and create a haven for pests and disease over the winter months.",
      },
      {
        heading: "Why leaf removal keeps a lawn healthy",
        text: "A thick blanket of leaves blocks the sunlight grass needs and traps moisture against the turf, which encourages matting, mold, and dead patches that show up in spring. Clearing leaves thoroughly lets the lawn breathe and stay healthy through the dormant season, so it greens up strong rather than emerging thin and damaged. It is a simple service that prevents a lot of avoidable lawn repair later.",
      },
      {
        heading: "Recurring visits through the season",
        text: "Leaves do not fall all at once, so a single cleanup often is not enough. We can schedule recurring visits through the fall so your property stays clear from the first drop to the last, rather than letting leaves pile up between a single early and late cleanup. For many clients, recurring leaf cleanup fits naturally into a broader fall cleanup and maintenance plan that closes the property out properly for winter.",
      },
      {
        heading: "Leaf cleanup for Norristown and the Main Line",
        text: "We provide leaf cleanup throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, as a one-time service, recurring visits, or part of a full maintenance plan. Keeping leaves cleared is one of the easiest ways to protect your lawn through fall. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "How many leaf cleanups do I need in a season?",
        a: "It depends on how many trees you have and when they drop. Because leaves do not all fall at once, many properties benefit from recurring visits through the fall rather than a single cleanup, which prevents leaves from piling up and smothering the lawn between visits. We help you plan the right schedule.",
      },
      {
        q: "Can't I just leave the leaves on the lawn?",
        a: "It is best not to. A thick layer of leaves blocks sunlight and traps moisture against the turf, which can cause matting, mold, and dead patches by spring. Clearing them keeps the lawn healthy through the dormant season so it comes back strong rather than thin and damaged.",
      },
      {
        q: "Do you remove leaves from beds too, not just the lawn?",
        a: "Yes. We clear leaves from lawns and beds, and from corners where they collect. Pulling leaves out of beds is important because wet, matted leaves trap moisture against plant crowns and give pests and disease a place to overwinter, so we do not leave them piled in the planting areas.",
      },
      {
        q: "Do you haul the leaves away?",
        a: "Always. We remove and haul away all the leaves and debris so your property is genuinely clean, with no piles left behind. A tidy finish is part of every cleanup we do.",
      },
      {
        q: "Is leaf cleanup the same as a fall cleanup?",
        a: "Leaf cleanup focuses on removing leaves, while a full fall cleanup also includes cutting back perennials, clearing beds, and prepping the landscape for winter. The two pair naturally, and we can handle leaf removal on its own or as part of a complete fall cleanup and maintenance plan. Call (484) 261-6650 or request a free estimate.",
      },
    ],
  },
  {
    path: "/fall-aeration-seeding/",
    title: "Aeration & Overseeding",
    category: "maintenance",
    icon: "leaf",
    image: "/images/sod-seeded.webp",
    intro: "Thicker, healthier turf through core aeration and overseeding at the ideal time of year.",
    highlights: ["Core aeration", "Overseeding with quality blends", "Starter fertilization", "Best-time fall scheduling"],
    body: [
      {
        heading: "Aeration and overseeding for a thicker lawn",
        text: "If your lawn is thin, worn, or struggling, core aeration paired with overseeding is the single most effective way to bring it back. Mex Landscaping provides aeration and overseeding for properties across Norristown and the Main Line. Core aeration relieves the compaction that chokes a lawn, and overseeding introduces fresh, quality grass into the existing turf. Together, performed at the right time of year, they thicken a tired lawn and build the kind of dense, healthy turf that resists weeds and stands up to use.",
      },
      {
        heading: "What core aeration does",
        text: "Over time, soil compacts and a layer of thatch builds up, blocking the air, water, and nutrients that roots need. Core aeration pulls small plugs of soil from the lawn, opening it up so roots can breathe and grow deeper. That relief from compaction alone improves a lawn's health and its ability to take in water and fertilizer. It also creates the ideal conditions for new seed to make contact with the soil and germinate.",
      },
      {
        heading: "Overseeding and starter fertilization",
        text: "Aeration sets the stage; overseeding does the filling in. We spread a quality grass seed blend suited to our area, and the freshly opened soil from aeration gives that seed excellent seed-to-soil contact, which is exactly what it needs to germinate and establish. A starter fertilization supports the young grass as it takes hold. The result over the following weeks is a noticeably thicker, fuller lawn that crowds out weeds and looks healthier.",
      },
      {
        heading: "Timed for results",
        text: "Timing makes the difference between strong establishment and wasted effort. Fall is the ideal window in our region: the soil is still warm, temperatures are cooling, weeds are slowing down, and moisture is more reliable, all of which give new grass the best chance to establish before winter. We schedule aeration and overseeding for that prime fall window so you get the most from the service, and it pairs naturally with a fall cleanup.",
      },
      {
        heading: "Aeration and overseeding for Norristown and the Main Line",
        text: "We provide aeration and overseeding throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, and Conshohocken, as a standalone service or part of a recurring maintenance plan. It is one of the best investments you can make in a tired lawn. Call (484) 261-6650 or request a free estimate.",
      },
    ],
    faqs: [
      {
        q: "What is core aeration and why does my lawn need it?",
        a: "Core aeration pulls small plugs of soil from the lawn to relieve compaction and break up thatch, letting air, water, and nutrients reach the roots. Compacted soil chokes a lawn and leaves it thin. Aeration restores that flow and, paired with overseeding, is the most effective way to thicken a worn lawn.",
      },
      {
        q: "Why combine aeration with overseeding?",
        a: "Aeration opens the soil and creates excellent seed-to-soil contact, which is exactly what new seed needs to germinate and establish. Overseeding into a freshly aerated lawn fills in thin areas with fresh grass far more successfully than seeding alone. The two together are what produce a noticeably thicker, healthier lawn.",
      },
      {
        q: "When is the best time to aerate and overseed?",
        a: "Fall is the ideal window in our area. The soil is still warm while the air cools, weeds slow down, and moisture is more reliable, giving new grass the best chance to establish before winter. We schedule the service for that prime fall window to get the strongest results.",
      },
      {
        q: "How soon will I see results?",
        a: "New grass from overseeding typically begins to fill in over the following few weeks as it germinates and establishes, with the fullest results visible the next growing season. Proper watering during establishment helps a great deal, and we give you clear guidance so the new grass gets the start it needs.",
      },
      {
        q: "How much does aeration and overseeding cost?",
        a: "It depends mainly on the size of the lawn and whether you add starter fertilization or other services. It is one of the most cost-effective ways to improve a tired lawn. We provide a clear estimate after assessing your lawn. Call (484) 261-6650 or request a free estimate.",
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

export function metaForService(s: Service, fallbackTitle?: string) {
  return {
    title: s.metaTitle ?? fallbackTitle,
    description: s.metaDescription,
  };
}
