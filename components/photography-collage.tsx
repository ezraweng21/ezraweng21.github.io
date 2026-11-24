"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { useRef, useState } from "react";
import { personalPhotos, photoCollections } from "@/data/personal";
import { NatureObservations } from "@/components/nature-observations";
import { PhotoOverture } from "@/components/photo-overture";
import { SelfieFilmstrip } from "@/components/selfie-filmstrip";

export function PhotoAlbum({ album, collage, compact = false }: { album: (typeof photoCollections)[number]; collage: boolean; compact?: boolean }) {
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(18);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const photos = personalPhotos.filter((photo) => photo.collection === album.id && (category === "All" || photo.category === category));
  const slots = photos.length ? photos.slice(0, limit) : Array.from({ length: compact ? 0 : album.id === "nature" ? 12 : 9 }, () => undefined);
  const active = photos[selected];
  function step(direction: number) {
    if (photos.length) setSelected((current) => (current + direction + photos.length) % photos.length);
  }

  return <section className="archive-album" id={album.id} aria-label={album.title}>
    {!compact && <header className="archive-album-heading"><h2>{album.title}</h2><a href="#collections">Back to collections</a></header>}
    <div className="archive-filters" role="group" aria-label={`${album.title} categories`}>
      {["All", ...album.categories].map((name) => <button key={name} aria-pressed={category === name} onClick={() => { setCategory(name); setLimit(18); }}>{name}</button>)}
    </div>
    <p className="archive-context" aria-live="polite">{photos.length ? `Showing ${Math.min(limit, photos.length)} of ${photos.length} photographs.` : `${category === "All" ? album.title : category}: your photographs will appear here.`}</p>
    <div className={`photo-collection ${collage ? "photo-collection-loose" : ""}`}>
      {slots.map((photo, index) => <motion.figure layout initial={false} animate={{ rotate: collage ? [-4, 3, -2, 2, -3, 4][index % 6] : 0, y: collage && index % 2 ? 14 : 0 }} key={`${photo?.src ?? category}-${index}`} className="photo-print">
        {photo ? <button className="photo-print-image" aria-label={`Enlarge ${photo.alt}`} onClick={() => { setSelected(index); dialog.current?.showModal(); }}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 600px) 45vw, 25vw" /></button> : <div className="photo-print-image"><span>{category === "All" ? album.categories[index % album.categories.length] : category}</span></div>}
        {photo && <figcaption>{photo.caption || photo.alt}</figcaption>}
      </motion.figure>)}
    </div>
    {photos.length > limit && <button className="archive-more" onClick={() => setLimit((current) => current + 18)}>Show more photographs</button>}
    <dialog ref={dialog} className="archive-lightbox" aria-label={`${album.title} photograph viewer`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      <button autoFocus onClick={() => dialog.current?.close()}>Close</button>
      {active && <><div className="archive-full-image"><Image src={active.src} alt={active.alt} fill sizes="90vw" /></div><p>{active.caption || active.alt}</p><div className="archive-lightbox-controls"><button onClick={() => step(-1)}>Previous</button><button onClick={() => step(1)}>Next</button></div></>}
    </dialog>
  </section>;
}

export function PhotographyCollage() {
  const [collage, setCollage] = useState(false);
  return <MotionConfig reducedMotion="user" transition={{ duration: .5, ease: [.22, 1, .36, 1] }}>
    <SelfieFilmstrip />
    <PhotoOverture />
    <nav id="collections" className="album-shelf archive-collection-shelf" aria-label="Photography collections">
      {photoCollections.map((album) => {
        const cover = personalPhotos.find((photo) => photo.collection === album.id);
        return <a key={album.id} className="album-cover" href={`#${album.id}`}>
          <span className="album-stack">{cover ? <Image src={cover.src} alt="" fill sizes="25vw" /> : <span>Your cover photo</span>}</span>
          <span>{album.title}</span>
        </a>;
      })}
    </nav>
    <div className="archive-toolbar archive-sticky-toolbar">
      <a className="archive-all" href="#observations">iNaturalist observations</a>
      <div className="photo-arrangement" role="group" aria-label="Photo arrangement">
        <button aria-pressed={!collage} onClick={() => setCollage(false)}>Gallery</button>
        <button aria-pressed={collage} onClick={() => setCollage(true)}>Collage</button>
      </div>
    </div>
    {photoCollections.map((album) => <PhotoAlbum key={album.id} album={album} collage={collage} />)}
    <NatureObservations />
  </MotionConfig>;
}
