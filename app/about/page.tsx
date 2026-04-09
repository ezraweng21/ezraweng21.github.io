import { SectionWrapper } from "@/components/section-wrapper";
import { TimelineEntry } from "@/components/timeline-entry";
import { aboutThemes, aboutTimeline } from "@/data/about";

export default function AboutPage() {
  return (
    <SectionWrapper
      eyebrow="About"
      title="The story behind the work."
      description="This page should feel more personal and narrative than resume-like. It is where the work gets a little more context, background, and personality."
    >
      <div className="page-split">
        <article>
          <p className="eyebrow">Story</p>
          <h2 className="mt-2 text-2xl text-ink sm:text-[2rem]">
            More context, less resume language.
          </h2>
          <p className="page-copy mt-4">
            Use this section for a grounded personal introduction that explains
            how you think, what you care about, and how technical work fits into
            the bigger picture.
          </p>
          <p className="page-copy mt-4">
            The layout leaves room for a more detailed narrative later without
            changing the overall visual rhythm of the site.
          </p>
        </article>

        <aside>
          <p className="eyebrow">Themes</p>
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
