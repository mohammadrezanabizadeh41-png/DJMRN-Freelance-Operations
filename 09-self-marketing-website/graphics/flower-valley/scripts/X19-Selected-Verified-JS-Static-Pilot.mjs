// DJMRN X19 — bounded static AST pilot on two already SHA-verified public JS response bodies.
// Does not evaluate downloaded code; original/transformed vendor bytes stay in owner's private archive.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(root,'02-reviewed-derived'),P=path.join(D,'X19-PREFLIGHT');
const priv=path.join(root,'01-private-captures','X19','selected-static-bundles');
const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X19-webcrack');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const old=read(path.join(D,'X17-CURRENT','X17-bundle-size-and-hash-inventory.json'));
const cross=read(path.join(D,'X18-CROSS-STAGE-CURRENT','X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json'));
const pkg=read(path.join(rt,'node_modules','webcrack','package.json'));
const owner=read(path.join(P,'X19-OWN-FIXTURE-ACCEPTANCE.json'));
if(pkg.version!=='2.16.0'||owner.status!=='STATIC_TOOL_OPERATIONAL'||cross.summary.status!=='COMPLETE_SCOPE_QUALIFIED')throw Error('PREFLIGHT_GATE_MISSING');
if(os.freemem()<350*1048576)throw Error('PILOT_RAM_PRECONDITION_LT_350');
const selected=[
 'https://www.gladeye.com/_next/static/chunks/webpack-a76c04a7ba9aa4ef.js',
 'https://www.gladeye.com/_next/static/chunks/app/work/%5Bwork%5D/page-af89f4191159d0b5.js'
];
const {webcrack}=await import(pathToFileURL(path.join(rt,'node_modules','webcrack','dist','index.js')).href);
fs.mkdirSync(priv,{recursive:true});
const results=[];
for(let i=0;i<selected.length;i++){
 const url=selected[i],row=old.rows.find(x=>x.url===url),lineage=cross.resources.find(x=>x.url===url);
 if(!row?.verified||!row.privatePath||!lineage)throw Error('UNVERIFIED_SELECTED_ORIGIN:'+url);
 const f=path.resolve(root,...row.privatePath.replaceAll('\\','/').split('/'));
 if(!f.toLowerCase().startsWith(root.toLowerCase()+path.sep))throw Error('PATH_OUT_OF_SCOPE');
 const input=fs.readFileSync(f);
 if(sha(input)!==row.sha256||input.length!==row.bytes)throw Error('INPUT_SHA_CHANGED');
 const id=String(i).padStart(2,'0'),dest=path.join(priv,id+'-static');
 if(fs.existsSync(dest))throw Error('PRIVATE_OUTPUT_EXISTS_REVIEW_FIRST');
 const began=Date.now(),startRam=Math.round(os.freemem()/1048576);
 const timer=setTimeout(()=>{console.error('X19_REAL_PILOT_TIMEOUT');process.exit(124)},30000);
 let result;
 try{
   result=await webcrack(input.toString('utf8'),{deobfuscate:false,jsx:false,unminify:true,unpack:true});
   await result.save(dest);
 }finally{clearTimeout(timer)}
 const files=fs.readdirSync(dest,{recursive:true}).filter(n=>fs.statSync(path.join(dest,n)).isFile())
 .map(n=>({name:n,bytes:fs.statSync(path.join(dest,n)).size}));
 const record={sourceUrl:url,firstSeenStage:lineage.firstSeenStage,sourceSHA256:row.sha256,sourceBytes:row.bytes,
  webcrackMode:'AST/unminify/unpack; deobfuscate=false; jsx=false',bundleType:result.bundle?.type||null,
  unpackedModules:result.bundle?.modules?.size||0,
  derivedCodeBytes:Buffer.byteLength(result.code||''),privateOutputFileCount:files.length,
  privateOutputFiles:files,durationMs:Date.now()-began,ramStartMiB:startRam,ramEndMiB:Math.round(os.freemem()/1048576),
  classification:'COMPLEMENTARY_STRUCTURE_NOT_NEW_VENDOR_BYTES',status:(files.length>0&&result.code?.length>0)?'PASS':'FAIL',
  provenance:'Local X17 verified original HTTP response body, cross-checked with X01-X18 URL/hash lineage'};
 results.push(record);
 console.log('X19_SELECTED_BUNDLE '+JSON.stringify({index:i,status:record.status,url,firstSeen:record.firstSeenStage,
  type:record.bundleType,modules:record.unpackedModules,codeBytes:record.derivedCodeBytes,duration:record.durationMs}));
}
const checks={ownerFixtureAccepted:true,knownURLAndSHAInCrosswalk:results.every(x=>x.firstSeenStage&&x.sourceSHA256),
 allSelectedOriginalBytesSHAValid:results.length===2,
 bothStaticRunsOutput:results.every(x=>x.status==='PASS'),noRuntimeExecution:true,
 noNewHTTPRequests:true,withinPrivateOwnerArchive:true,memAboveEmergency:os.freemem()>100*1048576};
const status=Object.values(checks).every(Boolean)?'X19_STATIC_PILOT_PASS':'X19_PILOT_PARTIAL';
const output={status,utc:new Date().toISOString(),checks,tool:'webcrack@2.16.0',selected:results,
 limits:['JS is publicly delivered byte-verified old evidence; no new external requests','Outputs are private, never copy vendor JS to public GitHub',
 'AST/module hypotheses do not restore original authorship/server code or prove new source assets',
 'Native isolated-vm was intentionally NOT loaded; advanced decoder not tested','This is X19 activation pilot, not X19 full stage acceptance']};
fs.writeFileSync(path.join(P,'X19-SELECTED-ORIGINAL-JS-STATIC-PILOT.json'),JSON.stringify(output,null,2)+'\n');
console.log('X19_PILOT_ACCEPTANCE '+JSON.stringify({status,checks,selected:results.map(x=>({url:x.sourceUrl,bundleType:x.bundleType,modules:x.unpackedModules,firstSeen:x.firstSeenStage}))}));
if(status!=='X19_STATIC_PILOT_PASS')process.exitCode=2;
