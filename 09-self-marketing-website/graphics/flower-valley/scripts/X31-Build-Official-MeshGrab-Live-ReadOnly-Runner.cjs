'use strict';
// Build a fresh X31 90-second public-site READ-ONLY observer from previously proven X30.
// It loads MeshGrab in a disposable browser but DOES NOT enable host permission on Gladeye.
// No original site geometry, shader bodies, textures, meshes, or GLB are saved/exported.
const fs=require('fs'),path=require('path'),os=require('os');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const src=path.join(root,'02-reviewed-derived','X30-CURRENT','X30-Official-binbuf-WebGLModelExtractor-90s-LIVE-ReadOnly-DirectNoProxy.cjs');
const dst=path.join(root,'02-reviewed-derived','X31-CURRENT','X31-Official-MeshGrab-90s-LIVE-Public-ReadOnly.cjs');
let s=fs.readFileSync(src,'utf8').replace(/\r\n/g,'\n'),count=0;
function change(find,rep){
 if(!s.includes(find)){console.warn('MISSING_OPTIONAL_ANCHOR: '+find.slice(0,140));return;}
 s=s.replace(find,rep);count++;
}
change('DJMRN X29: REAL public homepage','DJMRN X31: REAL public homepage');
change('with official WebGLRipper','with official MeshGrab');
change('extension activated but NEVER issuing the capture/export command on a commercial website.',
       'extension loaded but NOT GRANTED any commercial site; passive metadata only.');
change("'X30-CURRENT'","'X31-CURRENT'");
change("'X30','PUBLIC-90S-READONLY'","'X31','PUBLIC-90S-READONLY'");
change("'WebGLModelExtractor','webgl-model-extractor-main','dist','chrome'","'meshgrab','meshgrab-main'");
change("stage:'X30-binbuf-LIVE-READONLY-DIRECT-NO-PROXY'","stage:'X31-MESHGRAB-LIVE-READONLY-DIRECT-NO-PROXY'");
change("tool:'official binbuf/webgl-model-extractor v0.7.0 MIT MV3 in isolated Chrome157 MAIN-world doc_start; READ-ONLY; NO CAPTURE ON THIRD-PARTY'",
       "tool:'official kmatzen/meshgrab MV3 1.1.1 isolated Chrome157 WITHOUT vendor origin permission; passive WebGL draw observer only'");
change("officialGitHubHeadAsOf20261120:'458c5890b85c9fccf193e6f72e9ab15914196d3f'",
       "officialGitHubTreeObserved20261120:'30dc6f45205407dbcf485e51e030568b4e997300'");
change("geometryExportOfOriginalSite:false,originalSiteGLB:false","geometryExportOfOriginalSite:false,originalSiteGLB:false,meshGrabVendorOriginNeverEnabled:true");
change("const summary=window.__DJMRN_X29_READONLY||null;","const summary=window.__DJMRN_X29_READONLY||null;");
change("ripperReady:[{type:'ready',contexts:window.__webglRipper?.contexts||0,canvases:document.querySelectorAll('canvas').length}],",
       "meshgrabCapturedOnVendor:!!window.__meshgrab,");
change("ripperReady:meta.ripperReady.some(x=>x.type==='ready'),",
       "meshGrabNotGrantedOnVendor:!meta.meshgrabCapturedOnVendor,");
change("const manifest=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json')));if(manifest.version!=='0.7.0'||manifest.manifest_version!==3)",
       "const manifest=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json')));if(manifest.version!=='1.1.1'||manifest.manifest_version!==3)");
change("await page.waitForFunction(()=>!!window.__webglRipper && window.__webglRipper.contexts>0,{timeout:45000});\n result.modelExtractorReady=await page.evaluate(()=>({active:!!window.__webglRipper,\n  contexts:window.__webglRipper?.contexts,gpuDevices:window.__webglRipper?.gpuDevices,\n  hasCaptureFunction:typeof window.__webglRipper?.capture==='function'}));\n if(!result.modelExtractorReady.active||result.modelExtractorReady.contexts!==1)\n   throw Error('X30_MODEL_EXTRACTOR_READONLY_CONTEXT_NOT_VERIFIED');\n // Both contexts are isolated in this fresh disposable profile; no capture/export command on the commercial site.",
       "result.meshGrabPublicSafety=await page.evaluate(()=>({unpermittedVendorOrigin:!window.__meshgrab,\n  canvasCount:document.querySelectorAll('canvas').length,threeRevision:window.__THREE__||null}));\n if(!result.meshGrabPublicSafety.unpermittedVendorOrigin)throw Error('VENDOR_MESHGRAB_HOOK_MUST_BE_ABSENT');\n result.meshGrabPublicSafety.extensionWorkerLoaded=browser.targets().some(t=>t.url().startsWith('chrome-extension://'));\n // The official extension has NO commercial-origin grants; public observation uses only read-only metadata.");
change("const img=await page.screenshot({type:'png',captureBeyondViewport:false}),name='X30-PRIVATE-LIVE-'+label+'.png';",
       "const img=await page.screenshot({type:'png',captureBeyondViewport:false}),name='X31-PRIVATE-LIVE-'+label+'.png';");
change("console.log('X30_LIVE_WINDOW ","console.log('X31_LIVE_WINDOW ");
change("result.stopReason=stop;result.minFreeRamMiB=minFree;result.endUTC=new Date().toISOString();",
       "result.stopReason=stop;result.minFreeRamMiB=minFree;result.endUTC=new Date().toISOString();\n result.vendorMeshGrabHookAbsentEverySnapshot=result.snapshots.every(x=>x.metadata?.meshgrabCapturedOnVendor===false);");
change("'X30-90S-LIVE-READONLY-MODEL-EXTRACTOR-METADATA-X01-X29-TIMELINE.json'",
       "'X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json'");
change("console.log('X30_LIVE_FINAL ","console.log('X31_LIVE_FINAL ");
change("'WATCHDOG_140S'","'WATCHDOG_290S'");
change("'ONLY binbuf model extractor context metadata, instrumented GPU draw primitive modes/count signatures, network first-party hash size and private screenshot hashes; NO vendor asset capture/export'",
       "'ONLY ungranted MeshGrab extension with passive WebGL primitive modes/count signatures, first-party network-body hashes and private screenshot hashes; NO vendor GLB, buffer, texture or shader export'");
fs.writeFileSync(dst,s);
console.log(JSON.stringify({status:'BUILT',changes:count,file:dst,bytes:Buffer.byteLength(s)}));
