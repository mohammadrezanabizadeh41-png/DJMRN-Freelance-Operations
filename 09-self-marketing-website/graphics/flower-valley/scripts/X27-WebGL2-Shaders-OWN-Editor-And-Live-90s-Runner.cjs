'use strict';
// DJMRN X27 owner-authored. A) edit ONLY own local Shader fixture B) read-only 90s public GLSL metadata observer.
// Never writes original site's GLSL, changes target programs/shaders, installs insecure extension or downgrades Chrome.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X27-CURRENT');
const priv=path.join(root,'01-private-captures','X27','shader-editor-2026-11-20');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const isFixture=process.argv.includes('--fixture'),mode=isFixture?'fixture':'live';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(priv,{recursive:true});
const errors=[],samples=[],requests=new Map(),edges=new Map(),bodies=new Map(),bodyJobs=new Set();
let browser,page,cdp,started,monitor,emergency=false,minFreeMiB=Math.floor(os.freemem()/1048576);
const summary={stage:'X27',mode,tool:'spite/ShaderEditorExtension',historicalSourceCommit:'564f6c1922b1dcf98813e6940d1e91995495e6dc',
 legacyManifest:2,legacyExtensionActivated:false,
 execution:'isolated Chrome For Testing 157 + owner-on-document-start source-hash and compile/link metadata observer',
 proprietaryGLSLRawStored:false,commercialShaderEdited:false,ownerFixtureShaderEdited:isFixture,
 targetSeconds:isFixture?5:90,freeRAMStopMiB:100,startedUTC:new Date().toISOString()};
function err(p,e){const x={phase:p,message:String(e?.message||e).slice(0,180)};errors.push(x);console.log('X27_ERROR '+p+' '+x.message)}
function guard(){const v=Math.floor(os.freemem()/1048576);minFreeMiB=Math.min(v,minFreeMiB);
 if(v<=100&&!emergency){emergency=true;console.log('X27_100_MIB_EMERGENCY_STOP '+v);browser?.close().catch(()=>{})}return v}
function own(u){try{return new URL(u).hostname==='www.gladeye.com'}catch{return false}}
function normalize(u){try{const x=new URL(u);return x.origin+x.pathname}catch{return u}}
function shaderObserver(){
 if(window.__DJMRN_X27_OBSERVER)return;
 let contextCount=0,shaderNumber=0,progNumber=0;const contexts=[];
 function instrument(gl,version){
  if(!gl||contexts.some(v=>v.gl===gl))return;
  contextCount++;
  const sh=new Map(),prog=new Map();
  let draw=0,points=0,triangles=0,useProgram=0,linkCalls=0,compileCalls=0,shaderSourceCalls=0;
  let invalidCompiles=0,invalidLinks=0;
  function wrap(name,fn){const original=gl[name];if(typeof original!=='function')return;
   try{gl[name]=function(...a){let result=original.apply(this,a);try{fn(a,result)}catch(e){}return result}}catch(e){}}
  wrap('createShader',(a,r)=>{if(r)sh.set(r,{id:'s'+(++shaderNumber),kind:a[0]===gl.VERTEX_SHADER?'VERTEX':a[0]===gl.FRAGMENT_SHADER?'FRAGMENT':'OTHER',
   bytes:0,lines:0,glsl300:false,sha256:null,compiled:null})});
  wrap('shaderSource',(a)=>{shaderSourceCalls++;const x=sh.get(a[0]);if(!x)return;const source=String(a[1]||'');
   x.bytes=new TextEncoder().encode(source).length;x.lines=source.split('\n').length;
   x.glsl300=/^\s*#version\s+300\s+es\b/.test(source);
   // No source text is copied out of the browser or written to disk.
   x.promise=crypto.subtle.digest('SHA-256',new TextEncoder().encode(source)).then(h=>{
    x.sha256=Array.from(new Uint8Array(h),b=>b.toString(16).padStart(2,'0')).join('')}).catch(()=>{});
  });
  wrap('compileShader',(a)=>{compileCalls++;const x=sh.get(a[0]);if(!x)return;
   x.compiled=!!gl.getShaderParameter(a[0],gl.COMPILE_STATUS);if(!x.compiled)invalidCompiles++});
  wrap('createProgram',(a,r)=>{if(r)prog.set(r,{id:'p'+(++progNumber),attached:[],linked:null})});
  wrap('attachShader',(a)=>{const p=prog.get(a[0]),s=sh.get(a[1]);if(p&&s)p.attached.push(s.id)});
  wrap('linkProgram',(a)=>{linkCalls++;const p=prog.get(a[0]);if(!p)return;
   p.linked=!!gl.getProgramParameter(a[0],gl.LINK_STATUS);if(!p.linked)invalidLinks++});
  wrap('useProgram',()=>{useProgram++});
  function aDraw(a){draw++;if(a[0]===gl.POINTS)points++;if([gl.TRIANGLES,gl.TRIANGLE_STRIP,gl.TRIANGLE_FAN].includes(a[0]))triangles++}
  for(const method of ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced','drawRangeElements'])wrap(method,aDraw);
  const ctx={gl,version,async take(){
   await Promise.allSettled([...sh.values()].map(x=>x.promise).filter(Boolean));
   const c={drawCalls:draw,pointsDraws:points,triangleDraws:triangles,useProgram,shaderSourceCalls,compileCalls,linkCalls,
    invalidCompiles,invalidLinks};draw=0;points=0;triangles=0;useProgram=0;
   return {version,counts:c,shaderRecords:[...sh.values()].map(x=>({id:x.id,kind:x.kind,sha256:x.sha256,
    utf8Bytes:x.bytes,lineCount:x.lines,glsl300:x.glsl300,compiled:x.compiled})),
    programRecords:[...prog.values()].map(x=>({id:x.id,attached:x.attached,linked:x.linked}))};
  }};
  contexts.push(ctx);
 }
 const original=HTMLCanvasElement.prototype.getContext;
 HTMLCanvasElement.prototype.getContext=function(type,...rest){
  const gl=original.call(this,type,...rest);
  if(['webgl','experimental-webgl','webgl2'].includes(type))instrument(gl,type);return gl};
 window.__DJMRN_X27_OBSERVER={async take(){return {contextCount,canvasCount:document.querySelectorAll('canvas').length,
  contexts:await Promise.all(contexts.map(c=>c.take()))}}};
}
async function bodyHash(id){
 const r=requests.get(id);if(!r||!own(r.url)||r.status!==200||bodyJobs.size>3||bodies.size>80||emergency)return;
 const ex=path.extname(new URL(r.url).pathname).toLowerCase();
 if(!['.js','.json','.png','.glb','.webp','.css','.jpg','.jpeg','.svg'].includes(ex)||Number(r.length||0)>16*1048576)return;
 const job=cdp.send('Network.getResponseBody',{requestId:id}).then(b=>{
  const raw=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body||'','utf8');
  if(raw.length<=16*1048576){const url=normalize(r.url),digest=sha(raw);bodies.set(url+'|'+digest,{url,bytes:raw.length,sha256:digest})}
 }).catch(()=>{}).finally(()=>bodyJobs.delete(job));bodyJobs.add(job);
}
async function sample(t,label,action){
 const left=t*1000-(Date.now()-started);if(left>0)await sleep(left);if(emergency)return;
 const ram=guard();
 try{
  await action();await sleep(260);
  const v=await page.evaluate(()=>window.__DJMRN_X27_OBSERVER?.take());
  if(v?.contextCount!==1||!v.contexts?.length)throw Error('NO_EXACT_SINGLE_WEBGL_CONTEXT');
  const ctx=v.contexts[0],c=ctx.counts;
  const row={label,requestedSecond:t,actualSecond:+((Date.now()-started)/1000).toFixed(2),
   freeRAMBeforeMiB:ram,freeRAMAfterMiB:guard(),...v,
   phase:'READ_ONLY_VENDOR_GLSL_HASH_AND_PROGRAM_META_NO_GLSL_TEXT'};
  const raw=JSON.stringify(row,null,2)+'\n',filename='X27-live-'+label+'-shader-metadata.json';
  fs.writeFileSync(path.join(dir,filename),raw);
  const fingerprint=ctx.shaderRecords.map(x=>x.sha256).filter(Boolean).sort();
  const s={label,atSecond:row.actualSecond,draws:c.drawCalls,points:c.pointsDraws,triangles:c.triangleDraws,
   activeKnownShaders:ctx.shaderRecords.length,hashedShaderSources:fingerprint.length,
   uniqueShaderHashes:[...new Set(fingerprint)].length,programs:ctx.programRecords.length,
   compiledPass:ctx.shaderRecords.filter(x=>x.compiled===true).length,
   linkedPass:ctx.programRecords.filter(x=>x.linked===true).length,
   glsl300ShaderCount:ctx.shaderRecords.filter(x=>x.glsl300).length,
   file:filename,sha256:sha(raw),bytes:Buffer.byteLength(raw),freeMiB:row.freeRAMAfterMiB};
  samples.push(s);console.log('X27_SAMPLE '+JSON.stringify(s));
  if(['baseline','pointer_center'].includes(label))try{await page.screenshot({path:path.join(priv,'X27-'+label+'-PRIVATE.png'),fullPage:false})}catch(e){err('private_screenshot',e)}
 }catch(e){err('sample-'+label,e)}
}
async function fixture(){
 const filename=path.join(dir,'X27-OWN-WebGL2-Live-Shader-Editor-Fixture.html');
 const r=await page.goto('file:///'+filename.replace(/\\/g,'/'),{waitUntil:'domcontentloaded',timeout:22000});
 const before=await page.evaluate(()=>window.__DJMRNX27OWN?.getState());
 if(!before?.initial?.accepted||JSON.stringify(before.pixel)!=='[255,0,0,255]')throw Error('OWN_INITIAL_RED_FAILED');
 const accepted=await page.evaluate(()=>window.__DJMRNX27OWN.tryEdit(window.__DJMRNX27OWN.sources.green,'valid_green'));
 const rejected=await page.evaluate(()=>window.__DJMRNX27OWN.tryEdit(window.__DJMRNX27OWN.sources.invalid,'invalid_rejected'));
 const after=await page.evaluate(()=>window.__DJMRNX27OWN.getState());
 if(!accepted.accepted||JSON.stringify(accepted.pixel)!=='[0,255,0,255]'||rejected.accepted||
  !rejected.previousProgramContinues||JSON.stringify(after.pixel)!=='[0,255,0,255]')throw Error('OWN_LIVE_EDIT_OR_ROLLBACK_FAILED');
 const recovery=await page.evaluate(()=>window.__DJMRNX27OWN.tryEdit(window.__DJMRNX27OWN.sources.red,'revert_red'));
 const final=await page.evaluate(()=>window.__DJMRNX27OWN.getState());
 if(!recovery.accepted||JSON.stringify(final.pixel)!=='[255,0,0,255]')throw Error('OWN_REVERT_FAILED');
 const report={stage:'X27',type:'OWN_WEBGL2_DYNAMIC_SHADER_EDITOR_FIXTURE',fixtureFile:path.basename(filename),
  initial:before.initial,validEdit:accepted,invalidEdit:rejected,recovery,finalPixel:final.pixel,
  allAcceptances:true,originalCommercialGLSLNeverTouched:true,observationSource:'actual_WebGL2_readPixels_64x64'};
 fs.writeFileSync(path.join(dir,'X27-own-fixture-run-summary.json'),JSON.stringify(report,null,2)+'\n');
 console.log('X27_FIXTURE_RESULT '+JSON.stringify({pass:true,initial:before.pixel,valid:accepted.pixel,
  invalidRejected:!rejected.accepted,rollback:after.pixel,recovered:final.pixel}));
 return report;
}
async function main(){
 if(guard()<=100)throw Error('USER_RAM_STOP_AT_START');
 if(!fs.existsSync(chrome))throw Error('CHROME_FOR_TESTING_NOT_INSTALLED');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,
  userDataDir:path.join(dir,'X27-ISOLATED-PROFILE-'+mode),
  args:['--headless=new','--no-first-run','--no-default-browser-check','--disable-extensions',
   '--disable-sync','--disable-background-networking','--disable-component-update','--window-size=1280,720'],timeout:22000});
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 monitor=setInterval(guard,500);
 if(isFixture){summary.fixture=await fixture();await sleep(500);summary.complete=true;summary.minFreeMiB=minFreeMiB;
  fs.writeFileSync(path.join(dir,'X27-fixture-driver-summary.json'),JSON.stringify(summary,null,2)+'\n');return}
 await page.evaluateOnNewDocument(shaderObserver);
 cdp=await page.createCDPSession();await cdp.send('Network.enable');
 cdp.on('Network.requestWillBeSent',e=>{if(!own(e.request.url))return;
  const url=normalize(e.request.url),from=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url;
  if(from&&own(from)){const edge=normalize(from)+'|'+url;edges.set(edge,(edges.get(edge)||0)+1)}});
 cdp.on('Network.responseReceived',e=>{if(own(e.response.url))requests.set(e.requestId,{url:e.response.url,status:e.response.status,length:e.response.headers?.['content-length']})});
 cdp.on('Network.loadingFinished',e=>bodyHash(e.requestId));
 page.on('pageerror',e=>err('page',e));
 page.on('requestfailed',r=>{if(own(r.url())&&errors.length<20)err('network',r.failure()?.errorText||'failed')});
 const resp=await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:30000});
 summary.siteHttpStatus=resp?.status?.()??null;
 let ready=false;for(let i=0;i<80;i++){ready=await page.evaluate(()=>window.__DJMRN_X27_OBSERVER?.take()?.then(x=>x.contextCount>0)||false);
  if(ready||emergency)break;await sleep(250)}
 if(!ready)throw Error('SHADER_OBSERVER_NOT_ATTACHED_TO_PUBLIC_CONTEXT');
 started=Date.now();summary.observationStartUTC=new Date().toISOString();
 for(const [t,label,fn] of [[10,'baseline',async()=>{}],[24,'pointer_left',async()=>page.mouse.move(125,238)],
  [37,'pointer_right',async()=>page.mouse.move(1140,460)],
  [50,'wheel_450',async()=>page.mouse.wheel({deltaY:450})],
  [63,'pointer_center',async()=>page.mouse.move(680,320)],
  [76,'wheel_800',async()=>page.mouse.wheel({deltaY:800})],
  [88,'pointer_reverse',async()=>page.mouse.move(210,540)]]){
   if(emergency)break;await sample(t,label,fn)}
 if(!emergency){const left=90000-(Date.now()-started);if(left>0)await sleep(left)}
 await Promise.allSettled([...bodyJobs]);
 summary.seconds=+((Date.now()-started)/1000).toFixed(2);
 summary.samples=samples;summary.firstPartyPaths=[...new Set([...requests.values()].map(x=>normalize(x.url)))].sort();
 summary.bodySHA=[...bodies.values()].sort((a,b)=>a.url.localeCompare(b.url));
 summary.initiatorEdges=[...edges].map(([edge,count])=>({edge,count}));
 summary.minFreeMiB=minFreeMiB;summary.emergencyStopped=emergency;
 summary.errors=errors;summary.complete=!emergency&&summary.seconds>=90&&samples.length===7;
 const fname=path.join(dir,'X27-live-run-summary.json');fs.writeFileSync(fname,JSON.stringify(summary,null,2)+'\n');
 console.log('X27_LIVE_RESULT '+JSON.stringify({complete:summary.complete,seconds:summary.seconds,
  samples:samples.length,minFreeMiB,observedUrlPaths:summary.firstPartyPaths.length,
  originalBodiesHashed:summary.bodySHA.length,edges:summary.initiatorEdges.length,errors:errors.length}));
 if(!summary.complete)process.exitCode=2;
}
main().catch(e=>{err('fatal',e);process.exitCode=2}).finally(async()=>{
 if(monitor)clearInterval(monitor);if(browser)try{await browser.close()}catch{}
 if(errors.length)fs.writeFileSync(path.join(dir,'X27-'+mode+'-run-errors.json'),JSON.stringify(errors,null,2)+'\n');
});
