export type SiteSkeleton = {
  slug: string;
  name: string;
  audience: string;
  description: string;
  outcome: string;
  sections: {
    slug: string;
    label: string;
    purpose: string;
  }[];
  themes: string[];
};

/**
 * Page recipes built from registry blocks.
 *
 * A skeleton defines hierarchy and pacing, not visual style. Themes can change
 * without changing the section order, and individual blocks remain swappable.
 */
export const skeletons: SiteSkeleton[] = [
  {
    slug: "saas-launch",
    name: "SaaS launch",
    audience: "Software products",
    description: "Explain the product, establish trust and move a qualified visitor toward a trial.",
    outcome: "Trial or demo request",
    sections: [
      { slug: "announcement-bar", label: "Announcement", purpose: "Current release or proof point" },
      { slug: "site-nav", label: "Navigation", purpose: "Product, pricing and sign in" },
      { slug: "hero-centered", label: "Centered hero", purpose: "One focused product promise" },
      { slug: "logo-wall", label: "Logo wall", purpose: "Immediate customer proof" },
      { slug: "feature-bento", label: "Feature bento", purpose: "Core capabilities" },
      { slug: "integration-grid", label: "Integrations", purpose: "Fits the existing stack" },
      { slug: "steps-flow", label: "Steps", purpose: "Time to first value" },
      { slug: "testimonial-grid", label: "Testimonials", purpose: "A body of customer evidence" },
      { slug: "comparison-table", label: "Plan comparison", purpose: "Feature-level decision detail" },
      { slug: "faq-accordion", label: "FAQ", purpose: "Final objections" },
      { slug: "cta-band", label: "Closing CTA", purpose: "Repeat the trial intent" },
      { slug: "site-footer", label: "Footer", purpose: "Secondary navigation" },
    ],
    themes: ["Obsidian", "Cobalt", "Signal"],
  },
  {
    slug: "product-story",
    name: "Product story",
    audience: "Commerce and crafted goods",
    description: "Lead with desire, then earn the purchase through material detail and proof.",
    outcome: "Product purchase",
    sections: [
      { slug: "site-nav", label: "Navigation", purpose: "Shop and product families" },
      { slug: "hero-editorial", label: "Editorial hero", purpose: "Product desire" },
      { slug: "gallery-strip", label: "Gallery", purpose: "Material and context" },
      { slug: "features-split", label: "Split features", purpose: "Use and construction" },
      { slug: "spec-grouped", label: "Specifications", purpose: "Practical certainty" },
      { slug: "proof-quote", label: "Proof quote", purpose: "Owner experience" },
      { slug: "faq-accordion", label: "FAQ", purpose: "Care and delivery" },
      { slug: "cta-band", label: "Closing CTA", purpose: "Return to the product" },
      { slug: "site-footer", label: "Footer", purpose: "Service and policies" },
    ],
    themes: ["Bone", "Terracotta", "Ivory"],
  },
  {
    slug: "studio-portfolio",
    name: "Studio portfolio",
    audience: "Agencies and independent studios",
    description: "Make the point of view visible before showing capability and selected work.",
    outcome: "Qualified enquiry",
    sections: [
      { slug: "site-nav", label: "Navigation", purpose: "Work, studio and contact" },
      { slug: "hero-editorial", label: "Editorial hero", purpose: "Point of view" },
      { slug: "logo-wall", label: "Logo wall", purpose: "Client signal" },
      { slug: "features-split", label: "Selected work", purpose: "Two deep case-study entries" },
      { slug: "stats-band", label: "Stats", purpose: "Sourced outcomes" },
      { slug: "team-grid", label: "Team", purpose: "People behind the work" },
      { slug: "proof-quote", label: "Proof quote", purpose: "Client voice" },
      { slug: "contact-form", label: "Contact", purpose: "Project qualification" },
      { slug: "site-footer", label: "Footer", purpose: "Studio navigation" },
    ],
    themes: ["Archive", "Obsidian", "Bone"],
  },
  {
    slug: "service-business",
    name: "Service business",
    audience: "Clinics, advisors and local services",
    description: "Orient quickly, make the process legible and remove anxiety before contact.",
    outcome: "Appointment or consultation",
    sections: [
      { slug: "site-nav", label: "Navigation", purpose: "Services and locations" },
      { slug: "hero-split", label: "Split hero", purpose: "Outcome and human image" },
      { slug: "stats-band", label: "Stats", purpose: "Experience and availability" },
      { slug: "feature-bento", label: "Services", purpose: "Clear offer categories" },
      { slug: "steps-flow", label: "Process", purpose: "What happens next" },
      { slug: "team-grid", label: "Practitioners", purpose: "Trust and fit" },
      { slug: "faq-accordion", label: "FAQ", purpose: "Practical questions" },
      { slug: "contact-form", label: "Contact", purpose: "Appointment request" },
      { slug: "site-footer", label: "Footer", purpose: "Locations and policies" },
    ],
    themes: ["Clinic", "Forest", "Slate"],
  },
  {
    slug: "publication",
    name: "Publication",
    audience: "Blogs, research and editorial brands",
    description: "Put the newest thinking first while keeping topics and subscription easy to find.",
    outcome: "Article depth and subscription",
    sections: [
      { slug: "announcement-bar", label: "Announcement", purpose: "Issue or report release" },
      { slug: "site-nav", label: "Navigation", purpose: "Topics and archive" },
      { slug: "page-header", label: "Page header", purpose: "Editorial position" },
      { slug: "blog-grid", label: "Lead stories", purpose: "Current editorial mix" },
      { slug: "features-split", label: "Featured report", purpose: "One deeper argument" },
      { slug: "timeline", label: "Archive", purpose: "Recent publication history" },
      { slug: "newsletter-signup", label: "Newsletter", purpose: "Reader retention" },
      { slug: "site-footer", label: "Footer", purpose: "Topics and standards" },
    ],
    themes: ["Ivory", "Archive", "Cobalt"],
  },
  {
    slug: "company-profile",
    name: "Company profile",
    audience: "Corporate and institutional sites",
    description: "Balance a clear offer with evidence, history and the people accountable for it.",
    outcome: "Partnership or procurement contact",
    sections: [
      { slug: "site-nav", label: "Navigation", purpose: "Business areas and company" },
      { slug: "hero-split", label: "Split hero", purpose: "Position and operating context" },
      { slug: "logo-wall", label: "Partners", purpose: "Institutional proof" },
      { slug: "feature-bento", label: "Capabilities", purpose: "Business areas" },
      { slug: "stats-band", label: "Stats", purpose: "Scale with sources" },
      { slug: "timeline", label: "Timeline", purpose: "Company history" },
      { slug: "team-grid", label: "Leadership", purpose: "Accountability" },
      { slug: "cta-band", label: "Closing CTA", purpose: "Partnership contact" },
      { slug: "site-footer", label: "Footer", purpose: "Company navigation" },
    ],
    themes: ["Cobalt", "Slate", "Forest"],
  },
  {
    slug: "commerce-store",
    name: "Commerce store",
    audience: "Product collections and direct-to-consumer brands",
    description: "Move from collection discovery to product confidence without turning the page into a promotion wall.",
    outcome: "Collection browse and purchase",
    sections: [
      { slug: "announcement-bar", label: "Announcement", purpose: "Delivery or collection news" },
      { slug: "floating-nav", label: "Floating navigation", purpose: "Collections, search and account" },
      { slug: "hero-editorial", label: "Editorial hero", purpose: "Season or collection story" },
      { slug: "product-grid", label: "Product grid", purpose: "Primary collection browse" },
      { slug: "features-split", label: "Materials", purpose: "Construction and use" },
      { slug: "gallery-strip", label: "Gallery", purpose: "Product in context" },
      { slug: "testimonial-grid", label: "Testimonials", purpose: "Owner experience" },
      { slug: "newsletter-signup", label: "Newsletter", purpose: "Collection releases" },
      { slug: "site-footer", label: "Footer", purpose: "Service and policies" },
    ],
    themes: ["Bone", "Ivory", "Terracotta"],
  },
  {
    slug: "application-dashboard",
    name: "Application dashboard",
    audience: "SaaS products and internal tools",
    description: "Give recurring users a stable frame, current metrics and shareable filters before adding specialized workflows.",
    outcome: "Task completion and monitoring",
    sections: [
      { slug: "auth-split", label: "Authentication", purpose: "Entry and product proof" },
      { slug: "dashboard-shell", label: "Dashboard shell", purpose: "Persistent application frame" },
      { slug: "metrics-overview", label: "Metrics", purpose: "Current operating state" },
      { slug: "filter-toolbar", label: "Filters", purpose: "Shareable data view" },
      { slug: "data", label: "Data display", purpose: "Tables, states and pagination" },
      { slug: "feedback", label: "Feedback", purpose: "Loading, empty and error states" },
      { slug: "toast", label: "Confirmations", purpose: "Transient action confirmation" },
    ],
    themes: ["Slate", "Cobalt", "Obsidian"],
  },
  {
    slug: "documentation-hub",
    name: "Documentation hub",
    audience: "Developer tools, APIs and product manuals",
    description: "Keep orientation, navigation and version history available without competing with the technical content.",
    outcome: "Successful implementation",
    sections: [
      { slug: "site-nav", label: "Navigation", purpose: "Product, guides and API" },
      { slug: "page-header", label: "Page header", purpose: "Guide orientation" },
      { slug: "docs-sidebar", label: "Documentation layout", purpose: "Grouped navigation and article" },
      { slug: "tabs", label: "Code variants", purpose: "Framework or language choices" },
      { slug: "changelog-list", label: "Changelog", purpose: "Version history" },
      { slug: "newsletter-signup", label: "Updates", purpose: "Release subscription" },
      { slug: "site-footer", label: "Footer", purpose: "Reference and support" },
    ],
    themes: ["Cobalt", "Archive", "Neon"],
  },
  {
    slug: "event-conference",
    name: "Event and conference",
    audience: "Conferences, festivals and professional gatherings",
    description: "Establish the event promise, make the programme scannable and keep venue information close to registration.",
    outcome: "Registration",
    sections: [
      { slug: "announcement-bar", label: "Announcement", purpose: "Ticket or programme update" },
      { slug: "site-nav", label: "Navigation", purpose: "Programme, speakers and venue" },
      { slug: "hero-centered", label: "Centered hero", purpose: "Event promise and registration" },
      { slug: "stats-band", label: "Event facts", purpose: "Dates, stages and capacity" },
      { slug: "event-schedule", label: "Schedule", purpose: "Sessions by day and time" },
      { slug: "team-grid", label: "Speakers", purpose: "People and roles" },
      { slug: "location-grid", label: "Venue", purpose: "Address and access" },
      { slug: "newsletter-signup", label: "Updates", purpose: "Programme changes" },
      { slug: "site-footer", label: "Footer", purpose: "Policies and contact" },
    ],
    themes: ["Neon", "Signal", "Ember"],
  },
];
