import Link from "next/link";

import type { ProjectEntry } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block border-t border-[#c56f3b] pt-4 transition-colors duration-200 hover:text-[#b85f2c]"
    >
      <p className="eyebrow">{project.category}</p>
      <h3 className="mt-2 text-base text-ink sm:text-lg">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/70">{project.shortSummary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-[#8f5b39]">
        <span>{project.timeframe}</span>
        <span>{project.status}</span>
      </div>
    </Link>
  );
}
