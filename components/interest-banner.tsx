"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import "./interest-banner.css";

function FieldScene() {
  return <>
    <g className="field-world">
    <circle cx="263" cy="96" r="80" fill="#f0c978"/>
    <path d="M0 215Q85 152 161 181t157-15 122-25v100H0Z" fill="#83a68b"/>
    <g fill="none" stroke="#284e42" strokeWidth="4" strokeLinecap="round">
      <path d="M280 248q-8-75 18-117m-20 85q-29-7-47-36 35 8 47 36Zm4-27q31-11 45-37-30 9-45 37Z" fill="#436f53"/>
      <g fill="#fff2d4" strokeWidth="2">
        {[0,60,120,180,240,300].map(angle => <ellipse key={angle} cx="297" cy="113" rx="8" ry="16" transform={`rotate(${angle} 297 130)`}/>)}
        <circle cx="297" cy="130" r="9" fill="#b87438"/>
      </g>
    </g>
    <g className="field-wing" fill="#d17c42" stroke="#332e28" strokeWidth="2.5">
      <path d="M244 113Q204 93 204 62q26-3 43 43-4-40 16-56 17 22-13 66 21-12 22-3-7 25-25 10-16 15-29-2-6-14 26-7Z"/>
      <path d="m242 122 9-24m-3 9-30-32m31 32 13-40" fill="none"/>
    </g>
    </g>
    <g className="field-camera" stroke="#273c35" strokeWidth="3" strokeLinejoin="round">
      <path d="M185 73h22l9-14h45l9 14h35q8 0 8 8v60q0 8-8 8H185q-8 0-8-8V81q0-8 8-8Z" fill="#d4c5a1"/>
      <path d="M178 89h134v42H178Z" fill="#43594d"/>
      <rect x="185" y="64" width="16" height="8" rx="2" fill="#534a3a"/>
      <rect x="286" y="79" width="16" height="8" rx="2" fill="#ffedbb"/>
      <circle cx="249" cy="108" r="37" fill="#d4c5a1"/>
      <circle cx="249" cy="108" r="30" fill="#203e3b"/>
      <circle className="focus-light" cx="191" cy="82" r="3" fill="#8b6945" stroke="none"/>
      <circle className="lens-iris" cx="249" cy="108" r="19" fill="#527c71"/>
      <path d="M235 105q2-12 14-13" fill="none" stroke="#ffe8b8" strokeLinecap="round"/>
    </g>
    <path className="field-finder" d="M175 64V39h26m102 0h26v25m0 94v25h-26m-102 0h-26v-25" fill="none" stroke="#24473c" strokeWidth="3"/>
  </>;
}

function KitchenScene() {
  return <>
    <circle cx="261" cy="112" r="84" fill="#f6cd83"/>
    <path d="m0 209 440-20v51H0Z" fill="#c88462"/>
    <ellipse cx="258" cy="188" rx="86" ry="9" fill="#ab6c4e"/>
    <g className="burner-fire" fill="#bd592d">
      {[212,230,248,266,284].map(x => <path key={x} d={`M${x} 187q-6-8 3-17 1 7 5 9 3 6-2 8Z`}/>)}
    </g>
    <path d="M201 189h99" stroke="#423126" strokeWidth="4" strokeLinecap="round"/>
    <g className="pan-steam" fill="none" stroke="#fff7dd" strokeWidth="5" strokeLinecap="round">
      <path d="M207 109q-14-13 0-27t-1-25m54 37q-10-11 0-22t0-21"/>
    </g>
    <g className="pan-toss" stroke="#423126" strokeWidth="2">
      <path d="m221 107 16-12 12 13-17 11Z" fill="#d87535"/>
      <path d="M267 112q8-26 31-21-8 20-31 21Z" fill="#507347"/>
      <path d="m251 128 12-9 8 11-12 6Z" fill="#f5d69b"/>
    </g>
    <g className="pan-body" stroke="#3b3029" strokeWidth="4" strokeLinejoin="round">
      <path d="m307 135 94-40q11-3 14 5t-7 12l-91 38Z" fill="#98502d"/>
      <path d="M152 134q82 24 176-8-7 52-78 56-68 5-98-48Z" fill="#49473e"/>
      <ellipse cx="240" cy="131" rx="88" ry="15" transform="rotate(-3 240 131)" fill="#72695a"/>
      <path d="M183 150q24 25 67 23" fill="none" stroke="#a99880" strokeWidth="2"/>
    </g>
  </>;
}

function StopwatchScene() {
  return <g transform="rotate(9 262 128)">
    <circle cx="272" cy="140" r="79" fill="#b5aea1"/>
    <g stroke="#513d32" strokeWidth="3">
      <path d="M254 59V37h17v22m-23-22V25h30v12Z" fill="#b97048"/>
      <circle cx="262" cy="129" r="76" fill="#b97048"/>
      <circle cx="262" cy="129" r="66" fill="#fff1d7"/>
    </g>
    {Array.from({length:30}, (_, i) => <path key={i} d={i%5 ? "M262 68v4" : "M262 68v10"} transform={`rotate(${i*12} 262 129)`} stroke="#735a46" strokeWidth={i%5 ? 1.5 : 3}/>)}
    <path className="practice-hand" d="m262 129 31-37" stroke="#994225" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="262" cy="129" r="6" fill="#513d32"/>
  </g>;
}

function TrailScene() {
  return <g transform="rotate(-6 257 125)" strokeLinejoin="round">
    <path d="m137 58 73 16 74-24 79 18-7 132-76-20-73 24-77-19Z" fill="#ede2ba" stroke="#454c43" strokeWidth="3"/>
    <path d="m210 74 74-24-4 130-73 24Z" fill="#c4c5a1"/>
    <g fill="none" stroke="#828f7a" strokeWidth="2">
      <path d="m143 99 26-18 18 16 21-9m77 49q29-30 73-19m-74 29q35-29 73-18m-74 29q36-27 72-17"/>
      <path d="m298 89 12-17 13 17m-1 0 9-12 10 13"/>
    </g>
    <path className="trail-route" pathLength="1" d="M166 157q26-49 54-29t43-2q-17-30 40-27" fill="none" stroke="#934825" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="166" cy="157" r="5" fill="#fff3d5" stroke="#934825" strokeWidth="3"/>
    <path d="M303 101V70l23 7-23 8" fill="#bc603a" stroke="#594332" strokeWidth="2.5"/>
  </g>;
}

function SlateScene() {
  return <g transform="rotate(-5 260 130)" stroke="#413e39" strokeWidth="3" strokeLinejoin="round">
    <rect x="172" y="91" width="169" height="99" rx="5" fill="#514e48"/>
    <path d="M188 132h136m-136 20h86m-86 17h60" stroke="#d6d0c5" strokeWidth="2"/>
    <g className="slate-arm">
      <path d="M172 74h169v20H172Z" fill="#e9e3d6"/>
      {[187,227,267,307].map(x => <path key={x} d={`m${x} 76 18 0-13 16h-18Z`} fill="#514e48" stroke="none"/>)}
    </g>
    <circle cx="179" cy="91" r="4" fill="#e9e3d6"/>
  </g>;
}

const banners = {
  field: { id:"photography", title:"Photography & nature", href:"/photography", scene:FieldScene, action:"Play shot", label:"Play camera animation" },
  kitchen: { id:"cooking", title:"Cooking journal", href:"/cooking", scene:KitchenScene, action:"Play toss", label:"Play skillet animation" },
  routines: { id:"routines", title:"Routines & guides", href:"/personal/routines", scene:StopwatchScene, action:"Wind watch", label:"Play stopwatch animation" },
  plans: { id:"bucket-list", title:"Bucket list & plans", href:"/personal/bucket-list", scene:TrailScene, action:"Trace route", label:"Play trail animation" },
  watch: { id:"watch-shelf", title:"Anime & shows", href:"/personal/anime-and-shows", scene:SlateScene, action:"Clap slate", label:"Play clapperboard animation" },
};

export function InterestBanner({ kind, children }: { kind: keyof typeof banners; children?: ReactNode }) {
  const { id, title, href, scene:Scene, action, label } = banners[kind];
  const [take, setTake] = useState(0);
  const play = () => setTake(value => value + 1);
  const artwork = <>
    <svg key={take} viewBox="0 0 440 240" aria-hidden="true" focusable="false"><Scene/></svg>
    <h2>{title}</h2>
    {href && <span className="banner-arrow" aria-hidden="true">&nearr;</span>}
  </>;
  return <section className="interest-feature" id={id} onPointerEnter={event => { if (event.pointerType === "mouse") play(); }}>
    {href ? <Link className="interest-banner" data-print={kind} data-playing={take > 0} href={href}
      onFocus={event => { if (event.currentTarget.matches(":focus-visible")) play(); }}>{artwork}</Link>
      : <div className="interest-banner" data-print={kind} data-playing={take > 0}>{artwork}</div>}
    <button className="banner-preview" type="button" onClick={play} aria-label={label}>▷ {action}</button>
    {children}
  </section>;
}
