'use strict';
// DJMRN X21: owner-authored, anonymous, bounded, read-only browser technology probe.
// This script does not capture authentication, raw site code, headers, pixels or shader sources.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X21-CURRENT');fs.mkdirSync(dir,{recursive:true});
const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes');
const pp=path.join(rt,'X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer');
const chrome=path.join(rt,'ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
if(os.freemem()<750*1048576)throw Error('PRECHECK_ABORT_FREE_RAM_BELOW_750_MIB');
if(!fs.existsSync(chrome)||!fs.existsSync(pp))throw Error('EXISTING_X14_CHROME_PUPPETEER_MISSING');
const timestamp=()=>new Date().toISOString();
const sleep=n=>new Promise(r=>setTimeout(r,n));
const start=Date.now(),snapshots=[],issues=[];
let browser,watchdog,monitor,ramMin=Math.floor(os.freemem()/1048576),stopReason=null;
const probe=async(page,label)=> {
 const o={label,seconds:Math.round((Date.now()-start)/1000),route:new URL(page.url()).pathname};
 try {o.observation=await page.evaluate(()=>{
  const canvases=[...document.querySelectorAll('canvas')].slice(0,5);
  const canvas=canvases[0]||null;
  let webgl={status:'UNKNOWN_NO_CANVAS'};
  if(canvas){
   const context=canvas.getContext('webgl2');
   if(context){
    webgl={status:'CONFIRMED_WEBGL2_CONTEXT',version:String(context.getParameter(context.VERSION)).slice(0,100),
    glslVersion:String(context.getParameter(context.SHADING_LANGUAGE_VERSION)).slice(0,100),
    maxTextureSize:context.getParameter(context.MAX_TEXTURE_SIZE),maxVertexAttribs:context.getParameter(context.MAX_VERTEX_ATTRIBS),
    drawingBuffer:[context.drawingBufferWidth,context.drawingBufferHeight],contextLost:context.isContextLost()};
   } else webgl={status:'WEBGL2_NOT_AVAILABLE_OR_NOT_USED'};
  }
  const status=fn=>{try{return Boolean(fn())}catch{return false}};
  return {canvasCount:canvases.length,canvasDimensions:canvases.map(c=>({width:c.width,height:c.height,clientWidth:c.clientWidth,clientHeight:c.clientHeight})),
   webgl,animationCount:document.getAnimations().length,
   htmlFrameworkMarkers:{nextRscPushArray:status(()=>Array.isArray(window.__next_f)),nextRscPushCount:Array.isArray(window.__next_f)?window.__next_f.length:0,
    webpackChunkNE:status(()=>Array.isArray(window.webpackChunk_N_E)),
    nextRuntimeVersion:status(()=>window.next&&typeof window.next.version==='string')?String(window.next.version).slice(0,25):null,
    nextRuntimeAppDir:status(()=>window.next&&window.next.appDir===true),
    nextDataScript:!!document.getElementById('__NEXT_DATA__'),
    nextRootElement:!!document.getElementById('__next'),
    reactGlobal:status(()=>!!window.React),threeGlobal:status(()=>!!window.THREE),
    threeRevision:status(()=>window.THREE&&window.THREE.REVISION)?String(window.THREE.REVISION).slice(0,25):null,
    threeInternalRevision:status(()=>typeof window.__THREE__ === 'string')?String(window.__THREE__).slice(0,25):null,
    gsapGlobal:status(()=>!!window.gsap),
    reactFiberGlobal:status(()=>!!window.ReactThreeFiber)},
   dom:{imageCount:document.images.length,anchorCount:document.querySelectorAll('a').length,scriptTagCount:document.querySelectorAll('script[src]').length,
    webComponents:document.querySelectorAll('template[shadowrootmode]').length,
    mainCount:document.querySelectorAll('main').length,headings:document.querySelectorAll('h1,h2,h3').length,
    scrollY:Math.round(window.scrollY),documentScrollHeight:document.documentElement.scrollHeight},
   performance:{resourceEntryCount:performance.getEntriesByType('resource').length}
  };
 })}catch(e){o.error={name:e.name,message:String(e.message).slice(0,160)};issues.push({kind:'OBSERVATION',name:e.name})}
 snapshots.push(o);console.log('X21_CHECKPOINT '+JSON.stringify({label,route:o.route,canvas:o.observation?.canvasCount,gl:o.observation?.webgl?.status,animations:o.observation?.animationCount,seconds:o.seconds,ramMiB:Math.floor(os.freemem()/1048576)}));
};
async function run(){
 const puppet=require(pp);
 browser=await puppet.launch({executablePath:chrome,headless:true,ignoreHTTPSErrors:false,timeout:18000,
 args:['--headless=new','--disable-extensions','--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 const page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:20000});
 await sleep(3000);await probe(page,'home_ready');
 await page.mouse.move(250,310);await page.mouse.move(850,450);await sleep(2400);await probe(page,'home_pointer');
 await page.mouse.wheel({deltaY:450});await sleep(1800);await probe(page,'home_scroll');
 await page.goto('https://www.gladeye.com/work',{waitUntil:'domcontentloaded',timeout:16000});
 await sleep(2200);await probe(page,'work_ready');
 await page.mouse.wheel({deltaY:370});await sleep(1800);await probe(page,'work_scroll');
 stopReason||='ALL_FIVE_CHECKPOINTS_COMPLETED';
}
watchdog=setTimeout(()=>{stopReason='WATCHDOG_60S';issues.push({kind:'WATCHDOG'});try{browser?.close()}catch{}},60000);
monitor=setInterval(()=>{const x=Math.round(os.freemem()/1048576);ramMin=Math.min(x,ramMin);if(x<=100){stopReason='RAM_EMERGENCY_100MIB';issues.push({kind:'MEMORY'});try{browser?.close()}catch{}}},500);
run().catch(e=>{stopReason||='ERROR';issues.push({kind:'FAILED',name:e.name,message:String(e.message).slice(0,160)})}).finally(async()=>{
 clearTimeout(watchdog);clearInterval(monitor);
 try{await Promise.race([browser?.close(),sleep(2500)])}catch{}
 const report={stage:'X21',goal:'read-only live corroboration of framework and WebGL context',time_utc:timestamp(),
  verifiedTools:{chrome:'Chrome for Testing 157, existing X11',puppeteer:'existing X14 runtime',newInstall:false,provider:'none'},
  elapsedSeconds:Math.round((Date.now()-start)/1000),ramMinMiB:ramMin,stopReason,
  snapshots,issues,privacy:'No credentials, cookies, query strings, DOM text/raw site JS, shader source, image pixels, original bodies or server-side source retained',
  evidenceLimitations:['WebGL2 context inquiry cannot expose original GPU shader source or draw-call stack','A missing global object does not prove the library was not bundled or used','Page may react to browser GPU environment differently than user device']};
 const out=path.join(dir,'X21-LIVE-READONLY-TECH-AND-WEBGL-STATE.json');
 fs.writeFileSync(out,JSON.stringify(report,null,2));
 console.log('X21_FINAL '+JSON.stringify({out,elapsed:report.elapsedSeconds,ramMin,stopReason,samples:snapshots.length,issues:issues.length,
 glStates:snapshots.map(x=>[x.label,x.observation?.webgl?.status]),webglVersions:snapshots.map(x=>x.observation?.webgl?.glslVersion)}));
});
