"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { PublicGalleryImage } from "@/lib/public-gallery";

type PagedPublicGalleryProps = {
  images: PublicGalleryImage[];
  placeholderCount?: number;
  perPage?: number;
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
}: PagedPublicGalleryProps) {
  const [page, setPage] = useState(1);
  const items = images.length
    ? images
    : DEFAULT_PLACEHOLDERS.slice(0, placeholderCount);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  const visibleItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  return (
    <div>
      <div className="compact-gallery-grid">
        {visibleItems.map((image, index) => (
          <figure
            key={image.name}
            className={`compact-gallery-item ${
              index % 10 === 0 ? "compact-gallery-item-wide" : ""
            } ${index % 14 === 0 ? "compact-gallery-item-tall" : ""}`}
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
          </figure>
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
    </div>
  );
}
