import { displayYears } from "@/lib/display-years";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";

export function SelectedWork() {
  return <ol className="selected-work-list">
    {portfolioItems.map((item) => <li key={item.href}>
      <Link href={item.href}>
        <span className={`selected-work-image project-workbench portfolio-artifact-${item.theme}`} aria-hidden="true"><span className="workbench-sketch">Sketch</span><span className="workbench-window"><span className="workbench-window-bar">{item.category}</span><span>Your project screenshot</span></span></span>
        <span className="selected-work-copy"><span className="selected-work-category">{item.category}</span><strong>{item.title}</strong><span>{item.summary}</span><span className="selected-work-role">{item.role} · {displayYears(item.timeframe)}</span></span>
      </Link>
    </li>)}
  </ol>;
}
