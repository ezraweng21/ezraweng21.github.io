import Image from "next/image";

import { getPublicGalleryImages } from "@/lib/public-gallery";

type PublicGalleryProps = {
  folder: string;
  emptyLabel: string;
};

export async function PublicGallery({
  folder,
  emptyLabel,
}: PublicGalleryProps) {
  const images = await getPublicGalleryImages(folder);

  if (!images.length) {
    return (
      <div className="gallery-wall">
        {Array.from({ length: 8 }).map((_, index) => (
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
            index % 5 === 0 ? "gallery-wall-item-wide" : ""
          } ${index % 7 === 0 ? "gallery-wall-item-tall" : ""}`}
        >
          <div className="gallery-wall-frame">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
