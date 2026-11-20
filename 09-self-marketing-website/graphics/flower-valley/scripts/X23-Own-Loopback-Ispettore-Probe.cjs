'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),os=require('os'),crypto=require('crypto');
const home=os.homedir(),root=path.join(home,'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const folder=path.join(root,'02-reviewed-derived','X23-CURRENT'),priv=path.join(root,'01-private-captures','X23');
fs.mkdirSync(folder,{recursive:true});fs.mkdirSync(priv,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const dist=path.join(tk,'04-Specialists','Sources','Ispettore','ispettore-0.1.1','dist');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const fixture=fs.readFileSync(path.join(root,'02-reviewed-derived','X22-CURRENT','X22-OWN-Original-WebGL2-Fixture.html'),'utf8');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const result={stage:'X23',mode:'OWNER_OWN_LOOPBACK_TEST',startedUtc:new Date().toISOString(),issues:[],ramMinMiB:Math.round(os.freemem()/1048576)};
let server,browser,guard;
async function main(){
 if(os.freemem()<800*1048576)throw Error('RAM_PRECHECK_FAILED');
 let man=JSON.parse(fs.readFileSync(path.join(dist,'manifest.json'),'utf8'));
 result.manifest={version:man.version,manifest_version:man.manifest_version,permissions:man.permissions,hostPermissions:man.host_permissions};
 if(man.manifest_version!==3)throw Error('MV3_MANIFEST_REQUIRED');
 server=http.createServer((req,res)=>{res.setHeader('content-type','text/html; charset=utf-8');res.end(fixture)});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],timeout:20000,
 userDataDir:path.join(folder,'X23-Isolated-Chrome-Profile'),
 args:['--headless=new','--disable-extensions-except='+dist,'--load-extension='+dist,'--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=900,700']});
 await sleep(900);
 result.serviceWorkerTargets=browser.targets().filter(x=>x.type()==='service_worker'&&x.url().startsWith('chrome-extension://')).map(x=>x.url().slice(0,80));
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load',timeout:15000});
 await sleep(1000);
 const p=await page.evaluate(()=>{
  let api=window.__ISPETTORE__;
  return {installed:!!api,keys:api?Object.keys(api):[],canvas:!!document.querySelector('canvas'),
   glsl:window.__djFixtureGl?.getParameter(window.__djFixtureGl.SHADING_LANGUAGE_VERSION)||null,
   ready:!!window.__djFixtureReady,
   summary:api?.getWebGlJournalSummary?.()||null,
   snapshot:api?.getSnapshot?.({ping:true,skipGpuSnapshot:true})||null};
 });
 result.pre={installed:p.installed,keys:p.keys,canvas:p.canvas,glsl:p.glsl,ready:p.ready,
  summary:p.summary,snapshotKeys:p.snapshot?Object.keys(p.snapshot):[]};
 if(!p.installed)throw Error('ISPETTORE_API_NOT_INJECTED');
 if(!p.summary?.length)throw Error('ISPETTORE_NO_WEBGL_JOURNAL');
 const arm=await page.evaluate(()=>window.__ISPETTORE__.armWebGlCapture());
 result.arm=arm;
 if(!arm?.applied)throw Error('ISPETTORE_ARM_NOT_APPLIED');
 await sleep(900);
 const journal=await page.evaluate(()=>{
  let api=window.__ISPETTORE__,summary=api.getWebGlJournalSummary(),
    x=api.getWebGlJournalPackage();
  return {summary,package_:x};
 });
 result.postSummary=journal.summary;
 const raw=journal.package_;
 if(!raw)throw Error('ISPETTORE_NO_FRAME_PACKAGE');
 const rawText=JSON.stringify(raw);
 const privatePath=path.join(priv,'X23-OWN-FIXTURE-ISPETTORE-FRAME-RAW.json');fs.writeFileSync(privatePath,rawText);
 result.rawSha256=hash(Buffer.from(rawText));result.rawBytes=Buffer.byteLength(rawText);
 result.packageKeys=Object.keys(raw);
 result.packageTypes=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,Array.isArray(v)?'array:'+v.length:typeof v]));
 result.commands=raw.commands?.length??raw.events?.length??null;
 result.status='PASS_OWNER_FIXTURE';
}
guard=setInterval(()=>{result.ramMinMiB=Math.min(result.ramMinMiB,Math.round(os.freemem()/1048576));if(os.freemem()<100*1048576){result.issues.push('EMERGENCY_RAM');browser?.close().catch(()=>{})}},400);
main().catch(e=>{result.status='BLOCKED';result.issues.push(String(e.message).slice(0,250))}).finally(async()=>{
 clearInterval(guard);try{await Promise.race([browser?.close(),sleep(2200)])}catch{}try{server?.close()}catch{}
 result.endedUtc=new Date().toISOString();
 fs.writeFileSync(path.join(folder,'X23-OWN-FIXTURE-ISPETTORE-ACCEPTANCE.json'),JSON.stringify(result,null,2));
 console.log('X23_OWN_RESULT '+JSON.stringify(result).slice(0,3000));
});
