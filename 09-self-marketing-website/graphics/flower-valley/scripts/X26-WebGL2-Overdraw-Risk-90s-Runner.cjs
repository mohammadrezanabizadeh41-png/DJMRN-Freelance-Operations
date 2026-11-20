'use strict';
// DJMRN X26: owner-authored WebGL2 draw/state observer for overdraw RISK; not pixel overdraw.
// Official historical WebGL Insight MV2 is retained as source only, never enabled in Chrome 157.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X26-CURRENT');
const priv=path.join(root,'01-private-captures','X26','webgl-insight-legacy-and-webgl2-2026-11-20');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const mode=process.argv.includes('--fixture')?'fixture':'live';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(priv,{recursive:true});
const errors=[],samples=[],requests=new Map(),edges=new Map(),bodies=new Map(),bodyJobs=new Set();
let browser,page,cdp,started,monitor,halt=false,minRAM=Math.floor(os.freemem()/1048576);
const report={stage:'X26',mode,observer:'DJMRN-OWNER-WebGL2-STATE-INSTRUMENTATION',
 legacy:'3Dparallax/insight@cbe4463869bbf543106d672790f82155a22844f8',
 legacyManifest:2,legacyExtensionActivated:false,legacyReason:'DEPRECATED_BY_UPSTREAM_MV2_CHROME157_UNSUPPORTED',
 chrome:'Chrome for Testing 157 anonymous isolated profile',thresholdFreeRAMMiB:100,targetSeconds:mode==='live'?90:5,
 classification:mode==='fixture'?'OWN_PIXEL_ACCURATE_OVERDRAW':'LIVE_STATE_ONLY_NOT_PIXEL_ACCURATE',
 startedUTC:new Date().toISOString()};
function error(phase,e){let x={phase,message:String(e?.message||e).slice(0,160)};errors.push(x);console.log('X26_ERROR '+phase+' '+x.message)}
function guard(){const free=Math.floor(os.freemem()/1048576);minRAM=Math.min(minRAM,free);
 if(free<=100&&!halt){halt=true;console.log('X26_USER_RAM_STOP '+free);browser?.close().catch(()=>{})}return free}
function first(u){try{return new URL(u).hostname==='www.gladeye.com'}catch{return false}}
function norm(u){try{let x=new URL(u);return x.origin+x.pathname}catch{return u}}
function inject(){
 if(window.__DJMRNX26)return;
 const contexts=[],fbIds=new WeakMap(),progIds=new WeakMap();let fbCounter=0,pgCounter=0;
 function id(obj,typ){if(!obj)return 'default';const w=typ==='fb'?fbIds:progIds;
  if(!w.has(obj))w.set(obj,typ+(typ==='fb'?++fbCounter:++pgCounter));return w.get(obj)}
 function fresh(){return {draw:0,points:0,triangles:0,indexed:0,instanced:0,
  blend:0,depthTestOff:0,depthWriteOff:0,blendDepthWriteOff:0,blendDepthTestOff:0,
  additiveOneOne:0,scissor:0,clear:0,fboBinds:0,fboChanges:0,programChanges:0,
  blendChanges:0,depthChanges:0,drawByFbo:{},drawByMode:{},drawByProgram:{},
  maxCount:0,totalSubmittedCount:0,wrapFailures:[]}}
 function setup(gl,type){
  if(!gl||contexts.some(c=>c.gl===gl))return;
  const state={blend:false,depth:false,depthWrite:true,scissor:false,fbo:'default',program:'default',
   blendSrc:gl.ONE,blendDst:gl.ZERO,blendEq:gl.FUNC_ADD};
  let data=fresh();
  function wrap(method,callback){let original=gl[method];if(typeof original!=='function')return;
   try{gl[method]=function(...args){try{callback(args)}catch(e){}return original.apply(gl,args)};
    if(gl[method]===original)data.wrapFailures.push(method);
   }catch(e){data.wrapFailures.push(method)}}
  function flag(arg,on){if(arg===gl.BLEND)state.blend=on;if(arg===gl.DEPTH_TEST)state.depth=on;if(arg===gl.SCISSOR_TEST)state.scissor=on}
  wrap('enable',a=>flag(a[0],true));wrap('disable',a=>flag(a[0],false));
  wrap('depthMask',a=>{state.depthWrite=!!a[0];data.depthChanges++});
  wrap('blendFunc',a=>{state.blendSrc=a[0];state.blendDst=a[1];data.blendChanges++});
  wrap('blendFuncSeparate',a=>{state.blendSrc=a[0];state.blendDst=a[1];data.blendChanges++});
  wrap('blendEquation',a=>{state.blendEq=a[0];data.blendChanges++});
  wrap('blendEquationSeparate',a=>{state.blendEq=a[0];data.blendChanges++});
  wrap('bindFramebuffer',a=>{if(a[0]===gl.FRAMEBUFFER||a[0]===gl.DRAW_FRAMEBUFFER){
   const next=id(a[1],'fb');data.fboBinds++;if(state.fbo!==next)data.fboChanges++;state.fbo=next}});
  wrap('useProgram',a=>{const next=id(a[0],'pg');if(state.program!==next)data.programChanges++;state.program=next});
  wrap('clear',()=>{data.clear++});
  function record(mode,count,indexed,inst){
   data.draw++;if(mode===gl.POINTS)data.points++;
   if(mode===gl.TRIANGLES||mode===gl.TRIANGLE_STRIP||mode===gl.TRIANGLE_FAN)data.triangles++;
   if(indexed)data.indexed++;if(inst>1)data.instanced++;
   if(state.blend)data.blend++;if(!state.depth)data.depthTestOff++;if(!state.depthWrite)data.depthWriteOff++;
   if(state.blend&&!state.depthWrite)data.blendDepthWriteOff++;
   if(state.blend&&!state.depth)data.blendDepthTestOff++;
   if(state.blend&&state.blendSrc===gl.ONE&&state.blendDst===gl.ONE&&state.blendEq===gl.FUNC_ADD)data.additiveOneOne++;
   if(state.scissor)data.scissor++;
   for(const [obj,key] of [[data.drawByFbo,state.fbo],[data.drawByMode,String(mode)],[data.drawByProgram,state.program]])
    obj[key]=(obj[key]||0)+1;
   data.maxCount=Math.max(data.maxCount,Number(count)||0);
   data.totalSubmittedCount+=(Number(count)||0)*Math.max(1,Number(inst)||1);
  }
  wrap('drawArrays',a=>record(a[0],a[2],false,1));
  wrap('drawElements',a=>record(a[0],a[1],true,1));
  wrap('drawArraysInstanced',a=>record(a[0],a[2],false,a[3]));
  wrap('drawElementsInstanced',a=>record(a[0],a[1],true,a[4]));
  wrap('drawRangeElements',a=>record(a[0],a[3],true,1));
  contexts.push({gl,type,snapshot(){const before=data;data=fresh();return {version:type,counts:before,finalState:{...state}}}});
 }
 const original=HTMLCanvasElement.prototype.getContext;
 HTMLCanvasElement.prototype.getContext=function(type,...args){const x=original.call(this,type,...args);
  if(['webgl','webgl2','experimental-webgl'].includes(type))setup(x,type);return x};
 window.__DJMRNX26={collect(){return {contexts:contexts.length,canvases:document.querySelectorAll('canvas').length,
  states:contexts.map((x,i)=>({index:i,...x.snapshot()}))}}};
}
async function hashBody(id){
 const r=requests.get(id);if(!r||!first(r.url)||r.status!==200||bodyJobs.size>3||bodies.size>75||halt)return;
 const ext=path.extname(new URL(r.url).pathname).toLowerCase();
 if(!['.js','.json','.png','.glb','.webp','.css','.jpg','.jpeg','.svg'].includes(ext))return;
 if(Number(r.length||0)>16*1048576)return;
 const job=cdp.send('Network.getResponseBody',{requestId:id}).then(b=>{
  const raw=b.base64Encoded?Buffer.from(b.body,'base64'):Buffer.from(b.body||'','utf8');
  if(raw.length<=16*1048576){const key=norm(r.url),digest=sha(raw);
   bodies.set(key+'|'+digest,{url:key,sha256:digest,bytes:raw.length})}}).catch(()=>{}).finally(()=>bodyJobs.delete(job));
 bodyJobs.add(job);
}
async function sample(t,label,action){
 let ms=t*1000-(Date.now()-started);if(ms>0)await sleep(ms);if(halt)return;
 const ramBefore=guard();
 try{await action();await sleep(250);const details=await page.evaluate(()=>window.__DJMRNX26?.collect());
  if(!details?.contexts)throw Error('WEBGL2_CONTEXT_PROXY_NOT_DETECTED');
  const row={label,targetSecond:t,actualSecond:+((Date.now()-started)/1000).toFixed(2),
   freeRAMBeforeMiB:ramBefore,freeRAMAfterMiB:guard(),...details};
  const contents=JSON.stringify(row,null,2)+'\n';const fname='X26-'+mode+'-'+label+'-state.json';
  fs.writeFileSync(path.join(dir,fname),contents);
  const totals=details.states.reduce((r,s)=>{for(const k of ['draw','points','triangles','blend','depthWriteOff','blendDepthWriteOff','additiveOneOne','fboChanges']){
    r[k]=(r[k]||0)+s.counts[k]}return r},{});
  const entry={label,targetSecond:t,actualSecond:row.actualSecond,contexts:details.contexts,...totals,
   file:fname,sha256:sha(contents),bytes:Buffer.byteLength(contents),freeMiB:row.freeRAMAfterMiB};
  samples.push(entry);console.log('X26_SAMPLE '+JSON.stringify(entry));
  if(mode==='live'&&(label==='baseline'||label==='pointer_center')){
   try{await page.screenshot({path:path.join(priv,'X26-'+label+'-PRIVATE.png'),fullPage:false})}catch(e){error('private-image',e)}}
 }catch(e){error('sample-'+label,e)}
}
async function main(){
 if(guard()<=100)throw Error('RAM_BELOW_USER_LIMIT');
 if(!fs.existsSync(chrome))throw Error('CHROME_157_PINNED_MISSING');
 browser=await puppeteer.launch({executablePath:chrome,headless:true,userDataDir:path.join(dir,'X26-ISOLATED-PROFILE-'+mode),
  args:['--headless=new','--no-first-run','--no-default-browser-check','--disable-extensions','--disable-sync',
   '--disable-background-networking','--disable-component-update','--window-size=1280,720'],timeout:22000});
 page=await browser.newPage();await page.setViewport({width:1280,height:720,deviceScaleFactor:1});
 await page.evaluateOnNewDocument(inject);
 cdp=await page.createCDPSession();await cdp.send('Network.enable');
 monitor=setInterval(guard,500);
 cdp.on('Network.requestWillBeSent',e=>{if(!first(e.request.url))return;
  const v=norm(e.request.url),from=e.initiator?.stack?.callFrames?.[0]?.url||e.initiator?.url;
  if(from&&first(from)){const key=norm(from)+'|'+v;edges.set(key,(edges.get(key)||0)+1)}});
 cdp.on('Network.responseReceived',e=>{if(first(e.response.url))
  requests.set(e.requestId,{url:e.response.url,status:e.response.status,length:e.response.headers?.['content-length']})});
 cdp.on('Network.loadingFinished',e=>hashBody(e.requestId));
 page.on('pageerror',e=>error('page',e));
 page.on('requestfailed',r=>{if(first(r.url())&&errors.length<20)error('network',r.failure()?.errorText||'failed')});
 const u=mode==='fixture'?'file:///'+path.join(dir,'X26-OWN-WebGL2-Controlled-Overdraw-Fixture.html').replace(/\\/g,'/'):'https://www.gladeye.com/';
 const resp=await page.goto(u,{waitUntil:'domcontentloaded',timeout:28000});report.documentStatus=resp?.status?.()??null;
 let hooked=false;
 for(let i=0;i<80;i++){const count=await page.evaluate(()=>window.__DJMRNX26?.collect()?.contexts||0);
  if(count>0){hooked=true;break}if(halt)break;await sleep(250)}
 if(!hooked)throw Error('GL_CONTEXT_NOT_OBSERVED_IN_20_SECONDS');
 if(mode==='fixture'){await sleep(1000);report.fixture=await page.evaluate(()=>window.__X26FixtureTruth||null);
  if(!report.fixture?.passed)throw Error('OWN_FIXTURE_PIXEL_OVERDRAW_GROUND_TRUTH_FAILED')}
 started=Date.now();report.observationStartUTC=new Date().toISOString();
 const tasks=mode==='fixture'?
  [[2,'own_first',async()=>{}],[4,'own_second',async()=>{}]]:
  [[10,'baseline',async()=>{}],[24,'pointer_left',async()=>page.mouse.move(125,238)],
   [37,'pointer_right',async()=>page.mouse.move(1140,460)],
   [50,'wheel_450',async()=>page.mouse.wheel({deltaY:450})],
   [63,'pointer_center',async()=>page.mouse.move(680,320)],
   [76,'wheel_800',async()=>page.mouse.wheel({deltaY:800})],
   [88,'pointer_reverse',async()=>page.mouse.move(210,540)]];
 for(const [t,label,action] of tasks){if(halt)break;await sample(t,label,action)}
 if(!halt){const rest=report.targetSeconds*1000-(Date.now()-started);if(rest>0)await sleep(rest)}
 await Promise.allSettled([...bodyJobs]);
 report.seconds=+((Date.now()-started)/1000).toFixed(2);report.samples=samples;report.errors=errors;
 report.minFreeMiB=minRAM;report.emergencyStopped=halt;
 report.firstPartyPaths=[...new Set([...requests.values()].map(r=>norm(r.url)))].sort();
 report.bodySHA=[...bodies.values()].sort((a,b)=>a.url.localeCompare(b.url));
 report.initiatorEdges=[...edges].map(([edge,count])=>({edge,count}));
 report.complete=!halt&&samples.length===tasks.length&&report.seconds>=report.targetSeconds;
 const result=path.join(dir,'X26-'+mode+'-run-summary.json');fs.writeFileSync(result,JSON.stringify(report,null,2)+'\n');
 console.log('X26_RESULT '+JSON.stringify({mode,complete:report.complete,seconds:report.seconds,
  captures:samples.length,minRAM,bodyHashes:report.bodySHA.length,paths:report.firstPartyPaths.length,edges:report.initiatorEdges.length,
  errors:errors.length,output:result}));if(!report.complete)process.exitCode=2;
}
main().catch(e=>{error('fatal',e);process.exitCode=2}).finally(async()=>{
 if(monitor)clearInterval(monitor);if(browser)try{await browser.close()}catch{}
 if(errors.length)fs.writeFileSync(path.join(dir,'X26-'+mode+'-run-errors.json'),JSON.stringify(errors,null,2)+'\n');
});
