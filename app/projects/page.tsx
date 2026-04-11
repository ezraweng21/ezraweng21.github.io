import { ProjectCard } from "@/components/project-card";
import { SectionWrapper } from "@/components/section-wrapper";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <SectionWrapper
      eyebrow="Projects"
      title="Projects."
      description="Use this page for project entries and links to deeper detail pages."
    >
      <div className="page-split">
        <div className="page-rule-strong">
          <p className="eyebrow">Index</p>
          <p className="page-copy mt-3 max-w-2xl">
            Add a short note here if you want context for the project list.
          </p>
        </div>

        <div className="page-rule">
          <p className="eyebrow">Notes</p>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-ink/72">
            <p>Add one short line here.</p>
            <p>Add one short line here.</p>
            <p>Add one short line here.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[#dec3ae] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Project Gallery</p>
            <p className="page-copy mt-2 max-w-2xl">
              Add a short gallery note here if needed.
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
