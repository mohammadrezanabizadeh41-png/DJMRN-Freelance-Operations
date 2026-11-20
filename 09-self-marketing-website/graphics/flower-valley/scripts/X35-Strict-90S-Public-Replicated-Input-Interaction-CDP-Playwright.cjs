'use strict';
// DJMRN X35: ONE 90-second real public-site session; strict timed interventions + repeated left/right and idle.
// Read-only event observation and nonexpressive WebGL counts; no native GPU injection, no third-party assets exported.
// Screenshots and isolated browser profile PRIVATE on owner PC. No global settings, paid tools or third-party writes.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(root,'02-reviewed-derived','X35-CURRENT'),P=path.join(root,'01-private-captures','X35','PUBLIC-STRICT-BEHAVIOR-90S');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const playwright=require(path.join(tk,'03-WebGL','WebGL-Toolchain','node_modules','playwright-core'));
const sharp=require(path.join(tk,'03-WebGL','WebGL-Toolchain','node_modules','sharp'));
const prev=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X19-CURRENT','X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json')));
const prevURLs=new Map(prev.resources.map(x=>[x.url,x]));
const x16=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X16-CURRENT','X16-script-init-network-graph.json')));
const oldEdges=new Set(x16.edges.map(x=>x.from+'|'+x.to));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),sleep=t=>new Promise(r=>setTimeout(r,t));
const same=u=>{try{return new URL(u).origin==='https://www.gladeye.com'}catch{return false}};
const canon=u=>{try{const v=new URL(u);return v.origin+v.pathname}catch{return null}};
const R={stage:'X35',scope:'PUBLIC_SITE_INPUT_BEHAVIOR_90S_ONE_SESSION_CONTROLLED_PAIRS_NO_PRIVATE_SCENE_EXPORT',
 site:'https://www.gladeye.com/',observer:'Playwright 1.65.1 Chromium CDP and sharp 0.35.5; passive original WebGL primitive counts',
 officialDocs:['https://playwright.dev/docs/api/class-mouse','https://playwright.dev/docs/emulation','https://chromedevtools.github.io/devtools-protocol/tot/Emulation/'],
 observedSecondsLimit:90,ownerRAMHardStopMiB:100,systemProxyNotChanged:true,noVendorNativeGpuInjection:true,
 noThirdPartyGeometryOrShaderOrTexturesSaved:true,noVendorSourceScriptPublication:true,
 screenshotsPrivatePCOnly:true,unsupervisedSiteClicksFormSubmissions:false,events:[],issues:[],startUTC:new Date().toISOString()};
let browser,page,cdp,pwB,pwPage,obsStart,limitTimer,watchdog,ramTimer,stop,prevSmall=null;
let minFree=Math.floor(os.freemem()/1048576);
const requests=new Map(),bodies=new Map(),pending=new Set(),edges=new Set();
function warn(name,e){if(R.issues.length<16)R.issues.push({phase:name,error:String(e?.message||e).slice(0,180)})}
function loadHash(id){
 const x=requests.get(id);if(!x||x.status!==200||!same(x.url)||pending.size>4)return;
 const canonURL=canon(x.url),ext=path.extname(new URL(x.url).pathname).toLowerCase();
 if(!['.js','.css','.json','.png','.glb','.webp','.svg','.jpg','.jpeg'].includes(ext))return;
 const task=cdp.send('Network.getResponseBody',{requestId:id}).then(k=>{
  const b=k.base64Encoded?Buffer.from(k.body,'base64'):Buffer.from(k.body||'','utf8');
  if(!b.length||b.length>2400000)return;
  const h=sha(b),key=canonURL+'|'+h;if(bodies.has(key))return;
  const known=prevURLs.get(canonURL);
  bodies.set(key,{url:canonURL,bytes:b.length,sha256:h,knownPath:!!known,
    exactX19Body:!!known?.originalBodyVariants?.some(v=>v.sha256===h&&v.bytes===b.length)});
 }).catch(e=>warn('body_hash_only',e)).finally(()=>pending.delete(task));
 pending.add(task);
}
function observer(){
 const W=window,counts=Object.create(null),trusted=Object.create(null),signatures=Object.create(null);
 const state={draws:0,signatures,instancedDraws:0,inputCounts:counts,trustedCounts:trusted};
 W.__DJMRN_X35_READONLY=state;
 for(const ev of ['pointermove','pointerdown','pointerup','mousemove','click','wheel','touchstart',
   'touchmove','touchend','keydown','focus','blur','resize','mouseenter','mouseleave']){
  W.addEventListener(ev,e=>{counts[ev]=(counts[ev]||0)+1;
   if(e.isTrusted)trusted[ev]=(trusted[ev]||0)+1},{passive:true,capture:false});
 }
 if(!W.WebGL2RenderingContext)return;
 for(const op of ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced','drawRangeElements']){
  const proto=WebGL2RenderingContext.prototype,original=proto[op];if(typeof original!=='function')continue;
  proto[op]=function(...args){
   try{const mode=args[0],count=op==='drawRangeElements'?args[3]:op.startsWith('drawElements')?args[1]:args[2],
    instanceCount=op==='drawRangeElements'?1:op.endsWith('Instanced')?args.at(-1):1,
    sig=op+'|'+mode+'|'+count+'|'+instanceCount;state.draws++;
    if(!signatures[sig])signatures[sig]={op,mode,count,instances:instanceCount,calls:0};
    signatures[sig].calls++;if(op.endsWith('Instanced'))state.instancedDraws++;
   }catch{}
   return Reflect.apply(original,this,args);
  };
 }
}
function abs(t){return obsStart?+( (Date.now()-obsStart)/1000 ).toFixed(3):0}
function delta(a,b){let s=0,changed=0;for(let i=0;i<a.length;i++){const v=Math.abs(a[i]-b[i]);s+=v;if(v>15)changed++;}
 return {meanAbsoluteRGB:Math.round(s/a.length*10000)/10000,
  changedRGBComponentsOver15Pct:Math.round(changed/a.length*10000)/100};}
async function snap(t,label,action,kind='desktop'){
 const until=obsStart+t*1000-Date.now();if(until>0)await sleep(until);
 if(stop)return;
 try{
  const before=abs(t),freeBefore=Math.floor(os.freemem()/1048576);
  await action();
  await sleep(120);
  const meta=await page.evaluate(()=>{
   const s=window.__DJMRN_X35_READONLY||{};
   const canvas=document.querySelector('canvas');
   return {hostname:location.hostname,canvas:!!canvas,
    webgl2:!!canvas?.getContext('webgl2'),threeRevision:window.__THREE__||null,
    win:{width:window.innerWidth,height:window.innerHeight,dpr:window.devicePixelRatio},
    scrollY:Math.round(window.scrollY),docReady:document.readyState,
    reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,
    pointerCoarse:matchMedia('(pointer: coarse)').matches,touchCapable:navigator.maxTouchPoints>0,
    cssAnimations:document.getAnimations().length,
    inputCounts:{...s.inputCounts},trustedCounts:{...s.trustedCounts},
    webgl:{draws:s.draws||0,instancedDraws:s.instancedDraws||0,
      signatures:Object.values(s.signatures||{})}}});
  const png=await page.screenshot({type:'png',captureBeyondViewport:false});
  const pic='X35-PRIVATE-'+String(R.events.length+1).padStart(2,'0')+'-'+label+'.png';
  fs.writeFileSync(path.join(P,pic),png);
  const small=await sharp(png).resize(192,108,{fit:'fill'}).removeAlpha().raw().toBuffer();
  const imageMetrics={bytes:png.length,sha256:sha(png)};
  if(prevSmall)imageMetrics.fromPrevious=delta(prevSmall,small);
  prevSmall=small;
  R.events.push({label,inputKind:kind,targetSecond:t,actualSecond:abs(t),
    inputActionElapsedMs:Math.round((abs(t)-before)*1000),freeMiBBefore:freeBefore,
    screen:meta,imageMetrics,privateScreenshot:{name:pic,bytes:png.length,sha256:sha(png)}});
  console.log('X35_SAMPLE '+JSON.stringify({label,t:abs(t),draws:meta.webgl.draws,mouse:meta.trustedCounts.mousemove||0,
   touch:meta.trustedCounts.touchstart||0,reduce:meta.reducedMotion,freeMiB:Math.floor(os.freemem()/1048576)}));
 }catch(e){warn('sample_'+label,e)}
}
function actionMove(x,y){return()=>pwPage.mouse.move(x,y,{steps:8})}
async function touch(x,y){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
 await sleep(70);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
async function swipe(){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:165,y:650,id:1}]});
 for(let y=615;y>=370;y-=35)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:165,y,id:1}]}).catch(()=>{});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
async function run(){
 if(os.freemem()/1048576<850)throw Error('RAM_PRECHECK_LT_850_MIB');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:20000,
  userDataDir:path.join(P,'isolated-Chrome157-headless-X35'),
  args:['--headless=new','--no-first-run','--no-default-browser-check','--disable-sync',
   '--disable-background-networking','--disable-component-update','--no-proxy-server','--window-size=1280,720']});
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 await page.evaluateOnNewDocument(observer);
 cdp=await page.createCDPSession();await cdp.send('Network.enable',{maxResourceBufferSize:2400000,maxTotalBufferSize:18000000});
 cdp.on('Network.requestWillBeSent',e=>{if(!same(e.request.url))return;const to=canon(e.request.url),
   from=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url||'';if(same(from))edges.add(canon(from)+'|'+to)});
 cdp.on('Network.responseReceived',e=>{if(same(e.response.url))requests.set(e.requestId,{url:e.response.url,status:e.response.status})});
 cdp.on('Network.loadingFinished',e=>loadHash(e.requestId));
 let loaded=false,failures=[];
 for(let i=0;i<3;i++){try{await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:45000});loaded=true;break}
 catch(e){failures.push(String(e.message).slice(0,130));
  if(await page.evaluate(()=>location.hostname==='www.gladeye.com').catch(()=>false)){loaded=true;break}
  await sleep(1400)}}
 R.navigation={loaded,attempts:failures.length+1,previousFailures:failures};
 if(!loaded)throw Error('NAVIGATION_NOT_READY');
 await page.waitForFunction(()=>window.__THREE__==='154'&&!!document.querySelector('canvas')?.getContext('webgl2'),{timeout:65000});
 pwB=await playwright.chromium.connectOverCDP(browser.wsEndpoint());
 pwPage=pwB.contexts().flatMap(x=>x.pages()).find(x=>x.url().includes('www.gladeye.com'));
 if(!pwPage)throw Error('PLAYWRIGHT_CDP_PAGE_NOT_FOUND');
 obsStart=Date.now();R.observedStartUTC=new Date().toISOString();
 limitTimer=setTimeout(()=>{if(!stop)stop='COMPLETED_90S_LIMIT'},90000);
 const plan=[
 [2,'idle_A',async()=>{},'control'],
 [6,'idle_B',async()=>{},'control'],
 [10,'pointer_left_A',actionMove(160,220),'pointer'],
 [14,'pointer_left_hold',async()=>{},'hold'],
 [18,'pointer_right_A',actionMove(1070,440),'pointer'],
 [22,'pointer_right_hold',async()=>{},'hold'],
 [26,'pointer_left_B',actionMove(160,220),'replicate'],
 [30,'pointer_right_B',actionMove(1070,440),'replicate'],
 [34,'center_reset',actionMove(640,360),'reset'],
 [38,'drag_press',async()=>pwPage.mouse.down(),'drag'],
 [42,'drag_move',async()=>pwPage.mouse.move(820,490,{steps:12}),'drag'],
 [46,'drag_release',async()=>pwPage.mouse.up(),'drag'],
 [50,'canvas_click',async()=>pwPage.mouse.click(645,350,{delay:45}),'click'],
 [54,'wheel_down',async()=>pwPage.mouse.wheel(0,480),'scroll'],
 [58,'wheel_up',async()=>pwPage.mouse.wheel(0,-480),'scroll'],
 [62,'keyboard_focus',async()=>pwPage.keyboard.press('Tab'),'focus'],
 [66,'pointer_exit',async()=>pwPage.mouse.move(0,0,{steps:6}),'exit'],
 [70,'resize_960x600',async()=>page.setViewport({width:960,height:600,deviceScaleFactor:1}),'resize'],
 [74,'resize_restore',async()=>page.setViewport({width:1280,height:720,deviceScaleFactor:1}),'resize'],
 [78,'reduced_motion_on',async()=>cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]}),'media'],
 [82,'reduced_motion_off',async()=>cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]}),'media'],
 [85,'mobile_emulation',async()=>{await cdp.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});},'mobile'],
 [87,'mobile_touch_tap',async()=>touch(190,350),'mobile'],
 [88.35,'mobile_touch_swipe',swipe,'mobile']
 ];
 R.schedule=plan.map(([target,name,_,kind])=>({targetSecond:target,name,kind}));
 for(const [at,name,act,kind] of plan){if(stop)break;await snap(at,name,act,kind)}
 const left=90000-(Date.now()-obsStart);if(left>0)await sleep(left);
 R.actualObservedSeconds=+((Date.now()-obsStart)/1000).toFixed(3);
 if(!stop)stop='COMPLETED_90S_LIMIT';
}
ramTimer=setInterval(()=>{const m=Math.floor(os.freemem()/1048576);minFree=Math.min(m,minFree);
 if(m<=100&&!stop){stop='RAM_HARD_STOP_100_MIB';browser?.close().catch(()=>{})}},350);
watchdog=setTimeout(()=>{if(!stop)stop='WATCHDOG_290S';browser?.close().catch(()=>{})},290000);
run().catch(e=>{if(!stop)stop='RUN_ERROR';warn('fatal',e)}).finally(async()=>{
 clearInterval(ramTimer);clearTimeout(watchdog);clearTimeout(limitTimer);
 try{await Promise.race([Promise.allSettled([...pending]),sleep(1200)])}catch{}
 try{await Promise.race([browser?.close(),sleep(2600)])}catch{}
 const allPaths=[...new Set([...requests.values()].map(x=>canon(x.url)))];
 R.stopReason=stop;R.minFreeRamMiB=minFree;R.endUTC=new Date().toISOString();
 R.observedFirstPartyPaths=allPaths.length;R.novelFirstPartyPaths=allPaths.filter(x=>!prevURLs.has(x));
 R.networkBodySHAAndSize=[...bodies.values()];R.exactX19BodyCount=[...bodies.values()].filter(x=>x.exactX19Body).length;
 R.networkOldInitiatorEdges=edges.size;R.novelInitiatorEdges=[...edges].filter(x=>!oldEdges.has(x));
 R.actualObservedSeconds??=obsStart?+((Date.now()-obsStart)/1000).toFixed(3):0;
 R.liveOriginalCameraSHAIdenticalToX34=R.networkBodySHAAndSize.some(x=>x.url.endsWith('/valley/camera-path07.glb')&&
   x.sha256==='dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e');
 R.limitations='One session sequential treatment order is not randomized/dual synchronized baseline; continuous autonomous camera/particles and loading confound image differences. Matched repeated left/right verifies consistency of input dispatch only. NO verified internal WebGL camera matrices. CDP device emulation is not a physical mobile device.';
 fs.writeFileSync(path.join(D,'X35-REAL-90S-PUBLIC-CONTROLLED-INPUTS-CROSSWALK.json'),JSON.stringify(R,null,2)+'\n');
 console.log('X35_FINAL '+JSON.stringify({stop,seconds:R.actualObservedSeconds,actions:R.events.length,ramMin:minFree,
  knownPaths:R.observedFirstPartyPaths,newPaths:R.novelFirstPartyPaths.length,
  exactBodies:R.exactX19BodyCount,totalBodies:R.networkBodySHAAndSize.length,
  initiatorEdges:R.networkOldInitiatorEdges,newEdges:R.novelInitiatorEdges.length,
  cameraSame:R.liveOriginalCameraSHAIdenticalToX34,issues:R.issues}));
});
