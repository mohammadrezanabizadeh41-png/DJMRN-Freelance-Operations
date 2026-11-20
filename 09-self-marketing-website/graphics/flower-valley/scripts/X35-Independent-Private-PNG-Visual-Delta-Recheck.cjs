'use strict';
// DJMRN X35: independent offline re-derive EVERY PNG downscaled pixel delta using original raw private screenshot files.
// No screenshot data uploaded, no private images in public output, no network. Real third-party imagery remains PC-only.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const d=path.join(root,'02-reviewed-derived','X35-CURRENT'),p=path.join(root,'01-private-captures','X35','PUBLIC-STRICT-BEHAVIOR-90S');
const sharp=require(path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','03-WebGL','WebGL-Toolchain','node_modules','sharp'));
const s=JSON.parse(fs.readFileSync(path.join(d,'X35-REAL-90S-PUBLIC-CONTROLLED-INPUTS-CROSSWALK.json')));
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const out={stage:'X35',stableUTC:s.observedStartUTC,method:'fresh independent PNG file read + sha256 + sharp 192x108 RGB raw compare',
 privateScreenshotPixelBytesNotPublished:true,originalThirdPartyFramesRemainOnOwnerPC:true,checks:[],differences:[]};
function test(name,ok){out.checks.push({name,pass:!!ok})}
(async()=>{
 let last=null;
 for(let i=0;i<s.events.length;i++){
  const e=s.events[i],label=e.label,file=path.join(p,e.privateScreenshot.name),data=fs.readFileSync(file);
  test(label+'_png_magic',data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])));
  test(label+'_sha256',hash(data)===e.privateScreenshot.sha256);
  test(label+'_raw_length',data.length===e.privateScreenshot.bytes);
  const rgb=await sharp(data).resize(192,108,{fit:'fill'}).removeAlpha().raw().toBuffer();
  test(label+'_exact_RGB_192x108_size',rgb.length===192*108*3);
  if(last){
   let sum=0,ch=0;for(let j=0;j<rgb.length;j++){const diff=Math.abs(rgb[j]-last[j]);sum+=diff;if(diff>15)ch++}
   const mae=Math.round(sum/rgb.length*10000)/10000,percentage=Math.round(ch/rgb.length*10000)/100;
   const from=e.imageMetrics.fromPrevious||{};
   test(label+'_mae_recomputed',mae===from.meanAbsoluteRGB);
   test(label+'_percent_recomputed',percentage===from.changedRGBComponentsOver15Pct);
   out.differences.push({phase:label,prior:s.events[i-1].label,mae,changedComponentsPct:percentage});
  }
  last=rgb;
 }
 out.total=out.checks.length;out.passed=out.checks.filter(x=>x.pass).length;
 out.failed=out.checks.filter(x=>!x.pass).map(x=>x.name);
 out.status=out.failed.length?'FAIL':'PASS';
 fs.writeFileSync(path.join(d,'X35-INDEPENDENT-ALL-PNG-SCREEN-DELTA-CROSSCHECK.json'),JSON.stringify(out,null,2)+'\n');
 console.log('X35_PIXEL_INDEPENDENT '+JSON.stringify({total:out.total,passed:out.passed,failed:out.failed,
  comparedPairs:out.differences.length,firstDelta:out.differences[0],lastDelta:out.differences.at(-1)}));
 if(out.failed.length)process.exitCode=1;
})().catch(e=>{console.error('X35_PIXEL_CROSSCHECK_ERROR '+String(e.stack||e));process.exitCode=1});
