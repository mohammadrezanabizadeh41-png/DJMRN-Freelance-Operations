'use strict';
// X36 truly independent native screen-capture frame temporal analysis.
// ScreenToGif physical screen captures, NOT CDP/Playwright PNG screenshot API.
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X36-CURRENT'),P=path.join(R,'01-private-captures','X36','SCREEN-TO-GIF-REAL-FRAMES');
const sharp=require(path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','03-WebGL','WebGL-Toolchain','node_modules','sharp'));
const h=x=>crypto.createHash('sha256').update(x).digest('hex');
const percent=a=>a.length?+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(4):null;
const quantile=(a,q)=>a.length?a.sort((x,y)=>x-y)[Math.floor((a.length-1)*q)]:null;
(async()=>{
 const inventory=JSON.parse(fs.readFileSync(path.join(D,'X36-ORIGINAL-SCREENTOGIF-REAL-NATIVE-FRAMES-SANITIZED-PROVENANCE.json')));
 const x35=JSON.parse(fs.readFileSync(path.join(R,'02-reviewed-derived','X35-CURRENT','X35-INDEPENDENT-ALL-PNG-SCREEN-DELTA-CROSSCHECK.json')));
 const out={stage:'X36',source:'actual saved ScreenToGif native original PC frames, independently decoded via sharp',
  frameCount:inventory.frameCount,roi:[inventory.imageWidth,inventory.imageHeight],nativeRecorder:'ScreenToGif 2.43.2',
  thumbnailSize:[128,72],originalPixelsRemainPrivateOnPC:true,frames:[],pairwise:[],errors:[],
  x35Comparison:{X35OriginalInputSnapshots:24,X35ConsecutivePairs:23,X35Tool:'Playwright/browser screenshots X35',X36Tool:'ScreenToGif native screen recorder'}};
 let prior=null;
 for(const item of inventory.frameMetadata){
  const p=path.join(P,item.pcOwnerCopy),b=fs.readFileSync(p);
  const exact=h(b)===item.SHA256;
  if(!exact)out.errors.push({frame:item.index,error:'ORIGINAL_SHA_MISMATCH'});
  const raw=await sharp(b).resize(128,72,{fit:'fill'}).removeAlpha().raw().toBuffer();
  out.frames.push({index:item.index,originalSHA256:item.SHA256,hashExact:exact});
  if(prior){let sum=0,diff=0;for(let j=0;j<raw.length;j++){const abs=Math.abs(raw[j]-prior[j]);sum+=abs;if(abs>15)diff++}
   out.pairwise.push({from:item.index-1,to:item.index,meanAbsoluteRGB:+(sum/raw.length).toFixed(4),
    changedRGBComponentsPct:+(diff/raw.length*100).toFixed(2)});
  }
  prior=raw;
 }
 const a=out.pairwise.map(p=>p.meanAbsoluteRGB);
 out.metrics={framesDecoded:out.frames.length,adjacentPairCount:out.pairwise.length,
  meanAdjFrameMAE:percent(a),medianAdjFrameMAE:quantile([...a],0.5),
  p90AdjFrameMAE:quantile([...a],0.9),maximumAdjFrameMAE:Math.max(...a),
  pairsWithMAEGt1:a.filter(x=>x>1).length,pairsWithMAEGt5:a.filter(x=>x>5).length,
  x35MedianConsecutiveMAE:quantile(x35.differences.map(x=>x.mae),0.5),
  x35ConsecutivePairs:x35.differences.length};
 out.status=out.errors.length===0&&out.frames.length>20&&out.pairwise.length===out.frames.length-1?'PASS':'FAIL';
 fs.writeFileSync(path.join(D,'X36-INDEPENDENT-NATIVE-FRAME-TEMPORAL-RGB-X35-CROSSWALK.json'),JSON.stringify(out,null,2)+'\n');
 console.log('X36_FRAME_TEMPORAL '+JSON.stringify({status:out.status,metrics:out.metrics,errors:out.errors}));
 if(out.status!=='PASS')process.exitCode=1;
})().catch(e=>{console.error('X36_TEMPORAL_ERROR '+String(e.stack||e));process.exitCode=1});
