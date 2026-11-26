const path = require("node:path");
const {loadImage} = require("@napi-rs/canvas");

const shots = [
  ["baseForm","Base form",1.05],
  ["secondForm","Gear Second",1.85],
  ["thirdForm","Gear Third",1.65],
  ["fourthForm","Gear Fourth",1.75],
  ["fifthForm","Gear Fifth",1.65],
];
const beats=shots.map(([id,,seconds])=>[id,seconds]);
const smooth=n=>(n=Math.max(0,Math.min(1,n)),n*n*(3-2*n));

async function prepare(paperCrop,gearFive){
  const images={};
  for(const name of ["second","sheet","jet","balloon","fourth"])
    images[name]=await loadImage(path.join(__dirname,"art/luffy-gears",name+".png"));
  const crop=(name,box)=>paperCrop(images[name],box);
  return {
    base:crop("balloon",[1115,1,334,562]),
    second:crop("second",[2,2,229,204]), steam:crop("sheet",[161,3,247,249]),
    jet:crop("jet",[3,4,472,630]),
    fist:crop("sheet",[82,266,326,220]), balloon:crop("balloon",[210,0,887,697]),
    bounce:crop("sheet",[166,495,242,243]), fourth:crop("fourth",[247,3,402,462]),
    fifth:paperCrop(gearFive,[0,0,736,801]),
  };
}
function draw(g,art,id,t){
  const i=shots.findIndex(([key])=>key===id);
  if(i<0)return false;
  const cx=675,cy=216;
  function stamp(img,scale,dx=0,dy=0,angle=0,alpha=1){
    g.save();g.globalAlpha=alpha;g.fillStyle="white";g.fillRect(0,0,1080,432);
    g.translate(cx+dx,cy+dy);g.rotate(angle);g.scale(scale,scale);
    g.globalAlpha=alpha;g.drawImage(img,-img.width/2,-img.height/2);g.restore();
  }
  const rise=smooth(t/.55),arc=Math.sin(Math.PI*t);
  g.save();
  // Hold the center of mass across drawings; the enlarging fist carries III into IV.
  switch(id){
    case "baseForm":stamp(art.base,.62+.055*rise,-8*rise,4-5*rise);break;
    case "secondForm":
      stamp(art.steam,1.40+.09*rise);
      stamp(art.second,1.73+.09*rise,0,0,0,smooth((t-.18)/.18));
      stamp(art.jet,.59+.05*rise,14*rise,-4*rise,-.035*arc,smooth((t-.61)/.16));break;
    case "thirdForm":
      stamp(art.fist,1.22+.14*rise,-15*rise);
      stamp(art.balloon,.43+.04*rise,-15*rise,0,-.016*arc,smooth((t-.35)/.25));break;
    case "fourthForm":
      stamp(art.bounce,1.43+.16*rise,0,9*arc);
      stamp(art.fourth,.80+.06*rise,0,7*arc,.024*arc,smooth((t-.27)/.21));break;
    case "fifthForm":stamp(art.fifth,.46+.045*rise,0,-7*arc,-.028*arc);break;
  }
  g.fillStyle="#292621";g.textAlign="center";
  g.font="italic 78px Georgia";g.fillText("0"+(i+1),298,201);
  g.font="600 26px Georgia";g.fillText(shots[i][1],298,247);
  for(let k=0;k<5;k++){
    g.fillStyle=k<=i?"#37322c":"#d9d6cf";g.fillRect(250+k*20,269,15,2);
  }
  g.restore();return true;
}
module.exports={beats,prepare,draw};
