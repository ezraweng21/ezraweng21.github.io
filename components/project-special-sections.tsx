import Link from "next/link";

import { CompactObservationGrid } from "@/components/compact-observation-grid";
import { PagedPublicGallery } from "@/components/paged-public-gallery";
import type { ProjectEntry } from "@/data/projects";
import { extractINaturalistUserLogin } from "@/lib/inaturalist";
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
            Multi-year wastewater surveillance workflow for tracking norovirus
            abundance and genotype turnover across Texas sites.
          </p>
        </div>

        <div className="wastewater-stage-list mt-5">
          <div className="wastewater-stage">
            <span className="page-meta">01</span>
            <div>
              <h3 className="text-lg text-ink">Data intake</h3>
              <p className="page-copy mt-2">
                Longitudinal viral abundance data collected across 16 sites in
                multiple Texas cities, paired with genotype-level records such
                as GII.4 and GII.17.
              </p>
            </div>
          </div>
          <div className="wastewater-stage">
            <span className="page-meta">02</span>
            <div>
              <h3 className="text-lg text-ink">Processing pipeline</h3>
              <p className="page-copy mt-2">
                Time-series analysis, comparative strain tracking, and
                reproducible visualization workflows built in R, tidyverse,
                ggplot2, and R Markdown.
              </p>
            </div>
          </div>
          <div className="wastewater-stage">
            <span className="page-meta">03</span>
            <div>
              <h3 className="text-lg text-ink">Dashboard output</h3>
              <p className="page-copy mt-2">
                Site-level and cross-site views designed to surface genotype
                replacement, seasonal dynamics, and localized differences in
                strain composition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-special-block">
        <div className="project-special-header">
          <p className="eyebrow">Key Findings</p>
          <p className="page-copy mt-2">
            Main patterns observed from the wastewater-based norovirus
            surveillance analysis.
          </p>
        </div>

        <div className="monitoring-panel-grid mt-5">
          <div className="monitoring-panel">
            <span className="page-meta">Genotype shift</span>
            <p className="page-copy mt-3">
              Observed a shift in dominant genotypes from GII.4 to GII.17
              across multiple sites.
            </p>
          </div>
          <div className="monitoring-panel">
            <span className="page-meta">Temporal dynamics</span>
            <p className="page-copy mt-3">
              Detected recurring temporal patterns consistent with seasonal or
              cyclical behavior.
            </p>
          </div>
          <div className="monitoring-panel monitoring-panel-wide">
            <span className="page-meta">Spatial variation</span>
            <p className="page-copy mt-3">
              Site-specific strain composition and rapid turnover suggest
              localized transmission differences and possible immune or
              evolutionary pressure shaping replacement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

async function NatureSections({ project }: { project: ProjectEntry }) {
  const inaturalistLink = project.links?.find((link) => link.label === "iNaturalist");
  const inaturalistUserLogin = extractINaturalistUserLogin(inaturalistLink?.href);
  const natureImages = await getPublicGalleryImages("nature");
  const photographyImages = await getPublicGalleryImages("photography");

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

        <div className="mt-5">
          <PagedPublicGallery
            images={natureImages}
            placeholderCount={72}
            perPage={30}
            variant="nature"
          />
        </div>
      </section>

      <section className="project-special-block">
        <div className="project-special-header">
          <p className="eyebrow">Photography Archive</p>
          <p className="page-copy mt-2">
            Use `public/galleries/photography/` for a looser second archive.
            This section can hold whatever you want to upload without needing a
            strict taxonomy first.
          </p>
        </div>

        <div className="mt-5">
          <PagedPublicGallery
            images={photographyImages}
            placeholderCount={60}
            perPage={30}
            variant="photography"
          />
        </div>
      </section>

      <section className="project-special-block">
        <div className="project-special-header">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">iNaturalist Observations</p>
              <p className="page-copy mt-2">
                Keep this as a separate archive view for observations, species,
                and field records.
              </p>
            </div>
            {inaturalistLink ? (
              <Link href={inaturalistLink.href} className="home-inline-link">
                Open iNaturalist
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <CompactObservationGrid
            href={inaturalistLink?.href}
            userLogin={inaturalistUserLogin}
            perPage={30}
            totalItems={90}
          />
        </div>
      </section>
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
