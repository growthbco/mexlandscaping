// Paid-traffic landing pages (PPC). One per Google Ads ad group.
// Lean, conversion-focused, message-matched to the ads. noindex (paid-only).
// Final URLs: /lp/{slug}/ — update the ad Final URLs to these.

export type Lander = {
  slug: string;
  adGroup: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subhead: string;
  heroImage: string;
  /** Pre-fills the form's service field + used for lead attribution. */
  formService: string;
  trust: string[];
  benefits: { title: string; body: string }[];
  included: string[];
  gallery: { src: string; label: string }[];
  faqs: { q: string; a: string }[];
};

export const landers: Lander[] = [
  {
    slug: "inground-trampolines",
    adGroup: "Inground Trampolines",
    metaTitle: "Inground Trampoline Installation | Montgomery County, PA | Mex Landscaping",
    metaDescription:
      "Professional inground (sunken) trampoline installation in Montgomery County, PA. Licensed and insured. We dig, install, and finish the whole job. Free estimate.",
    h1: "Inground Trampoline Installation in Montgomery County, PA",
    subhead:
      "Safe, built-to-last sunken trampolines, installed start to finish. We handle the dig, the drainage, the install, and a clean finish. Free, no-obligation estimate.",
    heroImage: "/images/lawn-install.webp",
    formService: "Inground Trampolines",
    trust: ["Licensed & Insured", "Locally Owned", "5-Star Rated", "Free Estimates"],
    benefits: [
      {
        title: "Safe, flush-to-grade install",
        body: "A properly sunken trampoline sits level with your lawn, with no tall frame to fall from and no ladder to climb. We build in the retaining and drainage that keep it safe and dry.",
      },
      {
        title: "We handle the whole job",
        body: "Excavation, retaining wall, drainage, trampoline install, and final grading and cleanup. One licensed and insured local crew, start to finish, with no subcontractor runaround.",
      },
      {
        title: "Built to last",
        body: "We do the unseen work right: proper depth, a ventilation and drainage plan so air and water move correctly, and a clean, durable finish that holds up season after season.",
      },
    ],
    included: [
      "On-site assessment and layout",
      "Excavation and soil removal",
      "Retaining wall and drainage to keep the pit dry",
      "Trampoline assembly and secure install",
      "Final grading, cleanup, and walkthrough",
    ],
    gallery: [
      { src: "/images/lawn-install.webp", label: "Fresh, level backyard lawn" },
      { src: "/images/landscape-design.webp", label: "Finished outdoor space" },
    ],
    faqs: [
      {
        q: "How much does an inground trampoline cost to install?",
        a: "It depends on the trampoline size, your soil, and how much excavation, retaining, and drainage the spot needs. We give you a clear, no-obligation estimate after seeing the space so there are no surprises.",
      },
      {
        q: "Is an inground trampoline safer than an above-ground one?",
        a: "Set up correctly, yes. There is no high frame to fall from and no ladder, and the jumping surface sits near ground level. The safety comes down to proper retaining, drainage, and ventilation, which is exactly what we build in.",
      },
      {
        q: "How long does the installation take?",
        a: "Most inground trampoline installs take a few days on-site once we start, depending on the size and the digging, retaining, and drainage involved. We give you a realistic timeline with your estimate.",
      },
      {
        q: "What areas do you serve?",
        a: "We install across Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, Conshohocken, Plymouth Meeting, Gladwyne, and Newtown Square.",
      },
    ],
  },
  {
    slug: "patios",
    adGroup: "Patios",
    metaTitle: "Custom Patio Installation | Norristown & Main Line | Mex Landscaping",
    metaDescription:
      "Custom paver, stone, and flagstone patio installation in Norristown and Montgomery County, PA. Licensed and insured. Built to last. Free patio estimate.",
    h1: "Custom Patio Installation in Norristown & the Main Line",
    subhead:
      "Paver, natural stone, and flagstone patios designed and built as true outdoor rooms. Level, durable, and built on a base that lasts. Free patio estimate.",
    heroImage: "/images/patio.jpg",
    formService: "Patios",
    trust: ["Licensed & Insured", "Locally Owned", "5-Star Rated", "Free Estimates"],
    benefits: [
      {
        title: "Designed and built by one team",
        body: "From the first layout to the final swept joint, one crew handles the whole patio. The space that gets designed is the space you get, with no handoffs.",
      },
      {
        title: "A base that actually lasts",
        body: "Most failed patios fail underground. We excavate to depth, compact a graded base, and build in drainage so your patio stays level and tight for decades, not seasons.",
      },
      {
        title: "Premium materials, your style",
        body: "Concrete pavers, natural flagstone, bluestone, and brick. We show you real samples and match the surface to your home and how you will use the space.",
      },
    ],
    included: [
      "On-site design consultation and layout",
      "Excavation and engineered base prep",
      "Drainage and proper slope",
      "Paver or natural stone installation",
      "Borders, edging, and polymeric jointing",
      "Cleanup and final walkthrough",
    ],
    gallery: [
      { src: "/images/patio.jpg", label: "Custom paver patio" },
      { src: "/images/walkway.jpg", label: "Walkway and plantings" },
      { src: "/images/fire-pit.webp", label: "Patio with fire feature" },
    ],
    faqs: [
      {
        q: "How much does a paver patio cost?",
        a: "It depends on size, material, site access, and any grading or drainage the space needs. We give you an itemized, no-obligation estimate after seeing the space.",
      },
      {
        q: "Are pavers better than stamped concrete?",
        a: "Pavers flex with our freeze-thaw winters and individual units can be lifted and reset, so repairs are simple and nearly invisible. Stamped concrete is one slab that can crack and is harder to fix seamlessly. We install both and will give you an honest recommendation.",
      },
      {
        q: "How long does a patio take to build?",
        a: "Most residential patios take a few days to a week on-site once we start, depending on size, material, and any walls, steps, or drainage involved.",
      },
      {
        q: "Can you add a fire pit, seating wall, or lighting?",
        a: "Yes, and it is most efficient to plan them together. We can build the patio with the base, footings, and conduit already set for a fire feature, seating walls, or low-voltage lighting.",
      },
    ],
  },
  {
    slug: "driveways",
    adGroup: "Driveways",
    metaTitle: "Paver & Stone Driveway Installation | Norristown, PA | Mex Landscaping",
    metaDescription:
      "Custom paver, stone, and Belgian block driveway installation in Norristown and Montgomery County, PA. Built for weight and weather. Free driveway estimate.",
    h1: "Custom Paver & Stone Driveway Installation",
    subhead:
      "Paver, natural stone, and Belgian block driveways built for real weight and decades of freeze-thaw. Boost your curb appeal. Free driveway estimate.",
    heroImage: "/images/driveway.jpg",
    formService: "Driveways",
    trust: ["Licensed & Insured", "Locally Owned", "5-Star Rated", "Free Estimates"],
    benefits: [
      {
        title: "Engineered for the load",
        body: "A driveway carries thousands of pounds a day. We build a deep, compacted base in lifts with drainage built in, so it handles real loads without rutting, cracking, or settling.",
      },
      {
        title: "Curb appeal that holds up",
        body: "Interlocking pavers, natural stone, cobble, and Belgian block borders, finished with clean transitions to your walkways and entry. A driveway that looks designed, not just paved.",
      },
      {
        title: "Easy to repair, built to last",
        body: "Because pavers are individual units, a section can be lifted and reset if a tree root or settling shifts it, so your driveway stays looking right for the long haul.",
      },
    ],
    included: [
      "On-site assessment and layout",
      "Removal of the existing surface",
      "Deep, compacted base and drainage",
      "Paver, stone, or Belgian block installation",
      "Clean borders and apron transitions",
      "Cleanup and final walkthrough",
    ],
    gallery: [
      { src: "/images/driveway.jpg", label: "Paver driveway" },
      { src: "/images/walkway.jpg", label: "Walkway and entry" },
      { src: "/images/stone-wall.jpg", label: "Stone detail" },
    ],
    faqs: [
      {
        q: "How much does a paver driveway cost?",
        a: "It depends on square footage, the material, how much old surface has to be removed, and the base and drainage the site needs. We provide a detailed, no-obligation estimate after measuring your driveway.",
      },
      {
        q: "Are pavers better than asphalt for a driveway?",
        a: "For longevity and looks, yes. Pavers handle freeze-thaw by flexing instead of cracking, individual units can be reset, and they add real curb appeal. Asphalt is cheaper up front but needs ongoing sealing and resurfacing.",
      },
      {
        q: "Can you replace my old asphalt or concrete driveway?",
        a: "Yes. We remove the existing surface, correct the grade and base, fix any drainage problems, and install your new paver or stone driveway on a properly engineered foundation.",
      },
      {
        q: "How long does a driveway take?",
        a: "Most residential paver driveways take roughly one to two weeks on-site, depending on size, demolition of the old surface, and any drainage or grading involved.",
      },
    ],
  },
  {
    slug: "retaining-walls",
    adGroup: "Retaining Walls",
    metaTitle: "Retaining Wall Installation | Montgomery County, PA | Mex Landscaping",
    metaDescription:
      "Engineered retaining walls and seating walls in Norristown and Montgomery County, PA. Block, natural stone, and boulder walls built to last. Free estimate.",
    h1: "Engineered Retaining Walls in Montgomery County, PA",
    subhead:
      "Block, natural stone, and boulder retaining walls that hold back soil, control erosion, and turn a steep slope into usable yard. Built to last. Free estimate.",
    heroImage: "/images/stone-wall.jpg",
    formService: "Retaining & Seating Walls",
    trust: ["Licensed & Insured", "Locally Owned", "5-Star Rated", "Free Estimates"],
    benefits: [
      {
        title: "Engineered to hold for good",
        body: "Walls that lean and bulge failed for the same reasons every time: no drainage and a weak base. We build a compacted base, free-draining backfill, drain pipe, and reinforcement so your wall stays straight for decades.",
      },
      {
        title: "Turns slope into usable space",
        body: "A retaining wall, or a series of tiered walls, converts a steep, unusable bank into level, livable yard, planting beds, or a spot for a patio.",
      },
      {
        title: "Structure that is also a feature",
        body: "Block, natural stone, and boulder walls, with the option of a seating wall that rings a patio or fire pit. We match the material to your home and the job.",
      },
    ],
    included: [
      "On-site grade and drainage assessment",
      "Engineering and permitting where required",
      "Compacted base and reinforcement",
      "Free-draining backfill and drain pipe",
      "Block, natural stone, or boulder wall build",
      "Cleanup and final walkthrough",
    ],
    gallery: [
      { src: "/images/stone-wall.jpg", label: "Natural stone retaining wall" },
      { src: "/images/patio.jpg", label: "Wall with patio" },
      { src: "/images/landscape-design.webp", label: "Terraced landscape" },
    ],
    faqs: [
      {
        q: "How much does a retaining wall cost?",
        a: "Cost depends mostly on height, length, and material, plus the excavation, reinforcement, and drainage the site needs. We assess the grade and soil on-site and give you a clear, itemized estimate.",
      },
      {
        q: "Do tall walls need engineering or a permit?",
        a: "Often, yes. Many townships require engineered drawings and a permit for walls over a certain height. We are familiar with local requirements across Montgomery County and handle the engineering and permitting your wall needs.",
      },
      {
        q: "Why do retaining walls fail, and how do you prevent it?",
        a: "The two biggest causes are poor drainage and a weak base. We prevent both with a compacted base, free-draining gravel backfill, drain pipe to relieve water pressure, and reinforcement on taller walls.",
      },
      {
        q: "Can a retaining wall double as seating?",
        a: "Yes. A seating wall capped at seat height around a patio or fire pit adds structure, definition, and built-in seating all at once.",
      },
    ],
  },
  {
    slug: "drainage",
    adGroup: "Drainage",
    metaTitle: "Yard Drainage & Storm Water Solutions | Montgomery County, PA | Mex Landscaping",
    metaDescription:
      "Fix standing water, soggy lawns, and erosion in Norristown and Montgomery County, PA. French drains, regrading, and dry wells engineered to last. Free estimate.",
    h1: "Yard Drainage & Storm Water Solutions",
    subhead:
      "Standing water, a soggy lawn, water in the basement, or erosion? We find the root cause and engineer a fix that lasts. French drains, regrading, and dry wells. Free estimate.",
    heroImage: "/images/drainage.webp",
    formService: "Drainage & Storm Water",
    trust: ["Licensed & Insured", "Locally Owned", "5-Star Rated", "Free Estimates"],
    benefits: [
      {
        title: "We solve the cause, not the symptom",
        body: "Standing water and erosion damage your landscape and your foundation. We diagnose where the water is really coming from and move it where it belongs, so the problem does not return.",
      },
      {
        title: "Engineered, lasting fixes",
        body: "Grading, French drains, dry wells, swales, and downspout and runoff management. The right solution for your site, installed so it works through every storm.",
      },
      {
        title: "Protect your biggest investment",
        body: "Good drainage is invisible when it is done right and expensive when it is ignored. Fixing it protects your home, your foundation, and your landscape.",
      },
    ],
    included: [
      "On-site drainage assessment",
      "Grading and slope correction",
      "French drains and dry wells",
      "Downspout and runoff management",
      "Erosion control",
      "Cleanup and final walkthrough",
    ],
    gallery: [
      { src: "/images/drainage.webp", label: "Drainage solution" },
      { src: "/images/landscape-design.webp", label: "Healthy, dry landscape" },
      { src: "/images/walkway.jpg", label: "Graded walkway" },
    ],
    faqs: [
      {
        q: "How much does it cost to fix yard drainage?",
        a: "It depends on the cause and the fix, from regrading and a downspout extension to a full French drain and dry well system. We assess the site and give you a clear, no-obligation estimate.",
      },
      {
        q: "Can you fix standing water and a soggy lawn?",
        a: "Yes. We diagnose why water is pooling, then correct the grade and add drains, dry wells, or swales to move it away from your home and lawn for good.",
      },
      {
        q: "Will this help keep water out of my basement?",
        a: "Often, yes. A lot of basement water starts as poor surface drainage and downspouts dumping at the foundation. We address grading and runoff to keep water moving away from the house.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Norristown and Montgomery County and the Main Line, including King of Prussia, Wayne, Bryn Mawr, Conshohocken, Plymouth Meeting, Gladwyne, and Newtown Square.",
      },
    ],
  },
  {
    slug: "hardscaping",
    adGroup: "Hardscaping (PMax)",
    metaTitle: "Custom Hardscaping | Patios, Driveways & Walls | Mex Landscaping",
    metaDescription:
      "Custom hardscaping in Norristown and Montgomery County, PA: paver patios, driveways, walkways, retaining walls, and stonework. Built to last. Free estimate.",
    h1: "Custom Hardscaping in Norristown & the Main Line",
    subhead:
      "Paver patios, driveways, walkways, retaining walls, and stonework, designed and built by one team and engineered to last for decades. Free estimate.",
    heroImage: "/images/patio.jpg",
    formService: "Hardscaping",
    trust: ["Licensed & Insured", "Locally Owned", "5-Star Rated", "Free Estimates"],
    benefits: [
      {
        title: "One team, design through build",
        body: "We design your hardscape and build it with our own crews. Patios, walls, walkways, and driveways planned together so everything connects and the finished space looks intentional, not pieced together.",
      },
      {
        title: "Engineered to last decades",
        body: "Every patio, wall, and driveway starts with excavation, a compacted base, and drainage built in. That hidden groundwork is the single biggest reason our work stays level and tight for the long haul.",
      },
      {
        title: "Premium materials, high-end finish",
        body: "Concrete pavers, natural flagstone and bluestone, full stone, and Belgian block. We match materials to your home and deliver the kind of finish that fits a premium property.",
      },
    ],
    included: [
      "Paver and natural stone patios",
      "Paver, stone, and Belgian block driveways",
      "Walkways, steps, and entries",
      "Retaining and seating walls",
      "Architectural stone and stonework",
      "Engineered base, drainage, and clean finish",
    ],
    gallery: [
      { src: "/images/patio.jpg", label: "Custom paver patio" },
      { src: "/images/driveway.jpg", label: "Paver driveway" },
      { src: "/images/stone-wall.jpg", label: "Natural stone wall" },
    ],
    faqs: [
      {
        q: "What is hardscaping?",
        a: "Hardscaping is the built, structural side of a landscape: patios, walkways, driveways, retaining and seating walls, steps, and stonework. We design and build all of it so the hard elements give your yard its shape and function.",
      },
      {
        q: "How much does a hardscaping project cost?",
        a: "It varies widely by scope, materials, square footage, and site conditions like slope and drainage. A single walkway is a modest project; a full backyard with a patio, walls, and stonework is a larger investment. We provide a clear, itemized estimate and can phase the work.",
      },
      {
        q: "Do you design as well as build?",
        a: "Yes. We are a design-build contractor, so the same team plans your project and installs it. That keeps the design grounded in what can actually be built on your site and gives you one accountable point of contact from start to finish.",
      },
      {
        q: "Can a large project be done in phases?",
        a: "Yes. We can design the full vision up front, then build it in stages that fit your budget and timeline, making sure earlier phases connect cleanly with what comes later.",
      },
      {
        q: "What areas do you serve?",
        a: "We build hardscaping throughout Montgomery County and the Main Line, including Norristown, King of Prussia, Wayne, Bryn Mawr, Conshohocken, Plymouth Meeting, Gladwyne, and Newtown Square.",
      },
    ],
  },
];

export function getLander(slug: string) {
  return landers.find((l) => l.slug === slug);
}
