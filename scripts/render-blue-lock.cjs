// node scripts/render-blue-lock.cjs <ffmpeg executable>
const fs = require("node:fs");
const path = require("node:path");
const {createHash} = require("node:crypto");
const {spawn,execFileSync} = require("node:child_process");
const {once} = require("node:events");
const {createCanvas,loadImage} = require("@napi-rs/canvas");
const W=1080,H=640,FPS=24, ffmpeg=process.argv[2];
const dir=path.resolve("public/watch-edits");
const asset=ext=>path.join(dir,"blue-lock-reel."+ext);
const canvas=()=>createCanvas(W,H);
const clamp=n=>Math.max(0,Math.min(1,n));
const smooth=n=>(n=clamp(n),n*n*(3-2*n));

// Single shots give the camera a normalized focal point. Families instead give
// a landmark in source pixels and its registered scale on the same virtual lens.
const shot=(n,x,y,seconds=.45)=>({plates:[n],focus:[x,y],frames:Math.round(seconds*FPS)});
const family=(rows,seconds)=>({plates:rows.map(r=>r[0]),rows,frames:Math.round(seconds*FPS*.49)});
// Extra still frames at an existing pose; neither side of the hold is retimed.
const holds={10:[.72,17],14:[.48,9],19:[.63,14],7:[.88,10],8:[.83,18],36:[.66,9]};
const cuts=[
  shot(37,.38,.40,2.4),shot(32,.65,.21,.72),shot(31,.37,.38,1.6),shot(35,.29,.43),
  shot(10,.52,.48,2.25),shot(9,.57,.29),shot(23,.62,.22),shot(24,.61,.17),
  shot(5,.61,.22),shot(29,.72,.25,1.22),shot(14,.56,.28,2.15),shot(15,.53,.39),
  family([[27,265,550,.56],[30,265,550,.56]],2.35),
  family([[43,317,468,.61],[1,316,467,.61]],2.3),
  family([[2,353,316,.66],[3,375,248,.71]],2.4),
  shot(33,.55,.48),shot(26,.76,.13),shot(25,.51,.48),
  family([[13,350,227,.83],[38,517,326,.56],[39,501,317,.67],
          [40,501,317,.67],[41,500,271,.58]],5.6),
  shot(42,.46,.39,.55),shot(11,.46,.27),shot(12,.54,.36),shot(20,.20,.29,.72),
  shot(28,.47,.36),shot(16,.63,.29),shot(4,.42,.21),shot(19,.35,.22,1.85),
  family([[17,625,92,.72],[6,641,90,.67],[7,641,-19,.67]],2.55),
  shot(7,.49,.66,2.65),shot(18,.49,.64,.45),shot(8,.45,.30,2.35),
  family([[21,414,216,.54],[22,371,230,.49]],2.4),
  shot(34,.5,.3),shot(36,.53,.26,1.85),
];
const timeline=cuts.map(shot=>{
  const [at,extra]=(!shot.rows&&holds[shot.plates[0]])||[0,0];
  return {at:Math.round(at*(shot.frames-1)),extra,length:shot.frames+extra};
});
// Camera keys: time within the shot, source focal point, magnification from the wide
// frame, and roll in degrees. Identical adjacent keys deliberately stop the camera.
const wide=[0,.5,.5,1,0];
const cameras={
  10:[wide,[.25,.5,.5,1,0],[.60,.52,.49,1.8,0],[.79,.52,.49,1.8,0],[1,.39,.71,1.48,0]],
  29:[wide,[.24,.71,.29,2.45,-1.8],[.67,.71,.29,2.45,-1.8],[1,.54,.74,1.7,0]],
  14:[wide,[.26,.55,.29,2.35,-2],[.59,.55,.29,2.35,-2],[.83,.45,.81,2.65,0],[1,.45,.81,2.65,0]],
  20:[wide,[.26,.30,.39,1.75,-2],[.70,.30,.39,1.75,-2],[1,.42,.51,1.25,0]],
  19:[wide,[.20,.68,.33,1.9,2.4],[.42,.36,.24,2.5,-2],[.78,.36,.24,2.5,-2],[1,.29,.22,2.8,-3]],
  7:[wide,[.18,.54,.18,2.55,0],[.32,.54,.18,2.55,0],[.51,.54,.53,2.5,-1.2],[.69,.54,.53,2.5,-1.2],[.86,.54,.85,2.15,0],[1,.54,.85,2.15,0]],
  8:[wide,[.20,.46,.27,2.15,0],[.52,.46,.27,2.15,0],[.76,.54,.67,1.85,0],[.92,.54,.67,1.85,0],[1,.52,.65,1.72,0]],
};
function camera(keys,t){
  const end=keys.findIndex(k=>k[0]>=t);
  if(end<=0)return end===0?keys[0]:keys[keys.length-1];
  const a=keys[end-1],b=keys[end],p=smooth((t-a[0])/(b[0]-a[0]));
  return a.map((v,k)=>v+(b[k]-v)*p);
}
// The silhouette, not a rectangular copy of the scan, gets the lift.
const actors={
  6:[[234,141],[248,127],[287,127],[365,99],[436,84],[463,91],[449,65],[436,37],[443,15],[469,19],[486,2],[520,7],[544,31],[546,66],[531,90],[536,106],[549,129],[556,174],[552,220],[574,235],[600,224],[600,246],[628,257],[665,280],[680,323],[700,372],[728,432],[736,449],[735,485],[671,440],[644,392],[621,359],[543,339],[459,335],[379,338],[322,318],[251,306],[274,282],[325,260],[420,245],[450,220],[462,178],[455,147],[428,120],[380,133],[296,155],[269,165],[237,179],[254,154]],
  10:[[341,978],[362,897],[397,793],[433,757],[492,751],[538,774],[561,828],[550,902],[598,953],[650,981],[674,1026],[698,1132],[686,1183],[752,1207],[802,1240],[825,1321],[784,1432],[763,1515],[769,1572],[836,1636],[833,1674],[782,1660],[715,1616],[679,1558],[701,1407],[656,1345],[564,1359],[513,1402],[468,1434],[460,1541],[475,1603],[449,1689],[409,1721],[377,1700],[373,1644],[395,1577],[386,1443],[350,1299],[330,1208],[315,1118]],
  19:[[455,16],[510,0],[550,0],[573,27],[608,35],[655,16],[701,4],[735,0],[735,177],[691,205],[653,252],[657,319],[671,365],[652,418],[624,448],[583,489],[544,513],[521,502],[530,473],[567,428],[580,397],[524,393],[488,425],[461,432],[445,414],[458,388],[485,364],[493,297],[448,279],[391,248],[320,203],[253,187],[227,217],[195,226],[158,211],[139,185],[143,165],[168,150],[201,143],[238,156],[317,165],[399,172],[491,202],[530,173],[515,140],[477,128],[457,100],[450,64],[425,52]],
  32:[[445,39],[459,36],[468,46],[465,62],[476,74],[479,102],[476,130],[482,145],[484,185],[490,193],[468,194],[461,155],[454,147],[452,173],[447,193],[434,195],[439,163],[439,144],[437,129],[433,125],[439,82],[448,63]],
  14:[[492,222],[509,212],[553,243],[603,260],[637,263],[686,299],[726,322],[706,369],[697,406],[719,414],[748,438],[767,489],[794,548],[783,568],[756,566],[704,537],[691,584],[667,621],[643,663],[620,685],[598,712],[564,706],[554,680],[560,630],[535,655],[506,691],[476,700],[452,689],[438,654],[442,615],[457,570],[477,545],[547,508],[567,484],[555,435],[546,372],[515,290]],
  29:[[576,355],[628,352],[657,362],[704,350],[743,330],[745,305],[764,278],[798,270],[831,278],[848,300],[841,331],[818,355],[832,371],[876,382],[900,405],[924,427],[917,445],[897,451],[865,434],[836,422],[810,478],[785,539],[756,582],[735,632],[715,679],[684,698],[665,680],[676,652],[688,597],[664,597],[620,584],[594,571],[594,550],[625,511],[663,482],[687,460],[700,411],[668,418],[634,416],[614,430],[587,450],[568,450],[575,427],[595,405],[572,408]],
  20:[[71,159],[82,120],[108,102],[137,87],[158,106],[208,102],[232,126],[291,145],[363,114],[441,82],[548,38],[621,32],[682,13],[726,0],[728,88],[670,120],[588,158],[505,190],[459,235],[494,272],[553,289],[627,315],[727,365],[727,687],[675,727],[611,727],[622,654],[548,638],[476,628],[401,618],[334,593],[291,561],[286,532],[309,479],[345,444],[303,407],[255,395],[225,432],[181,503],[157,521],[104,524],[81,527],[49,566],[31,565],[40,537],[9,548],[2,532],[1,492],[18,476],[61,453],[92,459],[126,472],[159,419],[177,349],[199,301],[180,277],[145,290],[117,275],[93,247],[102,228],[91,217],[78,203]],
};
const plates={};
function paperMatte(w,h,border){
  const mask=createCanvas(w,h),m=mask.getContext("2d");
  m.fillStyle="white";m.fillRect(0,0,w,h);m.globalCompositeOperation="destination-in";
  for(const [dx,dy] of [[w,0],[0,h]]){
    const grad=m.createLinearGradient(0,0,dx,dy),band=border/(dx||dy);
    for(const [p,a] of [[0,0],[.2,.08],[.5,.5],[.8,.92],[1,1]]){
      grad.addColorStop(p*band,"rgba(0,0,0,"+a+")");grad.addColorStop(1-p*band,"rgba(0,0,0,"+a+")");
    }
    m.fillStyle=grad;m.fillRect(0,0,w,h);
  }
  return mask;
}
async function prepare(n){
  const img=await loadImage(path.join(__dirname,"art/blue-lock",String(n).padStart(2,"0")+".webp"));
  const page=createCanvas(img.width,img.height),g=page.getContext("2d");
  g.drawImage(img,0,0);
  const air=canvas(),b=air.getContext("2d");
  const s=Math.max(W/img.width,H/img.height)*1.10;
  b.fillStyle="white";b.fillRect(0,0,W,H);
  b.globalAlpha=.46;b.drawImage(img,(W-img.width*s)/2,(H-img.height*s)*.37,img.width*s,img.height*s);b.globalAlpha=1;
  // The scan fades into paper at the stage perimeter, not inside speech bubbles.
  for(const [dx,dy,stops] of [[W,0,[[0,1],[.09,.25],[.2,0],[.39,.76],[.61,.76],[.8,0],[.91,.25],[1,1]]],
    [0,H,[[0,1],[.09,.42],[.23,0],[.77,0],[.91,.42],[1,1]]]]){
    const wash=b.createLinearGradient(0,0,dx,dy);
    for(const [p,a] of stops)wash.addColorStop(p,"rgba(255,255,255,"+a+")");
    b.fillStyle=wash;b.fillRect(0,0,W,H);
  }
  // Both the scan and the white backing under a close-up share a feathered edge.
  const matte=paperMatte(img.width,img.height,Math.min(img.width,img.height)*.047);
  g.globalCompositeOperation="destination-in";
  g.drawImage(matte,0,0);
  g.globalCompositeOperation="source-over";
  let ball;
  if(n===19){
    const r=42, bx=248,by=112;
    ball=createCanvas(2*r,2*r);const f=ball.getContext("2d");
    f.beginPath();f.arc(r,r,r,0,Math.PI*2);f.clip();f.drawImage(page,r-bx,r-by);
    // Continue the radial ink behind the departing ball rather than exposing
    // a white disc. Reflect nearby speed lines inward from the printed rim.
    const pixels=g.getImageData(0,0,img.width,img.height),original=pixels.data.slice();
    for(let y=by-r;y<=by+r;y++)for(let x=bx-r;x<=bx+r;x++){
      const dx=x-bx,dy=y-by,d=Math.hypot(dx,dy);
      if(d>r)continue;
      const radius=r+4+(r-d)*.63,dist=Math.max(1,d);
      const at=4*(Math.round(by+dy*radius/dist)*img.width+Math.round(bx+dx*radius/dist));
      const i=4*(y*img.width+x),paper=.24*(1-d/r);
      for(let c=0;c<3;c++)pixels.data[i+c]=original[at+c]*(1-paper)+255*paper;
    }
    g.putImageData(pixels,0,0);
  }
  const outline=actors[n];
  if(!outline){plates[n]={page,air,matte};return;}
  const fg=createCanvas(page.width,page.height),f=fg.getContext("2d");
  for(const ctx of [f,g]){
    ctx.save();ctx.beginPath();outline.forEach(([x,y],i)=>ctx[i?"lineTo":"moveTo"](x,y));ctx.closePath();ctx.clip();
  }
  f.drawImage(page,0,0);f.restore();
  g.fillStyle="white";g.fillRect(0,0,page.width,page.height);g.restore();
  const xs=outline.map(([x])=>x),ys=outline.map(([,y])=>y);
  plates[n]={page,air,matte,fg,ball,pin:[(Math.min(...xs)+Math.max(...xs))/2,(Math.max(...ys)+Math.min(...ys))/2]};
}
const frame=canvas(), incoming=canvas(), masked=canvas();
const inside=(x,lo,hi)=>Math.max(lo,Math.min(hi,x));
function layout(n,row){
  const {page}=plates[n],w=page.width,h=page.height;
  // Portrait phones see the central 600px of the master. No composition exceeds it.
  const s=Math.min(558/w,584/h),dw=w*s,dh=h*s;
  const x=row?inside(W/2-s*row[1],W/2-286,W/2+286-dw):(W-dw)/2;
  const y=row?inside(H*.45-s*row[2],27,H-27-dh):(H-dh)/2;
  return {x,y,s};
}
function plate(g,n,t,row,groupTime=t){
  const {page,air,fg,pin,ball}=plates[n],{x,y,s}=layout(n,row);
  const [,fx,fy,z,roll]=row
    ? [0,row[1]/page.width,clamp(row[2]/page.height),1+.48*Math.sin(Math.PI*groupTime)**2,0]
    : cameras[n]?camera(cameras[n],t):wide;
  const blend=smooth((z-1)/.45);
  const tx=x+(W/2-page.width*fx*s-x)*blend,ty=y+(H/2-page.height*fy*s-y)*blend;
  g.drawImage(air,0,0);
  g.save();g.translate(tx+fx*page.width*s,ty+fy*page.height*s);
  g.rotate(roll*Math.PI/180);g.scale(s*z,s*z);g.translate(-fx*page.width,-fy*page.height);
  // At impact, let the foreground ink take over instead of double-printing text.
  if(blend){g.globalAlpha=.88*blend;g.drawImage(plates[n].matte,0,0);g.globalAlpha=1;}
  g.globalCompositeOperation="multiply";g.drawImage(page,0,0);g.globalCompositeOperation="source-over";
  if(fg){
    // Perspective-like foreshortening and a tiny orbit around the torso. Return
    // the cutout to its ink before cutting away; the original lettering stays still.
    const lift=smooth(t/.32)*(1-smooth((t-.74)/.26)), yaw=Math.sin(2*Math.PI*t)*lift, side=n%2?1:-1;
    g.save();g.translate(pin[0]+side*12*lift/s,pin[1]-10*lift/s);
    g.transform(1+.16*lift,.020*yaw,.049*yaw,1+.17*lift,0,0);
    g.rotate(side*.024*lift);g.translate(-pin[0],-pin[1]);
    g.shadowColor="rgba(17,23,31,"+(.28*lift)+")";g.shadowBlur=7*lift;g.shadowOffsetY=5*lift;
    g.drawImage(fg,0,0);g.restore();
  }
  if(ball){
    const release=clamp((t-.74)/.26)**1.5;
    g.translate(248-165*release,112-41*release);g.rotate(-1.7*release);g.scale(1+release*.52,1+release*.52);g.drawImage(ball,-42,-42);
  }
  g.restore();
}
function wipe(g,next,p,reverse){
  if(p<=0)return;
  if(p>=1){g.drawImage(next,0,0);return;}
  const m=masked.getContext("2d");m.drawImage(next,0,0);
  m.save();if(reverse){m.translate(W,0);m.scale(-1,1);}
  m.globalCompositeOperation="destination-in";
  const edge=(W+400)*smooth(p)-200;
  const ramp=m.createLinearGradient(edge-88,0,edge+88,52);
  ramp.addColorStop(0,"black");ramp.addColorStop(1,"transparent");
  m.fillStyle=ramp;m.fillRect(0,0,W,H);m.restore();g.drawImage(masked,0,0);
}
const target=incoming.getContext("2d");
function cutTo(g,id,next,p,reverse){
  if(id===19 || id===18){
    // The incoming shot opens at the departing ball, not at the edge of the screen.
    const x=W*(id===19?.28:.44),y=H*(id===19?.35:.67);
    const m=masked.getContext("2d");m.drawImage(next,0,0);
    const r=8+Math.hypot(W,H)*smooth(p),edge=m.createRadialGradient(x,y,Math.max(0,r-64),x,y,r);
    edge.addColorStop(0,"black");edge.addColorStop(1,"transparent");
    m.save();m.globalCompositeOperation="destination-in";m.fillStyle=edge;m.fillRect(0,0,W,H);m.restore();g.drawImage(masked,0,0);
  }else if([37,10,8,36].includes(id)){
    g.save();g.globalAlpha=smooth(p);g.drawImage(next,0,0);g.restore();
  }else wipe(g,next,p,reverse);
}
function compose(g,shot,j){
  const t=j/(shot.frames-1);
  if(!shot.rows){plate(g,shot.plates[0],t);return;}
  const rows=shot.rows,cursor=t*rows.length,i=Math.min(rows.length-1,Math.floor(cursor));
  const u=clamp(cursor-i);
  plate(g,rows[i][0],u,rows[i],t);
  if(i<rows.length-1&&u>.52){
    plate(target,rows[i+1][0],0,rows[i+1],t);
    wipe(g,incoming,(u-.52)/.48,false);
  }
}
async function main(){
  if(!ffmpeg)throw Error("Pass the path to ffmpeg");
  const used=new Set(cuts.flatMap(c=>c.plates));
  if(used.size!==43)throw Error("Missing panels from the storyboard");
  for(const n of used)await prepare(n);
  const flags=["-hide_banner","-loglevel","error","-y"];
  const enc=spawn(ffmpeg,[...flags,"-f","rawvideo","-pixel_format","rgba","-video_size",W+"x"+H,"-framerate",""+FPS,"-i","pipe:0","-an","-c:v","libx264","-crf","20","-preset","veryfast","-pix_fmt","yuv420p","-movflags","+faststart",asset("mp4")],{stdio:["pipe","inherit","inherit"]});
  const done=once(enc,"close"),g=frame.getContext("2d");
  const rim=canvas(),rg=rim.getContext("2d");
  rg.fillStyle="white";rg.fillRect(0,0,W,H);rg.globalCompositeOperation="destination-out";
  rg.drawImage(paperMatte(W,H,20),0,0);
  for(const [i,s] of cuts.entries()){
    const {at,extra,length}=timeline[i];
    for(let j=0;j<length;j++){
      compose(g,s,j<=at?j:j<=at+extra?at:j-extra);
      const id=s.plates[0],transition=id===19||id===18?5:id===7?2:4;
      if(j>=length-transition){
        const next=cuts[(i+1)%cuts.length];
        plate(target,next.plates[0],0,next.rows?.[0]);
        cutTo(g,id,incoming,(j-length+transition+1)/transition,i%2===1);
      }
      g.drawImage(rim,0,0);
      if(!i&&!j)fs.writeFileSync(asset("webp"),frame.toBuffer("image/webp",92));
      if(!enc.stdin.write(Buffer.from(g.getImageData(0,0,W,H).data)))await once(enc.stdin,"drain");
    }
  }
  enc.stdin.end();if((await done)[0]!==0)throw Error("Video export failed");
  execFileSync(ffmpeg,[...flags,"-i",asset("mp4"),"-c:v","libvpx-vp9","-threads","4","-row-mt","1","-deadline","realtime","-cpu-used","7","-crf","34","-b:v","0",asset("webm")]);
  execFileSync(ffmpeg,[...flags,"-i",asset("mp4"),"-filter_complex","fps=12,scale=352:-1,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer","-loop","0",asset("gif")]);
  const revision=createHash("sha256").update(fs.readFileSync(asset("mp4"))).digest("hex").slice(0,12);
  const eyeStart=timeline.slice(0,cuts.findIndex(c=>c.plates.includes(40))).reduce((a,s)=>a+s.length,0)/FPS;
  fs.writeFileSync("data/blue-lock-reel.json",JSON.stringify({revision,eyeStart},null,2)+"\n");
  console.log({revision,eyeStart,plates:used.size,seconds:timeline.reduce((a,c)=>a+c.length,0)/FPS});
}
main().catch(e=>{console.error(e);process.exitCode=1;});
