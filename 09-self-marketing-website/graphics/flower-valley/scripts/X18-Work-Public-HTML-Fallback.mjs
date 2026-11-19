// DJMRN X18 fallback: verify public /work HTML script tags without jsdj's unbounded pivots.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {createHash} from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(root,'02-reviewed-derived','X18-CURRENT');
const priv=path.join(root,'01-private-captures','X18','work-html-fallback');
fs.mkdirSync(derived,{recursive:true});fs.mkdirSync(priv,{recursive:true});
const source='https://www.gladeye.com/work';
const r=await fetch(source,{redirect:'manual',credentials:'omit',signal:AbortSignal.timeout(15000),headers:{Accept:'text/html'}});
const mime=r.headers.get('content-type')||'',clen=Number(r.headers.get('content-length')||0);
if(r.status!==200||!mime.includes('text/html')||clen>3000000)throw Error('PUBLIC_WORK_HTML_PRECONDITION_FAILED_'+r.status);
const b=Buffer.from(await r.arrayBuffer());if(b.length>3000000)throw Error('HTML_TOO_LARGE');
const sha=x=>createHash('sha256').update(x).digest('hex');
const htmlFile=path.join(priv,'X18-work-page-public-html-'+sha(b).slice(0,16)+'.html');
if(!fs.existsSync(htmlFile))fs.writeFileSync(htmlFile,b,{flag:'wx'});
const str=b.toString('utf8');
const src=[...str.matchAll(/<script\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi)]
 .map(x=>x[1]||x[2]||x[3]).map(x=>{try{return new URL(x,source)}catch{return null}})
 .filter(x=>x&&x.protocol==='https:'&&['www.gladeye.com','gladeye.com'].includes(x.hostname))
 .map(x=>x.origin+x.pathname);
const paths=[...new Set(src)].sort();
const result={stage:'X18',route:'/work',technique:'anonymous GET HTML; script src attribute inventory, not jsdj plugin crawl',
 status:paths.length>0?'HTML_FIRSTPARTY_SCRIPTS_CONFIRMED':'NO_SCRIPT_SRC_IN_DOCUMENT',
 httpStatus:r.status,mime,htmlBytes:b.length,htmlSha256:sha(b),scriptTagCount:src.length,uniqueFirstPartyScriptUrls:paths.length,
 jsUrls:paths,privateOriginalHtmlPath:path.relative(root,htmlFile).replaceAll('\\','/'),
 knownLimitations:['HTML attributes do not prove runtime chunk load','Next.js dynamic runtime import still subject to X16 CDP observation','No private backend or original Source Map inferred'],utc:new Date().toISOString()};
fs.writeFileSync(path.join(derived,'X18-WORK-HTML-FALLBACK.json'),JSON.stringify(result,null,2)+'\n');
console.log('X18_WORK_FALLBACK '+JSON.stringify({status:result.status,http:r.status,scripts:paths.length,htmlBytes:b.length,sha256:result.htmlSha256}));
if(paths.length===0)process.exitCode=2;
