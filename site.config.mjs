export const site = {
  name: "NPO Grant Writing",
  legalName: "NPO Services LLC",
  tagline: "Human Directed Grant Growth, Powered by GGS™",
  url: "https://www.npograntwriting.com",
  email: "info@npograntwriting.com",
  phoneDisplay: "267-757-9227",
  phoneHref: "+12677579227",
  address: {
    street: "333 N Broad St",
    city: "Doylestown",
    region: "PA",
    postalCode: "18901"
  },
  registration: {
    label: "Pennsylvania Professional Fundraising Counsel",
    certificate: "124193",
    issued: "May 21, 2026",
    expires: "May 20, 2027"
  },
  calendly: "https://calendly.com/npograntwriting/informational-meeting",
  formAction: "https://formsubmit.co/info@npograntwriting.com",
  formAjaxAction: "https://formsubmit.co/ajax/info@npograntwriting.com",
  socialImage: "/images/npo-social-card.png",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Grant Growth System", href: "/grant-growth-system.html" },
    { label: "Meet the Team", href: "/about.html" },
    { label: "Contact", href: "/contact.html" }
  ],
  ggsStages: [
    { number: "01", title: "Institutional Intelligence", id: "institutional-intelligence", summary: "Understand the organization before increasing production." },
    { number: "02", title: "Source Control", id: "source-control", summary: "Organize verified facts, narratives, documents, and conflicts." },
    { number: "03", title: "Opportunity Discovery", id: "opportunity-discovery", summary: "Find credible routes across current and historical sources." },
    { number: "04", title: "Qualification and Scoring", id: "qualification-scoring", summary: "Test eligibility, fit, access, burden, and readiness." },
    { number: "05", title: "Controlled Production and Submission", id: "controlled-production", summary: "Build tailored requests with human review and release authority." },
    { number: "06", title: "Portfolio Management", id: "portfolio-management", summary: "Preserve evidence, decisions, reports, renewals, and results." }
  ],
  services: [
    {
      label: "Build",
      name: "GGS Foundation Build",
      description: "For organizations that need reliable institutional knowledge, source control, reusable materials, and workflow design.",
      ctaLabel: "Discuss a foundation build",
      featured: false
    },
    {
      label: "Manage",
      name: "GGS Managed Portfolio",
      description: "Ongoing discovery, qualification, production, submission coordination, evidence preservation, and renewal planning.",
      ctaLabel: "Discuss a managed portfolio",
      featured: true
    },
    {
      label: "Advance",
      name: "Strategic Grant Projects",
      description: "Focused support for major foundations, capital projects, government opportunities, and other complex requests.",
      ctaLabel: "Discuss a strategic project",
      featured: false
    }
  ],
  clients: [
    { name: "Elwyn", file: "/images/clients/elwyn.png", width: 287, height: 94, tone: "light" },
    { name: "Emmaus Home", file: "/images/clients/emmaus-home.png", width: 600, height: 103, tone: "light" },
    { name: "Bloom", file: "/images/clients/bloom.png", width: 600, height: 222, tone: "dark" }
  ],
  faq: [
    {
      question: "What is the Grant Growth System?",
      answer: "It is NPO Grant Writing’s proprietary, human directed operating system for building and managing a larger, more disciplined institutional funding portfolio."
    },
    {
      question: "Is GGS an AI grant writing tool?",
      answer: "No. Technology supports research, organization, drafting, validation, and tracking. Human judgment controls facts, relationships, budgets, commitments, approval, and submission authority."
    },
    {
      question: "Does GGS automatically submit applications?",
      answer: "No. Every external submission requires authorized human approval. GGS does not bypass certifications, account controls, or final release authority."
    },
    {
      question: "Does NPO guarantee grant funding?",
      answer: "No. Grant decisions are made solely by funders. NPO does not guarantee awards or charge fees based on a percentage of funding secured."
    },
    {
      question: "Does GGS replace an internal Advancement team?",
      answer: "No. It is designed to support existing leadership and staff with research, structure, production capacity, and a clearer portfolio view."
    },
    {
      question: "How does an engagement begin?",
      answer: "A Grant Growth Review looks at current materials, pipeline, priorities, internal capacity, and the most practical starting point."
    }
  ],
  knowsAbout: [
    "Nonprofit grant writing",
    "Grant prospect research",
    "Grant qualification and scoring",
    "Grant portfolio management",
    "Foundation and corporate funding",
    "Government grants",
    "Human services and disability services funding"
  ]
};

export const pageMetadata = {
  "/": {
    title: "Nonprofit Grant Growth Strategy | NPO Grant Writing",
    description: "Build a disciplined nonprofit grant pipeline with human directed research, source control, grant writing, submission management, and portfolio measurement.",
    canonical: "/",
    active: "Home",
    ogType: "website"
  },
  "/grant-growth-system.html": {
    title: "Grant Growth System™ for Nonprofits | NPO Grant Writing",
    description: "See how the human directed Grant Growth System combines institutional intelligence, source control, opportunity qualification, production, and portfolio management.",
    canonical: "/grant-growth-system.html",
    active: "Grant Growth System",
    ogType: "website",
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Grant Growth System", item: "/grant-growth-system.html" }]
  },
  "/about.html": {
    title: "Meet the Team: Brendan Bradley and Heidi Roux | NPO Grant Writing",
    description: "Meet Brendan Bradley and Heidi Roux, the team behind NPO Grant Writing's human directed approach to grant strategy, grant writing, and portfolio growth.",
    canonical: "/about.html",
    active: "Meet the Team",
    ogType: "website",
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Meet the Team", item: "/about.html" }]
  },
  "/contact.html": {
    title: "Schedule a Grant Growth Review | NPO Grant Writing",
    description: "Talk with NPO Grant Writing about your nonprofit's grant readiness, pipeline, funding priorities, and potential fit for the Grant Growth System.",
    canonical: "/contact.html",
    active: "Contact",
    ogType: "website",
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Contact", item: "/contact.html" }]
  },
  "/privacy.html": {
    title: "Privacy | NPO Grant Writing",
    description: "Learn how NPO Grant Writing handles information submitted through its website, contact form, scheduling link, and hosting services.",
    canonical: "/privacy.html",
    active: "",
    ogType: "website",
    noindex: true
  },
  "/thankyou.html": {
    title: "Thank You | NPO Grant Writing",
    description: "Your Grant Growth Review inquiry has been received.",
    canonical: "/thankyou.html",
    active: "Contact",
    ogType: "website",
    noindex: true
  },
  "/404.html": {
    title: "Page Not Found | NPO Grant Writing",
    description: "The page you requested could not be found.",
    canonical: "",
    active: "",
    ogType: "website",
    noindex: true
  }
};
