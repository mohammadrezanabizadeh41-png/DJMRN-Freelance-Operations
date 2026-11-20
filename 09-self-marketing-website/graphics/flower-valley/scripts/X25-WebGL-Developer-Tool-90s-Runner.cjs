'use strict';
// DJMRN X25. Owner-authored, read-only public-site GPU observer. Raw vendor pixels and shaders stay LOCAL.
// Run: node --expose-gc X25-WebGL-Developer-Tool-90s-Runner.cjs --fixture | --live
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X25-CURRENT');
const priv=path.join(root,'01-private-captures','X25','webgl-developer-tool-2026-11-20');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(priv,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const vendor=path.join(tk,'04-Specialists','Sources','webgl-developer-tool','source-cc9317e6');
const embed=path.join(vendor,'dist','embed','gli.js'),extension=path.join(vendor,'dist','extension');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const mode=process.argv.includes('--fixture')?'fixture':'live';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const start=Date.now(),errors=[],captures=[],network=new Map(),edges=new Map(),bodyHashes=new Map(),bodyJobs=new Set();
let browser,page,cdp,observedStart,minFreeMiB=Math.round(os.freemem()/1048576),emergency=false,monitor,originals;
const config={stage:'X25',mode,tool:'srinivas-86/webgl-developer-tool',officialCommit:'cc9317e6e6805beb16968f2cbd19dcbfe0c064e4',
 version:'0.1.0',license:'MIT (origin BSD-3-Clause)',ownerRamEmergencyStopMiB:100,chrome:'Chrome for Testing 157',startUTC:new Date().toISOString(),
 targetObservationSeconds:mode==='live'?135:4,sevenDiscreteRequested:mode==='live',rawPreviousX24GPUTapesPreserved:true,privateCaptureDirectory:priv};
function fail(phase,e){errors.push({phase,message:String(e?.message||e).slice(0,240)});console.log('X25_ERROR '+phase+' '+String(e?.message||e).slice(0,120))}
function guard(){let free=Math.round(os.freemem()/1048576);minFreeMiB=Math.min(minFreeMiB,free);if(free<=100&&!emergency){emergency=true;console.log('X25_USER_RAM_HARD_STOP '+free);if(browser)browser.close().catch(()=>{});}return free}
function ownFirst(u){try{const x=new URL(u);return x.protocol==='https:'&&x.hostname==='www.gladeye.com'}catch{return false}}
function keyUrl(u){try{const x=new URL(u);return x.origin+x.pathname}catch{return u}}
async function hashResp(id){const a=network.get(id);if(!a||a.status!==200||!ownFirst(a.url)||bodyJobs.size>4||bodyHashes.size>80||emergency)return;
  const pathname=new URL(a.url).pathname.toLowerCase(),ext=path.extname(pathname);
  if(!['.js','.json','.glb','.png','.webp','.css','.svg','.jpg','.jpeg'].includes(ext))return;
  if(a.length && a.length>16*1048576)return;
  const job=cdp.send('Network.getResponseBody',{requestId:id}).then(x=>{const b=x.base64Encoded?Buffer.from(x.body,'base64'):Buffer.from(x.body||'','utf8');
    if(b.length>16*1048576)return;const url=keyUrl(a.url),digest=sha(b);bodyHashes.set(url+'|'+digest,{url,bytes:b.length,sha256:digest})})
    .catch(()=>{}).finally(()=>bodyJobs.delete(job));bodyJobs.add(job);
}
async function snapshot(){
 return page.evaluate(()=>{
  const api=window.gli,ui=api?.getUIs()?.[0],f=ui?.frames?.[ui.frames.length-1];
  if(!f)return {present:false,uis:api?.getUIs()?.length||0,contexts:api?.getContexts()?.length||0};
  const hist={},cpuBy={};let draws=0,errs=0,redun=0,totalCpu=0;
  const calls=f.calls.map(c=>{hist[c.name]=(hist[c.name]||0)+1;const d=Number(c.duration)||0;
   cpuBy[c.name]=(cpuBy[c.name]||0)+d;totalCpu+=d;draws+=/^draw/.test(c.name)?1:0;errs+=c.error?1:0;redun+=c.isRedundant?1:0;
   return {n:c.name,ordinal:c.ordinal,durationMs:+d.toFixed(4),error:c.error||0,redundant:!!c.isRedundant,
    scalarArgs:Array.from(c.args||[]).map(x=>typeof x==='number'?x:null).slice(0,8)}});
  const rv=(f.resourceVersions||[]),resourceTypes={};for(const v of rv){const t=v?.resource?.type||'unknown';resourceTypes[t]=(resourceTypes[t]||0)+1}
  const fbo=rv.filter(v=>/framebuffer/i.test(v?.resource?.type||'')).map(v=>({
   id:v.resource.id,name:String(v.resource.getName?.()||''),parameterKeys:Object.keys(v.value?.parameters||{}).slice(0,64),
   attachmentCalls:(v.value?.calls||[]).filter(c=>/framebufferTexture|framebufferRenderbuffer|drawBuffers|readBuffer/i.test(c.name)).map(c=>({name:c.name,ordinal:c.ordinal})).slice(-24)}));
  const uniforms=(f.uniformValues||[]).map((p,i)=>({programId:p.program?.id??i,
    entries:Object.entries(p.values||{}).map(([name,x])=>({name,type:x.type,size:x.size,
      numbers:typeof x.value==='number'?[x.value]:(ArrayBuffer.isView(x.value)||Array.isArray(x.value))?Array.from(x.value).slice(0,16):[],
      totalElements:typeof x.value==='number'?1:(x.value?.length||0)}))}));
  const stateDiff=[];const s0=f.initialState?.parameters||{},s1=f.endState?.parameters||{};
  for(const k of new Set([...Object.keys(s0),...Object.keys(s1)])){const a=s0[k],b=s1[k];
    if((typeof a==='string'||typeof a==='number'||typeof a==='boolean')&&(typeof b===typeof a)&&a!==b)stateDiff.push(k)}
  return {present:true,frames:ui.frames.length,frameNumber:f.frameNumber,canvasInfo:f.canvasInfo,
    frameCalls:f.calls.length,draws,glErrors:errs,redundantCalls:redun,totalCpuCallTimeMs:+totalCpu.toFixed(4),
    functionCounts:hist,topCpuFunctions:Object.entries(cpuBy).sort((a,b)=>b[1]-a[1]).slice(0,18).map(([name,ms])=>({name,ms:+ms.toFixed(3)})),
    resourceVersions:rv.length,resourceTypeCounts:resourceTypes,framebuffers:fbo,
    uniformProgramCount:uniforms.length,uniformPrograms:uniforms,initialStateKeys:Object.keys(s0).length,
    endStateKeys:Object.keys(s1).length,changedSimpleStateKeys:stateDiff,calls};
 });
}
async function releaseFrame(){
 try{await page.evaluate(()=>{const u=window.gli?.getUIs?.()?.[0];if(!u)return;
  u.frames.length=0;if(Array.isArray(u.window?.frames))u.window.frames.length=0;u.window.currentFrame=null})}catch(e){fail('release-frame',e)}
 try{await cdp.send('HeapProfiler.collectGarbage')}catch{}
 if(typeof global.gc==='function')global.gc();
}
async function capture(seconds,label,fn){
 const left=seconds*1000-(Date.now()-observedStart);if(left>0)await sleep(left);if(emergency)return;
 const memBefore=guard();try{await fn();await sleep(300);
  const old=await page.evaluate(()=>window.gli?.getUIs?.()?.[0]?.frames?.length||0);
  await page.evaluate(()=>{const u=window.gli?.getUIs?.()?.[0];if(!u)throw Error('NO_HOST_UI');u.requestCapture()});
  let got=false;for(let i=0;i<40;i++){if(emergency)break;await sleep(200);
   got=await page.evaluate(old=>((window.gli?.getUIs?.()?.[0]?.frames?.length||0)>old),old);if(got)break}
  if(!got)throw Error('FRAME_CAPTURE_TIMEOUT_8S');
  let meta=await snapshot();if(!meta.present)throw Error('EMPTY_FRAME');
  const elapsed=+(Date.now()-observedStart)/1000;const row={label,requestedSecond:seconds,actualSecond:+elapsed.toFixed(2),freeMiBBefore:memBefore,
   freeMiBAfter:guard(),...meta};
  const raw=JSON.stringify(row,null,2),file=path.join(dir,'X25-'+mode+'-'+label+'-observer-metadata.json');
  fs.writeFileSync(file,raw);row.metadataSHA256=sha(Buffer.from(raw));row.metadataFile=path.basename(file);
  captures.push({label,requestedSecond:seconds,actualSecond:row.actualSecond,frameNumber:meta.frameNumber,frameCalls:meta.frameCalls,draws:meta.draws,
    errors:meta.glErrors,uniformPrograms:meta.uniformProgramCount,resourceTypeCounts:meta.resourceTypeCounts,framebuffers:meta.framebuffers.length,
    cpuCallsMs:meta.totalCpuCallTimeMs,metadataSHA256:row.metadataSHA256,metadataFile:row.metadataFile,freeMiB:row.freeMiBAfter});
  if(captures.length===1||label==='pointer_center'){try{const f=path.join(priv,'X25-'+mode+'-'+label+'-PRIVATE.png');
    await page.screenshot({path:f,fullPage:false});}catch(e){fail('screenshot',e)}}
  console.log('X25_CAPTURE '+JSON.stringify(captures[captures.length-1]));
  await releaseFrame();return true;
 }catch(e){fail('capture-'+label,e);return false}
}
async function main(){
 if(guard()<=100)throw Error('USER_RAM_PRECHECK_HARD_STOP');
 if(!fs.existsSync(embed)||!fs.existsSync(chrome))throw Error('DEPENDENCY_MISSING');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],
  userDataDir:path.join(dir,'X25-Isolated-Profile-'+mode),
  args:['--headless=new','--disable-extensions-except='+extension,'--load-extension='+extension,
    '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update',
    '--window-size=1280,720'],timeout:22000});
 config.chromeExtensionWorkerSeen=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 await page.evaluateOnNewDocument(fs.readFileSync(embed,'utf8'));
 cdp=await page.createCDPSession();await cdp.send('Network.enable');monitor=setInterval(guard,500);
 cdp.on('Network.requestWillBeSent',ev=>{if(!ownFirst(ev.request.url))return;const t=keyUrl(ev.request.url);
  const from=ev.initiator?.stack?.callFrames?.[0]?.url||ev.initiator?.url;
  if(from&&ownFirst(from)){const k=keyUrl(from)+'|'+t;edges.set(k,(edges.get(k)||0)+1)}});
 cdp.on('Network.responseReceived',ev=>{if(ownFirst(ev.response.url))network.set(ev.requestId,{url:ev.response.url,status:ev.response.status,length:ev.response.headers?.['content-length']||null})});
 cdp.on('Network.loadingFinished',ev=>{hashResp(ev.requestId)});
 page.on('pageerror',e=>fail('browser-page',e));page.on('requestfailed',request=>{if(ownFirst(request.url())&&errors.length<30)fail('request-failed',request.failure()?.errorText||'unknown')});
 const url=mode==='fixture'?'file:///'+path.join(dir,'X25-OWN-WebGL2-MultiPass-Fixture.html').replace(/\\/g,'/'):
    'https://www.gladeye.com/';
 config.url=mode==='fixture'?'local-OWN-FIXTURE':'https://www.gladeye.com/';
 const resp=await page.goto(url,{waitUntil:'domcontentloaded',timeout:28000});
 config.documentStatus=resp?.status?.()??null;
 let ready=false;for(let n=0;n<40;n++){await sleep(300);ready=await page.evaluate(()=>!!(window.gli?.getContexts?.()?.length&&window.gli?.getUIs?.()?.length&&document.querySelector('canvas')));
  if(ready)break;if(emergency)break}
 if(!ready)throw Error('EMBED_WEBGL2_CAPTURE_NOT_READY');
 config.webglContextInfo=await page.evaluate(()=>({contexts:window.gli.getContexts().length,uis:window.gli.getUIs().length,
  versions:window.gli.getContexts().map(c=>c.version),canvasCount:document.querySelectorAll('canvas').length,
  fixture:window.__x25Fixture||null}));
 observedStart=Date.now();config.observedStartUTC=new Date().toISOString();
 const tasks=mode==='fixture'?
    [[1,'own_fixture_baseline',async()=>{}],[3,'own_fixture_second',async()=>{}]]:
    [[40,'baseline',async()=>{}],[55,'pointer_left',async()=>page.mouse.move(120,230)],
    [70,'pointer_right',async()=>page.mouse.move(1130,455)],[85,'wheel_450',async()=>page.mouse.wheel({deltaY:450})],
    [100,'pointer_center',async()=>page.mouse.move(680,320)],[115,'wheel_800',async()=>page.mouse.wheel({deltaY:800})],
    [130,'pointer_reverse',async()=>page.mouse.move(215,530)]];
 for(const [s,label,fn] of tasks){await capture(s,label,fn);if(emergency)break}
 if(!emergency){let left=(mode==='live'?135000:4000)-(Date.now()-observedStart);if(left>0)await sleep(left)}
 await Promise.allSettled([...bodyJobs]);config.realObservedSeconds=+((Date.now()-observedStart)/1000).toFixed(2);
 config.firstPartyPaths=[...new Set([...network.values()].map(a=>keyUrl(a.url)))].sort();
 config.firstPartyHttp200Paths=[...new Set([...network.values()].filter(a=>a.status===200).map(a=>keyUrl(a.url)))].sort();
 config.firstPartyBodySHA=[...bodyHashes.values()].sort((a,b)=>a.url.localeCompare(b.url));
 config.initiatorEdges=[...edges.entries()].map(([edge,count])=>({edge,count}));
 config.emergencyStopped=emergency;config.minimumFreeRAMMiB=minFreeMiB;config.captures=captures;config.errors=errors;
 config.captureExpected=mode==='fixture'?2:7;config.complete= !emergency&&captures.length===config.captureExpected&&config.realObservedSeconds>=config.targetObservationSeconds;
 const resultPath=path.join(dir,'X25-'+mode+'-run-summary.json');
 fs.writeFileSync(resultPath,JSON.stringify(config,null,2));
 console.log('X25_RESULT '+JSON.stringify({mode,complete:config.complete,captured:captures.length,observed:config.realObservedSeconds,
  minRAM:minFreeMiB,network:config.firstPartyPaths.length,bodySha:bodyHashes.size,edges:edges.size,errors:errors.length,summary:resultPath}));
 if(!config.complete)process.exitCode=2;
}
main().catch(e=>{fail('fatal',e);process.exitCode=2}).finally(async()=>{
 if(monitor)clearInterval(monitor);
 if(browser){try{await browser.close()}catch{}}
 if(errors.length){const p=path.join(dir,'X25-'+mode+'-errors.json');fs.writeFileSync(p,JSON.stringify(errors,null,2))}
});