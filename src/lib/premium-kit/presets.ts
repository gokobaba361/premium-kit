/*
 * Preset registry.
 *
 * A preset is a sector-specific design read: which palette, how much motion,
 * how dense, and which real-world sites set the bar for that sector.
 * The dials mirror the taste rules the blocks are written against.
 */

export type Scheme = "light" | "dark";

export type Preset = {
  /** data-theme value, see src/design/themes.css */
  id: string;
  name: string;
  /** Sectors this preset was calibrated for */
  sectors: string[];
  scheme: Scheme;
  /** 1 symmetric ... 10 asymmetric */
  variance: number;
  /** 1 static ... 10 cinematic */
  motion: number;
  /** 1 airy ... 10 packed */
  density: number;
  /** One line design read */
  read: string;
  /** Display face for this theme. All are SIL OFL, self hosted by next/font. */
  display: { name: string; why: string; cssVar: string };
  /** Real production sites that define quality in this sector */
  references: string[];
  /** Swatches for the gallery, mirrors themes.css */
  swatch: { bg: string; fg: string; accent: string };
};

export const presets: Preset[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    sectors: ["Developer tools", "Infrastructure", "Technical SaaS", "AI platforms"],
    scheme: "dark",
    variance: 6,
    motion: 5,
    density: 4,
    read: "Technical buyer, dark ground, hairline structure, one green signal accent, proof over adjectives.",
    display: { name: "Geist", cssVar: "--font-geist-sans", why: "The grotesque this sector already reads as native." },
    references: ["linear.app", "vercel.com", "resend.com", "planetscale.com"],
    swatch: { bg: "#0a0b0d", fg: "#f1f2f4", accent: "#3fb87f" },
  },
  {
    id: "bone",
    name: "Bone",
    sectors: ["Design studios", "Agencies", "Portfolios", "Production companies"],
    scheme: "light",
    variance: 9,
    motion: 8,
    density: 3,
    read: "Work is the product. Cool paper, extreme type scale, sharp corners, image led, almost no chrome.",
    display: {
      name: "Bricolage Grotesque", cssVar: "--font-bricolage",
      why: "Wide and slightly odd, which is what holds up at poster size.",
    },
    references: ["basicagency.com", "locomotive.ca", "instrument.com"],
    swatch: { bg: "#f6f6f4", fg: "#141416", accent: "#d4501e" },
  },
  {
    id: "forest",
    name: "Forest",
    sectors: ["Premium consumer", "DTC goods", "Outdoor", "Food and craft"],
    scheme: "light",
    variance: 7,
    motion: 6,
    density: 3,
    read: "Product photography carries the page. Deep green type on bone, amber accent, soft radii, calm pacing.",
    display: {
      name: "Familjen Grotesk", cssVar: "--font-familjen",
      why: "Warm and open, so it sits beside product photography without competing.",
    },
    references: ["aesop.com", "greatjonesgoods.com", "filson.com"],
    swatch: { bg: "#f5f6f2", fg: "#14261d", accent: "#b8621b" },
  },
  {
    id: "cobalt",
    name: "Cobalt",
    sectors: ["Fintech", "B2B platforms", "Enterprise", "Legal and compliance"],
    scheme: "light",
    variance: 5,
    motion: 4,
    density: 5,
    read: "Trust first. Warm off-white, saturated cobalt, tight radii, numbers and logos do the persuading.",
    display: {
      name: "Instrument Sans", cssVar: "--font-instrument-sans",
      why: "Neutral and tight. Unremarkable in the way a bank should be.",
    },
    references: ["stripe.com", "mercury.com", "ramp.com"],
    swatch: { bg: "#fbfaf7", fg: "#0d1220", accent: "#1b3fd8" },
  },
  {
    id: "clinic",
    name: "Clinic",
    sectors: ["Healthcare", "Insurance", "Public services", "Education"],
    scheme: "light",
    variance: 3,
    motion: 2,
    density: 5,
    read: "Accessibility outranks aesthetics. High contrast teal on white, plain language, near static motion.",
    display: {
      name: "Public Sans", cssVar: "--font-public-sans",
      why: "Drawn for US federal services and tested at small sizes. Used for body too.",
    },
    references: ["oscar health", "design-system.service.gov.uk", "designsystem.digital.gov"],
    swatch: { bg: "#ffffff", fg: "#0e1a1c", accent: "#0b6e6e" },
  },
  {
    id: "terracotta",
    name: "Terracotta",
    sectors: ["Hospitality", "Restaurants", "Travel", "Venues and events"],
    scheme: "light",
    variance: 8,
    motion: 6,
    density: 3,
    read: "Atmosphere sells the booking. Cool slate paper, warm rust accent, generous radii, full bleed imagery.",
    display: {
      name: "Cormorant Garamond", cssVar: "--font-cormorant",
      why: "The only serif in the kit. A stone house with a printed daily menu earns one.",
    },
    references: ["standardhotels.com", "acehotel.com", "noma.dk"],
    swatch: { bg: "#f2f3f5", fg: "#1b1e24", accent: "#c05131" },
  },
  {
    id: "slate",
    name: "Slate",
    sectors: ["Architecture", "Real estate", "Interiors", "Construction"],
    scheme: "light",
    variance: 7,
    motion: 4,
    density: 4,
    read: "Plans and photographs do the selling. Cool grey ground, blueprint blue, square corners, wide image ratios.",
    display: {
      name: "Space Grotesk",
      cssVar: "--font-space-grotesk",
      why: "Squared terminals read as technical without turning into a blueprint pastiche.",
    },
    references: ["heatherwick.com", "bjarke ingels group", "compass.com"],
    swatch: { bg: "#eef0f2", fg: "#12161a", accent: "#1f5fa9" },
  },
  {
    id: "signal",
    name: "Signal",
    sectors: ["Consumer apps", "Startups", "Marketplaces", "Productivity"],
    scheme: "light",
    variance: 6,
    motion: 7,
    density: 4,
    read: "Bright, direct and quick to grasp. One saturated indigo, pill shapes, the only theme allowed to look cheerful.",
    display: {
      name: "Plus Jakarta Sans",
      cssVar: "--font-jakarta",
      why: "Friendly geometric that stays legible at the heavy weights this sector uses.",
    },
    references: ["notion.com", "duolingo.com", "revolut.com"],
    swatch: { bg: "#ffffff", fg: "#14142b", accent: "#4338ca" },
  },
  {
    id: "ember",
    name: "Ember",
    sectors: ["Fitness", "Sport", "Performance", "Motorsport"],
    scheme: "dark",
    variance: 8,
    motion: 8,
    density: 4,
    read: "Energy without shouting. Near black ground, hot orange, heavy wide type, motion tied to scroll.",
    display: {
      name: "Archivo",
      cssVar: "--font-archivo",
      why: "Sturdy and wide, keeps its counters open at 700 weight.",
    },
    references: ["nike.com", "whoop.com", "roguefitness.com"],
    swatch: { bg: "#0d0c0b", fg: "#f5f2ef", accent: "#f0511e" },
  },
  {
    id: "ivory",
    name: "Ivory",
    sectors: ["Beauty", "Wellness", "Spa", "Fashion"],
    scheme: "light",
    variance: 7,
    motion: 5,
    density: 2,
    read: "Cold luxury, not warm craft. Bone white, deep plum, wide spacing, geometric type, almost no lines.",
    display: {
      name: "Jost",
      cssVar: "--font-jost",
      why: "Geometric with high contrast counters, the fashion register without a licence fee.",
    },
    references: ["aesop.com", "glossier.com", "byredo.com"],
    swatch: { bg: "#faf9f7", fg: "#241d26", accent: "#6b2d5b" },
  },
  {
    id: "archive",
    name: "Archive",
    sectors: ["Education", "Publishing", "Museums", "Cultural institutions"],
    scheme: "light",
    variance: 5,
    motion: 3,
    density: 4,
    read: "Paper and ink. Serif display, long measure, deep red accent used once per screen.",
    display: {
      name: "EB Garamond",
      cssVar: "--font-eb-garamond",
      why: "The second serif in the kit, and a different one from Terracotta on purpose.",
    },
    references: ["moma.org", "tate.org.uk", "lrb.co.uk"],
    swatch: { bg: "#fbfaf8", fg: "#1c1a17", accent: "#7a1f1f" },
  },
  {
    id: "neon",
    name: "Neon",
    sectors: ["Gaming", "Streaming", "Music", "Nightlife"],
    scheme: "dark",
    variance: 9,
    motion: 9,
    density: 4,
    read: "Dark violet ground with one electric accent. Controlled, not a rainbow, and never a glow on every element.",
    display: {
      name: "Sora",
      cssVar: "--font-sora",
      why: "Techy geometric that avoids the angular gamer cliche.",
    },
    references: ["discord.com", "riotgames.com", "boilerroom.tv"],
    swatch: { bg: "#0b0a12", fg: "#f0eefb", accent: "#38e1b0" },
  },
];

export const presetById = (id: string) => presets.find((p) => p.id === id);
