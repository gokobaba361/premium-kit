/**
 * Sector site kits: the multi-page layer above skeletons.
 *
 * A skeleton is one page's section order. A kit is a whole site: which routes
 * exist, which skeleton drives each one, what content model sits behind them,
 * which schema.org type each route emits, which forms collect what and where it
 * goes, which legal surfaces the sector actually requires, and which operational
 * states must be built.
 *
 * The kits are Turkey-first, so the legal surfaces name the real obligations
 * (KVKK aydınlatma metni, mesafeli satış sözleşmesi, açık rıza for health data)
 * rather than a generic "privacy policy" placeholder. A kit states obligations
 * the sector has; it is not legal advice and says so.
 *
 * Every `skeleton` value is a slug from skeletons.ts and every `blocks` and
 * `registryItem` value is a registry slug, so the kit routes resolve to real
 * installable source. scripts/kit-audit.mjs enforces that.
 */

export type KitRoute = {
  /** Route path relative to the site root. */
  path: string;
  name: string;
  purpose: string;
  /** The skeleton that drives this page's section order, if one fits. */
  skeleton?: string;
  /** Registry items this route needs beyond its skeleton. */
  blocks?: string[];
  /** schema.org type this route should emit as JSON-LD. */
  structuredData?: string;
  /** Core routes ship in v1; the rest are the honest "later" list. */
  required: boolean;
};

export type KitContentType = {
  name: string;
  fields: string[];
  note?: string;
};

export type KitForm = {
  name: string;
  /** Which route the form lives on. */
  route: string;
  registryItem: string;
  collects: string[];
  /** Where the submission actually goes. Never "it just works". */
  destination: string;
};

export type KitLegalSurface = {
  path: string;
  name: string;
  /** Why this sector needs it. Turkey-specific where that is the real rule. */
  why: string;
};

export type SiteKit = {
  slug: string;
  name: string;
  sector: string;
  description: string;
  /** The single outcome the whole site is built to produce. */
  outcome: string;
  /** Preset ids, most appropriate first. */
  themes: string[];
  routes: KitRoute[];
  contentModel: KitContentType[];
  forms: KitForm[];
  legal: KitLegalSurface[];
  /** States that must exist before the kit is considered done. */
  operationalStates: string[];
};

/** Legal surfaces every Turkish commercial site needs, whatever the sector. */
const baseLegal: KitLegalSurface[] = [
  {
    path: "/gizlilik",
    name: "KVKK aydınlatma metni",
    why: "Turkish law requires an aydınlatma metni wherever personal data is collected, including a plain contact form.",
  },
  {
    path: "/cerez-politikasi",
    name: "Cookie policy",
    why: "Required as soon as the site sets any non-essential cookie, including analytics.",
  },
  {
    path: "/kullanim-kosullari",
    name: "Terms of use",
    why: "Sets the terms for using the site itself, separate from any sales contract.",
  },
];

export const siteKits: SiteKit[] = [
  /* ------------------------------------------------------------------ saas */
  {
    slug: "saas-product",
    name: "SaaS and AI product",
    sector: "Software products",
    description:
      "A product site that explains the software, proves it works, prices it plainly and hands a qualified visitor to a trial, with the docs and app shell the product needs afterwards.",
    outcome: "Trial or demo request",
    themes: ["cobalt", "obsidian", "signal"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The product promise, proof and the single trial intent.",
        skeleton: "saas-launch",
        structuredData: "SoftwareApplication",
        required: true,
      },
      {
        path: "/pricing",
        name: "Pricing",
        purpose: "Plan-level decision detail beyond the home page's two-plan summary.",
        blocks: ["page-header", "comparison-table", "faq-accordion", "cta-band"],
        structuredData: "Product",
        required: true,
      },
      {
        path: "/docs",
        name: "Documentation",
        purpose: "Implementation reference, so the trial does not stall on setup.",
        skeleton: "documentation-hub",
        structuredData: "TechArticle",
        required: true,
      },
      {
        path: "/changelog",
        name: "Changelog",
        purpose: "Shipping cadence as evidence the product is alive.",
        blocks: ["page-header", "changelog-list"],
        required: true,
      },
      {
        path: "/signin",
        name: "Sign in",
        purpose: "Entry to the product, with proof beside the form.",
        blocks: ["auth-split", "form"],
        required: true,
      },
      {
        path: "/app",
        name: "Application shell",
        purpose: "The signed-in frame: metrics, filters and the working surface.",
        skeleton: "application-dashboard",
        required: true,
      },
      {
        path: "/blog",
        name: "Blog",
        purpose: "Search-led acquisition and product thinking.",
        skeleton: "publication",
        structuredData: "Blog",
        required: false,
      },
      {
        path: "/customers",
        name: "Customers",
        purpose: "Named case studies once there are real ones to name.",
        blocks: ["page-header", "case-study-grid", "testimonial-grid"],
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Plan",
        fields: ["name", "priceMinor", "cadence", "summary", "features[]", "featured"],
        note: "Price in integer minor units. One currency per site unless billing truly differs by region.",
      },
      {
        name: "Feature",
        fields: ["title", "body", "media?", "span"],
      },
      {
        name: "Doc page",
        fields: ["slug", "group", "title", "body", "updatedAt"],
      },
      {
        name: "Changelog entry",
        fields: ["date", "version?", "title", "body", "changes[]"],
      },
      {
        name: "Integration",
        fields: ["name", "description", "href?", "mark?"],
      },
    ],
    forms: [
      {
        name: "Trial signup",
        route: "/signin",
        registryItem: "form",
        collects: ["email", "password"],
        destination: "Your auth provider. Never store a password yourself.",
      },
      {
        name: "Demo request",
        route: "/pricing",
        registryItem: "contact-form",
        collects: ["name", "work email", "company", "team size", "message"],
        destination: "Your CRM or a shared inbox. Reply time belongs in the confirmation copy.",
      },
      {
        name: "Changelog subscription",
        route: "/changelog",
        registryItem: "newsletter-signup",
        collects: ["email"],
        destination: "Your email provider, with a double opt-in.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/veri-isleme",
        name: "Data processing terms",
        why: "Business customers whose own users' data passes through the product will ask for these before signing.",
      },
    ],
    operationalStates: [
      "Trial signup: idle, validating, submitting, account created, email already in use",
      "Dashboard: loading skeleton, populated, empty (new account), error with retry",
      "Filters: no results with a reset action",
      "Docs search: results, no results with a browse fallback",
      "Billing: plan active, payment failed, cancelled but still in period",
    ],
  },

  /* ---------------------------------------------------------------- clinic */
  {
    slug: "clinic-healthcare",
    name: "Clinic and healthcare",
    sector: "Clinics, dentists and practitioners",
    description:
      "A clinic site that orients an anxious visitor quickly, makes the process and the people legible, and takes a booking without a phone call.",
    outcome: "Booked appointment",
    themes: ["clinic", "forest", "slate"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The outcome, the process and one booking intent.",
        skeleton: "service-business",
        structuredData: "MedicalClinic",
        required: true,
      },
      {
        path: "/hizmetler",
        name: "Services",
        purpose: "What is treated, at what length and price.",
        blocks: ["page-header", "service-picker", "faq-accordion"],
        structuredData: "MedicalProcedure",
        required: true,
      },
      {
        path: "/randevu",
        name: "Booking",
        purpose: "Service, practitioner, time, confirm. The site's whole reason to exist.",
        blocks: [
          "service-picker",
          "staff-picker",
          "availability-calendar",
          "booking-summary",
          "booking-store",
        ],
        required: true,
      },
      {
        path: "/ekip",
        name: "Practitioners",
        purpose: "Trust and fit: who will actually treat you.",
        blocks: ["page-header", "team-grid"],
        structuredData: "Physician",
        required: true,
      },
      {
        path: "/iletisim",
        name: "Contact and locations",
        purpose: "Address, hours, access and a non-booking route in.",
        blocks: ["page-header", "location-grid", "contact-form"],
        structuredData: "LocalBusiness",
        required: true,
      },
      {
        path: "/blog",
        name: "Patient information",
        purpose: "Answering the questions people search before they book.",
        skeleton: "publication",
        structuredData: "MedicalWebPage",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Service",
        fields: ["id", "name", "description", "durationMin", "priceMinor"],
        note: "Duration drives the booking slot length, so it is required, not decorative.",
      },
      {
        name: "Practitioner",
        fields: ["id", "name", "role", "photo?", "services[]"],
      },
      {
        name: "Availability",
        fields: ["date (YYYY-MM-DD)", "times[] (HH:mm)", "practitionerId"],
        note: "Computed server-side and passed to the calendar. Never derived in the block.",
      },
      {
        name: "Location",
        fields: ["name", "address", "hours", "accessNotes"],
      },
    ],
    forms: [
      {
        name: "Appointment booking",
        route: "/randevu",
        registryItem: "booking-summary",
        collects: ["name", "email", "phone", "chosen service, practitioner and slot"],
        destination:
          "Your practice management system. Health data is özel nitelikli kişisel veri: it needs açık rıza and must not sit in a marketing tool.",
      },
      {
        name: "Enquiry",
        route: "/iletisim",
        registryItem: "contact-form",
        collects: ["name", "email", "message"],
        destination:
          "A monitored clinical inbox. Tell people not to send symptoms or medical detail through it.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/acik-riza",
        name: "Açık rıza metni",
        why: "Health data is özel nitelikli kişisel veri under KVKK. Explicit, separate consent is required, and it cannot be bundled into the aydınlatma metni.",
      },
      {
        path: "/hasta-haklari",
        name: "Patient rights",
        why: "Expected of Turkish healthcare providers and reassuring to an anxious visitor.",
      },
    ],
    operationalStates: [
      "Calendar: open days, fully-booked days disabled, closed days disabled, no availability this month",
      "Booking: slot held, slot taken while choosing (re-pick), confirmed, cancelled",
      "Confirmation: on screen plus email, with the reference to quote",
      "Contact form: idle, validation errors, sending, sent with a stated reply window",
    ],
  },

  /* ------------------------------------------------------------- commerce */
  {
    slug: "ecommerce-store",
    name: "E-commerce store",
    sector: "Product collections and direct-to-consumer brands",
    description:
      "A store that moves a visitor from collection to product confidence to a completed order, with the legal surfaces Turkish distance selling actually requires.",
    outcome: "Completed order",
    themes: ["bone", "ivory", "terracotta"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The season or collection story, then the collection itself.",
        skeleton: "commerce-store",
        structuredData: "Organization",
        required: true,
      },
      {
        path: "/koleksiyon",
        name: "Collection",
        purpose: "Browse and filter the range.",
        blocks: ["page-header", "filter-toolbar", "product-grid"],
        structuredData: "ItemList",
        required: true,
      },
      {
        path: "/urun/[slug]",
        name: "Product",
        purpose: "Material detail, variants and the add-to-cart decision.",
        blocks: ["product-detail", "spec-grouped", "gallery-strip", "cart-store"],
        structuredData: "Product",
        required: true,
      },
      {
        path: "/sepet",
        name: "Cart",
        purpose: "A deep-linkable cart route, not only the drawer.",
        blocks: ["cart-drawer", "cart-store"],
        required: true,
      },
      {
        path: "/odeme",
        name: "Checkout",
        purpose: "Contact and delivery, then payment handed to a provider.",
        blocks: ["checkout-form"],
        required: true,
      },
      {
        path: "/siparis/[reference]",
        name: "Order confirmation",
        purpose: "The receipt, the reference and the next step.",
        blocks: ["order-confirmation"],
        required: true,
      },
      {
        path: "/hesabim",
        name: "Account",
        purpose: "Orders, addresses and settings for returning customers.",
        blocks: ["dashboard-shell", "settings-form", "resource-table"],
        required: false,
      },
      {
        path: "/hikaye",
        name: "Our story",
        purpose: "The making and the materials, for a brand that sells on craft.",
        skeleton: "product-story",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Product",
        fields: ["slug", "name", "description", "priceMinor", "currency", "images[]", "variants[]", "specs[]"],
        note: "Price in integer minor units end to end. No floating-point money anywhere.",
      },
      {
        name: "Variant",
        fields: ["id", "label", "soldOut", "sku"],
        note: "Sold-out variants stay visible but disabled, so the range still reads correctly.",
      },
      {
        name: "Order",
        fields: ["reference", "lines[]", "subtotalMinor", "shippingMinor", "status", "placedAt"],
      },
      {
        name: "Collection",
        fields: ["slug", "title", "body", "products[]"],
      },
    ],
    forms: [
      {
        name: "Checkout",
        route: "/odeme",
        registryItem: "checkout-form",
        collects: ["email", "delivery name and address", "country"],
        destination:
          "Your order system, then a payment provider session. Card details are never collected on your own page.",
      },
      {
        name: "Newsletter",
        route: "/",
        registryItem: "newsletter-signup",
        collects: ["email"],
        destination: "Your email provider, with a double opt-in and a real unsubscribe.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/mesafeli-satis-sozlesmesi",
        name: "Mesafeli satış sözleşmesi",
        why: "Turkish distance selling law requires the contract to be presented and accepted before the order is placed, not after.",
      },
      {
        path: "/on-bilgilendirme",
        name: "Ön bilgilendirme formu",
        why: "Must be shown alongside the distance sales contract at checkout.",
      },
      {
        path: "/iade-ve-degisim",
        name: "Returns and exchange",
        why: "The 14-day right of withdrawal must be stated plainly, with the exceptions that genuinely apply.",
      },
      {
        path: "/teslimat",
        name: "Delivery",
        why: "Carriers, timings and costs, so the checkout total is never a surprise.",
      },
      {
        path: "/ileti-izni",
        name: "Ticari elektronik ileti izni",
        why: "The store sends marketing email, so consent must be registered through İYS (İleti Yönetim Sistemi) with an opt-out in every message.",
      },
    ],
    operationalStates: [
      "Product: in stock, variant sold out, whole product sold out, back-order",
      "Cart: empty, populated, item removed, quantity at stock limit",
      "Checkout: validation errors, placing, payment failed, placed",
      "Order: confirmed, shipped, delivered, cancelled, refunded",
      "Collection: no products match the filter, with a reset",
    ],
  },

  /* ------------------------------------------------------------ hospitality */
  {
    slug: "restaurant-hospitality",
    name: "Restaurant and hospitality",
    sector: "Restaurants, cafes and bars",
    description:
      "A venue site that answers the four questions people actually arrive with: what is the food, where is it, when is it open, and can I get a table.",
    outcome: "Reservation or visit",
    themes: ["terracotta", "forest", "archive"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The room, the food and the single reservation intent.",
        skeleton: "service-business",
        structuredData: "Restaurant",
        required: true,
      },
      {
        path: "/menu",
        name: "Menu",
        purpose: "The actual menu, grouped and priced, not a PDF.",
        blocks: ["page-header", "spec-grouped", "gallery-strip"],
        structuredData: "Menu",
        required: true,
      },
      {
        path: "/rezervasyon",
        name: "Reservation",
        purpose: "Party size, date, time, confirm.",
        blocks: ["availability-calendar", "booking-summary", "booking-store"],
        structuredData: "FoodEstablishmentReservation",
        required: true,
      },
      {
        path: "/ziyaret",
        name: "Find us",
        purpose: "Address, hours, transport and access.",
        blocks: ["page-header", "location-grid"],
        structuredData: "LocalBusiness",
        required: true,
      },
      {
        path: "/etkinlikler",
        name: "Events",
        purpose: "Supper clubs, tastings and private hire.",
        blocks: ["page-header", "event-schedule", "contact-form"],
        structuredData: "Event",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Menu section",
        fields: ["heading", "items[]"],
        note: "Group by course. A menu that changes daily needs a date and a publish step.",
      },
      {
        name: "Menu item",
        fields: ["name", "description", "priceMinor", "allergens[]", "dietary[]"],
        note: "Allergens are a real obligation, not a nice-to-have field.",
      },
      {
        name: "Opening hours",
        fields: ["day", "open", "close", "kitchenClose?", "exceptions[]"],
      },
      {
        name: "Reservation",
        fields: ["reference", "date", "time", "partySize", "name", "phone", "notes"],
      },
    ],
    forms: [
      {
        name: "Table reservation",
        route: "/rezervasyon",
        registryItem: "booking-summary",
        collects: ["name", "phone", "party size", "date and time", "dietary notes"],
        destination:
          "Your reservation system or a monitored inbox. Say plainly whether a booking is confirmed instantly or on reply.",
      },
      {
        name: "Private hire enquiry",
        route: "/etkinlikler",
        registryItem: "contact-form",
        collects: ["name", "email", "phone", "date", "guest count", "message"],
        destination: "The events inbox, with a stated reply window.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/alerjen-bilgisi",
        name: "Allergen information",
        why: "Venues must be able to state allergens on request; publishing them removes a phone call and a risk.",
      },
    ],
    operationalStates: [
      "Reservation: available, fully booked for that service, closed that day, holiday exception",
      "Reservation confirmation: instant versus on reply, said plainly either way",
      "Menu: current, seasonal item unavailable, kitchen closed but bar open",
      "Enquiry form: idle, validation errors, sending, sent",
    ],
  },

  /* ---------------------------------------------------------------- agency */
  {
    slug: "agency-studio",
    name: "Agency and creative studio",
    sector: "Design, brand and digital studios",
    description:
      "A studio site that makes the point of view visible before the work, then qualifies the enquiry so the first call is with the right client.",
    outcome: "Qualified project enquiry",
    themes: ["bone", "archive", "obsidian"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "Point of view first, then selected work and one enquiry intent.",
        skeleton: "studio-portfolio",
        structuredData: "ProfessionalService",
        required: true,
      },
      {
        path: "/isler",
        name: "Work",
        purpose: "The full index of selected projects, not just the three on the home page.",
        blocks: ["page-header", "case-study-grid", "filter-toolbar"],
        structuredData: "CollectionPage",
        required: true,
      },
      {
        path: "/isler/[slug]",
        name: "Case study",
        purpose: "One project in depth: the brief, the argument, the outcome.",
        blocks: ["article-layout", "gallery-strip", "stats-band", "proof-quote"],
        structuredData: "CreativeWork",
        required: true,
      },
      {
        path: "/studyo",
        name: "Studio",
        purpose: "How the studio works and who does the work.",
        blocks: ["page-header", "features-split", "team-grid", "timeline"],
        structuredData: "AboutPage",
        required: true,
      },
      {
        path: "/iletisim",
        name: "Contact",
        purpose: "Qualification, not a bare mail link: budget, timing and scope.",
        blocks: ["page-header", "contact-form", "location-grid"],
        structuredData: "ContactPage",
        required: true,
      },
      {
        path: "/yazilar",
        name: "Writing",
        purpose: "The thinking behind the work, for search and for credibility.",
        skeleton: "publication",
        structuredData: "Blog",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Case study",
        fields: ["slug", "client", "title", "outcome", "cover", "gallery[]", "body", "services[]", "year"],
        note: "Outcome is a sentence about what changed, not a metric you cannot source.",
      },
      {
        name: "Service",
        fields: ["name", "description", "deliverables[]"],
      },
      {
        name: "Team member",
        fields: ["name", "role", "photo?"],
      },
      {
        name: "Enquiry",
        fields: ["name", "email", "company", "budgetBand", "timing", "scope"],
        note: "Budget as a band, not a free-text number. It qualifies without feeling like an interrogation.",
      },
    ],
    forms: [
      {
        name: "Project enquiry",
        route: "/iletisim",
        registryItem: "contact-form",
        collects: ["name", "email", "company", "budget band", "timing", "project description"],
        destination:
          "Your CRM or a shared studio inbox. State the reply window in the confirmation and keep it.",
      },
    ],
    legal: [...baseLegal],
    operationalStates: [
      "Work index: filtered to a service with no matches, with a reset",
      "Enquiry form: idle, validation errors, sending, sent with a stated reply window",
      "Case study: published, in progress with client permission pending, under NDA and therefore unlisted",
      "Capacity: taking work, booked until a stated month, said plainly either way",
    ],
  },

  /* ------------------------------------------------------------ freelancer */
  {
    slug: "freelancer-portfolio",
    name: "Freelancer and portfolio",
    sector: "Independent designers, developers and writers",
    description:
      "A one-person site that proves the work quickly, says what the person is available for, and makes hiring them a single obvious step.",
    outcome: "Direct hire enquiry",
    themes: ["bone", "ivory", "slate"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "Who, what for, and the work. Availability stated where it cannot be missed.",
        skeleton: "studio-portfolio",
        structuredData: "Person",
        required: true,
      },
      {
        path: "/isler/[slug]",
        name: "Project",
        purpose: "One project told properly, including what you actually did on it.",
        blocks: ["article-layout", "gallery-strip"],
        structuredData: "CreativeWork",
        required: true,
      },
      {
        path: "/hakkinda",
        name: "About",
        purpose: "The background, the tools and the working arrangement.",
        blocks: ["page-header", "features-split", "timeline"],
        structuredData: "AboutPage",
        required: true,
      },
      {
        path: "/iletisim",
        name: "Contact",
        purpose: "One route in, with enough detail to reply usefully.",
        blocks: ["page-header", "contact-form"],
        structuredData: "ContactPage",
        required: true,
      },
      {
        path: "/yazilar",
        name: "Writing",
        purpose: "Notes and articles, if writing is part of how you are found.",
        skeleton: "publication",
        structuredData: "Blog",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Project",
        fields: ["slug", "title", "client?", "role", "year", "cover", "gallery[]", "body"],
        note: "Role matters most on a freelance site: say what you did, not what the team did.",
      },
      {
        name: "Availability",
        fields: ["status", "fromDate?", "note"],
        note: "One field that drives the banner. Stale availability is worse than none.",
      },
      {
        name: "Skill or service",
        fields: ["name", "description"],
      },
    ],
    forms: [
      {
        name: "Hire enquiry",
        route: "/iletisim",
        registryItem: "contact-form",
        collects: ["name", "email", "project description", "timing", "budget band"],
        destination: "Your own inbox. One person means one honest reply window.",
      },
    ],
    legal: [...baseLegal],
    operationalStates: [
      "Availability: open, booked until a date, not taking work",
      "Enquiry form: idle, validation errors, sending, sent",
      "Project: public, client-confidential and therefore summarised only",
    ],
  },

  /* --------------------------------------------------------- professional */
  {
    slug: "professional-service",
    name: "Consultant and professional service",
    sector: "Consultants, accountants, lawyers and advisors",
    description:
      "An advisory site that makes an intangible service legible: what you do, how the engagement runs, what it costs to start, and how to book the first conversation.",
    outcome: "Booked consultation",
    themes: ["slate", "clinic", "cobalt"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The problem you solve, the process, and one booking intent.",
        skeleton: "service-business",
        structuredData: "ProfessionalService",
        required: true,
      },
      {
        path: "/hizmetler",
        name: "Services",
        purpose: "Each engagement type, its shape and what starting it involves.",
        blocks: ["page-header", "service-picker", "faq-accordion"],
        structuredData: "Service",
        required: true,
      },
      {
        path: "/gorusme",
        name: "Book a consultation",
        purpose: "The first conversation, booked without an email exchange.",
        blocks: ["service-picker", "availability-calendar", "booking-summary", "booking-store"],
        required: true,
      },
      {
        path: "/ekip",
        name: "People",
        purpose: "Credentials and fit. Advisory work is bought from people.",
        blocks: ["page-header", "team-grid"],
        structuredData: "Person",
        required: true,
      },
      {
        path: "/iletisim",
        name: "Contact",
        purpose: "A non-booking route in, plus the registered office.",
        blocks: ["page-header", "contact-form", "location-grid"],
        structuredData: "ContactPage",
        required: true,
      },
      {
        path: "/icgoruler",
        name: "Insights",
        purpose: "Published thinking, which is how advisory work is usually found.",
        skeleton: "publication",
        structuredData: "Blog",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Engagement type",
        fields: ["id", "name", "description", "durationMin", "priceMinor?"],
        note: "If the fee is genuinely scoped per client, say that instead of inventing a number.",
      },
      {
        name: "Advisor",
        fields: ["id", "name", "role", "credentials[]", "photo?"],
        note: "Regulated professions must state the real registration; do not decorate it.",
      },
      {
        name: "Availability",
        fields: ["date", "times[]", "advisorId"],
      },
      {
        name: "Insight",
        fields: ["slug", "title", "excerpt", "body", "date", "author"],
      },
    ],
    forms: [
      {
        name: "Consultation booking",
        route: "/gorusme",
        registryItem: "booking-summary",
        collects: ["name", "email", "phone", "chosen engagement type and slot", "brief context"],
        destination:
          "Your practice calendar and CRM. Client matters can be confidential; keep them out of a marketing tool.",
      },
      {
        name: "Enquiry",
        route: "/iletisim",
        registryItem: "contact-form",
        collects: ["name", "email", "subject", "message"],
        destination:
          "A monitored inbox. Tell people not to send confidential case detail before an engagement exists.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/mesleki-sorumluluk",
        name: "Professional disclaimer",
        why: "Content on an advisory site is general information, not advice for a specific client. Regulated professions may also have to state their chamber or bar registration.",
      },
    ],
    operationalStates: [
      "Calendar: open slots, no availability this month, holiday closure",
      "Booking: confirmed, rescheduled, cancelled by either side",
      "Enquiry: idle, validation errors, sending, sent with a stated reply window",
      "Conflict check: a stated step before an engagement is accepted, where the profession requires one",
    ],
  },

  /* ------------------------------------------------------------ publication */
  {
    slug: "publication-newsletter",
    name: "Blog, publication and newsletter",
    sector: "Editorial brands, research and independent writers",
    description:
      "A publication that puts the newest thinking first, makes the archive genuinely navigable, and converts a reader into a subscriber without a popup.",
    outcome: "Article read and subscription",
    themes: ["archive", "ivory", "bone"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The current issue or latest pieces, and the editorial position.",
        skeleton: "publication",
        structuredData: "Blog",
        required: true,
      },
      {
        path: "/arsiv",
        name: "Archive",
        purpose: "Everything published, filterable by section.",
        blocks: ["page-header", "content-index"],
        structuredData: "CollectionPage",
        required: true,
      },
      {
        path: "/yazi/[slug]",
        name: "Article",
        purpose: "The reading page. The whole site exists to deliver this well.",
        blocks: ["article-layout", "newsletter-signup"],
        structuredData: "BlogPosting",
        required: true,
      },
      {
        path: "/ara",
        name: "Search",
        purpose: "Finding a piece by memory of a phrase, with a real no-results path.",
        blocks: ["page-header", "search-results"],
        structuredData: "SearchResultsPage",
        required: true,
      },
      {
        path: "/bulten",
        name: "Newsletter",
        purpose: "What the email is, how often, and a real archive of past issues.",
        blocks: ["page-header", "newsletter-signup", "blog-grid"],
        required: true,
      },
      {
        path: "/hakkinda",
        name: "About and masthead",
        purpose: "Who publishes this, funded how, and the editorial standards.",
        blocks: ["page-header", "features-split", "team-grid"],
        structuredData: "AboutPage",
        required: true,
      },
      {
        path: "/konu/[slug]",
        name: "Topic",
        purpose: "A durable landing page per subject, once the archive is deep enough to need one.",
        blocks: ["page-header", "content-index"],
        structuredData: "CollectionPage",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Article",
        fields: ["slug", "title", "standfirst", "body", "category", "tags[]", "author", "date", "readingTime", "cover?"],
        note: "Reading time is stored per article, not estimated in the browser, so it is stable and translatable.",
      },
      {
        name: "Author",
        fields: ["id", "name", "role", "bio", "photo?"],
        note: "A real byline. An article with no accountable author is worth less than no article.",
      },
      {
        name: "Newsletter issue",
        fields: ["number", "date", "subject", "body", "articles[]"],
      },
      {
        name: "Topic",
        fields: ["slug", "name", "description"],
      },
    ],
    forms: [
      {
        name: "Newsletter subscription",
        route: "/bulten",
        registryItem: "newsletter-signup",
        collects: ["email"],
        destination:
          "Your email provider with a double opt-in. Commercial email to Turkish recipients must be registered through İYS, and every send needs a working unsubscribe.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/ileti-izni",
        name: "Ticari elektronik ileti izni",
        why: "Commercial email and SMS to recipients in Türkiye require consent registered with İYS (İleti Yönetim Sistemi), with an opt-out in every message.",
      },
      {
        path: "/yayin-ilkeleri",
        name: "Editorial standards",
        why: "States who funds the publication, how corrections are handled and how sponsored content is labelled. A publication that takes money and does not say so has a credibility problem, not a legal one.",
      },
    ],
    operationalStates: [
      "Archive: filtered to a category with no articles, with a reset",
      "Search: results, no results with a browse fallback",
      "Article: published, updated with a visible correction note, unpublished",
      "Subscription: idle, invalid email, sending, confirmation email sent, already subscribed",
    ],
  },

  /* ------------------------------------------------------------------ docs */
  {
    slug: "developer-docs",
    name: "Documentation and developer portal",
    sector: "Developer tools, APIs and product manuals",
    description:
      "A documentation site where orientation, navigation and version history stay available without competing with the technical content.",
    outcome: "Successful implementation",
    themes: ["cobalt", "obsidian", "archive"],
    routes: [
      {
        path: "/",
        name: "Docs home",
        purpose: "Orientation: what this is, and the three paths people arrive wanting.",
        skeleton: "documentation-hub",
        structuredData: "TechArticle",
        required: true,
      },
      {
        path: "/rehber/[slug]",
        name: "Guide",
        purpose: "The reading page, with grouped navigation and code variants.",
        blocks: ["docs-sidebar", "tabs", "article-layout"],
        structuredData: "TechArticle",
        required: true,
      },
      {
        path: "/baslangic",
        name: "Quickstart",
        purpose: "Install to first working result, with nothing optional in the way.",
        blocks: ["page-header", "steps-flow", "tabs"],
        structuredData: "HowTo",
        required: true,
      },
      {
        path: "/surum-notlari",
        name: "Changelog",
        purpose: "What changed, when, and what it breaks.",
        blocks: ["page-header", "changelog-list"],
        required: true,
      },
      {
        path: "/ara",
        name: "Search",
        purpose: "Documentation is used by search first and navigation second.",
        blocks: ["page-header", "search-results", "command-palette"],
        structuredData: "SearchResultsPage",
        required: true,
      },
      {
        path: "/api/[slug]",
        name: "API reference",
        purpose: "Generated reference, kept beside the hand-written guides.",
        blocks: ["docs-sidebar", "tabs"],
        structuredData: "TechArticle",
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Guide page",
        fields: ["slug", "group", "title", "body", "updatedAt", "appliesToVersion"],
        note: "appliesToVersion is what stops a doc site silently describing a release nobody runs.",
      },
      {
        name: "Navigation group",
        fields: ["title", "items[]", "order"],
      },
      {
        name: "Code sample",
        fields: ["language", "label", "code", "runnable?"],
        note: "One sample per language variant, rendered in tabs. Highlighting happens at build time.",
      },
      {
        name: "Release",
        fields: ["version", "date", "title", "body", "changes[]", "breaking"],
      },
    ],
    forms: [
      {
        name: "Docs feedback",
        route: "/rehber/[slug]",
        registryItem: "contact-form",
        collects: ["was this page useful", "what was missing", "page URL"],
        destination:
          "Your issue tracker, with the page URL attached automatically so the report is actionable.",
      },
      {
        name: "Release subscription",
        route: "/surum-notlari",
        registryItem: "newsletter-signup",
        collects: ["email"],
        destination: "Your email provider, with a double opt-in.",
      },
    ],
    legal: [...baseLegal],
    operationalStates: [
      "Search: results, no results with a browse fallback",
      "Guide: current, applies to an older version with a visible banner, deprecated with a link to the replacement",
      "Code sample: copied confirmation, copy unavailable without JavaScript",
      "Feedback: idle, sending, sent, already reported",
    ],
  },

  /* ----------------------------------------------------------------- event */
  {
    slug: "event-conference",
    name: "Event and conference",
    sector: "Conferences, festivals and professional gatherings",
    description:
      "An event site that establishes the promise, makes the programme scannable, keeps venue detail beside registration, and sells the ticket without leaving the site.",
    outcome: "Completed registration",
    themes: ["signal", "neon", "ember"],
    routes: [
      {
        path: "/",
        name: "Home",
        purpose: "The promise, the facts, the programme and one registration intent.",
        skeleton: "event-conference",
        structuredData: "Event",
        required: true,
      },
      {
        path: "/program",
        name: "Programme",
        purpose: "Sessions by day and time, scannable before it is browsable.",
        blocks: ["page-header", "event-schedule", "filter-toolbar"],
        structuredData: "Event",
        required: true,
      },
      {
        path: "/konusmacilar",
        name: "Speakers",
        purpose: "Who is speaking and why that is worth the ticket.",
        blocks: ["page-header", "team-grid"],
        structuredData: "Person",
        required: true,
      },
      {
        path: "/biletler",
        name: "Tickets",
        purpose: "The price ladder, what each tier includes, and what is left.",
        blocks: ["page-header", "ticket-tiers", "faq-accordion"],
        structuredData: "Offer",
        required: true,
      },
      {
        path: "/kayit",
        name: "Registration",
        purpose: "Attendee details, then confirmation with the reference to quote.",
        blocks: ["registration-form", "registration-confirmation"],
        required: true,
      },
      {
        path: "/mekan",
        name: "Venue",
        purpose: "Address, transport, access and accommodation.",
        blocks: ["page-header", "location-grid", "gallery-strip"],
        structuredData: "Place",
        required: true,
      },
      {
        path: "/sponsorlar",
        name: "Sponsors",
        purpose: "Sponsor tiers and a route to the prospectus.",
        blocks: ["page-header", "logo-wall", "contact-form"],
        required: false,
      },
    ],
    contentModel: [
      {
        name: "Session",
        fields: ["id", "day", "time", "title", "speakerIds[]", "track?", "recorded"],
      },
      {
        name: "Speaker",
        fields: ["id", "name", "role", "organisation", "bio", "photo?"],
      },
      {
        name: "Ticket tier",
        fields: ["id", "name", "priceMinor", "includes[]", "availability", "salesEndAt"],
        note: "Availability drives the sold-out state. A tier that sold out stays visible so the ladder still reads honestly.",
      },
      {
        name: "Registration",
        fields: ["reference", "tierId", "attendeeName", "email", "organisation?", "accessNeeds?"],
      },
    ],
    forms: [
      {
        name: "Attendee registration",
        route: "/kayit",
        registryItem: "registration-form",
        collects: ["name", "email", "organisation", "access or dietary needs"],
        destination:
          "Your ticketing system, then a payment provider for paid tiers. Access needs go to the venue, not to marketing.",
      },
      {
        name: "Sponsor enquiry",
        route: "/sponsorlar",
        registryItem: "contact-form",
        collects: ["company", "contact name", "email", "tier of interest"],
        destination: "The sponsorship inbox, with the prospectus sent on reply.",
      },
    ],
    legal: [
      ...baseLegal,
      {
        path: "/mesafeli-satis-sozlesmesi",
        name: "Mesafeli satış sözleşmesi",
        why: "A paid ticket sold online is distance selling: the contract must be presented and accepted before payment.",
      },
      {
        path: "/iade-kosullari",
        name: "Ticket refunds and transfers",
        why: "State the refund window and whether a ticket can be transferred to a colleague, before someone buys ten.",
      },
      {
        path: "/katilim-kurallari",
        name: "Code of conduct",
        why: "Expected of professional events, and it needs a named contact and a real reporting route to mean anything.",
      },
    ],
    operationalStates: [
      "Tickets: available, few left, sold out, sales closed",
      "Registration: idle, validation errors, submitting, confirmed, payment failed",
      "Programme: published, session moved, speaker cancelled with a replacement",
      "Event: upcoming, running today, finished with recordings linked",
    ],
  },
];

export function kitBySlug(slug: string) {
  return siteKits.find((kit) => kit.slug === slug);
}

/** Core routes ship first; the rest are the honest "later" list. */
export function requiredRoutes(kit: SiteKit) {
  return kit.routes.filter((route) => route.required);
}
