'use strict';
// DJMRN-owned WebGL2 fixture capture using OFFICIAL binbuf/webgl-model-extractor MV3 v0.7.0,
// built extension already present; isolated Chrome 157, RAM 100MiB hard stop.
// Does NOT visit/export third-party proprietary meshes, shader sources or textures.
const fs=require('fs'),path=require('path'),os=require('os'),http=require('http'),crypto=require('crypto');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X30-CURRENT');
const P=path.join(R,'01-private-captures','X30','OWN-GLB-EXPORT');
fs.mkdirSync(P,{recursive:true});
const ext=path.join(tk,'04-Specialists','Sources','WebGLModelExtractor','webgl-model-extractor-main','dist','chrome');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const output={stage:'X30',source:'binbuf/webgl-model-extractor',version:'0.7.0',mode:'OWN_SYNTHETIC_FIXTURE_ONLY',
  target:'127.0.0.1',originalVendorContentExported:false,hardRAMStopMiB:100,startUTC:new Date().toISOString(),issues:[],events:[]};
let server,browser,mem,watch,stop=null,minFree=Math.floor(os.freemem()/1048576);
function issue(phase,e){output.issues.push({phase,message:String(e.stack||e).slice(0,600)})}
async function main(){
 if(minFree<800)throw new Error('INSUFFICIENT_FREE_RAM_START_800MIB');
 const m=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json'),'utf8'));
 if(m.manifest_version!==3||m.version!=='0.7.0')throw Error('OFFICIAL_DIST_MANIFEST_UNEXPECTED');
 const fixture=fs.readFileSync(path.join(R,'02-reviewed-derived','X29-CURRENT','X29-OWN-Controlled-WebGL2-Mesh-Points-Instancing-Fixture.html'));
 server=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(fixture)});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const uri='http://127.0.0.1:'+server.address().port+'/';
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:25000,
   userDataDir:path.join(P,'isolated-chrome-profile'),ignoreDefaultArgs:['--disable-extensions'],
   args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,
     '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
 const page=await browser.newPage();
 await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 page.on('pageerror',e=>issue('pageerror',e.message));
 await page.goto(uri,{waitUntil:'domcontentloaded',timeout:25000});
 await page.waitForFunction(()=>window.__OWN_X29?.ready && window.__OWN_X29?.frame>20,{timeout:20000});
 output.fixture=await page.evaluate(()=>window.__OWN_X29);
 await page.waitForFunction(()=>window.__webglRipper&&window.__webglRipper.contexts>0,{timeout:16000});
 output.ripperAtStart=await page.evaluate(()=>({
   active:!!window.__webglRipper,
   contexts:window.__webglRipper?.contexts,
   gpuDevices:window.__webglRipper?.gpuDevices,
   settingsKeys:Object.keys(window.__webglRipper?.settings||{}),
   diagnosticsAvailable:typeof window.__webglRipper?.diagnostics==='function'
 }));
 await page.evaluate(()=>{window.__x30Capture={download:null,stages:[]};window.addEventListener('message',ev=>{
   const a=ev.data;if(a?.channel!=='webgl-ripper')return;
   if(a.type==='main:download')window.__x30Capture.download=a.payload;
   if(a.type==='main:status')window.__x30Capture.stages.push(a.payload);
 });});
 output.captureRequestedUTC=new Date().toISOString();
 await page.evaluate(()=>window.__webglRipper.capture());
 let ready=false;
 for(let i=0;i<130&&!stop;i++){
   await sleep(250);
   const st=await page.evaluate(()=>({ok:!!window.__x30Capture.download,
     fail:window.__x30Capture.stages.some(s=>s.stage==='failed'||s.stage==='cancelled'),
     count:window.__x30Capture.stages.length}));
   if(st.ok){ready=true;break}
   if(st.fail){break}
 }
 const h=await page.evaluate(()=>({download:window.__x30Capture.download,stages:window.__x30Capture.stages,
   logs:window.__webglRipper?.diagnostics?.()}));
 output.captureStages=h.stages;
 output.captureStatus=ready?'SUCCESS':stop||'NO_DOWNLOAD';
 output.diagnosticsSample=String(h.logs||'').slice(-5500); // OWN fixture diagnostics only
 if(!ready)throw Error('OFFICIAL_EXTENSION_CAPTURE_FAILED '+JSON.stringify(h.stages.slice(-4)));
 const u=h.download?.url;
 if(typeof u!=='string'||!u.startsWith('blob:'))throw Error('NO_BLOB_DOWNLOAD_URL');
 const blob=await page.evaluate(async url=>{
   const resp=await fetch(url);return Array.from(new Uint8Array(await resp.arrayBuffer()));
 },u);
 const binary=Buffer.from(blob);
 const filename='X30-OWN-binbuf-WebGLModelExtractor-0.7.0-EXACT-REAL-OUTPUT.glb';
 const target=path.join(P,filename);
 fs.writeFileSync(target,binary);
 output.realGLB={name:filename,bytes:binary.length,sha256:sha(binary)};
 output.originalOwnerSourceFixtureSHA256=sha(fixture);
 output.privateExportOnly=true;
 output.saveCount=1;
}
mem=setInterval(()=>{const ram=Math.floor(os.freemem()/1048576);minFree=Math.min(minFree,ram);
 if(ram<=100&&!stop){stop='RAM_EMERGENCY_100_MIB';browser?.close().catch(()=>{})}},330);
watch=setTimeout(()=>{if(!stop)stop='WATCHDOG_95S';browser?.close().catch(()=>{})},95000);
main().catch(e=>{stop||='ERROR';issue('main',e)}).finally(async()=>{
 clearInterval(mem);clearTimeout(watch);
 try{await Promise.race([browser?.close(),sleep(2500)])}catch{}
 try{await new Promise(ok=>server?.close(ok)||ok())}catch{}
 output.stop=stop||'SUCCESS';output.minFreeRAMMiB=minFree;output.endUTC=new Date().toISOString();
 fs.writeFileSync(path.join(D,'X30-REAL-OFFICIAL-EXTENSION-OWN-GLB-CAPTURE-INDEX.json'),JSON.stringify(output,null,2)+'\n');
 console.log('X30_OWN_CAPTURE_FINAL '+JSON.stringify({status:output.stop,contexts:output.ripperAtStart?.contexts,
  stages:output.captureStages?.map(x=>x.stage),glb:output.realGLB,ram:minFree,issues:output.issues.length}));
});
