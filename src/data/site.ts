// Core business facts, navigation, and shared marketing content.

export const business = {
  name: "Mex Landscaping",
  legalName: "Mex Landscaping LLC",
  tagline: "Proficient. Experienced. Reliable.",
  phone: "+1 (484) 261-6650",
  phoneDisplay: "(484) 261-6650",
  phoneHref: "tel:+14842616650",
  email: "team@mexlandscaping.com",
  emailHref: "mailto:team@mexlandscaping.com",
  address: {
    street: "1217 Linwood Ave",
    city: "Norristown",
    state: "PA",
    zip: "19404",
  },
  geo: { lat: 40.1215, lng: -75.34 },
  hours: "Mon–Sat, 7am–6pm",
  priceRange: "$$",
  social: {
    facebook: "https://www.facebook.com/mexlandscaping",
    google: "https://g.page/mexlandscaping",
    tiktok: "https://www.tiktok.com/@mexlandscaping",
  },
} as const;

// Web3Forms access key — replace with your real key (or set PUBLIC_WEB3FORMS_KEY).
export const WEB3FORMS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_KEY ?? "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "Design & Build",
    href: "/landscape-design/",
    children: [
      { label: "Landscape Design & Build", href: "/landscape-design/" },
      { label: "Lawn Installation", href: "/lawn-installation/" },
      { label: "Tree & Plant Installation", href: "/tree-plant-installation/" },
      { label: "Landscape Lighting", href: "/landscape-lighting/" },
      { label: "Drainage & Storm Water", href: "/storm-water-management/" },
      { label: "Commercial Installations", href: "/commercial-landscape-installations/" },
    ],
  },
  {
    label: "Hardscaping",
    href: "/hardscape-services/",
    children: [
      { label: "All Hardscaping", href: "/hardscape-services/" },
      { label: "Patios", href: "/patios/" },
      { label: "Walkways & Steps", href: "/walkways/" },
      { label: "Driveways", href: "/driveways/" },
      { label: "Retaining & Seating Walls", href: "/retaining-walls/" },
      { label: "Architectural Stone & Facades", href: "/architectural-stone-facades/" },
    ],
  },
  {
    label: "Outdoor Living",
    href: "/outdoor-living/",
    children: [
      { label: "Outdoor Living Spaces", href: "/outdoor-living/" },
      { label: "Fire Pits & Fire Features", href: "/fire-pits/" },
      { label: "Outdoor Kitchens", href: "/outdoor-kitchens/" },
      { label: "Water Features", href: "/water-features/" },
    ],
  },
  { label: "Concrete & Masonry", href: "/concrete-masonry/" },
  {
    label: "Snow",
    href: "/snow-management-services/",
    children: [
      { label: "Snow Management", href: "/snow-management-services/" },
      { label: "Commercial Snow Plowing", href: "/commercial-snow-plowing/" },
      { label: "24/7 Emergency Snow", href: "/24-7-emergency-snow-services/" },
      { label: "Sidewalk Snow Removal", href: "/sidewalk-snow-removal/" },
      { label: "Salting & De-Icing", href: "/salting-de-icing/" },
    ],
  },
  { label: "Our Work", href: "/our-work/" },
  { label: "About", href: "/about-us/" },
];

// Cities for the programmatic local-SEO location pages.
export type City = { slug: string; name: string };
export const cities: City[] = [
  { slug: "norristown", name: "Norristown" },
  { slug: "king-of-prussia", name: "King of Prussia" },
  { slug: "bryn-mawr", name: "Bryn Mawr" },
  { slug: "wayne", name: "Wayne" },
  { slug: "conshohocken", name: "Conshohocken" },
  { slug: "plymouth-meeting", name: "Plymouth Meeting" },
  { slug: "gladwyne", name: "Gladwyne" },
  { slug: "newtown-square", name: "Newtown Square" },
  { slug: "east-norriton", name: "East Norriton" },
  { slug: "malvern", name: "Malvern" },
  { slug: "paoli", name: "Paoli" },
  { slug: "villanova", name: "Villanova" },
  { slug: "eagleville", name: "Eagleville" },
  { slug: "broomall", name: "Broomall" },
  { slug: "blue-bell", name: "Blue Bell" },
  { slug: "worcester", name: "Worcester" },
  { slug: "whitemarsh", name: "Whitemarsh" },
  { slug: "radnor", name: "Radnor" },
  { slug: "marple-township", name: "Marple Township" },
  { slug: "havertown", name: "Havertown" },
  { slug: "collegeville", name: "Collegeville" },
  { slug: "berwyn", name: "Berwyn" },
];

export const process = [
  {
    step: "01",
    title: "Project Discussion",
    body: "We begin by understanding your unique vision and needs. Our team listens to your goals, shares ideas, and provides expert advice to ensure we're aligned with your expectations.",
  },
  {
    step: "02",
    title: "Project Planning",
    body: "Next, we craft a detailed, creative plan tailored to your property. Whether it's landscaping, snow management, or fencing, our plan includes innovative solutions and a clear timeline.",
  },
  {
    step: "03",
    title: "Project Execution",
    body: "Our experienced professionals execute the plan with precision and care. From the first dig to the finishing touches, we transform your property into a beautiful, functional space.",
  },
];

export const whyUs = [
  {
    title: "Year-Round Reliability",
    body: "One trusted team for every season — landscaping in summer, cleanups in fall, snow management in winter.",
  },
  {
    title: "Award-Winning Design",
    body: "Thoughtful, creative designs tailored to your property, your style, and your budget.",
  },
  {
    title: "Experienced Crews",
    body: "Skilled professionals who treat your property with care and finish every detail right.",
  },
  {
    title: "Clear Communication",
    body: "From quote to completion, you'll always know the plan, the timeline, and the cost.",
  },
];

export const reviews = [
  {
    quote:
      "Mex Landscaping redesigned our entire backyard — new patio, plantings, and lighting. The crew was professional and the result is stunning. We use the space every night now.",
    name: "Jennifer R.",
    location: "King of Prussia, PA",
  },
  {
    quote:
      "They've handled our commercial property's snow removal for two winters. Always on time, lots cleared before we open, and the documentation makes our insurance easy.",
    name: "Marcus T.",
    location: "Plymouth Meeting, PA",
  },
  {
    quote:
      "From the first consultation to the final walkthrough, everything was clear and on schedule. Our new retaining wall and walkway completely transformed the front of the house.",
    name: "Diane & Paul S.",
    location: "Wayne, PA",
  },
];

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "We serve Norristown, King of Prussia, and surrounding communities including Bryn Mawr, Wayne, Conshohocken, Plymouth Meeting, Gladwyne, Newtown Square, East Norriton, Malvern, Paoli, and more across the Main Line.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. We provide free, no-obligation estimates. Reach out through our contact form or call (484) 261-6650 and we'll schedule a time to assess your property.",
  },
  {
    q: "Do you work with both residential and commercial clients?",
    a: "Absolutely. We handle everything from single-family homes to commercial properties and HOAs, including recurring maintenance and snow contracts.",
  },
  {
    q: "Do you offer seasonal snow contracts?",
    a: "We offer both per-storm and seasonal snow management agreements for residential and commercial properties, with 24/7 priority response during storms.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes, Mex Landscaping is fully licensed and insured. Documentation is available on request, and our commercial snow service includes documented records.",
  },
];
