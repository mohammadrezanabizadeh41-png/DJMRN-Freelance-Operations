'use strict';
// DJMRN X19 — <= 170 s live anonymous first-party CDN/client behavior observation.
// Uses the existing X16-tested Chromium/Puppeteer runtime; no new browser installation.
// Original response bodies and 3 screenshots stay private on owner's Windows computer.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const toolkit=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes');
const chrome=path.join(toolkit,'ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const pp=path.join(toolkit,'X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer');
const derived=path.join(root,'02-reviewed-derived','X19-LIVE-CURRENT');
const priv=path.join(root,'01-private-captures','X19','live-3min');
const knownFile=path.join(root,'02-reviewed-derived','X18-CROSS-STAGE-CURRENT','X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json');
const known=new Set(JSON.parse(fs.readFileSync(knownFile,'utf8')).resources.map(x=>x.url));
const isFirst=s=>{try{return new URL(s).protocol==='https:'&&['gladeye.com','www.gladeye.com'].includes(new URL(s).hostname)}catch{return false}};
const canonical=s=>{try{const u=new URL(s);return u.origin+u.pathname}catch{return '[unparsed]'}};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const write=(p,j)=>fs.writeFileSync(p,JSON.stringify(j,null,2)+'\n');
const samples=[],responses=new Map(),requestInfo=new Map(),scriptURLs=new Map(),edges=new Map(),failures=[],newAssets=new Map(),issues=[];
let browser,page,client,stop=false,stopReason=null,totalCapturedBytes=0,requestCount=0,minRam=Math.round(os.freemem()/1048576);
const start=Date.now();const maxDuration=165000;
if(os.freemem()<650*1048576)throw Error('RAM_PRECONDITION_UNDER_650MIB');
if(!fs.existsSync(chrome)||!fs.existsSync(pp))throw Error('X16_EXISTING_CHROMIUM_OR_PUPPETEER_UNAVAILABLE');
fs.mkdirSync(derived,{recursive:true});fs.mkdirSync(priv,{recursive:true});
function checkpoint(phase){
 const all=[...responses.values()],first=all.filter(x=>x.firstParty);
 const scripts=[...new Set(first.filter(x=>x.type==='Script'||/\.m?js$/.test(x.url)).map(x=>x.url))];
 const newPaths=[...new Set(first.map(x=>x.url))].filter(x=>!known.has(x));
 const byStatus={};for(const r of first)byStatus[r.status]=(byStatus[r.status]||0)+1;
 const result={phase,run:'X19_ANONYMOUS_3MIN_LIVE',capturedUtc:new Date().toISOString(),elapsedSeconds:Math.round((Date.now()-start)/1000),
  limitations:['Bounded live browser behavior on public anonymous site, not proprietary source','Fresh user-data-directory and no user cookies',
    'New normalized path does not by itself prove previously unseen bytes','Runtime only, not original shaders/backend','Private raw bodies/screenshots not published'],
  limits:{maxSeconds:165,memoryAbortMiB:100,privateResponseBodyCapBytes:1500000,privateBodyBudgetBytes:14000000},
  samples,stats:{firstPartyRequests:first.length,firstPartyUniquePaths:new Set(first.map(x=>x.url)).size,uniqueJSPaths:scripts.length,
    newPathCandidates:newPaths.length,capturedNewBodies:newAssets.size,bytesCaptured:totalCapturedBytes,
    firstPartyJSNewToX18:scripts.filter(x=>!known.has(x)).length,networkEdges:edges.size,
    failures:failures.length,minFreeMemoryMiB:minRam,statusCounts:byStatus},
  newPathCandidates:newPaths,jsPaths:scripts,networkRecords:first,networkEdges:[...edges.values()],
  newBodies:[...newAssets.values()],failures,issues,stopReason};
 write(path.join(derived,'X19-LIVE-3MIN-OBSERVATION.json'),result);
 console.log('X19_LIVE_CHECKPOINT '+JSON.stringify({phase,elapsed:result.elapsedSeconds,samples:samples.length,
  requests:first.length,paths:result.stats.firstPartyUniquePaths,newPathCandidates:newPaths.length,js:scripts.length,
  newJs:result.stats.firstPartyJSNewToX18,bodies:newAssets.size,ramFreeMiB:Math.round(os.freemem()/1048576)}));
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function observe(label,phase){
 if(stop)return;
 const o={label,seconds:Math.round((Date.now()-start)/1000),route:await page.url(),ramFreeMiB:Math.round(os.freemem()/1048576)};
 try{o.dom=await page.evaluate(()=>{
  const canvases=[...document.querySelectorAll('canvas')].map(c=>({width:c.width,height:c.height,clientWidth:c.clientWidth,clientHeight:c.clientHeight}));
  const scripts=[...document.querySelectorAll('script[src]')].map(s=>s.src).filter(x=>{try{return ['www.gladeye.com','gladeye.com'].includes(new URL(x).hostname)}catch{return false}}).map(x=>new URL(x).origin+new URL(x).pathname);
  return{title:document.title,scrollY:scrollY,scrollHeight:document.documentElement.scrollHeight,
   canvasCount:canvases.length,canvases,firstPartyScriptTags:[...new Set(scripts)],imageCount:document.images.length,
   visibleParagraphs:document.querySelectorAll('p').length,headingCount:document.querySelectorAll('h1,h2,h3').length,
   videoCount:document.querySelectorAll('video').length,animationCount:document.getAnimations().length,
   viewport:[innerWidth,innerHeight],resourceEntries:performance.getEntriesByType('resource').length}
 })}catch(e){o.error=(e.name||'Error')+': '+String(e.message).slice(0,120)}
 if([0,3,6].includes(phase)){try{const filename='screen-'+String(phase).padStart(2,'0')+'.png';await page.screenshot({path:path.join(priv,filename),type:'png',timeout:11000});o.privateScreenshot=filename}catch(e){issues.push({type:'SCREENSHOT_FAILED',phase,error:e.name||'Error'})}}
 samples.push(o);checkpoint('SAMPLE_'+phase);
}
let watchdog=setTimeout(()=>{stop=true;stopReason='HARD_WATCHDOG_175S';checkpoint('FORCED_WATCHDOG');process.exit(124)},175000);
const memoryTimer=setInterval(()=>{const free=Math.round(os.freemem()/1048576);minRam=Math.min(minRam,free);if(free<100){stop=true;stopReason='STOP_RAM_UNDER_100MIB'}},1000);
(async()=>{
 try{
  const pup=require(pp);
  browser=await pup.launch({executablePath:chrome,headless:true,ignoreHTTPSErrors:false,timeout:25000,
   args:['--headless=new','--disable-extensions','--no-first-run','--no-default-browser-check',
    '--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720']});
  page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
  client=await page.createCDPSession();
  await client.send('Network.enable',{maxTotalBufferSize:16000000,maxResourceBufferSize:2000000});
  await client.send('Debugger.enable');
  client.on('Debugger.scriptParsed',e=>{if(isFirst(e.url)){
   const u=canonical(e.url),v=scriptURLs.get(u)||{url:u,count:0,mapDeclaration:false};
   v.count++;v.mapDeclaration ||=!!e.sourceMapURL;scriptURLs.set(u,v);
  }});
  client.on('Network.requestWillBeSent',e=>{if(!isFirst(e.request.url))return;
   requestCount++;const u=canonical(e.request.url),from=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url||e.documentURL||null;
   requestInfo.set(e.requestId,{url:u,from:from&&isFirst(from)?canonical(from):null,originType:e.initiator?.type||'unknown'});
   if(from&&isFirst(from)){const k=canonical(from)+'|'+u;const obj=edges.get(k)||{from:canonical(from),to:u,count:0};obj.count++;edges.set(k,obj)}
  });
  client.on('Network.responseReceived',e=>{const u=e.response.url;if(!isFirst(u))return;
   responses.set(e.requestId,{url:canonical(u),firstParty:true,status:e.response.status,
    type:e.type,mime:String(e.response.mimeType||'').slice(0,90),fromCache:!!e.response.fromDiskCache,
    urlKnownBeforeX19:known.has(canonical(u))});
  });
  client.on('Network.loadingFailed',e=>{const v=requestInfo.get(e.requestId);if(v&&failures.length<100)failures.push({url:v.url,error:String(e.errorText||'ERR').slice(0,110)})});
  client.on('Network.loadingFinished',async e=>{
   const resp=responses.get(e.requestId);if(!resp||resp.status!==200||stop)return;
   const ext=/\.(?:js|mjs|glb|gltf|css|webp|png)$/.test(resp.url);
   if(!ext||known.has(resp.url)||newAssets.has(resp.url)||newAssets.size>=25||totalCapturedBytes>=14000000)return;
   try{
    const b=await client.send('Network.getResponseBody',{requestId:e.requestId});
    const bytes=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body,'utf8');
    if(bytes.length===0||bytes.length>1500000)return;
    const digest=sha(bytes),name=digest.slice(0,24)+path.extname(new URL(resp.url).pathname).replace(/[^.a-z0-9]/gi,'');
    const f=path.join(priv,name);if(!fs.existsSync(f))fs.writeFileSync(f,bytes,{flag:'wx'});
    totalCapturedBytes+=bytes.length;newAssets.set(resp.url,{url:resp.url,bytes:bytes.length,sha256:digest,
     privateRelativePath:path.relative(root,f).replaceAll('\\','/'),firstSeenIn:'X19_LIVE_OBSERVATION',httpStatus:200,
     originalResponseBodyEvidence:'CDP Network.getResponseBody of public anonymous first-party asset'});
   }catch(e){issues.push({type:'NEW_BODY_NOT_CAPTURED',url:resp.url,error:e.name||'Error'})}
  });
  let initial=null;try{initial=await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:25000})}catch(e){issues.push({type:'HOME_NAV',error:String(e.message).slice(0,130)})}
  await sleep(4500);await observe('home_initial',0);
  const phases=[
    {at:26000,name:'pointer_shift',action:async()=>{await page.mouse.move(340,290);await page.mouse.move(810,460)}},
    {at:52000,name:'home_scroll',action:async()=>await page.mouse.wheel({deltaY:420})},
    {at:78000,name:'home_second_scroll',action:async()=>await page.mouse.wheel({deltaY:600})},
    {at:104000,name:'work_route',action:async()=>await page.goto('https://www.gladeye.com/work',{waitUntil:'domcontentloaded',timeout:22000})},
    {at:130000,name:'work_pointer_scroll',action:async()=>{await page.mouse.move(620,370);await page.mouse.wheel({deltaY:300})}},
    {at:154000,name:'work_final',action:async()=>await page.mouse.move(880,300)}
  ];
  for(let i=0;i<phases.length&&!stop;i++){const t=phases[i];while(!stop&&Date.now()-start<t.at)await sleep(Math.min(1000,t.at-(Date.now()-start)));
   if(stop)break;
   try{await t.action()}catch(e){issues.push({type:'ACTION_FAILED',phase:t.name,error:e.name||'Error'})}
   await sleep(1000);await observe(t.name,i+1);
  }
 }catch(e){issues.push({type:'LIVE_FATAL',name:e.name||'Error',message:String(e.message).slice(0,300)})}
 finally{
  stop=true;clearInterval(memoryTimer);
  try{await browser?.close()}catch(e){issues.push({type:'CLOSE_FAILED',error:e.name||'Error'})}
  clearTimeout(watchdog);checkpoint('FINAL');
  const report=JSON.parse(fs.readFileSync(path.join(derived,'X19-LIVE-3MIN-OBSERVATION.json'),'utf8'));
  const acceptance={status:issues.some(x=>x.type==='LIVE_FATAL')?'LIVE_OBSERVATION_PARTIAL':'LIVE_OBSERVATION_SCOPE_QUALIFIED',
   elapsedSeconds:report.elapsedSeconds,samples:report.samples.length,
   summary:report.stats,issues,stoppedForRam:stopReason==='STOP_RAM_UNDER_100MIB',
   caveats:['Exact URL+SHA comparison with X01-X18 still required before claiming novel original assets','No screenshots/raw vendor bytes published to GitHub']};
  write(path.join(derived,'X19-LIVE-3MIN-ACCEPTANCE.json'),acceptance);
  console.log('X19_LIVE_FINAL '+JSON.stringify(acceptance));
  process.exitCode=issues.some(x=>x.type==='LIVE_FATAL')?2:0;
 }
})();
