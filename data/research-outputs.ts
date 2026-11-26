import { wbeBenchTitle } from "./research-titles";
export const researchOutputs: { heading: string; entries: { work: string; detail: string; period?: string }[] }[] = [
  { heading: "Papers and manuscripts", entries: [
    { work: wbeBenchTitle, period: "2026", detail: "Ezra Weng and Huanran Yu. IEEE BIBM 2026 short paper, published in IEEE Xplore." },
    { work: "Other manuscripts", detail: "[Citation reserved]" },
  ] },
  { heading: "Conference presentations", entries: [
    { work: "IEEE BIBM 2026", period: "2026", detail: "WBE-Bench was accepted for conference presentation." },
    { work: "ASGSR 2026", period: "2026", detail: "The NASA GeneLab team's poster and abstract on plant responses to suborbital spaceflight were accepted. Ezra is scheduled to present the poster with full travel funding." },
  ] },
  { heading: "Patent application", entries: [
    { work: "Application details", detail: "[Details reserved]" },
  ] },
];
