'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X22-CURRENT','X22-LIVE-90S'),privateDir=path.join(root,'01-private-captures','X22','live-90s');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(privateDir,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const ext=path.join(tk,'01-Analysis','Extensions','Spector.js');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const old=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json'),'utf8'));
const oldMap=new Map(old.resources.map(x=>[x.url,x]));
const x16=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X16-CURRENT','X16-script-init-network-graph.json'),'utf8'));
const priorEdges=new Set(x16.edges.map(x=>x.from+'|'+x.to));
const sleep=t=>new Promise(r=>setTimeout(r,t));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const firstParty=u=>{try{return new URL(u).hostname==='www.gladeye.com'&&new URL(u).protocol==='https:'}catch{return false}};
const canon=u=>{try{const x=new URL(u);return x.origin+x.pathname}catch{return null}};
const start=Date.now(),runId=new Date().toISOString().replace(/[:.]/g,'-');
const stat={stage:'X22',runId,goal:'90s full live homepage GPU frame and first-party network observation',targetObservationSeconds:90,
  previousPathAuthority:oldMap.size,priorNetworkEdges:priorEdges.size,ramStopMiB:100};
const samples=[],responses=new Map(),requests=new Map(),edges=new Map(),bodyVariants=new Map(),issues=[],pending=new Set();
let browser,page,cdp,watchdog,memoryMonitor,observedStart,stopReason=null,minFree=Math.round(os.freemem()/1048576),storedBytes=0;
function warn(key,e){if(issues.length<25)issues.push({phase:key,detail:String(e?.message||e).slice(0,170)})}
function summary(raw){
 const counts={},draws=[],programs=new Set(),fbs=new Set(),shaderHashes=new Set(),uniformNames=new Set();
 const cmds=Array.isArray(raw?.commands)?raw.commands:[];
 for(const c of cmds){
  const name=c.name||'unknown';counts[name]=(counts[name]||0)+1;
  if(!['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced'].includes(name))continue;
  const d=c.DrawCall||{},program=d.programStatus?.program?.__SPECTOR_Object_TAG?.id,
    fb=d.frameBuffer?.frameBuffer?.__SPECTOR_Object_TAG?.id, a=c.commandArguments||[];
  if(typeof program==='number')programs.add(program);
  if(typeof fb==='number')fbs.add(fb);
  for(const u of (d.uniforms||[]))if(typeof u.name==='string')uniformNames.add(u.name);
  for(const s of (d.shaders||[]))if(typeof s.source==='string')shaderHashes.add(sha(Buffer.from(s.source)));
  draws.push({command:name,mode:a[0]??null,count:name.startsWith('drawElements')?a[1]:a[2],
    program:program??null,framebuffer:fb??null,blend:c.BlendState?.BLEND??null,depth:c.DepthState?.DEPTH_TEST??null,
    uniformCount:d.uniforms?.length||0});
 }
 return {commandCount:cmds.length,commandHistogram:counts,drawCallCount:draws.length,
  programs:[...programs].sort((a,b)=>a-b),fboIds:[...fbs].sort((a,b)=>a-b),
  backbufferDraws:draws.filter(x=>x.framebuffer===null).length,shaders:[...shaderHashes].sort(),
  uniforms:[...uniformNames].sort(),draws,
  webgl:raw?.context?.version||null,glsl:raw?.context?.capabilities?.SHADING_LANGUAGE_VERSION||null};
}
function processBody(id){
 const r=responses.get(id);if(!r||r.status!==200||!firstParty(r.url)||pending.size>6||storedBytes>18000000)return;
 const x=canon(r.url),extn=path.extname(new URL(r.url).pathname).toLowerCase();
 if(!['.js','.css','.glb','.gltf','.png','.webp','.jpg','.jpeg','.json','.svg'].includes(extn))return;
 const p=cdp.send('Network.getResponseBody',{requestId:id}).then(b=>{
  const bytes=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body||'','utf8');
  if(!bytes.length||bytes.length>2400000)return;
  const digest=sha(bytes),key=x+'|'+digest;if(bodyVariants.has(key))return;
  const oldEntry=oldMap.get(x);
  const classification=!oldEntry?'NEW_PATH_CANDIDATE':(oldEntry.originalBodyVariants||[]).some(v=>v.sha256===digest)?
   'KNOWN_PATH_MATCHED_ORIGINAL_SHA':(oldEntry.originalBodyVariants||[]).length?'KNOWN_PATH_BODY_VARIANT_CANDIDATE':'KNOWN_PATH_FIRST_BODY_CANDIDATE';
  const rec={url:x,sha256:digest,bytes:bytes.length,mime:r.mime,classification};
  bodyVariants.set(key,rec);
  if(classification!=='KNOWN_PATH_MATCHED_ORIGINAL_SHA'&&storedBytes+bytes.length<=18000000){
   const name=digest.slice(0,24)+extn,p=path.join(privateDir,name);
   if(!fs.existsSync(p)){fs.writeFileSync(p,bytes);storedBytes+=bytes.length}
   rec.privateName=name;
  }
 }).catch(e=>warn('body_unavailable',e)).finally(()=>pending.delete(p));pending.add(p);
}
async function capture(t,label,action){
 let delta=t*1000-(Date.now()-observedStart);if(delta>0)await sleep(delta);
 if(stopReason)return;
 try{
  await action();await sleep(500);
  const dom=await page.evaluate(()=>({path:location.pathname,
   canvasCount:document.querySelectorAll('canvas').length,animationCount:document.getAnimations().length,
   scrollY:Math.round(scrollY),three:window.__THREE__||null,nextVersion:window.next?.version||null}));
  await page.evaluate(()=>{window.__x22Capture=null;window.__x22Spector.captureNextFrame(document.querySelector('canvas'),true)});
  let has=false;for(let i=0;i<18;i++){await sleep(300);has=await page.evaluate(()=>!!window.__x22Capture);if(has||stopReason)break}
  if(!has)throw Error('SPECTOR_CAPTURE_NOT_RETURNED');
  const raw=await page.evaluate(()=>window.__x22Capture);
  const name='X22-90S-'+String(samples.length+1).padStart(2,'0')+'-'+label+'.json',fp=path.join(privateDir,name);
  fs.writeFileSync(fp,JSON.stringify(raw));
  const meta=summary(raw);const row={label,requestedSecond:t,actualSecond:+((Date.now()-observedStart)/1000).toFixed(2),
    dom,rawName:name,rawSha256:sha(fs.readFileSync(fp)),rawBytes:fs.statSync(fp).size,meta};
  samples.push(row);
  console.log('X22_90S_CAPTURE '+JSON.stringify({t:row.actualSecond,label,draw:meta.drawCallCount,commands:meta.commandCount,
   programs:meta.programs.length,shaderHashes:meta.shaders.length,uniforms:meta.uniforms.length,freeRamMiB:Math.round(os.freemem()/1048576)}));
 }catch(e){warn('capture_'+label,e);console.log('X22_90S_CAPTURE_ERROR '+label+' '+String(e.message).slice(0,110))}
}
async function run(){
 if(os.freemem()<850*1048576)throw Error('RAM_TOO_LOW_TO_START');
 const man=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json'),'utf8'));
 if(man.version!=='0.9.33'||man.manifest_version!==3)throw Error('SPECTOR_VERSION_ERROR');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:18000,ignoreDefaultArgs:['--disable-extensions'],
  userDataDir:path.join(dir,'X22-90S-Isolated-Anonymous-Browser'),
  args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,'--no-first-run','--no-default-browser-check',
   '--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 stat.extensionWorker=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 cdp=await page.createCDPSession();await cdp.send('Network.enable',{maxTotalBufferSize:16000000,maxResourceBufferSize:2400000});
 cdp.on('Network.requestWillBeSent',ev=>{if(!firstParty(ev.request.url))return;
  let to=canon(ev.request.url),f=ev.initiator?.stack?.callFrames?.[0]?.url||ev.initiator?.url||null;
  let from=f&&firstParty(f)?canon(f):null;requests.set(ev.requestId,{to,from});
  if(from){let key=from+'|'+to;edges.set(key,(edges.get(key)||0)+1)}
 });
 cdp.on('Network.responseReceived',ev=>{if(firstParty(ev.response.url))responses.set(ev.requestId,{
   url:ev.response.url,status:ev.response.status,mime:ev.response.mimeType,type:ev.type})});
 cdp.on('Network.loadingFinished',ev=>processBody(ev.requestId));
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:24000});
 let ready=false;for(let i=0;i<26;i++){await sleep(300);ready=await page.evaluate(()=>{
   const c=document.querySelector('canvas');return !!(c&&c.getContext('webgl2')&&window.__THREE__==='154')});if(ready)break}
 if(!ready)throw Error('LIVE_WEBGL2_NOT_READY');
 await page.addScriptTag({content:fs.readFileSync(path.join(ext,'spector.bundle.js'),'utf8')});
 if(await page.evaluate(()=>typeof window.SPECTOR?.Spector)!=='function')throw Error('SPECTOR_LIBRARY_NOT_READY');
 await page.evaluate(()=>{let sp=new window.SPECTOR.Spector();sp.spyCanvases();window.__x22Spector=sp;
  window.__x22Capture=null;sp.onCapture.add(c=>window.__x22Capture=c)});
 observedStart=Date.now();stat.observedStartUtc=new Date().toISOString();
 const steps=[
 [3,'initial',async()=>{}],
 [17,'pointer_left',async()=>page.mouse.move(120,240)],
 [31,'pointer_right',async()=>page.mouse.move(1150,460)],
 [45,'scroll_450',async()=>page.mouse.wheel({deltaY:450})],
 [59,'pointer_center',async()=>page.mouse.move(670,350)],
 [73,'scroll_800',async()=>page.mouse.wheel({deltaY:800})],
 [87,'pointer_reverse',async()=>page.mouse.move(160,530)]];
 for(const [t,label,action] of steps){await capture(t,label,action);if(stopReason)break}
 const rem=90000-(Date.now()-observedStart);if(rem>0&&!stopReason)await sleep(rem);
 stat.observedSeconds=+((Date.now()-observedStart)/1000).toFixed(2);
 stopReason||='COMPLETED_90S';
}
memoryMonitor=setInterval(()=>{const n=Math.round(os.freemem()/1048576);minFree=Math.min(minFree,n);
 if(n<=100&&!stopReason){stopReason='RAM_EMERGENCY_100MIB';browser?.close().catch(()=>{})}},500);
watchdog=setTimeout(()=>{stopReason||='WATCHDOG_130_SECONDS';browser?.close().catch(()=>{})},130000);
run().catch(e=>{stopReason||='FATAL';warn('fatal',e)}).finally(async()=>{
 clearInterval(memoryMonitor);clearTimeout(watchdog);
 try{await Promise.race([Promise.allSettled([...pending]),sleep(1200)])}catch{}
 try{await Promise.race([browser?.close(),sleep(2500)])}catch{}
 stat.endUtc=new Date().toISOString();stat.totalWallSeconds=+((Date.now()-start)/1000).toFixed(2);
 stat.stopReason=stopReason;stat.minRamMiB=minFree;stat.frames=samples.length;
 stat.firstPartyResponses=responses.size;stat.observedPaths=[...new Set([...responses.values()].map(x=>canon(x.url)))].length;
 stat.newPathCandidates=[...new Set([...responses.values()].map(x=>canon(x.url)))].filter(x=>!oldMap.has(x));
 stat.initiatorEdges=edges.size;stat.newInitiatorEdges=[...edges.keys()].filter(x=>!priorEdges.has(x)).length;
 stat.bodyVariants=bodyVariants.size;stat.privateBodyBytes=storedBytes;stat.issueCount=issues.length;
 const privateReport={stats:stat,frames:samples,network:[...bodyVariants.values()],
  edges:[...edges].map(([key,count])=>({from:key.split('|')[0],to:key.split('|')[1],count,knownX16:priorEdges.has(key)})),issues};
 fs.writeFileSync(path.join(dir,'X22-90S-LOCAL-PRIVATE-INDEX.json'),JSON.stringify(privateReport,null,2));
 const publicFrames=samples.map(x=>({label:x.label,requestedSecond:x.requestedSecond,actualSecond:x.actualSecond,
  dom:x.dom,rawSha256:x.rawSha256,rawBytes:x.rawBytes,meta:x.meta}));
 fs.writeFileSync(path.join(dir,'X22-90S-SANITIZED-GPU-AND-NETWORK-TIMELINE.json'),
  JSON.stringify({stats:stat,frames:publicFrames,
   resourceHashes:[...bodyVariants.values()].map(x=>({url:x.url,sha256:x.sha256,bytes:x.bytes,classification:x.classification,mime:x.mime})),
   issues,limitations:['Spector capture changes timing; no native FPS inferred','Raw shader/texture and HTML bytes remain private',
    'Site public homepage only, no credentials or private session','CDP bodies are decoded not original wire-encoded']},null,2));
 console.log('X22_90S_FINAL '+JSON.stringify({stop:stopReason,seconds:stat.observedSeconds,frames:samples.length,
   minFreeMiB:minFree,paths:stat.observedPaths,newPathCandidates:stat.newPathCandidates,
   bodyVariants:stat.bodyVariants,edges:stat.initiatorEdges,novelEdges:stat.newInitiatorEdges,issues:issues.length,wallSeconds:stat.totalWallSeconds}));
});
