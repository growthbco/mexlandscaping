// Project case studies. Each is grounded in real photos from the client photo
// library and the verified project notes from the Our Work page. Location and
// budget fields are optional and should only be filled with confirmed facts
// from the owner; never guess a town or a price.

export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  /** Optional stage tag rendered as a badge, e.g. "Before" / "During" / "After" */
  tag?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Card + meta description summary, one or two sentences. */
  summary: string;
  /** Confirmed town, e.g. "Conshohocken, PA". Omit until verified. */
  location?: string;
  /** Related service pages for internal linking. */
  services: { label: string; href: string }[];
  photos: ProjectPhoto[];
  sections: { heading: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: "natural-stone-retaining-wall-driveway",
    title: "Natural Stone Retaining Wall & Driveway Entrance",
    summary:
      "A failing slope beside the garage rebuilt with a hand-laid natural fieldstone retaining wall, stone steps, and a clean driveway entrance.",
    services: [
      { label: "Retaining & Seating Walls", href: "/retaining-walls/" },
      { label: "Driveways", href: "/driveways/" },
      { label: "Landscape Design & Build", href: "/landscape-design/" },
    ],
    photos: [
      {
        src: "/images/wall-stone-during.webp",
        alt: "Mex Landscaping masons hand-laying a natural fieldstone retaining wall",
        caption: "Our masons laying the fieldstone wall by hand",
        tag: "During",
      },
      {
        src: "/images/wall-stone-after.webp",
        alt: "Finished natural fieldstone retaining wall with stone steps",
        caption: "The finished wall and stone steps",
        tag: "After",
      },
      {
        src: "/images/wall-stone-house.webp",
        alt: "Completed driveway and stone entrance framed by the new fieldstone wall",
        caption: "Completed driveway and entrance",
        tag: "Finished",
      },
    ],
    sections: [
      {
        heading: "The problem",
        text: "The slope beside the garage was failing, and a failing slope next to a driveway is not a cosmetic issue. Left alone, it sheds soil onto the pavement, undermines the edge of the drive, and gets worse with every freeze-thaw cycle. The property needed the grade held back permanently, and the owners wanted it done in a material that suited the house rather than a wall that would read as a repair.",
      },
      {
        heading: "The build",
        text: "We rebuilt the slope with a hand-laid natural fieldstone retaining wall. Fieldstone walls are the slow way to do it: each stone is selected and placed by a mason rather than stacked from a pallet of identical block, which is exactly why the finished wall looks like it has always been part of the property. Behind the face of the wall is what makes it last: a proper excavated footing, compacted base, and drainage so water moves through and away instead of building pressure behind the stone.",
      },
      {
        heading: "The result",
        text: "The finished project holds the grade with a wall that adds to the property instead of apologizing for a problem: natural stone steps tie the levels together, and the driveway entrance now reads as a clean, deliberate arrival to the home. It is the difference between fixing a slope and improving the property while you are at it.",
      },
    ],
  },
  {
    slug: "dry-creek-drainage-system",
    title: "Dry Creek Beds & French Drain Systems",
    summary:
      "Drainage that solves the problem and looks like landscaping: river-rock dry creek beds, rip-rap swales, and French drains that move storm water away for good.",
    services: [
      { label: "Drainage & Storm Water", href: "/storm-water-management/" },
      { label: "Landscape Design & Build", href: "/landscape-design/" },
    ],
    photos: [
      {
        src: "/images/drainage-drycreek.webp",
        alt: "River-rock dry creek bed installed to carry storm water through a lawn",
        caption: "River-rock dry creek bed",
      },
      {
        src: "/images/drainage-creek-steps.webp",
        alt: "Dry creek drainage channel with natural stone steps crossing it",
        caption: "Dry creek with stone steps",
      },
      {
        src: "/images/drainage-riprap.webp",
        alt: "Rip-rap stone drainage swale controlling runoff on a slope",
        caption: "Rip-rap drainage swale",
      },
      {
        src: "/images/drainage-pipe.webp",
        alt: "French drain outlet discharging collected water away from the house",
        caption: "French drain outlet",
      },
    ],
    sections: [
      {
        heading: "The problem",
        text: "Storm water is the quiet enemy of a property. A soggy lawn you cannot mow, mulch that washes out of the beds every storm, water creeping toward the foundation: these problems do not fix themselves, and surface-level patches only move them around. Solving them means giving the water a designed path from where it lands to where it can safely go.",
      },
      {
        heading: "The build",
        text: "These systems combine the tools of real drainage work. French drains intercept subsurface water and carry it in buried, gravel-wrapped pipe. Dry creek beds handle surface flow in an open river-rock channel that moves serious volume during a storm and reads as a landscape feature the other 360 days of the year. Rip-rap swales armor the routes where moving water would otherwise cut into a slope. Each element is graded and sized for the water it actually has to carry.",
      },
      {
        heading: "The result",
        text: "Drainage done this way disappears into the landscape twice over: the water problem is gone, and what remains looks like it was designed rather than installed, because it was. A dry creek crossed by stone steps is the kind of detail that makes visitors assume the feature was always there, with no idea it is quietly protecting the foundation.",
      },
    ],
  },
  {
    slug: "commercial-grounds-installation",
    title: "Commercial Grounds Installation",
    summary:
      "A bare commercial lot transformed with new shade trees, foundation shrub beds, and fresh grading, turning an unfinished site into a presentable property.",
    services: [
      { label: "Commercial Landscaping", href: "/commercial-landscaping/" },
      { label: "Commercial Installations", href: "/commercial-landscape-installations/" },
    ],
    photos: [
      {
        src: "/images/commercial-before.webp",
        alt: "Bare commercial lot before landscaping with staged plant material",
        caption: "Bare lot with staged plant material",
        tag: "Before",
      },
      {
        src: "/images/commercial-after.webp",
        alt: "Commercial property after installation of shade trees and planted beds",
        caption: "New shade trees and planted beds",
        tag: "After",
      },
    ],
    sections: [
      {
        heading: "The problem",
        text: "A commercial property with bare grounds sends a message to every tenant, customer, and prospect who pulls in, and it is not a good one. This site needed to go from unfinished to presentable: real plantings, correct grading, and a landscape that would stay manageable for the property's maintenance budget rather than becoming a new liability.",
      },
      {
        heading: "The build",
        text: "We installed the property's landscape from the ground up: fresh grading to establish clean lines and proper drainage, new shade trees positioned for scale as they mature, and foundation shrub beds that give the building a finished base. Commercial plantings are chosen differently than residential ones; species and spacing are selected to look sharp with routine maintenance, not to demand a gardener's attention.",
      },
      {
        heading: "The result",
        text: "The finished grounds do what commercial landscaping is supposed to do: make the property look managed. Trees frame the site, beds anchor the building, and the whole frontage now reflects well on the businesses inside it. Installations like this pair naturally with a recurring maintenance contract, so the day-one standard is the everyday standard.",
      },
    ],
  },
  {
    slug: "backyard-artificial-turf",
    title: "Backyard Artificial Turf Lawn",
    summary:
      "A patchy, bare backyard graded, base-prepped, and finished with a lush, low-maintenance artificial turf lawn edged cleanly to the deck.",
    services: [
      { label: "Lawn Installation", href: "/lawn-installation/" },
      { label: "Landscape Design & Build", href: "/landscape-design/" },
    ],
    photos: [
      {
        src: "/images/turf-before.webp",
        alt: "Worn-out patchy backyard lawn before artificial turf installation",
        caption: "Worn-out, patchy backyard",
        tag: "Before",
      },
      {
        src: "/images/turf-deck.webp",
        alt: "Finished artificial turf lawn edged to the deck",
        caption: "Finished turf lawn edged to the deck",
        tag: "After",
      },
      {
        src: "/images/turf-pool.webp",
        alt: "Artificial turf lawn meeting bluestone paving beside a pool",
        caption: "Turf and bluestone at the pool on another project",
      },
    ],
    sections: [
      {
        heading: "The problem",
        text: "Some backyards fight grass and win: heavy shade, heavy traffic, or soil that never drains right leaves a lawn permanently patchy no matter how much seed and effort goes into it. This backyard had reached that point. The owners wanted it green, usable, and done fighting.",
      },
      {
        heading: "The build",
        text: "Artificial turf succeeds or fails on what is underneath it. We stripped the failed lawn, corrected the grade so water sheds properly, and built a compacted aggregate base, the same discipline we bring to a patio. The turf itself goes down over that engineered base with clean, tight edges where it meets the deck, so the transition looks intentional rather than trimmed-to-fit.",
      },
      {
        heading: "The result",
        text: "A backyard that is green every month of the year, drains after rain instead of holding it, and asks for essentially nothing: no mowing, no seeding, no mud tracked in from the bare spots. For the right property, turf is not a compromise; it is the end of a losing battle.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
