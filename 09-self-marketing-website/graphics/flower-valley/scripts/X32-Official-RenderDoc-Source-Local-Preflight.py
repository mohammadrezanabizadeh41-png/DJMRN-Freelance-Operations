#!/usr/bin/env python3
"""DJMRN X32 no-install RenderDoc 1.47 provenance and locally existing binary/capture inventory."""
from pathlib import Path
import os,subprocess,json,hashlib,datetime
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X32-CURRENT"
P=R/"01-private-captures"/"X32"/"OWN-RENDERDOC"
TK=Path(os.environ["LOCALAPPDATA"])/"DJMRN-Website-Toolkit"/"04-Specialists"/"RenderDoc-MSI-Extract"/"PFiles"/"RenderDoc"
rd=TK/"renderdoccmd.exe"
def cmd(args):
 r=subprocess.run([str(rd),*args],capture_output=True,text=True,encoding="utf-8",errors="replace",timeout=18)
 return {"returnCode":r.returncode,"stdout":r.stdout[:2500],"stderr":r.stderr[:2500]}
def file(f):
 b=f.read_bytes()
 return {"bytes":len(b),"sha256":hashlib.sha256(b).hexdigest(),"privateOwnerLocation":str(f) if f.is_relative_to(P) else None}
result={"stage":"X32","observedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "tool":"RenderDoc GUI + renderdoccmd","officialSource":"https://github.com/baldurk/renderdoc",
 "officialTag":"v1.47","officialAnnotatedTagObject":"f259f1ea6c226a19f870a75d6b3b69b5182acc19",
 "officialLicense":"MIT","build":{"versionCmd":cmd(["version"]),"vulkanLayerCheckReadOnly":cmd(["vulkanlayer","--explain"])},
 "sourceAndCapture":{"qrenderdocExe":file(TK/"qrenderdoc.exe"),"renderdocCmdExe":file(rd),
  "renderdocDll":file(TK/"renderdoc.dll"),
  "nativeOwnerSource":file(D/"X32-OWN-RenderDoc-Native-D3D11-Grid-Points-Instancing.cpp"),
  "nativeOwnerExe":file(P/"X32-OWN-D3D11-Grid.exe"),
  "realRDC":file(P/"X32-OWN-D3D11-Vega8_capture.rdc"),
  "privateXML":file(P/"X32-OWN-CAPTURE-NATIVE.xml"),
  "privateThumbnail":file(P/"X32-OWN-THUMBNAIL.png")},
 "runtimeEvidence":{"realOwnerNativeCapture":True,
  "captureLog":"renderdoccmd capture -w -c owner-template owner.exe template: exit 0, D3D11_HARDWARE feature b000, API 1.7.0, EndCapture=1, NumCaptures=1",
  "realReplay":"renderdoccmd replay -l 1 -w 640 -h 360 owner.rdc returned exit 0",
  "realConvert":"renderdoccmd convert owner.rdc -> owned XML, returned exit 0",
  "realThumbnail":"renderdoccmd thumb owner.rdc -> owned PNG, returned exit 0",
  "qrenderdocGUI":"started with owner RDC, window Analytics observed",
  "windowsChanges":"no admin, no system/driver registry change, no Vulkan registration",
  "browserAngleProof":"separate X32-OWN-CHROME157-ANGLE-D3D11-WEBGL2-FEASIBILITY.json",
  "nativeChromeRenderdocFrameCapture":"NOT_ATTEMPTED",
  "commercialSiteNativeFrameCapture":"NOT_PERFORMED"},
 "security":{"rawRDCPrivateOnOwnerPC":True,"rawXMLPrivateOnOwnerPC":True,
 "screenshotsPrivateOnOwnerPC":True,"noWindowsGraphicsDriverOrSecurityBypass":True,
 "GPUDriverKnownIssue":"official RenderDoc v1.47 release warns about Windows AMD driver bugs; no shader debugger claim",
 "toolPricing":"Free MIT local, no credits, card, subscription, provider accounts or paid overage"}}
(D/"X32-OFFICIAL-RENDERDOC-1.47-SOURCE-LOCAL-PREFLIGHT-AND-OWNER-RECEIPT.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("X32_PREFLIGHT",json.dumps({"version":result["build"]["versionCmd"],"vulkan":result["build"]["vulkanLayerCheckReadOnly"]["stdout"][-1000:],
 "files":{k:x["bytes"] for k,x in result["sourceAndCapture"].items()}},ensure_ascii=False))
