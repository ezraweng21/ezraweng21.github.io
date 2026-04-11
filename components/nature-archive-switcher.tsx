"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { PublicGalleryImage } from "@/lib/public-gallery";

type NatureArchiveSwitcherProps = {
  images: PublicGalleryImage[];
  inaturalistHref?: string;
};

const GALLERY_PLACEHOLDERS = Array.from({ length: 20 }).map((_, index) => ({
  alt: `Photo placeholder ${index + 1}`,
  name: `placeholder-${index + 1}`,
  src: "",
}));

const OBSERVATION_PLACEHOLDERS = Array.from({ length: 18 }).map((_, index) => ({
  id: index + 1,
  title: `Observation placeholder ${String(index + 1).padStart(2, "0")}`,
}));

type ViewMode = "gallery" | "observations";

export function NatureArchiveSwitcher({
  images,
  inaturalistHref,
}: NatureArchiveSwitcherProps) {
  const [view, setView] = useState<ViewMode>("gallery");
  const [page, setPage] = useState(1);

  const galleryItems = images.length ? images : GALLERY_PLACEHOLDERS;
  const observationItems = OBSERVATION_PLACEHOLDERS;

  const galleryPerPage = 12;
  const observationsPerPage = 15;
  const totalPages = Math.max(
    1,
    Math.ceil(
      (view === "gallery" ? galleryItems.length : observationItems.length) /
        (view === "gallery" ? galleryPerPage : observationsPerPage),
    ),
  );

  const visibleGalleryItems = useMemo(() => {
    const start = (page - 1) * galleryPerPage;
    return galleryItems.slice(start, start + galleryPerPage);
  }, [galleryItems, page]);

  const visibleObservationItems = useMemo(() => {
    const start = (page - 1) * observationsPerPage;
    return observationItems.slice(start, start + observationsPerPage);
  }, [observationItems, page]);

  function switchView(nextView: ViewMode) {
    setView(nextView);
    setPage(1);
  }

  return (
    <section className="project-special-block">
      <div className="archive-switcher-header">
        <div>
          <p className="eyebrow">Archive</p>
          <p className="page-copy mt-2 max-w-2xl">
            Switch between a local photo gallery and an iNaturalist-style
            observation view without leaving the page.
          </p>
        </div>

        <div className="archive-switcher-tabs">
          <button
            type="button"
            className={`archive-switcher-tab ${
              view === "gallery" ? "archive-switcher-tab-active" : ""
            }`}
            onClick={() => switchView("gallery")}
          >
            Gallery
          </button>
          <button
            type="button"
            className={`archive-switcher-tab ${
              view === "observations" ? "archive-switcher-tab-active" : ""
            }`}
            onClick={() => switchView("observations")}
          >
            Observations
          </button>
        </div>
      </div>

      {view === "gallery" ? (
        <div className="archive-gallery-grid mt-6">
          {visibleGalleryItems.map((image, index) => (
            <figure
              key={image.name}
              className={`archive-gallery-item ${
                index % 6 === 0 ? "archive-gallery-item-wide" : ""
              } ${index % 8 === 0 ? "archive-gallery-item-tall" : ""}`}
            >
              {image.src ? (
                <div className="archive-gallery-frame">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1536px) 18vw, (min-width: 1200px) 22vw, (min-width: 768px) 28vw, 46vw"
                  />
                </div>
              ) : (
                <div className="archive-gallery-placeholder">
                  <span className="page-meta">{image.alt}</span>
                </div>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="archive-observation-grid mt-6">
          {visibleObservationItems.map((item) => (
            <article key={item.id} className="archive-observation-card">
              <div className="archive-observation-thumb" />
              <p className="page-meta mt-3">Observation</p>
              <p className="page-copy mt-2">{item.title}</p>
            </article>
          ))}
        </div>
      )}

      <div className="archive-switcher-footer mt-6">
        <div className="page-meta">
          Page {page} of {totalPages}
        </div>

        <div className="archive-switcher-controls">
          <button
            type="button"
            className="archive-switcher-control"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="archive-switcher-control"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
          >
            Next
          </button>
          {view === "observations" && inaturalistHref ? (
            <Link href={inaturalistHref} className="home-inline-link">
              Open iNaturalist
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
