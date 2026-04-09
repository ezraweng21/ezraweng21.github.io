import { SectionWrapper } from "@/components/section-wrapper";
import { TimelineEntry } from "@/components/timeline-entry";
import { aboutIntro, aboutThemes, aboutTimeline } from "@/data/about";

export default function AboutPage() {
  return (
    <SectionWrapper
      eyebrow="About"
      title="Biology, code, and data systems."
      description="A little more context for the projects: what I work on, what I keep coming back to, and how the technical pieces connect."
    >
      <div className="page-split">
        <article>
          <p className="eyebrow">Story</p>
          <h2 className="mt-2 text-2xl text-ink sm:text-[2rem]">
            Extracting signal from messy systems.
          </h2>
          <p className="page-copy mt-4">{aboutIntro}</p>
        </article>

        <aside>
          <p className="eyebrow">Interests</p>
          <div className="page-list mt-3">
            {aboutThemes.map((theme) => (
              <div key={theme.title} className="page-list-item">
                <h3 className="text-base text-ink">{theme.title}</h3>
                <p className="page-copy mt-2">{theme.body}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <p className="eyebrow">Timeline</p>
        <div className="mt-4">
          {aboutTimeline.map((entry, index) => (
            <TimelineEntry
              key={entry.title}
              entry={entry}
              isLast={index === aboutTimeline.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
