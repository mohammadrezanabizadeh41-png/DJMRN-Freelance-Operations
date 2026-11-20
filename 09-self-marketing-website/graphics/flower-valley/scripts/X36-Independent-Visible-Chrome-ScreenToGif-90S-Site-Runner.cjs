'use strict';
// DJMRN X36: live public site 90-second CDP observer while *independent native ScreenToGif GUI*
// records visible screen ROI. No GPU inspector. Never publish vendor screenshot/movie/raw texture.
// One isolated visible Chrome browser; ScreenToGif private native recorder with time limit.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto'),cp=require('child_process');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(root,'02-reviewed-derived','X36-CURRENT'),P=path.join(root,'01-private-captures','X36','SCREEN-TO-GIF-REAL-FRAMES');
const B=path.join(root,'01-private-captures','X36','PUBLIC-90S-BROWSER'),tool=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const chrome=path.join(tool,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe'),
 screentogif=path.join(tool,'01-Analysis','ScreenToGif-FULL-v2.43.2','ScreenToGif.exe'),
 puppeteer=require(path.join(tool,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer')),
 playwright=require(path.join(tool,'03-WebGL','WebGL-Toolchain','node_modules','playwright-core'));
const prior=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json')));
const known=new Map(prior.resources.map(x=>[x.url,x])),old16=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X16-CURRENT','X16-script-init-network-graph.json')));
const oldEdges=new Set(old16.edges.map(x=>x.from+'|'+x.to));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),sleep=n=>new Promise(r=>setTimeout(r,n));
const first=url=>{try{return new URL(url).origin==='https://www.gladeye.com'}catch{return false}},
 canon=url=>{try{const u=new URL(url);return u.origin+u.pathname}catch{return null}};
const result={stage:'X36',scope:'NATIVE_SCREENTOGIF_GUI_ROI_PLUS_90S_READONLY_PUBLIC_SITE',
 site:'https://www.gladeye.com/',captureTool:'Official native ScreenToGif 2.43.2 FULL Portable self-contained',
 nativeCaptureConfigured:{ROI:{left:130,top:170,width:700,height:410},maxFPS:6,limitSeconds:32},
 captureIsNativeScreenToGifNotPlaywrightScreenshot:true,chromeVisible:true,
 noRenderDocOrGPUInspector:true,thirdPartyImagesPrivatePCOnly:true,noShadersOrRawGLBBodiesSaved:true,
 systemProxyUnchanged:true,hardStopRamMiB:100,events:[],issues:[],startUTC:new Date().toISOString()};
let browser,page,pwB,pwPage,cdp,started,screenProcess,stop=null,limitTimer,watchdog,ramWatcher,minFree=Math.floor(os.freemem()/1048576);
const responses=new Map(),hashes=new Map(),edges=new Set(),tasks=new Set();
function error(phase,e){if(result.issues.length<12)result.issues.push({phase,text:String(e?.message||e).slice(0,180)})}
function trackBody(id){const x=responses.get(id);if(!x||!first(x.url)||x.status!==200||tasks.size>3)return;
 const u=canon(x.url),ext=path.extname(new URL(x.url).pathname).toLowerCase();
 if(!['.js','.css','.json','.png','.webp','.glb','.svg','.jpg'].includes(ext))return;
 const t=cdp.send('Network.getResponseBody',{requestId:id}).then(v=>{
  const bytes=v.base64Encoded?Buffer.from(v.body,'base64'):Buffer.from(v.body||'','utf8');
  if(!bytes.length||bytes.length>2400000)return;
  const key=u+'|'+sha(bytes);if(hashes.has(key))return;
  hashes.set(key,{url:u,bytes:bytes.length,sha256:sha(bytes),
    exactX19Original:!!known.get(u)?.originalBodyVariants?.some(z=>z.sha256===sha(bytes)&&z.bytes===bytes.length)});
 }).catch(e=>error('body_hash',e)).finally(()=>tasks.delete(t));tasks.add(t);
}
function spy(){
 const s={totalDraws:0,events:Object.create(null),trusted:Object.create(null),signatures:Object.create(null)};
 window.__DJMRN_X36_READONLY=s;
 for(const e of ['pointermove','pointerdown','pointerup','mousemove','wheel','click','focus','blur','resize']){
  window.addEventListener(e,ev=>{s.events[e]=(s.events[e]||0)+1;if(ev.isTrusted)s.trusted[e]=(s.trusted[e]||0)+1},{passive:true});
 }
 if(!window.WebGL2RenderingContext)return;
 for(const op of ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced','drawRangeElements']){
  const proto=WebGL2RenderingContext.prototype,orig=proto[op];if(typeof orig!=='function')continue;
  proto[op]=function(...args){try{const count=op==='drawRangeElements'?args[3]:op.startsWith('drawElements')?args[1]:args[2];
   const key=op+'|'+args[0]+'|'+count;if(!s.signatures[key])s.signatures[key]={op,mode:args[0],count,calls:0};
   s.signatures[key].calls++;s.totalDraws++}catch{}return Reflect.apply(orig,this,args)};
 }
}
function sec(){return +((Date.now()-started)/1000).toFixed(3)}
async function sample(t,label,action){
 const wait=t*1000-(Date.now()-started);if(wait>0)await sleep(wait);if(stop)return;
 try{await action();await sleep(180);
 const metadata=await page.evaluate(()=>{
  const s=window.__DJMRN_X36_READONLY||{};
  return {hostname:location.hostname,documentState:document.readyState,threeRevision:window.__THREE__||null,
   webgl2:!!document.querySelector('canvas')?.getContext('webgl2'),canvasCount:document.querySelectorAll('canvas').length,
   viewport:[window.innerWidth,window.innerHeight],scrollY:Math.round(window.scrollY),
   eventCounts:{...s.events},trustedEventCounts:{...s.trusted},totalDraws:s.totalDraws||0,
   signatures:Object.values(s.signatures||{}),cssAnimations:document.getAnimations().length,
   cameraResource:performance.getEntriesByType('resource').filter(x=>/camera-path.*\.glb/.test(x.name)).map(x=>({path:new URL(x.name).pathname,decodedBodySize:x.decodedBodySize}))};
 });
 result.events.push({phase:label,targetSecond:t,actualSecond:sec(),meta:metadata,freeRAMMiB:Math.floor(os.freemem()/1048576)});
 console.log('X36_LIVE '+JSON.stringify({phase:label,second:sec(),draws:metadata.totalDraws,mouse:metadata.trustedEventCounts.mousemove||0,
  freeMiB:Math.floor(os.freemem()/1048576)}));
 }catch(e){error('sample_'+label,e)}
}
async function run(){
 if(os.freemem()/1048576<900)throw Error('BELOW_900_MIB_RAM_PRECHECK');
 if(!fs.existsSync(screentogif))throw Error('FULL_SCREENTOGIF_NOT_READY');
 browser=await puppeteer.launch({executablePath:chrome,headless:false,timeout:25000,
  userDataDir:path.join(B,'isolated-foreground-Chrome157'),
  args:['--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-component-update',
   '--disable-sync','--no-proxy-server','--window-position=15,20','--window-size=1120,735']});
 page=await browser.newPage();await page.setViewport({width:1080,height:650,deviceScaleFactor:1});
 await page.evaluateOnNewDocument(spy);
 cdp=await page.createCDPSession();await cdp.send('Network.enable',{maxResourceBufferSize:2400000,maxTotalBufferSize:18000000});
 cdp.on('Network.requestWillBeSent',e=>{if(!first(e.request.url))return;const to=canon(e.request.url),from=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url||'';
  if(first(from))edges.add(canon(from)+'|'+to)});
 cdp.on('Network.responseReceived',e=>{if(first(e.response.url))responses.set(e.requestId,{url:e.response.url,status:e.response.status})});
 cdp.on('Network.loadingFinished',e=>trackBody(e.requestId));
 let loaded=false;
 for(let i=0;i<3;i++){try{await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:45000});loaded=true;break}
  catch(e){error('navigation_'+i,e);if(await page.evaluate(()=>location.hostname==='www.gladeye.com').catch(()=>false)){loaded=true;break}await sleep(1600)}}
 if(!loaded)throw Error('SITE_NAVIGATION_FAILED');
 await page.waitForFunction(()=>window.__THREE__==='154'&&document.querySelector('canvas')?.getContext('webgl2'),{timeout:65000});
 pwB=await playwright.chromium.connectOverCDP(browser.wsEndpoint());
 pwPage=pwB.contexts().flatMap(x=>x.pages()).find(x=>x.url().includes('www.gladeye.com'));if(!pwPage)throw Error('NO_PLAYWRIGHT_CDP_PAGE');
 started=Date.now();result.liveStartedUTC=new Date().toISOString();
 limitTimer=setTimeout(()=>{if(!stop)stop='COMPLETED_90_S_LIMIT'},90000);
 const plan=[
 [2,'initial_idle',async()=>{}],
 [9,'before_native_recorder',async()=>{}],
 [11,'start_native_screentogif',async()=>{
   const args=['-n','-o','screen','-r','130,170,700,410','-f','6fps','-l','00:00:32','-c'];
   screenProcess=cp.spawn(screentogif,args,{windowsHide:false,stdio:'ignore',detached:false});
   result.nativeScreenToGifPID=screenProcess.pid;result.nativeStartSecond=sec();result.nativeArgs=args;
   console.log('X36_NATIVE_SCREENTOGIF_START '+JSON.stringify({pid:screenProcess.pid,t:result.nativeStartSecond,args}));
 }],
 [17,'pointer_left',async()=>pwPage.mouse.move(160,230,{steps:8})],
 [22,'pointer_left_hold',async()=>{}],
 [27,'pointer_right',async()=>pwPage.mouse.move(940,420,{steps:8})],
 [32,'pointer_right_hold',async()=>{}],
 [37,'scroll_positive',async()=>pwPage.mouse.wheel(0,460)],
 [42,'scroll_negative',async()=>pwPage.mouse.wheel(0,-460)],
 [46,'return_center',async()=>pwPage.mouse.move(530,380,{steps:8})],
 [52,'record_limit_elapsed',async()=>{}],
 [65,'late_idle',async()=>{}],
 [79,'late_pointer',async()=>pwPage.mouse.move(190,240,{steps:6})],
 [87,'end_idle',async()=>{}]
 ];
 result.schedule=plan.map(([t,name])=>({target:t,name}));
 for(const [t,name,act] of plan){if(stop)break;await sample(t,name,act)}
 const ms=90000-(Date.now()-started);if(ms>0)await sleep(ms);
 result.observedSeconds=sec();if(!stop)stop='COMPLETED_90_S_LIMIT';
}
ramWatcher=setInterval(()=>{const f=Math.floor(os.freemem()/1048576);minFree=Math.min(f,minFree);
 if(f<=100&&!stop){stop='RAM_EMERGENCY_STOP';browser?.close().catch(()=>{})}},350);
watchdog=setTimeout(()=>{if(!stop)stop='WATCHDOG_290S';browser?.close().catch(()=>{})},290000);
run().catch(e=>{stop||='ERROR';error('fatal',e)}).finally(async()=>{
 clearInterval(ramWatcher);clearTimeout(watchdog);clearTimeout(limitTimer);
 try{await Promise.race([Promise.allSettled([...tasks]),sleep(1000)])}catch{}
 try{await Promise.race([browser?.close(),sleep(2800)])}catch{}
 result.stopReason=stop;result.minFreeMiB=minFree;result.observedSeconds??=started?sec():0;result.endUTC=new Date().toISOString();
 const paths=[...new Set([...responses.values()].map(v=>canon(v.url)))];
 result.knownFirstPartyPaths=paths.length;result.novelFirstPartyPaths=paths.filter(p=>!known.has(p));
 result.resources=[...hashes.values()];result.exactHistoricalBodyCount=result.resources.filter(x=>x.exactX19Original).length;
 result.edgesTotal=edges.size;result.novelEdges=[...edges].filter(e=>!oldEdges.has(e));
 result.liveCameraHashExactX34=result.resources.some(x=>x.url.endsWith('/valley/camera-path07.glb')&&
   x.sha256==='dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e');
 result.limits='Native ScreenToGif is independent of Playwright screenshot APIs; user-visible video is a screen-capture observation, not internal camera pose or causal proof. No site video/pixels distributed.';
 fs.writeFileSync(path.join(D,'X36-NEW-90S-LIVE-PUBLIC-WEBGL-AND-NATIVE-ROI-OBSERVATION.json'),JSON.stringify(result,null,2)+'\n');
 console.log('X36_SITE_FINAL '+JSON.stringify({stop,seconds:result.observedSeconds,phases:result.events.length,
  nativePID:result.nativeScreenToGifPID,ramMin:minFree,knownPaths:result.knownFirstPartyPaths,newPaths:result.novelFirstPartyPaths.length,
  bodiesExact:result.exactHistoricalBodyCount,totalBodies:result.resources.length,edges:result.edgesTotal,newEdges:result.novelEdges.length,issues:result.issues}));
});
