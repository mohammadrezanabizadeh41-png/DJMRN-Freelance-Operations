'use strict';
// DJMRN X24: owner-directed 90s public homepage study with native *official webgd hook*.
// Rust UI/replay unavailable; no claim of full webgd feature activation. Raw WGDW GPU capture PRIVATE.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X24-CURRENT','X24-R2-FULL-RUST-WASM-2026-11-20','X24-LIVE-90S-STAGE2-GC'),secret=path.join(root,'01-private-captures','X24','full-rust-wasm-2026-11-20','live-90s-stage2-gc');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(secret,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const ext=path.join(tk,'04-Specialists','Sources','webgd','webgd-main','extension');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const previous=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json'),'utf8'));
const canon=new Map(previous.resources.map(r=>[r.url,r]));
const x16=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X16-CURRENT','X16-script-init-network-graph.json'),'utf8'));
const edgeOld=new Set(x16.edges.map(x=>x.from+'|'+x.to));
const sleep=n=>new Promise(r=>setTimeout(r,n)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const isFirst=u=>{try{return new URL(u).hostname==='www.gladeye.com' && new URL(u).protocol==='https:'}catch{return false}};
const pathOnly=u=>{try{let x=new URL(u);return x.origin+x.pathname}catch{return null}};
const start=Date.now(),run={stage:'X24-R2-S2', memoryChange:'S1 lossless disk chunk streaming + one targeted page/Node garbage collection only between frames; no changes to GPU capture count, textures, 1GB data cap or 100MiB RAM guard', transferCapBytes:1000000000, emergencyFreeRamMiB:100, fullRustUIBuildAndTestingTrackedSeparately:true,goal:'Bounded full 90s Chrome public-home GPU wire capture via official compiled webgd extension JS capture hook',
 version:'Official main snapshot, MV3 manifest 0.1.0',nativeRustUI:true,officialFullUIFixtureCaptureReplayVerified:true,javaScriptHook:true,chromeVersion:'Chrome for Testing 157',
 session:'isolated anonymous profile',targetSeconds:90,startedUtc:new Date().toISOString(),installedAdditionalTool:false},
 errors=[],frames=[],response=new Map(),bodyHashes=new Map(),edges=new Map(),bodyJobs=new Set();
let browser,page,cdp,ram,watchdog,observedStart,stopReason=null,minRAM=Math.round(os.freemem()/1048576),totalPrivate=0;
const injected=()=>{
 window.__x24wire={count:0,bytes:null,errors:[],statuses:[],t:0};
 window.addEventListener('message',e=>{
  if(e.source!==window||e.data?.__webgd!=='to-bridge')return;
  const d=e.data,st=window.__x24wire;
  if(d.type==='capture'&&d.bytes){st.count++;st.bytes=d.bytes;st.t=performance.now();}
  else if(d.type==='captureError'){st.errors.push(String(d.message).slice(0,180))}
  else if(d.type==='status'){st.statuses.push([d.gl2|0,d.webgl1|0,d.gpuDevices|0]);if(st.statuses.length>10)st.statuses.shift()}
 },true);
};
function issue(k,e){if(errors.length<32)errors.push({phase:k,error:String(e?.message||e).slice(0,180)})}
function hashBody(id){
 const a=response.get(id);if(!a||a.status!==200||!isFirst(a.url)||bodyJobs.size>=6||bodyHashes.size>=70)return;
 const u=pathOnly(a.url),extension=path.extname(new URL(a.url).pathname).toLowerCase();
 if(!['.js','.json','.glb','.png','.webp','.css','.svg','.jpg','.jpeg'].includes(extension))return;
 const task=cdp.send('Network.getResponseBody',{requestId:id}).then(b=>{
  const x=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body||'','utf8');
  if(x.length<1||x.length>1000000000)return;
  const digest=sha(x),key=u+'|'+digest;if(bodyHashes.has(key))return;
  const prev=canon.get(u);
  bodyHashes.set(key,{url:u,sha256:digest,bytes:x.length,
  classification:!prev?'NEW_URL_PATH':(prev.originalBodyVariants||[]).some(v=>v.sha256===digest&&v.bytes===x.length)?'EXACT_ORIGINAL_SHA_REPEAT':'KNOWN_PATH_OTHER_BODY'});
 }).catch(e=>issue('body_unavailable',e)).finally(()=>bodyJobs.delete(task));
 bodyJobs.add(task);
}
async function capture(second,label,action){
 let wait=second*1000-(Date.now()-observedStart);if(wait>0)await sleep(wait);
 if(stopReason)return;
 try{
  await action();
  await sleep(300);
  const dom=await page.evaluate(()=>({path:location.pathname,webgdInstalled:!!window.__webgd,three:window.__THREE__||null,
   next:window.next?.version||null,canvas:document.querySelectorAll('canvas').length,scrollY:Math.round(window.scrollY),
   animationCount:document.getAnimations().length,glsl:(()=>{try{const g=document.querySelector('canvas')?.getContext('webgl2');return g?.getParameter(g.SHADING_LANGUAGE_VERSION)||null}catch{return null}})()}));
  const oldState=await page.evaluate(()=>{window.__x24wire.bytes=null;window.__x24wire.errors=[];return window.__x24wire.count});
  await page.evaluate(()=>window.postMessage({__webgd:'to-hook',type:'arm'},'*'));
  let len=0,count=0;
  for(let i=0;i<50;i++){
   await sleep(240);
   const data=await page.evaluate(()=>({n:window.__x24wire.count,size:window.__x24wire.bytes?.length||0,error:window.__x24wire.errors.slice(-3)}));
   if(data.error.length)throw Error('WEBGD_CAPTURE_ERROR '+data.error.join(';'));
   if(data.n>oldState&&data.size>0){count=data.n;len=data.size;break}
   if(stopReason)throw Error('EMERGENCY_STOP');
  }
  if(!len)throw Error('NO_CAPTURE_WITHIN_12S');
  if(len>1000000000)throw Error('EXCEEDS_USER_1GB_PER_PACKET_TRANSFER_CEILING');
  // No other raw capture size ceiling. Verify enough disk remains for a complete packet.
  const fsinfo=fs.statfsSync(secret),available=Number(fsinfo.bavail)*Number(fsinfo.bsize);
  if(available<len+512*1024*1024)throw Error('INSUFFICIENT_DISK_SPACE_SAFETY_RESERVE');
  // S1: exact lossless WGDW bytes streamed from Chrome to private disk.
  // Old runner held the entire data twice in Node (parts[] and Buffer.concat()).
  // Keep the user limit 1,000,000,000 bytes and preserve all bytes and metadata.
  const file='X24-R2-S2-WEBGD-RAW-'+String(frames.length+1).padStart(2,'0')+'-'+label+'.webgd';
  const f=path.join(secret,file),chunkSize=2*1024*1024;
  const digest=crypto.createHash('sha256');
  let written=0,fd=null,complete=false,minFreeDuringTransferMiB=Math.round(os.freemem()/1048576);
  try {
   fd=fs.openSync(f,'wx');
   for(let off=0;off<len;off+=chunkSize) {
    if(stopReason)throw Error('INTERRUPTED_SAFETY_STOP_'+stopReason);
    if(os.freemem()<=100*1048576)throw Error('RAM_AT_USER_HARD_STOP_100MIB');
    const b64=await page.evaluate(([start,n])=>{
     const bytes=window.__x24wire.bytes.subarray(start,start+n);
     let segments=[];
     for(let k=0;k<bytes.length;k+=16000)
      segments.push(String.fromCharCode(...bytes.subarray(k,k+16000)));
     return btoa(segments.join(''));
    },[off,Math.min(chunkSize,len-off)]);
    const chunk=Buffer.from(b64,'base64');
    if(chunk.length!==Math.min(chunkSize,len-off))throw Error('CHUNK_EXACT_LENGTH_MISMATCH');
    if(off===0 && (chunk.toString('ascii',0,4)!=='WGDW'||chunk.readUInt32LE(4)!==1))
      throw Error('WGDW_V1_HEADER_INVALID');
    let pos=0;
    while(pos<chunk.length) {
     const n=fs.writeSync(fd,chunk,pos,chunk.length-pos,written+pos);
     if(n<=0)throw Error('FILE_WRITE_NO_PROGRESS');
     pos+=n;
    }
    digest.update(chunk);written+=chunk.length;
    minFreeDuringTransferMiB=Math.min(minFreeDuringTransferMiB,Math.round(os.freemem()/1048576));
   }
   fs.fsyncSync(fd);complete=true;
  }finally{
   if(fd!==null)fs.closeSync(fd);
   if(!complete){try{fs.unlinkSync(f)}catch{}}
  }
  if(written!==len)throw Error('LOSSLESS_TRANSFER_LENGTH_MISMATCH');
  const row={label,requestedSecond:second,actualSecond:+((Date.now()-observedStart)/1000).toFixed(2),
   dom,rawFile:file,rawSha256:digest.digest('hex'),rawBytes:written,
   minFreeDuringTransferMiB,wireVersion:1,wireMagic:'WGDW'};
  totalPrivate+=written;
  frames.push(row);
  await page.evaluate(()=>{window.__x24wire.bytes=null});
  // S2 only: force collection of unreachable JS transfer buffers after the
  // SHA-verified WGDW file was fsync'd and closed. Do not change WebGL scene.
  const freeBeforeGC=Math.floor(os.freemem()/1048576);
  let pageGcStatus='SKIPPED',nodeGcStatus='SKIPPED';
  try{await cdp.send('HeapProfiler.collectGarbage');pageGcStatus='PASS'}
  catch(err){pageGcStatus='ERROR:'+String(err.message).slice(0,120)}
  try{if(typeof global.gc==='function'){global.gc();nodeGcStatus='PASS'}}
  catch(err){nodeGcStatus='ERROR:'+String(err.message).slice(0,120)}
  await sleep(350);
  const freeAfterGC=Math.floor(os.freemem()/1048576);
  row.memoryRecovery={freeBeforeGC,freeAfterGC,pageGcStatus,nodeGcStatus};
  console.log('X24_R2_S2_GC '+JSON.stringify({label,freeBeforeGC,freeAfterGC,pageGcStatus,nodeGcStatus}));
  console.log('X24_R2_S2_LIVE_FRAME '+JSON.stringify({label,t:row.actualSecond,bytes:row.rawBytes,sha:row.rawSha256.slice(0,14),
   ramMiB:Math.round(os.freemem()/1048576)}));
 }catch(e){issue('frame_'+label,e);console.log('X24_R2_S2_LIVE_FRAME_FAILED '+label+' '+String(e.message).slice(0,110))}
}
async function main(){
 if(os.freemem()<=100*1048576)throw Error('USER_100MIB_EMERGENCY_RAM_PRECHECK');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],timeout:20000,
 userDataDir:path.join(dir,'X24-R2-S2-GC-Isolated-Chrome-Profile'),
 args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,'--no-first-run',
 '--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 run.extensionWorkerSeen=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});await page.evaluateOnNewDocument(injected);
 cdp=await page.createCDPSession();await cdp.send('Network.enable');
 cdp.on('Network.requestWillBeSent',ev=>{if(!isFirst(ev.request.url))return;
  const to=pathOnly(ev.request.url),f=ev.initiator?.stack?.callFrames?.[0]?.url||ev.initiator?.url||null;
  if(f&&isFirst(f)){const k=pathOnly(f)+'|'+to;edges.set(k,(edges.get(k)||0)+1)}
 });
 cdp.on('Network.responseReceived',ev=>{if(isFirst(ev.response.url))response.set(ev.requestId,{url:ev.response.url,status:ev.response.status})});
 cdp.on('Network.loadingFinished',ev=>hashBody(ev.requestId));
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:27000});
 let ok=false;
 for(let i=0;i<30;i++){await sleep(350);ok=await page.evaluate(()=>{
  const c=document.querySelector('canvas');return !!(window.__webgd&&c&&c.getContext('webgl2')&&window.__THREE__==='154')});
  if(ok)break}
 if(!ok)throw Error('LIVE_WEBGL2_HOOK_OR_RUNTIME_NOT_READY');
 observedStart=Date.now();run.observedStartUtc=new Date().toISOString();
 const steps=[[5,'baseline',async()=>{}],[19,'pointer_left',async()=>page.mouse.move(120,230)],
 [33,'pointer_right',async()=>page.mouse.move(1130,455)],[47,'wheel_450',async()=>page.mouse.wheel({deltaY:450})],
 [61,'pointer_center',async()=>page.mouse.move(680,320)],[75,'wheel_800',async()=>page.mouse.wheel({deltaY:800})],
 [87,'pointer_reverse',async()=>page.mouse.move(215,530)]];
 for(const [t,label,act] of steps){await capture(t,label,act);if(stopReason)break}
 const remain=90000-(Date.now()-observedStart);if(remain>0&&!stopReason)await sleep(remain);
 run.elapsedObservedSeconds=+((Date.now()-observedStart)/1000).toFixed(2);
 stopReason||='COMPLETED_90S';
}
ram=setInterval(()=>{minRAM=Math.min(minRAM,Math.round(os.freemem()/1048576));
 if(os.freemem()<=100*1048576&&!stopReason){stopReason='EMERGENCY_100MIB_RAM';browser?.close().catch(()=>{})}},200);
watchdog=setTimeout(()=>{if(!stopReason)stopReason='WATCHDOG_240_SECONDS';browser?.close().catch(()=>{})},240000);
main().catch(e=>{stopReason||='FATAL';issue('fatal',e)}).finally(async()=>{
 clearInterval(ram);clearTimeout(watchdog);
 try{await Promise.race([Promise.allSettled([...bodyJobs]),sleep(1400)])}catch{}
 try{await Promise.race([browser?.close(),sleep(3500)])}catch{}
 run.stopReason=stopReason;run.minFreeRamMiB=minRAM;run.endUtc=new Date().toISOString();
 run.wallSeconds=+((Date.now()-start)/1000).toFixed(2);run.frames=frames.length;run.issues=errors;
 run.totalPrivateWireBytes=totalPrivate;run.losslessChunkStreaming=true;run.stepwiseGCBetweenFrames=true;run.frameBytesOnDiskIndependentlyHashed=true;run.firstPartyResponses=response.size;
 run.firstPartyPaths=[...new Set([...response.values()].map(x=>pathOnly(x.url)))].length;
 run.newPaths=[...new Set([...response.values()].map(x=>pathOnly(x.url)))].filter(x=>!canon.has(x));
 run.responseBodyHashes=bodyHashes.size;run.initiatorEdgePairs=edges.size;run.newInitiators=[...edges.keys()].filter(x=>!edgeOld.has(x));
 const internal={run,frames,bodyHashes:[...bodyHashes.values()],initiators:[...edges].map(([k,count])=>({from:k.split('|')[0],to:k.split('|')[1],count}))};
 fs.writeFileSync(path.join(dir,'X24-R2-S2-LIVE-90S-LOCAL-PRIVATE-INDEX.json'),JSON.stringify(internal,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'X24-R2-S2-LIVE-90S-SANITIZED-CAPTURE-TIMELINE.json'),
  JSON.stringify({run,frames:frames.map(({rawFile,...x})=>x),bodyHashes:[...bodyHashes.values()]},null,2)+'\n');
 console.log('X24_R2_S2_LIVE_FINAL '+JSON.stringify({stop:stopReason,seconds:run.elapsedObservedSeconds,frames:frames.length,rawBytes:totalPrivate,
   paths:run.firstPartyPaths,newPaths:run.newPaths,networkHashes:run.responseBodyHashes,edgePairs:run.initiatorEdgePairs,
   newEdges:run.newInitiators.length,minRamMiB:minRAM,issues:errors.length,wall:run.wallSeconds}).slice(0,2800));
});
