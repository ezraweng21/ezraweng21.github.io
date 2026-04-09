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

export const aboutThemes: AboutTheme[] = [
  {
    title: "Technical work with a human angle",
    body:
      "Use this space for the ideas that tie projects together: clarity, curiosity, and work that feels useful to real people.",
  },
  {
    title: "Science, systems, and visual thinking",
    body:
      "This can later connect technical projects with broader interests in research, biology, observation, and the way information is presented.",
  },
  {
    title: "Growth over polished finality",
    body:
      "The site can hold projects in progress, experiments, and milestones without pretending everything arrives fully finished at once.",
  },
];

export const aboutTimeline: TimelineEntry[] = [
  {
    period: "Starting point",
    title: "Where the curiosity began",
    body:
      "A place for the first real thread of interest: the subjects, questions, or experiences that made building and problem solving feel meaningful.",
    notes: ["Early interests", "First signs of direction"],
  },
  {
    period: "Turning point",
    title: "When technical work started to click",
    body:
      "Use this entry for the phase where classes, clubs, competitions, or personal builds turned curiosity into a more serious practice.",
    notes: ["Projects became more intentional", "Skills started connecting"],
  },
  {
    period: "Current focus",
    title: "What the work looks like now",
    body:
      "This section can describe the mix of technical projects, leadership, and creative interests that currently shape the direction of the site.",
    notes: ["Technical depth", "Broader identity", "Room for future case studies"],
  },
  {
    period: "Next chapter",
    title: "What this grows into next",
    body:
      "Reserve this for the near-future direction: deeper project write-ups, richer storytelling, and the kinds of work you want this portfolio to make room for.",
    notes: ["More detailed case studies", "Expanded personal context"],
  },
];
