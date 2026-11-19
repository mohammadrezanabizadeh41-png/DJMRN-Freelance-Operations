import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived');
const run=process.argv[2]||'X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z';
const x14=JSON.parse(fs.readFileSync(path.join(dir,run+'-X01-X13-novelty-and-tech-provenance.json'),'utf8'));
const x01=JSON.parse(fs.readFileSync(path.join(root,'01-private-captures/X01-REDO/X01-R2-2026-11-18T18-01-09-463Z/private-capture-manifest.json'),'utf8'));
const x11=JSON.parse(fs.readFileSync(path.join(dir,'X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json'),'utf8'));
const src=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source');
const require=createRequire(path.join(src,'package.json'));
const puppeteer=require('puppeteer');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const earlier=new Set([...(x01.responses||[]).map(r=>r.sha256),...(x11.rows||[]).map(r=>r.sha256)].filter(Boolean).map(x=>x.toLowerCase()));
let priorArtifactFiles=0,priorArtifactHashes=0;
for(const file of fs.readdirSync(dir)){
 if(!/^X(?:0[1-9]|1[0-3])[-_.]/i.test(file)||!file.endsWith('.json'))continue;
 const f=path.join(dir,file);if(fs.statSync(f).size>6000000)continue;
 try{const b=fs.readFileSync(f);const txt=b[0]===255&&b[1]===254?b.subarray(2).toString('utf16le'):b.toString('utf8');for(const hit of txt.match(/\b[a-fA-F0-9]{64}\b/g)||[]){earlier.add(hit.toLowerCase());priorArtifactHashes++;}priorArtifactFiles++}catch{}
}
const folder=path.join(root,'01-private-captures','X14',run,'verified-new-first-party');
fs.mkdirSync(folder,{recursive:true});
const allowed=(x14.novelFirstPartyURLPaths||[]).filter(u=>{try{let x=new URL(u);return x.origin==='https://www.gladeye.com'&&!x.search&&!x.hash}catch{return false}});
if(allowed.length!==7)throw Error('Expected seven exact candidate novel URLs, got '+allowed.length);
const browser=await puppeteer.launch({headless:true,executablePath:path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe'),args:['--disable-extensions','--no-first-run','--no-default-browser-check'],timeout:45000});
const results=[];
try{
 const page=await browser.newPage();
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:60000});
 for(const url of allowed){
  const row={url,firstParty:true,status:null,responseContentType:null,bytes:null,sha256:null,alreadyIndexedByX01toX13Hash:false,storedPrivatePath:null,classification:null,error:null};
  try{
   const obj=await page.evaluate(async (url)=>{
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),35000);
    try{
     const accept=url.endsWith('.js')?'text/javascript':url.endsWith('.css')?'text/css':'text/html';
     const response=await fetch(url,{method:'GET',credentials:'omit',redirect:'follow',cache:'no-store',headers:{Accept:accept},signal:controller.signal});
     const raw=new Uint8Array(await response.arrayBuffer());
     if(raw.length>1800000)throw Error('Body exceeds 1.8MB file safety cap');
     let binary='';for(let i=0;i<raw.length;i+=8192)binary+=String.fromCharCode(...raw.subarray(i,Math.min(raw.length,i+8192)));
     return{url:response.url,status:response.status,contentType:response.headers.get('content-type')||'',length:raw.length,base64:btoa(binary)};
    }finally{clearTimeout(timer)}
   },url);
   const resUrl=new URL(obj.url);if(resUrl.origin!=='https://www.gladeye.com')throw Error('Cross-origin redirect blocked');
   const bytes=Buffer.from(obj.base64,'base64');
   row.status=obj.status;row.responseContentType=obj.contentType.split(';')[0];row.bytes=bytes.length;row.sha256=hash(bytes);
   row.alreadyIndexedByX01toX13Hash=earlier.has(row.sha256.toLowerCase());
   row.classification=row.status!==200?'HTTP_STATUS_NON_200':row.alreadyIndexedByX01toX13Hash?'NEW_URL_OLD_EXACT_BYTES':'NEW_URL_AND_NONIDENTICAL_DELIVERED_BODY';
   if(row.status===200&&!row.alreadyIndexedByX01toX13Hash){
    const name=hash(url).slice(0,24)+(url.endsWith('.js')?'.js':url.endsWith('.css')?'.css':'.html');
    const file=path.join(folder,name);fs.writeFileSync(file,bytes);
    if(hash(fs.readFileSync(file))!==row.sha256)throw Error('Disk hash mismatch');
    row.storedPrivatePath=file;
   }
  }catch(e){row.error=String(e).slice(0,300);row.classification='FETCH_UNVERIFIED'}
  results.push(row);
  console.log('X14_NEW_RESOURCE_CHECK',JSON.stringify({url,status:row.status,bytes:row.bytes,sha:row.sha256,priorExactHash:row.alreadyIndexedByX01toX13Hash,classification:row.classification,error:row.error}));
 }
}finally{await browser.close()}
const summary={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X14',run,source:'Live first-party public HTTP GET through isolated existing Chrome browser, no private credentials',method:'Seven new paths discovered by Wappalyzer full-resource 180s scan; fetch only those exact paths and compare byte hashes against indexed earlier X01/X11 response manifests and 68 X01-X13 derived reports',priorHashIndexSize:earlier.size,priorDerivedFilesScanned:priorArtifactFiles,priorHashStringsExtracted:priorArtifactHashes,results,
 counts:{candidateURLs:results.length,verified200:results.filter(r=>r.status===200).length,newBodiesStoredPrivately:results.filter(r=>r.storedPrivatePath).length,duplicatePriorExactBytes:results.filter(r=>r.alreadyIndexedByX01toX13Hash).length,unverified:results.filter(r=>r.error).length,scriptBodies:results.filter(r=>r.storedPrivatePath?.endsWith('.js')).length,cssBodies:results.filter(r=>r.storedPrivatePath?.endsWith('.css')).length,htmlBodies:results.filter(r=>r.storedPrivatePath?.endsWith('.html')).length},
 warnings:['These assets primarily concern navigation menus, careers/contact/ventures, and their CSS/JS. They are NOT automatically 3D flower scene assets.','All raw delivered bodies kept only on owner Desktop PRIVATE project evidence, not published to GitHub.','Only the X01/X11 body SHA and scoped X01-X13 report text fingerprint indexes were compared; absence is not proof asset never existed in any prior hidden cache.']};
const out=path.join(dir,run+'-seven-candidate-url-response-hash-verification.json');
fs.writeFileSync(out,JSON.stringify(summary,null,2));
console.log('X14_RESOURCE_VERIFY_COMPLETE',JSON.stringify({output:out,counts:summary.counts,priorHashIndexSize:earlier.size}));