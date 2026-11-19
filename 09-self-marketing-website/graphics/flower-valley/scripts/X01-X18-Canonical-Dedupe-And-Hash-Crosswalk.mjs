// DJMRN X01-X18 deterministic offline URL and SHA-256 provenance audit.
// No network, no new captures. Original third-party bytes stay on the owner's Windows laptop.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const base=path.join(root,'02-reviewed-derived');
const output=path.join(base,'X18-CROSS-STAGE-CURRENT');
const get=n=>JSON.parse(fs.readFileSync(path.join(base,n),'utf8').replace(/^\uFEFF/,''));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const norm=s=>{try{const u=new URL(s);return u.origin+u.pathname}catch{return String(s||'')}};
function physical(rel){
 if(typeof rel!=='string'||!rel||path.isAbsolute(rel))throw Error('INVALID_RELATIVE_PATH');
 const p=path.resolve(root,...rel.replaceAll('\\','/').split('/'));
 if(!p.toLowerCase().startsWith(root.toLowerCase()+path.sep))throw Error('PATH_OUTSIDE_OWNER_ARCHIVE');
 return p;
}
function fileHash(f){
 const fd=fs.openSync(f,'r'),sha=crypto.createHash('sha256'),buf=Buffer.allocUnsafe(131072);let bytes=0;
 try{for(;;){const n=fs.readSync(fd,buf,0,buf.length,null);if(!n)break;sha.update(buf.subarray(0,n));bytes+=n}}finally{fs.closeSync(fd)}
 return {sha256:sha.digest('hex'),bytes};
}
const stageNames=Array.from({length:18},(_,i)=>'X'+String(i+1).padStart(2,'0'));
const rank=s=>Math.max(0,stageNames.indexOf(s));
const role=u=>{const s=norm(u).split('/').pop().toLowerCase();
 if(s.endsWith('.js'))return 'JS';if(s.endsWith('.css'))return 'CSS';
 if(/\.(glb|gltf)$/.test(s))return 'GLB_CAMERA_OR_MODEL';
 if(/\.(png|jpe?g|svg|webp|gif)$/.test(s))return 'IMAGE_OR_TEXTURE';
 if(/\.(mp3|ogg|wav)$/.test(s))return 'AUDIO';
 if(/\.(woff2?|ttf)$/.test(s))return 'FONT';
 return 'ROUTE_OR_OTHER';
};
if(os.freemem()<350*1048576)throw Error('RAM_PRECONDITION_BELOW_350_MIB');
const x15=get('X15-AUDIT-CURRENT/observed-first-party-resource-coverage.json');
const physicalIndex=get('X15-AUDIT-CURRENT/raw-captures-content-hash-index.json');
const x16=get('X16-CURRENT/X16-offline-byte-verified-js-inventory.json');
const x16New=get('X16-CURRENT/X16-new-js-response-bodies-local-only.json');
const x17=get('X17-CURRENT/X17-target-verified-bundle-inventory.json');
const x18=get('X18-CURRENT/X18-NEW-JS-ORIGINAL-BODIES-MANIFEST.json');
const x18Live=get('X18-CURRENT/X18-public-sanitized-discovery.json');
const x18Offline=get('X18-CURRENT/X18-OFFLINE-ALL-34-JSDJ-PLUGIN-AUDIT.json');
if(!Array.isArray(x15.resources)||x15.resources.length!==72||physicalIndex.fileRows.length!==2247||x17.rows.length!==32)throw Error('CANONICAL_INPUT_SCHEMA_CHANGED');
fs.mkdirSync(output,{recursive:true});
const sourceFile=path.join(base,'X18-PREFLIGHT','X01-X18-Canonical-Dedupe-And-Hash-Crosswalk.mjs');
const fileErrors=[],oldHashStages=new Map();let rehashedFiles=0,rehashedBytes=0;
for(const f of physicalIndex.fileRows){
 if(os.freemem()<100*1048576)throw Error('EMERGENCY_RAM_STOP');
 try{
  const b=fileHash(physical(f.path));
  if(b.sha256!==String(f.sha256).toLowerCase()||b.bytes!==f.bytes)throw Error('SHA_OR_SIZE_MISMATCH');
  rehashedFiles++;rehashedBytes+=b.bytes;
  const prior=oldHashStages.get(b.sha256)||new Set();prior.add(f.stage);oldHashStages.set(b.sha256,prior);
 }catch(e){fileErrors.push({phase:'X01_X15_PHYSICAL',stage:f.stage,expectedSHA:f.sha256,issue:String(e.message).slice(0,120)})}
}
const states=new Map(),baseKinds=new Map(x15.resourcePathClassification.map(r=>[norm(r.url),r.classification]));
function ensure(u){
 const url=norm(u);if(!/^https:\/\/(www\.)?gladeye\.com\//.test(url))return null;
 if(!states.has(url))states.set(url,{url,role:role(url),firstSeenStage:null,
  x15Classification:null,reportedStages:[],observations:[],originalBodyVariants:[],
  confirmedNetworkPath:false,notes:[]});
 return states.get(url);
}
function observe(r,stage,kind){
 if(!r)return;if(!r.observations.some(e=>e.stage===stage&&e.kind===kind))r.observations.push({stage,kind});
}
function body(r,sha,bytes,stage,kind){
 if(!r.originalBodyVariants.some(e=>e.sha256===sha)){
  r.originalBodyVariants.push({sha256:sha,bytes,stage,kind});
 }
 observe(r,stage,'INDEPENDENT_ORIGINAL_BODY_SHA256');
}
let validatedOriginal=0,originalPaths=0,originalErrors=[];
for(const entry of x15.resources){
 const r=ensure(entry.url);if(!r)throw Error('NON_FIRST_PARTY_IN_X15');
 r.firstSeenStage=entry.firstSeenStage;
 r.reportedStages=[...new Set(entry.stages||[])];
 r.x15Classification=baseKinds.get(r.url)||'UNKNOWN';
 r.confirmedNetworkPath=r.x15Classification==='NETWORK_OBSERVED';
 if(entry.verifiedOriginalBody)originalPaths++;
 for(const stage of r.reportedStages)observe(r,stage,'PREVIOUSLY_RECORDED_URL_OR_ARCHIVE_METADATA');
 for(const item of entry.bodyCandidates||[]){
  if(item.kind!=='ORIGINAL_HTTP_RESPONSE_BODY')continue;
  if(item.integrity!=='PASS_SHA256'||!item.localRelPath){originalErrors.push({url:r.url,issue:'UNVERIFIED_ORIGINAL_BODY'});continue}
  try{
   const result=fileHash(physical(item.localRelPath));
   if(result.sha256!==item.sha256.toLowerCase()||result.bytes!==item.byteSize)throw Error('SHA_OR_BYTES_DIFFERS');
   body(r,result.sha256,result.bytes,item.stage,'X15_CANONICAL_ORIGINAL_HTTP_BODY');
   validatedOriginal++;
  }catch(e){originalErrors.push({url:r.url,issue:String(e.message).slice(0,100)})}
 }
}
let verifiedX16=0;
for(const item of x16.resources){
 const r=ensure(item.url);if(!r)continue;
 if(!r.firstSeenStage)r.firstSeenStage='X16';
 observe(r,'X16','CDP_SOURCE_OR_BODY_METADATA');
 if(item.verified&&item.localRelPath&&item.originalSha){
  const result=fileHash(physical(item.localRelPath));
  if(result.sha256!==item.originalSha.toLowerCase()||result.bytes!==item.sizeBytes)throw Error('X16_INDEX_BODY_CHANGED');
  verifiedX16++;
  body(r,result.sha256,result.bytes,item.stage||'X16','X16_INDEPENDENT_REHASH_OF_ORIGINAL');
 }
}
for(const item of x17.rows){
 const r=ensure(item.url);if(!r)continue;
 if(!r.firstSeenStage)r.firstSeenStage='X17';
 observe(r,'X17','BUNDLE_COMPRESSION_AND_SOURCE_MAP_METADATA');
}
const newAudits=[];
for(const [stage,items] of [['X16',x16New.items],['X18',x18.items]]){
 for(const item of items){
  const r=ensure(item.url);if(!r)throw Error('NEW_NON_FIRST_PARTY');
  const wasKnown=!!r.firstSeenStage&&rank(r.firstSeenStage)<rank(stage);
  const rel=item.localRelPath||item.privateRelativePath;
  const result=fileHash(physical(rel));
  if(result.sha256!==item.sha256.toLowerCase()||result.bytes!==item.bytes)throw Error('NEW_BODY_CHANGED:'+r.url);
  const oldMatches=(oldHashStages.get(result.sha256)||new Set()).size;
  const wasHashKnown=oldMatches>0||r.originalBodyVariants.some(x=>x.sha256===result.sha256&&rank(x.stage)<rank(stage));
  if(!r.firstSeenStage)r.firstSeenStage=stage;
  body(r,result.sha256,result.bytes,stage,'FIRST_CAPTURED_RESPONSE_BODY_STAGE');
  r.confirmedNetworkPath=true;
  newAudits.push({stage,url:r.url,sha256:result.sha256,bytes:result.bytes,
   priorUrlSeen:wasKnown,priorPhysicalHashStageCount:oldMatches,
   firstSeenStage:r.firstSeenStage,relation:!wasKnown&&!wasHashKnown?'NEW_URL_AND_NEW_BYTES':
   !wasKnown&&wasHashKnown?'NEW_URL_REUSED_BYTES':wasKnown&&!wasHashKnown?'KNOWN_URL_NEW_BYTES':'KNOWN_URL_AND_BYTES'});
 }
}
for(const item of x18Live.jsDetails||[]){observe(ensure(item.url),'X18','JSDJ_LIVE_PUBLIC_JS_URL')}
for(const item of x18Offline.candidateEdges||[]){observe(ensure(item.fromJs),'X18','STATIC_PLUGIN_CANDIDATE_UNVERIFIED')}
const records=[...states.values()].sort((a,b)=>a.url.localeCompare(b.url));
for(const r of records){
 r.originalBodyVariants.sort((a,b)=>rank(a.stage)-rank(b.stage));
 r.firstOriginalByteStage=r.originalBodyVariants[0]?.stage||null;
 r.currentBodySHA256=r.originalBodyVariants.at(-1)?.sha256||null;
 r.bodyIdentity=r.originalBodyVariants.length>1?'SAME_URL_MULTIPLE_ORIGINAL_BYTE_VARIANTS':
  r.originalBodyVariants.length===1?'ORIGINAL_BODY_SHA256_VERIFIED':
  r.x15Classification==='OFFLINE_DERIVED_PATH_ONLY'?'OFFLINE_DERIVED_ONLY_NO_ORIGINAL_HTTP_BODY':'URL_METADATA_NO_ORIGINAL_BODY';
 r.reportedStages=[...new Set([...r.reportedStages,...r.observations.map(x=>x.stage)])].sort((a,b)=>rank(a)-rank(b));
 r.observations.sort((a,b)=>rank(a.stage)-rank(b.stage));
}
const originalKnown=records.filter(r=>r.originalBodyVariants.length>0);
const x17X01matches=x17.rows.filter(r=>r.verified&&records.some(p=>p.url===norm(r.url)&&p.originalBodyVariants.some(b=>b.sha256===r.sha256&&b.stage==='X01'))).length;
const firstSeen=Object.fromEntries(stageNames.map(s=>[s,records.filter(r=>r.firstSeenStage===s).length]));
const byType={};for(const r of records)byType[r.role]=(byType[r.role]||0)+1;
const novelty=newAudits.filter(x=>x.stage==='X18');
const checks={
 x15All2247PhysicalBytesSHAStillValid:rehashedFiles===2247&&fileErrors.length===0,
 x15OriginalHTTPBodiesStillValid:validatedOriginal===64&&originalErrors.length===0,
 x15OriginalPaths63:originalPaths===63,
 x15PathScope72:records.filter(r=>r.x15Classification).length===72,
 x15Network66:records.filter(r=>r.x15Classification==='NETWORK_OBSERVED').length===66,
 x15DerivedOnly6:records.filter(r=>r.x15Classification==='OFFLINE_DERIVED_PATH_ONLY').length===6,
 x16NewOriginalPathOne:newAudits.filter(x=>x.stage==='X16').length===1&&newAudits.find(x=>x.stage==='X16').relation==='NEW_URL_AND_NEW_BYTES',
 x18NewOriginalPathsThree:novelty.length===3&&novelty.every(x=>x.relation==='NEW_URL_AND_NEW_BYTES'),
 x17ReusedExactX01SourceBodies25:x17X01matches===25,
 x18All34VerifiedBodiesInspected:x18Offline.verifiedJsInputCount===34&&x18Offline.pluginExceptions===0,
 union76PathIdentifiers:records.length===76,
 noOverstatementOfSiteCompleteness:records.filter(x=>x.confirmedNetworkPath).length===70
};
const failed=Object.entries(checks).filter(([,v])=>!v).map(([k])=>k);
const status=failed.length?'PARTIAL_REVIEW_REQUIRED':'COMPLETE_SCOPE_QUALIFIED';
const summary={stage:'X01-X18',utc:new Date().toISOString(),status,
 comparison:'URL path+actual source HTTP bytes SHA256 first; body variants separately; no synthetic URL inflation',
 captureArchiveX01toX15:{physicalIndexed:physicalIndex.fileRows.length,physicalRehashed:rehashedFiles,bytesRehashed:rehashedBytes,uniqueFileSHAs:oldHashStages.size,
  duplicatePhysicalCopies:rehashedFiles-oldHashStages.size,originalBodyURLs:originalPaths,originalBodySamplesRehashed:validatedOriginal},
 pathReconciliation:{priorX15Paths:72,priorNetwork66:66,priorOfflineOnly6:6,newX16Paths:1,newX18Paths:3,totalRecordedPaths:records.length,
  networkObserved:records.filter(r=>r.confirmedNetworkPath).length,offlineDerivedOnly:records.filter(r=>r.x15Classification==='OFFLINE_DERIVED_PATH_ONLY').length,
  firstSeenByStage:firstSeen,originalBodyPaths:originalKnown.length,categoryCounts:byType},
 validatedNovelCaptures:newAudits,previousX17JSWithExactX01Hash:x17X01matches,
 checks,failed,limits:[
 'X15 originally normalized to path: query-specific image variants are NOT proved identical',
 'X15 2247 physical files include tool sources, fixtures and duplicate archives; not 2247 unique website resources',
 'X05 GTM is a real offline mirrored artifact but lacks independent original HTTP response-body proof',
 'X10 WACZ archive SHA is not a hash of its individual embedded responses',
 'X18 plugin static candidate paths are NOT counted as verified served assets',
 'X18 /work jsdj traversal timed out; independent HTML and X16 CDP coverage are complementary only',
 'X18 Next.js manifests are framework/build evidence, not new flower GLB/terrain/geometry or recovered authoring source',
 'No published source map recovered, no complete GPU/WebGL frame state or private backend source']};
function save(name,data){fs.writeFileSync(path.join(output,name),JSON.stringify(data,null,2)+'\n')}
save('X01-X18-INDEPENDENT-CROSSWALK-ACCEPTANCE.json',{summary,physicalErrors:fileErrors.slice(0,30),originalBodyErrors:originalErrors.slice(0,30)});
save('X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json',{summary,resources:records});
const columns=['url','role','firstSeenStage','firstOriginalByteStage','x15Classification','confirmedNetworkPath','bodyIdentity','currentBodySHA256','reportedStages','originalBodyVariants'];
const quote=x=>'"'+String(x??'').replaceAll('"','""').replace(/[\r\n]/g,' ')+'"';
fs.writeFileSync(path.join(output,'X01-X18-RESOURCE-FIRST-SEEN-AND-SHA.csv'),
 [columns.join(','),...records.map(r=>columns.map(k=>quote(Array.isArray(r[k])?JSON.stringify(r[k]):r[k])).join(','))].join('\r\n')+'\r\n');
const stageDesc=[
 ['X01','original first-party JS, CSS, camera GLB, flower/terrain/ray textures and WebGL interface observations'],
 ['X02','CDP network and script initiator timing to complement captured body bytes'],
 ['X03','SiteOne independent static/browser capture, polyfill JS and font otherwise outside original X01 set'],
 ['X04','integrity and backup of previously captured files, not 341 newly unique website assets'],
 ['X05','Decant DOM/tokens and screenshots; six derived paths including local mirrored GTM, not HTTP-original responses'],
 ['X06','WebScoop independent capture and exact previously observed JS body repetition'],
 ['X07','SingleFile page snapshots, script preservation and offline WebGL limits'],
 ['X08','WebScrapBook archive; downloaded source-package files do not represent new vendor site assets'],
 ['X09','HTTrack mirror, original URL hints and image optimizer variants; rewritten local bodies cannot be presumed original'],
 ['X10','Browsertrix WACZ response indexing; archive SHA and individual HTTP body SHA are different identities'],
 ['X11','ArchiveBox WARC, HTTP records and temporal state observations'],
 ['X12','PinchTab DOM/SPA state graph, temporal scene parameter interaction'],
 ['X13','HAR/CDP timing and request waterfall, mostly metadata not raw bodies'],
 ['X14','Wappalyzer tech signature hints and verified selected original body captures'],
 ['X15','canonical cross-stage X01-X14 original URL/byte integrity: 72 paths, 66 network, 6 derived, 63 original-body URLs'],
 ['X16','DevTools 10-route source inspection, 130 initiator edges, 1 new original first-party JS response'],
 ['X17','original JS sizes and owned fixture Source Map Explorer; target original maps not available'],
 ['X18','live jsdj plugin scan and offline all-34 JS audit, 3 new original small Next.js responses; /work full jsdj timeout']
];
const commentary=[
 '# DJMRN X01-X18 — Cross-stage resource identity and evidence delta',
 '',
 '**Verified scope:** '+status+'. **Current sequential stage:** X18. X19 is next, not executed.',
 '',
 '## Grounded totals',
 '- X01-X15 local capture files rehashed: '+rehashedFiles+'/'+physicalIndex.fileRows.length+' (size '+rehashedBytes+' bytes). Unique file SHA-256 values: '+oldHashStages.size+'. Duplicate physical copies: '+(rehashedFiles-oldHashStages.size)+'. Tool source, archive, fixtures and snapshots INCLUDED in this physical count, not unique website resources.',
 '- X15 canonical URL inventory: 72 paths (66 network-observed, 6 offline-derived-only). Original HTTP response-body paths: '+originalPaths+', independently validated variants: '+validatedOriginal+'.',
 '- X16 verified first-seen HTTP original JS: 1. X18 verified first-seen original JS: 3. Total known path union: '+records.length+', network-confirmed '+records.filter(r=>r.confirmedNetworkPath).length+', offline-derived-only '+records.filter(r=>r.x15Classification==='OFFLINE_DERIVED_PATH_ONLY').length+'. This is scoped path identity, NOT full website completeness.',
 '- Chronological first-observed paths: '+Object.entries(firstSeen).filter(([,v])=>v>0).map(([k,v])=>k+':'+v).join(', ')+'.',
 '- From the 31 SHA-verified X17 JS bodies, '+x17X01matches+' were already EXACT original URL+SHA captures in X01.',
 '',
 '## X18 three-body true novelty relative to X01-X15',
 ...novelty.map(x=>'- '+x.url+' — '+x.bytes+' bytes; SHA256 '+x.sha256+'; previously observed URL: '+x.priorUrlSeen+'; SHA in prior 2247 physical files: '+x.priorPhysicalHashStageCount+'; relation: '+x.relation+'.'),
 '',
 '## Identity policy: do not inflate extraction',
 '- Same URL path + same original-response SHA256 = old content, independently corroborated. A new tool observing it does not create a new website file.',
 '- Same URL path + different original-response SHA256 = new byte version/response body (not necessarily new URL); preserve both SHA variants.',
 '- New URL + old original-body SHA256 = new routing reference to previously known bytes; do not double-count as new content.',
 '- New URL + new SHA256 absent in earlier verified capture index = new evidenced client-delivered asset within our scope.',
 '- Metadata-only HAR, scriptParsed, inferred plugin URL, rewritten local mirror, WARC container digest and owner-created test fixtures cannot masquerade as original response bodies.',
 '- X15 path normalization removes query parameters. Image optimizer query variants need separate query-aware tracking before declaring equality.',
 '',
 '## What each stage contributes in the same evidence system',
 ...stageDesc.map(([s,d])=>'- **'+s+'**: '+d+'.'),
 '',
 '## Consequences for scene and website design',
 '- Preserve X01 first-party GLB camera animation, flower texture atlases, audio, terrain/rays and shader interface evidence as original baseline. X02/X11/X12/X13 CDP, temporal and DOM state evidence adds complementary interactive understanding, not additional unique geometry files.',
 '- X14 technical fingerprints, X16 request-initiator graph and X18 Next.js manifests add framework/runtime mapping. The three X18 verified new JS files are tiny framework/manifest documents, NOT demonstrated new flower/terrain/GLB assets.',
 '- X05 gtm.q mirror file exists as independently hashed offline artifact, but X15 path remains OFFLINE_DERIVED_PATH_ONLY and original source HTTP body provenance UNKNOWN; not a missing local file nor a verified original response.',
 '- X18 unserved Draco/manifest-relative candidate addresses are hypotheses. X18 /work full recursive jsdj timeout remains a documented gap, partially complemented by a separate HTML GET and earlier CDP visit.',
 '- No original authoring TypeScript/GLSL or backend/source maps are recovered. Avoid substituting tool capability for asset discovery.',
 '',
 '## Files and traceability',
 '- X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json: each path first seen, stage sightings, original-body SHA variants, path classification and evidence tiers.',
 '- X01-X18-RESOURCE-FIRST-SEEN-AND-SHA.csv: compact human-readable exact-first-seen and original hash audit.',
 '- X01-X18-INDEPENDENT-CROSSWALK-ACCEPTANCE.json: physical rehash count, scope denominator, 12 acceptance checks and failures.',
 '- Reproducer is owner-authored X01-X18-Canonical-Dedupe-And-Hash-Crosswalk.mjs in existing project scripts. It performs read-only rehash of existing local source bodies and metadata, not website recrawling.',
 '- Original third-party bytes remain PRIVATE in the owner Windows archive. Only these metadata and owner-authored tools may be published to the GitHub project.',
 '',
 'Acceptance gates: '+Object.entries(checks).map(([k,v])=>k+'='+v).join('; ')+'.',''
];
fs.writeFileSync(path.join(output,'X01-X18-CROSS-STAGE-COMPARISON-HANDOFF-2026-11-20.md'),commentary.join('\n')+'\n');
const source=path.join(base,'X18-PREFLIGHT','X01-X18-Canonical-Dedupe-And-Hash-Crosswalk.mjs');
if(fs.existsSync(source))fs.copyFileSync(source,path.join(output,path.basename(source)));
console.log('CROSSWALK_RESULT '+JSON.stringify({status,physicalRehashed:rehashedFiles,originalBodiesValidated:validatedOriginal,
 x17SameAsX01:x17X01matches,pathUnion:records.length,networkConfirmed:records.filter(x=>x.confirmedNetworkPath).length,
 stageFirstSeen:firstSeen,newX16X18:newAudits,checks,failed,freeRamMiB:Math.round(os.freemem()/1048576)}));
if(failed.length)process.exitCode=2;
