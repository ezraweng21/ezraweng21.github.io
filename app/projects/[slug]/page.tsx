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
    <section className="py-6 sm:py-8">
      <div className="border-b border-[#dec3ae] pb-6">
        <p className="eyebrow mb-3">{project.category}</p>
        <h1 className="max-w-3xl text-3xl text-ink sm:text-4xl">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
          {project.summary}
        </p>
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

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {project.sections.map((section) => (
            <section key={section.title} className="border-t border-[#dec3ae] py-4 first:border-t-0 first:pt-0">
              <p className="eyebrow">{section.title}</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <aside className="space-y-6">
          <section className="border-t border-[#c56f3b] pt-4">
            <p className="eyebrow">Role</p>
            <p className="mt-2 text-sm leading-6 text-ink/72">{project.role}</p>
          </section>

          <section className="border-t border-[#c56f3b] pt-4">
            <p className="eyebrow">Stack</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-ink/72">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="border-t border-[#c56f3b] pt-4">
            <p className="eyebrow">Timeframe</p>
            <p className="mt-2 text-sm leading-6 text-ink/72">{project.timeframe}</p>
          </section>

          <section className="border-t border-[#c56f3b] pt-4">
            <p className="eyebrow">Status</p>
            <p className="mt-2 text-sm leading-6 text-ink/72">{project.status}</p>
          </section>

          <section className="border-t border-[#c56f3b] pt-4">
            <p className="eyebrow">Notes</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-ink/72">
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
