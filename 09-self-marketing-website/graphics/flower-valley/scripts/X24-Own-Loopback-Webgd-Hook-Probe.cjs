'use strict';
// X24 owner-authored safe feasibility probe of official unbuilt webgd JS-only MV3 capture hook.
const fs=require('fs'),path=require('path'),os=require('os'),http=require('http'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const out=path.join(root,'02-reviewed-derived','X24-CURRENT'),secret=path.join(root,'01-private-captures','X24');fs.mkdirSync(out,{recursive:true});fs.mkdirSync(secret,{recursive:true});
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const ext=path.join(tk,'04-Specialists','Sources','webgd','webgd-main','extension');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms)), sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const fixture=fs.readFileSync(path.join(root,'02-reviewed-derived','X22-CURRENT','X22-OWN-Original-WebGL2-Fixture.html'),'utf8');
let server,browser,timer,minFree=Math.round(os.freemem()/1048576),abortReason='';
let result={stage:'X24',mode:'OWN_WEBGL2_FIXTURE_WEBGD_JS_HOOK_ONLY',startedUTC:new Date().toISOString(),
 officialRelease:'NO_PUBLISHED_BINARY',rustToolchainInstalled:false,wasmUIBuilt:false,sourceAlreadyPresent:true,issues:[]};
const injected=()=>{
 window.__x24Sample={captures:0,errors:[],statuses:[],lastBytes:null,lastTime:0};
 window.addEventListener('message',e=>{
  if(e.source!==window||e.data?.__webgd!=='to-bridge')return;
  const d=e.data,x=window.__x24Sample;
  if(d.type==='capture'&&d.bytes){x.captures++;x.lastBytes=d.bytes;x.lastTime=performance.now();}
  if(d.type==='captureError')x.errors.push(String(d.message).slice(0,250));
  if(d.type==='status')x.statuses.push({gl2:d.gl2,webgl1:d.webgl1,gpuDevices:d.gpuDevices});
 },true);
};
async function run(){
 if(os.freemem()<750*1048576)throw Error('LOW_RAM_PRECHECK');
 server=http.createServer((req,res)=>{res.writeHead(200,{'content-type':'text/html; charset=utf-8'});res.end(fixture)});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],timeout:22000,
  userDataDir:path.join(out,'X24-Own-Isolated-Profile'),
  args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,'--no-default-browser-check','--no-first-run','--disable-background-networking','--disable-sync','--disable-component-update']});
 const page=await browser.newPage();await page.setViewport({width:800,height:480,deviceScaleFactor:1});
 await page.evaluateOnNewDocument(injected);
 await page.goto('http://127.0.0.1:'+server.address().port+'/test.html',{waitUntil:'load',timeout:20000});
 await sleep(1100);
 result.pre=await page.evaluate(()=>({webgdInstalled:!!window.__webgd,canvas:document.querySelectorAll('canvas').length,
  isWebGL2:!!document.querySelector('canvas')?.getContext('webgl2'),lastStatuses:window.__x24Sample?.statuses?.slice(-3),
  captured:window.__x24Sample?.captures,errors:window.__x24Sample?.errors}));
 if(!result.pre.webgdInstalled)throw Error('WEBGD_EXTENSION_HOOK_NOT_ACTIVE');
 await page.evaluate(()=>window.postMessage({__webgd:'to-hook',type:'arm'},'*'));
 let ok=false;for(let i=0;i<40;i++){await sleep(250);
  let s=await page.evaluate(()=>({captures:window.__x24Sample.captures,errors:window.__x24Sample.errors,len:window.__x24Sample.lastBytes?.length||0}));
  if(s.errors.length)throw Error('CAPTURE_ERROR '+s.errors.join(';'));
  if(s.captures){result.report=s;ok=true;break}}
 if(!ok)throw Error('CAPTURE_NOT_RETURNED');
 if(result.report.len>10000000)throw Error('OWN_FIXTURE_CAPTURE_TOO_BIG');
 const b64=await page.evaluate(()=>{
  const x=window.__x24Sample.lastBytes;let chunks=[];for(let i=0;i<x.length;i+=25000)
  chunks.push(String.fromCharCode(...x.subarray(i,i+25000)));return btoa(chunks.join(''));
 });
 const data=Buffer.from(b64,'base64');
 result.privateFile='X24-OWN-WEBGD-FIXTURE-CAPTURE.webgd';fs.writeFileSync(path.join(secret,result.privateFile),data);
 result.captureHeader={magic:data.subarray(0,4).toString(),version:data.readUInt32LE(4),
  recordedURLLength:data.readUInt32LE(8),sourceURL:'REDACTED_LOCAL_LOOPBACK',
  totalBytes:data.length,sha256:sha(data)};
 result.status=result.captureHeader.magic==='WGDW'&&result.captureHeader.version===1?'PASS_JS_HOOK_CAPTURE':'INVALID_WIRE_HEADER';
}
timer=setInterval(()=>{minFree=Math.min(minFree,Math.round(os.freemem()/1048576));
 if(os.freemem()<100*1048576){abortReason='RAM_BELOW_100MB';browser?.close().catch(()=>{})}},300);
run().catch(e=>{result.status='BLOCKED_OR_FAILED';result.issues.push(String(e.message).slice(0,450))}).finally(async()=>{
 clearInterval(timer);try{await Promise.race([browser?.close(),sleep(2800)])}catch{}try{server?.close()}catch{}
 result.minFreeRamMiB=minFree;result.abortReason=abortReason||null;result.endedUTC=new Date().toISOString();
 fs.writeFileSync(path.join(out,'X24-OWN-FIXTURE-WEBGD-JS-HOOK-RESULT.json'),JSON.stringify(result,null,2)+'\n');
 console.log('X24_OWN_FIXTURE_FINAL '+JSON.stringify(result).slice(0,3100));
});
