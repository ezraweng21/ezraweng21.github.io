import type { ReactNode } from "react";

type SectionWrapperProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionWrapper({
  eyebrow,
  title,
  description,
  children,
}: SectionWrapperProps) {
  return (
    <section className="py-6 sm:py-8">
      <div className="border-b border-[#dec3ae] pb-6">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-3xl text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
          {description}
        </p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
