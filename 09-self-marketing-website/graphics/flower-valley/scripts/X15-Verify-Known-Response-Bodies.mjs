import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const der=path.join(root,'02-reviewed-derived','X15-AUDIT-CURRENT');
const source=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source');
const require=createRequire(path.join(source,'package.json'));
const puppeteer=require('puppeteer');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const candidates=[
 'https://www.gladeye.com/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
 'https://www.gladeye.com/_next/static/css/9a7eb02b3db9aeb7.css',
 'https://www.gladeye.com/_next/static/media/soehne-buch.5a88e093.woff2',
 'https://www.gladeye.com/favicon.ico',
 'https://www.gladeye.com/robots.txt'
];
const reportPath=path.join(der,'X15-five-targeted-missing-response-bodies.json');
const privateDir=path.join(root,'01-private-captures','X15','X15-RECOVERED-KNOWN-MISSING-RESPONSES');
fs.mkdirSync(privateDir,{recursive:true});
const existing=fs.existsSync(reportPath)?JSON.parse(fs.readFileSync(reportPath,'utf8')):null;
const matches=existing?.results?.length===candidates.length&&existing.results.every(r=>{
 if(r.status!==200)return true;
 if(!r.privateFile||!fs.existsSync(r.privateFile))return false;
 return sha(fs.readFileSync(r.privateFile))===r.sha256;
});
if(matches){console.log('X15_FIVE_PRIOR_RECOVERY_VERIFIED',JSON.stringify(existing.summary));process.exit(0)}
const index=JSON.parse(fs.readFileSync(path.join(der,'raw-captures-content-hash-index.json'),'utf8'));
const priorSha=new Set((index.fileRows||[]).map(x=>x.sha256));
const x11=JSON.parse(fs.readFileSync(path.join(root,'02-reviewed-derived','X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json'),'utf8'));
const warcSha=new Set((x11.rows||[]).map(x=>x.sha256).filter(Boolean));
const browser=await puppeteer.launch({executablePath:path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe'),headless:true,args:['--disable-extensions','--no-first-run','--no-default-browser-check']});
const results=[];
try{
 const page=await browser.newPage();
 await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:55000});
 for(const url of candidates){
  const row={url,status:null,responseMime:null,bytes:null,sha256:null,wasStoredBeforeInAnyPhysicalFile:false,wasByteHashIndexedInX11WARC:false,privateFile:null,classification:null,error:null};
  try{
   const response=await page.evaluate(async url=>{
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),28000);
    try{
     const rsp=await fetch(url,{credentials:'omit',redirect:'follow',cache:'no-store',signal:controller.signal});
     const b=new Uint8Array(await rsp.arrayBuffer());
     if(b.length>1600000)throw Error('Response body exceeds scoped 1.6MB max');
     let s='';for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode(...b.subarray(i,Math.min(b.length,i+8192)));
     return{url:rsp.url,status:rsp.status,mime:(rsp.headers.get('content-type')||'').split(';')[0],base64:btoa(s)};
    }finally{clearTimeout(timeout)}
   },url);
   const final=new URL(response.url);
   if(final.origin!=='https://www.gladeye.com')throw Error('Cross-origin redirect rejected');
   const bytes=Buffer.from(response.base64,'base64');
   row.status=response.status;row.responseMime=response.mime;row.bytes=bytes.length;row.sha256=sha(bytes);
   row.wasStoredBeforeInAnyPhysicalFile=priorSha.has(row.sha256);
   row.wasByteHashIndexedInX11WARC=warcSha.has(row.sha256);
   if(row.status===200){
    const extension=url.endsWith('.js')?'.js':url.endsWith('.css')?'.css':url.endsWith('.woff2')?'.woff2':url.endsWith('.txt')?'.txt':'.ico';
    if(!row.wasStoredBeforeInAnyPhysicalFile){
     const dest=path.join(privateDir,sha(url).slice(0,24)+extension);
     fs.writeFileSync(dest,bytes);
     if(sha(fs.readFileSync(dest))!==row.sha256)throw Error('SHA256 mismatch after file write');
     row.privateFile=dest;row.classification='KNOWN_URL_PREVIOUSLY_NO_EXACT_LOCAL_STANDALONE_BODY';
    }else{
     row.classification='KNOWN_URL_BYTES_ALREADY_ON_LOCAL_DISK_NOT_COPIED';
    }
   }else{row.classification='KNOWN_URL_HTTP_STATUS_NOT_200_NOT_STORED'}
  }catch(e){row.error=String(e).slice(0,230);row.classification='UNVERIFIED_ERROR'}
  results.push(row);
  console.log('X15_TARGET_RESOURCE',JSON.stringify({url,status:row.status,bytes:row.bytes,classification:row.classification,priorPhysicalSha:row.wasStoredBeforeInAnyPhysicalFile,embeddedWarcSha:row.wasByteHashIndexedInX11WARC,error:row.error}));
 }
}finally{await browser.close()}
const summary={candidateKnownMissing:5,http200:results.filter(x=>x.status===200).length,not200:results.filter(x=>x.status!==200&&x.status!==null).length,newOriginalBodyFilesWritten:results.filter(x=>x.privateFile).length,alreadyHadSameExactFileBytes:results.filter(x=>x.wasStoredBeforeInAnyPhysicalFile).length,failedUnverified:results.filter(x=>x.error).length};
const report={stage:'X15',mission:'DJMRN-FREELANCE-WEBSITE-001',method:'Nonrecursive bounded anonymous same-origin fetch for five original public resource URLs with no verified standalone payload from X01-X14; comparison with all physical SHA hashes and original X11 WARC indexed hashes. Not a crawl, not an attempt to bypass missing query parameters.',privacy:'No cookies, tokens, authentication, request body, private sessions or sensitive headers stored. Body bytes remain in private owner desktop captures and are not uploaded to Github.',results,summary,unknowns:['/_next/image needs original exact query to recover a meaningful image: no guessing query parameters','/_next/ folder is not a known single asset','/work/ is a possible trailing-slash alias of /work, not a distinct software body','Some new original standalone bodies may be already contained in an earlier WARC; do not call these new site assets solely because extracted to separate files']};
fs.writeFileSync(reportPath,JSON.stringify(report,null,2));
console.log('X15_TARGET_RECOVERY_COMPLETE',JSON.stringify({reportPath,summary}));