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
    <section className="py-5 sm:py-7">
      <div className="border-b border-[#dec3ae] pb-5 sm:pb-6">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-[2rem] leading-tight text-ink sm:text-[2.55rem]">
          {title}
        </h1>
        <p className="page-copy mt-3 max-w-2xl">{description}</p>
      </div>
      <div className="mt-7 sm:mt-8">{children}</div>
    </section>
  );
}
