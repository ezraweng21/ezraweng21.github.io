import Link from "next/link";

import { MediaSlot } from "@/components/media-slot";
import type { ProjectEntry } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectEntry;
};

const cardThemeClassNames: Record<ProjectEntry["theme"], string> = {
  wastewater: "project-card-wastewater",
  civic: "project-card-civic",
  portfolio: "project-card-portfolio",
  biology: "project-card-biology",
  cs: "project-card-cs",
  nature: "project-card-nature",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card group ${cardThemeClassNames[project.theme]}`}
    >
      <div className="project-card-accent" aria-hidden="true" />
      <MediaSlot
        alt={project.media.alt}
        label={project.media.label}
        hint={project.media.hint}
        src={project.media.src}
        ratio="landscape"
        className="mb-4"
      />

      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">{project.category}</p>
        <span className="page-meta opacity-70 transition-opacity group-hover:opacity-100">
          Open
        </span>
      </div>
      <h3 className="mt-2 text-lg leading-snug text-ink sm:text-xl">
        {project.title}
      </h3>
      <p className="page-copy mt-3">{project.shortSummary}</p>

      <div className="project-card-section mt-4">
        <p className="page-meta">Status</p>
        <p className="mt-1 text-sm leading-6 text-ink/78">{project.status}</p>
      </div>

      <div className="project-card-section mt-auto flex items-center justify-between">
        <span className="page-meta">{project.timeframe}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b85f2c] opacity-0 transition-opacity group-hover:opacity-100">
          View details
        </span>
      </div>
    </Link>
  );
}
