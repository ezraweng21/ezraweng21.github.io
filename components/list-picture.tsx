import Image from "next/image";

export function ListPicture({ src, alt }: { src?: string; alt: string }) {
  return (
    <figure className="experience-cutout">
      {src ? <Image src={src} alt={alt} width={240} height={240} /> : (
        <svg aria-hidden="true" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="11" y="15" width="42" height="34" rx="2" />
          <circle cx="24" cy="26" r="4" />
          <path d="m12 45 12-12 8 7 9-13 12 16" />
        </svg>
      )}
    </figure>
  );
}
