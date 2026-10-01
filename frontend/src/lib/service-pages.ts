// Long-form copy for the /services/[slug] pages. Keyed by SERVICES slug in site.ts.
// No invented results or numbers — add real proof points here as they come in.

export type ServicePage = {
  /** Hero paragraph under the title */
  intro: string;
  /** Three short highlights shown in the band under the hero */
  highlights: { title: string; body: string }[];
  /** "What's included" — each item expands a point from SERVICES */
  included: { title: string; body: string }[];
  /** Who this is a good fit for */
  fits: string[];
  faqs: { q: string; a: string }[];
  /** SEO: meta description (≤160 chars) */
  metaDescription: string;
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  strategy: {
    intro:
      "Clarity before spend. We audit where your growth comes from today, where it leaks, and build one roadmap your whole team can act on.",
    highlights: [
      { title: "Audit-led", body: "Every plan starts from your real numbers, not assumptions." },
      { title: "One roadmap", body: "Website, channels and automation planned together." },
      { title: "Built to execute", body: "We can deliver the plan, not just hand it over." },
    ],
    included: [
      {
        title: "Digital strategy & roadmaps",
        body: "A prioritised 90-day and 12-month plan across website, marketing channels, automation and tools — with owners, budgets and the targets we'll measure.",
      },
      {
        title: "Growth audits & competitor intelligence",
        body: "A clear-eyed review of your funnel, search visibility, ads, reviews and lead follow-up, benchmarked against the competitors your buyers compare you with.",
      },
      {
        title: "Go-to-market & positioning",
        body: "Sharpen who you serve, what you promise and why you win — so every page, ad and sales conversation tells the same story.",
      },
      {
        title: "Marketing operations & team enablement",
        body: "Processes, reporting rhythms and training so your in-house team can run what we build with confidence.",
      },
    ],
    fits: [
      "You're spending on marketing but can't say what's working",
      "You're planning a launch, rebrand or expansion into a new market",
      "Your team is busy but lacks a single, agreed plan",
    ],
    faqs: [
      {
        q: "Do we have to use Getmax to deliver the strategy?",
        a: "No. The roadmap is yours. Many clients ask us to deliver it because we already know the plan, but you're free to use your own team or partners.",
      },
      {
        q: "What do you need from us to start?",
        a: "Access to your website analytics and ad accounts (read-only is fine), a short workshop with key people, and any sales or lead data you can share.",
      },
      {
        q: "How is this different from the Free Growth Audit?",
        a: "The free audit is a fast, high-level fix list. A strategy engagement goes deeper into your market, numbers and team to produce a full roadmap.",
      },
    ],
    metaDescription:
      "Digital strategy, growth audits, positioning and marketing operations from Getmax Solutions — one roadmap your team can act on.",
  },

  websites: {
    intro:
      "Fast, search-ready websites and web apps designed to turn visitors into enquiries — built by the same team that runs your marketing.",
    highlights: [
      { title: "Conversion-first", body: "Every page designed around the action you want visitors to take." },
      { title: "Search-ready", body: "Technical SEO, speed and structure built in from day one." },
      { title: "Yours to run", body: "Easy-to-edit CMS and handover, with support when you need it." },
    ],
    included: [
      {
        title: "Website design & development",
        body: "Modern, responsive websites built for speed and clarity — from a sharp five-page site to a large content platform.",
      },
      {
        title: "Landing pages & conversion design",
        body: "Campaign landing pages that match your ads, load fast on mobile and make the next step obvious.",
      },
      {
        title: "E-commerce & custom web apps",
        body: "Online stores, booking flows, calculators and custom web applications that fit how your business actually works.",
      },
      {
        title: "Client portals & CMS builds",
        body: "Secure customer portals and content management set-ups your team can update without a developer.",
      },
    ],
    fits: [
      "Your current site is slow, dated or hard to update",
      "Visitors arrive but don't enquire, book or buy",
      "You need something custom that templates can't do",
    ],
    faqs: [
      {
        q: "Can you work with our existing website?",
        a: "Yes. We can improve and extend what you have, or rebuild where that's the faster path. We'll recommend the option that gets results soonest.",
      },
      {
        q: "Will we be able to edit the site ourselves?",
        a: "Yes. We set up a CMS suited to your team and walk you through it, so routine updates don't need a developer.",
      },
      {
        q: "Is SEO included?",
        a: "Technical SEO foundations — speed, structure, metadata and indexing — are built into every site. Ongoing SEO is available as its own service.",
      },
    ],
    metaDescription:
      "Website design and development, landing pages, e-commerce, web apps and client portals — fast, search-ready and built to convert.",
  },

  "performance-marketing": {
    intro:
      "Paid campaigns run against cost per lead and pipeline — not impressions — with budgets moved continuously to what actually converts.",
    highlights: [
      { title: "Pipeline-focused", body: "We optimise for leads and revenue, not vanity metrics." },
      { title: "Full-funnel", body: "Ads, landing pages and follow-up working as one system." },
      { title: "Transparent", body: "Clear reporting on spend, cost per lead and results." },
    ],
    included: [
      {
        title: "Google, Meta & LinkedIn ads",
        body: "Search, social and B2B campaigns planned, built and managed — matched to where your buyers actually spend their time.",
      },
      {
        title: "Funnels & CRO",
        body: "Landing pages, offers and forms tested and refined so more of your paid traffic turns into enquiries.",
      },
      {
        title: "Lead generation programmes",
        body: "Always-on programmes that combine paid media, lead magnets and fast follow-up to deliver a steady flow of qualified leads.",
      },
      {
        title: "Attribution & budget optimisation",
        body: "Tracking that connects spend to leads and sales, so budget moves to the campaigns that pay back.",
      },
    ],
    fits: [
      "You're running ads but can't tie spend to real leads",
      "Cost per lead keeps rising and you don't know why",
      "You want to scale what works without wasting budget",
    ],
    faqs: [
      {
        q: "What budget do we need to start?",
        a: "It depends on your market and goals. We'll recommend a test budget you can afford to learn from, then scale only what proves itself.",
      },
      {
        q: "Who owns the ad accounts?",
        a: "You do. We work inside accounts in your name, so the data and history always stay with your business.",
      },
      {
        q: "How quickly will we see results?",
        a: "Early signals usually arrive within the first weeks of a campaign; reliable performance takes time to learn and optimise. We report honestly throughout.",
      },
    ],
    metaDescription:
      "Google, Meta and LinkedIn ads, funnels, CRO and lead generation managed against cost per lead and pipeline by Getmax Solutions.",
  },

  seo: {
    intro:
      "Be found where your buyers start their search — on Google, on Maps, and inside the AI answers that increasingly replace the results page.",
    highlights: [
      { title: "Search + AI", body: "Optimised for Google and AI assistants (GEO/AEO)." },
      { title: "Local first", body: "Maps and local search for businesses that serve an area." },
      { title: "Content that ranks", body: "Articles built around real buyer questions." },
    ],
    included: [
      {
        title: "Technical & content SEO",
        body: "Site speed, structure, indexing and on-page optimisation, plus content that answers what your buyers are searching for.",
      },
      {
        title: "Local SEO & Google Maps",
        body: "Google Business Profile optimisation, local citations, reviews strategy and location pages to win nearby searches.",
      },
      {
        title: "AI-search optimisation (GEO/AEO)",
        body: "Structure, schema and content designed so AI assistants and answer engines can understand, trust and cite your business.",
      },
      {
        title: "Content strategy & production",
        body: "A steady content engine — topics, briefs and publishing — targeting the questions that lead to enquiries.",
      },
    ],
    fits: [
      "Competitors appear above you on Google or Maps",
      "You rely on paid ads and want a lasting organic channel",
      "You want to show up in AI assistant answers",
    ],
    faqs: [
      {
        q: "What is GEO / AEO?",
        a: "Generative and answer-engine optimisation: making your business easy for AI assistants to understand and recommend, alongside traditional search.",
      },
      {
        q: "How long does SEO take?",
        a: "SEO compounds over months rather than days. Technical fixes can help quickly; content and authority build steadily over time.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No honest provider can. We commit to the work, transparent reporting, and a focus on searches that lead to real enquiries.",
      },
    ],
    metaDescription:
      "Technical SEO, local SEO and Google Maps, AI-search optimisation (GEO/AEO) and content strategy from Getmax Solutions.",
  },

  "automation-crm": {
    intro:
      "Every lead gets an instant reply and a follow-up journey — on WhatsApp, email and SMS — so none go cold while your team is busy.",
    highlights: [
      { title: "Instant replies", body: "Leads hear back in seconds, day or night." },
      { title: "WhatsApp-native", body: "Meet buyers on the channel they actually use." },
      { title: "One view of leads", body: "A CRM that shows every lead and where it stands." },
    ],
    included: [
      {
        title: "WhatsApp, email & SMS automation",
        body: "Automated confirmations, reminders and follow-ups across the channels your customers prefer.",
      },
      {
        title: "CRM setup & lead scoring",
        body: "A CRM configured around your sales process, with scoring that shows your team who to call first.",
      },
      {
        title: "Chatbots & instant-reply flows",
        body: "Website and WhatsApp assistants that answer common questions and capture details around the clock.",
      },
      {
        title: "Nurture & re-engagement journeys",
        body: "Sequences that keep warm leads moving and bring past customers and lapsed enquiries back.",
      },
    ],
    fits: [
      "Leads wait hours or days for a first reply",
      "Follow-up depends on someone remembering",
      "Lead details live in spreadsheets, inboxes and phones",
    ],
    faqs: [
      {
        q: "Which CRM do you work with?",
        a: "We work with popular CRMs and can recommend one that fits your size and budget, or build on the tools you already use.",
      },
      {
        q: "Is WhatsApp automation allowed?",
        a: "Yes, through the official WhatsApp Business Platform and its rules on templates and opt-in. We set it up the compliant way.",
      },
      {
        q: "Will automation feel robotic to customers?",
        a: "Not when it's designed well. We write messages in your voice and hand conversations to a person the moment it matters.",
      },
    ],
    metaDescription:
      "WhatsApp, email and SMS automation, CRM setup, lead scoring, chatbots and nurture journeys so no lead goes cold.",
  },

  "ai-automation": {
    intro:
      "Practical AI agents and workflow automation that take repetitive work off your team — measured in hours saved and faster responses, not demos.",
    highlights: [
      { title: "Practical AI", body: "Focused on real tasks your team does every day." },
      { title: "Integrated", body: "Connected to the tools and data you already use." },
      { title: "Human in the loop", body: "Your team stays in control of what matters." },
    ],
    included: [
      {
        title: "AI agents for sales & support",
        body: "Assistants that qualify leads, answer questions, book appointments and draft replies — with clear hand-offs to your team.",
      },
      {
        title: "Process automation & integrations",
        body: "Connect your systems so data moves automatically and repetitive admin disappears.",
      },
      {
        title: "Internal tools & dashboards",
        body: "Simple tools and live dashboards built around how your team actually works.",
      },
      {
        title: "AI adoption coaching",
        body: "Hands-on training so your people use AI safely and effectively in their day-to-day work.",
      },
    ],
    fits: [
      "Your team spends hours on copy-paste admin",
      "Customers wait too long for answers",
      "You want to use AI but don't know where to start safely",
    ],
    faqs: [
      {
        q: "Is our data safe with AI tools?",
        a: "We design with data protection in mind — choosing appropriate providers, limiting what data is shared, and keeping sensitive steps under human review.",
      },
      {
        q: "Will AI replace our staff?",
        a: "Our focus is removing repetitive work so your people can spend time on customers and higher-value tasks.",
      },
      {
        q: "Where should we start?",
        a: "Usually with one high-volume, repetitive task. We prove value there, then expand.",
      },
    ],
    metaDescription:
      "AI agents for sales and support, process automation, integrations, internal tools and AI adoption coaching from Getmax Solutions.",
  },

  creative: {
    intro:
      "A brand people remember and a steady stream of content — with AI-powered video production that keeps pace with every channel you run.",
    highlights: [
      { title: "On-brand", body: "One consistent look and voice across every channel." },
      { title: "AI video", body: "Reels, ads and explainers produced faster." },
      { title: "Always-on", body: "Content systems, not one-off posts." },
    ],
    included: [
      {
        title: "Brand identity & creative direction",
        body: "Logo, visual identity, tone of voice and guidelines that make your business instantly recognisable.",
      },
      {
        title: "AI-powered video, reels & ads",
        body: "Short-form video and ad creative produced with AI-assisted workflows, so you can test more ideas for the same budget.",
      },
      {
        title: "Motion graphics & explainers",
        body: "Clear, engaging animations that explain your service or product in seconds.",
      },
      {
        title: "Social content systems",
        body: "Content calendars, templates and production rhythms that keep your channels active without the scramble.",
      },
    ],
    fits: [
      "Your brand looks different on every channel",
      "You need more video but production feels slow and costly",
      "Social posting is irregular or last-minute",
    ],
    faqs: [
      {
        q: "Do you use AI for all creative?",
        a: "We use AI where it speeds things up and keeps quality high, and human direction throughout. Final creative is always reviewed by our team.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Yes. We can work within your current guidelines or help refresh them.",
      },
      {
        q: "Do you create content in regional languages?",
        a: "Yes — we can plan and produce content for multiple languages and audiences.",
      },
    ],
    metaDescription:
      "Brand identity, creative direction, AI-powered video and reels, motion graphics and social content systems from Getmax Solutions.",
  },

  analytics: {
    intro:
      "Tracking you can trust and dashboards that show what's working — so decisions are made on numbers everyone believes.",
    highlights: [
      { title: "Trusted data", body: "Tracking set up correctly, end to end." },
      { title: "Live dashboards", body: "The numbers that matter, always up to date." },
      { title: "Test & learn", body: "Experiments that turn opinions into evidence." },
    ],
    included: [
      {
        title: "Tracking & measurement",
        body: "Analytics, conversion tracking and tag management set up and verified across your website, ads and CRM.",
      },
      {
        title: "Live dashboards",
        body: "Clear dashboards that bring marketing, sales and operations data together in one place.",
      },
      {
        title: "Reporting",
        body: "Regular reporting that explains what happened, why, and what we'll do next — in plain language.",
      },
      {
        title: "Experimentation & A/B testing",
        body: "Structured tests on pages, offers and messages so improvements are proven, not guessed.",
      },
    ],
    fits: [
      "Different tools show different numbers",
      "Reports take hours to assemble each month",
      "You want to know which channels really drive revenue",
    ],
    faqs: [
      {
        q: "Which analytics tools do you use?",
        a: "We work with standard platforms such as Google Analytics 4 and Tag Manager, plus the ad platforms and CRM you already use.",
      },
      {
        q: "Can you fix our existing tracking?",
        a: "Yes. We audit what's in place, fix gaps and duplicates, and document how it all works.",
      },
      {
        q: "Do we need a data team to use the dashboards?",
        a: "No. Dashboards are designed for business owners and managers, with training included.",
      },
    ],
    metaDescription:
      "Tracking and measurement, live dashboards, reporting and A/B testing from Getmax Solutions — decisions made on numbers you can trust.",
  },

  technology: {
    intro:
      "Custom software, integrations and cloud support from a team that builds and runs real products — including the Getmax Healthcare platform.",
    highlights: [
      { title: "Product builders", body: "We build and run our own software, not just websites." },
      { title: "Integrated", body: "Systems connected so data flows where it's needed." },
      { title: "Supported", body: "Cloud, IT and ongoing support after launch." },
    ],
    included: [
      {
        title: "Custom software & integrations",
        body: "Software built around your processes, and integrations that connect the tools you already rely on.",
      },
      {
        title: "Cloud, IT consulting & support",
        body: "Cloud set-up, hosting, IT advice and support so your systems stay fast, secure and available.",
      },
      {
        title: "Healthcare software via Getmax Healthcare",
        body: "EHR, practice management and billing software for clinics and hospitals through our healthcare vertical.",
      },
      {
        title: "Security & compliance readiness",
        body: "Practical security improvements and documentation to help you prepare for compliance requirements.",
      },
    ],
    fits: [
      "Off-the-shelf software doesn't fit how you work",
      "Your tools don't talk to each other",
      "You're a healthcare provider looking for practice software",
    ],
    faqs: [
      {
        q: "Do you build software from scratch?",
        a: "Yes, when that's the right call. We also extend and integrate existing tools where that's faster and more cost-effective.",
      },
      {
        q: "What is Getmax Healthcare?",
        a: "Our healthcare vertical, offering clinical and practice software including EHR, practice management and billing.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. We offer ongoing support and maintenance so your systems keep running smoothly.",
      },
    ],
    metaDescription:
      "Custom software, integrations, cloud and IT support, security readiness and healthcare software via Getmax Healthcare.",
  },
};
