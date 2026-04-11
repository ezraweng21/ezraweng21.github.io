import Link from "next/link";
import { notFound } from "next/navigation";

import { MediaSlot } from "@/components/media-slot";
import { ProjectMotif } from "@/components/project-motif";
import { ProjectSpecialSections } from "@/components/project-special-sections";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isNatureProject = project.theme === "nature";

  return (
    <section className="py-5 sm:py-7">
      <div className="border-b border-[#dec3ae] pb-5 sm:pb-6">
        <p className="eyebrow mb-3">{project.category}</p>
        <h1 className="max-w-3xl text-[2rem] leading-tight text-ink sm:text-[2.55rem]">
          {project.title}
        </h1>
        <p className="page-copy mt-3 max-w-2xl">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className="home-secondary-link">
            Back to Projects
          </Link>
          {project.links?.map((link) => (
            <Link key={link.label} href={link.href} className="home-primary-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {isNatureProject ? (
        <div className="mt-7 sm:mt-8">
          <ProjectMotif project={project} />

          <MediaSlot
            alt={project.media.alt}
            label={project.media.label}
            hint={project.media.hint}
            src={project.media.src}
            ratio="wide"
            className="mb-6"
          />

          <ProjectSpecialSections project={project} />

          <div className="page-split mt-8">
            <div>
              {project.sections.map((section, index) => (
                <section
                  key={section.title}
                  className={`py-4 ${index === 0 ? "pt-0" : "border-t border-[#dec3ae]"}`}
                >
                  <p className="eyebrow">{section.title}</p>
                  <p className="page-copy mt-3 max-w-2xl">{section.body}</p>
                </section>
              ))}
            </div>

            <aside className="space-y-5">
              <section className="page-rule border-[#c56f3b]">
                <p className="eyebrow">Role</p>
                <p className="page-copy mt-2">{project.role}</p>
              </section>

              <section className="page-rule border-[#c56f3b]">
                <p className="eyebrow">Stack</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li key={item} className="page-meta border border-[#dec3ae] px-2 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="page-rule border-[#c56f3b]">
                <p className="eyebrow">Timeframe</p>
                <p className="page-copy mt-2">{project.timeframe}</p>
              </section>

              <section className="page-rule border-[#c56f3b]">
                <p className="eyebrow">Status</p>
                <p className="page-copy mt-2">{project.status}</p>
              </section>

              <section className="page-rule border-[#c56f3b]">
                <p className="eyebrow">Notes</p>
                <ul className="page-list mt-3">
                  {project.notes.map((item) => (
                    <li key={item} className="page-list-item page-copy">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </div>
      ) : (
      <div className="page-split mt-7 sm:mt-8">
        <div>
          <ProjectMotif project={project} />

          <MediaSlot
            alt={project.media.alt}
            label={project.media.label}
            hint={project.media.hint}
            src={project.media.src}
            ratio="wide"
            className="mb-6"
          />

          {project.sections.map((section, index) => (
            <section
              key={section.title}
              className={`py-4 ${index === 0 ? "pt-0" : "border-t border-[#dec3ae]"}`}
            >
              <p className="eyebrow">{section.title}</p>
              <p className="page-copy mt-3 max-w-2xl">{section.body}</p>
            </section>
          ))}

          <ProjectSpecialSections project={project} />
        </div>

        <aside className="space-y-5">
          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Role</p>
            <p className="page-copy mt-2">{project.role}</p>
          </section>

          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item} className="page-meta border border-[#dec3ae] px-2 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Timeframe</p>
            <p className="page-copy mt-2">{project.timeframe}</p>
          </section>

          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Status</p>
            <p className="page-copy mt-2">{project.status}</p>
          </section>

          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Notes</p>
            <ul className="page-list mt-3">
              {project.notes.map((item) => (
                <li key={item} className="page-list-item page-copy">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      )}
    </section>
  );
}
