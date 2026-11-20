'use strict';
// DJMRN X29 — original owner WebGL2 ground-truth fixture + official MIT WebGLRipper MV3.
// Anonymous isolated Chromium; no personal Chrome; saves ONLY OWNER-generated geometry.
const fs=require('fs'),os=require('os'),path=require('path'),http=require('http'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X29-CURRENT');
const privateDir=path.join(root,'01-private-captures','X29','own-fixture-export');
const source=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Specialists','Sources','WebGLRipper','source-7fe32c9616f5');
const chrome=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
fs.mkdirSync(privateDir,{recursive:true});
let browser,server,stopReason=null,minFree=Math.floor(os.freemem()/1048576),watch;
const result={stage:'X29',scope:'OWN_SYNTHETIC_GEOMETRY_ONLY',source:'official int3re/WebGLRipper commit 7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849, v1.3.2 MIT',chrome:'157 isolated',startUTC:new Date().toISOString(),guardRAMMiB:100,issues:[]};
async function main(){
 if(!fs.existsSync(path.join(source,'manifest.json')))throw Error('PINNED_SOURCE_NOT_PRESENT');
 if(os.freemem()/1048576<450)throw Error('RAM_BELOW_SAFE_START_450MIB');
 const html=fs.readFileSync(path.join(dir,'X29-OWN-Controlled-WebGL2-Mesh-Points-Instancing-Fixture.html'));
 server=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html)});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const port=server.address().port;
 const profile=path.join(privateDir,'isolated-chrome-profile');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:20000,
   ignoreDefaultArgs:['--disable-extensions'],userDataDir:profile,
   args:['--headless=new','--disable-extensions-except='+source,'--load-extension='+source,
   '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking',
   '--disable-component-update','--window-size=1280,720','--no-sandbox']});
 result.extensionWorkerPresent=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 const cdpr=await browser.target().createCDPSession();
 await cdpr.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:privateDir,eventsEnabled:true});
 const dl=[];
 cdpr.on('Browser.downloadWillBegin',e=>dl.push({event:'begin',name:e.suggestedFilename}));
 cdpr.on('Browser.downloadProgress',e=>{if(e.state==='completed')dl.push({event:'complete',guid:e.guid});});
 const page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 const errs=[];page.on('pageerror',e=>errs.push(String(e.message).slice(0,130)));
 await page.goto('http://127.0.0.1:'+port+'/',{waitUntil:'domcontentloaded',timeout:20000});
 await page.waitForFunction(()=>window.__OWN_X29?.ready&&window.__OWN_X29.frame>15,{timeout:20000});
 result.groundTruth=await page.evaluate(()=>window.__OWN_X29);
 const link=await page.evaluate(()=>{
  window.__DJMRN_X29_EVENTS=[];
  document.addEventListener('webglripper:ext',e=>{try{
    const m=JSON.parse(e.detail);window.__DJMRN_X29_EVENTS.push({type:m.type,state:m.state,text:typeof m.text==='string'?m.text.slice(0,180):null,contexts:m.contexts,canvasCount:m.canvases?.length});
   }catch{}});
  document.dispatchEvent(new CustomEvent('webglripper:page',{detail:JSON.stringify({type:'hello'})}));
  return !!document.querySelector('canvas');
 });
 await sleep(600);
 result.extensionHello=await page.evaluate(()=>window.__DJMRN_X29_EVENTS);
 // Official engine handles the user's own draw call with the same settings keys as upstream test suite.
 await page.evaluate(()=>{
  document.dispatchEvent(new CustomEvent('webglripper:page',{detail:JSON.stringify({
    type:'capture',locale:'en',
    settings:{show_preview:false,export_format:'both',export_layout:'both',should_download_zip:true,
      skip_duplicates:false,skip_overlays:false,center_model:false,do_model_view_matrix:true,
      weld_vertices:false,export_camera:false,history_enabled:false}
  })}));
 });
 let done=false;let waited=0;
 while(waited<30000&&!stopReason){
   await sleep(500);waited+=500;
   const files=fs.readdirSync(privateDir).filter(x=>/\.(zip|glb)$/i.test(x));
   if(files.length&&dl.some(x=>x.event==='complete')){done=true;break}
 }
 await sleep(750);
 const artifacts=fs.readdirSync(privateDir).filter(x=>/\.(zip|glb|obj)$/i.test(x)).map(name=>{
  const b=fs.readFileSync(path.join(privateDir,name));
  return {name,bytes:b.length,sha256:sha(b),format:path.extname(name).slice(1)};
 });
 result.exports=artifacts;result.downloadEvents=dl;
 result.extensionEventsAfter=await page.evaluate(()=>window.__DJMRN_X29_EVENTS);
 result.consoleErrors=errs;
 result.webglVersion=await page.evaluate(()=>document.querySelector('canvas').getContext('webgl2').getParameter(0x1F02));
 result.completedDownload=done;
 if(!done)throw Error('OWN_RIPPER_EXPORT_NO_DOWNLOAD_AFTER_30S');
}
watch=setInterval(()=>{const now=Math.floor(os.freemem()/1048576);minFree=Math.min(minFree,now);
 if(now<=100&&!stopReason){stopReason='USER_RAM_EMERGENCY_100_MIB';browser?.close().catch(()=>{})}},350);
main().catch(e=>{stopReason||='ERROR';result.issues.push(String(e.stack||e).slice(0,1600))}).finally(async()=>{
 clearInterval(watch);
 try{await Promise.race([browser?.close(),sleep(2000)])}catch{}
 try{await new Promise(r=>server?.close(()=>r()))}catch{}
 result.stopReason=stopReason||'OWN_FIXTURE_EXPORT_COMPLETED';
 result.minFreeRAMMiB=minFree;result.endUTC=new Date().toISOString();
 result.originalCommercialWebSiteDataExported=false;result.scopeRights='OWNER_GENERATED_ONLY';
 const file=path.join(dir,'X29-OWN-RIPPER-REAL-CHROME-EXPORT-INDEX.json');
 fs.writeFileSync(file,JSON.stringify(result,null,2)+'\n');
 console.log('X29_OWN_REAL_EXPORT '+JSON.stringify({stop:result.stopReason,completed:result.completedDownload,files:result.exports,minRam:minFree,
  extensionWorkers:result.extensionWorkerPresent,extensionHello:result.extensionHello,events:result.extensionEventsAfter?.slice(-7),issues:result.issues}));
});
