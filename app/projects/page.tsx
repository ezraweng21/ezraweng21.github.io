import { ProjectCard } from "@/components/project-card";
import { SectionWrapper } from "@/components/section-wrapper";
import { featuredProject, projectGallery } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <SectionWrapper
      eyebrow="Projects"
      title="Projects and technical work."
      description="This page is where the more detailed work can live. The homepage stays lighter, so projects can be presented here in a more deliberate and focused way."
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="border border-[#dec3ae] bg-[#fff7ef] p-5">
          <p className="eyebrow">Featured Project</p>
          <h2 className="mt-3 text-2xl text-ink sm:text-[2rem]">
            {featuredProject.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
            {featuredProject.summary}
          </p>

          <div className="mt-6 grid gap-4 border-t border-[#dec3ae] pt-4 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Role</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">{featuredProject.role}</p>
            </div>
            <div>
              <p className="eyebrow">Stack</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                {featuredProject.stack.join(", ")}
              </p>
            </div>
            <div>
              <p className="eyebrow">Status</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">{featuredProject.status}</p>
            </div>
          </div>

          <div className="mt-6">
            <ProjectCard project={featuredProject} />
          </div>
        </article>

        <aside className="border-t border-[#c56f3b] pt-4">
          <p className="eyebrow">Project Notes</p>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Keep this page thoughtful rather than crowded. A smaller number of
            clearer project entries will likely feel stronger than a long list
            of equal cards.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72">
            <li className="border-t border-[#dec3ae] pt-3">Feature work that has real substance.</li>
            <li className="border-t border-[#dec3ae] pt-3">Use this page as a bridge to future case studies.</li>
            <li className="border-t border-[#dec3ae] pt-3">Mix technical depth with readable summaries.</li>
          </ul>
        </aside>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {projectGallery.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
