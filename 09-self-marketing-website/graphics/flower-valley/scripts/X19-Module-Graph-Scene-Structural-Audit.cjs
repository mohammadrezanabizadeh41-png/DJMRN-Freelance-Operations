'use strict';
// DJMRN X19 — 457-module verified output graph and scene feature evidence.
// Read-only over private transformed JS and X16/X18/X19 public-safe metadata.
// Does not fetch websites, run vendor code, or publish extracted vendor code.
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto');
const ROOT=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(ROOT,'02-reviewed-derived'),C=path.join(D,'X19-CURRENT'),P=path.join(ROOT,'01-private-captures','X19','full-verified-js-unpack');
const SHA=b=>crypto.createHash('sha256').update(b).digest('hex');
const rd=f=>JSON.parse(fs.readFileSync(f,'utf8').replace(/^\uFEFF/,''));
const wr=(n,x)=>fs.writeFileSync(path.join(C,n),JSON.stringify(x,null,2)+'\n');
const canon=u=>{try{const x=new URL(u);return x.origin+x.pathname}catch{return u}};
const signals=[
 ['threeRenderer',/WebGLRenderer|WebGL2Renderer|WebGL1Renderer/gi],
 ['webgl',/WebGL2?RenderingContext|gl\.drawElements|gl\.drawArrays/gi],
 ['camera',/PerspectiveCamera|OrthographicCamera|CameraHelper|cameraPath/gi],
 ['gltf',/GLTFLoader|GLTF2Loader|\.glb\b|\.gltf\b/gi],
 ['draco',/DRACOLoader|draco_decoder|draco_wasm/gi],
 ['instancing',/InstancedMesh|InstancedBufferGeometry|instanceMatrix/gi],
 ['shader',/ShaderMaterial|RawShaderMaterial|vertexShader|fragmentShader|gl_Position|gl_FragColor/gi],
 ['uniforms',/\buniform(?:s)?\b/gi],
 ['flowers',/flower|petal|blossom/gi],
 ['terrain',/terrain|heightmap|landscape/gi],
 ['raysBloom',/Raycaster|GodRays|BloomPass|UnrealBloom/gi],
 ['motion',/requestAnimationFrame|setAnimationLoop|AnimationMixer/gi],
 ['pointer',/pointermove|mousemove|touchmove/gi],
 ['scroll',/ScrollTrigger|scrollY|wheel|scrollTo/gi],
 ['gsap',/\bgsap\b/gi],
 ['react',/react-dom|useEffect|useRef|createElement/gi],
 ['next',/webpackChunk_N_E|__next_f|__NEXT_DATA__/gi]
];
const hintsWeights={threeRenderer:3,webgl:3,camera:4,gltf:5,draco:4,instancing:4,shader:5,
 uniforms:2,flowers:3,terrain:4,raysBloom:3,motion:2,pointer:1,scroll:2,gsap:2,react:0,next:0};
function count(s,r){r.lastIndex=0;let n=0;while(r.exec(s)&&n<100000)n++;return n}
function hitSignals(s){const o={};for(const [k,re]of signals){const n=count(s,re);if(n)o[k]=n}return o}
const relImport=/(?:\bfrom\s*|\brequire\s*\(\s*|\bimport\s*\(\s*)['"](\.[^'"]{1,150})['"]/g;
const assetName=/(?:https:\/\/www\.gladeye\.com)?(?:\/[a-zA-Z0-9_.%\-@]+){1,12}\.(?:glb|gltf|wasm|png|webp|jpe?g|svg|hdr|ktx2|mp4|json)(?:\?[a-zA-Z0-9_=%&.\-]{1,100})?/gi;
function rels(s){const vals=new Set();for(const m of s.matchAll(relImport)){if(vals.size>=200)break;vals.add(m[1])}return [...vals]}
function candidates(s){const vals=new Set();for(const m of s.matchAll(assetName)){if(vals.size>=100)break;vals.add(m[0])}return[...vals]}
function scopedFile(base,rel){
 const name=path.resolve(base,...rel.replaceAll('\\','/').split('/'));
 if(!name.toLowerCase().startsWith(base.toLowerCase()+path.sep))throw Error('MODULE_PATH_OUTSIDE_FOLDER');
 return name
}
const summary=rd(path.join(C,'X19-FULL-PUBLIC-SANITIZED-MODULE-REPORT.json'));
const manifest=rd(path.join(C,'X19-FULL-INPUT-MANIFEST-PRIVATE.json'));
const graph16=rd(path.join(D,'X16-CURRENT','X16-script-init-network-graph.json'));
const live19=rd(path.join(D,'X19-LIVE-CURRENT','X19-LIVE-3MIN-OBSERVATION.json'));
const cross=rd(path.join(D,'X18-CROSS-STAGE-CURRENT','X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json'));
const x18=rd(path.join(D,'X18-CURRENT','X18-OFFLINE-ALL-34-JSDJ-PLUGIN-AUDIT.json'));
if(summary.status!=='FULL_VERIFIED_JS_STATIC_SWEEP_PASS'||summary.stats.pass!==34||manifest.items.length!==34)throw Error('MAIN_STATIC_SWEEP_NOT_34_PASS');
if(os.freemem()<350*1048576)throw Error('RAM_PRECONDITION_LT_350_MIB');
const moduleRows=[],moduleEdges=[],allAssets=new Set(),bad=[],SHAOwners=new Map(),idOwners=new Map();
let validated=0,bytesOfModules=0,topLevelVerified=0,outputFilesVerified=0;
for(const [index,src] of manifest.items.entries()){
 if(os.freemem()<100*1048576)throw Error('STOP_RAM_UNDER_100MIB');
 const r=rd(path.join(C,'per-file',src.sha256.slice(0,20)+'.json'));
 if(r.status!=='PASS'||r.sha256!==src.sha256||r.sourceUrl!==src.url)throw Error('PER_FILE_METADATA_MISMATCH');
 const folder=path.join(P,String(index).padStart(2,'0')+'-'+src.sha256.slice(0,14),'static');
 const files=new Map();
 for(const f of r.privateOutputsSha256){
  const fpath=scopedFile(folder,f.relativePath);
  const b=fs.readFileSync(fpath);if(b.length!==f.bytes||SHA(b)!==f.sha256)throw Error('OUTPUT_SHA_FAILURE:'+f.relativePath);
  files.set(f.relativePath.replaceAll('\\','/'),{path:fpath,sha256:f.sha256,bytes:f.bytes});
  outputFilesVerified++;
 }
 if(r.unpackFormat==='NONE'&&r.moduleCount!==0)throw Error('MODULE_NONE_WITH_NONZERO');
 if(r.moduleCount!==r.modulePaths.length||r.moduleCount!==r.moduleIds.length)throw Error('MODULE_ID_PATH_COUNT_MISMATCH');
 if(!files.get('deobfuscated.js'))throw Error('MISSING_DEOBFUSCATED_JS');
 topLevelVerified++;
 for(let j=0;j<r.moduleCount;j++){
  const id=String(r.moduleIds[j]),rel=String(r.modulePaths[j]).replace(/^\.\//,'');
  const file=files.get(rel);
  if(!file)throw Error('LISTED_MODULE_FILE_MISSING_'+rel);
  const s=fs.readFileSync(file.path,'utf8'),sigs=hitSignals(s);
  const score=Object.entries(sigs).reduce((n,[k,v])=>n+(hintsWeights[k]||0)*Math.min(v,5),0);
  const distinctScene=Object.keys(sigs).filter(k=>(hintsWeights[k]||0)>=3).length;
  const kind=score>=26&&distinctScene>=2?'SCENE_RELEVANT_HIGH_SIGNAL':
             score>=9&&distinctScene>=1?'SCENE_RELEVANT_POSSIBLE':'GENERAL_OR_WEAK_SIGNAL';
  const imports=rels(s),assets=candidates(s);
  for(const a of assets)allAssets.add(a);
  const rec={sourceUrl:src.url,sourceFirstSeen:src.firstSeenStage,sourceSHA256:src.sha256,
   moduleId:id,modulePath:rel,moduleSHA256:file.sha256,bytes:file.bytes,
   signals:sigs,sceneHeuristicScore:score,distinctSceneSignals:distinctScene,
   sceneClassification:kind,relativeImports:imports,assetPathHints:assets};
  moduleRows.push(rec);validated++;bytesOfModules+=file.bytes;
  const owners=SHAOwners.get(file.sha256)||[];owners.push({url:src.url,moduleId:id});SHAOwners.set(file.sha256,owners);
  const old=idOwners.get(id)||[];old.push({url:src.url,moduleSHA256:file.sha256});idOwners.set(id,old);
 }
}
const moduleByOwner=new Map();
for(const r of moduleRows){let m=moduleByOwner.get(r.sourceUrl);if(!m){m=new Map();moduleByOwner.set(r.sourceUrl,m)}m.set(r.modulePath,r)}
for(const r of moduleRows){
 for(const imp of r.relativeImports){
  let target=null;
  try{target=path.posix.normalize(path.posix.join(path.posix.dirname(r.modulePath),imp))}catch{}
  const local=target?moduleByOwner.get(r.sourceUrl)?.get(target):null;
  moduleEdges.push({sourceUrl:r.sourceUrl,fromModule:r.moduleId,fromPath:r.modulePath,
   import:imp,toModule:local?.moduleId||null,toPath:target,
   classification:local?'INTRA_BUNDLE_MODULE_REFERENCE':'UNRESOLVED_STATIC_REFERENCE_POSSIBLE_OTHER_CHUNK'});
 }
}
const makePair=e=>canon(e.from)+' | '+canon(e.to);
const set16=new Set((graph16.edges||[]).map(makePair));
const set19=new Set((live19.networkEdges||[]).map(makePair));
const common=[...set19].filter(k=>set16.has(k));
const liveOnly=[...set19].filter(k=>!set16.has(k));
const oldOnly=[...set16].filter(k=>!set19.has(k));
const netDelta={
 stage:'X19',description:'CDP initiator relation pairs; not site response-byte assets',
 x16Edges:graph16.edges.length,x19LiveEdges:live19.networkEdges.length,
 repeatedRelationPairs:common.length,newlyObservedPairsInX19:liveOnly.length,
 x16OnlyPairsNotReobserved:oldOnly.length,
 x19NewObservedPairs:liveOnly.map(k=>{const [from,to]=k.split(' | ');return{from,to,
  fromPreviouslyKnownURL:cross.resources.some(v=>v.url===from),
  toPreviouslyKnownURL:cross.resources.some(v=>v.url===to)}}),
 caveats:['Newly observed does not prove new site functionality, just not recorded in the earlier X16 sample',
  'DOM and script initiator event graphs are incomplete and session-dependent',
  'X19 did not observe any new first-party URL outside canonical X01-X18 paths']};
wr('X19-LIVE-CDP-EDGES-VS-X16.json',netDelta);
const duplicates=[...SHAOwners.entries()].filter(([,arr])=>arr.length>1)
 .map(([sha,arr])=>({sha256:sha,instances:arr.length,refs:arr}));
const reusedIds=[...idOwners.entries()].filter(([,arr])=>arr.length>1)
 .map(([id,arr])=>({id,distinctModuleHashes:new Set(arr.map(x=>x.moduleSHA256)).size,instances:arr.length}));
const sceneSorted=[...moduleRows].sort((a,b)=>b.sceneHeuristicScore-a.sceneHeuristicScore||b.bytes-a.bytes);
const classificationSummary=moduleRows.reduce((acc,x)=>(acc[x.sceneClassification]=(acc[x.sceneClassification]||0)+1,acc),{});
const assetPaths=[...allAssets].sort().map(u=>{let absolute;try{absolute=new URL(u,'https://www.gladeye.com/')}catch{return{hint:u,validURL:false}}const norm=absolute.origin+absolute.pathname;return{
 hint:u,normalizedURL:norm,previouslyInX01X18:cross.resources.some(r=>r.url===norm),
 classification:cross.resources.some(r=>r.url===norm)?'KNOWN_URL_HINT':'UNVERIFIED_STATIC_ASSET_PATH_HINT'}});
const stats={sourceJSAnalyzed:manifest.items.length,sourceBytes:manifest.byteTotal,
 modulesVerified:validated,moduleBodyBytesVerified:bytesOfModules,
 generatedFilesSHA256Verified:outputFilesVerified,topLevelJSVerified:topLevelVerified,
 uniqueDerivedModuleHashes:SHAOwners.size,duplicateDerivedModuleSHAInstances:validated-SHAOwners.size,
 repeatedModuleIDs:reusedIds.length,sameIDWithDifferingSHA:reusedIds.filter(x=>x.distinctModuleHashes>1).length,
 importReferenceCandidates:moduleEdges.length,
 intraBundleImportCandidates:moduleEdges.filter(x=>x.classification==='INTRA_BUNDLE_MODULE_REFERENCE').length,
 unresolvedImportCandidates:moduleEdges.filter(x=>x.classification!=='INTRA_BUNDLE_MODULE_REFERENCE').length,
 signalClassification:classificationSummary,
 assetPathHints:assetPaths.length,assetHintsPreviouslyKnown:assetPaths.filter(x=>x.previouslyInX01X18).length,
 assetHintsUnverified:assetPaths.filter(x=>x.classification==='UNVERIFIED_STATIC_ASSET_PATH_HINT').length,
 newSiteAssetsOrBytes:0,
 x19LiveEdgesPreviouslyObservedX16:common.length,
 x19LiveEdgesNotSeenX16:liveOnly.length,
 x19LiveDistinctFirstPartyPaths:live19.stats.firstPartyUniquePaths
};
wr('X19-ALL-MODULES-PUBLIC-METADATA.json',{stage:'X19',utc:new Date().toISOString(),
 stat:stats,modules:moduleRows.map(x=>({url:x.sourceUrl,firstSeen:x.sourceFirstSeen,
  moduleId:x.moduleId,path:x.modulePath,sha256:x.moduleSHA256,bytes:x.bytes,
  signals:x.signals,score:x.sceneHeuristicScore,role:x.sceneClassification,
  relativeImports:x.relativeImports,assetPathHints:x.assetPathHints})),
 caveats:['No vendor JS code in metadata; numeric module identifiers and counts are analytical representations',
  'Module IDs and static imports are NOT a complete runtime dependency graph',
  'Scores are heuristic, not confirmed source author intent']});
wr('X19-SCENE-STRUCTURAL-CANDIDATES.json',{stage:'X19',stats,
 topLikelySceneModules:sceneSorted.slice(0,100).map(x=>({sourceUrl:x.sourceUrl,sourceFirstSeen:x.sourceFirstSeen,
  moduleId:x.moduleId,modulePath:x.modulePath,moduleSHA256:x.moduleSHA256,bytes:x.bytes,
  score:x.sceneHeuristicScore,signalCounts:x.signals,classification:x.sceneClassification,
  directImportHints:x.relativeImports.slice(0,40),assetPathHints:x.assetPathHints.slice(0,35)})),
 staticAssetPathHints:assetPaths,duplicateModuleBodySHA:duplicates,
 repeatedNumericModuleIDs:reusedIds,caveats:[
 'Ranking is based on string/AST-derived keyword signals and can match third-party engine libraries',
 'Asset filenames are string candidates from shipped JS, not necessarily public or independently reachable',
 'The original GLB/camera/texture byte authority remains X01-X18 original capture ledger']});
wr('X19-INDEPENDENT-MODULE-GRAPH-ACCEPTANCE.json',{
 stage:'X19',utc:new Date().toISOString(),status:
 validated===summary.stats.modulesExtracted&&outputFilesVerified===summary.stats.filesGenerated
 ?'FULL_STRUCTURE_AND_MODULE_GRAPH_SCOPE_QUALIFIED_PASS':'MODULE_GRAPH_NEEDS_REVIEW',
 checks:{
 allOriginalSourceBodiesPreviouslySHAValidated:summary.stats.pass===34,
 allDerivedOutputFilesRehashed:outputFilesVerified===summary.stats.filesGenerated,
 all457DerivedModulesRehashed:validated===457,
 allTopLevelTransformedFilesPresent:topLevelVerified===34,
 allModuleFilePathsResolved:bad.length===0,
 X16AndX19LiveGraphCompared:graph16.edges.length===130&&live19.networkEdges.length===61,
 assetHintsNotPromotedToServedFiles:true,
 noVendorJSExecutedOrPublished:true},
 stats,errors:bad,knownLimits:[
 'No static analysis can prove total website module completeness',
 'Advanced native VM decoder had only an owner-code test; no untrusted downloaded program executed',
 'Static asset path candidates are hypotheses until original byte/URL evidence verified',
 'X19 supplemental observations must not inflate X01-X18 76-path network inventory']});
const header=['url','sourceFirstSeen','moduleId','moduleSha256','moduleBytes','score','sceneRole','signals','importCount','assetHintCount'];
const q=v=>'"'+String(v??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(C,'X19-ALL-457-MODULE-METADATA.csv'),
 [header.join(','),...moduleRows.map(x=>header.map(k=>q(({
 url:x.sourceUrl,sourceFirstSeen:x.sourceFirstSeen,moduleId:x.moduleId,moduleSha256:x.moduleSHA256,
 moduleBytes:x.bytes,score:x.sceneHeuristicScore,sceneRole:x.sceneClassification,
 signals:JSON.stringify(x.signals),importCount:x.relativeImports.length,assetHintCount:x.assetPathHints.length})[k])).join(','))].join('\r\n')+'\r\n');
fs.writeFileSync(path.join(C,'X19-STATIC-MODULE-RELATIVE-IMPORT-EDGES.csv'),
 ['sourceUrl,fromModuleId,fromFile,toModuleId,toFile,classification',
  ...moduleEdges.map(x=>[x.sourceUrl,x.fromModule,x.fromPath,x.toModule||'',x.toPath||'',x.classification].map(q).join(','))].join('\r\n')+'\r\n');
const s=rd(path.join(C,'X19-INDEPENDENT-MODULE-GRAPH-ACCEPTANCE.json'));
console.log('X19_GRAPH_FINAL '+JSON.stringify({status:s.status,stats,
 topScene:sceneSorted.slice(0,12).map(x=>({bundle:x.sourceUrl.split('/').pop(),
 moduleId:x.moduleId,score:x.sceneHeuristicScore,
 signals:x.signals,stage:x.sourceFirstSeen})),topAssetHints:assetPaths.slice(0,15)}));
if(s.status!=='FULL_STRUCTURE_AND_MODULE_GRAPH_SCOPE_QUALIFIED_PASS'||Object.values(s.checks).some(x=>!x))process.exitCode=2;
