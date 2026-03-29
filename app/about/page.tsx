import { SectionWrapper } from "@/components/section-wrapper";

const timeline = [
  "Origin story and what led into engineering",
  "Current focus areas, interests, and themes",
  "A future timeline section for milestones and growth",
];

export default function AboutPage() {
  return (
    <SectionWrapper
      eyebrow="About"
      title="The story behind the work."
      description="This page is reserved for narrative context: background, interests, motivations, and the timeline that connects personal growth to technical projects."
    >
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[24px] border border-ink/10 bg-white/75 p-6">
          <h3 className="text-2xl text-ink">Story</h3>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Use this section for a grounded personal introduction that explains
            how you think, what you care about, and how technical work fits into
            the bigger picture.
          </p>
          <p className="mt-4 text-base leading-7 text-ink/70">
            The layout leaves room for a more detailed narrative later without
            changing the overall visual rhythm of the site.
          </p>
        </article>

        <aside className="rounded-[24px] border border-ink/10 bg-mist/85 p-6">
          <h3 className="text-2xl text-ink">Timeline</h3>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-ink/72">
            {timeline.map((item) => (
              <li key={item} className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SectionWrapper>
  );
}
