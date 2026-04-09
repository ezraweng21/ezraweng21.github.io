import { ProjectCard } from "@/components/project-card";
import { SectionWrapper } from "@/components/section-wrapper";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <SectionWrapper
      eyebrow="Projects"
      title="Projects and technical work."
      description="Dashboards, data systems, organization websites, and the technical work behind them."
    >
      <div className="page-split">
        <div className="page-rule-strong">
          <p className="eyebrow">Index</p>
          <p className="page-copy mt-3 max-w-2xl">
            Each project has a short card here and a deeper page behind it. The
            emphasis is on systems: biological data, civic data, reusable
            websites, and interfaces that need to stay maintainable.
          </p>
        </div>

        <div className="page-rule">
          <p className="eyebrow">What to look for</p>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-ink/72">
            <p>Data that starts messy and needs structure.</p>
            <p>Dashboards built around interpretation, not just charts.</p>
            <p>Websites that support real student organizations.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[#dec3ae] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Project Gallery</p>
            <p className="page-copy mt-2 max-w-2xl">
              A mix of public-health dashboards, data-heavy tools, and sites built
              for real student groups.
            </p>
          </div>
          <p className="page-meta">{projects.length} projects</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
