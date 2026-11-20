'use strict';
// DJMRN X29: REAL public homepage 90s READ-ONLY WebGL draw metadata, with official WebGLRipper
// extension activated but NEVER issuing the capture/export command on a commercial website.
// No raw original WebGL buffers, shaders, GLB/OBJ, pixels, geometry or asset bodies published.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const d=path.join(root,'02-reviewed-derived','X29-CURRENT'),rawDir=path.join(root,'01-private-captures','X29','public-live-metadata-90s');
fs.mkdirSync(rawDir,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit'),ext=path.join(tk,'04-Specialists','Sources','WebGLRipper','source-7fe32c9616f5'),
chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe'),
puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer')),
playwright=require(path.join(tk,'03-WebGL','WebGL-Toolchain','node_modules','playwright-core'));
const prior=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json')));
const urls=new Map(prior.resources.map(r=>[r.url,r]));
const x16=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X16-CURRENT','X16-script-init-network-graph.json')));
const edgesOld=new Set(x16.edges.map(x=>x.from+'|'+x.to));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),sleep=ms=>new Promise(r=>setTimeout(r,ms)),
first=u=>{try{return new URL(u).origin==='https://www.gladeye.com'}catch{return false}},
canon=u=>{try{const x=new URL(u);return x.origin+x.pathname}catch{return null}};
const result={stage:'X29',site:'https://www.gladeye.com/',tool:'official int3re/WebGLRipper pinned 7fe32c9616f5 v1.3.2 MIT activated in isolated Chrome157 MAIN-world doc_start; READ-ONLY; NO EXPORT',
sourceSHA:'7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849',targetSeconds:90,ownerRamHardStopMiB:100,
geometryExportOfOriginalSite:false,originalSiteGLB:false,originalVertexShaderSourcesSaved:false,originalTexturePixelDataSaved:false,
screenshotsPrivateOnPCOnly:true,startUTC:new Date().toISOString(),schedule:[],snapshots:[],issues:[]};
let browser,page,cdp,pwB,pwPage,watchdog,timer,observedStart=null,stop=null,minFree=Math.floor(os.freemem()/1048576);
const responses=new Map(),edges=new Set(),bodyHashes=new Map(),pending=new Set();
function warn(phase,e){if(result.issues.length<15)result.issues.push({phase,info:String(e?.message||e).slice(0,170)})}
function loadBody(id){
 const r=responses.get(id);if(!r||!first(r.url)||r.status!==200||pending.size>4)return;
 const p=canon(r.url),extname=path.extname(new URL(r.url).pathname).toLowerCase();
 if(!['.js','.css','.json','.png','.glb','.webp','.svg','.jpg','.jpeg'].includes(extname))return;
 const task=cdp.send('Network.getResponseBody',{requestId:id}).then(b=>{
  const bytes=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body||'','utf8');if(bytes.length<1||bytes.length>2400000)return;
  const hash=sha(bytes),key=p+'|'+hash;if(bodyHashes.has(key))return;
  const old=urls.get(p);let exact=!!old?.originalBodyVariants?.some(v=>v.sha256===hash&&v.bytes===bytes.length);
  bodyHashes.set(key,{url:p,sha256:hash,bytes:bytes.length,knownSourcePath:!!old,exactPreviousOriginalBodyShaSize:exact});
 }).catch(e=>warn('metadata_hash_only',e)).finally(()=>pending.delete(task));pending.add(task);
}
async function sample(t,label,action){
 const wait=t*1000-(Date.now()-observedStart);if(wait>0)await sleep(wait);
 if(stop)return;
 try{
  await action();await sleep(400);
  const meta=await page.evaluate(()=>{
   const summary=window.__DJMRN_X29_READONLY||null;
   return {ripperReady:window.__DJMRN_X29_MESSAGES||[],
    canvasCount:document.querySelectorAll('canvas').length,
    webgl2:!!document.querySelector('canvas')?.getContext('webgl2'),
    ThreeRevision:window.__THREE__||null,
    scrollY:Math.round(window.scrollY),
    renderer:summary?{totalDraws:summary.draws,signatureCount:Object.keys(summary.signatures).length,
      signatures:Object.values(summary.signatures).map(v=>({...v})).sort((a,b)=>a.mode-b.mode||a.count-b.count),
      nativeGlInstancedDrawCount:summary.instancedDrawCalls,firstRealContextWebGL2:summary.webgl2}:null};
  });
  result.snapshots.push({label,scheduledSecond:t,actualSecond:Math.round((Date.now()-observedStart)/10)/100,metadata:meta});
  if(['initial','return_idle'].includes(label)){
   const img=await page.screenshot({type:'png',captureBeyondViewport:false}),name='X29-PRIVATE-LIVE-'+label+'.png';
   fs.writeFileSync(path.join(rawDir,name),img);
   result.snapshots.at(-1).privateScreenshot={name,bytes:img.length,sha256:sha(img)};
  }
  console.log('X29_LIVE_WINDOW '+JSON.stringify({label,time:result.snapshots.at(-1).actualSecond,ripperReady:meta.ripperReady.some(x=>x.type==='ready'),
    totalDraws:meta.renderer?.totalDraws,signatures:meta.renderer?.signatureCount,freeMiB:Math.round(os.freemem()/1048576)}));
 }catch(e){warn('sample_'+label,e)}
}
async function run(){
 if(os.freemem()/1048576<850)throw Error('RAM_TOO_LOW_TO_START');
 const manifest=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json')));if(manifest.version!=='1.3.2'||manifest.manifest_version!==3)throw Error('VERSION_FAIL');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:20000,ignoreDefaultArgs:['--disable-extensions'],
   userDataDir:path.join(rawDir,'isolated-headless-chrome157'),
   args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,
    '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 const spy=()=>{
   if(!window.WebGL2RenderingContext)return;
   let reads=0,instance=0,signatures=Object.create(null);
   const state={draws:0,instancedDrawCalls:0,webgl2:true,signatures};
   window.__DJMRN_X29_READONLY=state;
   for(const op of ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced','drawRangeElements']){
    const proto=WebGL2RenderingContext.prototype,original=proto[op];if(typeof original!=='function')continue;
    proto[op]=function(...args){
      try{
       const mode=args[0],count=op==='drawRangeElements'?args[3]:op.startsWith('drawElements')?args[1]:args[2],
         instanceCount=op==='drawRangeElements'?1:op.endsWith('Instanced')?args.at(-1):1,
         sig=String(mode)+'|'+String(count)+'|'+String(instanceCount)+'|'+op;
       let obj=signatures[sig];if(!obj)signatures[sig]=obj={mode,count,instanceCount,op,calls:0};
       obj.calls++;state.draws++;if(instanceCount>1)state.instancedDrawCalls++;
      }catch{}
      return Reflect.apply(original,this,args);
    };
   }
 };
 await page.evaluateOnNewDocument(spy);
 cdp=await page.createCDPSession();await cdp.send('Network.enable',{maxResourceBufferSize:2400000,maxTotalBufferSize:18000000});
 cdp.on('Network.requestWillBeSent',e=>{if(!first(e.request.url))return;const to=canon(e.request.url),
   fr=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url||'';if(first(fr))edges.add(canon(fr)+'|'+to)});
 cdp.on('Network.responseReceived',e=>{if(first(e.response.url))responses.set(e.requestId,{url:e.response.url,status:e.response.status})});
 cdp.on('Network.loadingFinished',e=>loadBody(e.requestId));
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:28000});
 const ready=await page.waitForFunction(()=>!!(window.__THREE__==='154'&&document.querySelector('canvas')?.getContext('webgl2')),{timeout:15000});
 await page.evaluate(()=>{window.__DJMRN_X29_MESSAGES=[];document.addEventListener('webglripper:ext',e=>{try{
  const m=JSON.parse(e.detail);if(['ready','state'].includes(m.type))window.__DJMRN_X29_MESSAGES.push({type:m.type,contexts:m.contexts,state:m.state,canvases:m.canvases?.length});
 }catch{}});document.dispatchEvent(new CustomEvent('webglripper:page',{detail:JSON.stringify({type:'hello'})}))});
 // Both contexts are isolated in this fresh disposable profile; no capture/export command on the commercial site.
 pwB=await playwright.chromium.connectOverCDP(browser.wsEndpoint());
 pwPage=pwB.contexts().flatMap(x=>x.pages()).find(x=>x.url().includes('www.gladeye.com'));
 if(!pwPage)throw Error('PLAYWRIGHT_CDP_MISSING_PAGE');
 observedStart=Date.now();result.liveStartedUTC=new Date().toISOString();
 const timeline=[
 [3,'initial',async()=>{}],
 [16,'hover_left',async()=>pwPage.mouse.move(170,240,{steps:8})],
 [29,'hover_right',async()=>pwPage.mouse.move(1080,450,{steps:10})],
 [42,'scroll_450',async()=>pwPage.mouse.wheel(0,450)],
 [55,'pointer_center',async()=>pwPage.mouse.move(640,350,{steps:8})],
 [72,'reverse_scroll',async()=>pwPage.mouse.wheel(0,-450)],
 [87,'return_idle',async()=>pwPage.mouse.move(0,0,{steps:8})]];
 for(const [t,label,act] of timeline){await sample(t,label,act);if(stop)break}
 const left=90000-(Date.now()-observedStart);if(left>0&&!stop)await sleep(left);
 result.actualObservedSeconds=+( (Date.now()-observedStart)/1000).toFixed(2);
 if(!stop)stop='COMPLETED_90_SECONDS';
}
timer=setInterval(()=>{const n=Math.floor(os.freemem()/1048576);minFree=Math.min(n,minFree);
 if(n<=100&&!stop){stop='EMERGENCY_RAM_100_MIB';browser?.close().catch(()=>{})}},350);
watchdog=setTimeout(()=>{if(!stop)stop='WATCHDOG_140S';browser?.close().catch(()=>{})},140000);
run().catch(e=>{stop||='ERROR';warn('fatal',e)}).finally(async()=>{
 clearInterval(timer);clearTimeout(watchdog);
 try{await Promise.race([Promise.allSettled([...pending]),sleep(1000)])}catch{}
 try{await Promise.race([browser?.close(),sleep(2500)])}catch{}
 const observedPaths=[...new Set([...responses.values()].map(x=>canon(x.url)))];
 result.stopReason=stop;result.minFreeRamMiB=minFree;result.endUTC=new Date().toISOString();
 result.observedFirstPartyPaths=observedPaths.length;
 result.novelFirstPartyPaths=observedPaths.filter(x=>!urls.has(x));
 result.networkBodyShaAndSize=[...bodyHashes.values()];
 result.totalHashedResponses=bodyHashes.size;
 result.originalBodyExactCount=[...bodyHashes.values()].filter(x=>x.exactPreviousOriginalBodyShaSize).length;
 result.networkInitiatorEdgesObserved=edges.size;
 result.newInitiatorEdges=[...edges].filter(x=>!edgesOld.has(x));
 result.sanitizationNotes='ONLY Ripper hello/context metadata, WebGL draw primitive mode/count/instanceCount signature totals, first-party URLs/hashes, private screenshot hashes; NO target content/model export';
 fs.writeFileSync(path.join(d,'X29-90S-LIVE-READONLY-WEBGLRIPPER-METADATA-X01-X28-TIMELINE.json'),JSON.stringify(result,null,2)+'\n');
 console.log('X29_LIVE_FINAL '+JSON.stringify({stop,seconds:result.actualObservedSeconds,snapshots:result.snapshots.length,ramMin:minFree,firstPartyPaths:result.observedFirstPartyPaths,
  bodyExact:result.originalBodyExactCount,bodyTotal:result.totalHashedResponses,initiatorEdges:result.networkInitiatorEdgesObserved,newEdges:result.newInitiatorEdges.length,issues:result.issues}));
});
