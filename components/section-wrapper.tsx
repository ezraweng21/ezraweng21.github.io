import type { ReactNode } from "react";

type SectionWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionWrapper({
  title,
  description,
  children,
}: SectionWrapperProps) {
  return (
    <section className="page-section">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {children}
    </section>
  );
}
