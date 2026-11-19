// DJMRN X18 — no-network static plugin analysis of all SHA256-verified saved client JS files.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';
import {createHash} from 'node:crypto';import {pathToFileURL} from 'node:url';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const previous=path.join(root,'02-reviewed-derived','X16-CURRENT');
const dest=path.join(root,'02-reviewed-derived','X18-CURRENT');
const runtime=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X18-jsdj','node_modules','@ejfkdev','jsdj');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const canon=s=>{try{const u=new URL(s);return u.origin+u.pathname}catch{return '[unknown]'}};
const own=s=>{try{const u=new URL(s);return u.protocol==='https:'&&['www.gladeye.com','gladeye.com'].includes(u.hostname)}catch{return false}};
const named=read(path.join(previous,'X16-offline-byte-verified-js-inventory.json')).resources;
const fresh=read(path.join(previous,'X16-new-js-response-bodies-local-only.json')).items;
const known=new Set([...named.map(x=>canon(x.url)),...fresh.map(x=>canon(x.url))]);
const m=await import(pathToFileURL(path.join(runtime,'dist','index.js')).href);
const registry=m.createDefaultRegistry();const plugins=registry.getAll();
if(plugins.length!==26)throw Error('PLUGIN_COUNT_CHANGED');
if(os.freemem()<350*1048576)throw Error('RAM_UNDER_350_MIB');
fs.mkdirSync(dest,{recursive:true});
const files=named.filter(x=>x.verified&&x.localRelPath&&x.originalSha).map(x=>({url:x.url,sha:x.originalSha,relative:x.localRelPath}));
for(const x of fresh){if(!files.some(f=>canon(f.url)===canon(x.url)))files.push({url:x.url,sha:x.sha256,relative:x.localRelPath})}
const evidence=[],errors=[],found=new Map(),probes=new Map();
for(const f of files){
 if(os.freemem()<100*1048576)throw Error('STOP_RAM_100MIB');
 const file=path.join(root,...f.relative.split('/'));
 const bytes=fs.readFileSync(file),hash=sha(bytes);
 if(hash!==f.sha)throw Error('SHA256_MISMATCH '+canon(f.url));
 const input={sourceUrl:f.url,contentType:'js',content:new Uint8Array(bytes),text:bytes.toString('utf8')};
 const context={publicPaths:[],prependUrls:[new URL(f.url).origin],knownPaths:[]};
 const entry={url:canon(f.url),bytes:bytes.length,sha256:hash,matchedPlugins:[],candidateUrls:0,probeUrls:0};
 for(const plugin of plugins){
  try{
   if(!plugin.precheck(input,context))continue;
   entry.matchedPlugins.push(plugin.name);
   const analyzed=await plugin.analyze(input,context);
   for(const v of analyzed?.urls||[]){
    const s=typeof v==='string'?v:(v?.url||'');let absolute;
    try{absolute=new URL(s,f.url)}catch{continue}
    if(!own(absolute.href))continue;
    const val=canon(absolute.href),key=entry.url+'|'+val+'|'+plugin.name;
    if(!found.has(key))found.set(key,{fromJs:entry.url,candidate:val,plugin:plugin.name,kind:'STATIC_POTENTIAL_URL',alreadyObservedInX16:known.has(val)});
    entry.candidateUrls++;
   }
   for(const v of analyzed?.probeTargets||[]){
    const s=typeof v==='string'?v:(v?.url||'');let absolute;
    try{absolute=new URL(s,f.url)}catch{continue}
    if(!own(absolute.href))continue;
    const val=canon(absolute.href),key=entry.url+'|'+val+'|'+plugin.name;
    if(!probes.has(key))probes.set(key,{fromJs:entry.url,candidate:val,plugin:plugin.name,kind:'UNVERIFIED_PROBE_CANDIDATE'});
    entry.probeUrls++;
   }
  }catch(err){errors.push({js:entry.url,plugin:plugin.name,error:String(err?.name||'Error')+': '+String(err?.message||err).slice(0,130)})}
 }
 evidence.push(entry);
 console.log('X18_OFFLINE_FILE '+JSON.stringify({url:entry.url,matched:entry.matchedPlugins.length,candidates:entry.candidateUrls,probes:entry.probeUrls}));
}
const edges=[...found.values()],targets=[...new Set(edges.map(x=>x.candidate))],newTargets=targets.filter(x=>!known.has(x));
const summary={stage:'X18',scope:'offline JS-byte and jsdj plugin pattern inspection; NO HTTP requests',
 status:errors.length?'COMPLETE_SCOPE_QUALIFIED_WITH_PLUGIN_ERRORS':'COMPLETE_SCOPE_QUALIFIED',
 utc:new Date().toISOString(),verifiedJsInputCount:files.length,pluginCount:plugins.length,
 potentialEdges:edges.length,uniqueTargets:targets.length,
 candidateTargetsNotSeenInX16:newTargets.length,probeCandidates:probes.size,pluginExceptions:errors.length,
 importantLimitations:['Plugin match is a static hypothesis, not a browser execution trace',
   'Candidate URLs may not exist on site; no network requests made',
   'No source maps/private backend recovered','All source-body SHA256 checked against X16'],
 sourceInput:evidence,candidateEdges:edges,probeCandidatesMetadata:[...probes.values()],
 novelCandidates:newTargets,errors};
fs.writeFileSync(path.join(dest,'X18-OFFLINE-JSDJ-PLUGIN-AUDIT.json'),JSON.stringify(summary,null,2)+'\n');
console.log('X18_OFFLINE_COMPLETE '+JSON.stringify({status:summary.status,inputs:files.length,plugins:plugins.length,edges:edges.length,
 targets:targets.length,novel:newTargets.length,probes:probes.size,errors:errors.length}));
