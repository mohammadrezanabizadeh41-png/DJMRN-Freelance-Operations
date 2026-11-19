'use strict';
// DJMRN X19 — enhanced AST deobfuscation for all 34 verified public client JS inputs.
// No arbitrary vendor code is executed. Native VM callbacks explicitly denied.
// One child worker per input with timeout and 100 MiB RAM emergency floor.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto'),cp=require('child_process');
const ROOT=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(ROOT,'02-reviewed-derived','X19-CURRENT'),R=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X19-webcrack');
const PRIVATE=path.join(ROOT,'01-private-captures','X19','full-verified-js-unpack');
const base=path.join(D,'safe-advanced-per-file');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const write=(f,o)=>{fs.mkdirSync(path.dirname(f),{recursive:true});const t=f+'.tmp';fs.writeFileSync(t,JSON.stringify(o,null,2)+'\n');fs.renameSync(t,f)};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function fromRel(rel){
 const f=path.resolve(ROOT,...rel.replaceAll('\\','/').split('/'));
 if(!f.toLowerCase().startsWith(ROOT.toLowerCase()+path.sep))throw Error('BAD_INPUT_PATH');
 return f
}
const manifest=read(path.join(D,'X19-FULL-INPUT-MANIFEST-PRIVATE.json'));
if(manifest.count!==34||read(path.join(D,'X19-FULL-INDEPENDENT-ACCEPTANCE.json')).status!=='FULL_VERIFIED_JS_STATIC_SWEEP_PASS')
 throw Error('PRIOR_FULL_STATIC_NOT_ACCEPTED');
const eachFile=it=>path.join(base,it.sha256.slice(0,20)+'.json');
async function worker(index){
 const it=manifest.items[index];
 if(!it)throw Error('NO_INPUT');
 const b=fs.readFileSync(fromRel(it.relative));
 if(sha(b)!==it.sha256||b.length!==it.bytes)throw Error('INPUT_BYTES_CHANGED');
 const {pathToFileURL}=await import('node:url');
 const {webcrack}=await import(pathToFileURL(path.join(R,'node_modules','webcrack','dist','index.js')).href);
 let denials=0,transformed='',err=null,time=Date.now();
 try{
  const result=await webcrack(b.toString('utf8'),{deobfuscate:true,unminify:true,unpack:false,jsx:true,
   sandbox:async()=>{denials++;throw Error('DJMRN_DENY_UNTRUSTED_VENDOR_CODE_VM_EXECUTION')}});
  transformed=result.code;
 }catch(e){err=(e.name||'Error')+': '+String(e.message).slice(0,180)}
 const folder=path.join(PRIVATE,String(index).padStart(2,'0')+'-'+it.sha256.slice(0,14));
 const originalTransformed=path.join(folder,'static','deobfuscated.js');
 const original=fs.readFileSync(originalTransformed);
 const changed=transformed.length>0&&sha(Buffer.from(transformed))!==sha(original);
 let saved=false;
 if(changed&&denials===0){
  const loc=path.join(folder,'enhanced-no-vm');fs.mkdirSync(loc,{recursive:true});
  const file=path.join(loc,'deobfuscated-ast.js');
  if(fs.existsSync(file)&&sha(fs.readFileSync(file))!==sha(Buffer.from(transformed)))throw Error('OUTPUT_COLLISION');
  if(!fs.existsSync(file))fs.writeFileSync(file,transformed,{flag:'wx'});
  saved=true;
 }
 const status=err?(denials>0?'BLOCKED_NATIVE_EXECUTION_OF_UNTRUSTED_CODE':'ADVANCED_AST_ERROR'):
   denials>0?'BLOCKED_NATIVE_EXECUTION_OF_UNTRUSTED_CODE':'SAFE_ADVANCED_AST_PASS';
 const rec={stage:'X19',status,sourceUrl:it.url,firstSeenStage:it.firstSeenStage,sha256:it.sha256,
  bytes:it.bytes,mode:'deobfuscate=true, unminify=true, jsx=true, unpack=false, custom sandbox forbids ANY vendor VM execution',
  safeTransformedSha256:transformed?sha(Buffer.from(transformed)):null,
  outputBytes:Buffer.byteLength(transformed),changesFromStatic:changed,
  privateExtraOutputSaved:saved,vmCallbackDenials:denials,elapsedMs:Date.now()-time,error:err,
  security:'No web browser/code execution; sandbox callback explicitly rejects untrusted VM evaluation'};
 write(eachFile(it),rec);
 console.log('X19_SAFE_ADVANCED_WORKER '+JSON.stringify({index,status,bytes:it.bytes,changed,saved,denials}));
}
function aggregate(){
 const records=manifest.items.map((it,i)=>{
  const f=eachFile(it);
  return fs.existsSync(f)?read(f):{sourceUrl:it.url,sha256:it.sha256,status:'NOT_PROCESSED'};
 });
 const counts=records.reduce((v,x)=>(v[x.status]=(v[x.status]||0)+1,v),{});
 const report={stage:'X19',status:records.length===34&&records.every(x=>x.status==='SAFE_ADVANCED_AST_PASS')?
   'ALL_34_ADVANCED_NON_EXECUTING_TRANSFORMS_PASS':'SCOPE_QUALIFIED_ADVANCED_TRANSFORMS',
  utc:new Date().toISOString(),counts,total:records.length,
  modifiedStaticOutputs:records.filter(x=>x.privateExtraOutputSaved).length,
  vmCallbacksDenied:records.reduce((s,x)=>s+(x.vmCallbackDenials||0),0),
  allOriginalBodySHAProven:true,webcrackVersion:'2.16.0',
  proprietaryDerivedOutputsPrivate:true,
  results:records.map(x=>({url:x.sourceUrl,firstSeenStage:x.firstSeenStage,sourceSHA256:x.sha256,
   status:x.status,changed:x.changesFromStatic||false,extraPrivateFile:x.privateExtraOutputSaved||false,
   vmCallbackDenials:x.vmCallbackDenials||0,error:x.error||null,elapsedMs:x.elapsedMs||null})),
  limitations:['This is AST deobfuscation, not execution of third-party code with native isolated-vm',
   'The installed native addon was separately proven on an OWN fixture; that is not an authorization for untrusted code',
   'Results are derivative transforms, not newly acquired website source assets']};
 write(path.join(D,'X19-ALL-34-SAFE-ADVANCED-RESULTS.json'),report);
 console.log('X19_SAFE_ADVANCED_FINAL '+JSON.stringify({status:report.status,counts,modified:report.modifiedStaticOutputs,
  denied:report.vmCallbacksDenied}));
}
async function parent(){
 for(let i=0;i<manifest.items.length;i++){
  const it=manifest.items[i],f=eachFile(it);
  if(fs.existsSync(f)&&read(f).status==='SAFE_ADVANCED_AST_PASS'){console.log('X19_ADVANCED_ALREADY_DONE '+i);continue}
  if(os.freemem()<350*1048576){console.log('X19_ADVANCED_LOW_RAM_PAUSE');break}
  const timeout=it.bytes>300000?95000:it.bytes>100000?55000:35000;
  const outcome=await new Promise(resolve=>{
   const child=cp.spawn(process.execPath,['--no-node-snapshot','--max-old-space-size=640',__filename,'worker',String(i)],
     {cwd:ROOT,windowsHide:true,stdio:['ignore','pipe','pipe']});
   let err='',out='',reason=null;
   const timer=setTimeout(()=>{reason='TIMEOUT';child.kill()},timeout);
   const guard=setInterval(()=>{if(os.freemem()<100*1048576){reason='LOW_RAM_KILL';child.kill()}},700);
   child.stdout.on('data',d=>{out=(out+d.toString()).slice(-1000)});
   child.stderr.on('data',d=>{err=(err+d.toString()).slice(-1100)});
   child.on('error',e=>reason=e.message);
   child.on('close',(code)=>{clearTimeout(timer);clearInterval(guard);resolve({code,reason,err,out})});
  });
  if(!fs.existsSync(f))write(f,{status:outcome.reason||'WORKER_FAILED',sourceUrl:it.url,
   sha256:it.sha256,error:outcome.err.slice(0,250)});
  console.log('X19_ADVANCED_STEP '+JSON.stringify({index:i,status:read(f).status,
   exitCode:outcome.code,ramMiB:Math.round(os.freemem()/1048576)}));
  if(outcome.reason==='LOW_RAM_KILL')break;
 }
 aggregate()
}
(async()=>{
 try{if(process.argv[2]==='worker')await worker(Number(process.argv[3]));
 else await parent()}
 catch(e){console.error('X19_SAFE_ADVANCED_ERROR '+(e.stack||e));process.exitCode=2}
})();
