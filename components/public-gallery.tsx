import Image from "next/image";

import { getPublicGalleryImages } from "@/lib/public-gallery";

type PublicGalleryProps = {
  folder: string;
  emptyLabel: string;
  placeholderCount?: number;
};

export async function PublicGallery({
  folder,
  emptyLabel,
  placeholderCount = 18,
}: PublicGalleryProps) {
  const images = await getPublicGalleryImages(folder);

  if (!images.length) {
    return (
      <div className="gallery-wall">
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div key={index} className="gallery-wall-item gallery-wall-placeholder">
            <span className="page-meta">
              {emptyLabel} {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="gallery-wall">
      {images.map((image, index) => (
        <figure
          key={image.src}
          className={`gallery-wall-item ${
            index % 9 === 0 ? "gallery-wall-item-wide" : ""
          } ${index % 11 === 0 ? "gallery-wall-item-tall" : ""}`}
        >
          <div className="gallery-wall-frame">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1536px) 14vw, (min-width: 1200px) 18vw, (min-width: 768px) 24vw, 46vw"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
