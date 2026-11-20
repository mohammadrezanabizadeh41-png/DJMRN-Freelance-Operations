'use strict';
// DJMRN X30 A/B: compare isolated headless browser public-site readiness
// with vs without official binbuf MV3 extension. Request metadata only; no asset export.
const fs=require('fs'),path=require('path'),os=require('os');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X30-CURRENT');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const ext=path.join(tk,'04-Specialists','Sources','WebGLModelExtractor','webgl-model-extractor-main','dist','chrome');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sleep=t=>new Promise(r=>setTimeout(r,t));
const report={stage:'X30-LIVE-BROWSER-A-B',timestamp:new Date().toISOString(),page:'https://www.gladeye.com/',modes:[]};
let brow,stop=null,mem,minRAM=Math.round(os.freemem()/1048576);
async function mode(withExt){
 if(os.freemem()/1048576<750)throw new Error('LOW_RAM_BEFORE_A_B_START');
 const type=withExt?'WITH_OFFICIAL_BINBUF_MV3':'NO_EXTENSION_BASELINE';
 const out={mode:type,startUtc:new Date().toISOString(),responses:[],failedRequests:[],pageErrors:[],consoleErrors:[],snapshots:[]};
 const profile=path.join(R,'01-private-captures','X30','AB-DIAG-'+type);
 const args=['--headless=new','--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720','--no-proxy-server'];
 if(withExt)args.push('--disable-extensions-except='+ext,'--load-extension='+ext);
 brow=await puppeteer.launch({executablePath:chrome,headless:true,timeout:25000,ignoreDefaultArgs:withExt?['--disable-extensions']:[],
 userDataDir:profile,args});
 const page=await brow.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 const normalize=u=>{try{const x=new URL(u);return x.origin+x.pathname}catch{return String(u).slice(0,80)}};
 const initiated=[];
 page.on('request',r=>{initiated.push({path:normalize(r.url()),kind:r.resourceType()})});
 page.on('response',r=>{if(out.responses.length<100)out.responses.push({path:normalize(r.url()),status:r.status(),type:r.request().resourceType()})});
 page.on('requestfailed',r=>{if(out.failedRequests.length<100)out.failedRequests.push({path:normalize(r.url()),error:r.failure()?.errorText})});
 page.on('pageerror',e=>{if(out.pageErrors.length<25)out.pageErrors.push(String(e.message).slice(0,200))});
 page.on('console',m=>{if(m.type()==='error'&&out.consoleErrors.length<25)out.consoleErrors.push(m.text().slice(0,180))});
 try{await page.goto(report.page,{waitUntil:'domcontentloaded',timeout:38000});out.navigation='DOM_CONTENT_LOADED'}
 catch(e){out.navigation='FAILED:'+String(e.message).slice(0,120)}
 for(const sec of [1,5,12,22]){
  await sleep(sec===1?1000:(sec-[1,5,12,22][[1,5,12,22].indexOf(sec)-1])*1000);
  const val=await page.evaluate(()=>({
    ready:document.readyState,canvas:document.querySelectorAll('canvas').length,
    gl:!!document.querySelector('canvas')?.getContext('webgl2'),three:window.__THREE__||null,
    officialExtractor:!!window.__webglRipper,officialContexts:window.__webglRipper?.contexts||null,
    scripts:document.scripts.length,
    sampleScripts:[...document.scripts].filter(x=>x.src).slice(0,4).map(x=>{try{return new URL(x.src).pathname}catch{return ''}}),
    bodyLength:document.body?.innerText?.length||0
  })).catch(e=>({exception:String(e.message).slice(0,100)}));
  out.snapshots.push({second:sec,...val});
  console.log('X30_AB_'+type+'_'+sec+'S '+JSON.stringify({s:sec,c:val.canvas,gl:val.gl,three:val.three,contexts:val.officialContexts,
  responses:out.responses.length,failed:out.failedRequests.length,pageErrors:out.pageErrors.length,freeRam:Math.round(os.freemem()/1048576)}))
  if(stop)break;
 }
 const completed=new Set(out.responses.map(x=>x.path));out.pending=initiated.filter(x=>!completed.has(x.path));
 out.endUtc=new Date().toISOString();report.modes.push(out);
 await brow.close();brow=null;
 await sleep(1200);
}
mem=setInterval(()=>{const f=Math.round(os.freemem()/1048576);minRAM=Math.min(minRAM,f);
if(f<=100&&!stop){stop='RAM_EMERGENCY_100MIB';brow?.close().catch(()=>{})}},350);
(async()=>{await mode(true)})().catch(e=>{stop||='ERROR';report.fatal=String(e.stack||e).slice(0,650)}).finally(async()=>{
 clearInterval(mem);try{await brow?.close()}catch{}
 report.stop=stop||'A_B_COMPLETED';report.minFreeRamMiB=minRAM;
 fs.writeFileSync(path.join(D,'X30-LIVE-DIRECT-NO-PROXY-EXTENSION-LOAD-DIAGNOSTIC.json'),JSON.stringify(report,null,2)+'\n');
 console.log('X30_AB_FINAL '+JSON.stringify({status:report.stop,minRAM,rows:report.modes.map(x=>({mode:x.mode,ready:x.snapshots.at(-1),responses:x.responses.length,failed:x.failedRequests.length,errors:x.pageErrors.slice(0,5),pending:x.pending?.slice(0,4)}))}))
});
