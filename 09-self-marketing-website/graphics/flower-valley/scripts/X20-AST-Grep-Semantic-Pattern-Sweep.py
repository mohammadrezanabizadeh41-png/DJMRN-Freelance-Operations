import pathlib,os,subprocess,time,ctypes,json,collections,hashlib,sys
root=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
toolkit=pathlib.Path(os.environ["LOCALAPPDATA"])/"DJMRN-Website-Toolkit"
exe=toolkit/"01-Analysis"/"X20-Standalone-Tools"/"ast-grep-0.51.3"/"ast-grep.exe"
inputs=root/"01-private-captures"/"X19"/"full-verified-js-unpack"
private=root/"01-private-captures"/"X20"/"ast-grep"; private.mkdir(parents=True,exist_ok=True)
output=root/"02-reviewed-derived"/"X20-CURRENT"/"X20-AST-GREP-PUBLIC-SANITIZED-SEMANTIC-PATTERN-METADATA.json"
class MEM(ctypes.Structure):
 _fields_=[("dwLength",ctypes.c_ulong),("dwMemoryLoad",ctypes.c_ulong),("ullTotalPhys",ctypes.c_ulonglong),("ullAvailPhys",ctypes.c_ulonglong),("ullTotalPageFile",ctypes.c_ulonglong),("ullAvailPageFile",ctypes.c_ulonglong),("ullTotalVirtual",ctypes.c_ulonglong),("ullAvailVirtual",ctypes.c_ulonglong),("ullAvailExtendedVirtual",ctypes.c_ulonglong)]
def free_mb():
 x=MEM();x.dwLength=ctypes.sizeof(MEM);ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(x));return x.ullAvailPhys//(1024*1024)
patterns={
 "pointer_or_event_listener":"$O.addEventListener($EV,$FN)",
 "scene_position_vector":"$O.position.set($X,$Y,$Z)",
 "renderer_two_arguments":"$O.render($SCENE,$CAMERA)",
 "webgl_context_request":"$O.getContext($T)",
 "loader_async":"$O.loadAsync($PATH)",
 "loader_with_callbacks":"$O.load($PATH,$$$REST)",
 "raf_scheduling":"requestAnimationFrame($CALLBACK)",
 "animation_loop":"$O.setAnimationLoop($CALLBACK)"
}
cases=[]; start=time.time()
for name,pat in patterns.items():
 if free_mb()<350:cases.append({"name":name,"status":"ABORT_RAM_PRECHECK"});break
 dst=private/(name+".jsonl");err=private/(name+".stderr.txt")
 argv=[str(exe),"run","-p",pat,"--lang","javascript","--threads","2","--globs","**/static/*.js","--json=stream",str(inputs)]
 with dst.open("wb") as so,err.open("wb") as se:
  t=time.time()
  p=subprocess.Popen(argv,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
  status="EXITED"
  while p.poll() is None:
   if free_mb()<=100:status="RAM_STOP";p.kill();break
   if time.time()-t>23:status="TIMEOUT_23S";p.kill();break
   time.sleep(.3)
  code=p.wait()
 cnt=0; per=collections.Counter();bad=0
 with dst.open("r",encoding="utf-8",errors="replace") as f:
  for line in f:
   if not line.strip():continue
   try:
    j=json.loads(line);cnt+=1;per[pathlib.Path(str(j.get("file","unknown"))).name]+=1
   except Exception:bad+=1
 cases.append({"name":name,"pattern":pat,"status":status,"exit_code":code,"matches":cnt,"unique_module_basenames":len(per),"top_module_ids":per.most_common(9),"bad_json_records":bad,"runtime_seconds":round(time.time()-t,2),"output_sha256":hashlib.sha256(dst.read_bytes()).hexdigest(),"min_ram_not_measured":True})
 print("AST_CASE",name,"STATUS",status,"CODE",code,"MATCHES",cnt,"FILES",len(per),"TOP",per.most_common(4),"RAM_FREE_MB",free_mb(),flush=True)
res={"stage":"X20","tool":"ast-grep 0.51.3 Windows x64 official release, CLI static AST only","input":"X19 457 derived module files in 34 static folders; no vendor runtime executed","duration_total_seconds":round(time.time()-start,2),"cases":cases,"limitations":["Patterns are syntax-level candidates, not behavior verification.","Module basename is reused across chunks: full input path+SHA needed for identity.","Raw snippet matches retained only on owner laptop.","No proof that all possible behaviors or 457 modules are covered by these eight patterns."]}
output.write_text(json.dumps(res,indent=2,ensure_ascii=False),encoding="utf-8")
print("AST_REPORT",output,"TOTAL_MATCHES",sum(x.get("matches",0) for x in cases),flush=True)