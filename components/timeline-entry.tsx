import { displayYears } from "@/lib/display-years";
import type { TimelineEntry as TimelineEntryType } from "@/data/about";

type TimelineEntryProps = {
  entry: TimelineEntryType;
};

export function TimelineEntry({ entry }: TimelineEntryProps) {
  return (
    <article className="timeline-entry">
      <p className="timeline-period">{displayYears(entry.period)}</p>
      <div>
        <h3>{entry.title}</h3>
        <p>{entry.body}</p>
      </div>
    </article>
  );
}
