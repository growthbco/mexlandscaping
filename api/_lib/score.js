// Lead scoring rubric for the mini CRM. Transparent point system, not a black
// box: every points award is returned as a human-readable reason so whoever
// answers the phone can see WHY a lead scored the way it did.
//
// Tiers: 70+ = "hot" (send to owner), 45-69 = "review" (judgment call),
// below 45 = "low" (probably pass or slow-lane follow-up).

// Core service area — mirrors the city pages on the website.
const CORE_TOWNS = [
  "norristown", "king of prussia", "bryn mawr", "wayne", "conshohocken",
  "plymouth meeting", "gladwyne", "newtown square", "east norriton", "malvern",
  "paoli", "villanova", "eagleville", "broomall", "blue bell", "worcester",
  "whitemarsh", "radnor", "marple", "havertown", "collegeville", "berwyn",
  "ardmore", "wynnewood", "narberth", "penn valley", "audubon", "trooper",
];

const HIGH_TICKET = [
  "design", "patio", "hardscap", "outdoor living", "outdoor kitchen",
  "retaining wall", "fire pit", "firepit", "walkway", "paver", "full",
  "backyard", "renovation", "makeover", "pool",
];
const MID_TICKET = ["drainage", "grading", "lighting", "sod", "planting", "tree", "fence"];
const LOW_TICKET = ["mow", "maintenance", "cleanup", "clean-up", "trim", "mulch", "leaf"];

function matchAny(value, needles) {
  const v = (value || "").toLowerCase();
  return needles.some((n) => v.includes(n));
}

export function scoreLead(lead) {
  const reasons = [];
  let score = 0;
  const add = (pts, why) => { score += pts; reasons.push(`+${pts} ${why}`); };
  const flag = (why) => reasons.push(`+0 ${why}`);

  // Service type (max 30)
  if (matchAny(lead.service, HIGH_TICKET)) add(30, "high-ticket design/build work");
  else if (matchAny(lead.service, MID_TICKET)) add(20, "mid-ticket project work");
  else if (matchAny(lead.service, ["snow"])) add(10, "snow (seasonal, commercial potential)");
  else if (matchAny(lead.service, LOW_TICKET)) add(6, "maintenance-level work");
  else if (lead.service) add(12, "service noted but unclassified");
  else flag("no service type given");

  // Budget (max 25). Ordered checks: "under" first so "Under $10k" never
  // trips the bracket regexes, then highest bracket downward.
  const budget = (lead.budget || "").toLowerCase().replace(/,/g, "");
  if (!budget || /not sure|unknown/.test(budget)) add(8, "budget unknown (neutral)");
  else if (/under|less|</.test(budget)) add(5, "budget under $10k");
  else if (/50\s*k?\s*\+|over\s*\$?\s*50|75\s*k|100\s*k/.test(budget)) add(25, "budget $50k+");
  else if (/25\s*k?\s*(-|to|–)\s*\$?\s*50|[34]\d\s*k/.test(budget)) add(22, "budget $25k-$50k");
  else if (/10\s*k?\s*(-|to|–)\s*\$?\s*25|1[5-9]\s*k|20\s*k/.test(budget)) add(14, "budget $10k-$25k");
  else add(8, "budget unclear (neutral)");

  // Timeline (max 15)
  const tl = (lead.timeline || "").toLowerCase();
  if (/asap|now|immediate|this month|urgent/.test(tl)) add(15, "wants to start ASAP");
  else if (/1-3|1 to 3|next month|spring|soon/.test(tl)) add(12, "starting within 1-3 months");
  else if (/3-6|3 to 6|later|fall/.test(tl)) add(8, "starting in 3-6 months");
  else if (/explor|someday|idea|browsing/.test(tl)) add(3, "just exploring");
  else add(6, "timeline unknown (neutral)");

  // Location (max 15)
  const town = (lead.town || "").toLowerCase().replace(/,?\s*pa\b.*/, "").trim();
  if (town && CORE_TOWNS.some((t) => town.includes(t) || t.includes(town))) {
    add(15, `in core service area (${lead.town})`);
  } else if (town) {
    add(7, `town given but outside core list (${lead.town})`);
  } else {
    add(4, "no town given");
  }

  // Contact quality (max 15)
  if (lead.phone) add(7, "phone number captured");
  if (lead.email) add(3, "email captured");
  if ((lead.property_type || "").toLowerCase().includes("commercial")) add(5, "commercial property (contract potential)");
  else if (lead.property_type) add(5, "property type known");

  const tier = score >= 70 ? "hot" : score >= 45 ? "review" : "low";
  return { score, tier, reasons };
}

export function tierLabel(tier) {
  return tier === "hot" ? "Send to owner" : tier === "review" ? "Maybe - use judgment" : "Low priority";
}
