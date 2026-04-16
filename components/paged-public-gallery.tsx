"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { ArchiveLightbox } from "@/components/archive-lightbox";
import type { PublicGalleryImage } from "@/lib/public-gallery";

type PagedPublicGalleryProps = {
  images: PublicGalleryImage[];
  placeholderCount?: number;
  perPage?: number;
  variant?: "nature" | "photography";
};

const DEFAULT_PLACEHOLDERS = Array.from({ length: 60 }).map((_, index) => ({
  alt: `Photo placeholder ${index + 1}`,
  name: `placeholder-${index + 1}`,
  src: "",
}));

export function PagedPublicGallery({
  images,
  placeholderCount = 60,
  perPage = 24,
  variant = "nature",
}: PagedPublicGalleryProps) {
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = images.length
    ? images
    : DEFAULT_PLACEHOLDERS.slice(0, placeholderCount);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  const visibleItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  const selectedImage =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length
      ? items[selectedIndex]
      : null;

  function openImageByName(name: string) {
    const index = items.findIndex((image) => image.name === name && image.src);

    if (index >= 0) {
      setSelectedIndex(index);
    }
  }

  function moveSelection(direction: -1 | 1) {
    if (selectedIndex === null) {
      return;
    }

    const sourceIndex = selectedIndex;
    const total = items.length;

    for (let offset = 1; offset <= total; offset += 1) {
      const nextIndex = (sourceIndex + direction * offset + total) % total;
      if (items[nextIndex]?.src) {
        setSelectedIndex(nextIndex);
        return;
      }
    }
  }

  return (
    <div className={`paged-gallery-shell paged-gallery-shell-${variant}`}>
      <div className={`compact-gallery-grid compact-gallery-grid-${variant}`}>
        {visibleItems.map((image) => (
          <button
            key={image.name}
            type="button"
            className={`compact-gallery-item compact-gallery-button compact-gallery-item-${variant}`}
            onClick={() => openImageByName(image.name)}
            disabled={!image.src}
          >
            {image.src ? (
              <div className="compact-gallery-frame">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1536px) 10vw, (min-width: 1200px) 12vw, (min-width: 768px) 18vw, 46vw"
                />
              </div>
            ) : (
              <div className="compact-gallery-placeholder">
                <span className="page-meta">{image.alt}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="compact-grid-footer mt-4">
        <p className="page-meta">
          Page {page} of {totalPages}
        </p>
        <div className="compact-grid-controls">
          <button
            type="button"
            className="compact-grid-control"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="compact-grid-control"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {selectedImage?.src ? (
        <ArchiveLightbox
          src={selectedImage.src}
          alt={selectedImage.alt}
          caption={selectedImage.alt}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() => moveSelection(-1)}
          onNext={() => moveSelection(1)}
        />
      ) : null}
    </div>
  );
}
