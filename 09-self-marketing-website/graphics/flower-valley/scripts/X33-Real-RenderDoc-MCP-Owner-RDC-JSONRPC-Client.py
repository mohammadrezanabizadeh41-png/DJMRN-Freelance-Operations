#!/usr/bin/env python3
"""DJMRN X33: authentic stdio MCP client (not a tool-list-only smoke test).
Only passes the owner-created X32 RDC; never injects RenderDoc into the commercial website.
No Codex settings touched, no DLL mixing, no outside network, no extra dependencies.
"""
from pathlib import Path
import subprocess,threading,queue,json,os,time,re,hashlib,datetime,sys
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X33-CURRENT";P=R/"01-private-captures"/"X33"/"OWN-RENDERDOC-MCP"
app=Path(os.getenv("LOCALAPPDATA"))/"DJMRN-Website-Toolkit"/"04-Specialists"/"RenderDoc-MCP-v0.3.0-Prebuilt"/"app"/"renderdoc-mcp-windows-x64-v0.3.0"/"bin"
exe=app/"renderdoc-mcp.exe"
rdc=R/"01-private-captures"/"X32"/"OWN-RENDERDOC"/"X32-OWN-D3D11-Vega8_capture.rdc"
q=queue.Queue();err=[];steps=[];raw_private=[]
p=None;now=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
def read():
 for line in iter(p.stdout.readline,b""):
  try:q.put(json.loads(line.decode("utf-8-sig")))
  except Exception as e:q.put({"parse_error":str(e),"raw":line[:160].decode("utf8","replace")})
def readerr():
 for line in iter(p.stderr.readline,b""):
  if len(err)<150:err.append(line.decode("utf8","replace")[:300])
def send(msg):
 b=json.dumps(msg,separators=(",",":")).encode("utf8")+b"\n"
 p.stdin.write(b);p.stdin.flush()
def wait(id,limit=25):
 end=time.monotonic()+limit
 while time.monotonic()<end:
  try:x=q.get(timeout=min(0.5,max(.02,end-time.monotonic())))
  except queue.Empty:continue
  if x.get("id")==id:return x
  steps.append({"outOfBand":str(x)[:250]})
 return {"id":id,"error":{"message":"TIMEOUT_"+str(limit)+"S"}}
seq=0
def call(method,params=None,limit=25,notify=False):
 global seq
 if notify:
  send({"jsonrpc":"2.0","method":method,"params":params or {}});return None
 seq+=1;identifier=seq
 send({"jsonrpc":"2.0","id":identifier,"method":method,"params":params or {}})
 return wait(identifier,limit)
def textval(x):
 data=x.get("result",{})
 if isinstance(data,str):return data
 if isinstance(data,dict) and "content" in data:
  return "\n".join(z.get("text","") for z in data["content"] if z.get("type")=="text")
 return json.dumps(data,ensure_ascii=False)
def redact(x):
 return str(x).replace(str(R),"<OWNER_PRIVATE_ROOT>").replace(str(app),"<LOCAL_MCP_BIN>")
def run():
 global p
 if not exe.is_file() or not rdc.is_file():raise RuntimeError("PREREQUISITE_MISSING")
 env=os.environ.copy()
 env["PATH"]=str(app)+os.pathsep+env.get("PATH","")
 p=subprocess.Popen([str(exe)],stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE,
                     cwd=str(app),env=env,creationflags=getattr(subprocess,"CREATE_NO_WINDOW",0))
 threading.Thread(target=read,daemon=True).start();threading.Thread(target=readerr,daemon=True).start()
 init=call("initialize",{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"DJMRN-X33-OWN-READONLY","version":"1.0"}},limit=15)
 raw_private.append({"method":"initialize","reply":init})
 if "error" in init:raise RuntimeError("MCP_INITIALIZE_"+str(init["error"]))
 steps.append({"step":"initialize","ok":bool(init.get("result")),"serverInfo":init.get("result",{}).get("serverInfo"),
               "protocolVersion":init.get("result",{}).get("protocolVersion")})
 call("notifications/initialized",{},notify=True)
 tools=call("tools/list",{},limit=15)
 raw_private.append({"method":"tools/list","reply":tools})
 if "error" in tools:raise RuntimeError("MCP_TOOLS_LIST_"+str(tools["error"]))
 names=[x["name"] for x in tools.get("result",{}).get("tools",[])]
 steps.append({"step":"tools/list","toolCount":len(names),"toolNames":names})
 if "open_capture" not in names:raise RuntimeError("OPEN_CAPTURE_TOOL_MISSING")
 schema={x["name"]:x.get("inputSchema",{}) for x in tools["result"]["tools"]}
 plan=[
   ("open_capture",{"path":str(rdc)},25),
   ("get_capture_info",{},22),
   ("list_draws",{"limit":25},20),
   ("list_events",{"limit":25},20),
   ("get_pipeline_state",{"eventId":10},22),
   ("list_resources",{"limit":40},20),
   ("get_stats",{},20),
   ("get_log",{},20),
   ("get_draw_info",{"eventId":10},20),
   ("get_draw_info",{"eventId":13},20),
   ("get_draw_info",{"eventId":16},20),
   ("goto_event",{"eventId":16},20),
   ("get_pipeline_state",{"eventId":16},20),
   ("get_bindings",{"eventId":16},20),
   ("get_shader",{"stage":"vs","eventId":16,"mode":"reflect"},20),
   ("get_shader",{"stage":"ps","eventId":16,"mode":"reflect"},20),
   ("list_passes",{},20),
   ("get_pass_statistics",{},20),
   ("get_pass_deps",{},20),
   ("get_resource_info",{"resourceId":"ResourceId::35"},20),
   ("pick_pixel",{"x":4,"y":4,"eventId":16},20),
 ]
 for method,args,timeout in plan:
  if method not in names:steps.append({"step":method,"skipped":"NOT_ADVERTISED"});continue
  required=schema[method].get("required",[])
  supplied=dict(args)
  if any(k not in supplied for k in required):
   steps.append({"step":method,"skipped":"SCHEMA_REQUIRED","required":required})
   continue
  start=time.monotonic()
  response=call("tools/call",{"name":method,"arguments":supplied},limit=timeout)
  raw_private.append({"method":method,"requestArgs":{k:redact(v) for k,v in supplied.items()},"reply":response})
  content=textval(response)
  bad="error" in response or response.get("result",{}).get("isError") is True
  steps.append({"step":method,"ok":not bad,"durationMs":int(1000*(time.monotonic()-start)),
      "replyExcerpt":redact(content[:3100]),"responseError":redact(response.get("error")) if "error" in response else None})
  if method=="open_capture" and bad:break
 summary={"stage":"X33","generatedUTC":now(),"transport":"REAL_MCP_JSONRPC_STDIO","server":exe.name,
   "prebuiltVersion":"0.3.0","bundledRenderDoc":"1.43","ownerCaptureCreatedByRenderDoc":"1.47",
   "ownRdcSHA256":hashlib.sha256(rdc.read_bytes()).hexdigest(),"ownRdcBytes":rdc.stat().st_size,
   "scope":"ONLY original owner D3D11 Vega8 .rdc; no vendor process capture",
   "steps":steps,"stderr":err[-25:],"MCPDistinctTools":len(names),
   "MCPOpenCaptureSucceeded":any(s.get("step")=="open_capture" and s.get("ok") for s in steps),
   "MCPReplayMetadataSucceeded":any(s.get("step")=="get_capture_info" and s.get("ok") for s in steps),
   "MCPRealDrawsSucceeded":any(s.get("step")=="list_draws" and s.get("ok") for s in steps),
   "MCPPipelineSucceeded":any(s.get("step")=="get_pipeline_state" and s.get("ok") for s in steps)}
 (P/"X33-MCP-PRIVATE-RAW-JSONRPC-RESPONSES.json").write_text(json.dumps(raw_private,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
 (D/"X33-MCP-REAL-OWNER-CAPTURE-REPLAY-SUMMARY.json").write_text(json.dumps(summary,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
 print("X33_MCP_OWNER_REAL_REPLAY",json.dumps({"tools":len(names),"init":steps[0].get("ok"),
   "open":summary["MCPOpenCaptureSucceeded"],"info":summary["MCPReplayMetadataSucceeded"],
   "draws":summary["MCPRealDrawsSucceeded"],"pipeline":summary["MCPPipelineSucceeded"],
   "steps":[{"step":s.get("step"),"ok":s.get("ok"),"err":s.get("responseError")} for s in steps if s.get("step") not in ["tools/list"]]},
   ensure_ascii=False))
 if not summary["MCPOpenCaptureSucceeded"]:sys.exit(2)
if __name__=="__main__":
 try:run()
 except Exception as e:
  (D/"X33-MCP-CLIENT-FAILURE.txt").write_text(type(e).__name__+": "+str(e),encoding="utf8")
  print("X33_MCP_FAILURE",type(e).__name__,str(e));sys.exit(1)
 finally:
  if p is not None:
   try:p.terminate();p.wait(timeout=3)
   except: p.kill()
