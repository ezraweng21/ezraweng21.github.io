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
      <div className="page-split">
        <article className="border-t border-[#c56f3b] pt-4">
          <p className="eyebrow">Featured Project</p>
          <h2 className="mt-3 text-2xl text-ink sm:text-[2rem]">
            {featuredProject.title}
          </h2>
          <p className="page-copy mt-4 max-w-2xl">{featuredProject.summary}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="page-rule">
              <p className="eyebrow">Role</p>
              <p className="page-copy mt-2">{featuredProject.role}</p>
            </div>
            <div className="page-rule">
              <p className="eyebrow">Stack</p>
              <p className="page-copy mt-2">
                {featuredProject.stack.join(", ")}
              </p>
            </div>
            <div className="page-rule">
              <p className="eyebrow">Status</p>
              <p className="page-copy mt-2">{featuredProject.status}</p>
            </div>
          </div>

          <div className="mt-7">
            <ProjectCard project={featuredProject} />
          </div>
        </article>

        <aside className="page-rule">
          <p className="eyebrow">Project Notes</p>
          <p className="page-copy mt-3">
            Keep this page thoughtful rather than crowded. A smaller number of
            clearer project entries will likely feel stronger than a long list
            of equal cards.
          </p>
          <ul className="page-list mt-4">
            <li className="page-list-item page-copy">Feature work that has real substance.</li>
            <li className="page-list-item page-copy">Use this page as a bridge to future case studies.</li>
            <li className="page-list-item page-copy">Mix technical depth with readable summaries.</li>
          </ul>
        </aside>
      </div>

      <div className="mt-10 border-t border-[#dec3ae] pt-5">
        <p className="eyebrow">Gallery</p>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectGallery.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
