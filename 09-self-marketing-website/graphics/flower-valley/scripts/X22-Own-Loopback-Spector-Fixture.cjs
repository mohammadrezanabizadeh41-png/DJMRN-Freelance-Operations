'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),os=require('os'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const derived=path.join(root,'02-reviewed-derived','X22-CURRENT'),privateDir=path.join(root,'01-private-captures','X22');
fs.mkdirSync(derived,{recursive:true});fs.mkdirSync(privateDir,{recursive:true});
const toolkit=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const extension=path.join(toolkit,'01-Analysis','Extensions','Spector.js');
const chrome=path.join(toolkit,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(toolkit,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const output=path.join(derived,'X22-OWN-FIXTURE-ACCEPTANCE.json'),privateOutput=path.join(privateDir,'X22-OWN-RAW-CAPTURE.json');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const html=[
'<!doctype html><html><head><meta charset="UTF-8"><title>DJMRN original WebGL test</title></head><body><canvas id="webgl" width="640" height="360"></canvas><script>',
'(()=>{const c=document.querySelector("canvas"),gl=c.getContext("webgl2",{antialias:false,preserveDrawingBuffer:true});',
'if(!gl){window.__djFixtureError="NO_WEBGL2";return;}',
'const vs=gl.createShader(gl.VERTEX_SHADER);gl.shaderSource(vs,"#version 300 es\\nprecision highp float;\\nin vec2 a_pos;\\nvoid main(){gl_Position=vec4(a_pos,0.,1.);}" );gl.compileShader(vs);',
'const fs=gl.createShader(gl.FRAGMENT_SHADER);gl.shaderSource(fs,"#version 300 es\\nprecision highp float;\\nuniform float u_time;\\nout vec4 c;\\nvoid main(){c=vec4(0.4+0.1*sin(u_time),0.25,0.82,1.0);}" );gl.compileShader(fs);',
'const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);',
'const vao=gl.createVertexArray();gl.bindVertexArray(vao);const vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vbo);',
'gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-0.65,-0.55,0.65,-0.55,0,0.68]),gl.STATIC_DRAW);const a=gl.getAttribLocation(program,"a_pos");',
'gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);const u=gl.getUniformLocation(program,"u_time");let frame=0;',
'function draw(t){gl.viewport(0,0,640,360);gl.clearColor(0.08,0.05,0.16,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);',
'gl.uniform1f(u,t*0.001);gl.bindVertexArray(vao);gl.drawArrays(gl.TRIANGLES,0,3);window.__djFixtureFrames=++frame;requestAnimationFrame(draw);}',
'window.__djFixtureReady=true;window.__djFixtureGl=gl;requestAnimationFrame(draw);})();',
'</script></body></html>'
].join('\n');
fs.writeFileSync(path.join(derived,'X22-OWN-Original-WebGL2-Fixture.html'),html);
const report={stage:'X22',mode:'OWN_LOOPBACK',startedUtc:new Date().toISOString(),extensionVersion:null,
extensionWorkerActive:false,libraryAPI:null,fixture:null,capture:null,errors:[],minimumFreeRamMiB:Math.round(os.freemem()/1048576)};
let server,browser,monitor,watchdog;
function metadata(raw){
  const cmds=Array.isArray(raw&&raw.commands)?raw.commands:[];
  const counts={};
  for(const x of cmds){const name=String(x.name||x.commandName||'unknown');counts[name]=(counts[name]||0)+1}
  const draw=Object.keys(counts).filter(x=>/^draw(Elements|Arrays)/.test(x)).reduce((a,k)=>a+counts[k],0);
  return {status:'CAPTURED',commands:cmds.length,drawCalls:draw,commandNameCounts:counts,
     topLevelKeys:Object.keys(raw||{}).slice(0,40),width:raw&&raw.canvas&&raw.canvas.width||null,height:raw&&raw.canvas&&raw.canvas.height||null};
}
async function main(){
 if(os.freemem()<800*1048576)throw Error('LOW_RAM_PRECONDITION');
 const manifest=JSON.parse(fs.readFileSync(path.join(extension,'manifest.json'),'utf8'));
 report.extensionVersion=manifest.version;report.manifestVersion=manifest.manifest_version;
 if(manifest.version!=='0.9.33'||manifest.manifest_version!==3)throw Error('WRONG_EXTENSION_VERSION');
 const bundle=fs.readFileSync(path.join(extension,'spector.bundle.js'),'utf8');
 report.bundleBytes=Buffer.byteLength(bundle);report.bundleSHA256=hash(Buffer.from(bundle));
 server=http.createServer((req,res)=>{if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end(html)}else{res.statusCode=404;res.end()}});
 await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',err=>err?reject(err):resolve()));
 browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreDefaultArgs:['--disable-extensions'],
  userDataDir:path.join(derived,'X22-Isolated-Chrome-Profile'),timeout:18000,
  args:['--headless=new','--disable-extensions-except='+extension,'--load-extension='+extension,
  '--no-first-run','--no-default-browser-check','--disable-sync','--disable-background-networking','--disable-component-update','--window-size=900,700']});
 await sleep(850);
 report.extensionWorkerActive=browser.targets().some(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'));
 const page=await browser.newPage();page.setDefaultTimeout(15000);
 await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load',timeout:12000});
 report.fixture=await page.evaluate(()=>({ready:window.__djFixtureReady||false,error:window.__djFixtureError||null,frameCount:window.__djFixtureFrames||0,
   glsl:window.__djFixtureGl?window.__djFixtureGl.getParameter(window.__djFixtureGl.SHADING_LANGUAGE_VERSION):null}));
 if(!report.fixture.ready)throw Error('OWN_FIXTURE_WEBGL_UNAVAILABLE');
 await page.addScriptTag({content:bundle});
 report.libraryAPI=await page.evaluate(()=>({global:typeof window.SPECTOR,spector:typeof window.SPECTOR?.Spector}));
 if(report.libraryAPI.spector!=='function')throw Error('SPECTOR_GLOBAL_MISSING');
 await page.evaluate(()=>{
   const s=new window.SPECTOR.Spector();window.__djS=s;window.__djCapture=null;
   s.onCapture.add(x=>window.__djCapture=x);s.spyCanvases();
   s.captureNextFrame(document.querySelector('canvas'),true);
 });
 for(let i=0;i<20;i++){await sleep(400);if(await page.evaluate(()=>!!window.__djCapture))break}
 let raw=await page.evaluate(()=>window.__djCapture);
 if(!raw){
   report.errors.push({stage:'capture_next_frame',note:'NO_CAPTURE_8S_RETRY_LIMITED'});
   await page.evaluate(()=>window.__djS.startCapture(document.querySelector('canvas'),150,true));
   for(let i=0;i<15;i++){await sleep(400);if(await page.evaluate(()=>!!window.__djCapture))break}
   raw=await page.evaluate(()=>window.__djCapture);
 }
 if(raw){fs.writeFileSync(privateOutput,JSON.stringify(raw));report.capture=metadata(raw);report.rawPrivateSHA256=hash(fs.readFileSync(privateOutput))}
 else report.capture={status:'NO_CAPTURE'};
 report.fixtureFrameCountEnd=await page.evaluate(()=>window.__djFixtureFrames||0);
}
watchdog=setTimeout(()=>{report.errors.push({stage:'hard_watchdog',note:'55S'});browser?.close().catch(()=>{})},55000);
monitor=setInterval(()=>{
 report.minimumFreeRamMiB=Math.min(report.minimumFreeRamMiB,Math.round(os.freemem()/1048576));
 if(os.freemem()<100*1048576){report.errors.push({stage:'memory_guard',note:'BELOW_100MIB'});browser?.close().catch(()=>{})}
},500);
main().catch(e=>{report.errors.push({stage:'fatal',message:String(e.message).slice(0,220),name:e.name})}).finally(async()=>{
 clearTimeout(watchdog);clearInterval(monitor);
 try{await Promise.race([browser?.close(),sleep(2000)])}catch{}
 try{if(server)await new Promise(resolve=>server.close(()=>resolve()))}catch{}
 report.elapsedSeconds=Math.round((Date.now()-Date.parse(report.startedUtc))/1000);
 report.status=(report.capture?.status==='CAPTURED'&&report.capture.drawCalls>0)?'OWN_FIXTURE_PASS':'OWN_FIXTURE_BLOCKED';
 fs.writeFileSync(output,JSON.stringify(report,null,2));
 console.log('X22_OWN_FINAL '+JSON.stringify({status:report.status,seconds:report.elapsedSeconds,extensionWorkerActive:report.extensionWorkerActive,
    bundleBytes:report.bundleBytes,libraryAPI:report.libraryAPI,fixture:report.fixture,capture:report.capture,errors:report.errors,minRamMiB:report.minimumFreeRamMiB}));
});
