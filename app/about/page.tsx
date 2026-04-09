import { SectionWrapper } from "@/components/section-wrapper";

const timeline = [
  "Starting point and how engineering entered the picture",
  "Current interests, themes, and what matters right now",
  "A future timeline section for milestones, growth, and turning points",
];

export default function AboutPage() {
  return (
    <SectionWrapper
      eyebrow="About"
      title="The story behind the work."
      description="This page should feel more personal and narrative than resume-like. It is where the work gets a little more context, background, and personality."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article>
          <p className="eyebrow">Story</p>
          <h2 className="mt-2 text-2xl text-ink sm:text-[2rem]">
            More context, less resume language.
          </h2>
          <p className="mt-4 text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
            Use this section for a grounded personal introduction that explains
            how you think, what you care about, and how technical work fits into
            the bigger picture.
          </p>
          <p className="mt-4 text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
            The layout leaves room for a more detailed narrative later without
            changing the overall visual rhythm of the site.
          </p>
        </article>

        <aside>
          <p className="eyebrow">Themes</p>
          <div className="mt-3 space-y-4 border-t border-[#dec3ae] pt-4 text-sm leading-6 text-ink/72">
            <p>Placeholder for the themes that keep showing up across projects, interests, and the way you approach your work.</p>
            <p>Placeholder for the personal side of the site that should feel human, reflective, and less compressed than a homepage intro.</p>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <p className="eyebrow">Timeline</p>
        <ul className="mt-4 grid gap-4 lg:grid-cols-3">
          {timeline.map((item) => (
            <li key={item} className="border-t border-[#c56f3b] pt-4 text-sm leading-6 text-ink/72">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
