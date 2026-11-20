#!/usr/bin/env python3
"""Build owner X30 read-only live driver from the proven X29 90.01s browser/navigation runner.
Only approved nonexpressive metadata and no commercial site GLB/OBJ capture.
"""
from pathlib import Path
ROOT=Path.home()/'Desktop'/'DJMRN-Website-Reference-Evidence'/'fernhollow-gladeye-20261118-NEW-EXTRACTION'
d=ROOT/'02-reviewed-derived'/'X30-CURRENT'
prior=ROOT/'02-reviewed-derived'/'X29-CURRENT'/'X29-Official-WebGLRipper-90s-LIVE-Retry-With-Commit-Navigation.cjs'
out=d/'X30-Official-binbuf-WebGLModelExtractor-90s-LIVE-ReadOnly-Primitive-X01-X29.cjs'
s=prior.read_text('utf8')
def replace(a,b):
 global s
 assert a in s,('MISSING',a[:150])
 s=s.replace(a,b)
replace("'X29-CURRENT'","'X30-CURRENT'")
replace("'01-private-captures','X29','public-live-metadata-90s'","'01-private-captures','X30','PUBLIC-90S-READONLY'")
replace("'04-Specialists','Sources','WebGLRipper','source-7fe32c9616f5'",
        "'04-Specialists','Sources','WebGLModelExtractor','webgl-model-extractor-main','dist','chrome'")
replace("stage:'X29-RETRY-READONLY'","stage:'X30-binbuf-LIVE-READONLY'")
replace("'official int3re/WebGLRipper pinned 7fe32c9616f5 v1.3.2 MIT activated in isolated Chrome157 MAIN-world doc_start; READ-ONLY; NO EXPORT'",
        "'official binbuf/webgl-model-extractor v0.7.0 MIT MV3 in isolated Chrome157 MAIN-world doc_start; READ-ONLY; NO CAPTURE ON THIRD-PARTY'")
replace("sourceSHA:'7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849'",
        "officialGitHubHeadAsOf20261120:'458c5890b85c9fccf193e6f72e9ab15914196d3f'")
replace("manifest.version!=='1.3.2'","manifest.version!=='0.7.0'")
replace("ripperReady:window.__DJMRN_X29_MESSAGES||[]",
        "ripperReady:[{type:'ready',contexts:window.__webglRipper?.contexts||0,canvases:document.querySelectorAll('canvas').length}]")
start=s.index(" await page.evaluate(()=>{window.__DJMRN_X29_MESSAGES=[];")
end=s.index(" // Both contexts are isolated",start)
s=s[:start]+""" await page.waitForFunction(()=>!!window.__webglRipper && window.__webglRipper.contexts>0,{timeout:16000});
 result.modelExtractorReady=await page.evaluate(()=>({active:!!window.__webglRipper,
  contexts:window.__webglRipper?.contexts,gpuDevices:window.__webglRipper?.gpuDevices,
  hasCaptureFunction:typeof window.__webglRipper?.capture==='function'}));
 if(!result.modelExtractorReady.active||result.modelExtractorReady.contexts!==1)
   throw Error('X30_MODEL_EXTRACTOR_READONLY_CONTEXT_NOT_VERIFIED');
""" +s[end:]
replace("X29-PRIVATE-LIVE-","X30-PRIVATE-LIVE-")
replace("X29_LIVE_WINDOW","X30_LIVE_WINDOW")
replace("X29_LIVE_FINAL","X30_LIVE_FINAL")
replace("X29-90S-LIVE-READONLY-WEBGLRIPPER-METADATA-X01-X28-TIMELINE.json",
        "X30-90S-LIVE-READONLY-MODEL-EXTRACTOR-METADATA-X01-X29-TIMELINE.json")
replace("'ONLY Ripper hello/context metadata, WebGL draw primitive mode/count/instanceCount signature totals, first-party URLs/hashes, private screenshot hashes; NO target content/model export'",
        "'ONLY binbuf model extractor context metadata, instrumented GPU draw primitive modes/count signatures, network first-party hash size and private screenshot hashes; NO vendor asset capture/export'")
s=s.replace("this source is original X29","this source is original X30")
assert "window.__webglRipper.capture()" not in s
assert "type:'capture'" not in s
out.write_text(s,'utf8')
print({'source':str(prior),'result':str(out),'bytes':out.stat().st_size,
  'ripperHookActive':'__webglRipper?.contexts' in s,'noProprietaryCapture':True})
