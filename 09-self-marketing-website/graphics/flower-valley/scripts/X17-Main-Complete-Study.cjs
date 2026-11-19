'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),zlib=require('zlib'),cp=require('child_process'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const x16=path.join(root,'02-reviewed-derived','X16-CURRENT'),pre=path.join(root,'02-reviewed-derived','X17-PREFLIGHT'),out=path.join(root,'02-reviewed-derived','X17-CURRENT');
const pkg=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X17-SourceMapExplorer','node_modules','source-map-explorer');
const cli=path.join(pkg,'bin','cli.js'),read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'')),get=n=>read(path.join(x16,n)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const save=(n,o)=>fs.writeFileSync(path.join(out,n),JSON.stringify(o,null,2)+'\n');
if(os.freemem()<350*1048576||!fs.existsSync(cli))throw Error('X17_PREFLIGHT_NOT_READY');
const a=get('X16-offline-byte-verified-js-inventory.json'),b=get('X16-new-js-response-bodies-local-only.json'),s=get('X16-source-map-reachability.json'),g=get('X16-script-init-network-graph.json'),v=get('X16-live-summary.json');
if(read(path.join(pre,'X17-PREFLIGHT-ACCEPTANCE.json')).status!=='TOOL_READY_COMPAT_MODE_SCOPE_QUALIFIED')throw Error('X17_PREVIOUS_GATE_FAIL');
fs.mkdirSync(out,{recursive:true});
const table=new Map();
function add(u,role,rel,h,provenance){
 const r={url:u,role,source:provenance,verified:false,bytes:null,gzipBytes:null,brotliBytes:null,sha256:h||null,privatePath:rel||null};
 if(rel&&h){
  const p=path.join(root,...rel.split('/'));if(!fs.existsSync(p))throw Error('MISSING_'+u);
  const raw=fs.readFileSync(p);if(sha(raw)!==h)throw Error('SHA_MISMATCH_'+u);
  Object.assign(r,{verified:true,bytes:raw.length,gzipBytes:zlib.gzipSync(raw,{level:9}).length,brotliBytes:zlib.brotliCompressSync(raw,{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:5}}).length});
 }table.set(u,r);
}
for(const x of a.resources)add(x.url,x.role,x.verified?x.localRelPath:null,x.verified?x.originalSha:null,'X15');
for(const x of b.items){if(table.has(x.url)&&table.get(x.url).verified)continue;add(x.url,'NEXT_APP_ROUTE_CHUNK',x.localRelPath,x.sha256,'X16');}
const rows=[...table.values()].sort((x,y)=>x.url.localeCompare(y.url)),valid=rows.filter(x=>x.verified),missing=rows.filter(x=>!x.verified);
const totals=valid.reduce((p,x)=>(p.raw+=x.bytes,p.gzip+=x.gzipBytes,p.brotli+=x.brotliBytes,p),{raw:0,gzip:0,brotli:0});
const byRole={};for(const x of valid){const t=byRole[x.role]||{count:0,raw:0,gzip:0,brotli:0};t.count++;t.raw+=x.bytes;t.gzip+=x.gzipBytes;t.brotli+=x.brotliBytes;byRole[x.role]=t}
const keys=['url','role','source','verified','bytes','gzipBytes','brotliBytes','sha256','privatePath'],q=x=>'"'+String(x??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(out,'X17-bundle-size-and-hash-inventory.csv'),[keys.join(','),...rows.map(x=>keys.map(k=>q(x[k])).join(','))].join('\r\n')+'\r\n');
save('X17-bundle-size-and-hash-inventory.json',{known:rows.length,verified:valid.length,missing:missing.map(x=>x.url),totals,byRole,rows,warning:'Local independent gzip/Brotli recompression; not observed HTTP wire sizes'});
const fixture=path.join(pre,'djmrn-own-sourcemap-fixture.js'),map=fixture+'.map',tests=[];
for(const [name,fmt,file,opts] of [['json','--json','X17-own-component-map.json',[]],['html','--html','X17-own-component-treemap.html',[]],['tsv','--tsv','X17-own-component-map.tsv',[]],['gzip','--json','X17-own-component-gzip.json',['--gzip']],['onlyMapped','--json','X17-own-component-only-mapped.json',['--only-mapped']]]){
 if(os.freemem()<100*1048576)throw Error('STOP_RAM_100MIB');
 const p=path.join(out,file);if(fs.existsSync(p))throw Error('NO_OVERWRITE_'+file);
 const res=cp.spawnSync(process.execPath,[cli,fixture,map,'--no-border-checks',...opts,fmt,p],{encoding:'utf8',timeout:25000,maxBuffer:100000});
 const t={name,exitCode:res.status,outputFile:file,outputBytes:fs.existsSync(p)?fs.statSync(p).size:0,stderr:String(res.stderr||'').slice(0,500)};
 t.pass=t.exitCode===0&&t.outputBytes>(name==='html'?1000:0);
 if(t.pass&&['json','gzip','onlyMapped'].includes(name)){try{t.jsonKeys=Object.keys(read(p))}catch(e){t.pass=false;t.error='JSON_PARSE_FAIL'}}
 if(t.pass)t.sha256=sha(fs.readFileSync(p));tests.push(t);
}
const checks={verifiedOriginalSHA:valid.length===31&&missing.length===1,allFiveCliModes:tests.length===5&&tests.every(x=>x.pass),X16NetworkGraph:g.edges.length===130,X16AdvertisedMapsAbsent:s.candidates.length===0,ramStopNotTriggered:os.freemem()>100*1048576};
const status=Object.values(checks).every(Boolean)?'COMPLETE_SCOPE_QUALIFIED':'PARTIAL_REVIEW_REQUIRED';
const result={dateUtc:new Date().toISOString(),status,tool:'Source Map Explorer 2.5.3',checks,referenceJS:{known:rows.length,verified:valid.length,missing:missing.map(x=>x.url),totals,roles:byRole,top:valid.slice().sort((x,y)=>y.bytes-x.bytes).slice(0,10).map(x=>({url:x.url,bytes:x.bytes,gzipBytes:x.gzipBytes,brotliBytes:x.brotliBytes}))},sourceMaps:{X16Advertised:s.candidates.length,originalAuthorSourceMapRecovered:false,originalComponentTreemapAvailable:false},graph:{initiatorEdges:g.edges.length,visitedRoutes:v.visitCount},ownedFixture:tests,limitations:['Owner fixture mapped analysis only; no target map','No guessed .map URLs','--no-border-checks explicit compatibility mode, not strict map validation','Local gzip/Brotli not actual network transfer size','Client network edges are not exact original imports']};
save('X17-main-acceptance.json',result);
const text=[
'# DJMRN — X17 Source Map Explorer main analysis',
'',
'Date: 2026-11-19. X17 status: '+status+'. X18 NEXT, not started.',
'',
'## Validity',
'Pinned Source Map Explorer 2.5.3 Apache-2.0, isolated npm runtime, preflight compatibility gate. Original strict column-boundary checks fail on owner/upstream fixture; documented --no-border-checks used explicitly only on owner fixture.',
'Five operating modes: '+tests.map(x=>x.name+' '+(x.pass?'PASS':'FAIL')+' ('+x.outputBytes+' B)').join('; ')+'. Own fixture maps source modules, not reference website modules.',
'',
'## Original client JS, all byte-verified files',
'Known first-party JS URL paths: '+rows.length+'. Original-body verified SHA256: '+valid.length+'. No verified standalone body: '+missing.map(x=>x.url).join('; ')+'.',
'Aggregate original bytes: '+totals.raw+'. Per-file local gzip sum: '+totals.gzip+'. Per-file local Brotli sum: '+totals.brotli+'. Not HTTP transfer size.',
'Byte roles: '+JSON.stringify(byRole)+'. File-by-file evidence in X17-bundle-size-and-hash-inventory.json and .csv. Original JS bytes private on laptop.',
'Top bundles: '+result.referenceJS.top.map(x=>x.url+' '+x.bytes+' bytes').join('; ')+'.',
'',
'## Runtime cross-check and missing source maps',
'CDP first-party initiator relations in X16: '+g.edges.length+'. Request-initiation graph is not original authored module import graph.',
'No source map advertised across X16 ten-route scoped study: '+s.candidates.length+'. No extra guessed map requests, no unpublished source/backend recovery.',
'Original authored JS component tree: UNKNOWN/UNAVAILABLE. No original-source treemap fabricated.',
'Own fixture HTML/JSON/TSV/gzip/mapped-only outputs and flags are preserved in X17-CURRENT.',
'',
'## Acceptance and next step',
Object.entries(checks).map(([k,v])=>k+': '+(v?'PASS':'FAIL')).join('; ')+'.',
'Scope-qualified means operational fixture mapping and exhaustive local SHA-backed first-party JS bundle-size audit; does not mean full reference-source or scene extraction.',
'Next X18 jsdj is distinct; NOT STARTED.',
'',
'Official docs: https://github.com/danvk/source-map-explorer#readme',
].join('\n');
fs.writeFileSync(path.join(out,'X17-TECHNICAL-HANDOFF-2026-11-19.md'),text+'\n');
const src=path.join(os.homedir(),'PCRC-Workspace','X17-Main-Complete-Study.cjs');if(fs.existsSync(src))fs.copyFileSync(src,path.join(out,'X17-Main-Complete-Study.cjs'));
console.log('X17_DONE '+JSON.stringify({status,checks,totals,verified:valid.length,missing:missing.length,fixture:tests.map(x=>({name:x.name,pass:x.pass,bytes:x.outputBytes})),output:out}));
if(status!=='COMPLETE_SCOPE_QUALIFIED')process.exitCode=2;
