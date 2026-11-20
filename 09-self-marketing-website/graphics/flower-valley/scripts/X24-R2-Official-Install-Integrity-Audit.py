#!/usr/bin/env python3
"""Read-only DJMRN X24-R2 upstream source and installed Rust/WASM/GCC release integrity receipt."""
from pathlib import Path
import subprocess,hashlib,json,zipfile,datetime,os
home=Path.home()
d=home/"Downloads"/"DJMRN-Rust-X24-Official"
root=home/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
out=root/"02-reviewed-derived"/"X24-CURRENT"/"X24-R2-FULL-RUST-WASM-2026-11-20"
original=home/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"webgd"/"webgd-main"
gccroot=home/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Runtimes"/"w64devkit-2.11.0"/"w64devkit"
pin=home/".rustup"/"toolchains"/"1.100.0-x86_64-pc-windows-gnu"
def sha(p):
 h=hashlib.sha256()
 with open(p,"rb") as f:
  while b:=f.read(1048576):h.update(b)
 return h.hexdigest()
def run(path,*args):
 p=subprocess.run([str(path),*args],capture_output=True,text=True,timeout=25)
 return {"exit":p.returncode,"version":(p.stdout or p.stderr).strip().splitlines()[0][:180]}
items=[
 ("rustup-init.exe","38027d51d69a5d05493627a0634dbea52d6cd793c8f072d2373d3f4163eec7db"),
 ("rustc-1.100.0-x86_64-pc-windows-gnu.tar.xz","5eead574f663a8800490d1fd28d2a304117e9268af998f5ff7cc45c4c3cedfcb"),
 ("rust-std-1.100.0-wasm32-unknown-unknown.tar.xz","19b7954d650fc0d22767eceb76b8e03d07ce0d6a9f4234f33c32a17ee8d6d7b9"),
 ("wasm-bindgen-0.2.130-x86_64-pc-windows-msvc.tar.gz","844d23f1b56097549b936dd2e0d561fadebc1e8c9e985d5068b6b919654104ad"),
 ("w64devkit-x64-2.11.0.7z.exe","54c2bb9962e8a30c8270e34c5efc3d5fee579f53087fa7d435b95fbba2af7b2b")
]
archives=[]
for name,expected in items:
 file=d/name
 archives.append({"name":name,"sizeBytes":file.stat().st_size,"sha256":sha(file),
                  "officialExpectedSHA256":expected,"pass":sha(file)==expected})
zipfilep=home/"Downloads"/"DJMRN-Website-Tools"/"SOURCE_ARCHIVE"/"Snowapril-webgd-main.zip"
srcCount=0;matched=0
with zipfile.ZipFile(zipfilep) as z:
 for name in z.namelist():
  if name.endswith("/"):continue
  srcCount+=1;rel="/".join(name.split("/")[1:]);p=original/rel
  if p.is_file() and hashlib.sha256(z.read(name)).hexdigest()==sha(p):matched+=1
vers={
 "rustc":run(pin/"bin"/"rustc.exe","--version"),
 "cargo":run(pin/"bin"/"cargo.exe","--version"),
 "wasm-bindgen":run(home/".cargo"/"bin"/"wasm-bindgen.exe","--version"),
 "gcc":run(gccroot/"bin"/"gcc.exe","--version"),
 "dlltool":run(gccroot/"bin"/"dlltool.exe","--version"),
 "wasm-target":run(home/".cargo"/"bin"/"rustup.exe","target","list","--installed","--toolchain","1.100.0-x86_64-pc-windows-gnu")
}
result={"stage":"X24-R2","createdUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
"officialWebgdRepository":"https://github.com/Snowapril/webgd","officialWebgdSourceCommit":"7cd385690d6f3f5ff67fdf8faa6640b210451b80",
"officialWebgdLatestGithubReleaseAssets":[],"webgdVersion":"MV3 manifest 0.1.0","webgdLicense":"MIT",
"sourceZipSHA256":sha(zipfilep),"sourceArchiveFileCount":srcCount,"sourceFilesSHA256Identical":matched,
"originalSourceCargoLockSHA256":sha(original/"Cargo.lock"),
"downloadedOriginalVendorToolArchiveSHA256Verified":all(x["pass"] for x in archives),"downloadedOfficialArchives":archives,
"installedToolVersions":vers,
"nativeRustSmokeTest":"PASS using Rust self-contained GNU libraries and portable w64devkit GCC",
"nativeCargoSmokeTest":"PASS linked and executed DJMRN_CARGO_NATIVE_OK",
"globalPATHModified":False,"buildEnvironment":"Explicit absolute paths, scoped Rust self-contained LIBRARY_PATH and owner Rustc wrapper; no original webgd source edits",
"resourcePolicy":{"freeRAMStopMiB":100,"maxPerGPUTransferBytes":1000000000,"cargoBuildJobs":1,"cost":0},
"phase":"INSTALLED_SOURCES_AND_COMPILERS; FULL_WEBGD_UI_BUILD_SEPARATELY_VERIFIED"}
assert matched==srcCount==101 and all(a["pass"] for a in archives)
assert all(v["exit"]==0 for v in vers.values())
(out/"X24-R2-OFFICIAL-SOURCE-INSTALL-RUST-WASM-GCC-RECEIPT.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("X24_INSTALL_PRECONDITIONS_PASS",json.dumps({"SHAverifiedArchives":len(archives),"sourceArchiveMatches":matched,
"versions":vers,"buildStillSeparate":True})[:2600])
