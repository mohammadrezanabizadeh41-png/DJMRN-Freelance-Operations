import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const der=path.join(root,'02-reviewed-derived'),base=path.join(root,'01-private-captures','X13');
const run=process.argv[2]||fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory()&&x.name.startsWith('X13-HAR-CDP-TRUE180-')).map(x=>x.name).sort().at(-1);
if(!run)throw Error('No X13 HAR run');
const harPath=path.join(base,run,'gladeye-X13-redacted-metadata-only.har');
const har=JSON.parse(fs.readFileSync(harPath,'utf8'));const entries=har.log.entries;
const obs=JSON.parse(fs.readFileSync(path.join(der,run+'-capture-and-waterfall.json'),'utf8'));
const old2=JSON.parse(fs.readFileSync(path.join(root,'01-private-captures/X02/X02-2026-11-18T17-49-35-108Z/sanitized-metadata-only.har'),'utf8'));
const old1=JSON.parse(fs.readFileSync(path.join(root,'01-private-captures/X01-REDO/X01-R2-2026-11-18T18-01-09-463Z/private-capture-manifest.json'),'utf8'));
const old11=JSON.parse(fs.readFileSync(path.join(der,'X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json'),'utf8'));
const old12=JSON.parse(fs.readFileSync(path.join(der,'X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z-temporal-observation.json'),'utf8'));
const normalize=u=>{try{const x=new URL(u);return x.origin+x.pathname}catch{return null}};
const firstParty=u=>{try{return ['gladeye.com','www.gladeye.com'].includes(new URL(u).hostname)}catch{return false}};
const baseline=new Map();
function add(label,u){const p=normalize(u);if(!p||!firstParty(p))return;const s=baseline.get(p)||new Set();s.add(label);baseline.set(p,s)}
for(const r of old1.responses||[])add('X01_raw',r.url);
for(const r of old2.log.entries||[])add('X02_HAR',r.request?.url);
for(const r of old11.rows||[])if(r.firstParty)add('X11_WARC','https://'+r.host+r.path);
for(const t of old12.ticks||[])for(const r of t.page?.resources||[])add('X12_timeline',r.url);
const cur=[...new Set(entries.filter(r=>firstParty(r.request.url)).map(r=>normalize(r.request.url)))].sort();
const novel=cur.filter(x=>!baseline.has(x));
const crosswalk=cur.map(url=>({url,existing:baseline.has(url),alreadySeenBy:[...(baseline.get(url)||[])].sort()}));
const mime={},status={},initiator={},hosts={},types={};let sensitive=0;const times=[];
for(const e of entries){
 const m=e.response?.content?.mimeType||'unknown',st=String(e.response?.status??0),init=e._initiatorType||'unknown',typ=e._resourceType||'unknown';
 const host=(()=>{try{return new URL(e.request.url).hostname}catch{return 'unknown'}})();
 for(const [obj,k] of [[mime,m],[status,st],[initiator,init],[types,typ],[hosts,host]])obj[k]=(obj[k]||0)+1;
 if(e.request.headers?.length||e.request.cookies?.length||e.response.cookies?.length||e.request.queryString?.length||e.request.postData||e.response.content.text||e.request.url.includes('?'))sensitive++;
 if((e.response.headers||[]).some(h=>/cookie|secret|token|authorization|session|api.?key/i.test(h.name)))sensitive++;
 if(Number.isFinite(e.time)&&e.time>0)times.push(e.time);
}
times.sort((a,b)=>a-b);const pt=x=>times.length?+times[Math.min(times.length-1,Math.floor(times.length*x))].toFixed(2):null;
const scripts=entries.filter(e=>e._initiatorStack?.length).map(e=>({url:e.request.url,type:e._resourceType,frames:e._initiatorStack})).slice(0,85);
const failures=entries.filter(e=>e.response.status>=400||e.response.status===0||e._failed).map(e=>({url:e.request.url,status:e.response.status,failed:e._failed||null}));
const oldMimes=new Set((old2.log.entries||[]).map(e=>e.response?.content?.mimeType).filter(Boolean));
const result={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X13',run,status:'LIVE_HAR_X01_X12_CROSSWALK_COMPLETE',harFile:harPath,harSHA256:obs.harSha256,observerDurationSeconds:obs.observerDurationSeconds,
 historic:{X01RawManifestRows:old1.responses.length,X02OldHARRows:old2.log.entries.length,X11WARCResponses:old11.rows.length,X12TemporalTicks:old12.ticks.length,knownFirstPartyURLPaths:baseline.size},
 measured:{totalEntries:entries.length,firstPartyRequests:entries.filter(e=>firstParty(e.request.url)).length,thirdPartyRequests:entries.filter(e=>!firstParty(e.request.url)).length,uniqueFirstPartyPaths:cur.length,alreadyKnownFirstPartyPaths:cur.length-novel.length,novelFirstPartyURLPaths:novel.length,recordsWithJSCallFrames:scripts.length,requestDurationP50ms:pt(.5),requestDurationP90ms:pt(.9),mimes:mime,statuses:status,initiators:initiator,resourceTypes:types,hosts,newMimeRelativeToX02:Object.keys(mime).filter(x=>!oldMimes.has(x)),requestFailures:failures.length,sensitiveHARFieldsFound:sensitive},
 pathCrosswalk:crosswalk,novelFirstPartyPaths:novel,initiatorCallFrameLinks:scripts,failures,elapsedTicks:obs.pageCheckpoints,
 decisions:['HAR Viewer visualizes existing HAR, not a new browser interceptor','A different timing is not proof of new 3D assets','No response bodies/cookie/auth/query/user data archived; no first party source body duplicate','WebGL camera, GPU shader state and 60fps animation cannot be reconstructed by HAR metadata'],
 caveats:['CDP timing phases may be absent or -1 on cached resources','Paths absent from selected historical indexes do not prove not seen anywhere in previous project','Other website pages/menu states were outside this main-page three-minute observation']
};
const out=path.join(der,run+'-X01-X12-HAR-novelty-and-waterfall.json');
fs.writeFileSync(out,JSON.stringify(result,null,2));
console.log('X13_CROSSWALK_DONE',JSON.stringify({out,stats:result.measured,newFirstPartyPaths:novel,historic:result.historic}));