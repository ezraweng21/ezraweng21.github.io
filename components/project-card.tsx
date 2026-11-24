import { displayYears } from "@/lib/display-years";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import type { ProjectEntry } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects#${project.slug}`}
      className="project-row"
    >
      <ProjectVisual project={project} compact />
      <div className="project-row-copy">
        <p className="project-row-meta">
          {project.category} · {displayYears(project.timeframe)}
        </p>
        <h2>{project.title}</h2>
        <p>{project.shortSummary}</p>
      </div>
      <span className="project-row-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
