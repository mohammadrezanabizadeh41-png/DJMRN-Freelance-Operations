// DJMRN X18: first-party-only public jsdj extraction with durable checkpoints.
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import {pathToFileURL} from 'node:url'; import {createHash} from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const out=path.join(root,'02-reviewed-derived','X18-CURRENT');
const priv=path.join(root,'01-private-captures','X18');
const pkg=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X18-jsdj','node_modules','@ejfkdev','jsdj');
const rd=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const save=(f,x)=>fs.writeFileSync(f,JSON.stringify(x,null,2)+'\n');
const hash=b=>createHash('sha256').update(b).digest('hex');
const canon=s=>{try{const u=new URL(s);return u.origin+u.pathname}catch{return '[unknown]'}};
const allow=u=>u.protocol==='https:'&&['www.gladeye.com','gladeye.com'].includes(u.hostname);
if(rd(path.join(root,'02-reviewed-derived','X17-CURRENT','X17-main-acceptance.json')).status!=='COMPLETE_SCOPE_QUALIFIED')throw Error('X17_GATE');
if(rd(path.join(root,'02-reviewed-derived','X18-PREFLIGHT','X18-OWN-FIXTURE-ACCEPTANCE.json')).status!=='OPERATIONAL_LOCALHOST_FIXTURE_PASS')throw Error('X18_FIXTURE_GATE');
if(rd(path.join(pkg,'package.json')).version!=='0.1.2')throw Error('JSDJ_VERSION');
if(os.freemem()<350*1048576)throw Error('FREE_RAM_UNDER_350_MIB');
const {scan}=await import(pathToFileURL(path.join(pkg,'dist','index.js')).href);
fs.mkdirSync(out,{recursive:true}); fs.mkdirSync(priv,{recursive:true});
const routes=['/','/work','/about','/careers','/contact','/ventures','/work/hypercinema','/work/into-the-amazon','/work/the-dj-and-the-war-crimes','/work/where-opportunity-takes-root'];
const mode=process.argv[2]||'pilot';
if(!['pilot','rest','full'].includes(mode))throw Error('MODE');
const indexes=mode==='pilot'?[0]:mode==='rest'?[1,2,3,4,5,6,7,8,9]:routes.map((v,i)=>i);
const x16=path.join(root,'02-reviewed-derived','X16-CURRENT');
const older=rd(path.join(x16,'X16-offline-byte-verified-js-inventory.json')).resources;
const extra=rd(path.join(x16,'X16-new-js-response-bodies-local-only.json')).items;
const prior=new Set([...older.map(x=>canon(x.url)),...extra.map(x=>canon(x.url))]);
function combine(){
 const parts=[];for(let i=0;i<10;i++){const f=path.join(out,'X18-route-'+String(i).padStart(2,'0')+'-metadata.json');if(fs.existsSync(f))parts.push(rd(f))}
 const seen=new Map(),edge=new Map();
 for(const p of parts){
  for(const s of p.jsUrls){const v=seen.get(s)||{url:s,routes:[],plugins:[]};if(!v.routes.includes(p.route))v.routes.push(p.route);seen.set(s,v)}
  for(const d of p.jsDetails){const v=seen.get(d.url)||{url:d.url,routes:[],plugins:[]};if(!v.plugins.includes(d.fromPlugin))v.plugins.push(d.fromPlugin);if(!v.routes.includes(p.route))v.routes.push(p.route);seen.set(d.url,v);
   const key=d.fromUrl+'|'+d.url+'|'+d.fromPlugin;const e=edge.get(key)||{from:d.fromUrl,to:d.url,plugin:d.fromPlugin,routes:[]};if(!e.routes.includes(p.route))e.routes.push(p.route);edge.set(key,e)}
 }
 const entries=[...seen.values()].sort((a,b)=>a.url.localeCompare(b.url));
 const newly=entries.filter(v=>!prior.has(v.url));
 const result={stage:'X18',utc:new Date().toISOString(),status:parts.length===10&&parts.every(x=>x.status==='PASS')?'COMPLETE_SCOPE_QUALIFIED':parts.length===10?'COMPLETE_SCOPE_QUALIFIED_WITH_GAPS':'PARTIAL',
  routesCompleted:parts.length,routesExpected:10,scans:parts.map(x=>({route:x.route,status:x.status,requests:x.requests,js:x.jsUrls.length,map:x.sourceMapCount,sources:x.sourceCount,error:x.error})),
  uniqueFirstPartyJS:entries.length,additionalPathsBeyondX16:newly.map(x=>x.url),knownBefore:prior.size,pluginEdges:edge.size,
  mapCount:parts.reduce((a,b)=>a+b.sourceMapCount,0),sourceCount:parts.reduce((a,b)=>a+b.sourceCount,0),
  resourceIndex:entries,dependencyObservations:[...edge.values()],
  limits:['First-party public GET/HEAD only','No authentication or cookies','No third-party downloads','Max 130 requests and 90 seconds per route','Max 3MB per response','RAM stop 100 MiB','JS plugin edges are not live browser import graph','Original private authoring source not inferred without advertised source maps']};
 save(path.join(out,'X18-MAIN-SUMMARY.json'),result);return result;
}
for(const i of indexes){
 const id=String(i).padStart(2,'0'),route=routes[i];
 const file=path.join(out,'X18-route-'+id+'-metadata.json');
 if(fs.existsSync(file)){console.log('X18_SKIP_EXISTING '+route);continue}
 const target='https://www.gladeye.com'+route, p=path.join(priv,'route-'+id);
 fs.mkdirSync(p,{recursive:true});
 const c={n:0,bytes:0,thirdParty:0,oversized:0,byHttp:{},minimumMiB:Math.round(os.freemem()/1048576)};
 const ctrl=new AbortController(),started=Date.now();
 let timeout=false,lowRam=false,fail=null,answer=null;
 const deadline=setTimeout(()=>{timeout=true;ctrl.abort()},90000);
 const monitor=setInterval(()=>{const m=Math.round(os.freemem()/1048576);c.minimumMiB=Math.min(c.minimumMiB,m);if(m<100){lowRam=true;ctrl.abort()}},800);
 const transport={async fetch(req){
  let u;try{u=new URL(req.url)}catch{return{status:400,body:new Uint8Array(),headers:{}}}
  if(!allow(u)){c.thirdParty++;return{status:403,body:new Uint8Array(),headers:{}}}
  const method=String(req.method||'GET').toUpperCase();if(!['HEAD','GET'].includes(method))return{status:405,body:new Uint8Array(),headers:{}};
  if(++c.n>130){ctrl.abort();return{status:429,body:new Uint8Array(),headers:{}}}
  const h=Object.fromEntries(Object.entries(req.headers||{}).filter(([k])=>!/authorization|cookie|api.key/i.test(k)));
  const signal=AbortSignal.any([ctrl.signal,AbortSignal.timeout(13000)]);
  const r=await fetch(u.toString(),{method,headers:h,credentials:'omit',redirect:'manual',signal});
  c.byHttp[r.status]=(c.byHttp[r.status]||0)+1;const rh=Object.fromEntries(r.headers.entries());
  const len=Number(r.headers.get('content-length')||0);
  if(method==='HEAD'||r.status<200||r.status>=300){await r.body?.cancel();return{status:r.status,headers:rh,body:new Uint8Array(),finalUrl:req.url}}
  if(len>3000000){c.oversized++;await r.body?.cancel();return{status:413,headers:rh,body:new Uint8Array(),finalUrl:req.url}}
  const reader=r.body?.getReader(),segments=[];let size=0;
  if(reader){try{for(;;){const z=await reader.read();if(z.done)break;size+=z.value.length;if(size>3000000){c.oversized++;await reader.cancel();return{status:413,headers:rh,body:new Uint8Array(),finalUrl:req.url}}segments.push(z.value)}}finally{reader.releaseLock()}}
  const bytes=new Uint8Array(size);let at=0;for(const seg of segments){bytes.set(seg,at);at+=seg.length}
  c.bytes+=size;return{status:r.status,headers:rh,body:bytes,finalUrl:req.url}
 }};
 try{answer=await scan({url:target,concurrency:2,timeoutMs:13000,maxBodySize:3000000,transport,noCache:true,cacheDir:path.join(p,'cache'),maxInlineSources:200,signal:ctrl.signal})}
 catch(e){fail=String(e?.name||'Error')+': '+String(e?.message||e).slice(0,160)}
 finally{clearTimeout(deadline);clearInterval(monitor)}
 const status=lowRam||timeout||fail?'PARTIAL':'PASS';
 let rawDigest=null;
 if(answer){const raw=path.join(p,'X18-private-jsdj-result.json');save(raw,answer);rawDigest=hash(fs.readFileSync(raw))}
 const urls=[...new Set((answer?.jsUrls||[]).map(canon).filter(v=>{try{return allow(new URL(v))}catch{return false}}))].sort();
 const details=(answer?.jsDetails||[]).map(x=>({url:canon(x.url),fromUrl:canon(x.fromUrl||''),fromPlugin:x.fromPlugin||'unknown',isInline:!!x.isInline})).filter(x=>{try{return allow(new URL(x.url))}catch{return false}});
 const maps=Object.entries(answer?.sourceMaps||{}).map(([k,v])=>({fromJs:canon(k),map:canon(v)}));
 const sources=(answer?.sources||[]).map(x=>({path:String(x.path).slice(0,200),fromJs:canon(x.fromJs||''),mode:x.mode,length:Buffer.byteLength(x.content||'','utf8'),sha256:hash(Buffer.from(x.content||'','utf8'))}));
 const record={route,status,utc:new Date().toISOString(),elapsedSeconds:Math.round((Date.now()-started)/1000),requests:c.n,
  bytesDownloaded:c.bytes,httpStatus:c.byHttp,blockedThirdParty:c.thirdParty,oversized:c.oversized,minimumRAMMiB:c.minimumMiB,
  timeout,lowRam,error:fail,jsUrls:urls,jsDetails:details,sourceMapCount:maps.length,sourceCount:sources.length,sourceMaps:maps,
  sourcesNoContent:sources,privateRawHash:rawDigest};
 save(file,record);const combined=combine();
 console.log('X18_ROUTE '+JSON.stringify({route,status,elapsedSeconds:record.elapsedSeconds,requests:c.n,JS:urls.length,maps:maps.length,sources:sources.length,novel:combined.additionalPathsBeyondX16.length,freeRAMMiB:Math.round(os.freemem()/1048576),error:fail}));
 if(lowRam)break;
}
const final=combine();
console.log('X18_ALL '+JSON.stringify({status:final.status,routes:final.routesCompleted,firstPartyJs:final.uniqueFirstPartyJS,newPaths:final.additionalPathsBeyondX16.length,edges:final.pluginEdges,maps:final.mapCount,sources:final.sourceCount}));
