import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived');
const run=process.argv[2]||fs.readdirSync(dir).filter(n=>n.startsWith('X14-WAPPALYZER-TRUE180-')&&n.endsWith('-technology-timeline.json')).map(n=>n.replace('-technology-timeline.json','')).sort().at(-1);
if(!run)throw Error('No X14 timeline');
const read=(file)=>{const b=fs.readFileSync(file);if(b.length>=2&&b[0]===255&&b[1]===254)return JSON.parse(b.subarray(2).toString('utf16le').replace(/^\uFEFF/,''));return JSON.parse(b.toString('utf8').replace(/^\uFEFF/,''))};
const timeline=read(path.join(dir,run+'-technology-timeline.json'));
const evidence=read(path.join(dir,run+'-fingerprint-evidence.json'));
const official=read(path.join(dir,'X14-Wappalyzer-official-CLI-Gladeye-first-scan-2026-11-19.json'));
const old1=read(path.join(root,'01-private-captures/X01-REDO/X01-R2-2026-11-18T18-01-09-463Z/private-capture-manifest.json'));
const old2=read(path.join(root,'01-private-captures/X02/X02-2026-11-18T17-49-35-108Z/sanitized-metadata-only.har'));
const old11=read(path.join(dir,'X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json'));
const old12=read(path.join(dir,'X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z-temporal-observation.json'));
const old13=read(path.join(dir,'X13-HAR-CDP-TRUE180-2026-11-19T12-39-13-668Z-X01-X12-HAR-novelty-and-waterfall.json'));
const paths=new Map(),firstParty=u=>{try{return['gladeye.com','www.gladeye.com'].includes(new URL(u).hostname)}catch{return false}},normal=u=>{try{const t=new URL(u);return t.origin+t.pathname}catch{return null}};
function add(stage,u){const n=normal(u);if(!n||!firstParty(n))return;const set=paths.get(n)||new Set();set.add(stage);paths.set(n,set)}
for(const e of old1.responses||[])add('X01_raw',e.url);
for(const e of old2.log.entries||[])add('X02_har',e.request?.url);
for(const e of old11.rows||[])if(e.firstParty)add('X11_WARC','https://'+e.host+e.path);
for(const tick of old12.ticks||[])for(const e of tick.page?.resources||[])add('X12_temporal',e.url);
for(const x of old13.pathCrosswalk||[])add('X13_HAR',x.url);
const reportNames=fs.readdirSync(dir).filter(n=>/^X(?:0[1-9]|1[0-3])[-_.]/i.test(n)&&n.endsWith('.json')&&fs.statSync(path.join(dir,n)).size<6000000);
const priorTexts=[];let parseErrors=0;
for(const name of reportNames){try{const obj=read(path.join(dir,name));priorTexts.push({name,text:JSON.stringify(obj)})}catch{parseErrors++}}
const oldSource=(old1.responses||[]).filter(x=>x.private_rel&&/javascript|text\/html|text\/css/i.test(x.mime||'')).map(x=>({meta:x,file:path.join(root,x.private_rel)})).filter(x=>fs.existsSync(x.file)).map(x=>({...x,body:fs.readFileSync(x.file,'utf8')}));
const names=[...new Set([...(official.technologies||[]).map(x=>x.name),...(timeline.detections||[]).map(x=>x.name)])];
const hints={
'Three.js':['Three.js','__THREE__','THREE.REVISION','WebGLRenderer','REVISION'], 'Next.js':['Next.js','__NEXT_DATA__','_next/static','next.version'],
'React':['React','react-dom','__REACT_DEVTOOLS_GLOBAL_HOOK__'], 'Webpack':['webpack','__webpack_require__','webpackChunk'],
'Tailwind CSS':['tailwindcss','--tw-rotate','--tw-translate'], 'Vercel':['vercel','x-vercel-cache'],
'Module Federation':['Module Federation','data-webpack'], 'Google Tag Manager':['Google Tag Manager','googletagmanager.com'],
'Google Analytics':['Google Analytics','google-analytics.com'], HSTS:['strict-transport-security'],
'Priority Hints':['fetchpriority'], 'Open Graph':['og:title','og:description']
};
const rows=names.map(name=>{
 const tokens=hints[name]||[name], hitsDerived=priorTexts.filter(x=>tokens.some(t=>x.text.toLowerCase().includes(t.toLowerCase()))).map(x=>x.name);
 const hitsRaw=oldSource.filter(x=>tokens.some(t=>x.body.toLowerCase().includes(t.toLowerCase()))).map(x=>({relativeFile:x.meta.private_rel,source:x.meta.url,sha256:x.meta.sha256})).slice(0,8);
 const primary=timeline.detections.find(x=>x.name===name)||official.technologies.find(x=>x.name===name);
 const proofs=(evidence.matchedEvidence||[]).filter(x=>x.name===name);
 let grade=proofs.length?'HEURISTIC_DIRECT_SIGNATURE':'TOOL_INFERRED_OR_UNEXPLAINED';
 if(['Node.js','React','Webpack'].includes(name)&&proofs.length===0)grade='MAY_BE_INFERRED_BY_NEXTJS_RULE';
 if(name==='Three.js'&&proofs.some(x=>x.patternType==='js'||x.channel==='js-global'))grade='DIRECT_THREE_RUNTIME_GLOBAL_REVISION_RULE';
 return{name,version:primary?.version||null,confidence:primary?.confidence??null,categories:primary?.categories||[],grade,channelTypes:[...new Set(proofs.map(x=>x.patternType))],priorDerivedReportMatches:hitsDerived.length,priorDerivedReportExamples:hitsDerived.slice(0,8),priorRawScriptHits:hitsRaw.length,priorOriginalRawAssetExamples:hitsRaw,interpretation:'Rule or source-name match is not proof of active source code execution or backend implementation'};
});
const current=[...new Set((evidence.firstPartyResourcePaths||[]).filter(firstParty).map(normal))].sort();
const novel=current.filter(x=>!paths.has(x));
const x12Menu=read(path.join(dir,'X12-GLADEYE-menu-expanded-interactive-DOM-state-2026-11-19.json'));
const menuPaths=new Set((x12Menu.after?.visibleLinks||[]).filter(x=>typeof x.path==='string'&&x.path.startsWith('/')).map(x=>'https://www.gladeye.com'+x.path));
const noveltyClarification=novel.map(url=>({url,previouslyObservedAsX12MenuHref:menuPaths.has(url),sourceBodyNotPreviouslyIndexed:true,classification:menuPaths.has(url)?'KNOWN_X12_NAV_LINK_NEW_X14_HTTP_RESPONSE_BODY':'NEW_X14_STATIC_RESOURCE_PATH_AND_BODY'}));
const oldHashes=new Set((old1.responses||[]).map(x=>x.sha256).filter(Boolean));
const scriptHashes=(evidence.firstPartyScriptHashOnly||[]).map(x=>({...x,exactPriorX01SHA256:oldHashes.has(x.sha256)}));
const result={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X14',run,status:'X14_FINGERPRINT_X01_X13_CROSSWALK_COMPLETE',source:'HTTPArchive/wappalyzer',sourceCommit:timeline.sourceRuntimeVerified?.sourceGitHead,
 historic:{parsedDerivedX01toX13Reports:priorTexts.length,parseErrors,oldX01RawResponses:old1.responses.length,oldX02HAREntries:old2.log.entries.length,oldX11WARCResponseRows:old11.rows.length,oldX12Ticks:old12.ticks.length,oldX13UniqueFirstPartyPaths:old13.measured?.uniqueFirstPartyPaths,indexedUniqueFirstPartyPaths:paths.size,priorOriginalJSHTMLCSSFilesScanned:oldSource.length},
 observed:{durationSeconds:timeline.observedSeconds,timeSamples:timeline.observations.length,officialTechnologyNames:official.technologies.map(x=>x.name),liveTechnologyNames:timeline.detections.map(x=>x.name),mergedTechnologyCount:rows.length,currentFirstPartyURLPaths:current.length,priorKnownFirstPartyURLPaths:current.length-novel.length,novelFirstPartyPathCount:novel.length,scriptSourceSHACompared:scriptHashes.length,scriptSHAMatchedX01:scriptHashes.filter(x=>x.exactPriorX01SHA256).length},
 technologyEvidenceRows:rows,urlComparison:current.map(url=>({url,priorStages:[...(paths.get(url)||[])],previouslyIndexed:paths.has(url)})),novelFirstPartyURLPaths:novel,noveltyClarification,scriptSHAComparison:scriptHashes,
 relevantLessons:['The named technologies are NEWLY STRUCTURED FINGERPRINT EVIDENCE, not necessarily new software source assets.','React, Webpack, and Node.js can be implied by the Next.js detection rule; backend Node server not independently verified.','Three.js version detection from __THREE__ global is stronger evidence than generic bundle substring but actual GPU code paths remain independent work.','Module Federation pattern can be a generic webpack data-webpack false positive, not proof of remote microfrontends.','A positive Tailwind CSS signature indicates matching CSS tokens, not independently verified package-lock version.','No raw HTML/JS/GLB/shader/texture copy into GitHub or duplicate raw owner archives.']};
const outfile=path.join(dir,run+'-X01-X13-novelty-and-tech-provenance.json');
fs.writeFileSync(outfile,JSON.stringify(result,null,2));
console.log('X14_DEDUPE_COMPLETE',JSON.stringify({outfile,stats:result.observed,baseline:result.historic,techs:rows.map(x=>({name:x.name,version:x.version,grade:x.grade,priorDerived:x.priorDerivedReportMatches,priorSource:x.priorRawScriptHits})),novelPaths:novel}));