'use strict';
// DJMRN X23: 90-sec ANONYMOUS public homepage Ispettore 0.1.1 GitHub-release standalone extension.
// Own runner, no cookies/auth, no third-party scripts executed in Node, GPU payloads PRIVATE.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X23-CURRENT','X23-RERUN-1GB-2026-11-20'),privateDir=path.join(root,'01-private-captures','X23','rerun-1gb-2026-11-20');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(privateDir,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit'),
 ext=path.join(tk,'04-Specialists','Sources','Ispettore','ispettore-0.1.1','dist'),
 chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe'),
 puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const canonical=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json'),'utf8'));
const previous=new Map(canonical.resources.map(x=>[x.url,x]));
const x16=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X16-CURRENT','X16-script-init-network-graph.json'),'utf8'));
const priorEdges=new Set(x16.edges.map(x=>x.from+'|'+x.to));
const sleep=t=>new Promise(r=>setTimeout(r,t)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const first=u=>{try{const x=new URL(u);return x.hostname==='www.gladeye.com'&&x.protocol==='https:'}catch{return false}};
const canon=u=>{try{const x=new URL(u);return x.origin+x.pathname}catch{return null}};
let browser,page,cdp,memTimer,watchdog,observedStart,stopReason=null,minFree=Math.round(os.freemem()/1048576);
const started=Date.now(),issues=[],frames=[],snapshots=[],screenshots=[],responses=new Map(),edges=new Map(),bodyHashes=new Map(),bodyJobs=new Set();
const run={stage:'X23-RERUN-2026-11-20',tool:'Ispettore release v0.1.1 (MV3 dist manifest field 0.1.0)',site:'https://www.gladeye.com/',reference:'Spector X22 full-90s',
 desiredSeconds:90, safeTransferCeilingBytes:1000000000, emergencyFreeRamMiB:100, sourceOriginalX23Preserved:true,source:'https://github.com/velvetfrustum/ispettore',installedAlready:true,isolation:'one fresh isolated Chrome profile',manifestVersion:null};
function issue(phase,e){issues.push({phase,info:String(e?.message||e).slice(0,180)})}
function snap(p){
 const commands=Array.isArray(p?.commands)?p.commands:[],ops={};
 const draws=[],timeSamples=[],errors=[];let cpuSum=0,gpuSum=0,gpuCount=0;
 for(const cmd of commands){
  const name=String(cmd.op||'unknown');ops[name]=(ops[name]||0)+1;
  if(name.startsWith('draw'))draws.push({op:name,args:Array.isArray(cmd.args)?cmd.args.slice(0,5):null,
     semanticType:cmd.semantic?.type||null,hasPreview:!!cmd.preview,cpuMs:typeof cmd.durationMs==='number'?cmd.durationMs:null,
     gpuMs:typeof cmd.gpuTimingMs==='number'?cmd.gpuTimingMs:null});
  if(typeof cmd.durationMs==='number')cpuSum+=cmd.durationMs;
  if(typeof cmd.gpuTimingMs==='number'){gpuSum+=cmd.gpuTimingMs;gpuCount++}
  if(cmd.failed)errors.push(name);
 }
 const programs=p.programs&&typeof p.programs==='object'?Object.keys(p.programs):[];
 const f=p.frames||[];
 return {commandCount:commands.length,ops,drawCount:draws.length,draws,programKeys:programs,
  frameCount:f.length,frameList:f.map(x=>({id:x.frameId,kind:x.kind,commands:x.commandCount,blobCount:x.blobCount,bytes:x.byteSize})),
  eventCount:Array.isArray(p.events)?p.events.length:null,
  imageOrBinaryBlobCount:Array.isArray(p.blobs)?p.blobs.length:null,
  contextVersion:p.context?.version??null,contextKeys:Object.keys(p.context||{}).slice(0,25),
  inspectionStatus:p.inspectionStatus,failedCommands:errors,cpuSumCommandMs:+cpuSum.toFixed(3),
  gpuTimingAvailable:gpuCount>0,gpuTimedCommands:gpuCount,reportedGpuTimingSumMs:gpuCount?+gpuSum.toFixed(3):null,
  warning:'Instrumented per-command CPU issue time is not native frame/FPS timing; GPU timer availability may vary'};
}
function body(id){
 const r=responses.get(id);if(!r||!first(r.url)||r.status!==200||bodyJobs.size>5)return;
 const u=canon(r.url),extension=path.extname(new URL(r.url).pathname).toLowerCase();
 if(!['.js','.json','.glb','.png','.webp','.css','.svg','.jpg','.jpeg'].includes(extension))return;
 const task=cdp.send('Network.getResponseBody',{requestId:id}).then(b=>{
  const bytes=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body||'','utf8');
  if(!bytes.length||bytes.length>1000000000)return;
  const digest=sha(bytes),key=u+'|'+digest;
  if(bodyHashes.has(key))return;
  const p=previous.get(u),known=(p?.originalBodyVariants||[]).some(v=>v.sha256===digest&&v.bytes===bytes.length);
  bodyHashes.set(key,{url:u,sha256:digest,bytes:bytes.length,class:!p?'NEW_SITE_PATH':known?'EXACT_PREVIOUS_ORIGINAL_BODY':'KNOWN_PATH_OTHER_OR_UNVERIFIED_BODY'});
 }).catch(e=>issue('network_body',e)).finally(()=>bodyJobs.delete(task));bodyJobs.add(task);
}
async function capture(sec,label,action){
 const delay=sec*1000-(Date.now()-observedStart);if(delay>0)await sleep(delay);if(stopReason)return;
 try{
  await action();await sleep(350);
  const ctx=await page.evaluate(()=>({domPath:location.pathname,three:window.__THREE__||null,next:window.next?.version||null,
   canvas:document.querySelectorAll('canvas').length,scrollY:Math.round(window.scrollY),
   animations:document.getAnimations().length,hasIspettore:!!window.__ISPETTORE__,
   contextSummaries:window.__ISPETTORE__?.getWebGlJournalSummary?.().map(x=>({id:x.contextId,webgl:x.contextInfo?.version,
    width:x.contextInfo?.drawingBufferWidth,height:x.contextInfo?.drawingBufferHeight,commandCount:x.commandCount,frameCount:x.frames?.length}))||[]}));
  const armed=await page.evaluate(()=>window.__ISPETTORE__?.armWebGlCapture?.());
  if(!armed?.applied)throw Error('ARM_NO_CONTEXT_MATCH');
  let done=false;
  for(let k=0;k<19;k++){await sleep(250);const s=await page.evaluate(()=>window.__ISPETTORE__.getWebGlJournalSummary()?.[0]);
   if(s?.frames?.some(x=>x.commandCount>0)){done=true;break}}
  if(!done)throw Error('NO_CAPTURED_FRAME');
  const pkg=await page.evaluate(()=>window.__ISPETTORE__.getWebGlJournalPackage());
  if(!pkg?.commands?.length)throw Error('EMPTY_FRAME_PACKAGE');
  const rawText=JSON.stringify(pkg);
  if(Buffer.byteLength(rawText)>1000000000)throw Error('FRAME_EXCEEDS_USER_1GB_TRANSFER_CEILING');
  const rawFile='X23-ISPETTORE-RAW-'+String(frames.length+1).padStart(2,'0')+'-'+label+'.json';
  const rawPath=path.join(privateDir,rawFile);
  fs.writeFileSync(rawPath,rawText);
  const meta=snap(pkg);
  const row={label,requestedSecond:sec,second:+((Date.now()-observedStart)/1000).toFixed(2),
   state:ctx,arm:armed,rawFile,rawSha256:sha(Buffer.from(rawText)),rawBytes:Buffer.byteLength(rawText),gpu:meta};
  frames.push(row);
  // New X23-R2: the complete official Ispettore scene/texture/state snapshot. Full
  // previews from the original site are kept PRIVATE on the laptop, never GitHub.
  // No arbitrary 20 MiB limit; only the explicit user ceiling of one decimal GB.
  if(['baseline','wheel_450','pointer_reverse'].includes(label)){
   try{
    const sceneText=await page.evaluate(()=>{
      const snap=window.__ISPETTORE__.getSnapshot({includeFullPreview:true,skipGpuSnapshot:false});
      return JSON.stringify(snap);
    });
    const sceneBytes=Buffer.byteLength(sceneText,'utf8');
    if(sceneBytes>1000000000)throw Error('FULL_SCENE_SNAPSHOT_OVER_1GB_CEILING');
    const file='X23-R2-FULL-SCENE-AND-TEXTURE-'+label+'.json';
    fs.writeFileSync(path.join(privateDir,file),sceneText);
    const parsed=JSON.parse(sceneText);
    const summary={label,sec:row.second,file,bytes:sceneBytes,sha256:sha(Buffer.from(sceneText,'utf8')),
      gpuApi:parsed.gpuApi||null,three:parsed.three||null,
      sceneObjectCount:parsed.sceneObjectCount||0,camera:parsed.camera||null,
      rendererCount:Array.isArray(parsed.renderers)?parsed.renderers.length:0,
      modelCount:Array.isArray(parsed.models)?parsed.models.length:0,
      textureCount:Array.isArray(parsed.textures)?parsed.textures.length:0,
      programCount:Array.isArray(parsed.programs)?parsed.programs.length:0,
      contextCount:Array.isArray(parsed.webGlCaptureContexts)?parsed.webGlCaptureContexts.length:0,
      sceneTreePresent:!!parsed.scene};
    snapshots.push(summary); row.fullSceneSnapshot={file,sha256:summary.sha256,bytes:sceneBytes};
    console.log('X23_R2_FULL_SCENE '+JSON.stringify(summary));
    const png=await page.screenshot({type:'png',captureBeyondViewport:false});
    const pngFile='X23-R2-SCREEN-'+label+'.png';
    fs.writeFileSync(path.join(privateDir,pngFile),png);
    screenshots.push({label,file:pngFile,bytes:png.length,sha256:sha(png)});
   }catch(e){issue('full_scene_'+label,e);console.log('X23_R2_SCENE_ERROR '+label+' '+String(e.message).slice(0,160))}
  }
  console.log('X23_R2_FRAME '+JSON.stringify({label,time:row.second,commands:meta.commandCount,draws:meta.drawCount,
   programCount:meta.programKeys.length,events:meta.eventCount,blobs:meta.imageOrBinaryBlobCount,
   gpuTimer:meta.gpuTimingAvailable,ramMiB:Math.round(os.freemem()/1048576),errors:meta.failedCommands.length}));
 }catch(e){issue('capture_'+label,e);console.log('X23_R2_CAPTURE_ERROR '+label+' '+String(e.message).slice(0,130))}
}
async function main(){
 if(os.freemem()<=100*1048576)throw Error('USER_RAM_EMERGENCY_BEFORE_START');
 const m=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json'),'utf8'));run.manifestVersion=m.version;
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],timeout:18000,
 userDataDir:path.join(dir,'X23-R2-1GB-Isolated-Chrome-Profile'),
 args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,'--no-first-run',
  '--no-default-browser-check','--disable-sync','--disable-component-update','--disable-background-networking','--window-size=1280,720']});
 run.serviceWorker=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 cdp=await page.createCDPSession();await cdp.send('Network.enable');
 cdp.on('Network.requestWillBeSent',ev=>{
  if(!first(ev.request?.url))return;
  const to=canon(ev.request.url),fromUrl=ev.initiator?.stack?.callFrames?.[0]?.url||ev.initiator?.url||null;
  if(first(fromUrl||'')){const from=canon(fromUrl),k=from+'|'+to;edges.set(k,(edges.get(k)||0)+1)}
 });
 cdp.on('Network.responseReceived',ev=>{if(first(ev.response.url))responses.set(ev.requestId,{
  url:ev.response.url,status:ev.response.status,mime:ev.response.mimeType})});
 cdp.on('Network.loadingFinished',ev=>body(ev.requestId));
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:26000});
 let ready=false;
 for(let i=0;i<35;i++){
  await sleep(300);ready=await page.evaluate(()=>{let c=document.querySelector('canvas');return !!(window.__ISPETTORE__&&c&&c.getContext('webgl2')&&window.__THREE__==='154')});
  if(ready)break}
 if(!ready)throw Error('GLADEYE_WEBGL_OR_ISPETTORE_NOT_READY');
 // Avoid GPU capture over-allocation. No forced tab mutation or new provider permissions.
 run.pre=await page.evaluate(()=>({api:Object.keys(window.__ISPETTORE__),webglContexts:window.__ISPETTORE__.getWebGlJournalSummary().map(x=>x.contextId)}));
 observedStart=Date.now();run.observedStartUtc=new Date().toISOString();
 const schedule=[
 [3,'baseline',async()=>{}],
 [9,'pointer_high_left',async()=>page.mouse.move(150,120)],
 [15,'pointer_mid_right',async()=>page.mouse.move(1090,360)],
 [21,'scroll_down_250',async()=>page.mouse.wheel({deltaY:250})],
 [27,'pointer_low_left',async()=>page.mouse.move(270,610)],
 [33,'scroll_up_300',async()=>page.mouse.wheel({deltaY:-300})],
 [39,'pointer_high_right',async()=>page.mouse.move(1130,110)],
 [45,'wheel_450',async()=>page.mouse.wheel({deltaY:450})],
 [51,'pointer_bottom',async()=>page.mouse.move(640,650)],
 [57,'wheel_reverse',async()=>page.mouse.wheel({deltaY:-500})],
 [63,'pointer_left',async()=>page.mouse.move(100,350)],
 [69,'wheel_800',async()=>page.mouse.wheel({deltaY:800})],
 [75,'pointer_right',async()=>page.mouse.move(1150,500)],
 [81,'wheel_up',async()=>page.mouse.wheel({deltaY:-800})],
 [87,'pointer_reverse',async()=>page.mouse.move(215,530)]];
 for(const [t,label,act] of schedule){await capture(t,label,act);if(stopReason)break}
 const left=90000-(Date.now()-observedStart);if(left>0&&!stopReason)await sleep(left);
 run.observedSeconds=+((Date.now()-observedStart)/1000).toFixed(2);
 if(!stopReason)stopReason='COMPLETED_90S';
}
memTimer=setInterval(()=>{const n=Math.round(os.freemem()/1048576);minFree=Math.min(n,minFree);
 if(n<=100&&!stopReason){stopReason='RAM_EMERGENCY_100_MIB';browser?.close().catch(()=>{})}},350);
watchdog=setTimeout(()=>{if(!stopReason)stopReason='HARD_WATCHDOG_140S';browser?.close().catch(()=>{})},140000);
main().catch(e=>{stopReason||='FATAL';issue('fatal',e)}).finally(async()=>{
 clearTimeout(watchdog);clearInterval(memTimer);
 try{await Promise.race([Promise.allSettled([...bodyJobs]),sleep(1000)])}catch{}
 try{await Promise.race([browser?.close(),sleep(2500)])}catch{}
 run.stopReason=stopReason;run.minFreeRamMiB=minFree;run.issues=issues;
 run.frames=frames.length;run.wallSeconds=+((Date.now()-started)/1000).toFixed(2);
 run.firstPartyResponses=responses.size;run.firstPartyPaths=[...new Set([...responses.values()].map(x=>canon(x.url)))].length;
 run.newFirstPartyUrls=[...new Set([...responses.values()].map(x=>canon(x.url)))].filter(x=>!previous.has(x));
 run.firstPartyBodyHashed=bodyHashes.size;run.initiatorPairs=edges.size;
 run.newInitiatorPairs=[...edges.keys()].filter(x=>!priorEdges.has(x));
 run.fullSceneSnapshots=snapshots.length;run.screenshots=screenshots.length;
 const index={run,frames,snapshots,screenshots,bodyHashes:[...bodyHashes.values()],initiators:[...edges].map(([k,count])=>({from:k.split('|')[0],to:k.split('|')[1],count,seenBeforeX16:priorEdges.has(k)}))};
 fs.writeFileSync(path.join(dir,'X23-R2-90S-PRIVATE-FRAME-INDEX.json'),JSON.stringify(index,null,2));
 const sanitized={run,snapshots,screenshots,frames:frames.map(f=>{const {rawFile,...rest}=f;return rest}),bodyHashes:[...bodyHashes.values()]};
 fs.writeFileSync(path.join(dir,'X23-R2-90S-SANITIZED-ISPETTORE-GPU-TIMELINE.json'),JSON.stringify(sanitized,null,2));
 console.log('X23_R2_FINAL '+JSON.stringify({stopReason,seconds:run.observedSeconds,frames:frames.length,fullSceneSnapshots:snapshots.length,screenshots:screenshots.length,
   perFrame:frames.map(f=>({label:f.label,commands:f.gpu.commandCount,draws:f.gpu.drawCount})),
   paths:run.firstPartyPaths,newUrls:run.newFirstPartyUrls,networkBodyHashes:run.firstPartyBodyHashed,edges:run.initiatorPairs,
   novelEdges:run.newInitiatorPairs.length,ramMin:minFree,issues:issues.length,wall:run.wallSeconds}));
});
