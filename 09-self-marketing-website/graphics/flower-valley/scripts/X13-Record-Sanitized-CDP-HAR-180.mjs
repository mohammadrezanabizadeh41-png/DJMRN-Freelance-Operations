import {chromium} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {performance} from 'node:perf_hooks';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const runtime=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11');
const run='X13-HAR-CDP-TRUE180-'+new Date().toISOString().replaceAll(':','-').replaceAll('.','-');
const dir=path.join(root,'01-private-captures','X13',run);
const derived=path.join(root,'02-reviewed-derived');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(derived,{recursive:true});
const records=[],latest=new Map(),timeline=[],errors=[];
const norm=(raw)=>{try{const u=new URL(raw);const firstParty=['www.gladeye.com','gladeye.com'].includes(u.hostname);return{url:firstParty?u.origin+u.pathname:u.origin+'/[external-path-redacted]',origin:u.origin,host:u.hostname,path:firstParty?u.pathname:'[external-path-redacted]',firstParty,hadQuery:!!u.search};}catch{return{url:'[unparseable-url]',origin:'[unknown]',host:'[unknown]',path:'[unknown]',firstParty:false,hadQuery:false}}};
const filt=(o)=>{const names=['content-type','content-length','content-encoding','cache-control','accept-ranges'];return Object.entries(o||{}).filter(([k])=>names.includes(k.toLowerCase())).map(([k,v])=>({name:k.toLowerCase(),value:String(v).slice(0,150)}))};
const st=()=>new Date().toISOString();
let browser=null,ctx=null,page=null,cdp=null;
let endElapsed=0; const startMillis=performance.now();
let lastSample=0;
function phase(a,b){return typeof a==='number'&&typeof b==='number'&&a>=0&&b>=a?+(b-a).toFixed(2):-1}
function requestFromEvent(ev){
 const normed=norm(ev.request?.url||'');
 const stack=(ev.initiator?.stack?.callFrames||[]).slice(0,4).map(f=>({fn:f.functionName||'',source:norm(f.url||'').url,line:(f.lineNumber??-1)+1,column:(f.columnNumber??-1)+1}));
 return {id:ev.requestId,startedDateTime:typeof ev.wallTime==='number'?new Date(ev.wallTime*1000).toISOString():st(),startStamp:ev.timestamp,method:ev.request?.method||'GET',type:ev.type||'Other',initiatorType:ev.initiator?.type||'unknown',stack,startedMs:performance.now()-startMillis,...normed,status:null,statusText:'',mimeType:'',protocol:'',responseStamp:null,finishStamp:null,received:null,size:0,failed:null,connectionId:null,serverTiming:null};
}
function attachEvents(client){
 client.on('Network.requestWillBeSent',ev=>{
   if(records.length>=1900)return;
   let prior=latest.get(ev.requestId);
   if(prior&&ev.redirectResponse){prior.status=ev.redirectResponse.status;prior.mimeType=ev.redirectResponse.mimeType;prior.responseStamp=ev.timestamp;prior.finishStamp=ev.timestamp;prior.statusText='Redirect';}
   const rec=requestFromEvent(ev);records.push(rec);latest.set(ev.requestId,rec);
 });
 client.on('Network.responseReceived',ev=>{
  const r=latest.get(ev.requestId);if(!r)return;
  const s=ev.response||{};r.status=s.status;r.statusText=s.statusText||'';r.mimeType=s.mimeType||'';r.protocol=s.protocol||'';
  r.responseStamp=ev.timestamp;r.received=s.timing||null;r.connectionId=s.connectionId??null;
  r.allowedHeaders=filt(s.headers);
  r.fromDiskCache=!!s.fromDiskCache;r.fromServiceWorker=!!s.fromServiceWorker;
  r.security=s.securityDetails?{protocol:s.securityDetails.protocol||'',cipher:s.securityDetails.cipher||'',issuer:s.securityDetails.issuer||'',subjectName:s.securityDetails.subjectName||''}:null;
 });
 client.on('Network.loadingFinished',ev=>{const r=latest.get(ev.requestId);if(r){r.finishStamp=ev.timestamp;r.size=ev.encodedDataLength||0}});
 client.on('Network.loadingFailed',ev=>{const r=latest.get(ev.requestId);if(r){r.finishStamp=ev.timestamp;r.failed=String(ev.errorText||'network-error').slice(0,200)}});
}
function timing(r){
 const t=r.received||{},wait=typeof t.receiveHeadersEnd==='number'&&t.receiveHeadersEnd>=0?(typeof t.sendEnd==='number'&&t.sendEnd>=0?t.receiveHeadersEnd-t.sendEnd:t.receiveHeadersEnd):r.responseStamp!=null?Math.max(0,(r.responseStamp-r.startStamp)*1000):-1;
 const receive=r.responseStamp!=null&&r.finishStamp!=null?Math.max(0,(r.finishStamp-r.responseStamp)*1000):-1;
 let duration=r.finishStamp!=null?Math.max(0,(r.finishStamp-r.startStamp)*1000):(r.responseStamp!=null?Math.max(0,(r.responseStamp-r.startStamp)*1000):0);
 return{duration:+duration.toFixed(2),phases:{blocked:typeof t.sendStart==='number'&&t.sendStart>=0?+t.sendStart.toFixed(2):-1,dns:phase(t.dnsStart,t.dnsEnd),connect:phase(t.connectStart,t.connectEnd),ssl:phase(t.sslStart,t.sslEnd),send:phase(t.sendStart,t.sendEnd),wait:+wait.toFixed(2),receive:+receive.toFixed(2)}};
}
function toHar(r){
 const v=timing(r);
 return{startedDateTime:r.startedDateTime,time:v.duration,
 request:{method:r.method,url:r.url,httpVersion:r.protocol||'HTTP/2',cookies:[],headers:[],queryString:[],headersSize:-1,bodySize:-1},
 response:{status:r.status??0,statusText:r.statusText,httpVersion:r.protocol||'HTTP/2',cookies:[],headers:r.allowedHeaders||[],content:{size:r.size||0,mimeType:r.mimeType||'application/octet-stream'},redirectURL:'',headersSize:-1,bodySize:r.size||-1},
 cache:{},timings:v.phases,_resourceType:r.type,_initiatorType:r.initiatorType,_initiatorStack:r.stack,_fromDiskCache:!!r.fromDiskCache,_fromServiceWorker:!!r.fromServiceWorker,_failed:r.failed,_tls:r.security};
}
const reportFile=path.join(derived,run+'-capture-and-waterfall.json');
function checkpoint(status){
 const summary={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X13',run,status,reference:'https://www.gladeye.com/',startedUtc:new Date(Date.now()-(performance.now()-startMillis)).toISOString(),elapsedSeconds:+((performance.now()-startMillis)/1000).toFixed(2),requestEvents:records.length,timeline,errors,privacy:'No raw request/response bodies, no cookies, auth headers, form data, URL query values or user profile captured.'};
 fs.writeFileSync(reportFile,JSON.stringify(summary,null,2));
}
try{
 browser=await chromium.launch({executablePath:path.join(runtime,'ChromeForTesting-157','chrome-win64','chrome.exe'),headless:true,args:['--disable-extensions']});
 ctx=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1});
 page=await ctx.newPage();cdp=await ctx.newCDPSession(page);
 attachEvents(cdp);await cdp.send('Network.enable',{maxTotalBufferSize:32000000,maxResourceBufferSize:6000000});await cdp.send('Page.enable');
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:60000});
 const viewStart=performance.now();
 const gestures={30:'move-left',60:'move-right',90:'wheel-down',120:'wheel-up',150:'move-center'};
 for(let sec=0;sec<=180;sec+=15){
  const wait=Math.max(0,viewStart+1000*sec-performance.now());if(wait>0)await new Promise(r=>setTimeout(r,wait));
  if(gestures[sec]){
    try{if(sec===30)await page.mouse.move(280,320);if(sec===60)await page.mouse.move(990,310);if(sec===90)await page.mouse.wheel(0,350);if(sec===120)await page.mouse.wheel(0,-350);if(sec===150)await page.mouse.move(650,500);}
    catch(e){errors.push({second:sec,action:gestures[sec],error:String(e).slice(0,230)})}
  }
  const stamp=+((performance.now()-viewStart)/1000).toFixed(2);
  const state=await page.evaluate(()=>({path:location.pathname,scrollY:Math.round(scrollY),canvas:document.querySelectorAll('canvas').length,resourceCount:performance.getEntriesByType('resource').length,webgl2:!!document.querySelector('canvas')?.getContext('webgl2')})).catch(e=>({error:String(e)}));
  const row={second:sec,actualSecond:stamp,action:gestures[sec]||'observe',requests:records.length,distinctSafeURLs:new Set(records.map(r=>r.url)).size,state};
  timeline.push(row);checkpoint('CAPTURING');
  console.log('DJMRN_X13_TICK',JSON.stringify(row));
 }
 endElapsed=+( (performance.now()-viewStart)/1000).toFixed(2);
 const sorted=records.filter(r=>!!r.startedDateTime).sort((a,b)=>new Date(a.startedDateTime).getTime()-new Date(b.startedDateTime).getTime());
 const entries=sorted.map(toHar);
 const har={log:{version:'1.2',creator:{name:'DJMRN-CDP-SAFE-HAR-LOCAL',version:'1.0'},pages:[],entries}};
 const rawString=JSON.stringify(har,null,2);
 const harPath=path.join(dir,'gladeye-X13-redacted-metadata-only.har');
 fs.writeFileSync(harPath,rawString);
 const sha=crypto.createHash('sha256').update(rawString).digest('hex');
 const hosts={},mime={},statuses={},initiators={},types={};
 for(const r of sorted){hosts[r.host]=(hosts[r.host]||0)+1;mime[r.mimeType]=(mime[r.mimeType]||0)+1;statuses[String(r.status)]=(statuses[String(r.status)]||0)+1;initiators[r.initiatorType]=(initiators[r.initiatorType]||0)+1;types[r.type]=(types[r.type]||0)+1;}
 const firstParty=sorted.filter(r=>r.firstParty),paths=[...new Set(firstParty.map(r=>r.url))];
 const scriptStacks=sorted.filter(r=>r.stack.length).map(r=>({url:r.url,resourceType:r.type,initiator:r.initiatorType,frames:r.stack})).slice(0,90);
 const slowest=sorted.filter(r=>r.status!==null).map(r=>({url:r.url,status:r.status,type:r.type,mime:r.mimeType,ms:timing(r).duration,size:r.size})).sort((a,b)=>b.ms-a.ms).slice(0,30);
 const noSensitive=entries.every(e=>e.request.headers.length===0&&e.request.cookies.length===0&&e.response.cookies.length===0&&e.request.queryString.length===0&&!e.request.postData&&!e.response.content.text&&!e.request.url.includes('?')&&!e.response.headers.some(h=>/cookie|authorization|token|secret|session|key/i.test(h.name)));
 if(!noSensitive)throw Error('HAR_SANITIZATION_ASSERTION_FAILED');
 const summary={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X13',run,status:entries.length>0&&endElapsed>=180&&timeline.length===13?'LIVE_180_CDP_HAR_PASS':'PARTIAL_UNVERIFIED',target:'https://www.gladeye.com/',observerDurationSeconds:endElapsed,requestEvents:entries.length,uniqueFirstPartyURLPaths:paths.length,firstPartyRequests:firstParty.length,thirdPartyRequests:sorted.length-firstParty.length,hosts,mime,statuses,initiators,types,scriptInitiatorStacks:scriptStacks,slowestRequests:slowest,privacyChecksPassed:noSensitive,hadQueryInOriginalRequests:sorted.filter(r=>r.hadQuery).length,publicHarPath:harPath,harSha256:sha,harBytes:Buffer.byteLength(rawString),pageCheckpoints:timeline,errors,limitations:['180-second browser observation, not 180 seconds of HTTP events if network settles early','No response/request bodies saved; response metadata and initiator script call-frame paths only','External third-party request paths and all query values redacted before disk; original site resources remain X01/X11 authority','Headers allowlisted, all cookies/Authorization/postData omitted','No per-frame WebGL GPU render call/camera shader interception']};
 fs.writeFileSync(reportFile,JSON.stringify(summary,null,2));
 console.log('DJMRN_X13_DONE',JSON.stringify({status:summary.status,run,harPath,reportFile,requests:entries.length,firstParty:summary.firstPartyRequests,firstPartyPaths:paths.length,headersRedacted:noSensitive,harBytes:summary.harBytes,harSha256:sha,durationSeconds:endElapsed,errors:errors.length}));
 if(summary.status!=='LIVE_180_CDP_HAR_PASS')process.exitCode=3;
}catch(err){errors.push(String(err));checkpoint('FAILED_PARTIAL');console.error('DJMRN_X13_ERROR',String(err));process.exitCode=2;}finally{if(browser)await browser.close().catch(()=>{})}