'use strict';
// DJMRN X19 — verify newly inferred public PNG asset paths without credentials.
// Checks bytes/signature + SHA256 versus all X01-X18 previous captured physical hashes.
// Original PNG bodies are archived privately and never published to GitHub.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const ROOT=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(ROOT,'02-reviewed-derived'),OUT=path.join(D,'X19-CURRENT');
const RAW=path.join(ROOT,'01-private-captures','X19','new-first-party-asset-bodies');
const rd=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const previous=rd(path.join(D,'X15-AUDIT-CURRENT','raw-captures-content-hash-index.json'));
const cross=rd(path.join(D,'X18-CROSS-STAGE-CURRENT','X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json'));
const scene=rd(path.join(OUT,'X19-SCENE-STRUCTURAL-CANDIDATES.json'));
if(cross.summary.status!=='COMPLETE_SCOPE_QUALIFIED'||previous.fileRows.length!==2247)throw Error('BASELINE_INCOMPLETE');
if(os.freemem()<350*1048576)throw Error('FREE_RAM_BELOW_350');
const oldHashes=new Set(previous.fileRows.map(x=>String(x.sha256).toLowerCase()));
const allOriginalSHA=new Set(cross.resources.flatMap(x=>(x.originalBodyVariants||[]).map(o=>o.sha256)));
const targets=['https://www.gladeye.com/matter/skull.png','https://www.gladeye.com/matter/wave.png'];
for(const u of targets){
 const hint=new URL(u).pathname;
 if(!scene.staticAssetPathHints.some(x=>x.hint===hint))throw Error('NOT_FROM_X19_VERIFIED_STATIC_HINT_'+hint);
}
fs.mkdirSync(RAW,{recursive:true});
const checks=[];
for(const u of targets){
 const v=new URL(u);
 if(v.protocol!=='https:'||v.hostname!=='www.gladeye.com'||cross.resources.some(x=>x.url===v.origin+v.pathname))throw Error('NOT_A_NEW_FIRST_PARTY_PATH');
 const r={url:u,status:null,sha256:null,bytes:null,width:null,height:null,contentType:null,firstSeenStage:'X19',
  provenance:'STATIC_STRING_HINT_FROM_SHA_VERIFIED_JS + ANONYMOUS_GET_HTTP200 + BINARY_PNG_MAGIC + SHA256',
  existingX01toX18Path:false,oldPhysicalBodyHashMatches:0,oldOriginalBodyHashMatches:0,
  originalFilePrivateRelativePath:null};
 try{
  const response=await fetch(u,{method:'GET',credentials:'omit',redirect:'manual',signal:AbortSignal.timeout(16000)});
  r.status=response.status;r.contentType=response.headers.get('content-type');
  const length=Number(response.headers.get('content-length')||0);
  if(response.status!==200||!/^image\/png\b/i.test(r.contentType||'')||length>2000000)throw Error('HTTP_OR_MIME_OR_SIZE_PRECONDITION_FAIL');
  const bytes=Buffer.from(await response.arrayBuffer());
  if(bytes.length<24||bytes.length>2000000||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('INVALID_PNG_FILE_OR_TOO_LARGE');
  const hash=sha(bytes),width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
  const filename=hash.slice(0,24)+'-'+path.basename(v.pathname);
  const target=path.join(RAW,filename);
  if(fs.existsSync(target)){if(sha(fs.readFileSync(target))!==hash)throw Error('SHA_COLLISION_EXISTING_PRIVATE_FILE')}
  else fs.writeFileSync(target,bytes,{flag:'wx'});
  r.sha256=hash;r.bytes=bytes.length;r.width=width;r.height=height;
  r.originalFilePrivateRelativePath=path.relative(ROOT,target).replaceAll('\\','/');
  r.oldPhysicalBodyHashMatches=previous.fileRows.filter(x=>String(x.sha256).toLowerCase()===hash).length;
  r.oldOriginalBodyHashMatches=allOriginalSHA.has(hash)?1:0;
  r.relation=r.oldPhysicalBodyHashMatches===0&&r.oldOriginalBodyHashMatches===0?'NEW_URL_NEW_BYTES':
    'NEW_URL_REUSED_PREVIOUS_BYTES';
 }catch(e){r.error=(e.name||'Error')+': '+String(e.message).slice(0,170);r.relation='NOT_FULLY_VERIFIED'}
 checks.push(r);
 console.log('X19_ASSET '+JSON.stringify({url:r.url,status:r.status,sha:r.sha256,bytes:r.bytes,
  dimensions:[r.width,r.height],previousHashMatches:r.oldPhysicalBodyHashMatches,relation:r.relation,error:r.error||null}));
}
const status=checks.every(x=>x.status===200&&x.relation==='NEW_URL_NEW_BYTES'&&x.sha256&&x.bytes)?'TWO_NEW_ORIGINAL_ASSET_BODIES_VERIFIED':'SCOPE_QUALIFIED_NEEDS_REVIEW';
const report={stage:'X19',status,utc:new Date().toISOString(),source:'webcrack 34-client-JS module graph static asset hint',
 comparisonAuthority:'X01-X18 76-path canonical ledger and 2247 per-file hashes; not just X16',
 maxDirectGetRequests:2,items:checks,privacy:'original PNG body bytes private on owner Windows only',
 caveats:['Exactly two public PNG bodies were independently retrieved; other site assets not exhaustively probed',
 'A text string path is only a hypothesis until response+signature+SHA proof succeeds',
 'No third-party vendor source code or image pixels published to GitHub']};
fs.writeFileSync(path.join(OUT,'X19-NEW-PNG-ORIGINAL-BODY-ACCEPTANCE-PRIVATE.json'),JSON.stringify(report,null,2)+'\n');
const publicReport={...report,items:checks.map(({originalFilePrivateRelativePath,...v})=>v)};
fs.writeFileSync(path.join(OUT,'X19-NEW-PNG-ORIGINAL-BODY-PUBLIC-METADATA.json'),JSON.stringify(publicReport,null,2)+'\n');
console.log('X19_NEW_PNG_ACCEPTANCE '+JSON.stringify({status,newBinaries:checks.filter(x=>x.relation==='NEW_URL_NEW_BYTES').length,totalBytes:checks.reduce((s,x)=>s+(x.bytes||0),0)}));
if(status!=='TWO_NEW_ORIGINAL_ASSET_BODIES_VERIFIED')process.exitCode=2;
