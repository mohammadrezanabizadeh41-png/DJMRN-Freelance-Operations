from pathlib import Path
import os
root=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
old=root/"02-reviewed-derived"/"X28-CURRENT"/"X28-Spector-Playwright-90s-Phase-Capture.cjs"
target=root/"02-reviewed-derived"/"X29-CURRENT"/"X29-Public-90s-WebGLRipper-Activated-Spector-ReadOnly.cjs"
src=old.read_text(encoding="utf8")
src=src.replace("X28-CURRENT','SPECTOR-90S","X29-CURRENT','PUBLIC-LIVE-90S")
src=src.replace("X28','SPECTOR-90S","X29','PUBLIC-LIVE-90S")
src=src.replace("stage:'X28-SPECTOR'","stage:'X29-READONLY-EXTENSION-ACTIVE'")
src=src.replace("X28-SPECTOR-","X29-PUBLIC-READONLY-")
src=src.replace("X28_SPECTOR_","X29_PUBLIC_")
src=src.replace("X28-SPECTOR-ISOLATED-CHROME","X29-ISOLATED-CHROME")
needle="const chrome=path.join(tk,"
assert needle in src
src=src.replace(needle,"const ripperExt=path.join(tk,'04-Specialists','Sources','WebGLRipper','source-7fe32c9616f5');\n"+needle,1)
assert "'--disable-extensions-except='+ext" in src and "'--load-extension='+ext" in src
src=src.replace("'--disable-extensions-except='+ext","'--disable-extensions-except='+ext+','+ripperExt")
src=src.replace("'--load-extension='+ext","'--load-extension='+ext+','+ripperExt")
needle=" observedStart=Date.now();stat.observedStartUtc"
assert needle in src
inject=""" const webglRipperHello=await page.evaluate(()=>{
  window.__DJMRN_X29_RIPPER=[];
  document.addEventListener('webglripper:ext',e=>{try{const x=JSON.parse(e.detail);
   if(x.type==='ready')window.__DJMRN_X29_RIPPER.push({type:x.type,contexts:x.contexts,canvases:x.canvases?.length,state:x.state});
  }catch{}});
  document.dispatchEvent(new CustomEvent('webglripper:page',{detail:JSON.stringify({type:'hello'})}));
  return window.__DJMRN_X29_RIPPER;
 });
 stat.webglRipperActivated=webglRipperHello.some(x=>x.type==='ready'&&x.contexts>0);
 stat.webglRipperHello=webglRipperHello;
 stat.geometryExportOnThirdPartySite=false;
 if(!stat.webglRipperActivated)throw Error('RIPPER_EXTENSION_HELLO_NOT_VERIFIED');
"""
src=src.replace(needle,inject+needle,1)
target.parent.mkdir(parents=True,exist_ok=True)
target.write_text(src,encoding='utf8')
print({"source":str(old),"target":str(target),"bytes":target.stat().st_size,"includesRipperHello":'webglRipperActivated' in src,"noRipperCaptureCall":("type:'capture'" not in src)})
