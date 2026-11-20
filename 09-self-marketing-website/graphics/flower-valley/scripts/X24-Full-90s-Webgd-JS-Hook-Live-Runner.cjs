'use strict';
// DJMRN X24: owner-directed 90s public homepage study with native *official webgd hook*.
// Rust UI/replay unavailable; no claim of full webgd feature activation. Raw WGDW GPU capture PRIVATE.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X24-CURRENT','X24-LIVE-90S'),secret=path.join(root,'01-private-captures','X24','live-90s');
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
const start=Date.now(),run={stage:'X24',goal:'Bounded full 90s Chrome public-home GPU wire capture via official unbuilt webgd JS hook',
 version:'Official main snapshot, MV3 manifest 0.1.0',nativeRustUI:false,javaScriptHook:true,chromeVersion:'Chrome for Testing 157',
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
  if(x.length<1||x.length>2100000)return;
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
  if(len>60*1024*1024)throw Error('CAPTURE_LARGER_THAN_60MIB_ABANDON_RAW_TRANSFERS');
  if(totalPrivate+len>180*1024*1024)throw Error('TOTAL_CAPTURE_DISK_BUDGET_LIMIT_180MIB');
  // Transfer small sections, not one large expensive JSON payload.
  const parts=[],chunkSize=650000;
  for(let off=0;off<len;off+=chunkSize){
   const b64=await page.evaluate(([start,n])=>{
    const b=window.__x24wire.bytes.subarray(start,start+n);
    let ss=[];for(let j=0;j<b.length;j+=16000)ss.push(String.fromCharCode(...b.subarray(j,j+16000)));
    return btoa(ss.join(''))
   },[off,Math.min(chunkSize,len-off)]);
   parts.push(Buffer.from(b64,'base64'));
  }
  const raw=Buffer.concat(parts);
  if(raw.length!==len||raw.toString('ascii',0,4)!=='WGDW'||raw.readUInt32LE(4)!==1)throw Error('WIRE_WRAPPER_INTEGRITY_FAIL');
  const file='X24-WEBGD-RAW-'+String(frames.length+1).padStart(2,'0')+'-'+label+'.webgd',f=path.join(secret,file);
  fs.writeFileSync(f,raw);totalPrivate+=raw.length;
  const row={label,requestedSecond:second,actualSecond:+((Date.now()-observedStart)/1000).toFixed(2),
   dom,rawFile:file,rawSha256:sha(raw),rawBytes:raw.length,wireVersion:1,wireMagic:'WGDW'};
  frames.push(row);
  await page.evaluate(()=>{window.__x24wire.bytes=null});
  console.log('X24_LIVE_FRAME '+JSON.stringify({label,t:row.actualSecond,bytes:row.rawBytes,sha:row.rawSha256.slice(0,14),
   ramMiB:Math.round(os.freemem()/1048576)}));
 }catch(e){issue('frame_'+label,e);console.log('X24_LIVE_FRAME_FAILED '+label+' '+String(e.message).slice(0,110))}
}
async function main(){
 if(os.freemem()<850*1048576)throw Error('RAM_BELOW_850MIB');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],timeout:20000,
 userDataDir:path.join(dir,'X24-Anonymous-Isolated-Chrome-Profile'),
 args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,'--no-first-run',
 '--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 run.extensionWorkerSeen=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});await page.evaluateOnNewDocument(injected);
 cdp=await page.createCDPSession();await cdp.send('Network.enable',{maxTotalBufferSize:14000000,maxResourceBufferSize:2100000});
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
 if(os.freemem()<100*1048576&&!stopReason){stopReason='EMERGENCY_100MIB_RAM';browser?.close().catch(()=>{})}},450);
watchdog=setTimeout(()=>{if(!stopReason)stopReason='WATCHDOG_150_SECONDS';browser?.close().catch(()=>{})},150000);
main().catch(e=>{stopReason||='FATAL';issue('fatal',e)}).finally(async()=>{
 clearInterval(ram);clearTimeout(watchdog);
 try{await Promise.race([Promise.allSettled([...bodyJobs]),sleep(1400)])}catch{}
 try{await Promise.race([browser?.close(),sleep(3500)])}catch{}
 run.stopReason=stopReason;run.minFreeRamMiB=minRAM;run.endUtc=new Date().toISOString();
 run.wallSeconds=+((Date.now()-start)/1000).toFixed(2);run.frames=frames.length;run.issues=errors;
 run.totalPrivateWireBytes=totalPrivate;run.firstPartyResponses=response.size;
 run.firstPartyPaths=[...new Set([...response.values()].map(x=>pathOnly(x.url)))].length;
 run.newPaths=[...new Set([...response.values()].map(x=>pathOnly(x.url)))].filter(x=>!canon.has(x));
 run.responseBodyHashes=bodyHashes.size;run.initiatorEdgePairs=edges.size;run.newInitiators=[...edges.keys()].filter(x=>!edgeOld.has(x));
 const internal={run,frames,bodyHashes:[...bodyHashes.values()],initiators:[...edges].map(([k,count])=>({from:k.split('|')[0],to:k.split('|')[1],count}))};
 fs.writeFileSync(path.join(dir,'X24-LIVE-90S-LOCAL-PRIVATE-INDEX.json'),JSON.stringify(internal,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'X24-LIVE-90S-SANITIZED-CAPTURE-TIMELINE.json'),
  JSON.stringify({run,frames:frames.map(({rawFile,...x})=>x),bodyHashes:[...bodyHashes.values()]},null,2)+'\n');
 console.log('X24_LIVE_FINAL '+JSON.stringify({stop:stopReason,seconds:run.elapsedObservedSeconds,frames:frames.length,rawBytes:totalPrivate,
   paths:run.firstPartyPaths,newPaths:run.newPaths,networkHashes:run.responseBodyHashes,edgePairs:run.initiatorEdgePairs,
   newEdges:run.newInitiators.length,minRamMiB:minRAM,issues:errors.length,wall:run.wallSeconds}).slice(0,2800));
});
