import { SectionWrapper } from "@/components/section-wrapper";
import { activities } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <SectionWrapper
      eyebrow="Activities"
      title="Activities."
      description="Use this page for organizations, competitions, teaching, service, or other work."
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
          <p className="eyebrow">Notes</p>
          <p className="page-copy mt-3 max-w-2xl">
            Add a short note here if you want a summary for this page.
          </p>
        </div>
        <div className="page-rule border-[#c56f3b]">
          <p className="page-copy">
            Add a second short note here if needed.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
