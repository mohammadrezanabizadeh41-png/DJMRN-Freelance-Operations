#!/usr/bin/env python3
"""DJMRN X24 R2 public allowlist, source SHA256 to exact git blob SHA1 manifest.
No original Gladeye GPU bytes/shaders/screenshots, no compiled 52MB WebAssembly binary.
All final owner-authored scripts and sanitized evidence remain small, versionable and reproducible.
"""
from pathlib import Path
import hashlib,json,datetime,re
H=Path.home()
R=H/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X24-CURRENT"/"X24-R2-FULL-RUST-WASM-2026-11-20"
DEST=H/"Downloads"/"DJMRN-GitHub-Publish-X24-R2"
prefix="09-self-marketing-website/graphics/flower-valley"
def sha(b):return hashlib.sha256(b).hexdigest()
def gitblob(b):return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\0"+b).hexdigest()
def filehash(p):return sha(p.read_bytes())
u=json.loads((D/"X24-R2-COMPILED-WEBGD-UI-OWN-FIXTURE-INTEGRATION.json").read_text(encoding="utf-8"))
screenshot=D/"X24-R2-FULL-RUST-WASM-OWN-FIXTURE-AFTER-CAPTURE.png"
assert u["status"]=="PASS_FULL_UI_REAL_BROWSER" and u["integrationPass"] and not u["errors"]
ui={
 "stage":"X24-R2","testType":"Owner WebGL2 fixture real browser integration",
 "compiledRustWasmUiLoaded":True,"officialMV3ServiceWorkerDetected":bool(u["extensionIdDetected"]),
 "isolatedChromeExtensionPageResponse":u["steps"][1]["responseStatus"],
 "ownerWebGl2Hook":u["steps"][0]["webgdHook"],
 "eguiCanvasPresent":u["steps"][1]["canvasCount"]>0,
 "actualUiCapturedAndReplayedFixture":True,
 "manualVisualObservationsFromPrivateOwnerScreenshot":{"frameEvents":34,"drawsOrDispatches":2,
   "gpuResources":17,"reportedReplayErrors":0,"reportedReplayWarnings":0},
 "capturedFixtureScreenshotSha256":filehash(screenshot),
 "capturedFixtureScreenshotBytes":screenshot.stat().st_size,
 "freeRAMminimumMiB":u["minFreeRAMMiB"],
 "chromePermission":"isolated anonymous Chrome for Testing only, not permanent personal Chrome",
 "note":"UI replay is verified on owner fixture. Seven real-site WGDW packets captured with official webgd JS hook and independently decoded; UI replay of those seven 137MB packets NOT claimed."
}
uiPath=D/"X24-R2-FULL-WASM-UI-REAL-CAPTURE-REPLAY-OWN-FIXTURE-SANITIZED.json"
uiPath.write_text(json.dumps(ui,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
pairs=[
("X24-R2-FULL-RUST-WASM-7GPU-STAGEWISE-RAM-X01-X23-2026-11-20.md","handoffs"),
("X24-R2-S2-SEVEN-FULL-WGDW-INDEPENDENT-X01-X23-CROSSWALK.json","evidence"),
("X24-R2-S2-INDEPENDENT-ACCEPTANCE.json","evidence"),
("X24-LIVE-90S-STAGE1-STREAMING/X24-R2-S1-LIVE-90S-SANITIZED-CAPTURE-TIMELINE.json","evidence"),
("X24-LIVE-90S-STAGE2-GC/X24-R2-S2-LIVE-90S-SANITIZED-CAPTURE-TIMELINE.json","evidence"),
("X24-R2-OFFICIAL-SOURCE-INSTALL-RUST-WASM-GCC-RECEIPT.json","evidence"),
("X24-R2-WEBGD-COMPILED-UI-ARTIFACTS.json","evidence"),
("X24-R2-CARGO-FETCH-EXECUTION-RESULT.json","evidence"),
("X24-R2-WEBGD-UI-WASM-BUILD-EXECUTION-RESULT.json","evidence"),
("X24-R2-CARGO-NATIVE-UNIT-TEST-EXECUTION-RESULT.json","evidence"),
("X24-R2-FULL-WASM-UI-REAL-CAPTURE-REPLAY-OWN-FIXTURE-SANITIZED.json","evidence"),
("X24-R2-Full-Rust-WASM-Official-Build.py","scripts"),
("X24-R2-Official-Install-Integrity-Audit.py","scripts"),
("X24-R2-Rustc-Host-Wrapper.rs","scripts"),
("X24-R2-Full-Compiled-Webgd-UI-Own-Fixture-Browser-Test.cjs","scripts"),
("X24-R2-S1-Lossless-1GB-Streaming-90s-100MiB-RAM-Runner.cjs","scripts"),
("X24-R2-S2-Lossless-Streaming-Between-Frame-GC-90s-Runner.cjs","scripts"),
("X24-R2-S2-Independent-7Frame-X01-X23-Acceptance.py","scripts"),
("X24-R2-S2-Build-Handoff.py","scripts"),
("X24-R2-Open-Compiled-Webgd-GUI-On-Demand.cjs","scripts"),
("X24-R2-S2-Prepare-GitHub-Publication.py","scripts"),
]
for i in range(1,8):
 pairs.append(("X24-LIVE-90S-STAGE2-GC/X24-R2-S2-FRAME-%02d-WGDW-INDEPENDENT-DECODE.json"%i,"evidence"))
assert len(pairs)==28
DEST.mkdir(parents=True,exist_ok=True);entries=[]
for relative,category in pairs:
 src=D/relative
 if not src.is_file():raise RuntimeError("MISSING_SOURCE "+str(src))
 original=src.read_bytes()
 if b"\0" in original:raise RuntimeError("BINARY_FILE_PUBLISH_DENIED "+relative)
 txt=original.decode("utf-8-sig").replace("\r\n","\n").replace("\r","\n")
 if src.name!="X24-R2-S2-Prepare-GitHub-Publication.py" and re.search(r"C:\\Users\\|C:/Users/|Bearer\s+[A-Za-z0-9._-]{24,}|BEGIN [^\n]+PRIVATE KEY",txt,re.I):
  raise RuntimeError("POSSIBLE_PERSONAL_PATH_OR_SECRET_BLOCKED "+relative)
 pub=txt.encode("utf-8")
 if len(pub)>1000000000:raise RuntimeError("EXCEEDS_USER_1GB_CAP "+relative)
 if category=="evidence":
  obj=json.loads(txt)
  if "rawFile" in txt and "LOCAL-PRIVATE" in txt:raise RuntimeError("PRIVATE_CAPTURE_INDEX_BLOCKED "+relative)
 target=DEST/prefix/category/src.name
 target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(pub)
 item={"path":str(Path(prefix)/category/src.name).replace("\\","/"),
 "ownerSourcePathRelativeToEvidenceRoot":str(src.relative_to(R)).replace("\\","/"),
 "ownerSourceSha256":sha(original),"ownerSourceBytes":len(original),
 "publicSha256":sha(pub),"publicBytes":len(pub),"publicGitBlobSha1":gitblob(pub),
 "newlineOrBomNormalized":original!=pub,"classification":category}
 entries.append(item)
 assert filehash(target)==item["publicSha256"] and target.stat().st_size==item["publicBytes"]
m={"stage":"X24-R2","dateUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "repo":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations","branch":"main",
 "scope":"Complete official Rust/WASM webgd UI and tested own-fixture capture/replay; seven complete 137MB public-site GPU WGDW files kept PRIVATE, only derived metadata and exact SHA public.",
 "userPacketCapBytes":1000000000,"userEmergencyRAMFreeMiB":100,
 "acceptance":"248/248","publicOwnerGeneratedFiles":len(entries),"entries":entries,
 "sourceAuthority":"X01-X19 canonical 78 original site URL+SHA registry unchanged",
 "strictlyExcluded":[
  "Seven original real-site WGDW GPU files, 960061412 bytes total",
  "Three S1 original WGDW files",
  "Original third-party GLSL shader source and GPU texture pixels",
  "All original private browser screenshots of UI and external site",
  "Native Rust toolchain, downloaded tarballs, Rustup caches",
  "Large compiled 51867289-byte Rust/WASM binary (installed on PC with SHA manifest)",
  "Failed native linker diagnostic logs with local Windows paths"],
 "manifestSelfShaOmittedToAvoidRecursion":True}
manifest=DEST/prefix/"evidence"/"X24-R2-S2-PUBLIC-SOURCE-SHA256-TO-GIT-BLOBS-MANIFEST.json"
manifest.write_text(json.dumps(m,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
(D/"X24-R2-S2-PUBLIC-SOURCE-SHA256-TO-GIT-BLOBS-MANIFEST.json").write_bytes(manifest.read_bytes())
print("X24_R2_PUBLIC_STAGED",json.dumps({"files":len(entries),"bytes":sum(e["publicBytes"] for e in entries),
"shaManifest":filehash(manifest),"largeRawOriginalUploaded":False,"rawGPUsiteBytesPrivate":960061412},ensure_ascii=False))
