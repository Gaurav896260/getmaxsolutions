// Single source for site-wide copy, navigation and SEO values.
// Copy follows getmax-plan.txt (positioning, 9 services, 4 pillars). Delete any
// service the team cannot deliver today.

export const SITE = {
  name: "Getmax Solutions",
  shortName: "Getmax",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://getmaxsolutions.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@getmaxsolutions.com",
  // Digits only with country code, e.g. "919876543210". Leave unset to hide WhatsApp buttons.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  tagline: "We build the digital engine behind growing businesses.",
  subline:
    "Strategy, websites, performance marketing, automation and AI. One team that plans it, builds it and runs it.",
  description:
    "Getmax Solutions is a digital marketing, technology and consulting company. Strategy, websites, performance marketing, SEO, automation and AI — one team that plans it, builds it and runs it. Deep in healthcare, built for every industry.",
  logo: "/purple name logo.svg",
  healthcareUrl: "https://getmaxhealthcare.com",
} as const;

// Link-preview image for pages that set their own openGraph/twitter metadata —
// a page-level openGraph object replaces the root one, dropping the image otherwise.
export const SHARE_IMAGE = {
  openGraph: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  twitter: ["/twitter-image"],
};

// Social profiles — add the real URLs; empty ones are not shown anywhere.
export const SOCIALS: { label: "LinkedIn" | "Instagram" | "Facebook" | "X"; href: string }[] = [
  { label: "LinkedIn", href: "" },
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "X", href: "" },
];

export type NavLink = { label: string; href: string; children?: NavLink[] };

export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "strategy",
    title: "Strategy & consulting",
    summary:
      "Know where growth will come from before you spend on it — a clear roadmap built on an honest audit of where you stand.",
    points: [
      "Digital strategy & roadmaps",
      "Growth audits & competitor intelligence",
      "Go-to-market & positioning",
      "Marketing operations & team enablement",
    ],
  },
  {
    slug: "websites",
    title: "Websites & web apps",
    summary:
      "Fast, search-ready websites and web apps designed to turn visitors into enquiries, not just look good.",
    points: [
      "Website design & development",
      "Landing pages & conversion design",
      "E-commerce & custom web apps",
      "Client portals & CMS builds",
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance marketing",
    summary:
      "Paid campaigns run against cost per lead and pipeline, with budgets moved to what actually converts.",
    points: [
      "Google, Meta & LinkedIn ads",
      "Funnels & CRO",
      "Lead generation programmes",
      "Attribution & budget optimisation",
    ],
  },
  {
    slug: "seo",
    title: "SEO, local & AI search",
    summary:
      "Be found on Google, on Maps and inside AI answers — the places your buyers now start their search.",
    points: [
      "Technical & content SEO",
      "Local SEO & Google Maps",
      "AI-search optimisation (GEO/AEO)",
      "Content strategy & production",
    ],
  },
  {
    slug: "automation-crm",
    title: "Marketing automation & CRM",
    summary:
      "Every lead gets an instant reply and a follow-up journey, so none go cold while your team is busy.",
    points: [
      "WhatsApp, email & SMS automation",
      "CRM setup & lead scoring",
      "Chatbots & instant-reply flows",
      "Nurture & re-engagement journeys",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI & workflow automation",
    summary:
      "Practical AI agents and automations that take repetitive work off your team — measured in hours saved, not demos.",
    points: [
      "AI agents for sales & support",
      "Process automation & integrations",
      "Internal tools & dashboards",
      "AI adoption coaching",
    ],
  },
  {
    slug: "creative",
    title: "Brand, creative & AI video",
    summary:
      "A brand people remember and a steady stream of content — with AI video production that keeps pace with your channels.",
    points: [
      "Brand identity & creative direction",
      "AI-powered video, reels & ads",
      "Motion graphics & explainers",
      "Social content systems",
    ],
  },
  {
    slug: "analytics",
    title: "Analytics & data",
    summary:
      "Tracking you can trust and dashboards that show what is working, so decisions are made on numbers.",
    points: [
      "Tracking & measurement",
      "Live dashboards",
      "Reporting",
      "Experimentation & A/B testing",
    ],
  },
  {
    slug: "technology",
    title: "Technology & software",
    summary:
      "Custom software, integrations and cloud support from a team that builds real products — including Getmax Healthcare.",
    points: [
      "Custom software & integrations",
      "Cloud, IT consulting & support",
      "Healthcare software via Getmax Healthcare",
      "Security & compliance readiness",
    ],
  },
];

export const PILLARS = [
  {
    title: "One full-funnel team",
    body: "Strategy, creative, engineering and media under one roof. No hand-offs between five vendors, and no one to blame but us.",
  },
  {
    title: "Real software builders",
    body: "We build and run our own software products, so we are not just an agency. When you need something custom, we can build it.",
  },
  {
    title: "AI-native workflows",
    body: "Automation, AI video and AI search are built into how we work — which means faster delivery and more output for the same budget.",
  },
  {
    title: "Pipeline accountability",
    body: "We report on leads, booked appointments and revenue — not impressions and likes. If it doesn't move pipeline, we change it.",
  },
];

export const SECTORS = [
  "Healthcare",
  "Education",
  "Real estate",
  "E-commerce",
  "Financial services",
  "Hospitality",
  "B2B & SaaS",
];

// What the free Growth Audit covers. Confirm scope and turnaround before running ads.
export const AUDIT = {
  title: "Free Growth Audit",
  promise: "See exactly where your digital is leaking leads — and what to fix first.",
  covers: [
    "Website speed, clarity and conversion",
    "Google, Maps and AI-search visibility",
    "Ads and tracking set-up",
    "Lead response and follow-up",
  ],
  delivers: "A prioritised fix list you can act on, whether or not you work with us.",
};

export const PRIMARY_NAV: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    label: "Sectors",
    href: "/#sectors",
    children: SECTORS.map((s) => ({ label: s, href: "/#sectors" })),
  },
  { label: "Why Getmax", href: "/#why" },
  { label: "Approach", href: "/#approach" },
];

export const SECONDARY_NAV: NavLink[] = [
  { label: "Free audit", href: "/audit" },
  { label: "Careers", href: `mailto:${SITE.email}?subject=Careers` },
  { label: "Contact", href: "/#contact" },
];

export const LEGAL_NAV: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export const APPROACH = [
  {
    step: "01",
    title: "Audit",
    body: "We start with your numbers: where leads come from, where they leak, and what competitors are doing.",
  },
  {
    step: "02",
    title: "Plan",
    body: "One roadmap across website, channels and automation, with the targets we'll be held to.",
  },
  {
    step: "03",
    title: "Build & launch",
    body: "Website, tracking, campaigns and automations shipped in short sprints. You see progress weekly.",
  },
  {
    step: "04",
    title: "Run & improve",
    body: "We run it, report on pipeline, and keep moving budget and effort to what's working.",
  },
];

export function whatsappLink(text: string) {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
