"use client";

import Image from "next/image";
import { useState } from "react";
import "./portrait-lens.css";

const bladeColors = ["#514137","#5b4537","#634b3c","#5a4435","#69503e","#564133","#604937","#53453b"];
const sector = 360 / bladeColors.length;
const sweep = { dur: "1.4s", calcMode: "spline", keyTimes: "0;1", keySplines: ".36 0 .22 1", fill: "freeze" } as const;

function bladePath(radius: number) {
  const rim = 76;
  const point = (r: number, deg: number) => {
    const a = deg * Math.PI / 180;
    return `${50 + r * Math.cos(a)} ${50 + r * Math.sin(a)}`;
  };
  // Both sides use the same spiral seam, one sector apart and traced in reverse.
  const seam = (angle: number) => [
    point(radius, angle - 42), point(radius + (rim - radius) * .33, angle - 36),
    point(radius + (rim - radius) * .74, angle - 19), point(rim, angle),
  ];
  const [a,b,c,d] = seam(0);
  const [e,f,g,h] = seam(sector);
  return `M${a} C${b} ${c} ${d} A${rim} ${rim} 0 0 1 ${h} C${g} ${f} ${e} Z`;
}

const closedBlade = bladePath(0);
const openBlade = bladePath(62);

export function PortraitLens({ src }: { src: string }) {
  const [exposure, setExposure] = useState(0);
  return <div className="exposure-stage">
    <div key={`frame-${exposure}`} className="lens-furniture" aria-hidden="true">
      <i className="finder-corner nw"/><i className="finder-corner ne"/>
      <i className="finder-corner sw"/><i className="finder-corner se"/>
      <span className="lens-readout frame-count">FRAME / {String(exposure + 1).padStart(2, "0")}</span>
      <span className="lens-readout focus-indicator"><i/> AF</span>
      <div className="light-meter">
        <span>−</span><i/><b/><span>+</span>
      </div>
    </div>
    <div className="portrait-instrument">
      <svg className="focus-scale" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="none" stroke="#b59b83" strokeWidth=".35"/>
        {Array.from({length:60}, (_,i) => <path key={i} d={i % 5 ? "M60 4v1.5" : "M60 4v3.4"}
          transform={`rotate(${i * 6} 60 60)`} stroke={i === 0 ? "#a34826" : "#8b755f"} strokeWidth={i === 0 ? 1.4 : .5}/>)}
      </svg>
      <figure className="portrait-medallion">
        {src ? <Image src={src} alt="Ezra Weng" width={480} height={560} priority /> :
          <div className="portrait-monogram" role="img" aria-label="Placeholder for Ezra's portrait">EW</div>}
        <svg key={exposure} className="portrait-iris" viewBox="0 0 100 100" aria-hidden="true">
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-32 50 50;54 50 50" {...sweep}/>
            {bladeColors.map((fill,i) =>
            <g key={fill} transform={`rotate(${sector*i} 50 50)`}>
              <path fill={fill} stroke="#ad9177" strokeWidth=".32" strokeLinejoin="round" d={openBlade}>
                <animate attributeName="d" values={`${closedBlade};${openBlade}`} {...sweep}/>
              </path>
            </g>)}</g>
        </svg>
      </figure>
      <button className="exposure-trigger" type="button" onClick={() => setExposure(n=>n+1)} aria-label="Replay portrait shutter" title="Replay portrait shutter">
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.45" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>{Array.from({length:6}, (_,i)=><path key={i} d="m12 8 7.5 0" transform={`rotate(${i*60} 12 12)`}/>)}
        </svg>
      </button>
    </div>
  </div>;
}
