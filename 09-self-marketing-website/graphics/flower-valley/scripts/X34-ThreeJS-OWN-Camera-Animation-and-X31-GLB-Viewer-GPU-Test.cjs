'use strict';
// DJMRN X34: offline original OWN camera/mesh GLB, Three.js GLTFLoader and AnimationMixer real Chrome GPU.
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X34-CURRENT'),P=path.join(R,'01-private-captures','X34','OWN-GLTF-CAMERA-ANIMATION');
const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit'),mod=path.join(tk,'03-WebGL','WebGL-Toolchain','node_modules');
const cam=path.join(P,'X34-OWN-original-camera-24fps-200-keys.glb'),mesh=path.join(R,'01-private-captures','X31','OWN-GLB-EXPORT','X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb');
const html=path.join(D,'X34-OWN-GltfLoader-AnimationMixer-Viewer.html');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
const r={stage:'X34',mode:'OWN_ONLY_LocalThreeJS_GLTFLoader_AnimationMixer_GPU',errors:[],
 noVendorGLBLoaded:true,noRemoteNetwork:true,noGpuSandboxRelaxation:true,minFreeMiB:Math.floor(os.freemem()/1048576),
 ownerCameraSHA256:sha(fs.readFileSync(cam)),ownerMeshSHA256:sha(fs.readFileSync(mesh))};
let server,browser,monitor,stop;
function serve(req,res){try{
 const u=new URL(req.url,'http://127.0.0.1'),p=u.pathname;let file,type='application/octet-stream';
 if(p==='/')file=html;
 else if(p==='/owner-camera.glb')file=cam;
 else if(p==='/owner-grid.glb')file=mesh;
 else if(p.startsWith('/three/')){file=path.resolve(mod,p.slice(1));
  if(!file.startsWith(path.resolve(mod)+path.sep))throw Error('PATH_ESCAPE')}
 else throw Error('NO_ROUTE');
 if(file.endsWith('.html'))type='text/html; charset=utf-8';
 else if(file.endsWith('.js'))type='application/javascript; charset=utf-8';
 else if(file.endsWith('.glb'))type='model/gltf-binary';
 res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'}).end(fs.readFileSync(file));
 }catch(e){res.writeHead(404).end('Not Found')}}
async function main(){
 if(os.freemem()/1048576<800)throw Error('TOO_LOW_RAM_TO_START');
 server=http.createServer(serve);await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await puppeteer.launch({executablePath:chrome,headless:true,timeout:25000,
  userDataDir:path.join(P,'isolated-Chrome-OWN-GLTF-Viewer'),
  args:['--headless=new','--no-first-run','--no-default-browser-check','--no-proxy-server','--disable-sync',
   '--disable-background-networking','--disable-component-update','--window-size=940,640']});
 const page=await browser.newPage();await page.setViewport({width:940,height:640,deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'networkidle0',timeout:28000});
 await page.waitForFunction(()=>window.__DJMRN_X34_VIEWER?.ready||window.__DJMRN_X34_VIEWER?.errors?.length,{timeout:22000});
 const before=await page.evaluate(()=>({...window.__DJMRN_X34_VIEWER}));
 if(!before.ready)throw Error('VIEWER_'+JSON.stringify(before.errors).slice(0,600));
 const a=await page.screenshot({type:'png'});fs.writeFileSync(path.join(P,'X34-OWN-VIEWER-BEFORE.png'),a);
 const after=await page.evaluate(()=>window.__DJMRN_X34_ADVANCE(2.5));
 const b=await page.screenshot({type:'png'});fs.writeFileSync(path.join(P,'X34-OWN-VIEWER-AFTER.png'),b);
 r.viewer={ready:before.ready,sceneNodes:before.sceneNodes,animationClips:before.animationClips,
  glVersion:before.glVersion,renderer:before.unmaskedRenderer,initialPosition:before.initialPosition,
  advancedPosition:after.advancedPosition,cameraActuallyMoved:after.cameraActuallyMoved};
 r.screenshotMetadata=[{label:'owned_before',bytes:a.length,sha256:sha(a)},{label:'owned_after',bytes:b.length,sha256:sha(b)}];
 r.screenshotsDiffer=sha(a)!==sha(b);
 if(!after.cameraActuallyMoved)throw Error('OWN_CAMERA_DID_NOT_MOVE');
 if(!r.screenshotsDiffer)throw Error('OWN_GLTF_SCENE_VISUAL_DELTA_MISSING');
}
monitor=setInterval(()=>{r.minFreeMiB=Math.min(r.minFreeMiB,Math.floor(os.freemem()/1048576));
 if(r.minFreeMiB<=100&&!stop){stop='STOP_RAM_100';browser?.close().catch(()=>{})}},400);
main().catch(e=>{stop||='ERROR';r.errors.push(String(e.stack||e).slice(0,900))}).finally(async()=>{
 clearInterval(monitor);try{await Promise.race([browser?.close(),sleep(2200)])}catch{}
 try{server?.close()}catch{}
 r.status=r.errors.length?'FAIL':'PASS';r.stop=stop||'COMPLETE';
 fs.writeFileSync(path.join(D,'X34-OWN-THREEJS-GLTFLOADER-ANIMATIONMIXER-LOCAL-GPU-VIEWER-RESULT.json'),JSON.stringify(r,null,2)+'\n');
 console.log('X34_THREE_GPU_VIEWER '+JSON.stringify({status:r.status,renderer:r.viewer?.renderer,
 clips:r.viewer?.animationClips?.length,cameraMoved:r.viewer?.cameraActuallyMoved,imagesDiffer:r.screenshotsDiffer,
 minFreeMiB:r.minFreeMiB,errors:r.errors}));
 if(r.status==='FAIL')process.exitCode=1;
});
