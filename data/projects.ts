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
  notes: string[];
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export const projects: ProjectEntry[] = [
  {
    slug: "tephi-wastewater-dashboard",
    title: "Wastewater Viral Surveillance Dashboard",
    category: "Computational Biology",
    summary:
      "Interactive dashboard for analyzing longitudinal wastewater sequencing data across 40+ sites. The project focuses on viral abundance, genotype dynamics, and extracting usable biological signal from noisy environmental data.",
    shortSummary:
      "Dashboard work for viral abundance, genotype shifts, and wastewater sequencing data.",
    role: "Developer + Data Analyst",
    stack: ["R", "R Markdown", "Shiny", "ggplot2", "dplyr"],
    timeframe: "2025-present",
    status: "Ongoing",
    notes: [
      "Built visualization and aggregation workflows for sequencing-derived wastewater data.",
      "Worked with 30k+ rows of RPKMF, coverage, genotype, and site-level data.",
      "Tracked viral abundance and genotype shifts, including norovirus GII.4 to GII.17 dynamics.",
      "Designed analysis around biological interpretation rather than surface-level charts.",
    ],
    sections: [
      {
        title: "Summary",
        body:
          "This project analyzes sequencing-derived wastewater data across sites and time. The dashboard is built to make viral trends, abundance changes, and genotype shifts easier to inspect.",
      },
      {
        title: "Data Work",
        body:
          "The workflow includes aggregation, normalization, and visualization for RPKMF, coverage, genotype, and site-level data. The core challenge is separating biological signal from noisy environmental measurements.",
      },
      {
        title: "Technical Focus",
        body:
          "The interface is designed around public-health interpretation: how viruses change over time, how genotypes move across samples, and where the data suggests meaningful shifts.",
      },
    ],
    links: [{ label: "Repo", href: "https://github.com/ezraweng21/TEPHI" }],
  },
  {
    slug: "municipal-operational-surveillance-dashboard",
    title: "Municipal Operational Surveillance Dashboard",
    category: "Civic Data",
    summary:
      "End-to-end municipal data dashboard built from raw public datasets through cleaning, transformation, and visualization. The project models operational strain across city systems using public safety and service data.",
    shortSummary:
      "Datathon-winning dashboard for municipal service data and operational strain analysis.",
    role: "Developer",
    stack: ["Data pipelines", "Visualization", "Dashboard development"],
    timeframe: "February 2026-present",
    status: "Ongoing",
    notes: [
      "Won the City of Sugar Land Datathon.",
      "Built a pipeline from raw public datasets to cleaned, analysis-ready outputs.",
      "Developed an Urban Strain Index to quantify operational stress.",
      "Focused on decision support, resource allocation, and interpretable civic data.",
    ],
    sections: [
      {
        title: "Summary",
        body:
          "The project turns public municipal datasets into a clearer view of city operations. It connects data cleaning, transformation, and visualization into one decision-support workflow.",
      },
      {
        title: "System Design",
        body:
          "The dashboard moves from raw public records into processed indicators, then into visual views for public safety and municipal service patterns.",
      },
      {
        title: "Index Work",
        body:
          "A custom Urban Strain Index was designed to summarize operational stress and make comparisons easier across services, locations, or time periods.",
      },
    ],
  },
  {
    slug: "portfolio-site",
    title: "Personal Portfolio Website",
    category: "Personal Site",
    summary:
      "Custom personal portfolio built to organize projects, activities, and technical work without collapsing everything into one page. The site uses reusable content structures and dynamic project pages so it can grow over time.",
    shortSummary:
      "A personal site with reusable content data, dynamic project routes, and a quieter visual system.",
    role: "Frontend architecture + design",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeframe: "2026",
    status: "Ongoing",
    notes: [
      "Built reusable project data and dynamic detail pages.",
      "Designed a multi-page structure for projects, activities, about, and contact content.",
      "Prioritized maintainability, responsive layout, and a less generic portfolio format.",
      "Created the site as both a portfolio and an evolving technical project.",
    ],
    sections: [
      {
        title: "Summary",
        body:
          "The portfolio is built as a structured personal site rather than a single-page project dump. It separates identity, projects, activities, and contact so each part has room to develop.",
      },
      {
        title: "Architecture",
        body:
          "Projects are stored in reusable data and rendered into both a gallery page and generated detail pages. This keeps the content easy to expand without rewriting the page structure.",
      },
      {
        title: "Design Direction",
        body:
          "The visual system favors warmer colors, smaller text, and simple section rules over heavy cards or generic portfolio effects.",
      },
    ],
    links: [
      { label: "Repo", href: "https://github.com/ezraweng21/ezraweng21.github.io" },
      { label: "Live", href: "https://ezraweng21-github-io.vercel.app" },
    ],
  },
  {
    slug: "biology-club-site",
    title: "Clements Biology Club Website",
    category: "Organization Site",
    summary:
      "Multi-page club website for organizing officers, events, resources, and member logistics. The site supports a larger student organization while keeping updates centralized and manageable.",
    shortSummary:
      "A multi-page club site for officers, events, resources, and student logistics.",
    role: "Lead Developer",
    stack: ["React", "Vite", "CSS"],
    timeframe: "2026",
    status: "Active",
    notes: [
      "Built a site structure for 50-100+ students.",
      "Created pages for officers, events, resources, and club information.",
      "Integrated real logistics such as Discord, forms, and event workflows.",
      "Designed the site so content can be updated without rebuilding the structure.",
    ],
    sections: [
      {
        title: "Summary",
        body:
          "The site centralizes Biology Club information into a multi-page structure for members, officers, and event logistics.",
      },
      {
        title: "Content System",
        body:
          "The page structure supports officers, events, resources, forms, and Discord links without making the site hard to update.",
      },
      {
        title: "Design Role",
        body:
          "The project became a reference point for this portfolio's warmer and clearer design direction because it felt more natural than a generic portfolio layout.",
      },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ezraweng21/clementsbiologyclub-website",
      },
    ],
  },
  {
    slug: "cs-club-site",
    title: "Clements Computer Science Club Website",
    category: "Organization Site",
    summary:
      "Computer Science Club website adapted from the Biology Club architecture into a more technical club identity. The project focuses on maintainable structure, reusable layouts, and clearer organization for club content.",
    shortSummary:
      "A reusable club-site structure adapted for computer science events and resources.",
    role: "Developer",
    stack: ["React", "Vite"],
    timeframe: "2026",
    status: "Ongoing",
    notes: [
      "Reused and adapted an existing club-site architecture.",
      "Reworked branding and content for a computer science audience.",
      "Focused on scalability across pages, events, and resources.",
      "Preserved maintainable structure while changing the visual and content direction.",
    ],
    sections: [
      {
        title: "Summary",
        body:
          "The CS Club site adapts a working club-site structure into a more technical context for events, resources, and competition information.",
      },
      {
        title: "Reuse",
        body:
          "The project tests how much of an existing architecture can be reused while changing the visual language, content model, and audience.",
      },
      {
        title: "Technical Direction",
        body:
          "The site is organized around maintainability: clear page structure, reusable components, and room for future club content.",
      },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ezraweng21/clementscsclub-website",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
