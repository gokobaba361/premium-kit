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
];

export function kitBySlug(slug: string) {
  return siteKits.find((kit) => kit.slug === slug);
}

/** Core routes ship first; the rest are the honest "later" list. */
export function requiredRoutes(kit: SiteKit) {
  return kit.routes.filter((route) => route.required);
}
