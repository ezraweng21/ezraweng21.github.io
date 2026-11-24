import type { ProjectTheme } from "@/data/projects";

export type PortfolioItem = {
  title: string;
  category: string;
  summary: string;
  role: string;
  timeframe: string;
  href: string;
  theme: ProjectTheme;
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Wastewater Viral Surveillance Dashboard",
    category: "Research",
    summary:
      "This project studies genotype dynamics and temporal change in multi-year norovirus wastewater data from sites across Texas.",
    role: "Developer and data analyst",
    timeframe: "2025-present",
    href: "/projects/tephi-wastewater-dashboard",
    theme: "wastewater",
  },
  {
    title: "Municipal Operational Surveillance Dashboard",
    category: "Civic data",
    summary:
      "This dashboard and data pipeline model operational strain across public city systems.",
    role: "Developer",
    timeframe: "2026-present",
    href: "/projects/municipal-operational-surveillance-dashboard",
    theme: "civic",
  },
  {
    title: "CareForBrains",
    category: "Community leadership",
    summary:
      "CareForBrains connects student-led chapters with public resources, writing, podcasting, and community outreach.",
    role: "Co-founder and COO",
    timeframe: "2024-present",
    href: "/projects/careforbrains",
    theme: "citizen",
  },
  {
    title: "Student Organization Web Systems",
    category: "Community technology",
    summary:
      "A reusable website system organizes events, officers, and member resources across student organizations.",
    role: "Design and development",
    timeframe: "2026",
    href: "/projects/biology-club-site",
    theme: "biology",
  },
  {
    title: "Field Notes and Photography",
    category: "Personal practice",
    summary:
      "This visual archive brings together photography, field notes, and observations from the natural world.",
    role: "Photography and documentation",
    timeframe: "Ongoing",
    href: "/photography",
    theme: "nature",
  },
];
