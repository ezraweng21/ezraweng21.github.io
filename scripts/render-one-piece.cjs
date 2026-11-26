// Offline render: node scripts/render-one-piece.cjs <image-dir> <ffmpeg> <seven image filenames>
const { createCanvas, loadImage } = require("@napi-rs/canvas");
const { spawn, execFileSync } = require("node:child_process");
const { once } = require("node:events");
const fs = require("node:fs");
const { createHash } = require("node:crypto");
const path = require("node:path");
const zoroStory = require("./zoro-story.cjs");
const luffyGears = require("./luffy-gears.cjs");
const [dir, ffmpeg, ...names] = process.argv.slice(2);
const out = path.resolve("public/watch-edits");
const size = 720, width = 1080, height = 432, fps = 30;
// Crops and foreground contours use the original page coordinates.
const art = {
  crouch: { box:[0,724,1170,1356], mask:[[125,1520],[235,1460],[360,1420],[412,1320],[443,1232],[411,1160],[522,1138],[545,1108],[646,1104],[691,1120],[703,1166],[784,1184],[770,1206],[732,1218],[712,1296],[798,1260],[845,1244],[948,1235],[986,1297],[976,1477],[1038,1500],[1078,1538],[1040,1658],[955,1794],[989,1950],[995,1980],[818,1986],[800,1950],[853,1786],[789,1695],[581,1699],[504,1665],[513,1972],[472,1995],[389,1992],[429,1927],[430,1634],[335,1630],[292,1711],[326,1927],[308,1971],[133,1986],[155,1930],[203,1898],[183,1730]] },
  split: { box:[38,495,660,750] },
  gear: { box:[0,0,736,805], mask:[[0,486],[78,494],[149,551],[189,520],[140,455],[98,382],[92,322],[134,274],[207,275],[244,247],[276,207],[347,201],[402,235],[462,232],[451,282],[405,328],[430,355],[475,403],[565,360],[591,236],[615,187],[665,178],[713,196],[729,244],[712,378],[675,461],[592,488],[568,545],[503,594],[400,651],[280,675],[207,683],[140,759],[79,763],[0,706]] },
  zoro: { box:[0,1530,1200,815], mask:[[241,2241],[327,2102],[306,1996],[348,2007],[309,1788],[330,1757],[399,1803],[441,1826],[427,1624],[448,1589],[475,1600],[494,1754],[544,1761],[622,1710],[721,1683],[810,1696],[853,1720],[923,1751],[973,1808],[989,1921],[1043,1958],[1066,2027],[1046,2118],[955,2227],[866,2293],[703,2338],[342,2344]] },
  weak: { box:[0,550,1200,1583], mask:[[94,1993],[146,1833],[274,1789],[332,1745],[299,1577],[247,1374],[216,1117],[224,818],[243,812],[282,915],[360,941],[439,972],[515,1016],[591,1033],[675,1030],[756,995],[839,938],[911,878],[1007,877],[1024,918],[995,1095],[948,1312],[862,1557],[809,1730],[942,1752],[1027,1802],[1099,1917],[1110,2060],[1057,2129],[102,2131]] },
  strike: { box:[0,367,564,584] },
  king: { box:[0,0,736,920], mask:[[0,510],[90,554],[158,574],[194,533],[284,498],[329,471],[360,453],[394,448],[427,467],[435,500],[489,515],[550,575],[610,593],[671,579],[733,538],[734,555],[679,607],[648,639],[606,650],[547,634],[505,693],[468,770],[410,860],[373,890],[337,834],[302,811],[277,748],[264,688],[224,648],[188,634],[145,662],[124,639],[129,602],[0,538]] },
};
const smooth = n => n*n*(3-2*n);
// Source-image scale and offset in the original diptych, measured against its ink contours.
const registration = { weak:[.368,167,355], gear:[.84,119,522] };
// The diptych is the hinge between every solo. Mirror the beat lengths, not the story.
const solos = ["weak","weak","weak","weak","gear","weak","gear",
  "weak","gear","weak","gear","gear","gear","gear"];
const approach = [16,13,10,8,7,6,5,4,4,3,3,3,3,3];
const rhythm = [...approach,...approach.slice(0,-1).reverse()];
const cuts = rhythm.map((length,i)=>[i%2 ? "split" : solos[i/2],length]);
const cutFrames=cuts.reduce((n,cut)=>n+cut[1],0);
const beats = [["match",cutFrames/fps,1,1],["gear",1.55,1,1.07],["crouch",1.05,1,1.05],
  ...luffyGears.beats,...zoroStory.beats];
const frames = beats.map(b => Math.round(b[1]*fps));
const lettering={};
// Lift the scanned paper to white; keep dense ink sharp except right at the crop boundary.
function paperCrop(image,box,whitePoint=250) {
  const [sx,sy,w,h]=box, page=createCanvas(w,h), g=page.getContext("2d");
  g.drawImage(image,sx,sy,w,h,0,0,w,h);
  const px=g.getImageData(0,0,w,h);
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){
    const i=(y*w+x)*4;
    const edge=smooth(Math.min(1,x/(w*.07),(w-1-x)/(w*.07),y/(h*.05),(h-1-y)/(h*.05)));
    const ink=Math.max(0,1-px.data[i]/whitePoint);
    px.data[i]=px.data[i+1]=px.data[i+2]=255*(1-ink*edge);
  }
  g.putImageData(px,0,0);return page;
}
function inkTitle(img,x,w) {
  const tile=createCanvas(w,105), g=tile.getContext("2d");
  g.drawImage(img,x,519,w,105,0,0,w,105);
  const px=g.getImageData(0,0,w,105);
  for(let i=0;i<px.data.length;i+=4){
    px.data[i+3]=Math.min(255,Math.max(0,(px.data[i]-32)*1.4));
    px.data[i]=px.data[i+1]=px.data[i+2]=20;
  }
  g.putImageData(px,0,0);return tile;
}
function matchCut(g, p) {
  const frame=Math.round(p*(cutFrames-1));
  let tick=frame, i=0;
  while(i<cuts.length-1 && tick>=cuts[i][1])tick-=cuts[i++][1];
  // Keep the camera on one continuous path; resetting the tilt per cut breaks the pose match.
  const arc=Math.sin(Math.PI*p), phase=2*Math.PI*p, roll=arc*Math.sin(phase*1.6);
  const k=.64+.10*(1-smooth(p))+.035*arc;
  const title=(key,y,w)=>{
    const h=w*105/lettering[key].width;
    g.save();g.translate(width*.29-8*roll,y+h/2+3*arc);g.rotate(-.024*roll);
    g.drawImage(lettering[key],-w/2,-h/2,w,h);g.restore();
  };
  function layer(id,opacity){
    g.save();g.globalAlpha=opacity;
    if(id==="split"){
      title("weak",height*.17,207);title("gear",height*.53,223);
    }else title(id,height*.32,270);
    g.translate(width*.66+22*roll,height*.52-8*arc*Math.cos(phase));
    g.rotate(.057*roll);g.scale(k,k);g.translate(-400,-865);
    if(id==="split") {
      for(const [j,x] of [74,384].entries()){
        const half=art.split.halves[j], side=j?1:-1;
        g.save();g.translate(x+half.width/2+side*4*arc,930);
        g.rotate(side*.012*roll);g.drawImage(half,-half.width/2,-272);g.restore();
      }
    }else{
      const [k,x,y]=registration[id],img=art[id].original;
      const top=id==="weak"?800:0,bottom=id==="weak"?img.height:797;
      g.drawImage(art[id].solo,x,y+top*k,img.width*k,(bottom-top)*k);
    }
    g.restore();
  }
  // A single ink overlap at the fastest cuts softens the swap without a white flash.
  if(i && tick===0 && cuts[i][1]<=4){
    layer(cuts[i-1][0],.34);layer(cuts[i][0],.80);
  }else layer(cuts[i][0],1);
}
async function main() {
  if (names.length !== 7) throw Error("Supply crouch, split, gear, zoro, weak, strike and king images in that order.");
  for (const [i, a] of Object.values(art).entries()) {
    const image = await loadImage(path.resolve(dir, names[i]));
    a.original=image;
    if(a===art.split){
      lettering.gear=inkTitle(image,98,217);lettering.weak=inkTitle(image,420,217);
      a.halves=[[74,658,284,544],[384,658,277,544]].map(box=>paperCrop(image,box,196));
    }
    if(a===art.weak)a.solo=paperCrop(image,[0,800,image.width,image.height-800]);
    if(a===art.gear)a.solo=paperCrop(image,[0,0,image.width,797]);
    const [x,y,w,h] = a.box;
    const fit = Math.min(size/w,size/h), dw = w*fit, dh = h*fit;
    const page = createCanvas(size,size), g = page.getContext("2d");
    g.fillStyle = i === 1 ? "#111" : "#fff"; g.fillRect(0,0,size,size);
    g.drawImage(paperCrop(image,a.box),(size-dw)/2,(size-dh)/2,dw,dh);
    if (a.mask) {
      const fg = createCanvas(size,size), f = fg.getContext("2d");
      for(const ctx of [g,f]) {
        ctx.save(); ctx.beginPath();
        a.mask.forEach(([px,py],j)=>ctx[j ? "lineTo":"moveTo"]((px-x)*fit+(size-dw)/2,(py-y)*fit+(size-dh)/2));
        ctx.closePath(); ctx.clip();
      }
      f.drawImage(page,0,0); f.restore();
      g.fillStyle="#fff"; g.fillRect(0,0,size,size); g.restore();
      a.fg=fg;
    }
    a.bg=page;
  }
  const storyTiles=await zoroStory.prepare(paperCrop);
  const gears=await luffyGears.prepare(paperCrop,art.gear.original);
  const canvas=createCanvas(width,height), ctx=canvas.getContext("2d");
  // Fade at the encoded picture's edges, even when the browser letterboxes the video.
  const perimeter=createCanvas(width,height), rim=perimeter.getContext("2d");
  for(const [dx,dy,band] of [[width,0,.14],[0,height,.09]]){
    const fade=rim.createLinearGradient(0,0,dx,dy);
    for(const [pos,alpha] of [[0,1],[band*.4,.55],[band,0],[1-band,0],[1-band*.4,.55],[1,1]])
      fade.addColorStop(pos,"rgba(255,255,255,"+alpha+")");
    rim.fillStyle=fade;rim.fillRect(0,0,width,height);
  }
  function draw(beat,p,alpha) {
    const [id,,from,to]=beat, a=art[id], e=smooth(p), z=from+(to-from)*e;
    ctx.save(); ctx.globalAlpha=alpha;
    // Composite each shot before dissolving, so the cutout and its page fade together.
    const g=shotCtx; g.resetTransform();g.fillStyle="#fff";g.fillRect(0,0,width,height);
    if(id==="match") { matchCut(g,p); ctx.drawImage(shotCanvas,0,0); ctx.restore(); return; }
    if(luffyGears.draw(g,gears,id,p)){ctx.drawImage(shotCanvas,0,0);ctx.restore();return;}
    if(zoroStory.render(storyTiles,g,id,p)){ctx.drawImage(shotCanvas,0,0);ctx.restore();return;}
    // Bleed enlarged ink into the margins, then fade it into the paper behind the foreground.
    const [sx,sy,sw,sh]=a.box;
    g.globalAlpha=.18;g.drawImage(a.original,sx,sy+sh*.16,sw,sh*.50,-32*e,-12,width+40,height+24);g.globalAlpha=1;
    const wash=g.createLinearGradient(0,0,width,0);
    for(const [offset,alpha] of [[0,.24],[.20,.73],[.37,1],[.83,1],[1,.33]])wash.addColorStop(offset,"rgba(255,255,255,"+alpha+")");
    g.fillStyle=wash;g.fillRect(0,0,width,height);
    const cx=id==="gear"?width*.66:id==="strike"?width*.55:width*.53;
    const fit=height*.93/size;
    const lift=Math.sin(Math.PI*p), orbit=Math.sin(2*Math.PI*p);
    const direction=id==="strike" || id==="crouch" ? -1 : 1;
    g.translate(cx+direction*17*orbit,height*.52-8*lift);
    g.rotate(direction*.045*lift);g.scale(fit*z,fit*z);g.translate(-size/2,-size/2);
    g.globalCompositeOperation="multiply";
    g.drawImage(a.bg,0,0);
    if(a.fg) {
      const pulse=p<.54?smooth(p/.54):p<.70?1:1-smooth((p-.70)/.30);
      g.translate(size*.5+direction*5*orbit,size*.69);g.rotate(-direction*.023*pulse);
      g.scale(1+.16*pulse,1+.16*pulse);g.translate(-size*.5,-size*.69-14*pulse);
      g.shadowColor="rgba(0,0,0,"+(.32*pulse)+")";g.shadowBlur=8*pulse;g.shadowOffsetX=5*pulse;g.shadowOffsetY=10*pulse;
      g.drawImage(a.fg,0,0);g.shadowColor="transparent";g.shadowBlur=g.shadowOffsetX=g.shadowOffsetY=0;
    }
    g.globalCompositeOperation="source-over";
    if(id==="gear") {g.resetTransform();g.drawImage(lettering.gear,width*.29-135,height*.32,270,270*105/217);}
    ctx.drawImage(shotCanvas,0,0);ctx.restore();
  }
  const shotCanvas=createCanvas(width,height), shotCtx=shotCanvas.getContext("2d");
  const video=path.join(out,"one-piece-reel.mp4");
  const encoder=spawn(ffmpeg,["-hide_banner","-loglevel","error","-y","-f","rawvideo","-pixel_format","rgba","-video_size",width+"x"+height,"-framerate",""+fps,"-i","pipe:0","-an","-c:v","libx264","-crf","18","-pix_fmt","yuv420p","-movflags","+faststart",video],{stdio:["pipe","inherit","inherit"]});
  const completed=once(encoder,"close");
  for(let i=0;i<beats.length;i++){
    const n=frames[i], dissolve=beats[i][0]==="match"?3:Math.min(8,Math.floor(n/3));
    for(let j=0;j<n;j++){
      const t=j/(n-1);
      // Return to the original outgoing pose so Zoro's original dissolve is preserved.
      if(i && j<dissolve){draw(beats[i][0]==="bound"?beats.find(b=>b[0]==="crouch"):beats[i-1],1,1);draw(beats[i],t,smooth(j/dissolve));}
      else draw(beats[i],t,1);
      if(beats[i][0]==="fifthForm" && j>=n-8)draw(beats.find(b=>b[0]==="crouch"),1,smooth((j-n+8)/7));
      if(i===beats.length-1 && j>=n-8)draw(beats[0],0,smooth((j-n+8)/7));
      ctx.drawImage(perimeter,0,0);
      if(i===0 && j===0)fs.writeFileSync(path.join(out,"one-piece-frame-0.webp"),canvas.toBuffer("image/webp",91));
      if(!encoder.stdin.write(Buffer.from(ctx.getImageData(0,0,width,height).data)))await once(encoder.stdin,"drain");
    }
  }
  encoder.stdin.end();if((await completed)[0]!==0)throw Error("MP4 export failed");
  execFileSync(ffmpeg,["-hide_banner","-loglevel","error","-y","-i",video,"-c:v","libvpx-vp9","-row-mt","1","-threads","4","-deadline","realtime","-cpu-used","6","-crf","28","-b:v","0",path.join(out,"one-piece-reel.webm")]);
  execFileSync(ffmpeg,["-hide_banner","-loglevel","error","-y","-i",video,"-filter_complex","fps=15,scale=540:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer","-loop","0",path.join(out,"one-piece-reel.gif")]);
  const chapters=Object.fromEntries(beats.map((b,i)=>[b[0],frames.slice(0,i).reduce((a,b)=>a+b,0)/fps]));
  const revision=createHash("sha256").update(fs.readFileSync(video)).digest("hex").slice(0,12);
  fs.writeFileSync(path.resolve("data/one-piece-reel.json"),JSON.stringify({revision,zoroStart:chapters.bound},null,2)+"\n");
  console.log("Chapter starts (seconds):",chapters);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
