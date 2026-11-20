#!/usr/bin/env python3
"""DJMRN X24 R2: official webgd WASM full-UI build via explicit pinned tool executable paths.
No global PATH mutation; no source patching; source Cargo.lock is locked; no paid services.
Abort on <=100 MiB physical free RAM, conserve via CARGO_BUILD_JOBS=1.
"""
import os,sys,time,subprocess,pathlib,json,ctypes,shutil,datetime,hashlib
HOME=pathlib.Path.home()
ROOT=HOME/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"/"X24-CURRENT"/"X24-R2-FULL-RUST-WASM-2026-11-20"
D.mkdir(parents=True,exist_ok=True)
SOURCE=HOME/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"webgd"/"webgd-main"
PIN=HOME/".rustup"/"toolchains"/"1.100.0-x86_64-pc-windows-gnu"
CARGO=HOME/".cargo"/"bin"/"cargo.exe"
WBG=HOME/".cargo"/"bin"/"wasm-bindgen.exe"
GCC=HOME/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Runtimes"/"w64devkit-2.11.0"/"w64devkit"/"bin"
class Mem(ctypes.Structure):
 _fields_=[("dwLength",ctypes.c_ulong),("dwMemoryLoad",ctypes.c_ulong),("ullTotalPhys",ctypes.c_ulonglong),
 ("ullAvailPhys",ctypes.c_ulonglong),("ullTotalPageFile",ctypes.c_ulonglong),("ullAvailPageFile",ctypes.c_ulonglong),
 ("ullTotalVirtual",ctypes.c_ulonglong),("ullAvailVirtual",ctypes.c_ulonglong),("ullAvailExtendedVirtual",ctypes.c_ulonglong)]
def mem_mib():
 q=Mem();q.dwLength=ctypes.sizeof(q);ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(q));return int(q.ullAvailPhys//1048576)
def sha(p):
 h=hashlib.sha256()
 with open(p,"rb") as f:
  while b:=f.read(1048576):h.update(b)
 return h.hexdigest()
def config():
 p=os.environ.copy()
 p.update({
  "RUSTC":str(PIN/"bin"/"rustc.exe"),"RUSTDOC":str(PIN/"bin"/"rustdoc.exe"),
  "RUSTC_WRAPPER":str(D/"X24-R2-Rustc-Host-Wrapper.exe"),"DJMRN_DLLTOOL":str(GCC/"dlltool.exe"),
  "CARGO_TARGET_X86_64_PC_WINDOWS_GNU_LINKER":str(GCC/"gcc.exe"),
  "CARGO_TARGET_X86_64_PC_WINDOWS_GNU_RUSTFLAGS":"-C link-self-contained=yes",
  "LIBRARY_PATH":str(PIN/"lib"/"rustlib"/"x86_64-pc-windows-gnu"/"lib"/"self-contained"),
  "CC":str(GCC/"gcc.exe"),"CXX":str(GCC/"g++.exe"),"AR":str(GCC/"ar.exe"),
  "CARGO_BUILD_JOBS":"1","CARGO_INCREMENTAL":"0","CARGO_PROFILE_DEV_DEBUG":"0",
  "CARGO_NET_RETRY":"3","CARGO_HTTP_TIMEOUT":"110",
  "CARGO_HTTP_MULTIPLEXING":"false","CARGO_TERM_COLOR":"never"})
 return p
def launch(stage,cmd,timeout):
 start=time.monotonic();log=D/f"X24-R2-{stage}-PRIVATE-BUILD.log"
 record={"stage":stage,"invocation":[pathlib.Path(cmd[0]).name]+cmd[1:],"startedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "sourceCargoLockSHA256":sha(SOURCE/"Cargo.lock"),"exit":None}
 minfree=mem_mib();lastupdate=-1
 with open(log,"wb") as fd:
  proc=subprocess.Popen([str(x) for x in cmd],cwd=SOURCE,env=config(),stdout=fd,stderr=subprocess.STDOUT,
                        creationflags=getattr(subprocess,"CREATE_NO_WINDOW",0))
  print("X24_STAGE_STARTED",stage,"PID",proc.pid,"RAM",minfree,flush=True)
  while proc.poll() is None:
   free=mem_mib();minfree=min(minfree,free);elapsed=int(time.monotonic()-start)
   if free<=100:
    record["aborted"]="RAM_AT_OR_BELOW_100_MIB"
    subprocess.run(["taskkill.exe","/T","/F","/PID",str(proc.pid)],capture_output=True)
    break
   if elapsed>timeout:
    record["aborted"]="COMMAND_WATCHDOG_EXCEEDED"
    subprocess.run(["taskkill.exe","/T","/F","/PID",str(proc.pid)],capture_output=True)
    break
   if elapsed//20 != lastupdate:
    lastupdate=elapsed//20
    try:
     with open(log,"rb") as rd:
      rd.seek(max(0,rd.seek(0,2)-2200))
      recent=rd.read().decode("utf-8",errors="replace").splitlines()
     last=recent[-1][:175] if recent else ""
    except Exception:last=""
    print("X24_STAGE_PROGRESS",stage,"elapsedSec",elapsed,"freeRamMiB",free,"lastLog",last,flush=True)
   time.sleep(2)
  proc.wait(timeout=25)
 record["exit"]=proc.returncode;record["endUTC"]=datetime.datetime.now(datetime.timezone.utc).isoformat()
 record["minimumFreeRAMMiB"]=minfree;record["elapsedSeconds"]=round(time.monotonic()-start,2)
 record["logRelative"]=log.name;record["logBytes"]=log.stat().st_size
 record["status"]="PASS" if proc.returncode==0 and not record.get("aborted") else "FAILED_OR_ABORTED"
 (D/f"X24-R2-{stage}-EXECUTION-RESULT.json").write_text(json.dumps(record,indent=2)+"\n",encoding="utf-8")
 print("X24_STAGE_END",json.dumps(record,ensure_ascii=False),flush=True)
 if proc.returncode:
  print("X24_ERROR_LOG_TAIL",log.read_text(encoding="utf-8",errors="replace")[-4500:],flush=True)
 return proc.returncode
def main():
 if mem_mib()<=100:raise SystemExit("RAM_EMERGENCY_PRECHECK")
 for exe in [CARGO,WBG,PIN/"bin"/"rustc.exe",GCC/"gcc.exe"]:
  if not exe.is_file():raise RuntimeError("MISSING_REQUIRED_BINARY "+str(exe))
 if not (SOURCE/"Cargo.lock").is_file():raise RuntimeError("SOURCE_CARGO_LOCK_MISSING")
 stage=sys.argv[1] if len(sys.argv)>1 else "build"
 if stage=="fetch":code=launch("CARGO-FETCH",[CARGO,"fetch","--locked","--target","wasm32-unknown-unknown"],1050)
 elif stage=="build":
  code=launch("WEBGD-UI-WASM-BUILD",[CARGO,"build","-p","webgd-ui","--target","wasm32-unknown-unknown","--locked"],2400)
  if code==0:
   raw=SOURCE/"target"/"wasm32-unknown-unknown"/"debug"/"webgd_ui.wasm"
   if not raw.is_file():raise RuntimeError("RUST_WASM_ARTIFACT_MISSING")
   out=SOURCE/"extension"/"ui";out.mkdir(parents=True,exist_ok=True)
   bind=subprocess.run([str(WBG),str(raw),"--target","web","--no-typescript",
     "--out-dir",str(out),"--out-name","webgd_ui"],capture_output=True,text=True,timeout=100)
   if bind.returncode!=0:raise RuntimeError("WASM_BINDGEN_FAILED "+bind.stderr[-1400:])
   for file in ["index.html","main.js"]:shutil.copyfile(SOURCE/"web"/file,out/file)
   files={f:{"bytes":(out/f).stat().st_size,"sha256":sha(out/f)} for f in ["index.html","main.js","webgd_ui.js","webgd_ui_bg.wasm"]}
   (D/"X24-R2-WEBGD-COMPILED-UI-ARTIFACTS.json").write_text(json.dumps({
    "stage":"X24-R2","status":"BUILT_COMPLETE_WEBGD_UI_RUST_WASM", "wasmBindgenVersion":"0.2.130",
    "releaseBinaryExistsOnUpstream":False,"sourceOriginalUnmodified":True,"files":files},indent=2)+"\n",encoding="utf-8")
   print("X24_RUST_WASM_UI_BUILT",json.dumps(files),flush=True)
 elif stage=="test":code=launch("CARGO-NATIVE-UNIT-TEST",[CARGO,"test","--locked"],1600)
 elif stage=="cli":code=launch("WEBGD-CLI-BUILD",[CARGO,"build","-p","webgd-cli","--locked"],1400)
 else:raise SystemExit("UNKNOWN_STAGE "+stage)
 if code:raise SystemExit(code)
if __name__=="__main__":main()
