export type FutureProject = {
  title: string;
  idea: string;
  nextStep: string;
};

// Replace these prompts with plans, not claims of completed work.
export const futureProjects: FutureProject[] = [
  { title: "Your next project", idea: "Add an idea you want to explore or a problem you want to work on.", nextStep: "Add the first small experiment you would try." },
  { title: "Another idea", idea: "Add a personal, creative, technical, or research direction you may explore.", nextStep: "Add what you would need to learn or gather first." },
];
