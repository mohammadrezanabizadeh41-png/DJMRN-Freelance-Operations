'use strict';
// DJMRN X24-R2 owner-authored e2e integration: actual compiled webgd Rust/WASM UI inside
// isolated Chromium MV3 profile, plus official OWN WebGL2 fixture. No vendor GPU payload published.
const fs=require('fs'),path=require('path'),os=require('os'),http=require('http');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X24-CURRENT','X24-R2-FULL-RUST-WASM-2026-11-20');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const source=path.join(tk,'04-Specialists','Sources','webgd','webgd-main');
const ext=path.join(source,'extension');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let server,browser,ramTimer,minRam=Math.round(os.freemem()/1048576),closedForRam=false;
const report={stage:'X24-R2',tool:'full compiled official Snowapril/webgd Rust+WASM egui UI',officialSourceUntouched:true,
 startedUtc:new Date().toISOString(),UIWasmExists:fs.existsSync(path.join(ext,'ui','webgd_ui_bg.wasm')),
 uiWasmBytes:fs.existsSync(path.join(ext,'ui','webgd_ui_bg.wasm'))?fs.statSync(path.join(ext,'ui','webgd_ui_bg.wasm')).size:null,
 steps:[],errors:[],console:[]};
const serveRoot=path.join(source,'tests','pages');
function serve(req,res){const p=path.join(serveRoot,decodeURIComponent(new URL(req.url,'http://local/').pathname));
 if(!p.startsWith(serveRoot)||!fs.existsSync(p)){res.writeHead(404);res.end('not found');return}
 res.writeHead(200,{'content-type':p.endsWith('.html')?'text/html; charset=utf-8':p.endsWith('.js')?'application/javascript':'text/plain'});
 fs.createReadStream(p).pipe(res)}
async function main(){
 if(!report.UIWasmExists)throw Error('WASM_UI_BINARY_NOT_BUILT');
 if(os.freemem()<=100*1048576)throw Error('EMERGENCY_FREE_RAM_BEFORE_START');
 server=http.createServer(serve);await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],
 userDataDir:path.join(dir,'X24-R2-Full-UI-Isolated-Chrome-Profile'),
 args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,
 '--enable-unsafe-webgpu','--enable-webgpu-developer-features',
 '--disable-background-timer-throttling','--disable-renderer-backgrounding',
 '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking',
 '--disable-component-update','--window-size=1280,900'],timeout:28000});
 const fixture=await browser.newPage();await fixture.setViewport({width:1024,height:768});
 await fixture.goto('http://127.0.0.1:'+server.address().port+'/webgl2.html',{waitUntil:'load',timeout:22000});
 await sleep(1700);
 // Own fixture can be one-shot: schedule continuing WebGL2 work for genuine egui UI capture.
 await fixture.evaluate(()=>{
  const c=document.querySelector('canvas'),gl=c?.getContext('webgl2');
  if(!gl)throw new Error('OWN_FIXTURE_GL2_NOT_FOUND');
  window.__x24uiRenderFrames=0;
  function tick(){
   gl.clearColor(0.18,0.24,0.32,1);gl.clear(gl.COLOR_BUFFER_BIT);
   window.__x24uiRenderFrames++;
   requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
 });
 await sleep(600);
 const fixtureState=await fixture.evaluate(()=>({ownerFixtureLiveRAFFrames:window.__x24uiRenderFrames,
  pageTitle:document.title,webgdHook:!!window.__webgd,canvasCount:document.querySelectorAll('canvas').length,
  WebGL2Contexts:[...document.querySelectorAll('canvas')].filter(c=>{try{return !!c.getContext('webgl2')}catch{return false}}).length,
  overlayElements:document.querySelectorAll('*').length
 }));
 report.steps.push({name:'official_fixture_webgl2_hook',...fixtureState});
 if(!fixtureState.webgdHook||!fixtureState.WebGL2Contexts)throw Error('OWN_FIXTURE_HOOK_OR_WEBGL2_NOT_READY');
 const targets=browser.targets().filter(t=>t.url().startsWith('chrome-extension://'));
 const id=(targets.find(t=>t.type()==='service_worker')||targets[0])?.url().match(/^chrome-extension:\/\/([^/]+)\//)?.[1];
 report.extensionTargetTypes=targets.map(t=>({type:t.type(),urlType:t.url().split('/').slice(3).join('/').slice(0,90)}));
 if(!id)throw Error('MV3_EXTENSION_ID_OR_WORKER_NOT_FOUND');
 report.extensionIdDetected=true;
 const ui=await browser.newPage();await ui.setViewport({width:1280,height:900});
 ui.on('pageerror',e=>report.errors.push('UI_PAGE_ERROR '+String(e.message).slice(0,300)));
 ui.on('console',m=>{if(report.console.length<30)report.console.push({type:m.type(),text:m.text().slice(0,180)})});
 const response=await ui.goto('chrome-extension://'+id+'/ui/index.html',{waitUntil:'domcontentloaded',timeout:25000});
 await sleep(8500);
 const uiState=await ui.evaluate(()=>({
  title:document.title,origin:location.protocol,
  htmlLoaded:!!document.body,canvasCount:document.querySelectorAll('canvas').length,
  scriptsLoaded:[...performance.getEntriesByType('resource')].map(x=>x.name.split('/').at(-1)).filter(n=>/webgd_ui|main\.js|\.wasm/.test(n)),
  webGPUAPIPresent:!!navigator.gpu,closedShadowCount:[...document.querySelectorAll('*')].filter(x=>x.shadowRoot).length,
  textContent:(document.body?.innerText||'').slice(0,350)}));
 report.steps.push({name:'compiled_ui_loaded_real_chrome_extension',responseStatus:response?.status(),...uiState});
 const screenshot=path.join(dir,'X24-R2-FULL-RUST-WASM-UI-OWN-FIXTURE-SCREENSHOT.png');
 await ui.screenshot({path:screenshot});
 report.UIPrivateScreenshotName=path.basename(screenshot);
 await ui.mouse.click(84,38);await sleep(1300);
 const capturePanel=path.join(dir,"X24-R2-FULL-RUST-WASM-OWN-FIXTURE-CAPTURE-PANEL.png");
 await ui.screenshot({path:capturePanel});report.UIPrivateCapturePanelScreenshotName=path.basename(capturePanel);
 // Real UI button found in prior owner screenshot: target captured and listed at pixel x?65,y?178.
 await ui.mouse.click(70,178);await fixture.bringToFront();await sleep(5500);await ui.bringToFront();await sleep(3500);
 const afterCapture=path.join(dir,'X24-R2-FULL-RUST-WASM-OWN-FIXTURE-AFTER-CAPTURE.png');
 await ui.screenshot({path:afterCapture});
 report.UIPrivateAfterCaptureScreenshotName=path.basename(afterCapture);
 report.ownerRAFCountAfterCapture=await fixture.evaluate(()=>window.__x24uiRenderFrames);
 // Capture may be drawn in egui canvas with no accessible DOM; native error-free
 // plus event UI screenshot is reviewed independently rather than a fabricated data assertion.
 
 report.captureScreenshotBytes=fs.statSync(afterCapture).size;
 
 report.knownPerformanceTimingNotExposed=uiState.scriptsLoaded.length===0;
 report.integrationPass=uiState.canvasCount>=1&&report.console.some(x=>x.text.includes("event handlers installed"))&&
   report.errors.length===0;
 if(!report.integrationPass)report.errors.push('FULL_UI_NOT_CONFIRMED_CHECK_SCREENSHOT_AND_CONSOLE');
}
ramTimer=setInterval(()=>{minRam=Math.min(minRam,Math.floor(os.freemem()/1048576));
 if(minRam<=100&&!closedForRam){closedForRam=true;browser?.close().catch(()=>{})}},500);
main().catch(e=>{report.errors.push('FATAL '+String(e.message).slice(0,450))}).finally(async()=>{
 clearInterval(ramTimer);
 try{await Promise.race([browser?.close(),sleep(3200)])}catch{}
 try{server?.close()}catch{}
 report.minFreeRAMMiB=minRam;report.emergencyStopped=closedForRam;report.endedUtc=new Date().toISOString();
 report.status=report.integrationPass&&!report.errors.length?'PASS_FULL_UI_REAL_BROWSER':'FAILED_OR_PARTIAL';
 fs.writeFileSync(path.join(dir,'X24-R2-COMPILED-WEBGD-UI-OWN-FIXTURE-INTEGRATION.json'),JSON.stringify(report,null,2)+'\n');
 console.log('X24_R2_FULL_WEBGD_UI_FIXTURE '+JSON.stringify(report).slice(0,4500));
});
