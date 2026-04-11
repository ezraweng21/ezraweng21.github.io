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
  "Add a short introduction here.";

export const aboutThemes: AboutTheme[] = [
  {
    title: "Field or theme",
    body: "Add one short line here.",
  },
  {
    title: "Field or theme",
    body: "Add one short line here.",
  },
  {
    title: "Field or theme",
    body: "Add one short line here.",
  },
];

export const aboutTimeline: TimelineEntry[] = [
  {
    period: "Add timeframe",
    title: "Add milestone title",
    body: "Add one short timeline note here.",
    notes: ["Optional note"],
  },
  {
    period: "Add timeframe",
    title: "Add milestone title",
    body: "Add one short timeline note here.",
    notes: ["Optional note"],
  },
  {
    period: "Add timeframe",
    title: "Add milestone title",
    body: "Add one short timeline note here.",
    notes: ["Optional note"],
  },
  {
    period: "Add timeframe",
    title: "Add milestone title",
    body: "Add one short timeline note here.",
    notes: ["Optional note"],
  },
];
