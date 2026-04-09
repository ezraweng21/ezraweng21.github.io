import { SectionWrapper } from "@/components/section-wrapper";
import { activities } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <SectionWrapper
      eyebrow="Activities"
      title="Clubs, competitions, and work outside the project list."
      description="The projects show technical output. This page gives context for the organizations, teaching, competitions, and systems work around them."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {activities.map((item) => (
          <article key={item.title} className="page-rule border-[#c56f3b]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <p className="page-meta max-w-[20rem] leading-5">{item.role}</p>
              <p className="page-meta text-[#8f5b39]">{item.dates}</p>
            </div>
            <h3 className="mt-2 text-lg text-ink">{item.title}</h3>
            <p className="page-copy mt-3">{item.description}</p>
            <p className="mt-4 border-t border-[#ead5c7] pt-3 text-sm leading-6 text-ink/70">
              {item.whyItMatters}
            </p>
          </article>
        ))}
      </div>

      <div className="page-split mt-10">
        <div>
          <p className="eyebrow">Pattern</p>
          <p className="page-copy mt-3 max-w-2xl">
            Most of this work sits between technical systems and people:
            building contest infrastructure, managing club operations, teaching
            younger students, and making organizations easier to run.
          </p>
        </div>
        <div className="page-rule border-[#c56f3b]">
          <p className="page-copy">
            The common thread is scale. These activities involve real groups,
            real logistics, and systems that need to keep working after the
            first version is built.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
