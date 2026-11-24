"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

export type ViewerPhoto = { src: string; alt: string; href?: string };

export function PhotoViewer({ photos, selected, onSelect, onClose }: { photos: ViewerPhoto[]; selected: number | null; onSelect: (index: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const photo = selected === null ? undefined : photos[selected];
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  function step(direction: number) {
    if (selected !== null && photos.length) onSelect((selected + direction + photos.length) % photos.length);
  }
  return <dialog ref={dialog} className="immersive-viewer" aria-label="Photograph viewer" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); }
  }}>
    <button className="viewer-close" autoFocus onClick={onClose}>Close</button>
    {photo && <><motion.div key={photo.src} className="viewer-image" initial={reduced ? false : { opacity: .5, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .25 }}>{photo.src ? <Image src={photo.src} alt={photo.alt} fill sizes="95vw" /> : <p>No photograph is available for this observation.</p>}</motion.div>
      <div className="viewer-caption"><p>{photo.alt}</p>{photo.href && <a href={photo.href} target="_blank" rel="noreferrer">Original observation</a>}</div>
      <div className="viewer-controls"><button onClick={() => step(-1)} aria-label="Previous photograph">Previous</button><span>{(selected ?? 0) + 1} / {photos.length}</span><button onClick={() => step(1)} aria-label="Next photograph">Next</button></div></>}
  </dialog>;
}
