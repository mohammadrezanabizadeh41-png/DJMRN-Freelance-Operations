'use strict';
/* DJMRN X16: own deterministic, bounded Sources/CDP inspector. Public anonymous client resources only.
   No arbitrary map guessing, authentication, third-party bodies, or original vendor source publication. */
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto'),url=require('url');
const home=os.homedir(),base=path.join(home,'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(base,'02-reviewed-derived','X16-CURRENT'), capBase=path.join(base,'01-private-captures','X16');
const upstream=path.join(base,'02-reviewed-derived','X15-AUDIT-CURRENT','observed-first-party-resource-coverage.json');
const toolkit=path.join(process.env.LOCALAPPDATA||'', 'DJMRN-Website-Toolkit','04-Runtimes');
const chrome=path.join(toolkit,'ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteerRoot=path.join(toolkit,'X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer');
const runId='X16-'+new Date().toISOString().replace(/[:.]/g,'-');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const store=(p,x)=>fs.writeFileSync(p,JSON.stringify(x,null,2)+'\n');
const allowedHost=h=>['www.gladeye.com','gladeye.com'].includes(h);
const canon=s=>{try{const x=new URL(s);return x.origin+x.pathname;}catch{return '[non-url]';}};
const isSite=s=>{try{const x=new URL(s);return x.protocol==='https:'&&allowedHost(x.hostname)}catch{return false}};
const urlKind=s=>{if(!s)return'[document-or-internal]';return isSite(s)?canon(s):'[third-party-or-internal]';};
const paths=read(upstream).resources;
const knownJs=paths.filter(x=>{try{return new URL(x.url).pathname.endsWith('.js')}catch{return false}});
fs.mkdirSync(derived,{recursive:true});fs.mkdirSync(capBase,{recursive:true});
const original=new Map(),reports=[],issues=[];
function staticScan(){
 for(const item of knownJs){
  const candidates=(item.bodyCandidates||[]).filter(x=>x.localRelPath&&x.integrity==='PASS_SHA256'&&x.kind==='ORIGINAL_HTTP_RESPONSE_BODY');
  const selected=candidates[0]||(item.bodyCandidates||[]).find(x=>x.localRelPath&&x.integrity==='PASS_SHA256');
  const rec={url:canon(item.url),sourceStages:item.stages||[],bodyStatus:'NO_BYTE_VERIFIED_STANDALONE_BODY',verified:false,sourceMapDirectives:[],webpackModuleDefinitionHeuristic:0,dynamicChunkIdHeuristics:[],signals:[],role:'UNKNOWN'};
  if(!selected){issues.push({kind:'OFFLINE_BODY_MISSING',url:rec.url});reports.push(rec);continue}
  const loc=path.join(base,...selected.localRelPath.split('/'));
  rec.localRelPath=selected.localRelPath;rec.originalSha=selected.sha256;rec.stage=selected.stage;
  if(!fs.existsSync(loc)){issues.push({kind:'OFFLINE_LOCAL_FILE_MISSING',url:rec.url});reports.push(rec);continue}
  const buf=fs.readFileSync(loc),hash=sha(buf);
  rec.sizeBytes=buf.length;rec.verified=(hash===selected.sha256);
  rec.bodyStatus=rec.verified?'SHA256_PASS':'SHA256_FAIL';
  if(!rec.verified){issues.push({kind:'OFFLINE_HASH_MISMATCH',url:rec.url});reports.push(rec);continue}
  original.set(rec.url,hash);
  const text=buf.toString('utf8');
  rec.sourceMapDirectives=[...text.matchAll(/(?:\/\/[#@]|\/\*[#@])\s*sourceMappingURL\s*=\s*([^\s*]+)/g)].map(m=>m[1].slice(0,240)).slice(0,6);
  rec.webpackModuleDefinitionHeuristic=(text.match(/(?:^|[,({])\s*\d{1,7}\s*:\s*(?:function\s*\(|\([^)]*\)\s*=>)/g)||[]).length;
  rec.dynamicChunkIdHeuristics=[...new Set([...text.matchAll(/\.e\((\d{1,7})\)/g)].map(m=>m[1]))].slice(0,40);
  const clues=[['webpackChunk_N_E',/webpackChunk_N_E/],['webpackRequire',/__webpack_require__|\.m\s*=/],['nextRuntime',/__NEXT_DATA__|__next_f|self\.__next_f/],['react',/react\.production|react\.development|createElement|useEffect/],['threeEngine',/WebGLRenderer|ShaderMaterial|three\.js|ShaderChunk/],['animationLoop',/requestAnimationFrame|setAnimationLoop/],['scrollListener',/addEventListener\(["'](?:scroll|wheel|mousemove|pointermove)/],['dynamicImport',/import\(/],['glsl',/gl_FragColor|gl_Position|varying\s+|uniform\s+(?:float|vec)/],['cssLoader',/mini-css-extract-plugin|css-loader/]];
  rec.signals=clues.filter(([k,re])=>re.test(text)).map(([k])=>k);
  const u=rec.url;
  rec.role=u.includes('/chunks/app/')?'NEXT_APP_ROUTE_CHUNK':u.includes('/chunks/pages/')?'NEXT_PAGES_ROUTE_CHUNK':u.includes('/_next/static/chunks/')?'NEXT_CHUNK':u.includes('/_next/static/')?'NEXT_STATIC_OTHER':'SITE_JS_OTHER';
  rec.extractLimit='Heuristics from delivered minified client JS; not original authored source or exact module boundaries';
  reports.push(rec);
 }
 store(path.join(derived,'X16-offline-byte-verified-js-inventory.json'),{runId,generatedUtc:new Date().toISOString(),source:'X15 observed-first-party-resource-coverage.json',numberIndexed:knownJs.length,numberVerified:reports.filter(x=>x.verified).length,resources:reports,issues});
}
staticScan();
const mode=process.argv[2]||'offline';
if(mode==='offline'){console.log(JSON.stringify({mode,runId,jsIndexed:knownJs.length,jsHashVerified:reports.filter(x=>x.verified).length,issues:issues.length}));process.exit(issues.some(x=>x.kind==='OFFLINE_HASH_MISMATCH')?2:0)}
if(mode!=='live'){console.error('Choose offline or live');process.exit(2)}
const puppeteer=require(puppeteerRoot);
let browser=null,session=null,stop=false,stopReason='',memoryMin=os.freemem(),monitor=null;
const start=Date.now(),liveCap=path.join(capBase,runId),runOut=path.join(derived,'X16-LIVE-RUN.json');
fs.mkdirSync(liveCap,{recursive:true});
const visits=[],scripts=new Map(),network=new Map(),requestInfo=new Map(),edges=new Map(),failures=[],mapCandidates=new Map(),newBodies=new Map(),liveIssues=[];
const samples=[];
function safeWriteCheckpoint(phase){store(runOut,{runId,phase,elapsedSeconds:Math.round((Date.now()-start)/1000),memoryMinMiB:Math.round(memoryMin/1048576),visits,scripts:[...scripts.values()],requests:[...network.values()],edges:[...edges.values()],failures,mapCandidates:[...mapCandidates.values()],newBodies:[...newBodies.values()],issues:liveIssues});}
function addMapCandidate(baseJs,hint,via){
 if(!hint||typeof hint!=='string')return;
 const item={script:canon(baseJs),via,hintType:hint.startsWith('data:')?'INLINE_MAP':'EXTERNAL_MAP',status:'UNTESTED'};
 if(item.hintType==='INLINE_MAP'){item.status='INLINE_DECLARED_NOT_EXECUTED';mapCandidates.set(item.script+'|'+via,item);return}
 let target;try{target=new URL(hint,baseJs)}catch{item.status='MALFORMED_HINT';mapCandidates.set(item.script+'|'+via,item);return}
 item.mapUrl=target.origin+target.pathname;
 if(target.protocol!=='https:'||!allowedHost(target.hostname)){item.status='NON_FIRST_PARTY_NOT_PROBED';mapCandidates.set(item.script+'|'+via,item);return}
 if(target.search){item.status='QUERY_BEARING_URL_NOT_PROBED';mapCandidates.set(item.script+'|'+via,item);return}
 item.status='DECLARED_NOT_YET_PROBED';mapCandidates.set(item.script+'|'+via,item);
}
function memGuard(){
 const free=os.freemem();memoryMin=Math.min(memoryMin,free);
 if(free<100*1048576){stop=true;stopReason='RAM_FREE_BELOW_100_MIB';liveIssues.push({kind:'STOP_RAM_GUARD',freeMiB:Math.round(free/1048576)});}
}
function headers(h){const allow=['content-type','sourcemap','x-sourcemap','cache-control','content-encoding','x-powered-by','vary','server','etag'];const o={};for(const [k,v] of Object.entries(h||{})){const name=k.toLowerCase();if(allow.includes(name)){if(name==='sourcemap'||name==='x-sourcemap'){o[name]='[map-declaration-redacted]'}else{o[name]=String(v).slice(0,140)}}}return o}
function jsKind(u){return /\.(?:js|mjs)$/.test(new URL(u).pathname);}
(async()=>{
 if(os.freemem()<350*1048576)throw Error('PREFLIGHT_NOT_ENOUGH_FREE_MEMORY_350_MIB');
 if(!fs.existsSync(chrome))throw Error('MISSING_CHROME_FOR_TESTING');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreHTTPSErrors:true,acceptInsecureCerts:true,timeout:20000,args:['--headless=new','--disable-extensions','--no-first-run','--no-default-browser-check']});
 const page=await browser.newPage();
 await page.setViewport({width:1440,height:900,deviceScaleFactor:1});
 session=await page.createCDPSession();
 await session.send('Network.enable',{maxTotalBufferSize:25000000,maxResourceBufferSize:3000000});
 await session.send('Debugger.enable');
 session.on('Debugger.scriptParsed',e=>{
  if(!isSite(e.url))return;
  const id=e.scriptId,u=canon(e.url),r={url:u,scriptId:id,sourceMapDeclared:Boolean(e.sourceMapURL),startLine:e.startLine,endLine:e.endLine,isModule:Boolean(e.isModule),hasSourceURL:Boolean(e.hasSourceURL),hash:e.hash||null};
  if(!scripts.has(id))scripts.set(id,r);
  if(e.sourceMapURL)addMapCandidate(e.url,e.sourceMapURL,'CDP_DEBUGGER_SCRIPT_PARSED');
 });
 session.on('Debugger.scriptFailedToParse',e=>{if(isSite(e.url))failures.push({kind:'SCRIPT_FAILED_PARSE',url:canon(e.url),reason:'Debugger event'});});
 session.on('Network.requestWillBeSent',e=>{
  if(!isSite(e.request.url))return;
  let source='',sourceType=(e.initiator||{}).type||'unknown';
  if(e.initiator?.stack?.callFrames?.length){source=e.initiator.stack.callFrames[0].url;}
  else if(e.initiator?.url){source=e.initiator.url;}
  else if(e.documentURL){source=e.documentURL;}
  requestInfo.set(e.requestId,{url:canon(e.request.url),source:urlKind(source),type:sourceType});
  if(source && isSite(source)){const from=canon(source),to=canon(e.request.url),key=from+' -> '+to+' ('+sourceType+')';
   if(!edges.has(key))edges.set(key,{from,to,initiatorType:sourceType,count:0});edges.get(key).count++;
  }
 });
 session.on('Network.responseReceived',e=>{
  if(!isSite(e.response.url))return;
  const req=requestInfo.get(e.requestId)||{},u=canon(e.response.url);
  const key=e.requestId,fullHeaders=e.response.headers||{},h=headers(fullHeaders);
  const r={url:u,resourceType:e.type,status:e.response.status,mimeType:e.response.mimeType,initiator: req.source||'[unknown]',initiatorType:req.type||'unknown',headers:h,fromCache:Boolean(e.response.fromDiskCache||e.response.fromPrefetchCache),serviceWorker:Boolean(e.response.fromServiceWorker)};
  network.set(key,r);
  for(const [k,v] of Object.entries(fullHeaders)){if(['sourcemap','x-sourcemap'].includes(k.toLowerCase())){addMapCandidate(e.response.url,String(v),k.toUpperCase());}}
 });
 session.on('Network.loadingFailed',e=>{
  const info=requestInfo.get(e.requestId);
  if(info)failures.push({kind:'REQUEST_FAILED',url:info.url,error:String(e.errorText||'network').slice(0,90),canceled:Boolean(e.canceled)});
 });
 session.on('Network.loadingFinished',async e=>{
  const info=requestInfo.get(e.requestId),resp=network.get(e.requestId);
  if(!info||!resp||!isSite(info.url)||!jsKind(info.url)||stop)return;
  if((resp.status||0)!==200||original.has(info.url)||newBodies.has(info.url))return;
  try{
   const b=await session.send('Network.getResponseBody',{requestId:e.requestId});
   const buffer=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body,'utf8');
   if(buffer.length>1500000){liveIssues.push({kind:'NEW_JS_TOO_LARGE_TO_STORE',url:info.url,bytes:buffer.length});return}
   const digest=sha(buffer),file=path.join(liveCap,digest.slice(0,24)+'.js');
   fs.writeFileSync(file,buffer);
   newBodies.set(info.url,{url:info.url,sha256:digest,bytes:buffer.length,localRelPath:path.relative(base,file).replaceAll('\\','/'),httpStatus:200});
  }catch(err){liveIssues.push({kind:'NEW_JS_BODY_UNAVAILABLE',url:info.url,reason:err.name||'Error'})}
 });
 monitor=setInterval(memGuard,1000);memGuard();
 const routes=['/','/work','/about','/careers','/contact','/ventures','/work/hypercinema','/work/into-the-amazon','/work/the-dj-and-the-war-crimes','/work/where-opportunity-takes-root'];
 for(let i=0;i<routes.length;i++){
  if(stop)break;
  const route=routes[i];let status=null,navError=null,navTime=Date.now();
  try{
   const res=await page.goto('https://www.gladeye.com'+route,{waitUntil:'domcontentloaded',timeout:22000});status=res?res.status():null;
   await new Promise(resolve=>setTimeout(resolve,i===0?11500:2500));
   if(i===0&&!stop){await page.mouse.move(520,360);await page.mouse.move(790,410);await page.mouse.wheel({deltaY:250});await new Promise(resolve=>setTimeout(resolve,1100));}
  }catch(err){navError=err.name+':'+String(err.message).slice(0,120);liveIssues.push({kind:'NAV_ERROR',route,reason:navError});}
  visits.push({route,status,elapsedMs:Date.now()-navTime,navError});
  samples.push({route,ramFreeMiB:Math.round(os.freemem()/1048576),jsParsed:scripts.size,firstPartyRequests:network.size});
  safeWriteCheckpoint('AFTER_ROUTE_'+(i+1));
  console.log('X16_ROUTE '+(i+1)+'/'+routes.length+' '+route+' HTTP='+status+' JS='+scripts.size+' RAM_MIB='+Math.round(os.freemem()/1048576));
 }
 if(stop)liveIssues.push({kind:'RUN_ABORTED',reason:stopReason});
 await new Promise(resolve=>setTimeout(resolve,1500));
 // Only follow explicitly advertised, anonymous, same-origin map URLs. No map guessing.
 const unique=new Set();
 for(const m of mapCandidates.values()){
  if(m.status!=='DECLARED_NOT_YET_PROBED')continue;
  if(unique.has(m.mapUrl)){m.status='DUPLICATE_DECLARATION_ALREADY_PROBED';continue}
  unique.add(m.mapUrl);
  if(unique.size>18){m.status='SKIPPED_PROBE_CAP_18';continue}
  try{
   const response=await page.evaluate(async u=>{const c=new AbortController(),timer=setTimeout(()=>c.abort(),8500);
    try{const r=await fetch(u,{method:'GET',credentials:'omit',cache:'no-store',redirect:'manual',signal:c.signal});const ct=r.headers.get('content-type')||'';const length=r.headers.get('content-length');const bytes=length?Number(length):null;return{status:r.status,contentType:ct.slice(0,100),bytes,redirected:r.redirected};}
    finally{clearTimeout(timer)}
   },m.mapUrl);
   m.status='PROBED_HTTP_'+response.status;m.response=response;
  }catch(e){m.status='PROBE_NETWORK_OR_BROWSER_ERROR';m.errorKind=e.name||'Error'}
 }
 {
 const navs=visits.length,jsRequests=[...network.values()].filter(x=>x.resourceType==='Script'||/\.js$/.test(x.url));
 const allRequests=[...network.values()],httpStatusCounts={};
 for(const n of allRequests){const k=String(n.status);httpStatusCounts[k]=(httpStatusCounts[k]||0)+1}
 const result={runId,endedUtc:new Date().toISOString(),elapsedSeconds:Math.round((Date.now()-start)/1000),
  baselineIndexedJs:knownJs.length,offlineVerifiedJs:reports.filter(x=>x.verified).length,offlineHashIssues:issues.length,
  visitCount:navs,uniqueVisitedPaths:[...new Set(visits.map(v=>v.route))].length,visits,samples,
  firstPartyResponseEvents:network.size,firstPartyJsRequestEvents:jsRequests.length,
  uniqueNetworkScriptPaths:[...new Set(jsRequests.map(x=>x.url))].length,scriptParsedEvents:scripts.size,
  initiatorEdges:edges.size,newJsBodies:newBodies.size,sourceMapDeclarations:mapCandidates.size,
  memoryMinMiB:Math.round(memoryMin/1048576),ramStopTriggered:stop,
  failures:failures.length,liveIssues:liveIssues.length,httpStatusCounts};
 store(path.join(derived,'X16-live-summary.json'),result);
 store(path.join(derived,'X16-script-parsed-and-network.json'),{runId,source:'CDP Debugger.scriptParsed / Network.responseReceived',scriptParsed:[...scripts.values()],responses:allRequests,failures,issues:liveIssues});
 store(path.join(derived,'X16-script-init-network-graph.json'),{runId,method:'CDP Network.requestWillBeSent initiator callFrame/parser/document URLs; not complete runtime import graph',edges:[...edges.values()],sampleLimitations:['parser initiators do not prove JS dependencies','hidden dynamic imports not triggered remain unknown','client-side dependencies only']});
 store(path.join(derived,'X16-source-map-reachability.json'),{runId,policy:'Advertised maps only; no .map filename guessing; only same-origin anonymous GET, credentials omitted',candidates:[...mapCandidates.values()]});
 store(path.join(derived,'X16-new-js-response-bodies-local-only.json'),{runId,rawBodiesPrivateOnOwnerLaptop:true,items:[...newBodies.values()]});
 const checks={baselineStaticSHA:!issues.some(x=>x.kind==='OFFLINE_HASH_MISMATCH'),routesObserved:navs>0,cdpDebuggerWorked:scripts.size>0,cdpNetworkWorked:network.size>0,sourceMapInventoryWritten:true,graphWritten:true,noLowMemoryStop:!stop,headlessBrowserClosed:'PENDING_CLEANUP'};
 store(path.join(derived,'X16-acceptance-check.json'),{runId,status:Object.values(checks).every(x=>x===true||x==='PENDING_CLEANUP')?'READY_FOR_FINAL_AUDIT':'SCOPE_QUALIFIED_NEEDS_REVIEW',checks,knownLimits:['No original backend or unserved source','No reliance on undocumented .map guesses','No copying of raw vendor JS to public GitHub','Headless Chrome; no physical GPU claim'],issues:liveIssues});
 console.log('X16_SUMMARY '+JSON.stringify(result));
}
})().catch(e=>{liveIssues.push({kind:'FATAL',type:e.name,message:String(e.message).slice(0,160)});console.log('X16_FATAL '+e.name+' '+String(e.message).slice(0,160));process.exitCode=2;})
.finally(async()=>{
 if(monitor)clearInterval(monitor);
 if(session)await session.detach().catch(()=>{});
 if(browser)await browser.close().catch(()=>{});
 try{const p=path.join(derived,'X16-acceptance-check.json');if(fs.existsSync(p)){const j=read(p);j.checks.headlessBrowserClosed=true;if(j.status==='READY_FOR_FINAL_AUDIT')j.status='COMPLETE_SCOPE_QUALIFIED';store(p,j)}}catch{}
});
