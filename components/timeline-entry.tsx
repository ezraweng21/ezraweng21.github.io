import type { TimelineEntry as TimelineEntryType } from "@/data/about";

type TimelineEntryProps = {
  entry: TimelineEntryType;
  isLast?: boolean;
};

export function TimelineEntry({ entry, isLast = false }: TimelineEntryProps) {
  return (
    <article className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <div className="sm:pt-1">
        <p className="eyebrow text-[#9a552d]">{entry.period}</p>
      </div>

      <div className="relative pl-6 sm:pl-8">
        {!isLast ? (
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[0.28rem] top-5 w-px bg-[#d8b6a0] sm:left-[0.42rem]"
          />
        ) : null}
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border border-[#b66333] bg-[#f4c7a3] sm:left-[0.12rem]"
        />

        <div className="border-t border-[#d8b6a0] pb-8 pt-4">
          <h3 className="text-lg text-ink sm:text-[1.35rem]">{entry.title}</h3>
          <p className="page-copy mt-3 max-w-2xl">{entry.body}</p>

          {entry.notes?.length ? (
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.12em] text-[#8f5b39]">
              {entry.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
