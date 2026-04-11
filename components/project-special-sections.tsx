import { NatureArchiveSwitcher } from "@/components/nature-archive-switcher";
import type { ProjectEntry } from "@/data/projects";
import { getPublicGalleryImages } from "@/lib/public-gallery";

type ProjectSpecialSectionsProps = {
  project: ProjectEntry;
};

function WastewaterSections() {
  return (
    <>
      <section className="project-special-block project-special-wastewater">
        <div className="project-special-header">
          <p className="eyebrow">Flow Outline</p>
          <p className="page-copy mt-2">
            Use this section for the project flow: source data, processing,
            dashboard layers, and what the system is meant to help reveal.
          </p>
        </div>

        <div className="wastewater-stage-list mt-5">
          <div className="wastewater-stage">
            <span className="page-meta">01</span>
            <div>
              <h3 className="text-lg text-ink">Data intake</h3>
              <p className="page-copy mt-2">
                Add notes here for sample sources, sequencing outputs, or data
                collection context.
              </p>
            </div>
          </div>
          <div className="wastewater-stage">
            <span className="page-meta">02</span>
            <div>
              <h3 className="text-lg text-ink">Processing pipeline</h3>
              <p className="page-copy mt-2">
                Add notes here for normalization, aggregation, genotype
                handling, or other processing steps.
              </p>
            </div>
          </div>
          <div className="wastewater-stage">
            <span className="page-meta">03</span>
            <div>
              <h3 className="text-lg text-ink">Dashboard output</h3>
              <p className="page-copy mt-2">
                Add notes here for views, signals, and the kinds of patterns
                the dashboard makes easier to inspect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-special-block">
        <div className="project-special-header">
          <p className="eyebrow">Monitoring Panels</p>
          <p className="page-copy mt-2">
            Use this area for screenshots or descriptions of the main views you
            want to show.
          </p>
        </div>

        <div className="monitoring-panel-grid mt-5">
          <div className="monitoring-panel">
            <span className="page-meta">Panel A</span>
            <p className="page-copy mt-3">
              Add a chart or screenshot placeholder here.
            </p>
          </div>
          <div className="monitoring-panel">
            <span className="page-meta">Panel B</span>
            <p className="page-copy mt-3">
              Add a chart or screenshot placeholder here.
            </p>
          </div>
          <div className="monitoring-panel monitoring-panel-wide">
            <span className="page-meta">Panel C</span>
            <p className="page-copy mt-3">
              Add a larger dashboard or trend view here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

async function NatureSections({ project }: { project: ProjectEntry }) {
  const inaturalistLink = project.links?.find((link) => link.label === "iNaturalist");
  const natureImages = await getPublicGalleryImages("nature");

  return (
    <>
      <section className="project-special-block project-special-nature">
        <div className="project-special-header">
          <p className="eyebrow">Field Journal Layout</p>
          <p className="page-copy mt-2">
            Use this page for a mix of photos, notes, observations, and
            smaller field records instead of a standard project case study.
          </p>
        </div>

        <div className="nature-journal-grid mt-5">
          <div className="nature-journal-note">
            <p className="page-meta">Journal note</p>
            <p className="page-copy mt-3">
              Add a short field note, reflection, or page intro here.
            </p>
          </div>
          <div className="nature-gallery-block">
            <span className="page-meta">Gallery strip</span>
            <div className="nature-gallery-strip mt-3">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </section>

      <section className="project-special-block">
        <div className="project-special-header">
          <p className="eyebrow">Photo Gallery</p>
          <p className="page-copy mt-2">
            Add images in bulk by dropping them into `public/galleries/nature/`.
          </p>
        </div>
      </section>

      <NatureArchiveSwitcher
        images={natureImages}
        inaturalistHref={inaturalistLink?.href}
      />
    </>
  );
}

export async function ProjectSpecialSections({
  project,
}: ProjectSpecialSectionsProps) {
  if (project.theme === "wastewater") {
    return <WastewaterSections />;
  }

  if (project.theme === "nature") {
    return <NatureSections project={project} />;
  }

  return null;
}
