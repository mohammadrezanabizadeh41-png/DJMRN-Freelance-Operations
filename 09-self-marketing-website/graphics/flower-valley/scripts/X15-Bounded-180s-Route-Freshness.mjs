import {chromium} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {performance} from 'node:perf_hooks';
import crypto from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const der=path.join(root,'02-reviewed-derived');
const run='X15-ROUTE-FRESHNESS-TRUE180-'+new Date().toISOString().replace(/[:.]/g,'-');
const privateDir=path.join(root,'01-private-captures','X15',run);
fs.mkdirSync(privateDir,{recursive:true});fs.mkdirSync(der,{recursive:true});
const output=path.join(der,run+'-navigation-resource-coverage.json');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const routePlan=[{sec:0,path:'/'},{sec:30,path:'/work'},{sec:60,path:'/about'},{sec:90,path:'/careers'},{sec:120,path:'/contact'},{sec:150,path:'/ventures'},{sec:180,path:'/'}];
const norm=u=>{try{const x=new URL(u);return{url:['www.gladeye.com','gladeye.com'].includes(x.hostname)?x.origin+x.pathname:x.origin+'/[external-redacted]',host:x.hostname,firstParty:['www.gladeye.com','gladeye.com'].includes(x.hostname),hadQuery:!!x.search}}catch{return{url:'[invalid]',host:'unknown',firstParty:false,hadQuery:false}}};
const records=[],nav=[],ticks=[],errors=[],screens=[];
const seen=new Set();
let browser=null,context=null,page=null;
const report={stage:'X15',mission:'DJMRN-FREELANCE-WEBSITE-001',run,target:'https://www.gladeye.com/',status:'STARTING',method:'Bounded 180-second anonymous, public-only browser route freshness and resource URL inventory. Seven deliberate route visits, not exhaustive site crawl, screenshot private only.',scopeDenominator:{plannedRouteVisits:routePlan.length,distinctPlannedRoutes:[...new Set(routePlan.map(r=>r.path))],internalRoutesKnownToDate:routePlan.map(x=>x.path)},records,ticks,nav,errors,screens,privacy:'Only query-stripped first-party URLs and redacted third-party origin, HTTP statuses, resource types and local screenshot hashes. No cookies/auth/postData/response bodies, no private sessions.',userDefinedMemoryStopMiB:100};
const checkpoint=s=>{report.status=s;fs.writeFileSync(output,JSON.stringify(report,null,2))};
let minNow=null;const tStart=performance.now();
try{
 const cft=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
 browser=await chromium.launch({executablePath:cft,headless:true,args:['--disable-extensions','--no-first-run','--no-default-browser-check']});
 context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1});
 page=await context.newPage();
 page.on('request',r=>{const n=norm(r.url());if(records.length<6000)records.push({kind:'request',...n,method:r.method(),type:r.resourceType(),t:Math.round(performance.now()-tStart)});});
 page.on('response',r=>{const n=norm(r.url());if(records.length<6000)records.push({kind:'response',...n,status:r.status(),type:r.request().resourceType(),t:Math.round(performance.now()-tStart)});});
 page.on('requestfailed',r=>{const n=norm(r.url());errors.push({kind:'requestfailed',url:n.url,reason:r.failure()?.errorText||''})});
 const started=performance.now();
 for(let sec=0;sec<=180;sec+=15){
   const delay=Math.max(0,started+sec*1000-performance.now());if(delay>0)await new Promise(r=>setTimeout(r,delay));
   const route=routePlan.find(r=>r.sec===sec);
   let action='observe',routeStatus=null;
   if(route){action='visit_public_'+route.path;try{const response=await page.goto('https://www.gladeye.com'+route.path,{waitUntil:'domcontentloaded',timeout:23000});routeStatus=response?.status()??null;nav.push({targetRoute:route.path,expectedSecond:sec,actualSecond:+((performance.now()-started)/1000).toFixed(2),status:routeStatus,landed:norm(page.url()).url})}catch(e){errors.push({kind:'navigation',route:route.path,error:String(e).slice(0,220)})}}
   if(sec===15){try{await page.mouse.move(290,330)}catch{}}
   if(sec===45){try{await page.mouse.move(880,420)}catch{}}
   if(sec===75){try{await page.mouse.wheel(0,200)}catch{}}
   if(sec===105){try{await page.mouse.wheel(0,-200)}catch{}}
   const ui=await page.evaluate(()=>({pathname:location.pathname,title:document.title,documentReadyState:document.readyState,canvasCount:document.querySelectorAll('canvas').length,webgl2:!!document.querySelector('canvas')?.getContext('webgl2'),visibleLinks:[...document.querySelectorAll('a[href]')].filter(x=>x.getBoundingClientRect().width>0).slice(0,60).map(x=>{try{const u=new URL(x.href);return {path:u.origin===location.origin?u.pathname:'[external-redacted]',text:(x.textContent||'').trim().slice(0,60)}}catch{return{path:'[invalid]',text:''}}}),performanceResources:[...new Set(performance.getEntriesByType('resource').map(r=>{try{const u=new URL(r.name);return u.origin===location.origin?u.origin+u.pathname:u.origin+'/[external-redacted]'}catch{return '[invalid]'}}))].slice(0,250)})).catch(e=>({error:String(e).slice(0,200)}));
   const actual=+((performance.now()-started)/1000).toFixed(2);
   let shot=null;
   if(sec%30===0){try{const file=path.join(privateDir,String(sec).padStart(3,'0')+'s.jpg');await page.screenshot({path:file,type:'jpeg',quality:47,timeout:9000});const b=fs.readFileSync(file);shot={name:path.basename(file),bytes:b.length,sha256:hash(b)};screens.push(shot)}catch(e){errors.push({kind:'screenshot',second:sec,message:String(e).slice(0,130)})}}
   const r={expectedSecond:sec,actualSecond:actual,action,routeStatus,path:ui.pathname,canvasCount:ui.canvasCount,webgl2:ui.webgl2,visibleLinks:ui.visibleLinks,performanceResourcePaths:ui.performanceResources,networkEventsTotal:records.length,screenshot:shot};
   ticks.push(r);checkpoint('RUNNING');
   console.log('X15_ROUTE_TICK',JSON.stringify({sec,actual,path:r.path,status:routeStatus,canvas:r.canvasCount,events:records.length,errors:errors.length}));
 }
 const elapsed=+((performance.now()-started)/1000).toFixed(2);
 const uniques=[...new Set(records.filter(x=>x.kind==='response'&&x.firstParty).map(x=>x.url))].sort();
 const statuses={};const types={};
 for(const r of records.filter(x=>x.kind==='response')){statuses[String(r.status)]=(statuses[String(r.status)]||0)+1;types[String(r.type)]=(types[String(r.type)]||0)+1;}
 report.elapsedSeconds=elapsed;report.firstPartyRequestFailures=errors.filter(e=>e.kind==='requestfailed'&&e.url.startsWith('https://www.gladeye.com/')).length;report.thirdPartyRequestFailures=errors.filter(e=>e.kind==='requestfailed'&&!e.url.startsWith('https://www.gladeye.com/')).length;report.observationTruncatedAtEventCap=records.length>=6000;report.status=elapsed>=180&&ticks.length===13&&nav.length===7?'COMPLETE_180S_SCOPED_ROUTE_TEST':'PARTIAL_UNVERIFIED';
 report.firstPartyResponseURLPaths=uniques;report.distinctFirstPartyResourcePaths=uniques.length;report.responseStatusCounts=statuses;report.responseTypeCounts=types;report.unknowns=['Other undiscovered routes and server sources not in public planned routes UNKNOWN','Only a route sample; no claim that every interaction or WebGL frame was captured','Network timing and cache can affect resources and reported statuses','No source body or GPU drawcall captured by this X15 scan'];
 checkpoint(report.status);
 console.log('X15_ROUTE_COMPLETE',JSON.stringify({status:report.status,run,elapsed,nav:nav.map(x=>({path:x.targetRoute,status:x.status,landed:x.landed})),ticks:ticks.length,shots:screens.length,firstPartyPaths:uniques.length,statuses,errors:errors.length,output}));
 if(report.status!=='COMPLETE_180S_SCOPED_ROUTE_TEST')process.exitCode=3;
}catch(e){errors.push({kind:'fatal',error:String(e).slice(0,600)});checkpoint('FAILED_PARTIAL');console.error('X15_ROUTE_FAILED',String(e));process.exitCode=2}
finally{if(browser)await browser.close().catch(()=>{})}