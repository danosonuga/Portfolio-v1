export interface Project {
  slug: string;
  name: string;
  title: string;
  description: string;
  role: string;
  impact: string;
  category: string;
  preview: string;
  icon: string;
  liveUrl?: string;
  confidential?: boolean;
}

export interface CaseStudyTheme {
  bg: string;
  bgAlt: string;
  heroBg?: string;
  fg: string;
  fgMuted: string;
  fgSubtle: string;
  border: string;
  surface: string;
  accent: string;
}

export interface CaseStudySection {
  type:
    | "narrative"
    | "image"
    | "metric"
    | "quote"
    | "insight"
    | "grid"
    | "image-pair";
  heading?: string;
  title?: string;
  content?: string;
  contentAfter?: string;
  bullets?: string[];
  callout?: string;
  calloutLabel?: string;
  callouts?: { label: string; text: string }[];
  metricRows?: { intro?: string; metrics: { label: string; value: string }[] }[];
  numberedItems?: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
  value?: string;
  label?: string;
  items?: { label: string; value: string }[];
  images?: { src: string; alt: string; caption?: string }[];
}

export interface CaseStudyMeta {
  label: string;
  value: string;
}

export interface CaseStudy extends Project {
  heroImage: string;
  heroVideo?: string;
  heroDescription?: string;
  meta?: CaseStudyMeta[];
  sections: CaseStudySection[];
  closingNote?: string;
  theme?: CaseStudyTheme;
}

export const projects: Project[] = [
  {
    slug: "daash",
    name: "Daash",
    title: "Making restaurant operations feel simple.",
    description:
      "A platform that helps restaurants manage orders, inventory, and operations across multiple channels.",
    role: "Product Designer",
    impact: "₦8.8B+ in order value · 800+ businesses · 50,000 customers",
    category: "Hospitality · Operations",
    preview: "/Daash image preview.png",
    icon: "/Daash app icon.png",
    liveUrl: "https://daashapp.co/",
  },
  {
    slug: "cold-stone",
    name: "Cold Stone",
    title: "Bringing the Cold Stone experience to the screen.",
    description:
      "Translating Cold Stone’s in-store experience into a digital ordering journey across Nigeria and Kenya.",
    role: "Product Designer",
    impact: "₦150M+ in transactions",
    category: "Commerce · F&B",
    preview: "/Coldstone image preview.png",
    icon: "/Coldstone app icon.png",
    liveUrl: "https://coldstonecreamery.ng/?dining-mode=delivery",
  },
  {
    slug: "remita",
    name: "Remita",
    title: "Redesigning a product that couldn’t simply start over.",
    description:
      "Contributing to the evolution of a payment ecosystem serving merchants, agencies, corporates and developers.",
    role: "Product Designer",
    impact: "Part of a product that processed ₦100T+ in transactions",
    category: "Fintech · Payments",
    preview: "/Remita image preview.png",
    icon: "/Remita app icon.png",
    liveUrl: "https://www.remita.net/",
    confidential: true,
  },
  {
    slug: "gosource",
    name: "GoSource",
    title: "Designing the system behind the orders.",
    description:
      "Building the internal tools for procurement, inventory, and operations that power the marketplace.",
    role: "Product Designer",
    impact: "~5,000 orders · ₦500M+ revenue in the last year",
    category: "Logistics · Operations",
    preview: "/GoSource image preview.png",
    icon: "/GoSource app icon.png",
    liveUrl: "https://gosource.app/",
    confidential: true,
  },
];

export const caseStudies: Record<string, CaseStudy> = {
  daash: {
    ...projects[0],
    heroImage: "/Daash image preview.png",
    heroVideo: "/Daash preview new.mov",
    heroDescription:
      "Daash is an operations platform built to help restaurants manage their business in one place. It brings together workflows such as: **Sales · POS · Orders · Inventory · Online Store · Customers · Reports**. I joined when Daash was still being shaped, and I was the sole Product Designer responsible for the product experience.",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Team", value: "CTO + 2 Engineers + PM" },
      { label: "Timeline", value: "2024 - 2025" },
      { label: "Industry", value: "B2B, B2C, SaaS, Hospitality" },
      { label: "My involvement", value: "Research, UX, Interaction design, QA" },
    ],
    theme: {
      bg: "#030A11",
      bgAlt: "#0F1729",
      heroBg: "#081A2B",
      fg: "#E8ECF4",
      fgMuted: "#A7B3BE",
      fgSubtle: "#A7B3BE",
      border: "#1C2840",
      surface: "#111D33",
      accent: "#3B9EFF",
    },
    sections: [
      {
        type: "narrative",
        heading: "The problem",
        title: "Restaurant operations\nwere fragmented.",
        content:
          "Restaurants often had different tools for different parts of their business.",
        bullets: [
          "One system handled sales.",
          "Another handled inventory.",
          "Another handled online orders.",
          "Another handled delivery.",
        ],
        contentAfter:
          "The result was a lot of disconnected processes and data. Daash was being built to bring these workflows together.\n\nBut that created another challenge:",
        callout:
          "How do we bring all this complexity into one product without making the product itself complicated?",
      },
      {
        type: "narrative",
        heading: "What I did",
        title: "Understanding the people\nbehind the operations",
        content:
          "Before designing the product, I needed to understand how restaurants actually operated.\n\nI visited restaurants and spoke with:",
        bullets: [
          "Business/restaurant managers",
          "Store managers",
          "Inventory staff",
          "POS attendants",
        ],
        contentAfter:
          "I wanted to understand their daily workflows, where things became difficult, and what they needed from a system like Daash.\n\nI also looked at existing products and patterns, particularly for online ordering and POS.",
        calloutLabel: "One thing became clear:",
        callout:
          "Restaurant operations are complex. The product shouldn’t make them feel more complex.",
      },
      {
        type: "narrative",
        heading: "The approach",
        title: "Designing the system, not\njust the screens",
        content:
          "One of the biggest things I had to understand was how the different parts of Daash connected.\n\nFor example:\n\n**Customer orders → Sale → Inventory → Revenue → Reports**",
        bullets: [
          "An order from the online store could affect inventory.",
          "A POS sale could affect inventory and reporting.",
          "A product could appear in both the POS and online store.",
        ],
        contentAfter:
          "So I wasn’t designing completely separate features.\n\nI was designing one connected system with different workflows.",
      },
      {
        type: "image",
        image: "/daash orders page.png",
        imageAlt: "Daash orders page",
        caption: "Image of the orders page",
      },
      {
        type: "image",
        image: "/daash inventory page.png",
        imageAlt: "Daash inventory page",
        caption: "Image of the inventory page",
      },
      {
        type: "image",
        image: "/daash menu page.png",
        imageAlt: "Daash menu page",
        caption: "Image of the menu page",
      },
      {
        type: "image",
        image: "/daash pos hold page.png",
        imageAlt: "Daash POS page",
        caption: "Image of the pos page",
      },
      {
        type: "image",
        image: "/daash online store page.png",
        imageAlt: "Papasgrill online store powered by Daash",
        caption: "Image of a live online store from Papa’s grill",
      },
      {
        type: "narrative",
        heading: "Keeping the experience simple",
        title:
          "The complexity underneath Daash\nshouldn’t become the user’s problem.",
        content: "So across the product, I focused on things like:",
        items: [
          {
            label: "Familiar workflows",
            value: "Use patterns people already understand.",
          },
          {
            label: "Fewer unnecessary steps",
            value: "Make frequent tasks quick to complete.",
          },
          {
            label: "Clear relationships",
            value: "Help users understand how things connect.",
          },
          {
            label: "Progressive complexity",
            value:
              "Don’t expose everything at once when the user doesn’t need it.",
          },
        ],
        contentAfter:
          "This thinking influenced everything from the POS experience to inventory and the online store.",
      },
      {
        type: "image",
        image: "/daash item details page.png",
        imageAlt: "Daash menu item details",
      },
      {
        type: "image",
        image: "/daash order details page.png",
        imageAlt: "Daash order details",
      },
      {
        type: "image",
        image: "/daash edit discount page.png",
        imageAlt: "Daash edit discount",
      },
      {
        type: "narrative",
        heading: "One example",
        title: "POS",
        content:
          "The POS requirement initially sounded simple:\n\n**Create an order → Take payment → Produce a receipt**\n\nBut research showed that the real workflow was more complicated. Attendants perform these actions repeatedly throughout the day, so I focused on making common actions fast.\n\nFor example, instead of requiring attendants to search for every product, commonly sold products were immediately visible.\n\nI also introduced Hold Order for situations where a transaction couldn’t be completed immediately.",
      },
      {
        type: "image",
        image: "/daash pos hold card more action.png",
        imageAlt: "Daash POS hold order feature",
      },
      {
        type: "narrative",
        title: "Working within constraints",
        content:
          "We had roughly three months to get the MVP out, so we couldn't build everything we might eventually want.\n\nThe online store was a good example.\n\nWe considered a flexible no-code builder, but that would have required significant engineering effort.\n\nInstead, we chose a **template-based approach** that still allowed businesses to apply their branding while being much faster to build.",
        callouts: [
          {
            label: "The decision wasn't:",
            text: '"Which solution is perfect?"',
          },
          {
            label: "It was:",
            text: '"Which solution gives the customer enough value while allowing us to ship?"',
          },
        ],
      },
      {
        type: "image",
        image: "/daash template selection page.png",
        imageAlt: "Daash template selection page",
      },
      {
        type: "narrative",
        heading: "The outcome",
        title: "Shipping and the result",
        content:
          "We launched the MVP to real businesses.\n\nThat changed the way we worked.\n\nInstead of relying only on assumptions and internal reviews, we could see how businesses actually used the product.",
        contentAfter:
          "Daash went from an early product concept to a working MVP in roughly three months.\n\nWithin the first month of Daash beta, it did:",
        metricRows: [
          {
            metrics: [
              { label: "Total order value", value: "₦72M+" },
              { label: "Successful order processed", value: "11K+" },
              { label: "Active users (Business + Customers)", value: "5k+" },
            ],
          },
          {
            intro: "Over time, the product grew to:",
            metrics: [
              { label: "Total order value", value: "₦8B+" },
              { label: "Businesses", value: "800+" },
              { label: "Customers", value: "50k+" },
            ],
          },
        ],
      },
      {
        type: "narrative",
        title: "What I learned",
        numberedItems: [
          "Understand the operation before designing the interface.",
          "Complex systems don’t have to create complex experiences.",
          "Engineering constraints are part of product design.",
          "Shipping is part of the design process.",
          "Real users will always reveal things you couldn’t predict.",
        ],
        contentAfter:
          "If I were building Daash again, I’d simplify some of the workflows even further and remove unnecessary steps.",
        calloutLabel: "My biggest takeaway:",
        callout:
          "The interesting part wasn’t hiding complexity. It was understanding it well enough to know what the user never needed to see",
      },
      {
        type: "narrative",
        heading: "Credits",
        title: "Shoutout to the amazing team",
        items: [
          { label: "Essien Ekam", value: "CTO" },
          { label: "Anyikamdu Christain", value: "Frontend Engineer" },
          { label: "Temitope Agboola", value: "Software Engineer" },
          { label: "Ayomide Daniel", value: "Product Manager (MVP)" },
        ],
      },
    ],
  },
  "cold-stone": {
    ...projects[1],
    heroImage: "/Coldstone image preview.png",
    sections: [
      {
        type: "narrative",
        heading: "The context",
        content:
          "Cold Stone already had a physical experience people knew. The challenge was translating that experience into a digital ordering journey — not just building an ordering app, but capturing what makes Cold Stone feel like Cold Stone.",
      },
      {
        type: "image",
        image: "/Coldstone image preview.png",
        imageAlt: "Cold Stone ordering experience",
        caption:
          "The digital ordering experience — designed to feel as inviting as the store.",
      },
      {
        type: "insight",
        heading: "The constraint",
        content:
          "Approximately two days to design and build, with a management demo on the third day.",
      },
      {
        type: "narrative",
        heading: "Research through observation",
        content:
          "Brand guidelines were requested but unavailable. Instead of waiting, I visited a Cold Stone store. I observed customers, studied the physical environment, the product presentation, and Cold Stone’s social presence. The goal wasn’t to copy the brand — it was to understand the experience behind it.",
      },
      {
        type: "insight",
        heading: "Design principle",
        content:
          "Don’t just copy the brand. Understand the experience behind it.",
      },
      {
        type: "narrative",
        heading: "Outcome",
        content:
          "The design direction was accepted without major changes and became the foundation for the production experience. It launched in Nigeria and Kenya, generating ₦150M+ in transactions.",
      },
      {
        type: "metric",
        value: "₦150M+",
        label: "In transactions across Nigeria and Kenya",
      },
    ],
  },
  remita: {
    ...projects[2],
    heroImage: "/Remita image preview.png",
    sections: [
      {
        type: "narrative",
        heading: "The ecosystem",
        content:
          "Remita is an ecosystem rather than one product. It serves merchants, agencies, corporate organisations, and developers. The product had been evolving for almost two decades — it could not simply be discarded and rebuilt from scratch.",
      },
      {
        type: "image",
        image: "/Remita image preview.png",
        imageAlt: "Remita product interface",
        caption:
          "Part of the Remita ecosystem — balancing evolution with consistency.",
      },
      {
        type: "grid",
        heading: "My contributions",
        items: [
          {
            label: "Merchant experience",
            value: "Redesigning payment flows and dashboards",
          },
          {
            label: "Agency portal",
            value: "Tools for agents processing transactions",
          },
          {
            label: "Corporate experience",
            value: "Enterprise payment and reporting",
          },
          {
            label: "Design systems",
            value: "Building shared component libraries",
          },
        ],
      },
      {
        type: "image",
        image: "/Remita slide - 1.png",
        imageAlt: "Remita design system",
      },
      {
        type: "insight",
        heading: "Core insight",
        content:
          "Good design doesn’t always mean getting to start from scratch.",
      },
      {
        type: "narrative",
        heading: "Working within constraints",
        content:
          "I contributed across merchant, agency, and corporate products — along with design systems, illustrations, and stakeholder collaboration. The work was about making meaningful improvements within the reality of a large, established system.",
      },
      {
        type: "image",
        image: "/Remita slide - 2.png",
        imageAlt: "Remita corporate interface",
      },
      {
        type: "narrative",
        heading: "Impact",
        content:
          "Remita went on to process more than ₦100 trillion in payment transactions — a testament to the product and the broader team’s efforts over many years.",
      },
      {
        type: "metric",
        value: "₦100T+",
        label: "In total payment transactions processed",
      },
    ],
  },
  gosource: {
    ...projects[3],
    heroImage: "/GoSource image preview.png",
    sections: [
      {
        type: "narrative",
        heading: "Behind the orders",
        content:
          "Customers could already place orders. The problem was everything happening behind those orders. Procurement, inventory, operations and customer relations lacked the tools and information needed to operate effectively.",
      },
      {
        type: "image",
        image: "/GoSource image preview.png",
        imageAlt: "GoSource marketplace",
        caption:
          "The customer-facing marketplace — but the real work was behind the scenes.",
      },
      {
        type: "insight",
        heading: "Key insight",
        content:
          "The marketplace existed, but the system behind it wasn’t keeping up.",
      },
      {
        type: "grid",
        heading: "Teams I worked with",
        items: [
          {
            label: "Procurement",
            value: "Streamlining supplier and order management",
          },
          {
            label: "Inventory",
            value: "Real-time stock visibility and control",
          },
          {
            label: "Customer relations",
            value: "Tools for support and communication",
          },
          {
            label: "Administration",
            value: "Reporting and operational oversight",
          },
        ],
      },
      {
        type: "narrative",
        heading: "Outcome",
        content:
          "The platform supported approximately 5,000 orders and more than ₦500M in revenue over the last year. Internal teams reported positive feedback on the operational improvements.",
      },
      {
        type: "metric",
        value: "₦500M+",
        label: "In revenue over the last year",
      },
      {
        type: "quote",
        content:
          "The admin system is confidential — only approved, sanitized visuals are shown here.",
      },
    ],
  },
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
