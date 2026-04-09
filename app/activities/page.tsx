import { SectionWrapper } from "@/components/section-wrapper";

const activities = [
  {
    title: "Leadership and organizing",
    text: "Placeholder for roles where you led, built structure, or helped shape a group or community over time.",
  },
  {
    title: "Competitions and challenge-based work",
    text: "Placeholder for contests, hackathons, or other environments where problem solving happened under pressure.",
  },
  {
    title: "Teaching, mentoring, or service",
    text: "Placeholder for the work that shows patience, contribution, and the ability to help other people grow too.",
  },
];

export default function ActivitiesPage() {
  return (
    <SectionWrapper
      eyebrow="Activities"
      title="Activities beyond formal project deliverables."
      description="This page is for leadership, competitions, service, and the kinds of work that show initiative in a different way than project pages do."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {activities.map((item) => (
          <article key={item.title} className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Category</p>
            <h3 className="mt-2 text-lg text-ink">{item.title}</h3>
            <p className="page-copy mt-3">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="page-split mt-10">
        <div>
          <p className="eyebrow">Why It Matters</p>
          <p className="page-copy mt-3 max-w-2xl">
            This page should feel organized and credible without turning into a
            plain list of extracurricular lines. It can eventually give context
            to the work that shaped you outside formal project outputs.
          </p>
        </div>
        <div className="page-rule">
          <p>Future entries can be grouped by organization, role, or type of work depending on what reads most clearly once the real content is ready.</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
