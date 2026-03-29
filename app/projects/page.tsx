import { SectionWrapper } from "@/components/section-wrapper";

const projectGroups = [
  {
    title: "Technical work",
    text: "Feature larger software builds, infrastructure experiments, and products that show engineering depth.",
  },
  {
    title: "Dashboards",
    text: "Reserve space for data-driven interfaces, analytics work, and operational tooling.",
  },
  {
    title: "Future detail pages",
    text: "Cards here can later route into richer case studies without changing this page shell.",
  },
];

export default function ProjectsPage() {
  return (
    <SectionWrapper
      eyebrow="Projects"
      title="A dedicated surface for technical work."
      description="The homepage stays focused on identity, so this page can carry the stronger project and execution emphasis without feeling crowded."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {projectGroups.map((project) => (
          <article
            key={project.title}
            className="rounded-[24px] border border-ink/10 bg-white/80 p-6"
          >
            <p className="eyebrow">Placeholder</p>
            <h3 className="mt-3 text-2xl text-ink">{project.title}</h3>
            <p className="mt-3 text-base leading-7 text-ink/70">{project.text}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
