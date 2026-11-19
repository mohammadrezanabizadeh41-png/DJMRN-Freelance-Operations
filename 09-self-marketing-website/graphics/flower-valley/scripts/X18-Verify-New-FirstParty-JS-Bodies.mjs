// DJMRN X18 — confirm and archive only newly found public JS response bytes with SHA256.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(root,'02-reviewed-derived','X18-CURRENT');
const raw=path.join(root,'01-private-captures','X18','new-verified-js');
const summary=JSON.parse(fs.readFileSync(path.join(derived,'X18-MAIN-SUMMARY.json'),'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const urls=summary.additionalPathsBeyondX16.filter(u=>{try{const v=new URL(u);return v.hostname==='www.gladeye.com'&&v.pathname.endsWith('.js')&&v.protocol==='https:'}catch{return false}});
if(urls.length<1||urls.length>20)throw Error('UNEXPECTED_NEW_JS_COUNT_'+urls.length);
if(os.freemem()<350*1048576)throw Error('LOW_MEMORY');
fs.mkdirSync(raw,{recursive:true});
const items=[];
for(const u of urls){
 const uri=new URL(u),fname=path.basename(uri.pathname);
 const item={url:uri.origin+uri.pathname,httpStatus:null,contentType:null,sha256:null,bytes:0,privateRelativePath:null};
 try{
 const response=await fetch(uri.href,{method:'GET',redirect:'manual',credentials:'omit',signal:AbortSignal.timeout(15000)});
 item.httpStatus=response.status;item.contentType=response.headers.get('content-type');
 const length=Number(response.headers.get('content-length')||0);
 if(response.status===200&&length<=2000000&&String(item.contentType).includes('javascript')){
  const reader=response.body?.getReader(),chunks=[];let size=0;
  if(reader){try{while(true){const z=await reader.read();if(z.done)break;size+=z.value.length;if(size>2000000){await reader.cancel();throw Error('BODY_TOO_LARGE')}chunks.push(z.value)}}finally{reader.releaseLock()}}
  const buf=Buffer.concat(chunks.map(c=>Buffer.from(c))),hash=sha(buf),target=path.join(raw,hash.slice(0,16)+'-'+fname);
  if(fs.existsSync(target)&&sha(fs.readFileSync(target))!==hash)throw Error('EXISTING_HASH_COLLISION');
  if(!fs.existsSync(target))fs.writeFileSync(target,buf,{flag:'wx'});
  item.bytes=buf.length;item.sha256=hash;item.privateRelativePath=path.relative(root,target).replaceAll('\\','/');
 }
 }catch(e){item.error=(e?.name||'Error')+': '+String(e?.message||e).slice(0,120)}
 items.push(item);
 console.log('X18_NEW_JS_CHECK '+JSON.stringify({url:item.url,status:item.httpStatus,bytes:item.bytes,sha256:item.sha256,error:item.error||null}));
}
const all=items.every(x=>x.httpStatus===200&&x.sha256&&x.bytes>0);
const manifest={stage:'X18',status:all?'ALL_NEW_JS_SHA256_VERIFIED':'PARTIAL_NEW_JS_VERIFICATION',utc:new Date().toISOString(),itemCount:items.length,items,limitations:['First-party publicly accessible JS only','Original delivered JS bytes private; GitHub metadata only','Does not imply source map or private authored source']};
fs.writeFileSync(path.join(derived,'X18-NEW-JS-ORIGINAL-BODIES-MANIFEST.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('X18_NEW_JS_SUMMARY '+JSON.stringify({status:manifest.status,verified:items.filter(x=>x.sha256).length,total:items.length}));
if(!all)process.exitCode=2;
