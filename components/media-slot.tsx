import Image from "next/image";

type MediaSlotProps = {
  alt: string;
  label: string;
  hint?: string;
  src?: string;
  ratio?: "portrait" | "landscape" | "wide";
  className?: string;
};

const ratioClasses = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
};

export function MediaSlot({
  alt,
  label,
  hint,
  src,
  ratio = "landscape",
  className = "",
}: MediaSlotProps) {
  return (
    <div className={`border border-[#d8b6a0] bg-[#f8ecdf] ${className}`.trim()}>
      <div className="flex items-center justify-between border-b border-[#e5cdbd] px-3 py-2">
        <span className="page-meta">{label}</span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#aa6d46]">
          {src ? "Image" : "Placeholder"}
        </span>
      </div>

      <div className={`relative ${ratioClasses[ratio]}`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-end bg-[linear-gradient(180deg,#f8ecdf_0%,#efd6bd_100%)] p-4">
            <div>
              <p className="text-base text-ink">{alt}</p>
              {hint ? (
                <p className="mt-2 max-w-sm text-sm leading-6 text-ink/70">
                  {hint}
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
