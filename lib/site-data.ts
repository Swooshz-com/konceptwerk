export const site = {
  name: "Koncept Werk",
  legalName: "FJ & Joseph Pte Ltd",
  url: "https://konceptwerk.com",
  email: "info@fjnjoseph.com",
  phone: "68177477",
  phoneDisplay: "6817 7477",
  address: "61 Kaki Bukit Avenue 1, 02-26, Shuli Industrial Park, Singapore 417943",
  hours: ["Monday - Friday, 09:00 am - 09:00 pm", "Saturday - Sunday, closed"],
} as const;

export const navigation = [
  { label: "About us", href: "/studio" },
  { label: "Our Services", href: "/services" },
  { label: "Career", href: "/studio#career" },
  { label: "Blog", href: "/journal" },
  { label: "Contact Us", href: "/contact" },
] as const;

export type ProjectCategory = "Residential" | "Commercial" | "Exhibition";
export type ImageAspect = "wide" | "landscape" | "portrait" | "square";

export type ProjectImage = {
  src: string;
  alt: string;
  aspect: ImageAspect;
  position?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  scope: string;
  summary: string;
  narrative: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "residential-interiors",
    title: "Residential interiors",
    category: "Residential",
    scope: "Interior design & construction",
    summary: "Homes shaped through bespoke design, space planning, renovation and custom carpentry.",
    narrative: [
      "Koncept Werk approaches the home as a relationship between beauty, practicality and the people who live there. Planning begins with how each room needs to work, then brings layout, visualisation, material choices and construction into one process.",
      "Across each space, planning, visualisation, material decisions and construction are developed as one connected process.",
    ],
    cover: {
      src: "/images/projects/residential/residential-hero.webp",
      alt: "Warm open-plan residential interior with timber cabinetry and a dining area",
      aspect: "wide",
    },
    gallery: [
      {
        src: "/images/projects/residential/kitchen-warm.webp",
        alt: "Warm-toned kitchen with integrated cabinetry and stone surfaces",
        aspect: "portrait",
      },
      {
        src: "/images/projects/residential/living-arifin.webp",
        alt: "Light-filled living room with built-in media storage",
        aspect: "landscape",
      },
      {
        src: "/images/projects/residential/living-light.webp",
        alt: "Residential living space with pale timber storage and a soft green sofa",
        aspect: "landscape",
      },
      {
        src: "/images/projects/residential/bedroom-joinery.webp",
        alt: "Bedroom with full-height custom wardrobe joinery",
        aspect: "portrait",
      },
      {
        src: "/images/projects/residential/open-kitchen.webp",
        alt: "Open kitchen with a long island and integrated storage",
        aspect: "wide",
      },
    ],
  },
  {
    slug: "space-saving-living",
    title: "Space-saving living",
    category: "Residential",
    scope: "Space planning & custom furniture",
    summary: "Space-saving planning and tailored furniture designed around comfort and efficiency.",
    narrative: [
      "Making more of a compact home does not mean giving up comfort. Koncept Werk uses space planning, visualisation and custom furniture to give each element more than one clear purpose.",
      "Integrated storage, adaptable beds and carefully planned circulation help the room feel composed whether it is open, in use or reset for the day.",
    ],
    cover: {
      src: "/images/projects/space-saving/bed-closed.webp",
      alt: "Custom wall bed integrated into a full-height storage system",
      aspect: "landscape",
    },
    gallery: [
      {
        src: "/images/projects/space-saving/bed-open.webp",
        alt: "Integrated wall bed shown open within built-in storage",
        aspect: "landscape",
      },
      {
        src: "/images/projects/space-saving/integrated-bed.webp",
        alt: "Compact bedroom with a bed fitted between tall cabinets",
        aspect: "portrait",
      },
      {
        src: "/images/projects/space-saving/space-saving-bedroom.webp",
        alt: "Bedroom with integrated desk, storage and a space-saving bed",
        aspect: "landscape",
      },
      {
        src: "/images/projects/space-saving/compact-bedroom.webp",
        alt: "Compact bedroom arranged with integrated storage",
        aspect: "landscape",
      },
      {
        src: "/images/projects/space-saving/compact-living.webp",
        alt: "Compact studio living area with open shelving and a kitchen wall",
        aspect: "wide",
      },
    ],
  },
  {
    slug: "commercial-interiors",
    title: "Commercial interiors",
    category: "Commercial",
    scope: "Commercial design & build",
    summary: "Office, clinic and customer-facing spaces planned to look clear, work well and support the brand behind them.",
    narrative: [
      "Commercial interiors need to impress, inspire and perform. Koncept Werk brings brand, circulation, day-to-day operations and construction together so the environment supports both the visitor and the team using it.",
      "Office, showroom and clinic environments are developed through the same integrated design-and-build approach.",
    ],
    cover: {
      src: "/images/projects/commercial/clinic-01.webp",
      alt: "Bright clinic reception with curved desk and pale timber detailing",
      aspect: "landscape",
    },
    gallery: [
      {
        src: "/images/projects/commercial/clinic-02.webp",
        alt: "Clinic reception wall with integrated signage and a curved counter",
        aspect: "landscape",
      },
      {
        src: "/images/projects/commercial/clinic-03.webp",
        alt: "Curved clinic reception counter with warm indirect lighting",
        aspect: "landscape",
      },
      {
        src: "/images/projects/commercial/clinic-04.webp",
        alt: "Clinic treatment room with storage, equipment and a consultation chair",
        aspect: "portrait",
      },
      {
        src: "/images/projects/commercial/clinic-06.webp",
        alt: "Clinic waiting area with seating and softly filtered daylight",
        aspect: "portrait",
      },
      {
        src: "/images/projects/commercial/showroom.webp",
        alt: "Technology showroom with product displays along a dark feature wall",
        aspect: "landscape",
      },
      {
        src: "/images/projects/commercial/commercial-interior.webp",
        alt: "Dark commercial interior with illuminated digital screens",
        aspect: "wide",
      },
    ],
  },
  {
    slug: "food-and-beverage",
    title: "Food & beverage",
    category: "Commercial",
    scope: "Retail & F&B spaces",
    summary: "Hospitality and dining environments that bring atmosphere, identity and practical delivery into one composition.",
    narrative: [
      "Koncept Werk's commercial offer includes retail, food and beverage, hospitality and lifestyle spaces. The work balances a memorable customer environment with the practical requirements behind service and operation.",
      "Lighting, material contrast and brand-focused detailing create distinct moods across this selection of bar and restaurant interiors.",
    ],
    cover: {
      src: "/images/projects/hospitality/restaurant-light.webp",
      alt: "Restaurant interior with timber ceiling elements and patterned floor detailing",
      aspect: "landscape",
    },
    gallery: [
      {
        src: "/images/projects/hospitality/bar-blue.webp",
        alt: "Dark entertainment bar with blue-lit counters and multiple screens",
        aspect: "landscape",
      },
      {
        src: "/images/projects/hospitality/bar-red.webp",
        alt: "Restaurant bar interior with warm red walls and amber pendant lights",
        aspect: "landscape",
      },
      {
        src: "/images/projects/hospitality/restaurant-dark.webp",
        alt: "Intimate restaurant interior with dark walls and warm framed artwork",
        aspect: "landscape",
      },
      {
        src: "/images/projects/hospitality/bar-warm.webp",
        alt: "Warm restaurant bar with layered lighting and dark timber surfaces",
        aspect: "wide",
      },
    ],
  },
  {
    slug: "exhibition-environments",
    title: "Exhibition environments",
    category: "Exhibition",
    scope: "Design, visualisation & build",
    summary: "Custom booths supported by visualisation, fabrication, branding and on-site delivery.",
    narrative: [
      "Koncept Werk extends its design-and-build approach to exhibition environments, coordinating the booth concept, 3D visualisation, fabrication, lighting, graphics and project management.",
      "Ebara, Ideku, Luxury, Hwee Jan and Kopi 434 are among the booth environments in this selection.",
    ],
    cover: {
      src: "/images/projects/exhibition/ebara.webp",
      alt: "Ebara exhibition booth with product displays and overhead branding",
      aspect: "landscape",
    },
    gallery: [
      {
        src: "/images/projects/exhibition/ideku.webp",
        alt: "Ideku exhibition booth with open display counters",
        aspect: "landscape",
      },
      {
        src: "/images/projects/exhibition/luxury.webp",
        alt: "Luxury exhibition booth with illuminated product shelving",
        aspect: "landscape",
      },
      {
        src: "/images/projects/exhibition/hwee-jan.webp",
        alt: "Hwee Jan exhibition booth with branded display walls",
        aspect: "landscape",
      },
      {
        src: "/images/projects/exhibition/kopi-434.webp",
        alt: "Kopi 434 exhibition booth with coffee product displays",
        aspect: "wide",
      },
    ],
  },
];

export const processSteps = [
  {
    title: "Initial Contact",
    description: "After an enquiry is submitted, a designer reaches out to begin the conversation.",
  },
  {
    title: "First Consultation",
    description: "The team reviews the brief, needs and preferences to begin a detailed space plan.",
  },
  {
    title: "Quotation",
    description: "An itemised quotation sets out the scope of work for review.",
  },
  {
    title: "Design & Planning",
    description: "Proposed designs are developed collaboratively into a functional, considered direction.",
  },
  {
    title: "Work & Scheduling",
    description: "Approved work is coordinated and scheduled with the project team and industry partners.",
  },
  {
    title: "Renovation Period",
    description: "Renovation proceeds against the established work schedule.",
  },
] as const;

export const serviceGroups = [
  {
    id: "residential",
    number: "01",
    title: "Residential",
    heading: "Homes that work harder and feel entirely yours.",
    description:
      "From concept to completion, Koncept Werk combines thoughtful planning, visualisation, renovation and custom furniture into one residential service.",
    image: "/images/projects/residential/living-arifin.webp",
    imageAlt: "Light-filled residential living room with integrated storage",
    services: [
      "Bespoke design & space-saving planning",
      "3D visuals & mood boards",
      "Renovations & fit-outs",
      "Custom carpentry & furniture",
      "Project management",
    ],
    projectSlug: "residential-interiors",
  },
  {
    id: "commercial",
    number: "02",
    title: "Commercial",
    heading: "Spaces designed to impress, inspire and perform.",
    description:
      "Commercial projects bring brand, customer experience and daily operation together through an integrated design-and-build process.",
    image: "/images/projects/commercial/clinic-02.webp",
    imageAlt: "Bright clinic reception with curved counter and integrated signage",
    services: [
      "Office design & build",
      "Retail & F&B spaces",
      "Hospitality & lifestyle spaces",
      "Brand-focused interiors",
      "Turnkey delivery",
    ],
    projectSlug: "commercial-interiors",
  },
  {
    id: "exhibitions",
    number: "03",
    title: "Exhibitions",
    heading: "Brand environments carried from concept to the show floor.",
    description:
      "Koncept Werk provides custom booth design, 3D visualisation, fabrication, lighting, graphics and project management for exhibition projects.",
    image: "/images/projects/exhibition/ebara.webp",
    imageAlt: "Branded exhibition booth with illuminated overhead signage",
    services: [
      "Custom booth concepts",
      "3D design & visualisation",
      "Fabrication & on-site build",
      "Lighting, AV, branding & graphics",
      "Project management across Asia",
    ],
    projectSlug: "exhibition-environments",
  },
] as const;

export const team = [
  {
    name: "Arifin Ahmad",
    role: "Principal Designer",
    image: "/images/team/arifin-ahmad.png",
  },
  {
    name: "Güney Topsakal",
    role: "Interior Architect",
    image: "/images/team/guney-topsakal.png",
  },
] as const;

export type ArticleSection = { heading: string; paragraphs: string[] };
export type Article = {
  slug: string;
  title: string;
  date: string;
  dateIso: string;
  category: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "from-concept-to-masterpiece",
    title: "From Concept to Masterpiece: The Koncept Werk Journey to Your Dream Space",
    date: "3 October 2025",
    dateIso: "2025-10-03",
    category: "Process",
    excerpt: "A look at the six stages that carry a Koncept Werk project from first contact into renovation.",
    image: "/images/projects/residential/residential-hero.webp",
    imageAlt: "Warm open-plan residential interior by Koncept Werk",
    sections: [
      {
        heading: "A clear path from idea to site",
        paragraphs: [
          "Koncept Werk brings interior design, contracting and project management together so the conversation can move from a spatial idea into coordinated work on site.",
          "The journey is organised into six stages. Each creates a clear decision point before the next begins.",
        ],
      },
      {
        heading: "The six-stage journey",
        paragraphs: processSteps.map((step, index) => `${index + 1}. ${step.title} - ${step.description}`),
      },
    ],
  },
  {
    slug: "beyond-aesthetics",
    title: "Beyond Aesthetics: Designing High-Performance Commercial Interiors with Koncept Werk",
    date: "3 October 2025",
    dateIso: "2025-10-03",
    category: "Commercial",
    excerpt: "How brand, operation and turnkey delivery come together in Koncept Werk's commercial offer.",
    image: "/images/projects/commercial/clinic-01.webp",
    imageAlt: "Bright commercial clinic reception by Koncept Werk",
    sections: [
      {
        heading: "A space has a job to do",
        paragraphs: [
          "Koncept Werk describes commercial interiors as spaces that should impress, inspire and perform. That makes the brief larger than appearance alone: an office, retail environment or dining venue must also support the people and activity inside it.",
          "Brand-focused planning helps identity appear through the environment rather than as an applied layer at the end.",
        ],
      },
      {
        heading: "One line from vision to execution",
        paragraphs: [
          "The commercial service covers modern offices, retail and F&B, hospitality and lifestyle spaces, and turnkey delivery. Integrating design and construction keeps decisions connected as the project moves from planning into build.",
        ],
      },
    ],
  },
  {
    slug: "maximize-your-living",
    title: "Maximize Your Living: Smart Space-Saving Designs for Modern Homes by Koncept Werk",
    date: "3 October 2025",
    dateIso: "2025-10-03",
    category: "Residential",
    excerpt: "Planning, visualisation and tailored furniture can help a compact home feel more useful without losing comfort.",
    image: "/images/projects/residential/open-kitchen.webp",
    imageAlt: "Koncept Werk open kitchen and living interior",
    sections: [
      {
        heading: "Begin with how the home needs to work",
        paragraphs: [
          "Koncept Werk's residential approach starts with bespoke, space-saving planning. The objective is not to fill every corner, but to give circulation, storage and daily routines a deliberate place in the layout.",
          "3D visuals and mood boards help make those relationships visible before construction begins.",
        ],
      },
      {
        heading: "Make furniture part of the plan",
        paragraphs: [
          "Custom carpentry and furniture can turn awkward edges into useful storage, working surfaces or adaptable sleeping areas. When these pieces are planned with the room, the result can feel composed rather than crowded.",
          "Integrated project management then carries the approved direction through renovation and fit-out.",
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
