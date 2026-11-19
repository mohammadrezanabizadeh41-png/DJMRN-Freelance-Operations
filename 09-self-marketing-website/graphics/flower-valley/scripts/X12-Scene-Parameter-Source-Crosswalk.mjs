import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(root,'02-reviewed-derived');
const graph=JSON.parse(fs.readFileSync(path.join(derived,'X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json'),'utf8'));
const home=graph.states.find(s=>new URL(s.url).pathname==='/');
if(!home)throw Error('Missing X12 home graph state');
const names=[...new Set((home.collections||[]).flatMap(c=>(c.items||[]).map(v=>v.t).filter(v=>typeof v==='string'&&/^[A-Za-z][A-Za-z0-9]{2,65}$/.test(v))))];
const manifestRel='01-private-captures/X01-REDO/X01-R2-2026-11-18T18-01-09-463Z/private-capture-manifest.json';
const mf=JSON.parse(fs.readFileSync(path.join(root,manifestRel),'utf8'));
const rawFiles=(mf.responses||[]).filter(r=>r.private_rel&&/javascript|text\/html|text\/css/i.test(r.mime||'')&&fs.existsSync(path.join(root,r.private_rel)));
const sources=rawFiles.map(r=>({r,body:fs.readFileSync(path.join(root,r.private_rel),'utf8')}));
const num='(-?(?:\\d+(?:\\.\\d+)?|\\.\\d+))';
const rows=[];
for(const name of names){
 const hits=sources.filter(a=>a.body.includes(name));
 const matched=hits.find(a=>new RegExp('["\\x27]'+name+'["\\x27]\\s*,\\s*'+num).test(a.body))||hits[0];
 const result={name,observedAt:'WebGraph home collection repeated:div',priorRawSourceExists:hits.length>0,priorRawBodySHA256:matched?.r.sha256||null,priorRawRelativeFile:matched?.r.private_rel||null,priorAssetUrl:matched?.r.url||null,priorRawOccurrences:hits.length,defaultSetting:null,uiSliderMin:null,uiSliderMax:null,uniformBinding:null,changeHandlerType:null,confidence:'LABEL_AND_PRIOR_RAW_CROSSWALK_ONLY'};
 if(matched){
   const s=matched.body;
   const d=s.match(new RegExp('(?:^|[^A-Za-z0-9_$])'+name+'\\s*:\\s*'+num));
   if(d)result.defaultSetting=Number(d[1]);
   const controlMatch=s.match(new RegExp('["\\x27]'+name+'["\\x27]\\s*,\\s*'+num+'\\s*,\\s*'+num));
   if(controlMatch){result.uiSliderMin=Number(controlMatch[1]);result.uiSliderMax=Number(controlMatch[2]);}
   const ix=s.indexOf('"'+name+'"');
   if(ix>=0){
     const after=s.slice(ix,ix+180);
     const um=after.match(/uniforms\.([A-Za-z0-9_]+)\.value\s*=\s*t/);
     if(um)result.uniformBinding=um[1];
     if(/recalculateDurationRatios/.test(after))result.changeHandlerType='DURATION_RATIO_RECALCULATION';
     else if(um)result.changeHandlerType='WEBGL_UNIFORM_VALUE_CHANGE';
     else if(/onChange/.test(after))result.changeHandlerType='OTHER_ON_CHANGE';
   }
   result.confidence='GUI_LABEL_IN_X12_AND_EXACT_NAME_IN_PRIOR_X01_RAW_JS';
 }
 rows.push(result);
}
const out={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X12',status:'CROSSWALK_ONLY_NO_NEW_RAW_SOURCE',graphSource:'X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json',priorManifest:manifestRel,sourceFilesScanned:sources.length,matchedLabels:rows.length,alreadyInEarlierRawJS:rows.filter(x=>x.priorRawSourceExists).length,entries:rows,interpretation:'WebGraph contributes a structured index of UI displayed scene control names; every name existed in X01 captured raw script. Numeric config/ranges are read from the old script, not from live WebGL values. No copied source asset.',disclaimer:'Static source settings/ranges are not confirmation of exact changing runtime state or publication rights'};
const dest=path.join(derived,'X12-13-scene-parameter-labels-to-X01-raw-JS-crosswalk-2026-11-19.json');
fs.writeFileSync(dest,JSON.stringify(out,null,2));
console.log('DJMRN_X12_PARAMS',JSON.stringify({dest,sourceFilesScanned:sources.length,labels:rows.length,priorRawMatches:out.alreadyInEarlierRawJS,entries:rows.map(r=>({name:r.name,default:r.defaultSetting,min:r.uiSliderMin,max:r.uiSliderMax,uniform:r.uniformBinding,handler:r.changeHandlerType}))}));