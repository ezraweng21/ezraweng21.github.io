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
  "I like keeping track of what catches my attention. Sometimes that turns into science, sometimes into photos or notes, sometimes into teaching, organizing, or building a structure around something that felt scattered before. I care a lot about curiosity, texture, memory, and the feeling that different parts of a life do not need to be split into separate boxes just to seem legitimate.";

export const aboutThemes: AboutTheme[] = [
  {
    title: "Attention",
    body: "I am drawn to details, patterns, odd connections, and the kinds of small observations that become more interesting the longer you stay with them.",
  },
  {
    title: "Range",
    body: "I do not want to act like science, nature, humor, archives, teaching, personal experiments, and aesthetics belong in separate lives. The overlap is part of the point.",
  },
  {
    title: "Making things shareable",
    body: "A lot of what I enjoy is turning private curiosity into something other people can enter too, whether that means explaining, organizing, documenting, or just presenting something more clearly.",
  },
];

export const aboutTimeline: TimelineEntry[] = [
  {
    period: "2023-present",
    title: "Learning how I like to move through things",
    body: "A lot of early growth came from saying yes to communities, teaching, competitions, and responsibilities that forced me to become more organized, more expressive, and more comfortable taking initiative.",
  },
  {
    period: "May 2024-present",
    title: "From participation to ownership",
    body: "At some point the shift stopped being just joining things and started becoming building, coordinating, and helping hold larger efforts together in a way that other people could rely on.",
  },
  {
    period: "July 2025-present",
    title: "Following the curiosity deeper",
    body: "The science side became more real once curiosity met actual responsibility. That made the questions feel less abstract and pushed me to think more carefully about observation, interpretation, and what it means to notice something well.",
  },
  {
    period: "2026-present",
    title: "Keeping a wider record",
    body: "Lately I have cared more about building a fuller record of who I am and what I notice, instead of only preserving the parts that sound polished, useful, or officially impressive.",
  },
];
