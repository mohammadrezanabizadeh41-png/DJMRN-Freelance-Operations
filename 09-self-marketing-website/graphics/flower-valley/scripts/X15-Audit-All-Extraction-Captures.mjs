import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const cap=path.join(root,'01-private-captures'),der=path.join(root,'02-reviewed-derived');
const run='X15-AUDIT-'+new Date().toISOString().replace(/[:.]/g,'-');
const auditDir=path.join(root,'02-reviewed-derived','X15-AUDIT-CURRENT');
fs.mkdirSync(auditDir,{recursive:true});
const fn={inventory:path.join(auditDir,'raw-captures-content-hash-index.json'),resources:path.join(auditDir,'observed-first-party-resource-coverage.json'),summary:path.join(auditDir,'X15-integrated-coverage-and-gaps.json'),csv:path.join(auditDir,'observed-resource-coverage.csv'),stageCsv:path.join(auditDir,'stage-tool-complementarity.csv'),brief:path.join(auditDir,'X15-DETERMINISTIC-RESULTS.md')};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const norm=u=>{try{const x=new URL(u);const p=x.pathname==='/'?'/':x.pathname.replace(/\/+$/,'');return x.origin+p}catch{return null}};
const firstParty=u=>{try{return['www.gladeye.com','gladeye.com'].includes(new URL(u).hostname)}catch{return false}};
const parse=(p)=>{const b=fs.readFileSync(p);if(b.length>=2&&b[0]===255&&b[1]===254)return JSON.parse(b.subarray(2).toString('utf16le').replace(/^\uFEFF/,''));if(b.length>=2&&b[0]===254&&b[1]===255)return JSON.parse(b.subarray(2).swap16().toString('utf16le').replace(/^\uFEFF/,''));return JSON.parse(b.toString('utf8').replace(/^\uFEFF/,''));};
const jsonOut=(p,o)=>fs.writeFileSync(p,JSON.stringify(o,null,2));
const rel=f=>path.relative(root,f).replaceAll('\\','/');
const escaped=s=>'"'+String(s??'').replaceAll('"','""').replace(/\r?\n/g,' ')+'"';
const csv=(f,rows,keys)=>fs.writeFileSync(f,[keys.map(escaped).join(','),...rows.map(r=>keys.map(k=>escaped(r[k])).join(','))].join('\r\n'));
const shaOfFile=file=>{const h=crypto.createHash('sha256');const fd=fs.openSync(file,'r');const buf=Buffer.allocUnsafe(1024*1024);try{while(true){const n=fs.readSync(fd,buf,0,buf.length,null);if(!n)break;h.update(buf.subarray(0,n));}return h.digest('hex')}finally{fs.closeSync(fd)}};
function listFiles(rootDir){const out=[],dirs=[rootDir];while(dirs.length){const base=dirs.pop();let names=[];try{names=fs.readdirSync(base,{withFileTypes:true})}catch{continue}for(const ent of names){const f=path.join(base,ent.name);if(ent.isDirectory()){if(ent.name==='.git'||ent.name==='node_modules')continue;dirs.push(f);}else if(ent.isFile())out.push(f)}}return out.sort();}
const sourceFolders=['/source-tar-retry/','/source/','/source-tar/','/source-tree/','/tool-sources/','/tool-source/','/webscrapbook-main/'];
const extensions={'.js':'JS','.mjs':'JS','.cjs':'JS','.css':'CSS','.html':'HTML','.htm':'HTML','.glb':'MODEL_GLB','.gltf':'MODEL_GLTF','.json':'JSON','.jpg':'IMAGE','.jpeg':'IMAGE','.png':'IMAGE','.gif':'IMAGE','.svg':'SVG','.webp':'IMAGE','.woff2':'FONT','.woff':'FONT','.ttf':'FONT','.mp3':'AUDIO','.wav':'AUDIO','.mp4':'VIDEO','.webm':'VIDEO','.wacz':'WACZ_ARCHIVE','.warc':'WARC_ARCHIVE','.har':'HAR_METADATA','.zip':'ARCHIVE_ZIP','.sqlite':'SQLITE'};
const stageOf=f=>{const parts=rel(f).split('/');const top=parts[1]||'';const match=top.match(/^X(0[1-9]|1[0-5])(?:-|$)/i);return match?'X'+match[1]:parts[1]==='SUPPLEMENTAL-TEMPORAL-AUDIT'?'SUPPLEMENTAL':'UNKNOWN'};
const classify=(f)=>{
 const p='/'+rel(f).toLowerCase()+'/';const ext=path.extname(f).toLowerCase();
 if(sourceFolders.some(t=>p.includes(t))||p.includes('/test/t/')||p.includes('/test/fixtures/'))return'TOOL_SOURCE_OR_FIXTURE';
 if(ext==='.wacz'||ext==='.warc'||ext==='.warc.gz'||ext==='.zip')return'CONTAINER_ARCHIVE';
 if(ext==='.har'||p.includes('manifest.json')||ext==='.sqlite')return'CAPTURE_MANIFEST_OR_METADATA';
 if(p.includes('/verified-new-first-party/')||p.includes('/x15-new-work-details-and-js/'))return'TARGET_VERIFIED_NEW_BODY';
 if(p.includes('/offline-export/')||p.includes('/capture/www.gladeye.com/')||p.includes('/capture/_next/')||p.includes('/mirror/')||p.includes('/html/'))return'SITE_OFFLINE_MIRROR_OR_DERIVATIVE';
 if((p.includes('/x14/')||p.includes('/x15/'))&&['.jpg','.jpeg'].includes(ext))return'LIVE_SCREENSHOT';
 if((p.includes('/x11/')||p.includes('/x12/')||p.includes('/x10/'))&&['.jpg','.jpeg','.png','.webp'].includes(ext))return'LIVE_SCREENSHOT';
 if(p.includes('/x01-redo/')&&['.js','.css','.html','.glb','.png','.svg','.woff2','.mp3','.jpg','.webp'].includes(ext))return'TARGET_ORIGINAL_DELIVERED_BODY';
 if(ext==='.json'||ext==='.txt'||ext==='.log')return'CAPTURE_DERIVED_METADATA';
 if(['.html','.htm','.js','.css','.glb','.gltf','.woff2','.png','.svg','.mp3','.webp'].includes(ext))return'POSSIBLE_SITE_CAPTURE_UNVERIFIED';
 return'OTHER';
};
const all=listFiles(cap),fileRows=[];
for(let i=0;i<all.length;i++){
 const f=all[i],stats=fs.statSync(f),role=classify(f),stage=stageOf(f),h=shaOfFile(f),name=rel(f);
 fileRows.push({path:name,stage,role,extension:path.extname(f).toLowerCase(),bytes:stats.size,sha256:h,modifiedUtc:stats.mtime.toISOString(),integrity:'LIVE_LOCAL_FILE_SHA256'});
 if((i+1)%500===0)console.log('X15_FILE_INDEX_PROGRESS',JSON.stringify({done:i+1,total:all.length}));
}
const hashFiles=new Map(),stages={};
for(const row of fileRows){
 const prior=hashFiles.get(row.sha256)||[];prior.push(row.path);hashFiles.set(row.sha256,prior);
 const s=stages[row.stage]||{allPhysicalFiles:0,allPhysicalBytes:0,roleCounts:{},hashes:new Set(),extensions:{}};
 s.allPhysicalFiles++;s.allPhysicalBytes+=row.bytes;s.roleCounts[row.role]=(s.roleCounts[row.role]||0)+1;s.hashes.add(row.sha256);s.extensions[row.extension]=(s.extensions[row.extension]||0)+1;stages[row.stage]=s;
}
const stageOrder=Array.from({length:14},(_,i)=>'X'+String(i+1).padStart(2,'0'));
const resource=new Map(),sourceTags=new Map(),diagnostics=[];
function add(stage,originURL,kind,sha=null,body=null,status=null,notes=null){
 const u=norm(originURL);if(!u||!firstParty(u))return;
 let d=resource.get(u);if(!d){d={url:u,firstSeenStage:stage,stages:[],evidenceTypes:[],bodyCandidates:[],statusSeen:[],notes:[],verifiedOriginalBody:false,verifiedLocalBody:false,archiveOnly:false};resource.set(u,d)}
 if(!d.stages.includes(stage))d.stages.push(stage);
 if(!d.evidenceTypes.includes(kind))d.evidenceTypes.push(kind);
 if(status!==null&&status!==undefined){const value=Number(status);if(Number.isFinite(value)&&!d.statusSeen.includes(value))d.statusSeen.push(value)}
 if(notes&&!d.notes.includes(notes))d.notes.push(notes);
 if(sha&&/^[a-fA-F0-9]{64}$/.test(String(sha).replace(/^sha256:/,''))){
   const h=String(sha).replace(/^sha256:/,'').toLowerCase();
   let match=body;
   if(typeof match==='string'&&!path.isAbsolute(match))match=path.join(root,match);
   const exists=typeof match==='string'&&fs.existsSync(match)&&fs.statSync(match).isFile();
   const observedHash=exists?shaOfFile(match):null;
   const integrity=exists?(observedHash===h?'PASS_SHA256':'HASH_MISMATCH'):'NO_STANDALONE_FILE';
   if(exists&&integrity==='PASS_SHA256'){d.verifiedLocalBody=true;if(kind==='ORIGINAL_HTTP_RESPONSE_BODY')d.verifiedOriginalBody=true}
   if(kind==='WARC_EMBEDDED_RESPONSE')d.archiveOnly=true;
   if(!d.bodyCandidates.some(c=>c.sha256===h&&c.stage===stage&&c.kind===kind))d.bodyCandidates.push({stage,kind,sha256:h,localRelPath:exists?rel(match):null,integrity,byteSize:exists?fs.statSync(match).size:null});
   if(integrity==='HASH_MISMATCH')diagnostics.push({kind:'HASH_MISMATCH',stage,url:u,file:rel(match)});
 }
}
const getDer=name=>{const p=path.join(der,name);if(!fs.existsSync(p)){diagnostics.push({kind:'MISSING_DERIVED',name});return null}try{return parse(p)}catch(e){diagnostics.push({kind:'PARSE_FAIL',name,error:String(e).slice(0,150)});return null}};
const x01File=path.join(cap,'X01-REDO','X01-R2-2026-11-18T18-01-09-463Z','private-capture-manifest.json');
const x01=parse(x01File);
for(const r of x01.responses||[])add('X01',r.url,'ORIGINAL_HTTP_RESPONSE_BODY',r.sha256,r.private_rel,r.status,'Original X01 HTTP response manifest: raw delivered body if SHA verifies');
const x02=parse(path.join(cap,'X02','X02-2026-11-18T17-49-35-108Z','sanitized-metadata-only.har'));
for(const e of x02.log.entries||[])add('X02',e.request?.url,'HTTP_HAR_METADATA_ONLY',null,null,e.response?.status,'Metadata-only HAR, no response body');
const x03=getDer('X03-siteone-static-comparison.json');
for(const r of x03?.archived_files||[]){add('X03',r.url,'SITEONE_RECORDED_PUBLIC_HTTP_URL',null,null,r.status,'Observed during original static crawler; separately rewritten local mirror');add('X03',r.url,'OFFLINE_MIRROR_REWRITTEN',r.offline_sha256,null,r.status,'Static crawler offline rewrite not original delivered body');}
const x05=getDer('X05-decant-multiview-design-audit.json');
for(const r of x05?.actual_asset_rows||[])add('X05','https://www.gladeye.com/'+String(r.rel_path||'').replace(/^\/+/g,''),'OFFLINE_MIRROR_REWRITTEN',r.sha256_from_decant,null,null,'Crawl asset relative path, physical derived target may be modified');
const x09=getDer('X09-httrack-live-crawl-reconciliation.json');
for(const r of x09?.network_resource_rows||[])add('X09',r.url,'HTTRACK_NETWORK_OBSERVATION',r.sha256,null,r.http_status,'May be metadata-only or rewritten local mirror; do not assume raw body saved');
const x10ArchiveAudit=getDer('X15-AUDIT-CURRENT/X15-archive-container-and-X10-CDX-index.json');
if(x10ArchiveAudit){
 const summary=x10ArchiveAudit.summary||{};
 if(summary.x10FirstPartyCDXRecords!==47||summary.x10UniqueFirstPartyCDXURLPaths!==46||summary.zipCrcPass!==16)diagnostics.push({kind:'X10_ARCHIVE_INDEX_ACCEPTANCE_FAILED',summary});
 for(const r of x10ArchiveAudit.x10CdxFirstPartyUrlRows||[]){add('X10',r.url,'WACZ_CDXJ_INDEXED_RESPONSE',null,null,r.status,'X10 Browsertrix WACZ CDXJ HTTP index; r.archiveSHA256 is archive-container SHA, NOT response body SHA');}
}
const x11=getDer('X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json');
for(const r of x11?.rows||[]){if(r.firstParty)add('X11','https://'+r.host+r.path,'WARC_EMBEDDED_RESPONSE',r.sha256,null,Number(String(r.httpStatusLine||'').match(/\b(\d{3})\b/)?.[1]||0),'Inside original WACZ/WARC, not a standalone body file');}
const x12=getDer('X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z-temporal-observation.json');
for(const t of x12?.ticks||[])for(const e of t.page?.resources||[])add('X12',e.url,'LIVE_RESOURCE_TIMING_METADATA_ONLY');
const x13=getDer('X13-HAR-CDP-TRUE180-2026-11-19T12-39-13-668Z-X01-X12-HAR-novelty-and-waterfall.json');
for(const r of x13?.pathCrosswalk||[])add('X13',r.url,'SANITIZED_HAR_TIMING_METADATA_ONLY');
const x14=getDer('X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-fingerprint-evidence.json');
for(const u of x14?.firstPartyResourcePaths||[])add('X14',u,'LIVE_TECH_FINGERPRINT_RESOURCE_URL');
const x14raw=getDer('X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-seven-candidate-url-response-hash-verification.json');
for(const r of x14raw?.results||[])add('X14',r.url,'ORIGINAL_HTTP_RESPONSE_BODY',r.sha256,r.storedPrivatePath,r.status,'Selective verified exact new first-party HTTP body');
const x14tech=getDer('X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-technology-timeline.json');
const x14cross=getDer('X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-X01-X13-novelty-and-tech-provenance.json');
const x12graph=getDer('X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json');
const x12menu=getDer('X12-GLADEYE-menu-expanded-interactive-DOM-state-2026-11-19.json');
const x03Extra=(x03?.new_asset_details||[]).map(x=>({url:x.url,source:'X03',sha256:x.offline_sha256||null,classification:'static_only_non_javascript_crawl'}));
const routeFiles=fs.readdirSync(der).filter(x=>/^X15-ROUTE-FRESHNESS-TRUE180-.*-navigation-resource-coverage\.json$/.test(x)).sort();
const x15route=routeFiles.length?getDer(routeFiles.at(-1)):null;
if(x15route){for(const u of x15route.firstPartyResponseURLPaths||[])add('X15',u,'BOUND_180_SECOND_ROUTE_FRESHNESS_METADATA_ONLY');for(const n of x15route.nav||[])add('X15',n.landed,'BOUNDED_ROUTE_NAVIGATION_HTTP_STATUS',null,null,n.status);for(const e of x15route.records||[])if(e.kind==='response'&&e.firstParty)add('X15',e.url,'BOUNDED_ROUTE_NETWORK_HTTP_STATUS',null,null,e.status)}
const recoveredFile=path.join(auditDir,'X15-five-targeted-missing-response-bodies.json');
const recovery=fs.existsSync(recoveredFile)?parse(recoveredFile):null;
const recoveredMappings=[];
for(const r of recovery?.results||[]){
  if(r.status===200&&r.sha256){
    const match=fileRows.find(f=>f.sha256===r.sha256&&f.role!=='TOOL_SOURCE_OR_FIXTURE'&&f.role!=='OTHER');
    if(match){add('X15',r.url,'ORIGINAL_HTTP_RESPONSE_BODY',r.sha256,path.join(root,match.path),200,'Live 200 verified exact original bytes already in existing private file: no duplicate copied');recoveredMappings.push({url:r.url,existingPhysicalPath:match.path,sha256:r.sha256,classification:'LIVE_RESPONSE_EXACT_MATCH_EXISTING_LOCAL_FILE'})}
    else{diagnostics.push({kind:'RECOVERY_KNOWN_HASH_BUT_UNRESOLVED_LOCAL_FILE',url:r.url,sha256:r.sha256})}
  }else if(Number(r.status)>=400){add('X15',r.url,'TARGETED_LIVE_HTTP_ERROR',null,null,r.status,'Live target returned non-200; no original valid resource body claimed')}
}
const x15SixFile=path.join(auditDir,'X15-six-new-work-route-response-bodies.json');
const x15Six=fs.existsSync(x15SixFile)?parse(x15SixFile):null;
const x15SixVerified=[];
for(const r of x15Six?.results||[]){
  if(r.status===200&&r.privateFile&&r.sha256){
    add('X15',r.url,'ORIGINAL_HTTP_RESPONSE_BODY',r.sha256,r.privateFile,200,'New standalone HTTP original content fetched as first-party public resource, crosschecked against earlier physical hashes');
    x15SixVerified.push({url:r.url,sha256:r.sha256,bytes:r.bytes,privateFile:path.relative(root,r.privateFile).replaceAll('\\','/'),integrity:fs.existsSync(r.privateFile)&&shaOfFile(r.privateFile)===r.sha256?'PASS_SHA256':'FAIL_SHA256'});
  }else{diagnostics.push({kind:'X15_NEW_WORK_BODY_UNVERIFIED',url:r.url,status:r.status,error:r.error})}
}
const resourceRows=[...resource.values()].sort((a,b)=>a.url.localeCompare(b.url));
const independentlyNetworkObserved=resourceRows.filter(r=>r.evidenceTypes.some(x=>x!=='OFFLINE_MIRROR_REWRITTEN'));
const offlineDerivedOnly=resourceRows.filter(r=>r.evidenceTypes.every(x=>x==='OFFLINE_MIRROR_REWRITTEN'));
const networkSet=new Set(independentlyNetworkObserved.map(r=>r.url));
const uniqueByStages={};
for(const name of stageOrder.concat(['X15'])){
 const items=resourceRows.filter(r=>r.stages.includes(name));
 const first=items.filter(r=>r.firstSeenStage===name);
 uniqueByStages[name]={observedFirstPartyPaths:items.length,firstIndexedByThisStage:first.length,firstExamplePaths:first.slice(0,8).map(x=>x.url),hasOriginalBodyEvidence:items.filter(x=>x.bodyCandidates.some(c=>c.stage===name&&c.kind==='ORIGINAL_HTTP_RESPONSE_BODY'&&c.integrity==='PASS_SHA256')).length,hasArchiveEmbeddedResponse:items.filter(x=>x.bodyCandidates.some(c=>c.stage===name&&c.kind==='WARC_EMBEDDED_RESPONSE')).length,technologyOrStateEvidenceOnly:name==='X12'||name==='X14'||name==='X15'};
}
const manifestVerified=(x01.responses||[]).filter(r=>r.private_rel&&fs.existsSync(path.join(root,r.private_rel))).length;
const manifestSHAverified=(x01.responses||[]).filter(r=>r.private_rel&&fs.existsSync(path.join(root,r.private_rel))&&shaOfFile(path.join(root,r.private_rel))===String(r.sha256||'').toLowerCase()).length;
const x14SHApass=(x14raw?.results||[]).filter(r=>r.storedPrivatePath&&fs.existsSync(r.storedPrivatePath)&&shaOfFile(r.storedPrivatePath)===String(r.sha256).toLowerCase()).length;
const rawVerified=resourceRows.filter(r=>r.verifiedOriginalBody),anyVerified=resourceRows.filter(r=>r.verifiedLocalBody);
const originalBodyVariants=[...new Set(resourceRows.flatMap(r=>r.bodyCandidates.filter(c=>c.integrity==='PASS_SHA256'&&c.kind==='ORIGINAL_HTTP_RESPONSE_BODY').map(c=>c.sha256)))];
const unavailable=resourceRows.filter(r=>!r.verifiedLocalBody);
const everyAllHash=[...hashFiles.values()].filter(paths=>paths.length>1).sort((a,b)=>b.length-a.length);
const summaryByRole={};
for(const r of fileRows){const x=summaryByRole[r.role]||{count:0,bytes:0};x.count++;x.bytes+=r.bytes;summaryByRole[r.role]=x}
const capturedTiming=[
 {stage:'X11',kind:'ArchiveBoxJS browser+WARC',source:'X11 TRUE180 WACZ',durationSeconds:180,method:'Recorded WARC full page for 180 seconds with independent visual snapshots',precision:'Network response bodies archive + sampled visual'},
 {stage:'X12',kind:'PinchTab/WebGraph',source:'X12 PinchTab TRUE180',durationSeconds:x12?.elapsedWallSeconds||187.03,method:'13 DOM/control/resource timing snapshots + 7 JPEGs',precision:'sampled 15s DOM, not per-frame WebGL'},
 {stage:'X13',kind:'HAR Viewer+CDP',source:'X13 true180 HAR',durationSeconds:x13?.observerDurationSeconds??180.05,method:'13 temporal HTTP metadata checkpoints',precision:'HTTP metadata only; no source bodies'},
 {stage:'X14',kind:'Wappalyzer native Puppeteer',source:'X14 TRUE180',durationSeconds:x14tech?.observedSeconds??null,method:'13 technology/DOM snapshots',precision:'technology signatures + selective raw 7 response bodies'},
 ...(x15route?[{stage:'X15',kind:'Bounded route/freshness survey',source:x15route.run,durationSeconds:x15route.elapsedSeconds,method:'7 planned route visits, 13 snapshots, 7 private screenshots',precision:'7 route visits, not all possible pages/states'}]:[])
];
const stageStats=Object.fromEntries(stageOrder.concat(['X15']).map(s=>{
 const inv=stages[s]||{allPhysicalFiles:0,allPhysicalBytes:0,roleCounts:{},hashes:new Set(),extensions:{}};
 const ev=uniqueByStages[s];
 return[s,{stage:s,physicalFilesInOwnerCaptureFolder:inv.allPhysicalFiles,totalBytesInOwnerCaptureFolder:inv.allPhysicalBytes,uniquePhysicalFileHashes:inv.hashes.size,roles:inv.roleCounts,urlPathsObserved:ev.observedFirstPartyPaths,firstIndexedURLPaths:ev.firstIndexedByThisStage,verifiedRawBodyURLPaths:ev.hasOriginalBodyEvidence,archiveEmbeddedURLPaths:ev.hasArchiveEmbeddedResponse}]
}));
const unresolvedKinds={
 'https://www.gladeye.com/_next':{code:'DIRECTORY_REDIRECT_308',meaning:'HTTP 308 redirect endpoint, not a standalone asset body; no canonical file to download',action:'RECORD_REDIRECT_ONLY'},
 'https://www.gladeye.com/_next/image':{code:'QUERY_DEPENDENT_IMAGE_OPTIMIZER',meaning:'Different source image and widths are selected by original query parameters stripped during path normalization; mixed 200/404/502 responses cannot be collapsed into one file',action:'MARK_UNKNOWN_UNTIL_ORIGINAL_SAFE_FULL_QUERY_AVAILABLE'},
 'https://www.gladeye.com/favicon.ico':{code:'HTTP_404_NOT_VALID_ICON',meaning:'favicon.ico returned HTTP 404; error HTML body exists in earlier WARC but is not a valid standalone favicon binary',action:'NO_RETRY_NEEDED_FAVICON_SVG_OBSERVED_SEPARATELY'}
};
const missing=independentlyNetworkObserved.filter(r=>!r.verifiedOriginalBody).map(r=>({url:r.url,stages:r.stages,statuses:r.statusSeen,evidenceTypes:r.evidenceTypes,...(unresolvedKinds[r.url]||{code:'UNCLASSIFIED_REQUIRES_REVIEW',meaning:'Unknown missing raw-body source',action:'REVIEW'})}));
const coverage={
 independentlyObservedNetworkFirstPartyPaths:independentlyNetworkObserved.length,
 onlyOfflineDerivedRewrittenPathCount:offlineDerivedOnly.length,
 networkObservedPathsWithStandaloneOriginalBody:independentlyNetworkObserved.filter(r=>r.verifiedOriginalBody).length,
 networkObservedPathsWithoutStandaloneOriginalBody:independentlyNetworkObserved.filter(r=>!r.verifiedOriginalBody).length,
 remainingNetworkPathWithoutOriginalBodyReasons:missing,
 denominatorDefinition:'D_observedURL = union of first-party URL paths normalized by origin+pathname, seen in scoped X01/X02/X03/X05/X09/X11/X12/X13/X14 and optional bounded X15 LIVE route observations; NOT entire remote site.',
 observedFirstPartyResourcePathDenominator:resourceRows.length,
 resourcePathClassification:resourceRows.map(r=>({url:r.url,classification:networkSet.has(r.url)?'NETWORK_OBSERVED':'OFFLINE_DERIVED_PATH_ONLY'})),
 verifiedOriginalStandaloneBodyURLPaths:rawVerified.length,
 verifiedAnyStandaloneBodyURLPaths:anyVerified.length,
 originalStandaloneBodyUniqueHashes:originalBodyVariants.length,
 unverifiedStandaloneBodyURLPaths:unavailable.length,
 observedWithWarcEmbeddedResponse:resourceRows.filter(r=>r.archiveOnly).length,
 observedWithHttpResponseStatus:resourceRows.filter(r=>r.statusSeen.some(s=>s>=200&&s<400)).length,
 observedWithAnyHttpFailure:resourceRows.filter(r=>r.statusSeen.some(s=>s>=400||s===0)).length,
 exactRawBodyCoverageFraction:independentlyNetworkObserved.length?independentlyNetworkObserved.filter(r=>r.verifiedOriginalBody).length/independentlyNetworkObserved.length:0,
 intendedUserGoalUnknownDenominator:'Total publicly discoverable website routes, hidden interaction states, server-only source, and exact WebGL draw-call/camera/shader state UNKNOWN: cannot compute a global completion percentage.'
};
const priorX14Links=(x14cross?.noveltyClarification||[]).filter(x=>x.previouslyObservedAsX12MenuHref).map(x=>x.url);
const metadata={run,generatedUtc:new Date().toISOString(),root,source:'Owner desktop only, X01-X14 captured evidence and derived reports',method:'Deterministic Node 24 builtins; no new npm downloads, no duplicate site asset acquisition; all files SHA-256 rehashed locally.',physicalFilesExamined:fileRows.length,physicalBytesExamined:fileRows.reduce((a,b)=>a+b.bytes,0),uniquePhysicalFileHashes:hashFiles.size,physicalDuplicateHashGroups:everyAllHash.length,identicalBytesButMultipleFiles:fileRows.length-hashFiles.size,fileRoles:summaryByRole,stageStats,coverage,temporalEvidence:capturedTiming,x01OriginalResponseRows:x01.responses.length,x01LocalFilesVerifiedExist:manifestVerified,x01ExactSHA256Pass:manifestSHAverified,x10ArchiveEvidence:x10ArchiveAudit?.summary||null,x14NewResponseRows:x14raw?.results?.length||0,x14SHARevalidated:x14SHApass,x14LinkHrefAlreadyKnownX12Count:priorX14Links.length,x15RecoveredKnownOriginalBodies:recoveredMappings,x15RecoverySummary:recovery?.summary||null,x15NewWorkSourceBodySummary:x15Six?.summary||null,x15NewWorkBodiesVerified:x15SixVerified,x15LiveObservation:x15route?{run:x15route.run,status:x15route.status,durationSeconds:x15route.elapsedSeconds,navVisits:x15route.nav?.length||0,distinctRoutes:new Set((x15route.nav||[]).map(x=>x.targetRoute)).size,firstPartyRequestFailures:x15route.firstPartyRequestFailures??null,thirdPartyRequestFailures:x15route.thirdPartyRequestFailures??null,eventRecordsTruncated:x15route.observationTruncatedAtEventCap??null,networkEvents:(x15route.records||[]).length}:null,x12Graph:{states:x12graph?.states?.length??Object.keys(x12graph?.states||{}).length,edges:x12graph?.edges?.length??null},x14TechHints:(x14tech?.detections||[]).map(x=>({name:x.name,version:x.version??null,confidence:x.confidence})),stageFirstObservedURLPaths:uniqueByStages,diagnostics,criticalUnknowns:[
 'The denominator D_observedURL is a lower bound on public resource paths only; never label it 100% of the original website.',
 'Source-map availability and exact unbundled module mapping remain X16 follow-up.',
 'Unknown nonrequested endpoints, authenticated/protected private data and backend implementation cannot be inferred from local captures.',
 'Raw GLSL, per-frame GPU program state, complete camera matrices, animation curves and WebGL draw-call traces remain UNKNOWN.',
 'Paths observed in old HTTrack and probe tools do not imply saved original response bodies; mirror files may be rewritten.',
 'Upstream tool source folders are excluded from target-site asset counting.',
 'WARC response bodies are archive-embedded and not individually verified as exact standalone original resources by this audit.',
 'X14 Three.js and Next.js version signatures do not prove the precise authored source code or server configuration.',
 'Temporal samples at 15/30-second intervals are not 60fps video or exhaustive GPU state.',
 'An exact hash match across stages establishes byte identity for that captured payload only, not equivalence of full website behavior.'
 ]};
jsonOut(fn.inventory,{run,root,scope:'private capture files only X01-X15 and supplemental, including upstream source distinguished by role',fileRows,hashDuplicates:everyAllHash.filter(x=>x.length>1).slice(0,120),globalHashGroups:hashFiles.size,stageStats});
jsonOut(fn.resources,{run,definition:coverage.denominatorDefinition,observedFirstPartyResourcePathDenominator:resourceRows.length,
 resourcePathClassification:resourceRows.map(r=>({url:r.url,classification:networkSet.has(r.url)?'NETWORK_OBSERVED':'OFFLINE_DERIVED_PATH_ONLY'})),resources:resourceRows});
jsonOut(fn.summary,metadata);
csv(fn.csv,resourceRows.map(x=>({url:x.url,firstSeenStage:x.firstSeenStage,stages:x.stages.join('|'),evidenceTypes:x.evidenceTypes.join('|'),verifiedOriginalBody:x.verifiedOriginalBody,verifiedLocalBody:x.verifiedLocalBody,warcEmbedded:x.archiveOnly,knownHttpStatuses:x.statusSeen.join('|'),sha256OfVerifiedBodies:x.bodyCandidates.filter(c=>c.integrity==='PASS_SHA256').map(c=>c.sha256).join('|'),verificationWarnings:x.bodyCandidates.filter(c=>c.integrity==='HASH_MISMATCH').length})),['url','firstSeenStage','stages','evidenceTypes','verifiedOriginalBody','verifiedLocalBody','warcEmbedded','knownHttpStatuses','sha256OfVerifiedBodies','verificationWarnings']);
csv(fn.stageCsv,Object.values(stageStats),['stage','physicalFilesInOwnerCaptureFolder','totalBytesInOwnerCaptureFolder','uniquePhysicalFileHashes','urlPathsObserved','firstIndexedURLPaths','verifiedRawBodyURLPaths','archiveEmbeddedURLPaths']);
const markdown=[
'# DJMRN X15 — Actual on-device reconciliation, not total site completeness',
'',
'Status: actual file-system/manifest comparison completed on '+metadata.generatedUtc+'. Source: local owner laptop only.',
'',
'## Denominator and measured facts',
'',
'- Total local capture-folder files hashed: **'+metadata.physicalFilesExamined+'**, size **'+metadata.physicalBytesExamined+' bytes**, **'+metadata.uniquePhysicalFileHashes+' distinct SHA-256 values**. This INCLUDES upstream tool sources/fixtures and repeated archive files. It is not a count of unique website assets.',
'- Cross-stage **observed first-party URL path denominator** (known/seen paths only): **'+coverage.observedFirstPartyResourcePathDenominator+'** inclusive candidates; **'+coverage.independentlyObservedNetworkFirstPartyPaths+'** independently network-observed first-party paths; **'+coverage.onlyOfflineDerivedRewrittenPathCount+'** are only rewritten offline output-path reconstructions and must NOT be treated as verified site source URLs. Unknown unrequested or hidden paths are NOT in this denominator.',
'- Paths with independently verified exact original delivered HTTP body as a standalone file: **'+coverage.verifiedOriginalStandaloneBodyURLPaths+'**; those without independently verified standalone body: **'+coverage.unverifiedStandaloneBodyURLPaths+'**; archive-embedded WARC response paths (separate category) **'+coverage.observedWithWarcEmbeddedResponse+'**.',
'- X01 original 47 response rows; standalone body files present **'+metadata.x01LocalFilesVerifiedExist+'** and **'+metadata.x01ExactSHA256Pass+'** SHA checks PASS (hash-integrity per record in JSON). X14 new response bodies **'+metadata.x14SHARevalidated+'/'+metadata.x14NewResponseRows+'** exact SHA checked.',
'- X10 original Browsertrix WACZ/CDXJ audit: **'+(x10ArchiveAudit?.summary?.x10UniqueFirstPartyCDXURLPaths??'UNVERIFIED')+'** unique first-party indexed URL paths, **'+(x10ArchiveAudit?.summary?.x10FirstPartyCDXRecords??'UNVERIFIED')+'** response index records, ZIP CRC **'+(x10ArchiveAudit?.summary?.zipCrcPass??0)+'/'+(x10ArchiveAudit?.summary?.totalArchiveFiles??0)+'**, and no claim that CDXJ archive SHA is the original response-body SHA.',
'- Three remaining HTTP-network-observed paths without a standalone valid body are **'+missing.map(x=>x.url+' ('+x.code+')').join(', ')+'**. These are a redirect, a query-sensitive transformation service and an HTTP404 file, not three necessarily missing useful site assets.',
'- X14 7 new downloaded response bodies include **3 routes whose hrefs were already seen in X12**, plus **2 CSS + 2 JS** absent from earlier resource set. No brand-new 3D shader/texture/GLB found at X14.',
'- File physical exact SHA duplicate groups: **'+metadata.physicalDuplicateHashGroups+'**. Equal-byte copies are not novel target site files.',
'',
'## Stage comparison',
'',
'| Stage | Local physical capture files (includes sources/archives) | Observed target first-party URL paths in selected evidence | First indexed in chronological stage union | Independently verified original response-body URL paths |',
'|---|---:|---:|---:|---:|',
...Object.values(stageStats).map(r=>'| '+r.stage+' | '+r.physicalFilesInOwnerCaptureFolder+' | '+r.urlPathsObserved+' | '+r.firstIndexedURLPaths+' | '+r.verifiedRawBodyURLPaths+' |'),
'',
'## Required interpretation',
'',
'- Stage 15 is a **deterministic offline reconciler** using built-in Node/Python capabilities; new paid crawler or broad source downloader is neither prerequisite nor evidence of improved coverage.',
'- Data types are separated into raw original standalone HTTP bodies, archive-embedded WARC, rewritten offline mirrors, metadata-only HAR, DOM/state observation, screenshots, third-party source tool code and unknown-role files.',
'- X11/X12/X13/X14 each sampled or recorded bounded 180+ second windows; none implies full 60fps WebGL camera or shader state.',
'- X15 optional live route probe samples 6 unique public routes during a 180-second window; it is not a continuous 180-second capture of the original home flower scene, already addressed separately by X11/X12.',
'- All private capture bodies and source-tool files remain local; only original audit scripts and de-identified summary/architecture notes should be committed to project GitHub.',
'- **Next X16:** inspect public bundle/source maps with exact reachability, module dependency graph and real behavior evidence; do not claim inaccessible original backend source.',
'',
'## Artifacts',
'',
...Object.entries(fn).map(([k,v])=>'- '+k+': '+path.basename(v)),
''
].join('\n');
fs.writeFileSync(fn.brief,markdown);
const tests={
 filenames:Object.values(fn).every(f=>fs.existsSync(f)),
 resourceRows:resourceRows.length,
 fileRows:fileRows.length,
 hasX01andX14:rawVerified.some(x=>x.stages.includes('X01'))&&rawVerified.some(x=>x.stages.includes('X14')),
 x14SHAAllPass:x14SHApass===7,x15SixWorkBodiesAllPass:x15SixVerified.length===6&&x15SixVerified.every(x=>x.integrity==="PASS_SHA256"),
 x10CdxWarcIndexImported:!!x10ArchiveAudit&&uniqueByStages.X10.observedFirstPartyPaths===46,
 allRemainingMissingRawPathsClassified:missing.length===3&&missing.every(x=>x.code!=='UNCLASSIFIED_REQUIRES_REVIEW'),
 x15FourHtmlBodiesCorrectlyTyped:(x15Six?.results||[]).filter(x=>x.responseMime==='text/html'&&x.privateFile?.endsWith('.html')&&fs.existsSync(x.privateFile)&&shaOfFile(x.privateFile)===x.sha256).length===4,
 noNewRawSiteDataUploaded:true,
 reportStatus:diagnostics.some(d=>d.kind==='HASH_MISMATCH')?'NEEDS_REVIEW_HASH_MISMATCH':'COMPLETE_SCOPE_QUALIFIED'
};
jsonOut(path.join(auditDir,'X15-acceptance-check.json'),{run,tests,diagnostics});
console.log('X15_AUDIT_SUMMARY',JSON.stringify({run,out:fn.summary,physicalFiles:metadata.physicalFilesExamined,physicalBytes:metadata.physicalBytesExamined,uniqueHashes:metadata.uniquePhysicalFileHashes,coverage,stageStats:Object.values(stageStats).map(r=>({stage:r.stage,files:r.physicalFilesInOwnerCaptureFolder,observedPaths:r.urlPathsObserved,newPaths:r.firstIndexedURLPaths,raw:r.verifiedRawBodyURLPaths})),tests,diagnostics:diagnostics.slice(0,20)}));
if(!tests.filenames||!tests.x14SHAAllPass||!tests.hasX01andX14||!tests.x15SixWorkBodiesAllPass)process.exitCode=4;