import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {performance} from 'node:perf_hooks';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';

const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X14-Wappalyzer');
const source=path.join(rt,'wappalyzer-httparchive-source');
const chrome=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const ownerRoot=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const reviewed=path.join(ownerRoot,'02-reviewed-derived');
const run='X14-WAPPALYZER-TRUE180-'+new Date().toISOString().replaceAll(':','-').replaceAll('.','-');
const privateDir=path.join(ownerRoot,'01-private-captures','X14',run);
fs.mkdirSync(privateDir,{recursive:true});fs.mkdirSync(reviewed,{recursive:true});
process.env.CHROMIUM_BIN=chrome;
process.env.CHROMIUM_ARGS='--headless=new --disable-extensions --no-first-run --no-default-browser-check';
process.env.PUPPETEER_SKIP_DOWNLOAD='1';
const require=createRequire(import.meta.url);
const Driver=require(path.join(source,'src','drivers','driver.js'));
const W=require(path.join(source,'src','js','wappalyzer.js'));
const hash=v=>crypto.createHash('sha256').update(typeof v==='string'?v:JSON.stringify(v)).digest('hex');
const slugSafe=u=>{try{const x=new URL(u);return['www.gladeye.com','gladeye.com'].includes(x.hostname)?x.origin+x.pathname:x.origin+'/[external-path-redacted]'}catch{return'[invalid-url]'}};
const sourceHead='35b0847c01c118055c42596d5c6d01f60f15d706';
const report={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X14',run,sourceRepo:'https://github.com/HTTPArchive/wappalyzer',sourceHead,sourceLicense:'GPL-3.0',tool:'HTTPArchive Wappalyzer native Driver/Puppeteer + its native signature matching engine; same existing Chrome for Testing 157',site:'https://www.gladeye.com/',status:'STARTING',startedUtc:new Date().toISOString(),targetSeconds:180,observations:[],detections:[],discoveredUrls:[],detectorEvidence:[],errors:[],privacy:'No browser cookies, secrets, token/query values, raw website JS/DOM or private session exported. Fingerprint rule evidence stores only rule/source type and limited static match metadata.',frameDir:privateDir,reason:'X14 framework and library signature enumeration, not extracting GPU camera or private source'};
const output=path.join(reviewed,run+'-technology-timeline.json');
const evidencePath=path.join(reviewed,run+'-fingerprint-evidence.json');
const requests=[],responses=[],scriptTexts=new Map(),detRaw=[];
let driver=null,site=null,page=null,browser=null,navResponse=null,startMono=performance.now();
let lastScanTime=-1;
const log=(label,data)=>console.log(label,JSON.stringify(data));
const checkpoint=status=>{report.status=status;fs.writeFileSync(output,JSON.stringify(report,null,2))};
function addDet(d,channel,sec,url){
  if(!d||!d.technology?.name)return;
  const name=d.technology.name,p=d.pattern||{};
  const rec={name,channel,second:sec,url:slugSafe(url),confidence:typeof p.confidence==='number'?p.confidence:null,version:d.version||null,patternType:p.type||channel,ruleSHA256:hash(String(p.regex||p.match||p.type||'')),matchedTextSHA256:p.match?hash(String(p.match)):null};
  detRaw.push(d);
  const ident=[rec.name,rec.channel,rec.patternType,rec.ruleSHA256,rec.url].join('|');
  if(!report.detectorEvidence.some(e=>e.key===ident))report.detectorEvidence.push({...rec,key:ident});
}
function evaluateCore(input,sec){
  const res=W.analyze(input);
  for(const det of res)addDet(det,Object.keys(input).join('+'),sec,input.url||'https://www.gladeye.com/');
  return res.length;
}
const jsQueries=W.technologies.filter(t=>t.js&&Object.keys(t.js).length).map(t=>({name:t.name,chains:Object.keys(t.js)}));
const domQueries=W.technologies.filter(t=>t.dom&&Object.keys(t.dom).length).flatMap(t=>Object.entries(t.dom).map(([selector,checks])=>({name:t.name,selector,text:checks.some(c=>c.text),exists:checks.some(c=>c.exists),attrs:[...new Set(checks.flatMap(c=>Object.keys(c.attributes||{})))],props:[...new Set(checks.flatMap(c=>Object.keys(c.properties||{})))]})));
const fingerprintCounts={compiledTechnologyCount:W.technologies.length,compiledCategories:W.categories.length,jsTechnologyChains:jsQueries.reduce((a,b)=>a+b.chains.length,0),domSelectorRules:domQueries.length};
if(process.argv.includes('--self-test')){
  const initial=W.analyze({url:'https://selftest.local/',html:'<html><head><meta name="generator" content="WordPress"></head></html>',scriptSrc:['/_next/static/chunks/main.js']});
  log('DJMRN_X14_SELFTEST',{counts:fingerprintCounts,exampleHits:initial.map(d=>d.technology?.name).slice(0,12),sourceHead});
  process.exit(0);
}
async function collectPageInput(page){
 return page.evaluate((jsQueries,domQueries)=>{
  const cleanUrl=s=>{try{const u=new URL(s,location.href);return ['www.gladeye.com','gladeye.com'].includes(u.hostname)?u.origin+u.pathname:u.origin+'/[external-path-redacted]'}catch{return'[invalid-url]'}};
  const meta={};for(const m of document.querySelectorAll('meta[name],meta[property]')){const k=(m.getAttribute('name')||m.getAttribute('property')||'').toLowerCase();if(k){meta[k]=meta[k]||[];if(meta[k].length<5)meta[k].push((m.getAttribute('content')||'').slice(0,1000))}}
  const scriptSrc=[...document.querySelectorAll('script[src]')].map(s=>cleanUrl(s.src)).slice(0,150);
  const js=[];
  for(const q of jsQueries){
   for(const chain of q.chains){
    try{
     const parts=chain.replace(/\[([^\]]+)\]/g,'.$1').split('.').filter(Boolean);
     let v=window;
     for(const part of parts){if(v===null||v===undefined){v=undefined;break;}v=v[part];}
     if(typeof v!=='undefined'){
       const scalar=typeof v==='string'||typeof v==='number'?String(v).slice(0,400):!!v;
       js.push({name:q.name,chain,value:scalar});
     }
    }catch{}
   }
  }
  const dom=[];
  for(const q of domQueries){
   let node;try{node=document.querySelector(q.selector)}catch{continue}
   if(!node)continue;
   if(q.exists)dom.push({name:q.name,selector:q.selector,kind:'exists',value:''});
   if(q.text){const t=(node.textContent||'').trim().slice(0,10000);if(t)dom.push({name:q.name,selector:q.selector,kind:'text',value:t})}
   for(const a of q.attrs){if(node.hasAttribute(a))dom.push({name:q.name,selector:q.selector,kind:'attribute',key:a,value:(node.getAttribute(a)||'').slice(0,400)})}
   for(const p of q.props){try{if(Object.hasOwn(node,p)){const v=node[p];dom.push({name:q.name,selector:q.selector,kind:'property',key:p,value:(typeof v==='string'||typeof v==='number')?String(v).slice(0,400):!!v})}}catch{}}
  }
  let styles='';for(const sheet of [...document.styleSheets].slice(0,60)){try{for(const rule of [...sheet.cssRules].slice(0,1000)){styles+=rule.cssText+'\n';if(styles.length>150000)break}}catch{}if(styles.length>150000)break}
  const html=document.documentElement.outerHTML.slice(0,360000);
  const body=(document.body?.innerText||'').slice(0,50000);
  const canvas=[...document.querySelectorAll('canvas')].map((e,i)=>({index:i,width:e.width,height:e.height,cssWidth:Math.round(e.getBoundingClientRect().width),cssHeight:Math.round(e.getBoundingClientRect().height)}));
  const controls=[...document.querySelectorAll('button,a,[role=button],[role=tab]')].filter(e=>e.getBoundingClientRect().width>0).slice(0,80).map(e=>({tag:e.tagName,role:e.getAttribute('role')||null,aria:(e.getAttribute('aria-label')||'').slice(0,65),text:(e.innerText||'').slice(0,65),href:e.href?cleanUrl(e.href):null}));
  const resources=[...new Set(performance.getEntriesByType('resource').map(r=>cleanUrl(r.name)))].slice(0,400);
  return{html,meta,scriptSrc,js,dom,styles,body,canvas,controls,resources,scrollY:Math.round(scrollY),readyState:document.readyState,title:document.title,path:location.pathname,absoluteUrl:cleanUrl(location.href),domCount:document.querySelectorAll('*').length,webgl2:!!document.querySelector('canvas')?.getContext('webgl2'),perfResourceCount:performance.getEntriesByType('resource').length,windowGlobals:{nextData:typeof window.__NEXT_DATA__!=='undefined',reactDevtools:typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined',threeGlobal:typeof window.THREE!=='undefined'}};
 },jsQueries,domQueries);
}
const interactions={
 30:'mouse-left',45:'mouse-right',75:'open-menu',90:'close-menu',105:'wheel-down',120:'wheel-up',150:'mouse-center'
};
async function gesture(sec){
 if(sec===30)await page.mouse.move(240,320);
 if(sec===45)await page.mouse.move(950,250);
 if(sec===75||sec===90){
   const act=sec===75?'menu':'close';
   const res=await page.evaluate((act)=>{
    const buttons=[...document.querySelectorAll('button')];const e=buttons.find(b=>(b.getAttribute('aria-label')||b.innerText||'').trim().toLowerCase()===act||b.getAttribute('aria-label')?.toLowerCase().includes(act));
    if(e){e.click();return true}return false;
   },act);
   if(!res)report.errors.push({second:sec,kind:'menu_button_unavailable',action:act});
 }
 if(sec===105)await page.mouse.wheel({deltaY:350});
 if(sec===120)await page.mouse.wheel({deltaY:-350});
 if(sec===150)await page.mouse.move(600,400);
}
function summarizeNow(sec,detCount,scan){
 const resolved=W.resolve(detRaw);
 return resolved.map(x=>({name:x.name,confidence:x.confidence,version:x.version||null,categories:(x.categories||[]).map(c=>c.name),firstSeen:report.detectorEvidence.filter(e=>e.name===x.name).map(e=>e.second).sort((a,b)=>a-b)[0],channels:[...new Set(report.detectorEvidence.filter(e=>e.name===x.name).map(e=>e.patternType))]}));
}
try{
 driver=new Driver({maxUrls:1,maxWait:55000,recursive:false,probe:false,extended:true});
 await driver.init();
 browser=driver.browser;
 const userAgent=await browser.userAgent();
 driver.options.userAgent=userAgent;
 site=await driver.open('https://www.gladeye.com/');
 page=await site.newPage(new URL('https://www.gladeye.com/'));
 page.on('request',req=>{if(requests.length>=600)return;const x=slugSafe(req.url());requests.push({url:x,type:req.resourceType(),method:req.method(),stampMs:Math.round(performance.now()-startMono)});});
 page.on('response',resp=>{
   if(responses.length>=600)return;
   const x=slugSafe(resp.url()),h=resp.headers();
   const allow=['server','content-type','content-encoding','x-powered-by','x-vercel-cache','x-nextjs-cache','strict-transport-security','content-security-policy'];
   responses.push({url:x,status:resp.status(),type:resp.request().resourceType(),allowHeaders:Object.fromEntries(allow.filter(k=>h[k]).map(k=>[k,String(h[k]).slice(0,240)]))});
   if(resp.request().resourceType()==='script' && x.startsWith('https://www.gladeye.com/')&&scriptTexts.size<42&&!scriptTexts.has(x)){
     resp.text().then(body=>{if(body.length<1600000)scriptTexts.set(x,{body,sha256:hash(body),bytes:Buffer.byteLength(body)})}).catch(()=>{});
   }
 });
 navResponse=await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:65000});
 const headerObj=Object.fromEntries(Object.entries(navResponse?.headers()||{}).filter(([k])=>['server','content-type','content-encoding','x-powered-by','x-vercel-cache','x-nextjs-cache','strict-transport-security','content-security-policy'].includes(k.toLowerCase())).map(([k,v])=>[k.toLowerCase(),[String(v).slice(0,240)]]));
 const viewStart=performance.now();
 const allResourcePaths=new Set();
 const frames=[];
 for(let sec=0;sec<=180;sec+=15){
  const delay=Math.max(0,viewStart+sec*1000-performance.now());
  if(delay)await new Promise(r=>setTimeout(r,delay));
  let interaction=null;
  if(interactions[sec]){interaction=interactions[sec];try{await gesture(sec)}catch(e){report.errors.push({second:sec,action:interaction,error:String(e).slice(0,230)})}}
  let data=null;try{data=await collectPageInput(page)}catch(e){report.errors.push({second:sec,phase:'read_page',error:String(e).slice(0,230)})}
  let detectedThisScan=0;
  if(data){
   const url=data.absoluteUrl;
   for(const x of data.resources)allResourcePaths.add(x);
   const m=Object.fromEntries(Object.entries(data.meta||{}).filter(([,v])=>Array.isArray(v)));
   const input={url,html:data.html,scriptSrc:data.scriptSrc,headers:headerObj,meta:m,css:data.styles,text:data.body};
   detectedThisScan+=evaluateCore(input,sec);
   for(const j of data.js){
     const tech=W.technologies.find(t=>t.name===j.name);if(!tech)continue;
     try{const det=W.analyzeManyToMany(tech,'js',{[j.chain]:[j.value]});for(const d of det)addDet(d,'js-global',sec,url);detectedThisScan+=det.length}catch{}
   }
   for(const d of data.dom){
     const tech=W.technologies.find(t=>t.name===d.name);if(!tech)continue;
     const kind=d.kind==='property'?'dom.properties.'+d.key:d.kind==='attribute'?'dom.attributes.'+d.key:'dom.'+d.kind;
     try{const det=W.analyzeManyToMany(tech,kind,{[d.selector]:[d.value]});for(const found of det)addDet(found,'DOM',sec,url);detectedThisScan+=det.length}catch{}
   }
   if(sec===15||sec===60){
     for(const [url,sourceObj] of scriptTexts){
       try{const ds=W.analyze({scripts:sourceObj.body});for(const d of ds)addDet(d,'first-party-script-memory',sec,url);detectedThisScan+=ds.length}catch(e){report.errors.push({second:sec,phase:'scriptMatcher',error:String(e).slice(0,220)})}
     }
   }
  }
  let screenshot=null;
  if(sec%60===0){
    const imageFile=path.join(privateDir,String(sec).padStart(3,'0')+'s.jpg');
    try{await page.screenshot({path:imageFile,type:'jpeg',quality:55});const buf=fs.readFileSync(imageFile);screenshot={basename:path.basename(imageFile),sha256:hash(buf),bytes:buf.length};frames.push(screenshot)}catch(e){report.errors.push({second:sec,phase:'screenshot',error:String(e).slice(0,230)})}
  }
  const actualSec=+((performance.now()-viewStart)/1000).toFixed(2);
  const currentTech=summarizeNow(sec,detectedThisScan,true);
  const observation={expectedSecond:sec,actualSecond:actualSec,interaction:interaction||'observe',targetPath:data?.path,canvasCount:data?.canvas?.length??null,webgl2:data?.webgl2??null,resourceCount:data?.perfResourceCount??null,requestsSeen:requests.length,firstPartySourcesCapturedInMemory:scriptTexts.size,visibleControlCount:data?.controls?.length,visibleMenuLabels:data?.controls?.filter(x=>x.tag==='A').map(x=>x.text).slice(0,35),htmlSHA256:data?hash(data.html):null,cssSHA256:data?hash(data.styles):null,scriptSrcCount:data?.scriptSrc?.length??null,jsFingerprintGlobalsObserved:data?.js?.length??null,domSelectorHits:data?.dom?.length??null,matchedSignatureCount:detectedThisScan,technologies:currentTech,screenshot};
  report.observations.push(observation);
  report.detections=currentTech;
  checkpoint('RUNNING');
  log('DJMRN_X14_TICK',{sec,actualSec,technologies:currentTech.map(t=>t.name),matched:detectedThisScan,canvas:observation.canvasCount,webgl2:observation.webgl2,resources:observation.resourceCount,errors:report.errors.length});
 }
 const elapsed=+((performance.now()-viewStart)/1000).toFixed(2);
 const sourceEvidence=[...scriptTexts].map(([url,v])=>({url,bytes:v.bytes,sha256:v.sha256}));
 const safeFirstParty=[...new Set(requests.map(r=>r.url).filter(u=>u.startsWith('https://www.gladeye.com/')||u.startsWith('https://gladeye.com/')))];
 const evidence={mission:report.mission,stage:'X14',run,repoCommit:sourceHead,method:'Wappalyzer compiled rule engine matched live DOM, JS globals, CSS, script-src, page/header signatures and in-memory original first-party JS bodies over separate 180s native browser driver',ruleCount:fingerprintCounts,matchedEvidence:report.detectorEvidence,firstPartyScriptHashOnly:sourceEvidence,firstPartyResourcePaths:safeFirstParty,networkRequestsObserved:requests.length,statusCodes:Object.fromEntries([...new Set(responses.map(r=>r.status))].map(code=>[code,responses.filter(r=>r.status===code).length])),headersByUrl:responses.filter(r=>Object.keys(r.allowHeaders).length).slice(0,70),privacy:'Request/response bodies never saved, no cookie or auth headers, URL queries removed, external paths redacted',warnings:['Wappalyzer signatures are probabilistic and can match bundled code, not necessarily active runtime libraries','Browser build flags and dynamic interactions influence detection results; versions require independent verification','Server/backend runtime technologies cannot be conclusively proven from client signatures']};
 fs.writeFileSync(evidencePath,JSON.stringify(evidence,null,2));
 report.observedSeconds=elapsed;
 report.sourceRuntimeVerified={browserVersion:await browser.version(),signatureEngineTechnologies:W.technologies.length,sourceGitHead:sourceHead,sourceLicense:'GPL-3.0'};
 report.detectionCount=report.detections.length;
 report.firstPartyURLPaths=safeFirstParty.length;
 report.recordedFrames=frames.length;
 report.status=elapsed>=180&&report.observations.length===13&&report.observations.every(o=>o.canvasCount!==null)?'COMPLETE_180_SECONDS':'PARTIAL_UNVERIFIED';
 checkpoint(report.status);
 log('DJMRN_X14_DONE',{run,status:report.status,elapsed,observations:report.observations.length,finalTechs:report.detections,frames:frames.length,scriptSourcesInMemory:scriptTexts.size,sourceEvidence:evidencePath,timeline:output,errors:report.errors});
}catch(err){report.errors.push({phase:'main',error:String(err)});checkpoint('FAILED_OR_PARTIAL');console.error('DJMRN_X14_FAILED',String(err));process.exitCode=2}
finally{if(driver){try{await driver.destroy()}catch(e){console.error('X14_CLOSE_FAIL',String(e))}}}