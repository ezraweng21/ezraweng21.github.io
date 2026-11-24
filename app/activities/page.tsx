import type { Metadata } from "next";
import { SectionWrapper } from "@/components/section-wrapper";
import { Chronology } from "@/components/chronology";
import { activities } from "@/data/activities";

export const metadata: Metadata = { title: "Activities" };

export default function ActivitiesPage() {
  return <SectionWrapper title="Activities" description="A timeline of my research, leadership, teaching, and service, grouped by the year each began."><Chronology entries={activities} /></SectionWrapper>;
}
