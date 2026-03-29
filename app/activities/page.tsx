import { SectionWrapper } from "@/components/section-wrapper";

const activities = [
  "Leadership and organizing",
  "Competitions and challenge-based work",
  "Teaching, mentoring, or service",
];

export default function ActivitiesPage() {
  return (
    <SectionWrapper
      eyebrow="Activities"
      title="Leadership, learning, and contribution outside project deliverables."
      description="This page makes room for the parts of your work that show initiative and community impact, not just shipped artifacts."
    >
      <div className="section-grid">
        {activities.map((item) => (
          <article
            key={item}
            className="rounded-[24px] border border-ink/10 bg-white/75 p-6"
          >
            <h3 className="text-2xl text-ink">{item}</h3>
            <p className="mt-3 text-base leading-7 text-ink/70">
              Placeholder content for achievements, responsibilities, and the kind
              of impact this activity represents.
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
