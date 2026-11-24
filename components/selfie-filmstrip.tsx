"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { personalPhotos } from "@/data/personal";
import { PhotoViewer } from "@/components/photo-viewer";
import "@/app/filmstrip.css";

export function SelfieFilmstrip() {
  const photos = personalPhotos.filter((photo) => photo.collection === "portraits" && photo.category === "Selfies");
  const slots = photos.length ? photos : Array.from({ length: 16 }, () => undefined);
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [speed, setSpeed] = useState(400);
  const [effect, setEffect] = useState("Zoom cut");
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible || selected !== null) return;
    const timer = setInterval(() => { if (!document.hidden) setActive((index) => (index + 1) % slots.length); }, speed);
    return () => clearInterval(timer);
  }, [playing, reduced, visible, selected, speed, slots.length]);
  function move(step: number) { setPlaying(false); setActive((index) => (index + step + slots.length) % slots.length); }
  const photo = slots[active];
  return <section className="selfie-cinema" aria-labelledby="selfie-heading" id="selfie-reel">
    <header className="selfie-heading"><div><h2 id="selfie-heading">Selfies, on film</h2><p>{photos.length ? "A reel of personal photographs." : "Your selfie edit. Photographs will go here."}</p></div><button onClick={() => setPlaying(!playing)} disabled={Boolean(reduced)} aria-pressed={playing}>{playing ? "Pause" : "Play edit"}</button></header>
    <div className="film-controls"><button onClick={() => move(-1)}>Previous</button><button onClick={() => move(1)}>Next</button><label>Pace<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value={800}>Relaxed / 0.8s</option><option value={400}>Quick / 0.4s</option><option value={250}>Rapid / 0.25s</option></select></label><label>Transition<select value={effect} onChange={(event) => setEffect(event.target.value)}>{["Zoom cut", "Slide cut", "Tilt cut"].map((name) => <option key={name}>{name}</option>)}</select></label></div>
    <div className="selfie-edit-stage" ref={stage} role="region" aria-label="Focused selfie slideshow" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
      {slots.map((item, index) => {
        // Stable keys let the same print travel from the side through the focus point.
        let offset = (index - active + slots.length) % slots.length;
        if (offset > slots.length / 2) offset -= slots.length;
        const focused = offset === 0;
        const near = Math.abs(offset) <= 2;
        return <motion.div key={index} className="selfie-focus selfie-moving-frame" data-tint={index % 3} aria-hidden={!focused} initial={false}
          style={{ zIndex: focused ? 5 : Math.max(0, 3 - Math.abs(offset)), pointerEvents: focused ? "auto" : "none" }}
          animate={{ x: `${offset * 92}%`, scale: focused ? 1 : effect === "Zoom cut" ? .78 : .88, rotate: effect === "Tilt cut" ? offset * 8 : 0, opacity: near ? focused ? 1 : .8 : 0, filter: focused ? "blur(0px)" : "blur(2.5px)" }}
          transition={{ duration: reduced || !near ? 0 : Math.min(.24, speed / 1000 * .7), ease: [.22, 1, .36, 1] }}>
          {item ? <button tabIndex={focused ? 0 : -1} aria-label={`Enlarge ${item.alt}`} onClick={() => { setSelected(index); setPlaying(false); }}><Image src={item.src} alt={focused ? item.alt : ""} fill sizes="(max-width: 600px) 45vw, 350px" /></button> : <div className="selfie-focus-placeholder"><span>Your selfie</span><strong>{String(index + 1).padStart(2, "0")}</strong></div>}
        </motion.div>;
      })}
      <div className="selfie-edit-caption"><span>{String(active + 1).padStart(2, "0")} / {slots.length}</span><span>{photo?.caption || (photos.length ? photo?.alt : "Photo placeholder")}</span></div>
    </div>
    <div className="selfie-frame-picker" role="group" aria-label="Choose a selfie frame">{slots.map((_, index) => <button key={index} aria-label={`Frame ${index + 1}`} aria-pressed={active === index} onClick={() => { setPlaying(false); setActive(index); }}>{String(index + 1).padStart(2, "0")}</button>)}</div>
    <p className="film-help">{reduced ? "Motion is reduced. Use the frame buttons or arrow keys to browse." : "One frame in focus. Play the edit, switch transitions, or select any frame below."}</p>
    <PhotoViewer photos={photos.map((item) => ({ src: item.src, alt: item.caption || item.alt }))} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)} />
  </section>;
}
