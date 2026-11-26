import Link from "next/link";
import { WatchPanels } from "@/components/watch-panels";

export const metadata = { title: "Anime & shows" };

export default function AnimeAndShowsPage() {
  return <div className="folio interest-journal">
    <Link href="/personal#watch-shelf">Back to interests</Link>
    <h1>Anime &amp; shows</h1>
    <WatchPanels />
  </div>;
}
