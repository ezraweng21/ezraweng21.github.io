"use client";
import { useState } from "react";
import Link from "next/link";
import { photoCollections } from "@/data/personal";
import { PhotoAlbum } from "./photography-collage";
export function AlbumIndex() {
  const [open, setOpen] = useState("");
  return <><div className="albums">{photoCollections.map((album,i) => <section key={album.id}>
    <button type="button" onClick={() => setOpen(open === album.id ? "" : album.id)} aria-expanded={open === album.id} aria-controls={`album-${album.id}`}>
      <span className={`album-swab swab-${i}`} aria-hidden="true" /><strong>{album.title}</strong><span aria-hidden="true">{open === album.id ? "−" : "+"}</span>
    </button><div hidden={open !== album.id} id={`album-${album.id}`}>{open === album.id && <PhotoAlbum album={album} collage={false} compact />}</div>
  </section>)}</div><div className="photo-foot"><Link id="selfie-reel" href="/photography/archive#selfie-reel">Selfie film reel</Link><Link href="/photography/archive#observations">iNaturalist observations</Link><Link href="/photography/archive">Full collage archive</Link></div></>;
}
