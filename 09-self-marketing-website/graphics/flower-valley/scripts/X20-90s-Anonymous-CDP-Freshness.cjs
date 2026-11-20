'use strict';
// DJMRN X20 owner-directed bounded 90s anonymous public browser observation.
// Raw first-party response bytes and screenshots are PRIVATE; publish sanitized metadata only.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const local=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes');
const chrome=path.join(local,'ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteerPath=path.join(local,'X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer');
const previous=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json'),'utf8'));
const known=new Map(previous.resources.map(x=>[x.url,x]));
const knownHash=new Set(previous.resources.flatMap(x=>(x.originalBodyVariants||[]).map(v=>v.sha256)));
const privateDir=path.join(root,'01-private-captures','X20','live-90s');
const derivedDir=path.join(root,'02-reviewed-derived','X20-CURRENT');
fs.mkdirSync(privateDir,{recursive:true});fs.mkdirSync(derivedDir,{recursive:true});
const output=path.join(derivedDir,'X20-LIVE-90S-PRIVATE-INDEX.json');
const safeOutput=path.join(derivedDir,'X20-LIVE-90S-SANITIZED.json');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const firstParty=u=>{try{return new URL(u).protocol==='https:'&&['www.gladeye.com','gladeye.com'].includes(new URL(u).hostname)}catch{return false}};
const canon=u=>{try{let x=new URL(u);return x.origin+x.pathname}catch{return '[INVALID]'}};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const timestamp=()=>new Date().toISOString();
const stats={startedUtc:timestamp(),maxObservationSeconds:90,memoryEmergencyMiB:100,browser:'existing Chrome for Testing 157',
 priorLedger:'X01-X19 78 normalized paths',newBrowserOrPluginInstall:false};
const started=Date.now(),samples=[],requests=new Map(),responses=new Map(),scriptParsed=new Map(),edges=new Map(),assets=new Map(),issues=[];
let browser,page,cdp,watchdog,ramTicker,stopReason=null,ended=false,minFree=Math.round(os.freemem()/1048576),storedBytes=0,activeBodies=new Set();
const recordIssue=(kind,detail)=>{if(issues.length<60)issues.push({kind,detail:String(detail).slice(0,170)})};
const maybeCapture=e=>{
 let resp=responses.get(e.requestId);
 if(!resp||resp.status!==200||!resp.url||!firstParty(resp.url)||Date.now()-started>91500)return;
 if(assets.has(resp.url)||activeBodies.has(resp.url)||assets.size>70)return;
 if(storedBytes>=14000000)return;
 const ext=path.extname(new URL(resp.url).pathname).toLowerCase();
 if(!['.js','.mjs','.css','.glb','.gltf','.png','.jpg','.jpeg','.webp','.svg','.woff','.woff2','.json','.html'].includes(ext)&&!['Document','Script','Stylesheet','Image','Font','XHR','Fetch'].includes(resp.type))return;
 if(['XHR','Fetch'].includes(resp.type)&&!ext)return;
 activeBodies.add(resp.url);
 const p=cdp.send('Network.getResponseBody',{requestId:e.requestId}).then(body=>{
  let b=body.base64Encoded?Buffer.from(body.body,'base64'):Buffer.from(body.body||'','utf8');
  if(b.length===0||b.length>2000000)return;
  const digest=sha(b);
  const before=known.get(resp.url);
  const sameOld=!!before&&(before.originalBodyVariants||[]).some(x=>x.sha256===digest);
  const sameHashOther=knownHash.has(digest);
  const classification=before?(sameOld?'KNOWN_PATH_SAME_SHA':(before.originalBodyVariants||[]).length?'KNOWN_PATH_NEW_BODY_VARIANT_CANDIDATE':'KNOWN_PATH_FIRST_VERIFIED_BODY_CANDIDATE'):(sameHashOther?'NEW_PATH_REUSED_OLD_SHA':'NEW_PATH_NEW_SHA_CANDIDATE');
  const suffix=ext||({'image/webp':'.webp','image/png':'.png','image/jpeg':'.jpg','text/html':'.html','application/javascript':'.js'}[resp.mime]||'.bin');
  const name=digest.slice(0,24)+suffix;
  const f=path.join(privateDir,name);
  if(!fs.existsSync(f)){fs.writeFileSync(f,b,{flag:'wx'});storedBytes+=b.length}
  assets.set(resp.url,{url:resp.url,status:resp.status,type:resp.type,mime:resp.mime,classification,sha256:digest,bytes:b.length,previousFirstSeen:before?.firstSeenStage||null,privateFilename:name,contentSource:'Chrome CDP Network.getResponseBody; decoded content, not independent wire-exact bytes'});
 }).catch(ex=>recordIssue('BODY_READ_UNAVAILABLE',resp.url+' '+ex.name)).finally(()=>activeBodies.delete(resp.url));
 activeBodies.add(resp.url);
 return p;
};
async function observe(label){
 if(!page)return;
 let o={label,elapsedSeconds:Math.round((Date.now()-started)/1000),url:canon(page.url()),freeRamMiB:Math.round(os.freemem()/1048576)};
 try{o.dom=await page.evaluate(()=>{
  const canvas=[...document.querySelectorAll('canvas')].map(x=>({w:x.width,h:x.height,clientW:x.clientWidth,clientH:x.clientHeight}));
  return{canvasCount:canvas.length,canvas,scrollY:Math.round(scrollY),scrollHeight:document.documentElement.scrollHeight,
   animationCount:document.getAnimations().length,images:document.images.length,scriptTags:document.querySelectorAll('script[src]').length,
   resourceEntries:performance.getEntriesByType('resource').length,viewport:[innerWidth,innerHeight],hasWebGLCanvas:canvas.length>0}
 })}catch(ex){o.error=ex.name||'Error'}
 samples.push(o);console.log('X20_LIVE_SAMPLE '+JSON.stringify({sec:o.elapsedSeconds,label,ram:o.freeRamMiB,canvas:o.dom?.canvasCount,anim:o.dom?.animationCount,requests:responses.size,assets:assets.size}));
}
function buildReport(){
 const observed=[...new Set([...responses.values()].map(v=>v.url))];
 const knownPaths=observed.filter(v=>known.has(v));
 const newPaths=observed.filter(v=>!known.has(v));
 const statusCount={};for(const x of responses.values())statusCount[x.status]=(statusCount[x.status]||0)+1;
 const classCount={};for(const x of assets.values())classCount[x.classification]=(classCount[x.classification]||0)+1;
 const initEdges=[...edges.values()];
 return {stage:'X20',scope:'exactly 90s planned anonymous observation of public same-origin routes',stats:{
  ...stats,endedUtc:timestamp(),observationElapsedSeconds:Math.round((Date.now()-started)/1000),
  uniqueObservedFirstPartyPaths:observed.length,knownPathsObserved:knownPaths.length,newPathCandidates:newPaths.length,
  capturedBodies:assets.size,storedNewPrivateBytes:storedBytes,bodyClassifications:classCount,networkStatuses:statusCount,
  initiatorPairs:initEdges.length,jsWithDeclaredSourceMaps:[...scriptParsed.values()].filter(v=>v.sourceMapDeclared).length,
  minFreeMemoryMiB:minFree,stopReason,issues:issues.length},
  knownPathsObserved:knownPaths,newPathCandidates:newPaths,
  bodies:[...assets.values()],requests:[...responses.values()],scriptParsed:[...scriptParsed.values()],
  initiatorEdges:initEdges,samples,issues,
  caveats:['Client-side ordinary page JavaScript runs in isolated Chrome, not Node VM','No session credentials, request/response headers, query values or cookies stored','CDP response body is decoded API content, not guaranteed wire-exact HTTP raw body','No original source maps, authoring source, private backend or GPU shader provenance guaranteed','New path alone is not a new file; compare SHA+URL+first-seen before promotion']};
}
async function shutdown(){
 if(ended)return;ended=true;
 clearInterval(ramTicker);clearTimeout(watchdog);
 try{await Promise.race([Promise.allSettled([...activeBodies]),sleep(1200)])}catch{}
 try{await browser?.close()}catch(ex){recordIssue('CLEANUP_BROWSER',ex.name)}
 const report=buildReport();
 fs.writeFileSync(output,JSON.stringify(report,null,2));
 const publicReport={stage:report.stage,scope:report.scope,stats:report.stats,newPathCandidates:report.newPathCandidates,
  newAndChangedBodyCandidates:report.bodies.filter(x=>x.classification!=='KNOWN_PATH_SAME_SHA').map(x=>({url:x.url,mime:x.mime,bytes:x.bytes,sha256:x.sha256,classification:x.classification,previousFirstSeen:x.previousFirstSeen})),
  knownPathByteIdentityCounts:report.stats.bodyClassifications,initiatorEdges:report.initiatorEdges,samples:report.samples,
  issues:report.issues,caveats:report.caveats};
 fs.writeFileSync(safeOutput,JSON.stringify(publicReport,null,2));
 console.log('X20_LIVE_FINAL '+JSON.stringify({elapsed:report.stats.observationElapsedSeconds,paths:report.stats.uniqueObservedFirstPartyPaths,
 newPaths:report.stats.newPathCandidates,bodyClasses:report.stats.bodyClassifications,assetCount:report.stats.capturedBodies,
 edges:report.stats.initiatorPairs,ramMin:report.stats.minFreeMemoryMiB,stopReason,issues:issues.length}));
}
async function main(){
 if(os.freemem()<650*1048576)throw Error('ABORT_LOW_RAM_START');
 if(!fs.existsSync(chrome)||!fs.existsSync(puppeteerPath))throw Error('MISSING_EXISTING_BROWSER');
 const puppeteer=require(puppeteerPath);
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:17000,
 args:['--headless=new','--disable-extensions','--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 cdp=await page.createCDPSession();await cdp.send('Network.enable',{maxTotalBufferSize:16000000,maxResourceBufferSize:2100000});await cdp.send('Debugger.enable');
 cdp.on('Debugger.scriptParsed',e=>{if(!firstParty(e.url))return;let u=canon(e.url),o=scriptParsed.get(u)||{url:u,count:0,sourceMapDeclared:false};o.count++;o.sourceMapDeclared||=!!e.sourceMapURL;scriptParsed.set(u,o)});
 cdp.on('Network.requestWillBeSent',e=>{if(!firstParty(e.request.url))return;let url=canon(e.request.url);
  let parent=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url||null;
  requests.set(e.requestId,{url,initiatorType:String(e.initiator?.type||''),from:parent&&firstParty(parent)?canon(parent):null});
  if(parent&&firstParty(parent)){let from=canon(parent),key=from+'|'+url,obj=edges.get(key)||{from,to:url,count:0};obj.count++;edges.set(key,obj)}
 });
 cdp.on('Network.responseReceived',e=>{if(!firstParty(e.response.url))return;const u=canon(e.response.url);responses.set(e.requestId,{url:u,status:e.response.status,type:e.type,mime:String(e.response.mimeType||'').slice(0,70),fromCache:!!e.response.fromDiskCache,queryPresent:!!new URL(e.response.url).search})});
 cdp.on('Network.loadingFinished',e=>{maybeCapture(e)});
 cdp.on('Network.loadingFailed',e=>{let v=requests.get(e.requestId);if(v)recordIssue('NETWORK_FAILED',v.url+' '+e.errorText)});
 try{await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:16000})}catch(ex){recordIssue('HOME_GOTO',ex.name)}
 const phases=[{at:7000,label:'home_initial',fn:()=>Promise.resolve()},
  {at:19000,label:'pointer_left_right',fn:async()=>{await page.mouse.move(200,280);await page.mouse.move(1020,410)}},
  {at:32000,label:'scroll_first',fn:async()=>{await page.mouse.wheel({deltaY:350})}},
  {at:45000,label:'scroll_second',fn:async()=>{await page.mouse.wheel({deltaY:640})}},
  {at:59000,label:'pointer_reversal',fn:async()=>{await page.mouse.move(530,160);await page.mouse.move(410,420)}},
  {at:69000,label:'work_route',fn:async()=>{await page.goto('https://www.gladeye.com/work',{waitUntil:'domcontentloaded',timeout:9500})}},
  {at:79000,label:'work_hover_scroll',fn:async()=>{await page.mouse.move(740,310);await page.mouse.wheel({deltaY:330})}},
  {at:87000,label:'work_final',fn:()=>Promise.resolve()}];
 for(const t of phases){while(!stopReason&&Date.now()-started<t.at)await sleep(Math.min(700,t.at-(Date.now()-started)));
  if(stopReason||Date.now()-started>=90000)break;try{await t.fn();await observe(t.label)}catch(ex){recordIssue('ACTION_ERROR',t.label+' '+ex.name)}}
 while(!stopReason&&Date.now()-started<90000)await sleep(Math.min(500,90000-(Date.now()-started)));
 stopReason||='COMPLETED_90S';
}
watchdog=setTimeout(()=>{stopReason='WATCHDOG_103S';try{browser?.close()}catch{}},103000);
ramTicker=setInterval(()=>{const v=Math.round(os.freemem()/1048576);minFree=Math.min(minFree,v);if(v<=100){stopReason='EMERGENCY_RAM_100MIB';try{browser?.close()}catch{}}},1000);
main().catch(ex=>{stopReason||='FATAL';recordIssue('FATAL',ex.name+': '+ex.message)}).finally(async()=>{await shutdown()});