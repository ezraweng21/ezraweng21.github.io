import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { personalPhotos } from "@/data/personal";

type PersonalGalleryProps = {
  variant?: "home" | "page";
};

export function PersonalGallery({ variant = "page" }: PersonalGalleryProps) {
  const slotCount = variant === "home" ? 4 : 6;
  const slots = Array.from({ length: slotCount }, (_, index) => personalPhotos[index]);

  return (
    <Link href="/photography" aria-label="Explore the photography gallery" className={`personal-gallery personal-gallery-${variant}`}>
      {slots.map((photo, index) => {
        const style = { "--slot": index } as CSSProperties;

        return photo ? (
          <figure key={photo.src} className="personal-photo" style={style}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="personal-photo-image"
              sizes={variant === "home" ? "(min-width: 992px) 24vw, 50vw" : "(min-width: 992px) 28vw, 50vw"}
            />
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ) : (
          <div
            key={`photo-slot-${index}`}
            className="personal-photo personal-photo-empty"
            style={style}
            aria-hidden="true"
          >
            {variant === "home" && index === 0 ? (
              <span className="personal-monogram">EW</span>
            ) : (
              <span className="personal-photo-mat" />
            )}
          </div>
        );
      })}
    </Link>
  );
}
