export type ActivityEntry = {
  title: string;
  role: string;
  dates: string;
  description: string;
  whyItMatters: string;
  category: "Current Work" | "Leadership" | "Teaching" | "Service" | "Competitions";
};

export const activities: ActivityEntry[] = [
  {
    title: "TEPHI / BCM Wastewater Internship",
    role: "Intern",
    dates: "July–September 2025",
    category: "Current Work",
    description:
      "Worked on statewide genomic wastewater surveillance across 16 cities and 40+ sites, spending time with large datasets, longer time horizons, and the careful interpretation that kind of work demands.",
    whyItMatters:
      "It sits at a meaningful intersection of science, patience, and real-world impact.",
  },
  {
    title: "Mu Alpha Theta",
    role: "Volunteer Coordinator -> Secretary/Treasurer",
    dates: "2023-present",
    category: "Leadership",
    description:
      "Managed operations for 70+ members, coordinated 150+ service hours, and helped keep large student efforts organized in a way that people could actually depend on.",
    whyItMatters:
      "It taught me that showing up reliably matters just as much as being talented.",
  },
  {
    title: "Computer Science Club",
    role: "Coach/Coordinator -> Systems Manager",
    dates: "2023-present",
    category: "Teaching",
    description:
      "Taught students weekly, helped run programming competitions, and spent a lot of time making difficult material feel more approachable and structured.",
    whyItMatters:
      "It is one of the clearest places where teaching and technical depth meet for me.",
  },
  {
    title: "Biology Club",
    role: "Teaching Coordinator -> Event Coordinator",
    dates: "2023-present",
    category: "Service",
    description:
      "Helped revive the club into a more active organization through teaching materials, event planning, and more consistent programming.",
    whyItMatters:
      "It gave me real practice building community instead of only participating in it.",
  },
  {
    title: "CareForBrains",
    role: "Co-Founder & COO",
    dates: "May 2024-present",
    category: "Leadership",
    description:
      "Built operations and outreach systems for a student-led initiative that scaled across chapters and volunteers while also supporting content and sponsor-facing work.",
    whyItMatters:
      "It made the behind-the-scenes side of meaningful work feel very real to me.",
  },
  {
    title: "Competitions",
    role: "Competitor",
    dates: "2023-present",
    category: "Competitions",
    description:
      "Competed across computer science, biology, and math, including USACO Gold, USABO Semifinalist recognition, and multiple AMC/AIME qualifications.",
    whyItMatters:
      "Competition keeps my problem-solving sharp, but it also reminds me how much I enjoy difficulty for its own sake.",
  },
];
