import Image from "next/image";

import type { ProjectEntry } from "@/data/projects";

type ProjectVisualProps = {
  project: ProjectEntry;
  className?: string;
  compact?: boolean;
};

const visualTitles: Record<string, string> = {
  "tephi-wastewater-dashboard": "Wastewater Surveillance",
  "municipal-operational-surveillance-dashboard": "City Systems",
  "portfolio-site": "Personal Portfolio",
  "biology-club-site": "Biology Club",
  "cs-club-site": "Computer Science Club",
  careforbrains: "CareForBrains",
  "field-notes-photography-and-inaturalist": "Field Notes",
};

export function ProjectVisual({
  project,
  className = "",
  compact = false,
}: ProjectVisualProps) {
  const visualTitle = visualTitles[project.slug] ?? project.title;
  const classes = [
    "project-visual",
    `project-visual-${project.theme}`,
    compact ? "project-visual-compact" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (project.media.src) {
    return (
      <div className={classes}>
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          className="project-visual-image"
          sizes={compact ? "240px" : "(min-width: 900px) 50vw, 100vw"}
        />
      </div>
    );
  }

  return (
    <div className={classes} role="img" aria-label={project.media.alt}>
      <strong className="project-visual-title">{visualTitle}</strong>
    </div>
  );
}
