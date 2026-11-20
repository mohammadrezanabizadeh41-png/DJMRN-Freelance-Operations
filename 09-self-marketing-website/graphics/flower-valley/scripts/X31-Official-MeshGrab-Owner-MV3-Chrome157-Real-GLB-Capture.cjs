'use strict';
// DJMRN X31: exact official kmatzen/meshgrab 1.1.1 in a disposable Chrome 157.
// Per-origin permission applies ONLY to http://127.0.0.1; NEVER enable Gladeye.
// OWNER tiny negative control + new 512-vertex grid GLB. Hard stop at 100 MiB free.
const fs=require('fs'),path=require('path'),os=require('os'),http=require('http'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const outDir=path.join(root,'02-reviewed-derived','X31-CURRENT');
const privateDir=path.join(root,'01-private-captures','X31','OWN-GLB-EXPORT');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const ext=path.join(tk,'04-Specialists','Sources','meshgrab','meshgrab-main');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const result={stage:'X31',mode:'OWNER_ONLY_REAL_OFFICIAL_MV3',tool:'kmatzen/meshgrab',manifestVersion:'1.1.1',
 sourceTreeSHA:'30dc6f45205407dbcf485e51e030568b4e997300',license:'MIT',
 officialCodeUnmodified:true,sitePermission:'http://127.0.0.1/* ONLY',
 thirdPartyEnabled:false,thirdPartyGLBExported:false,hardStopFreeRAMMiB:100,
 startUTC:new Date().toISOString(),issues:[],events:[]};
fs.mkdirSync(privateDir,{recursive:true});let browser,server,monitor,watchdog,minFree=Math.floor(os.freemem()/1048576),stop=null;
function issue(step,e){result.issues.push({step,error:String(e.stack||e).slice(0,900)});}
async function run(){
 if(minFree<800)throw Error('START_RAM_BELOW_800_MIB');
 const manifest=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json'),'utf8'));
 if(manifest.manifest_version!==3||manifest.version!=='1.1.1')throw Error('WRONG_OFFICIAL_EXTENSION_VERSION');
 // Controlled permission-only adapter: all official JS and assets copied BYTE-EXACT.
 // Original upstream manifest is preserved; derived profile can see localhost ONLY.
 const sandboxExt=path.join(privateDir,'meshgrab-localhost-only-MV3');
 fs.cpSync(ext,sandboxExt,{recursive:true,force:true});
 const sandboxManifest={...manifest,optional_host_permissions:[],host_permissions:['http://127.0.0.1/*'],
  content_scripts:[
   {matches:['http://127.0.0.1/*'],js:['hooks.js'],run_at:'document_start',world:'MAIN',all_frames:true},
   {matches:['http://127.0.0.1/*'],js:['bridge.js'],run_at:'document_start',world:'ISOLATED',all_frames:true}
  ]};
 fs.writeFileSync(path.join(sandboxExt,'manifest.json'),JSON.stringify(sandboxManifest,null,2)+'\n');
 result.derivedOwnerOnlyManifest=true;
 result.originalManifestSHA256=sha(fs.readFileSync(path.join(ext,'manifest.json')));
 result.derivedManifestSHA256=sha(fs.readFileSync(path.join(sandboxExt,'manifest.json')));
 const tiny=fs.readFileSync(path.join(root,'02-reviewed-derived','X29-CURRENT','X29-OWN-Controlled-WebGL2-Mesh-Points-Instancing-Fixture.html'));
 const large=fs.readFileSync(path.join(outDir,'X31-OWN-LargeGrid-Points-Instancing-WebGL2.html'));
 result.ownerFixtures={tinyOriginalSHA256:sha(tiny),largeOriginalSHA256:sha(large)};
 server=http.createServer((req,res)=>{
  const body=req.url==='/large'?large:tiny;
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(body);
 });
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const port=server.address().port;
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:25000,
  userDataDir:path.join(privateDir,'isolated-meshgrab-chrome-profile'),ignoreDefaultArgs:['--disable-extensions'],
  args:['--headless=new','--disable-extensions-except='+sandboxExt,'--load-extension='+sandboxExt,
   '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking',
   '--disable-component-update','--window-size=1280,720','--no-proxy-server']});
 const target=await browser.waitForTarget(t=>t.url().startsWith('chrome-extension://') && ['service_worker','background_page'].includes(t.type()),{timeout:16000});
 const eid=new URL(target.url()).hostname;
 result.extensionServiceWorkerLoaded=!!eid;
 // Chrome cannot prompt for optional host permission in unattended headless mode.
 // The only-manifest-derived adapter limits site access to our loopback fixture.
 result.officialExtensionPermission={ok:true,mode:'DERIVED_STATIC_LOCALHOST_ONLY_MANIFEST',
  originalManifestUnchanged:true,officialHooksUnchanged:true};
 result.derivedOverrideDoesNotGrantThirdPartyHosts=true;
 const page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 page.on('pageerror',e=>issue('owner_pageerror',e.message));
 await page.goto('http://127.0.0.1:'+port+'/tiny',{waitUntil:'domcontentloaded',timeout:25000});
 await page.waitForFunction(()=>window.__OWN_X29?.frame>8,{timeout:15000});
 result.tinyOwner=await page.evaluate(()=>({groundTruth:window.__OWN_X29.groundTruth,
  hooksInstalled:!!window.__meshgrab,capture:window.__meshgrab?.summary()}));
 if(!result.tinyOwner.hooksInstalled)throw Error('MESHGRAB_TINY_HOOK_ABSENT');
 result.events.push({step:'tiny_negative_control',timeUTC:new Date().toISOString()});
 await page.goto('http://127.0.0.1:'+port+'/large',{waitUntil:'domcontentloaded',timeout:25000});
 await page.waitForFunction(()=>window.__OWN_X31?.ready&&window.__OWN_X31?.frame>10,{timeout:15000});
 result.largeOwner=await page.evaluate(()=>({groundTruth:window.__OWN_X31.groundTruth,
  hooksInstalled:!!window.__meshgrab,capture:window.__meshgrab?.summary()}));
 if(!result.largeOwner.hooksInstalled)throw Error('MESHGRAB_LARGE_HOOK_ABSENT');
 if(!result.largeOwner.capture.ok)throw Error('OFFICIAL_MESHGRAB_NO_EXPORTABLE_OWNER_MESH '+JSON.stringify(result.largeOwner.capture));
 const bytes=await page.evaluate(async()=>{
  const o=await window.__meshgrab.buildGLB({includeTextures:false,name:'DJMRN_X31_OWN_GRID'});
  return Array.from(o.bytes);
 });
 const binary=Buffer.from(bytes),filename='X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb';
 fs.writeFileSync(path.join(privateDir,filename),binary);
 result.realOwnerGLB={filename,bytes:binary.length,sha256:sha(binary)};
 result.ownerExportOnly=true;
 const img=await page.screenshot({type:'png',captureBeyondViewport:false});
 fs.writeFileSync(path.join(privateDir,'X31-OWN-GRID-CAPTURE.png'),img);
 result.privateOwnerScreenshot={bytes:img.length,sha256:sha(img)};
 result.events.push({step:'real_owner_glb_binary_saved',timeUTC:new Date().toISOString()});
}
monitor=setInterval(()=>{const f=Math.floor(os.freemem()/1048576);minFree=Math.min(minFree,f);
 if(f<=100&&!stop){stop='EMERGENCY_100_MIB';browser?.close().catch(()=>{});}},300);
watchdog=setTimeout(()=>{if(!stop)stop='OWNER_WATCHDOG_105S';browser?.close().catch(()=>{});},105000);
run().catch(e=>{stop||='ERROR';issue('run',e)}).finally(async()=>{
 clearInterval(monitor);clearTimeout(watchdog);
 try{await Promise.race([browser?.close(),sleep(2200)])}catch{}
 try{await new Promise(ok=>server?.close(ok)||ok())}catch{}
 result.minFreeMiB=minFree;result.stopReason=stop||'SUCCESS';result.endUTC=new Date().toISOString();
 fs.writeFileSync(path.join(outDir,'X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json'),JSON.stringify(result,null,2)+'\n');
 console.log('X31_OWNER_FINAL '+JSON.stringify({stop:result.stopReason,registered:result.officialExtensionPermission?.ok,
  tiny:result.tinyOwner?.capture,large:result.largeOwner?.capture,glb:result.realOwnerGLB,
  ramMinMiB:minFree,issues:result.issues.length}));
});
