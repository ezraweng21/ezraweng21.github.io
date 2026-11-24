"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { personalPhotos } from "@/data/personal";
import { PhotoViewer } from "@/components/photo-viewer";

export function PhotoOverture() {
  const photos = personalPhotos.slice(0, 24);
  const slots = photos.length ? photos : Array.from({ length: 24 }, () => undefined);
  const [selected, setSelected] = useState<number | null>(null);
  const [pattern, setPattern] = useState("Scatter");
  const [shuffle, setShuffle] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return <section className="photo-overture photo-overture-unboxed" aria-label="Personal photo collage">
    <div className="overture-topline"><a href="#collections">Browse collections</a><button onClick={() => setShuffle((value) => value + 1)}>Shuffle</button></div>
    <div className="overture-patterns" role="group" aria-label="Photo patterns">{["Fan", "Scatter", "Ribbon", "Contact sheet"].map((name) => <button key={name} aria-pressed={pattern === name} onClick={() => setPattern(name)}>{name}</button>)}</div>
    <div className="overture-fan overture-playground" data-pattern={pattern} ref={stage}>
      {slots.map((photo, index) => {
        const slot = (index + shuffle * 5) % slots.length;
        const column = slot % 4;
        const row = Math.floor(slot / 4);
        const rows = Math.ceil(slots.length / 4);
        const top = (row + .5) * 100 / rows;
        const layout = pattern === "Scatter" ? { left: `${9 + column * 27 + Math.sin(slot * 3) * 4}%`, top: `${top + Math.cos(slot * 2) * 2}%`, rotate: Math.sin(slot * 7 + 2) * 17, scale: [.95, 1.15, .84, 1.05][slot % 4] }
          : pattern === "Contact sheet" ? { left: `${13 + column * 25}%`, top: `${top}%`, rotate: 0, scale: .85 }
          : pattern === "Ribbon" ? { left: `${50 + Math.sin(slot * .8) * 34}%`, top: `${5 + slot / Math.max(slots.length - 1, 1) * 90}%`, rotate: Math.cos(slot * .8) * 20, scale: .95 }
          : { left: `${50 + (column - 1.5) * 18}%`, top: `${top + Math.abs(column - 1.5) * 2}%`, rotate: (column - 1.5) * 16, scale: 1 };
        return <motion.button key={photo?.src ?? index} className="overture-print" aria-label={photo ? `Enlarge ${photo.alt}` : `Photo placeholder ${index + 1}`} style={{ zIndex: index + 1, x: "-50%", y: "-50%" }}
        animate={layout}
        drag={!reduced} dragConstraints={stage} dragElastic={.08} dragSnapToOrigin dragMomentum={false}
        whileDrag={{ scale: 1.1, zIndex: 30, cursor: "grabbing" }}
        whileHover={reduced ? undefined : { rotate: 0, scale: 1.12, zIndex: 20 }} whileFocus={reduced ? undefined : { rotate: 0, scale: 1.12, zIndex: 20 }}
        transition={{ duration: reduced ? 0 : .6, ease: [.22, 1, .36, 1] }} onClick={() => { if (photo) setSelected(index); }}>
        <span className="overture-photo">{photo ? <Image src={photo.src} alt="" fill sizes="(max-width: 600px) 140px, 260px" /> : <span>Your photo</span>}</span>{photo && <span className="overture-name">{photo.caption || photo.alt}</span>}
      </motion.button>; })}
    </div>
    <p className="overture-hint">{photos.length ? "Drag a print to move it. Select a photograph to look closer." : "These spaces are for your personal photographs. Try dragging or shuffling them."}</p>
    <PhotoViewer photos={photos.map((photo) => ({ src: photo.src, alt: photo.alt }))} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)} />
  </section>;
}
