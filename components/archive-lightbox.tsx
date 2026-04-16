"use client";

import Image from "next/image";
import { useEffect } from "react";

type ArchiveLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  meta?: string[];
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
};

export function ArchiveLightbox({
  src,
  alt,
  caption,
  meta,
  onClose,
  onNext,
  onPrevious,
}: ArchiveLightboxProps) {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight" && onNext) {
        onNext();
      }

      if (event.key === "ArrowLeft" && onPrevious) {
        onPrevious();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="archive-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <div
        className="archive-lightbox-shell"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="archive-lightbox-toolbar">
          <div className="archive-lightbox-nav">
            {onPrevious ? (
              <button
                type="button"
                className="archive-lightbox-control"
                onClick={onPrevious}
                aria-label="Previous image"
              >
                Prev
              </button>
            ) : null}
            {onNext ? (
              <button
                type="button"
                className="archive-lightbox-control"
                onClick={onNext}
                aria-label="Next image"
              >
                Next
              </button>
            ) : null}
          </div>

          <button
            type="button"
            className="archive-lightbox-close"
            onClick={onClose}
            aria-label="Close image"
          >
            Close
          </button>
        </div>

        <div className="archive-lightbox-media">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {caption || (meta && meta.length > 0) ? (
          <div className="archive-lightbox-copy">
            {caption ? (
              <p className="archive-lightbox-caption">{caption}</p>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="archive-lightbox-meta">
                {meta.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
