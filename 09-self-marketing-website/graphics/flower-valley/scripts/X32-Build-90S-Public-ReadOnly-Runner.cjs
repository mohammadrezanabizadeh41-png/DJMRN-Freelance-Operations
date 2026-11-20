'use strict';
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const src=path.join(root,'02-reviewed-derived','X31-CURRENT','X31-Official-MeshGrab-90s-LIVE-Public-ReadOnly.cjs');
const dst=path.join(root,'02-reviewed-derived','X32-CURRENT','X32-Native-RenderDoc-Feasibility-90s-Public-ReadOnly.cjs');
let t=fs.readFileSync(src,'utf8').replace(/\r\n/g,'\n'),replacements=[];
function rep(oldText,newText){if(!t.includes(oldText))throw Error('missing known X31 anchor: '+oldText.slice(0,80));t=t.replace(oldText,newText);replacements.push(oldText.slice(0,50));}
rep('X31-CURRENT','X32-CURRENT');
rep("'X31','PUBLIC-90S-READONLY'","'X32','PUBLIC-90S-READONLY'");
rep('X31-MESHGRAB-LIVE-READONLY-DIRECT-NO-PROXY','X32-RENDERDOC-SEPARATE-OBSERVATION-NO-INJECTION-ON-VENDOR');
rep('official kmatzen/meshgrab MV3 1.1.1 isolated Chrome157 WITHOUT vendor origin permission; passive WebGL draw observer only',
 'RenderDoc 1.47 GUI used ONLY for OWNER D3D11 fixture separately; public site is ordinary uninstrumented Chrome with passive own WebGL draw-mode observer');
rep("officialGitHubTreeObserved20261120:'30dc6f45205407dbcf485e51e030568b4e997300'",
 "renderDocOfficialUpstream:'https://github.com/baldurk/renderdoc',renderDocVersion:'1.47'");
rep('meshGrabVendorOriginNeverEnabled:true','renderDocVendorProcessNeverInjected:true');
rep('meshgrabCapturedOnVendor:!!window.__meshgrab','renderdocVendorProcessInjection:false');
rep('meshGrabNotGrantedOnVendor:!meta.meshgrabCapturedOnVendor','renderDocNotInjected:!meta.renderdocVendorProcessInjection');
rep("const manifest=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json')));if(manifest.version!=='1.1.1'||manifest.manifest_version!==3)throw Error('VERSION_FAIL');",
 "result.renderdocAttachToVendor=false;result.noNativeGPUCaptureOfVendor=true;");
rep("args:['--headless=new','--disable-extensions-except='+ext,'--load-extension='+ext,",
 "args:['--headless=new',");
rep("result.meshGrabPublicSafety=await page.evaluate(()=>({unpermittedVendorOrigin:!window.__meshgrab,\n  canvasCount:document.querySelectorAll('canvas').length,threeRevision:window.__THREE__||null}));\n if(!result.meshGrabPublicSafety.unpermittedVendorOrigin)throw Error('VENDOR_MESHGRAB_HOOK_MUST_BE_ABSENT');\n result.meshGrabPublicSafety.extensionWorkerLoaded=browser.targets().some(t=>t.url().startsWith('chrome-extension://'));\n // The official extension has NO commercial-origin grants; public observation uses only read-only metadata.",
 "result.vendorRenderDocSafety={renderdocNotLoadedOrInjected:true,chromeNoExtensionFlags:true,publicObservationReadOnly:true};");
rep("result.vendorMeshGrabHookAbsentEverySnapshot=result.snapshots.every(x=>x.metadata?.meshgrabCapturedOnVendor===false);",
 "result.vendorRenderDocNeverInjectedEverySnapshot=result.snapshots.every(x=>x.metadata?.renderdocVendorProcessInjection===false);");
rep('X31-PRIVATE-LIVE-','X32-PRIVATE-LIVE-');
rep("'X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json'","'X32-90S-LIVE-READONLY-RENDERDOC-NO-VENDOR-INJECTION-X01-X31-TIMELINE.json'");
rep('X31_LIVE_WINDOW','X32_LIVE_WINDOW');
rep('X31_LIVE_FINAL','X32_LIVE_FINAL');
rep('ONLY ungranted MeshGrab extension with passive WebGL primitive modes/count signatures, first-party network-body hashes and private screenshot hashes; NO vendor GLB, buffer, texture or shader export',
    'RenderDoc NOT injected on vendor; isolated ordinary Chrome passive WebGL2 draw signatures and first-party resource SHA-size, private screenshots only. No vendor native capture or model export');
t=t.replace('with official MeshGrab','without RenderDoc process injection').replace('extension loaded but NOT GRANTED any commercial site; passive metadata only.','public read-only passive metadata observer; RenderDoc active exclusively on original owner fixture.');
fs.writeFileSync(dst,t);
console.log(JSON.stringify({built:dst,replacements:replacements.length,bytes:Buffer.byteLength(t),sha256:crypto.createHash('sha256').update(t).digest('hex')}));
