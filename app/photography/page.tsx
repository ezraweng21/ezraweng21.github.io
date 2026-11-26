import { AlbumIndex } from "@/components/album-index";
export const metadata = { title: "Photos" };
export default function PhotosPage() {
  return <div className="folio"><h1>Photos</h1>
    <p className="lead">I photograph butterflies, flowers, and other wildlife and record my observations on iNaturalist.</p>
    <AlbumIndex />
  </div>;
}
