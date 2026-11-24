"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function PortraitFrame({ src, alt = "Portrait of Ezra Weng", candid, interactive = false }: { src?: string; alt?: string; candid?: string; interactive?: boolean }) {
  const reduced = useReducedMotion();
  const [showCandid, setShowCandid] = useState(false);
  const image = showCandid ? candid : src;
  return <motion.figure className="portrait-frame" whileHover={reduced ? undefined : { rotate: -2, y: -4 }} transition={{ duration: .3 }}>
    <div className={`portrait-frame-image ${interactive ? "portrait-viewfinder" : ""}`}>{image ? <Image src={image} alt={showCandid ? "Candid photograph of Ezra Weng" : alt} fill sizes="(max-width: 700px) 85vw, 400px" /> : <span aria-hidden="true">{showCandid ? "Candid photo" : "EW"}</span>}</div>
    <figcaption>{image ? "Ezra Weng" : showCandid ? "Your candid photograph" : "Your headshot"}</figcaption>
    {interactive && <button className="portrait-switch" aria-pressed={showCandid} onClick={() => setShowCandid(!showCandid)}>{showCandid ? "Show headshot" : "Show candid"}</button>}
  </motion.figure>;
}
