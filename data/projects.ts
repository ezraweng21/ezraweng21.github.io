export type ProjectSection = {
  title: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectEntry = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  shortSummary: string;
  role: string;
  stack: string[];
  timeframe: string;
  status: string;
  featured?: boolean;
  notes: string[];
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export const projects: ProjectEntry[] = [
  {
    slug: "portfolio-site",
    title: "Personal Portfolio Site",
    category: "Featured Build",
    summary:
      "The portfolio itself is a design and engineering project: a quieter identity-first site with separate pages for work, activities, and future case studies.",
    shortSummary:
      "A personal site that balances identity, technical work, and future growth.",
    role: "Design, frontend, structure",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeframe: "Current build",
    status: "In progress",
    featured: true,
    notes: [
      "Identity-first homepage",
      "Separate project detail pages",
      "Built in layers rather than all at once",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "This project is the foundation for the rest of the portfolio. It is meant to feel personal first, while still leaving room for a more serious technical work archive behind it.",
      },
      {
        title: "Design Direction",
        body:
          "The goal is to avoid a generic portfolio look and instead build a site that feels a little warmer, more human, and easier to grow over time.",
      },
      {
        title: "Next Steps",
        body:
          "Later versions can add richer project stories, a more developed About page, and one or two carefully chosen interactions once the structure and content feel stable.",
      },
    ],
    links: [{ label: "Live Site", href: "/" }],
  },
  {
    slug: "biology-club-site",
    title: "Biology Club Website",
    category: "Organization Site",
    summary:
      "A site direction centered on clarity, organization, and a friendlier structure for presenting club information, events, and identity.",
    shortSummary:
      "A clearer club site with a calmer structure and stronger thematic identity.",
    role: "Frontend structure and styling",
    stack: ["React", "Vite", "CSS"],
    timeframe: "Recent project",
    status: "Ongoing reference point",
    notes: [
      "Strong thematic design language",
      "Clear section rhythm",
      "Useful reference for warmth and readability",
    ],
    sections: [
      {
        title: "Purpose",
        body:
          "This project shows how a site can feel more grounded and coherent when the layout, tone, and content hierarchy all point in the same direction.",
      },
      {
        title: "What It Contributes",
        body:
          "It is a useful reference for how to make a site feel structured and welcoming without relying on generic product-page patterns.",
      },
    ],
  },
  {
    slug: "cs-club-site",
    title: "Computer Science Club Website",
    category: "Organization Site",
    summary:
      "A more systems-oriented club site that leans into technical identity, reusable structure, and a clearer information architecture.",
    shortSummary:
      "A club site with a stronger technical tone and reusable content structure.",
    role: "Frontend structure and visual system",
    stack: ["React", "Vite", "CSS"],
    timeframe: "Recent project",
    status: "In progress",
    notes: [
      "Reusable content modules",
      "Technical visual direction",
      "Multi-page information architecture",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "This project helps demonstrate another side of front-end work: more technical visual language, stronger emphasis on structure, and clearer information scaffolding.",
      },
      {
        title: "Future Detail",
        body:
          "A fuller case study could later compare what worked well on this site versus the warmer approach taken on other projects.",
      },
    ],
  },
  {
    slug: "dashboard-work",
    title: "Dashboard and Data Tools",
    category: "Tooling",
    summary:
      "A placeholder slot for interface-heavy tools, dashboards, and data projects that prioritize clarity and usefulness over presentation alone.",
    shortSummary:
      "A place for practical interface work and data-heavy tooling.",
    role: "Placeholder role",
    stack: ["Placeholder stack"],
    timeframe: "Future entry",
    status: "Placeholder",
    notes: [
      "Useful internal tools",
      "Analytics or reporting flows",
      "Data-driven interfaces",
    ],
    sections: [
      {
        title: "What Belongs Here",
        body:
          "This entry is reserved for projects that are more operational or analytical in nature and may not fit the same mold as a more public-facing site or polished app.",
      },
    ],
  },
  {
    slug: "future-case-study",
    title: "Future Case Study",
    category: "Placeholder",
    summary:
      "A flexible placeholder for the kind of deeper project write-up that can eventually include context, process, tradeoffs, and outcome.",
    shortSummary:
      "A placeholder for a fuller future project story.",
    role: "Placeholder role",
    stack: ["Placeholder stack"],
    timeframe: "Future entry",
    status: "Placeholder",
    notes: [
      "Longer narrative format",
      "Room for process and reflection",
      "Expandable detail layout",
    ],
    sections: [
      {
        title: "Why It Exists",
        body:
          "This project slot is less about the specific work and more about reserving a format for future case studies that deserve more space than a compact card.",
      },
    ],
  },
];

export const featuredProject =
  projects.find((project) => project.featured) ?? projects[0];

export const projectGallery = projects.filter(
  (project) => project.slug !== featuredProject.slug,
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
