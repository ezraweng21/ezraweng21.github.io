export type ProjectSection = {
  title: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
};

export type ProjectTheme =
  | "wastewater"
  | "civic"
  | "portfolio"
  | "biology"
  | "cs"
  | "nature";

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
  theme: ProjectTheme;
  motifLabel: string;
  motifHint: string;
  media: ProjectMedia;
  notes: string[];
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export const projects: ProjectEntry[] = [
  {
    slug: "tephi-wastewater-dashboard",
    title: "Wastewater Viral Surveillance Dashboard",
    category: "Computational Biology",
    summary: "Add a 2-3 sentence project summary here.",
    shortSummary: "Add a short one-line card summary here.",
    role: "Developer + Data Analyst",
    stack: ["R", "R Markdown", "Shiny", "ggplot2", "dplyr"],
    timeframe: "2025-present",
    status: "Ongoing",
    theme: "wastewater",
    motifLabel: "Flow system",
    motifHint: "Use this page for pipeline, dashboard, and signal-tracking material.",
    media: {
      alt: "Wastewater surveillance dashboard preview",
      label: "Dashboard preview",
      hint:
        "Add a screenshot showing abundance trends, genotype breakdowns, or site-level dashboard views.",
    },
    notes: [
      "Add one key point here.",
      "Add one key point here.",
      "Add one key point here.",
    ],
    sections: [
      {
        title: "Overview",
        body: "Add a short overview here.",
      },
      {
        title: "Build Notes",
        body: "Add implementation notes here.",
      },
      {
        title: "Details",
        body: "Add any deeper context, tradeoffs, or results here.",
      },
    ],
    links: [{ label: "Repo", href: "https://github.com/ezraweng21/TEPHI" }],
  },
  {
    slug: "municipal-operational-surveillance-dashboard",
    title: "Municipal Operational Surveillance Dashboard",
    category: "Civic Data",
    summary: "Add a 2-3 sentence project summary here.",
    shortSummary: "Add a short one-line card summary here.",
    role: "Developer",
    stack: ["Data pipelines", "Visualization", "Dashboard development"],
    timeframe: "February 2026-present",
    status: "Ongoing",
    theme: "civic",
    motifLabel: "City grid",
    motifHint: "Use this page for system maps, index logic, and dashboard views.",
    media: {
      alt: "Municipal dashboard preview",
      label: "Project preview",
      hint:
        "Add a screenshot of the municipal dashboard, urban strain index panels, or core charts.",
    },
    notes: [
      "Add one key point here.",
      "Add one key point here.",
      "Add one key point here.",
    ],
    sections: [
      {
        title: "Overview",
        body: "Add a short overview here.",
      },
      {
        title: "Build Notes",
        body: "Add implementation notes here.",
      },
      {
        title: "Details",
        body: "Add any deeper context, tradeoffs, or results here.",
      },
    ],
    links: [
      { label: "Repo", href: "https://github.com/mat-the-doubleu/sugarlanddatathon" },
      { label: "Live", href: "https://matthewchen3241.shinyapps.io/dataday/" },
    ],
  },
  {
    slug: "portfolio-site",
    title: "Personal Portfolio Website",
    category: "Personal Site",
    summary: "Add a 2-3 sentence project summary here.",
    shortSummary: "Add a short one-line card summary here.",
    role: "Frontend architecture + design",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeframe: "2026",
    status: "Ongoing",
    theme: "portfolio",
    motifLabel: "Page structure",
    motifHint: "Use this page for layout decisions, system notes, and iterative design choices.",
    media: {
      alt: "Portfolio site preview",
      label: "Site preview",
      hint:
        "Add a homepage or project-page screenshot once the visuals feel settled.",
    },
    notes: [
      "Add one key point here.",
      "Add one key point here.",
      "Add one key point here.",
    ],
    sections: [
      {
        title: "Overview",
        body: "Add a short overview here.",
      },
      {
        title: "Build Notes",
        body: "Add implementation notes here.",
      },
      {
        title: "Details",
        body: "Add any deeper context, tradeoffs, or results here.",
      },
    ],
    links: [
      { label: "Repo", href: "https://github.com/ezraweng21/ezraweng21.github.io" },
      { label: "Live", href: "https://ezraweng21.vercel.app/" },
    ],
  },
  {
    slug: "biology-club-site",
    title: "Clements Biology Club Website",
    category: "Organization Site",
    summary: "Add a 2-3 sentence project summary here.",
    shortSummary: "Add a short one-line card summary here.",
    role: "Lead Developer",
    stack: ["React", "Vite", "CSS"],
    timeframe: "2026",
    status: "Active",
    theme: "biology",
    motifLabel: "Field notes",
    motifHint: "Use this page for content structure, club logistics, and teaching materials.",
    media: {
      alt: "Biology Club site preview",
      label: "Site preview",
      hint:
        "Add a screenshot of the homepage, events page, or officers layout.",
    },
    notes: [
      "Add one key point here.",
      "Add one key point here.",
      "Add one key point here.",
    ],
    sections: [
      {
        title: "Overview",
        body: "Add a short overview here.",
      },
      {
        title: "Build Notes",
        body: "Add implementation notes here.",
      },
      {
        title: "Details",
        body: "Add any deeper context, tradeoffs, or results here.",
      },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ezraweng21/clementsbiologyclub-website",
      },
      {
        label: "Live",
        href: "https://clementsbiologyclub.vercel.app/",
      },
    ],
  },
  {
    slug: "cs-club-site",
    title: "Clements Computer Science Club Website",
    category: "Organization Site",
    summary: "Add a 2-3 sentence project summary here.",
    shortSummary: "Add a short one-line card summary here.",
    role: "Developer",
    stack: ["React", "Vite"],
    timeframe: "2026",
    status: "Ongoing",
    theme: "cs",
    motifLabel: "System grid",
    motifHint: "Use this page for architecture notes, reuse decisions, and implementation details.",
    media: {
      alt: "Computer Science Club site preview",
      label: "Site preview",
      hint:
        "Add a screenshot of the club homepage, events page, or resources layout.",
    },
    notes: [
      "Add one key point here.",
      "Add one key point here.",
      "Add one key point here.",
    ],
    sections: [
      {
        title: "Overview",
        body: "Add a short overview here.",
      },
      {
        title: "Build Notes",
        body: "Add implementation notes here.",
      },
      {
        title: "Details",
        body: "Add any deeper context, tradeoffs, or results here.",
      },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ezraweng21/clementscsclub-website",
      },
      {
        label: "Live",
        href: "https://clementscsclub.vercel.app/",
      },
    ],
  },
  {
    slug: "field-notes-photography-and-inaturalist",
    title: "Field Notes, Photography, and iNaturalist",
    category: "Nature Archive",
    summary: "Add a 2-3 sentence project summary here.",
    shortSummary: "Add a short one-line card summary here.",
    role: "Photography, documentation, and archive building",
    stack: ["Photography", "iNaturalist", "Gallery system"],
    timeframe: "Ongoing",
    status: "Planned",
    theme: "nature",
    motifLabel: "Field journal",
    motifHint:
      "Use this page for observations, photo galleries, field notes, and future iNaturalist integration.",
    media: {
      alt: "Nature archive preview",
      label: "Gallery preview",
      hint:
        "Add one photo, a contact-sheet screenshot, or an observation grid once the archive starts taking shape.",
    },
    notes: [
      "Add one key point here.",
      "Add one key point here.",
      "Add one key point here.",
    ],
    sections: [
      {
        title: "Overview",
        body: "Add a short overview here.",
      },
      {
        title: "Gallery",
        body: "Add notes here for photography, organization, or image themes.",
      },
      {
        title: "Observations",
        body:
          "Add notes here for iNaturalist observations, field notes, or future API/widget plans.",
      },
    ],
    links: [
      {
        label: "iNaturalist",
        href: "https://www.inaturalist.org/people/ezraweng21",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
