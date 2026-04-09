import Link from "next/link";
import { notFound } from "next/navigation";

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

      <div className="page-split mt-7 sm:mt-8">
        <div>
          {project.sections.map((section, index) => (
            <section
              key={section.title}
              className={`py-4 ${index === 0 ? "" : "border-t border-[#dec3ae]"}`}
            >
              <p className="eyebrow">{section.title}</p>
              <p className="page-copy mt-3 max-w-2xl">{section.body}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-6">
          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Role</p>
            <p className="page-copy mt-2">{project.role}</p>
          </section>

          <section className="page-rule border-[#c56f3b]">
            <p className="eyebrow">Stack</p>
            <ul className="page-copy mt-2 space-y-2">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
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
            <ul className="page-copy mt-2 space-y-2">
              {project.notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </section>
  );
}
