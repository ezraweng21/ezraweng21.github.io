"use client";

import { useEffect, useRef, useState } from "react";
import { watchShelf } from "@/data/watch-shelf";
import reel from "@/data/one-piece-reel.json";
import blueLock from "@/data/blue-lock-reel.json";
import "./watch-panels.css";

const reels = {
  "One Piece": {id:"one-piece",version:reel.revision,poster:"frame-0.webp",label:"Luffy: from still so weak to Gear 5, followed by Zoro"},
  "Blue Lock": {id:"blue-lock",version:blueLock.revision,poster:"reel.webp",label:"Blue Lock: Isagi reads the field, awakens his ego, and scores"},
} as const;
type Title = keyof typeof reels;

function MangaReel({title}: {title:Title}) {
  const edit=reels[title];
  const reelAsset = (file: string) => `/watch-edits/${edit.id}-${file}?v=${edit.version}`;
  const video = useRef<HTMLVideoElement>(null);
  const surround = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLElement>(null);
  const manualPlayback = useRef<"play"|"pause"|null>(null);
  const [expanded,setExpanded]=useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncScreen=()=>setExpanded(document.fullscreenElement===stage.current);
    document.addEventListener("fullscreenchange",syncScreen);
    let visible=false;
    const syncPlayback = () => {
      const shouldPlay=visible && (manualPlayback.current==="play" || (!motion.matches && manualPlayback.current!=="pause"));
      if (shouldPlay) void player.play().catch(()=>{});
      else player.pause();
    };
    const observer=new IntersectionObserver(([entry])=>{
      visible=entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(player);
    const syncMotion=()=>{manualPlayback.current=null;syncPlayback();};
    motion.addEventListener("change", syncMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change",syncMotion);
      document.removeEventListener("fullscreenchange",syncScreen);
    };
  }, []);
  useEffect(()=>{
    const player=video.current, ctx=surround.current?.getContext("2d");
    if(!expanded || !ctx || !player)return;
    // Sample the same decoder only while the full-screen surround is visible.
    const draw=()=>{if(player.readyState>=2)ctx.drawImage(player,0,0,216,128);};
    draw();
    player.addEventListener("seeked",draw);
    player.addEventListener("timeupdate",draw);
    return ()=>{
      player.removeEventListener("seeked",draw);
      player.removeEventListener("timeupdate",draw);
    };
  },[expanded]);
  return <section ref={stage} data-reel={edit.id} id={edit.id} aria-label={title}>
    <div className="manga-panorama">
      {expanded && <canvas ref={surround} width={216} height={128} className="reel-surround" aria-hidden="true"/>}
      <video className="manga-movie" ref={video} muted playsInline loop preload="metadata"
        role="button" tabIndex={0} aria-label={(playing?"Pause ":"Play ")+edit.label}
        onClick={event=>{
          const player=event.currentTarget;
          manualPlayback.current=player.paused?"play":"pause";
          if(player.paused) void player.play().catch(()=>{});
          else player.pause();
        }}
        onKeyDown={event=>{
          if(event.key==="Enter" || event.key===" "){
            event.preventDefault();
            if(!event.repeat)event.currentTarget.click();
          }else if(event.key==="f" && edit.id==="blue-lock" && document.fullscreenEnabled && !event.repeat){
            if(expanded)void document.exitFullscreen().catch(()=>{});
            else void stage.current?.requestFullscreen().catch(()=>{});
          }
        }}
        poster={reelAsset(edit.poster)}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src={reelAsset("reel.webm")} type="video/webm" />
        <source src={reelAsset("reel.mp4")} type="video/mp4" />
      </video>
    </div>
  </section>;
}

export function WatchPanels() {
  return <div className="manga-shelf">
    <div className="reel-stack">
      <MangaReel key={blueLock.revision} title="Blue Lock" />
      <MangaReel key={reel.revision} title="One Piece" />
    </div>
    <h2>Shows</h2>
    <p>{watchShelf.find(s => s.category === "Shows")?.picks.join(", ")}</p>
    <h2>Want to watch</h2>
    <dl className="watch-queue">{watchShelf.map(s => <div key={s.category}><dt>{s.category}</dt><dd>{s.queue.join(" · ")}</dd></div>)}</dl>
  </div>;
}
