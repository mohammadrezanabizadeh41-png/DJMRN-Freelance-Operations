'use strict';
// DJMRN X22: one bounded anonymous ordinary WebGL frame on public Gladeye homepage.
// Spector.js 0.9.33 installed extension is enabled in a dedicated temporary profile only.
// Raw third-party GPU captured metadata stays private, public report has no shader sources/pixels.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(root,'02-reviewed-derived','X22-CURRENT'),privateDir=path.join(root,'01-private-captures','X22');
fs.mkdirSync(derived,{recursive:true});fs.mkdirSync(privateDir,{recursive:true});
const toolkit=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const ext=path.join(toolkit,'01-Analysis','Extensions','Spector.js');
const chrome=path.join(toolkit,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(toolkit,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const bundle=fs.readFileSync(path.join(ext,'spector.bundle.js'),'utf8');
const reportFile=path.join(derived,'X22-LIVE-PUBLIC-SPECTOR-STEADY-FRAME-METADATA.json');
const rawFile=path.join(privateDir,'X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const report={stage:'X22',scope:'One second warmed public home WebGL frame, after 11s, no auth',tool:'Spector.js 0.9.33 MV3 + standalone API',
startedUtc:new Date().toISOString(),elapsedSeconds:null,isolatedExtensionServiceWorker:false,canvas:null,
capture:null,issues:[],minimumFreeRamMiB:Math.round(os.freemem()/1048576),browserClosed:false,
privacy:'Raw capture retains privately on laptop only; no shader contents, textures, screenshots, cookies, headers or authenticated data copied to public report'};
let browser,watchdog,monitor,closing=false;
function getSummary(raw){
 const cmds=Array.isArray(raw?.commands)?raw.commands:[];
 const counts={},sampleCommands=[];
 const drawReg=/^draw(Elements|Arrays|Range|Buffers)/;
 const stateCommands={};
 const picks=/^(useProgram|bindFramebuffer|bindTexture|activeTexture|framebufferTexture2D|blendFunc|blendEquation|enable|disable|depthFunc|colorMask|depthMask|viewport|scissor|uniform|vertexAttrib|draw)/;
 for(const c of cmds){
  const name=String(c.name||c.commandName||'unknown').slice(0,120);
  counts[name]=(counts[name]||0)+1;
  if(picks.test(name))stateCommands[name]=(stateCommands[name]||0)+1;
  if(sampleCommands.length<10)sampleCommands.push(name);
 }
 const draws=Object.keys(counts).filter(n=>drawReg.test(n)).reduce((a,k)=>a+counts[k],0);
 const uniquePrograms=new Set();
 const objectKeysBySection={};
 for(const key of ['canvas','context','initState','endState','analyses','frameMemory','memory']){
   const v=raw?.[key];objectKeysBySection[key]=v&&typeof v==='object'?Object.keys(v).slice(0,30):[];
 }
 return {status:'CAPTURED',totalCommands:cmds.length,drawCallCount:draws,commandCounts:counts,renderRelevantCommands:stateCommands,
   sectionKeys:objectKeysBySection,hasInitialState:!!raw?.initState,hasEndState:!!raw?.endState,
   observedCanvas:{width:raw?.canvas?.width||null,height:raw?.canvas?.height||null},
   actualStartTimePresent:typeof raw?.startTime==='number',actualEndTimePresent:typeof raw?.endTime==='number',
   topLevelKeys:Object.keys(raw||{}).slice(0,32),truncatedPossible:cmds.length>=10000,
   numberOfProgramCandidates:null};
}
async function main(){
 if(os.freemem()<750*1048576)throw Error('ABORT_FREE_RAM_BELOW_750MIB');
 const m=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json'),'utf8'));
 if(m.version!=='0.9.33'||m.manifest_version!==3)throw Error('WRONG_LOCAL_SPECTOR_VERSION');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],timeout:19000,
  userDataDir:path.join(derived,'X22-Isolated-Chrome-Profile'),
  args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,
  '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update',
  '--window-size=1280,720']});
 await sleep(1000);report.isolatedExtensionServiceWorker=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 const page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 page.setDefaultTimeout(14000);
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:21000});
 let state=null;
 for(let i=0;i<14;i++){
  await sleep(400);
  state=await page.evaluate(()=>{
    const c=document.querySelector('canvas');return{canvas:!!c,width:c?.width||null,height:c?.height||null,
    ready:c?!!c.getContext('webgl2'):false,
    jsThreeInternal:typeof window.__THREE__==='string'?window.__THREE__:null,
    nextVersion:typeof window.next?.version==='string'?window.next.version:null};
  });
  if(state?.canvas&&state.ready)break;
 }
 report.canvas=state; await page.mouse.move(250,300); await sleep(10500); await page.mouse.move(950,420); await sleep(1000);
 if(!state?.ready)throw Error('LIVE_WEBGL2_CANVAS_NOT_READY');
 // Do NOT inject into the user's personal Chrome browser. Only disposable anonymous Chrome session.
 await page.addScriptTag({content:bundle});
 const api=await page.evaluate(()=>typeof window.SPECTOR?.Spector);
 if(api!=='function')throw Error('SPECTOR_SCRIPT_NOT_ACTIVE');
 await page.evaluate(()=>{
  const sp=new window.SPECTOR.Spector();window.__djX22Spector=sp;window.__djX22Capture=null;
  sp.onCapture.add(c=>{window.__djX22Capture=c});sp.spyCanvases();
 });
 await sleep(300);
 report.captureRequestedUtc=new Date().toISOString();
 await page.evaluate(()=>window.__djX22Spector.captureNextFrame(document.querySelector('canvas'),true));
 let exists=false;
 for(let i=0;i<22;i++){
  await sleep(350);
  try{exists=await page.evaluate(()=>!!window.__djX22Capture)}catch{break}
  if(exists)break;
 }
 if(!exists)throw Error('X22_LIVE_FRAME_CAPTURE_TIMEOUT_8SEC');
 const raw=await page.evaluate(()=>window.__djX22Capture);
 report.capture=getSummary(raw);
 fs.writeFileSync(rawFile,JSON.stringify(raw));
 report.rawPrivateSHA256=hash(fs.readFileSync(rawFile));
 report.rawPrivateBytes=fs.statSync(rawFile).size;
}
watchdog=setTimeout(()=>{report.issues.push({kind:'HARD_TIMEOUT_55_SEC'});browser?.close().catch(()=>{})},55000);
monitor=setInterval(()=>{
 report.minimumFreeRamMiB=Math.min(report.minimumFreeRamMiB,Math.round(os.freemem()/1048576));
 if(os.freemem()<100*1048576){report.issues.push({kind:'RAM_EMERGENCY_100MIB'});browser?.close().catch(()=>{})}
},500);
main().catch(e=>{report.issues.push({kind:'CAPTURE_ERROR',name:e.name,message:String(e.message).slice(0,210)})}).finally(async()=>{
 clearInterval(monitor);clearTimeout(watchdog);
 try{await Promise.race([browser?.close(),sleep(2500)]);report.browserClosed=true}catch(e){report.issues.push({kind:'CLEANUP_ERROR'})}
 report.elapsedSeconds=Math.round((Date.now()-Date.parse(report.startedUtc))/1000);
 report.result=report.capture?.status==='CAPTURED'&&report.capture.drawCallCount>0?'X22_LIVE_FRAME_PASS':'X22_LIVE_FRAME_BLOCKED';
 fs.writeFileSync(reportFile,JSON.stringify(report,null,2));
 console.log('X22_LIVE_RESULT '+JSON.stringify({result:report.result,seconds:report.elapsedSeconds,extensionActive:report.isolatedExtensionServiceWorker,
  canvas:report.canvas,frame:report.capture,issues:report.issues,minFreeRamMiB:report.minimumFreeRamMiB,rawBytes:report.rawPrivateBytes||0}));
});
