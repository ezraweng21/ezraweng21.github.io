import type { ProjectEntry } from "@/data/projects";

type ProjectMotifProps = {
  project: ProjectEntry;
};

function WastewaterMotif() {
  return (
    <div className="project-motif-visual project-motif-wastewater">
      <div className="wastewater-pipe">
        <div className="wastewater-flow wastewater-flow-a" />
        <div className="wastewater-flow wastewater-flow-b" />
      </div>
      <div className="wastewater-readout">
        <span>flow</span>
        <span>signal</span>
        <span>tracking</span>
      </div>
    </div>
  );
}

function CivicMotif() {
  return (
    <div className="project-motif-visual project-motif-civic">
      <div className="civic-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function PortfolioMotif() {
  return (
    <div className="project-motif-visual project-motif-portfolio">
      <div className="portfolio-window portfolio-window-back" />
      <div className="portfolio-window portfolio-window-front" />
    </div>
  );
}

function BiologyMotif() {
  return (
    <div className="project-motif-visual project-motif-biology">
      <div className="biology-specimen-line" />
      <div className="biology-specimen-label">notes</div>
      <div className="biology-specimen-label">events</div>
      <div className="biology-specimen-label">resources</div>
    </div>
  );
}

function CsMotif() {
  return (
    <div className="project-motif-visual project-motif-cs">
      <div className="cs-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function NatureMotif() {
  return (
    <div className="project-motif-visual project-motif-nature">
      <div className="nature-journal-page">
        <div className="nature-camera-mark" />
        <div className="nature-leaf-mark" />
        <div className="nature-contact-strip">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function ProjectMotif({ project }: ProjectMotifProps) {
  return (
    <div className={`project-motif-shell project-motif-shell-${project.theme}`}>
      <div className="project-motif-copy">
        <p className="eyebrow">{project.motifLabel}</p>
        <p className="page-copy mt-2 max-w-2xl">{project.motifHint}</p>
      </div>

      {project.theme === "wastewater" ? <WastewaterMotif /> : null}
      {project.theme === "civic" ? <CivicMotif /> : null}
      {project.theme === "portfolio" ? <PortfolioMotif /> : null}
      {project.theme === "biology" ? <BiologyMotif /> : null}
      {project.theme === "cs" ? <CsMotif /> : null}
      {project.theme === "nature" ? <NatureMotif /> : null}
    </div>
  );
}
