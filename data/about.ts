export type AboutTheme = {
  title: string;
  body: string;
};

export type TimelineEntry = {
  period: string;
  title: string;
  body: string;
  notes?: string[];
};

export const aboutIntro =
  "Ezra Weng is a high school student working across biology, computer science, and data systems. His work focuses on analyzing complex biological and public-health datasets, especially wastewater and genomic surveillance data, where the main challenge is turning noisy signals into useful structure.";

export const aboutThemes: AboutTheme[] = [
  {
    title: "Fields of interest",
    body:
      "Computational biology, infectious disease, public health, civic analytics, and data systems.",
  },
  {
    title: "Technical interests",
    body:
      "Dashboards, data pipelines, visualization, genotype tracking, environmental surveillance data, and tools that make complex datasets easier to inspect.",
  },
  {
    title: "Current focus",
    body:
      "Building tools that connect biological data, computation, and practical decision-making without flattening the science into generic charts.",
  },
];

export const aboutTimeline: TimelineEntry[] = [
  {
    period: "2023-present",
    title: "Building through clubs and competitions",
    body:
      "Started taking on technical and organizational work through math, computer science, and biology communities: teaching, coordinating events, and competing across multiple disciplines.",
    notes: ["USACO Gold", "USABO Semifinalist", "AMC/AIME"],
  },
  {
    period: "May 2024-present",
    title: "Scaling student-led operations",
    body:
      "Co-founded CareForBrains and worked on outreach, chapter operations, podcast production, and sponsor coordination as the organization grew across chapters and volunteers.",
    notes: ["30 chapters", "800+ volunteers", "Operations systems"],
  },
  {
    period: "July 2025-present",
    title: "Working with real surveillance data",
    body:
      "Joined wastewater surveillance work connected to TEPHI and BCM, analyzing viral abundance, genotype distributions, and longitudinal trends across large genomic datasets.",
    notes: ["40+ sites", "16 cities", "Genomic surveillance"],
  },
  {
    period: "2026",
    title: "Turning work into reusable systems",
    body:
      "Built portfolio and organization websites with reusable structure, dynamic project pages, and clearer content systems for technical work, clubs, and future case studies.",
    notes: ["Next.js", "React", "Content systems"],
  },
];
