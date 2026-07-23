export type ResearchSource = {
  name: string;
  repository: string;
  license: "MIT";
  focus: string;
  fit: string;
  patterns: string[];
};

export const researchSources: ResearchSource[] = [
  {
    name: "Launch UI",
    repository: "https://github.com/launch-ui/launch-ui",
    license: "MIT",
    focus: "Next.js 16, React 19 and Tailwind v4 landing-page components.",
    fit: "Closest technical match for modern hero, navigation and product showcase variants.",
    patterns: ["Floating navigation", "App showcase hero", "Product screenshot frame"],
  },
  {
    name: "Shadcn Space",
    repository: "https://github.com/shadcnspace/shadcnspace",
    license: "MIT",
    focus: "Components, marketing blocks, templates and dashboard layouts.",
    fit: "Useful breadth reference for category coverage and CLI distribution.",
    patterns: ["Hero variants", "Testimonial layouts", "Dashboard shells"],
  },
  {
    name: "Origin UI",
    repository: "https://github.com/shadcn/originui",
    license: "MIT",
    focus: "Hundreds of copy-and-paste application UI components.",
    fit: "Best source for form, input, navigation and dense application-state variants.",
    patterns: ["Command palette", "Advanced filters", "Date and time inputs"],
  },
  {
    name: "Magic UI",
    repository: "https://github.com/magicuidesign/magicui",
    license: "MIT",
    focus: "Animated React and Tailwind components for design engineers.",
    fit: "Motion reference only; effects must be reduced and tied to our theme tokens.",
    patterns: ["Video hero dialog", "Avatar proof group", "Text rotation"],
  },
  {
    name: "Page UI",
    repository: "https://github.com/PageAI-Pro/page-ui",
    license: "MIT",
    focus: "Themeable landing-page components and templates for React and Next.js.",
    fit: "Useful conversion-flow reference, with Tailwind v3 code requiring adaptation.",
    patterns: ["Comparison table", "Integration grid", "Case-study cards"],
  },
  {
    name: "TailGrids",
    repository: "https://github.com/TailGrids/tailgrids",
    license: "MIT",
    focus: "React components for marketing, commerce, dashboards and internal tools.",
    fit: "Broad taxonomy reference for finding gaps beyond marketing pages.",
    patterns: ["Commerce grids", "Account pages", "Dashboard widgets"],
  },
  {
    name: "TailAdmin",
    repository: "https://github.com/TailAdmin/free-nextjs-admin-dashboard",
    license: "MIT",
    focus: "Next.js 16, React 19 and Tailwind v4 admin dashboard template.",
    fit: "Strong starting point for the future application and dashboard skeleton family.",
    patterns: ["Sidebar shell", "Analytics overview", "Settings pages"],
  },
];

export const optionBacklog = [
  { family: "Navigation", option: "Floating navigation", source: "Launch UI", status: "ready" },
  { family: "Navigation", option: "Mega menu navigation", source: "Origin UI", status: "ready" },
  { family: "Hero", option: "Centered launch hero", source: "Launch UI", status: "ready" },
  { family: "Hero", option: "Product video hero", source: "Magic UI", status: "planned" },
  { family: "Hero", option: "Mobile app showcase", source: "Launch UI", status: "ready" },
  { family: "Proof", option: "Testimonial grid", source: "Shadcn Space", status: "ready" },
  { family: "Proof", option: "Case-study cards", source: "Page UI", status: "ready" },
  { family: "Product", option: "Integration directory", source: "Page UI", status: "ready" },
  { family: "Pricing", option: "Plan comparison table", source: "Page UI", status: "ready" },
  { family: "Commerce", option: "Product collection grid", source: "TailGrids", status: "ready" },
  { family: "Application", option: "Dashboard shell", source: "TailAdmin", status: "ready" },
  { family: "Application", option: "Authentication flow", source: "Shadcn Space", status: "ready" },
  { family: "Application", option: "Command palette", source: "Origin UI", status: "ready" },
  { family: "Application", option: "Filter toolbar", source: "Origin UI", status: "ready" },
  { family: "Form", option: "Date, time and one-time-code inputs", source: "Origin UI", status: "ready" },
  { family: "Form", option: "Native file upload", source: "TailGrids", status: "ready" },
  { family: "Content", option: "Documentation sidebar", source: "Shadcn Space", status: "ready" },
  { family: "Content", option: "Changelog list", source: "Page UI", status: "ready" },
  { family: "Event", option: "Two-day schedule", source: "TailGrids", status: "ready" },
  { family: "Service", option: "Location directory", source: "TailGrids", status: "ready" },
] as const;
