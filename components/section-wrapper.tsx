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
    <section className="panel px-6 py-8 sm:px-8 sm:py-10">
      <div className="max-w-3xl">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-3xl text-ink sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-ink/70 sm:text-lg">
          {description}
        </p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
