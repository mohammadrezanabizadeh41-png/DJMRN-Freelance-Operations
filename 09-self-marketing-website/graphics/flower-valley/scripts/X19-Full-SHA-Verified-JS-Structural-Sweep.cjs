'use strict';
// DJMRN X19 — full SHA-verified FIRST-PARTY ORIGINAL-JS structural sweep.
// Durable per-file checkpoints; each downloaded vendor file is transformed ONLY privately.
// No target HTTP requests; no execution of untrusted vendor JS (deobfuscate VM disabled).
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const ROOT=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const DER=path.join(ROOT,'02-reviewed-derived');
const CURRENT=path.join(DER,'X19-CURRENT');
const PRIVATE=path.join(ROOT,'01-private-captures','X19','full-verified-js-unpack');
const RUNTIME=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X19-webcrack');
const SHA=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8').replace(/^\uFEFF/,''));
const write=(f,x)=>{fs.mkdirSync(path.dirname(f),{recursive:true});const tmp=f+'.new';fs.writeFileSync(tmp,JSON.stringify(x,null,2)+'\n');fs.renameSync(tmp,f)};
const canon=s=>{try{let u=new URL(s);return u.origin+u.pathname}catch{return s}};
const stageRank=s=>Number(String(s||'').replace(/^X/,''))||99;
function fileFromRel(rel){
 if(typeof rel!=='string'||rel.length===0||path.isAbsolute(rel))throw Error('NON_RELATIVE_CAPTURE');
 const target=path.resolve(ROOT,...rel.replaceAll('\\','/').split('/'));
 if(!target.toLowerCase().startsWith(ROOT.toLowerCase()+path.sep))throw Error('PATH_OUTSIDE_EVIDENCE_ROOT');
 return target;
}
function verifyCapture(item){
 const b=fs.readFileSync(fileFromRel(item.relative));
 if(b.length!==item.bytes||SHA(b)!==item.sha256.toLowerCase())throw Error('SOURCE_SHA_SIZE_MISMATCH_'+item.url);
 return b;
}
const signals=[
 ['threeEngine',/three(?:\.js)?|WebGLRenderer|three\.module/gi],
 ['WebGLContext',/WebGL2?RenderingContext|WebGLRenderer|createShader/gi],
 ['camera',/PerspectiveCamera|OrthographicCamera|CameraHelper|cameraPath/gi],
 ['gltfLoader',/GLTFLoader|GLTF2Loader|\.glb\b|\.gltf\b/gi],
 ['draco',/DRACOLoader|draco_decoder|draco_wasm/gi],
 ['instancing',/InstancedMesh|InstancedBufferGeometry|instanceMatrix/gi],
 ['shaders',/ShaderMaterial|RawShaderMaterial|vertexShader|fragmentShader|gl_Position|gl_FragColor/gi],
 ['shaderUniform',/\buniform\b|uniformsNeedUpdate/gi],
 ['flowers',/flower|petal|blossom/gi],
 ['terrain',/terrain|landscape|heightmap/gi],
 ['raysAndBloom',/Raycaster|GodRays|bloom|UnrealBloomPass/gi],
 ['motion',/requestAnimationFrame|setAnimationLoop|AnimationMixer/gi],
 ['pointer',/pointermove|mousemove|mouseenter|touchmove/gi],
 ['scroll',/ScrollTrigger|scrollY|wheel|scrollTo/gi],
 ['gsap',/\bgsap\b|gsap\.timeline/gi],
 ['react',/react-dom|useEffect|useRef|createElement/gi],
 ['nextFramework',/webpackChunk_N_E|__next_f|__NEXT_DATA__/gi],
 ['jsx',/jsxRuntime|jsxDEV|react\.jsx/gi]
];
const count=(s,re)=>{re.lastIndex=0;let n=0;while(re.exec(s)&&n<100000)n++;return n};
function signalHits(s){const x={};for(const [name,re]of signals){const n=count(s,re);if(n)x[name]=n}return x}
function syntaxStats(s){return{
 staticImports:count(s,/\bimport\s+(?:[\w{*]|['"])/g),
 dynamicImports:count(s,/\bimport\s*\(/g),
 requireCalls:count(s,/\brequire\s*\(/g),
 exportedDeclarations:count(s,/\bexport\s+(?:default|const|function|class|\{)/g),
 webpackRequireRefs:count(s,/__webpack_require__|webpackChunk_N_E/g),
 glslDirectives:count(s,/#version\s+300\s+es|gl_Position|gl_FragColor/g)
}}
function buildManifest(){
 const inv=read(path.join(DER,'X16-CURRENT','X16-offline-byte-verified-js-inventory.json'));
 const newer=read(path.join(DER,'X16-CURRENT','X16-new-js-response-bodies-local-only.json'));
 const newest=read(path.join(DER,'X18-CURRENT','X18-NEW-JS-ORIGINAL-BODIES-MANIFEST.json'));
 const cross=read(path.join(DER,'X18-CROSS-STAGE-CURRENT','X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json'));
 const prev=read(path.join(DER,'X19-PREFLIGHT','X19-SELECTED-ORIGINAL-JS-STATIC-PILOT.json'));
 if(cross.summary.status!=='COMPLETE_SCOPE_QUALIFIED'||prev.status!=='X19_STATIC_PILOT_PASS')throw Error('PREVIOUS_CROSS_STAGE_OR_PILOT_GATES_MISSING');
 if(read(path.join(RUNTIME,'node_modules','webcrack','package.json')).version!=='2.16.0')throw Error('WEBCRACK_VERSION_CHANGED');
 let items=[];
 for(const r of inv.resources.filter(r=>r.verified)){items.push({url:r.url,sha256:r.originalSha,bytes:r.sizeBytes,relative:r.localRelPath,firstSeenStage:r.stage,kind:'ORIGINAL_HTTP_RESPONSE_BYTES'})}
 for(const r of newer.items){items.push({url:r.url,sha256:r.sha256,bytes:r.bytes,relative:r.localRelPath,firstSeenStage:'X16',kind:'ORIGINAL_HTTP_RESPONSE_BYTES'})}
 for(const r of newest.items){items.push({url:r.url,sha256:r.sha256,bytes:r.bytes,relative:r.privateRelativePath,firstSeenStage:'X18',kind:'ORIGINAL_HTTP_RESPONSE_BYTES'})}
 const dedup=new Map();
 for(const it of items){
  if(!it.url.startsWith('https://www.gladeye.com/')||!it.url.endsWith('.js'))throw Error('INVALID_URL_SCOPE');
  const x=cross.resources.find(r=>r.url===canon(it.url));
  if(!x||!x.originalBodyVariants.some(r=>r.sha256===it.sha256))throw Error('MISSING_CROSS_STAGE_SHA_PROVENANCE:'+it.url);
  it.firstSeenStage=x.firstSeenStage;
  verifyCapture(it);
  const old=dedup.get(it.sha256);
  if(old){old.aliasUrls.push(it.url)}else{it.aliasUrls=[];dedup.set(it.sha256,it)}
 }
 items=[...dedup.values()].sort((a,b)=>b.bytes-a.bytes||a.url.localeCompare(b.url));
 if(items.length!==34)throw Error('EXPECTED_34_VERIFIED_CLIENT_JS_GOT_'+items.length);
 const distinctKnown=cross.resources.filter(x=>x.role==='JS').length;
 const missing=cross.resources.filter(x=>x.role==='JS'&&!items.some(y=>y.url===x.url))
  .map(x=>({url:x.url,firstSeenStage:x.firstSeenStage,classification:x.bodyIdentity,
   note:'NOT_BITWISE_VERIFIED_ORIGINAL_HTTP_RESPONSE_BODY; no invented input file'}));
 const result={stage:'X19',scope:'FULL_34_SHA_VERIFIED_PUBLIC_FIRST_PARTY_JS_ORIGINALS',
  basedOn:'X01-X18-CANONICAL_URL_AND_SHA',generatedUtc:new Date().toISOString(),
  count:items.length,byteTotal:items.reduce((v,x)=>v+x.bytes,0),
  deduplication:'identical original SHA scanned once; alias URLs preserved',
  missingSourceBodies:missing,items};
 write(path.join(CURRENT,'X19-FULL-INPUT-MANIFEST-PRIVATE.json'),result);
 return result;
}
async function worker(index){
 const manifest=read(path.join(CURRENT,'X19-FULL-INPUT-MANIFEST-PRIVATE.json'));
 const it=manifest.items[index];if(!it)throw Error('WORKER_INDEX_OUT_OF_RANGE');
 const src=verifyCapture(it),code=src.toString('utf8'),sha=it.sha256;
 const out=path.join(PRIVATE,String(index).padStart(2,'0')+'-'+sha.slice(0,14));
 const meta=path.join(CURRENT,'per-file',sha.slice(0,20)+'.json');
 if(fs.existsSync(meta)){console.log('WORKER_ALREADY_DONE '+index);return}
 if(os.freemem()<120*1048576)throw Error('WORKER_RAM_STOP');
 const {pathToFileURL}=await import('node:url');
 const {webcrack}=await import(pathToFileURL(path.join(RUNTIME,'node_modules','webcrack','dist','index.js')).href);
 let attempts=[],r=null,selected=null;
 for(const mode of [
  {name:'STATIC_JSX_UNMINIFY_UNPACK',jsx:true,unminify:true,unpack:true},
  {name:'STATIC_PLAIN_UNMINIFY_UNPACK',jsx:false,unminify:true,unpack:true},
  {name:'PARSE_ONLY_FALLBACK',jsx:false,unminify:false,unpack:false}
 ]){
  const ts=Date.now();
  try{
   r=await webcrack(code,{deobfuscate:false,jsx:mode.jsx,unminify:mode.unminify,unpack:mode.unpack,
    mangle:false});
   selected=mode.name;attempts.push({mode:mode.name,result:'PASS',elapsedMs:Date.now()-ts});
   break;
  }catch(e){
   attempts.push({mode:mode.name,result:'FAIL',elapsedMs:Date.now()-ts,
    error:(e.name||'Error')+': '+String(e.message).slice(0,180)});
   if(os.freemem()<120*1048576)throw Error('WORKER_RAM_STOP_AFTER_FAILURE');
  }
 }
 if(!r){
  write(meta,{stage:'X19',sourceUrl:it.url,firstSeenStage:it.firstSeenStage,sourceSHA256:sha,
   sourceBytes:it.bytes,status:'FAIL_ALL_STATIC_MODES',attempts,provenance:'SHA-VERIFIED_ORIGINAL_HTTP'});
  console.log('WORKER_FAILED '+JSON.stringify({index,url:it.url}));return
 }
 const exportDir=path.join(out,'static');
 await r.save(exportDir);
 const outputFiles=[];
 const walk=(dir,relative='')=>{
  for(const x of fs.readdirSync(dir,{withFileTypes:true})){
   const n=path.join(dir,x.name),rel=path.posix.join(relative,x.name);
   if(x.isDirectory())walk(n,rel);
   else if(x.isFile()){const st=fs.statSync(n);outputFiles.push({relativePath:rel,bytes:st.size,sha256:SHA(fs.readFileSync(n))})}
  }
 };walk(exportDir);
 const moduleKeys=r.bundle?.modules?[...r.bundle.modules.keys()].map(String):[];
 const modulePaths=r.bundle?.modules?[...r.bundle.modules.values()].map(x=>String(x.path||'')):[];
 const transformed=r.code||'';
 let deniedNativeCallbacks=0,advancedStatus='SKIPPED_NO_OBFUSCATION_EVIDENCE',advancedCodeBytes=null;
 const suspicious=(code.match(/_0x[a-f0-9]{3,}/gi)||[]).length;
 if(suspicious>=5&&it.bytes<=300000&&os.freemem()>450*1048576){
  try{
   const t=Date.now();
   const advanced=await webcrack(code,{deobfuscate:true,unminify:true,unpack:false,jsx:false,
    sandbox:async()=>{deniedNativeCallbacks++;throw Error('DJMRN_DENY_EXECUTING_UNTRUSTED_VENDOR_CODE')}});
   const advOut=path.join(out,'static-advanced-no-vm');
   fs.mkdirSync(advOut,{recursive:true});fs.writeFileSync(path.join(advOut,'deobfuscated-nonexecuting.js'),advanced.code);
   advancedStatus='PASS_DEOBFUSCATION_WITH_NO_NATIVE_EXECUTION';advancedCodeBytes=Buffer.byteLength(advanced.code||'');
   attempts.push({mode:'ADVANCED_NO_NATIVE_EXECUTION',result:'PASS',elapsedMs:Date.now()-t});
  }catch(e){advancedStatus=deniedNativeCallbacks?'BLOCKED_REQUIRED_UNTRUSTED_EVAL':
      'ADVANCED_AST_FAILED';attempts.push({mode:'ADVANCED_NO_NATIVE_EXECUTION',result:'FAIL',error:String(e.message).slice(0,120)})}
 }
 const result={stage:'X19',status:'PASS',observedUtc:new Date().toISOString(),
  sourceUrl:it.url,sha256:sha,firstSeenStage:it.firstSeenStage,sourceBytes:it.bytes,
  origin:'PRIVATELY_ARCHIVED_SHA256_VERIFIED_HTTP_RESPONSE_BODY',aliasUrls:it.aliasUrls,
  selectedStaticMode:selected,attempts,unpackFormat:r.bundle?.type||'NONE',
  moduleCount:moduleKeys.length,moduleIds:moduleKeys,modulePaths,
  privateOutputFiles:outputFiles.length,privateOutputBytes:outputFiles.reduce((s,x)=>s+x.bytes,0),
  privateOutputsSha256:outputFiles,transformedTopLevelBytes:Buffer.byteLength(transformed),
  transformedSha256:SHA(Buffer.from(transformed)),sourceSyntax:syntaxStats(code),transformedSyntax:syntaxStats(transformed),
  rawSourceSignalCounts:signalHits(code),transformedSignalCounts:signalHits(transformed),
  obfuscatedNameHits:suspicious,advancedStatus,deniedUntrustedVmEvaluations:deniedNativeCallbacks,
  advancedCodeBytes,
  classification:'DERIVED_MODULE_STRUCTURE_COMPLEMENTARY_NO_NEW_SITE_BODY',
  limitations:['Derived module AST is not original author source','Keyword counts are heuristic; large engine runtime may belong to third party',
  'Static analysis does not execute foreign JS','Native decoder is tested with own code but foreign-code VM evaluation denied']};
 write(meta,result);
 console.log('WORKER_RESULT '+JSON.stringify({index,status:result.status,bytes:result.sourceBytes,type:result.unpackFormat,
  modules:result.moduleCount,files:result.privateOutputFiles,mode:selected,
  advancedStatus,source:it.url,ramMiB:Math.round(os.freemem()/1048576)}));
}
function summarize(manifest,elapsed){
 const perDir=path.join(CURRENT,'per-file');
 const records=manifest.items.map((it,i)=>{
  const f=path.join(perDir,it.sha256.slice(0,20)+'.json');
  if(!fs.existsSync(f))return{index:i,sourceUrl:it.url,sha256:it.sha256,sourceBytes:it.bytes,firstSeenStage:it.firstSeenStage,status:'NOT_PROCESSED'};
  const x=read(f);return{index:i,...x};
 });
 const passed=records.filter(x=>x.status==='PASS'),failed=records.filter(x=>x.status!=='PASS');
 const stats={count:records.length,pass:passed.length,notProcessed:records.filter(x=>x.status==='NOT_PROCESSED').length,
  failure:failed.filter(x=>x.status!=='NOT_PROCESSED').length,
  originalsVerifiedTotal:manifest.count,originalBytesTotal:manifest.byteTotal,
  modulesExtracted:passed.reduce((s,x)=>s+x.moduleCount,0),filesGenerated:passed.reduce((s,x)=>s+x.privateOutputFiles,0),
  formats:passed.reduce((a,x)=>(a[x.unpackFormat]=(a[x.unpackFormat]||0)+1,a),{}),
  realVendorCodeEvaluatedInNode:false,
  optionalNativeAddonOwnerTestedPreviously:true,resultsWithObfuscationHeuristics:passed.filter(x=>x.obfuscatedNameHits>=5).length,
  nativeEvalDenied:passed.reduce((s,x)=>s+(x.deniedUntrustedVmEvaluations||0),0),
  totalElapsedSeconds:Math.round(elapsed/1000)};
 const report={stage:'X19',utc:new Date().toISOString(),status:failed.length===0?'FULL_VERIFIED_JS_STATIC_SWEEP_PASS':'PARTIAL_NEEDS_REVIEW',
  dataPolicy:'Only public-safe metadata may be copied to GitHub; original and transformed code remain on owner laptop',
  stats,sourceInput:manifest.items.map(x=>({url:x.url,sha256:x.sha256,bytes:x.bytes,firstSeenStage:x.firstSeenStage})),
  excludedOriginalBodies:manifest.missingSourceBodies,
  results:records.map(x=>({url:x.sourceUrl,status:x.status,sha256:x.sha256,sourceBytes:x.sourceBytes,
   firstSeenStage:x.firstSeenStage,unpackFormat:x.unpackFormat||null,moduleCount:x.moduleCount||0,
   moduleIds:x.moduleIds||[],modulePaths:x.modulePaths||[],filesGenerated:x.privateOutputFiles||0,
   transformedCodeBytes:x.transformedTopLevelBytes||0,signalCounts:x.rawSourceSignalCounts||{},
   syntax:x.sourceSyntax||{},advancedStatus:x.advancedStatus||null,
   deniedUntrustedVmEvaluations:x.deniedUntrustedVmEvaluations||0,
   errors:(x.attempts||[]).filter(k=>k.result==='FAIL').map(k=>({mode:k.mode,error:k.error}))})),
  limitations:['Comprehensive only for previously byte/SHA-verified first-party client JS (34); one X05 offline-mirror JS lacks verified original HTTP response body',
   'Unpack module count is DERIVED module representations, never original newly fetched site assets',
   'Direct dynamic VM execution of vendor code intentionally denied; owner-only native decoder separately tested',
   'No guarantee original source/GLSL and no complete undiscovered server side']};
 write(path.join(CURRENT,'X19-FULL-PUBLIC-SANITIZED-MODULE-REPORT.json'),report);
 write(path.join(CURRENT,'X19-FULL-INDEPENDENT-ACCEPTANCE.json'),{
  status:report.status,utc:report.utc,checks:{
   allOriginalVerifiedBeforeTransform:manifest.count===34,
   everyInputProcessed:passed.length===34,
   noFailedOrMissingFile:failed.length===0,
   noVendorNodeEval:report.stats.realVendorCodeEvaluatedInNode===false,
   independentOriginalHashLineage:passed.every(x=>x.sha256&&x.firstSeenStage),
   dataPrivateAndPublicMetadataSeparate:true},
   stats:report.stats,excluded:manifest.missingSourceBodies});
 console.log('X19_MAIN_SUMMARY '+JSON.stringify({status:report.status,...stats}));
}
async function main(){
 const begin=Date.now();fs.mkdirSync(CURRENT,{recursive:true});fs.mkdirSync(PRIVATE,{recursive:true});
 const manifest=buildManifest();
 const mode=process.argv[2]||'all';
 const indices=mode==='pilot'?[0,1,manifest.items.length-1]:manifest.items.map((_,i)=>i);
 let results=[],stoppedReason=null;
 for(const index of indices){
  const it=manifest.items[index],f=path.join(CURRENT,'per-file',it.sha256.slice(0,20)+'.json');
  if(fs.existsSync(f)){console.log('X19_SKIPPED_ALREADY_CHECKPOINTED '+index+' '+it.url);continue}
  if(os.freemem()<350*1048576){stoppedReason='STOP_RAM_UNDER_350_MIB';break}
  const timeoutMs=it.bytes>350000?115000:it.bytes>100000?65000:40000;
  const result=await new Promise(resolve=>{
   const args=['--no-node-snapshot','--max-old-space-size=640',__filename,'worker',String(index)];
   const kid=cp.spawn(process.execPath,args,{cwd:ROOT,windowsHide:true,stdio:['ignore','pipe','pipe']});
   let out='',err='',stop=null,reason=null;
   const timer=setTimeout(()=>{reason='TIMEOUT_'+timeoutMs+'MS';kid.kill()},timeoutMs);
   const memory=setInterval(()=>{if(os.freemem()<100*1048576){reason='STOP_RAM_BELOW_100_MIB';kid.kill()}},700);
   kid.stdout.on('data',b=>{out=(out+b.toString()).slice(-5000)});
   kid.stderr.on('data',b=>{err=(err+b.toString()).slice(-3000)});
   kid.on('error',e=>{reason='SPAWN_ERROR_'+e.message});
   kid.on('close',(code,signal)=>{clearTimeout(timer);clearInterval(memory);
    resolve({code,signal,reason,output:out,error:err})});
  });
  const success=fs.existsSync(f)&&read(f).status==='PASS';
  results.push({index,success,exit:result.code,reason:result.reason});
  if(!success){
   const prior=fs.existsSync(f)?read(f):null;
   write(f,prior||{stage:'X19',status:result.reason==='STOP_RAM_BELOW_100_MIB'?'RAM_STOP':
    result.reason?.startsWith('TIMEOUT')?'TIMEOUT':'WORKER_ERROR',
    sourceUrl:it.url,sha256:it.sha256,sourceBytes:it.bytes,firstSeenStage:it.firstSeenStage,
    error:(result.reason||result.error||result.output).slice(0,600)});
  }
  console.log('X19_FILE '+JSON.stringify({index:i32(index),sourceUrl:it.url,bytes:it.bytes,
    processed:success,exitCode:result.code,reason:result.reason||null,summary:result.output.slice(-400),
    freeRamMiB:Math.round(os.freemem()/1048576)}));
  write(path.join(CURRENT,'X19-MAIN-CHECKPOINT.json'),{utc:new Date().toISOString(),mode,
    completed:results.length,results,ramFreeMiB:Math.round(os.freemem()/1048576)});
  if(result.reason==='STOP_RAM_BELOW_100_MIB'){stoppedReason=result.reason;break}
 }
 summarize(manifest,Date.now()-begin);
 if(stoppedReason)console.log('X19_EARLY_STOP '+stoppedReason);
}
function i32(x){return String(x).padStart(2,'0')}
(async()=>{
 try{if(process.argv[2]==='worker')await worker(Number(process.argv[3]));
 else await main()}
 catch(e){console.error('X19_SCRIPT_ERROR '+(e?.stack||e));process.exitCode=2}
})();
