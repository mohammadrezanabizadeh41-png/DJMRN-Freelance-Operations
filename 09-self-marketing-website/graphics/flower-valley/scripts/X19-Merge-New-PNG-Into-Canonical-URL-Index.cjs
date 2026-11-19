'use strict';
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto');
const home=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(home,'02-reviewed-derived'),out=path.join(dir,'X19-CURRENT');
const rd=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const wr=(n,v)=>fs.writeFileSync(path.join(out,n),JSON.stringify(v,null,2)+'\n');
const a=rd(path.join(dir,'X18-CROSS-STAGE-CURRENT','X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json'));
const b=rd(path.join(out,'X19-NEW-PNG-ORIGINAL-BODY-ACCEPTANCE-PRIVATE.json'));
const hints=rd(path.join(out,'X19-SCENE-STRUCTURAL-CANDIDATES.json'));
if(a.resources.length!==76||b.status!=='TWO_NEW_ORIGINAL_ASSET_BODIES_VERIFIED')throw Error('BASELINE_NOT_READY');
const rows=a.resources.map(x=>structuredClone(x));
for(const x of b.items){
 const file=path.resolve(home,...x.originalFilePrivateRelativePath.split('/'));
 if(!file.startsWith(home+path.sep)||!fs.existsSync(file))throw Error('FILE_NOT_FOUND');
 const buf=fs.readFileSync(file);
 const hash=crypto.createHash('sha256').update(buf).digest('hex');
 if(hash!==x.sha256||buf.length!==x.bytes||rows.some(z=>z.url===x.url))throw Error('ASSET_HASH_OR_URL_FAILED');
 rows.push({url:x.url,role:'IMAGE_OR_TEXTURE',firstSeenStage:'X19',x15Classification:null,
  reportedStages:['X19'],observations:[{stage:'X19',kind:'STATIC_MODULE_LITERAL_HINT'},
  {stage:'X19',kind:'ORIGINAL_HTTP200_PNG_SHA256_VERIFIED'}],
  originalBodyVariants:[{sha256:hash,bytes:buf.length,stage:'X19',kind:'ORIGINAL_HTTP_RESPONSE_BODY'}],
  confirmedNetworkPath:true,firstOriginalByteStage:'X19',currentBodySHA256:hash,
  bodyIdentity:'ORIGINAL_BODY_SHA256_VERIFIED',
  notes:['PNG '+x.width+'x'+x.height+'; novel original HTTP body versus X01–X18 baseline']});
}
const resolutions=hints.staticAssetPathHints.map(v=>{
 const stem=v.hint.split('?')[0],direct='https://www.gladeye.com'+stem;
 const exact=rows.find(x=>x.url===direct),match=rows.filter(x=>x.url.endsWith(stem));
 const resolved=exact||(match.length===1?match[0]:null);
 let state=resolved?(resolved.firstSeenStage==='X19'?'NEW_X19_HTTP200_SHA':'OLD_X01_X18_PATH'):
  stem.startsWith('/api/oembed')?'HTTP404_LIBRARY_HINT':'UNVERIFIED_URL_STRING';
 return{hint:v.hint,classification:state,url:resolved?.url||null,firstSeen:resolved?.firstSeenStage||null,
  originalSha256:resolved?.currentBodySHA256||null};
});
const m=resolutions.reduce((o,x)=>(o[x.classification]=(o[x.classification]||0)+1,o),{});
const network=rows.filter(x=>x.confirmedNetworkPath).length;
const offline=rows.filter(x=>x.x15Classification==='OFFLINE_DERIVED_PATH_ONLY').length;
const verified=rows.filter(x=>x.originalBodyVariants?.length>0).length;
const checks={old76Preserved:a.resources.every(x=>rows.some(y=>y.url===x.url)),
 twoNewPNG:rows.filter(x=>x.firstSeenStage==='X19').length===2,
 total78:rows.length===78,network72:network===72,offline6:offline===6,
 old9SuffixResolved:m.OLD_X01_X18_PATH===9,new2Resolved:m.NEW_X19_HTTP200_SHA===2,
 oembedUnverified:m.HTTP404_LIBRARY_HINT===1,
 verifiedBodiesPlus2:verified===a.summary.pathReconciliation.originalBodyPaths+2};
const failed=Object.entries(checks).filter(([,v])=>!v).map(([k])=>k);
const status=failed.length?'NEEDS_REVIEW':'COMPLETE_SCOPE_QUALIFIED';
const summary=structuredClone(a.summary);
summary.stage='X01-X19';summary.status=status;summary.generatedUtc=new Date().toISOString();
summary.pathReconciliation.totalRecordedPaths=rows.length;
summary.pathReconciliation.networkObserved=network;
summary.pathReconciliation.offlineDerivedOnly=offline;
summary.pathReconciliation.originalBodyPaths=verified;
summary.pathReconciliation.firstSeenByStage.X19=2;
summary.x19Delta={newOriginalPNGBodies:2,totalNewPNGBytes:b.items.reduce((n,x)=>n+x.bytes,0),
 oldPaths:76,currentPaths:rows.length,staticAssetPathHintClassification:m,
 originalJavaScriptAssetsNewInX19:0,sourceModuleRepresentations:457};
rows.sort((x,y)=>x.url.localeCompare(y.url));
wr('X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json',{stage:'X01-X19',status,summary,resources:rows});
wr('X19-STATIC-ASSET-ROUTE-RESOLUTION.json',{status,counts:m,resolutions,
 caveat:'A string hint is not a new asset until original first-party HTTP body and SHA are verified'});
wr('X01-X19-INDEPENDENT-CROSSWALK-ACCEPTANCE.json',{stage:'X01-X19',status,checks,failed,
 counts:{urls:rows.length,network,offline,originalBodyPaths:verified}});
const col=['url','firstSeenStage','role','confirmedNetworkPath','currentBodySHA256','bodyIdentity'];
const q=x=>'"'+String(x??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(out,'X01-X19-URL-SHA-INDEX.csv'),[col.join(','),...rows.map(x=>col.map(k=>q(x[k])).join(','))].join('\r\n')+'\r\n');
console.log('X19_URL_LINEAGE '+JSON.stringify({status,urls:rows.length,network,offline,verified,m,checks,failed}));
if(failed.length)process.exitCode=2;
