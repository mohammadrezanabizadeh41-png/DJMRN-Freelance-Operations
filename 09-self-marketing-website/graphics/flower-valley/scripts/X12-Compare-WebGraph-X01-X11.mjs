import {readFile,readdir,writeFile,stat,mkdir} from 'node:fs/promises';
import {homedir} from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.join(homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(root,'02-reviewed-derived');
const run=process.argv[2]||'X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56';
const full=path.join(derived,run+'.json');
const g=JSON.parse(await readFile(full,'utf8'));
const sha=crypto.createHash('sha256').update(await readFile(full)).digest('hex');
const scopedFiles=(await readdir(derived)).filter(x=>/^X(?:0[1-9]|10|11)(?:[-_]|\.)/i.test(x)&&x.endsWith('.json')&&!x.includes('X12-'));
const evidenceRefs=new Map(),errorRows=[],sourceCounts={};
function validUrl(x){if(typeof x!=='string'||!/^https?:\/\//.test(x))return null;try{const u=new URL(x);if(!['www.gladeye.com','gladeye.com'].includes(u.hostname))return null;return u.origin+u.pathname;}catch{return null}}
function insert(u,file,field){let prior=evidenceRefs.get(u)||new Set();if(prior.size<30)prior.add(file+':'+field);evidenceRefs.set(u,prior)}
for(const file of scopedFiles){
 const target=path.join(derived,file);
 try{if((await stat(target)).size>8000000)continue;
  const b=await readFile(target);const str=b.length>2&&b[0]===255&&b[1]===254?b.subarray(2).toString('utf16le'):b.toString('utf8');
  const val=JSON.parse(str.replace(/^\uFEFF/,''));
  let stage=(file.match(/^X(?:0[1-9]|10|11)/i)||['?'])[0];
  sourceCounts[stage]=(sourceCounts[stage]||0)+1;
  const todo=[val];let checked=0;
  while(todo.length&&checked++<60000){
   const v=todo.pop();if(v===null||typeof v!=='object')continue;
   if(Array.isArray(v)){for(const entry of v)if(entry&&typeof entry==='object')todo.push(entry);continue;}
   for(const [k,value]of Object.entries(v)){
     const u=validUrl(value);if(u)insert(u,file,k);
     else if(value&&typeof value==='object')todo.push(value);
   }
  }
 }catch(e){errorRows.push({file,reason:String(e).slice(0,130)})}
}
const x11File=(await readdir(derived)).filter(x=>/^X11-ARCHIVEBOX-TRUE180-.*-X01-X10-dedupe-crosswalk\.json$/i.test(x)).sort().at(-1);
const x11=JSON.parse(await readFile(path.join(derived,x11File),'utf8'));
const priorBodies=new Set((x11.rows||[]).filter(x=>x.firstParty&&x.sha256).map(x=>'https://'+x.host+x.path));
const normalize=(u)=>{const x=new URL(u);return x.origin+x.pathname;};
const states=g.states.map(s=>{
 const u=normalize(s.url);
 const controls=s.controls||[],collections=s.collections||[];
 const count=collections.reduce((a,c)=>a+(Array.isArray(c.items)?c.items.length:0),0);
 return{id:s.id,url:u,path:new URL(u).pathname,depth:s.depth,label:s.label,controlCount:controls.length,collectionCount:collections.length,collectedItemCount:count,hasEarlierURLMetadata:evidenceRefs.has(u),earlierReportMatches:[...(evidenceRefs.get(u)||[])].slice(0,6),hasX11WarcBodyAtURL:priorBodies.has(u)};
});
const edges=(g.edges||[]).map(e=>({from:e.from,to:e.to,kind:e.kind,label:e.label,selector:e.selector}));
const links=states.reduce((out,s)=>{out[s.id]=s.url;return out;},{});
const report={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X12',tool:'PinchTab WebGraph 0.1.0 via PinchTab 0.15.2 on owner Windows',
 status:'LIVE_TARGET_GRAPH_PASS_WITH_SCOPE_LIMITS',observedReference:'https://www.gladeye.com/',run,sourceGraph:full,sourceGraphSHA256:sha,
 comparisonScope:'Previous X01-X11 derived JSON URL metadata and X11 WARC response paths; URL reference is not prior archived response. No raw site response bodies replicated.',
 priorDerivedFilesExamined:Object.values(sourceCounts).reduce((a,b)=>a+b,0),priorStageFileCounts:sourceCounts,priorReportParseErrors:errorRows,
 sourceKnownURLCount:evidenceRefs.size,priorX11WARCFirstPartyURLCount:priorBodies.size,
 result:{states:states.length,edges:edges.length,triggers:(g.triggers||[]).length,totalControlsObserved:states.reduce((a,x)=>a+x.controlCount,0),contentCollections:states.reduce((a,x)=>a+x.collectionCount,0),sampledContentItems:states.reduce((a,x)=>a+x.collectedItemCount,0),graphComplete:g.meta?.complete,graphStop:g.meta?.stopped,
 newGraphSemantics:'Action-edge graph and control/content inventory is a new evidence TYPE, distinct from X01-X11 WARC/DOM. States are same-origin navigation/UI, not GPU animation frames.',
 noNewCapturedGLBOrShaderEvidence:true,accountRequired:false,rawBodyReplicated:false},
 states,edges,
 limitations:['WebGraph does not extract WebGL internal camera or GPU shader timeline','Results include branded site navigation outside the requested 3D background; do not classify as new flower assets','Collection item counts are structural UI observations, not unique downloaded files','Path /about or /work being new as a graph state does not mean previously unknown URL or new response bytes','All SHA256 comparisons refer to report files and prior WARC/metadata, not copyright/license assessment']};
const out=path.join(derived,run+'-X01-X11-state-graph-reconciliation.json');
await writeFile(out,JSON.stringify(report,null,2));
console.log('DJMRN_X12_CROSSWALK',JSON.stringify({output:out,sha256:sha,states:states.length,edges:edges.length,stats:report.result,priorFiles:report.priorDerivedFilesExamined,priorErrors:errorRows.length,
 priorURLFlags:states.map(s=>({path:s.path,knownMetadata:s.hasEarlierURLMetadata,hasPriorX11Body:s.hasX11WarcBodyAtURL,controls:s.controlCount,collections:s.collectionCount,items:s.collectedItemCount}))}));