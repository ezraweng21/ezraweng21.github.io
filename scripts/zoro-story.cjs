const path = require("node:path");
const { createCanvas, loadImage } = require("@napi-rs/canvas");

// Seconds, in editorial order. The existing three poses remain in the action sequence.
const beats = [
  ["bound",1.05],["bandana",.9],["draw",.72],["wide",.66],["guard",.76],
  ["zoro",.66,1,1.07],["smoke",.6],["strike",.5,1.02,1.1],
  ["dragon",1.05],["wing",1.25],["king",1.35,1.03,1],["kuma",1.05],["nothing",2.05],
];
const crops = {
  bound:[0,78,735,866], bandana:[0,197,400,455], draw:[0,408,720,872],
  wide:[0,55,842,854], guard:[286,0,642,820], smoke:[0,689,1152,1359],
  dragon:[100,6,985,1527], wing:[0,0,736,1097], kuma:[0,0,736,832],
  nothing:[21,26,519,278], survivor:[111,427,307,581],
};
// Contours in the uncropped scans let the performer travel independently of the scenery.
const silhouettes = {
  wing:[[0,175],[40,230],[58,266],[235,230],[249,267],[286,262],[339,275],[387,304],[410,363],[406,422],[451,447],[499,469],[531,502],[511,521],[660,633],[655,649],[520,603],[449,533],[387,506],[343,479],[234,569],[175,632],[124,707],[103,695],[135,617],[103,586],[68,627],[49,619],[62,532],[0,484]],
  dragon:[[630,899],[692,855],[739,803],[779,779],[1037,523],[1047,528],[792,825],[786,859],[757,905],[796,939],[876,967],[951,1006],[982,1057],[958,1117],[940,1197],[957,1329],[1010,1370],[1104,1407],[1106,1430],[979,1460],[897,1488],[855,1450],[578,1375],[432,1304],[209,1184],[204,1171],[483,1286],[668,1340],[665,1197],[632,1110],[623,1028]],
  kuma:[[27,631],[122,604],[194,568],[226,518],[258,478],[302,471],[338,492],[356,530],[383,578],[364,643],[389,702],[406,754],[350,790],[256,796],[141,778],[141,710],[168,662],[110,638],[27,649]],
};
const ease=p=>p*p*(3-2*p);
const mix=(a,b,t)=>a+(b-a)*t;

async function prepare(paperCrop) {
  const tiles={};
  for(const [id,box] of Object.entries(crops)){
    const image=await loadImage(path.join(__dirname,"art","zoro",(id==="survivor"?"nothing":id)+".png"));
    const page=paperCrop(image,box,id==="bandana"?231:248);
    tiles[id]={page};
    if(!silhouettes[id])continue;
    const actor=createCanvas(page.width,page.height), stage=createCanvas(page.width,page.height);
    const f=actor.getContext("2d"), b=stage.getContext("2d");
    b.drawImage(page,0,0);
    for(const g of [b,f]){
      g.beginPath();
      silhouettes[id].forEach(([x,y],i)=>g[i?"lineTo":"moveTo"](x-box[0],y-box[1]));
      g.closePath();g.clip();
    }
    f.drawImage(page,0,0);b.fillStyle="white";b.fillRect(0,0,page.width,page.height);
    Object.assign(tiles[id],{actor,stage});
  }
  return tiles;
}

// Coordinates are in the 1080 x 432 reel. Pin a point on the drawing rather than
// centering every image: a face, hand or blade can carry the eye through a cut.
function stamp(g,img,x,y,scale,angle=0,ax=.5,ay=.5,opacity=1){
  g.save();g.translate(x,y);g.rotate(angle);g.scale(scale,scale);
  g.globalAlpha=opacity;g.globalCompositeOperation="multiply";
  g.drawImage(img,-ax*img.width,-ay*img.height);g.restore();
}
function render(tiles,g,id,p){
  const tile=tiles[id];if(!tile)return false;
  const t=ease(p), arc=Math.sin(Math.PI*p);
  if(id==="nothing"){
    // The motion dies out before the loop. Both speech bubbles stay in the frame.
    const settle=ease(Math.min(1,p/.65));
    stamp(g,tiles.survivor.page,685-14*settle,231,.65,.015*(1-settle));
    stamp(g,tile.page,340,204,.77,0,.5,.5,Math.min(1,p*3));
  }else if(tile.actor){
    const poses={
      dragon:[.34,510,475,41,-23,-.09,.04],
      wing:[.39,597,530,165,62,-.16,.12],
      kuma:[.53,535,544,-31,12,.045,0],
    };
    const [s,from,to,dx,dy,r0,r1]=poses[id];
    const x=mix(from,to,t),theta=mix(r0,r1,t);
    stamp(g,tile.stage,x-dx*.22*t,215-dy*.22*t,s*(1+.045*t),-theta*.34);
    stamp(g,tile.actor,x+dx*(t-.3),215+dy*(t-.3)-12*arc,s*(1+.10*t),theta);
  }else{
    // The isolated draw and wide scan share the same face in source coordinates.
    const paths={
      bound:[530,221,548,216,.46,.53,0,0],
      bandana:[542,231,562,213,.89,.99,.018,0],
      draw:[527,83,548,81,.48,.53,-.025,0,.47,.12],
      wide:[548,81,544,95,.55,.46,0,.018,.40,.22],
      guard:[548,209,563,217,.49,.61,.025,-.035],
      smoke:[529,225,587,192,.32,.43,-.085,.035],
    };
    const [x0,y0,x1,y1,s0,s1,a0,a1,ax=.5,ay=.5]=paths[id];
    stamp(g,tile.page,mix(x0,x1,t),mix(y0,y1,t),mix(s0,s1,t),mix(a0,a1,t),ax,ay);
  }
  return true;
}
module.exports={beats,prepare,render};
