'use strict';
// X32 owner-only WebGL2/ANGLE surface fingerprint, no RenderDoc attachment, no sandbox relaxation.
// Tests browser GPU backend separately from the proven native D3D11 .rdc capture.
const fs=require('fs'),os=require('os'),path=require('path'),http=require('http'),crypto=require('crypto');
const base=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(base,'02-reviewed-derived','X32-CURRENT');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const body=fs.readFileSync(path.join(base,'02-reviewed-derived','X31-CURRENT','X31-OWN-LargeGrid-Points-Instancing-WebGL2.html'));
const result={stage:'X32',mode:'OWNER_CHROME157_WEBGL2_ANGLE_READONLY',chromePath:chrome,
 experimentalChromeFlag:'--use-angle=d3d11',safety:{noGPU_sandboxRelaxation:true,noRenderDocInjectionIntoChrome:true,
 noPublicWebsiteOrCommercialCapture:true,noWindowsGraphicsDriverChanges:true},startedUTC:new Date().toISOString(),issues:[]};
let srv,browser,stop=null,monitor,minFree=Math.floor(os.freemem()/1048576);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 if(minFree<800)throw Error('RAM_START_LT_800');
 srv=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-store'});res.end(body)});
 await new Promise(ok=>srv.listen(0,'127.0.0.1',ok));
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:25000,
  userDataDir:path.join(base,'01-private-captures','X32','OWN-RENDERDOC','isolated-Chrome-ANGLE-probe'),
  args:['--headless=new','--use-angle=d3d11','--no-first-run','--no-default-browser-check',
   '--disable-sync','--disable-background-networking','--disable-component-update','--no-proxy-server']});
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:'+srv.address().port+'/',{waitUntil:'domcontentloaded',timeout:20000});
 await page.waitForFunction(()=>window.__OWN_X31?.ready && window.__OWN_X31?.frame>15,{timeout:18000});
 result.ownerScene=await page.evaluate(()=>{
 const gl=document.querySelector('canvas').getContext('webgl2');
 const ex=gl.getExtension('WEBGL_debug_renderer_info');
 return {ready:window.__OWN_X31?.ready,drawnFrames:window.__OWN_X31?.frame,
  groundTruth:window.__OWN_X31?.groundTruth,
  defaultVendor:gl.getParameter(gl.VENDOR),defaultRenderer:gl.getParameter(gl.RENDERER),
  unmaskedVendor:ex?gl.getParameter(ex.UNMASKED_VENDOR_WEBGL):null,
  unmaskedRenderer:ex?gl.getParameter(ex.UNMASKED_RENDERER_WEBGL):null,
  webglVersion:gl.getParameter(gl.VERSION),glslVersion:gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
  antialias:gl.getContextAttributes()?.antialias,rendererExtensionAvailable:!!ex};
 });
 const cdp=await browser.target().createCDPSession();
 try{const g=await cdp.send('SystemInfo.getInfo');
  result.browserGPU={devices:g.gpu?.devices?.map(x=>({vendorId:x.vendorId,deviceId:x.deviceId,deviceString:x.deviceString,
   vendorString:x.vendorString,driverVersion:x.driverVersion})),featureStatus:g.gpu?.featureStatus,auxAttributes:g.gpu?.auxAttributes};
 }catch(e){result.systemInfoError=String(e).slice(0,250)}
 result.ownerFixtureSHA256=crypto.createHash('sha256').update(body).digest('hex');
}
monitor=setInterval(()=>{const f=Math.floor(os.freemem()/1048576);minFree=Math.min(minFree,f);
 if(f<=100&&!stop){stop='EMERGENCY_FREE_RAM_100MiB';browser?.close().catch(()=>{});}},250);
main().catch(e=>{stop||='ERROR';result.issues.push(String(e.stack||e).slice(0,850))}).finally(async()=>{
 clearInterval(monitor);try{await Promise.race([browser?.close(),sleep(2000)])}catch{}
 try{await new Promise(ok=>srv?.close(ok)||ok())}catch{}
 result.stopReason=stop||'SUCCESS';result.minFreeMiB=minFree;result.finishedUTC=new Date().toISOString();
 fs.writeFileSync(path.join(dir,'X32-OWN-CHROME157-ANGLE-D3D11-WEBGL2-FEASIBILITY.json'),JSON.stringify(result,null,2)+'\n');
 console.log('X32_ANGLE_PROBE '+JSON.stringify({stop:result.stopReason,webgl2:result.ownerScene?.ready,
  renderer:result.ownerScene?.unmaskedRenderer,gpu:result.browserGPU?.devices?.[0],ram:minFree,issues:result.issues}));
});
