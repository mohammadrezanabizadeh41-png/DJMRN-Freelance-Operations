// DJMRN X18 optimization patch: preserve v1, generate cached v2 for repeat-route analysis.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';
const d=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION','02-reviewed-derived','X18-PREFLIGHT');
const src=path.join(d,'X18-Bounded-FirstParty-Main-Scan.mjs');
const dest=path.join(d,'X18-Bounded-FirstParty-Main-Scan-v2.mjs');
if(fs.existsSync(dest))throw Error('NO_OVERWRITE_OF_V2');
let s=fs.readFileSync(src,'utf8');
function must(a,b){if(s.split(a).length!==2)throw Error('PATCH_NEEDS_EXACT_UNIQUE_MATCH:'+a.slice(0,75));s=s.replace(a,b)}
const declaration="const prior=new Set([...older.map(x=>canon(x.url)),...extra.map(x=>canon(x.url))]);";
must(declaration,declaration+"\nconst sharedCache=new Map();let totalCachedBytes=0;");
const ctr="const c={n:0,bytes:0,thirdParty:0,oversized:0,byHttp:{},minimumMiB:Math.round(os.freemem()/1048576)};";
must(ctr,ctr.replace('n:0,','n:0,hits:0,'));
const method="const method=String(req.method||'GET').toUpperCase();if(!['HEAD','GET'].includes(method))return{status:405,body:new Uint8Array(),headers:{}};";
must(method,method+"\n  const cacheKey=method+' '+u.toString();if(sharedCache.has(cacheKey)){c.hits++;return sharedCache.get(cacheKey)}");
const fail="if(method==='HEAD'||r.status<200||r.status>=300){await r.body?.cancel();return{status:r.status,headers:rh,body:new Uint8Array(),finalUrl:req.url}}";
must(fail,"if(method==='HEAD'||r.status<200||r.status>=300){await r.body?.cancel();const item={status:r.status,headers:rh,body:new Uint8Array(),finalUrl:req.url};if(r.status===404||r.status===200)sharedCache.set(cacheKey,item);return item}");
const success="c.bytes+=size;return{status:r.status,headers:rh,body:bytes,finalUrl:req.url}";
must(success,"c.bytes+=size;const item={status:r.status,headers:rh,body:bytes,finalUrl:req.url};if(size<=700000&&totalCachedBytes+size<=24000000){sharedCache.set(cacheKey,item);totalCachedBytes+=size}return item");
must("concurrency:2,timeoutMs:13000","concurrency:3,timeoutMs:13000");
must("const record={route,status,utc:","const record={route,status,cacheHits:c.hits,utc:");
fs.writeFileSync(dest,s);
console.log('X18_V2_GENERATED '+JSON.stringify({src,dest,sourceChars:fs.readFileSync(src,'utf8').length,v2Chars:s.length,expectedChange:'cache 404/200 GET/HEAD and small bodies; concurrency 3; 90s route limit'}));
