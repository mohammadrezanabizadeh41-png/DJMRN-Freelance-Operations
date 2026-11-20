#!/usr/bin/env python3
"""DJMRN X33 deterministic independent REAL MCP↔1.47 RDC evidence verifier.
Raw stdout/JSON-RPC responses, owner RDC, proprietary screenshots stay PRIVATE on the owner PC.
Publishes only original test geometry counts, non-expressive hashes/counts and independent checks.
"""
import json,hashlib,datetime,pathlib,os,xml.etree.ElementTree as ET,collections,struct
ROOT=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"/"X33-CURRENT"
B=ROOT/"01-private-captures"/"X33"/"OWN-RENDERDOC-MCP"
PK=pathlib.Path(os.environ["LOCALAPPDATA"])/"DJMRN-Website-Toolkit"/"04-Specialists"/"RenderDoc-MCP-v0.3.0-Prebuilt"
CAP=ROOT/"01-private-captures"/"X32"/"OWN-RENDERDOC"/"X32-OWN-D3D11-Vega8_capture.rdc"
XML=CAP.with_name("X32-OWN-CAPTURE-NATIVE.xml")
j=json.loads((B/"X33-MCP-PRIVATE-RAW-JSONRPC-RESPONSES.json").read_text(encoding="utf8"))
live=json.loads((D/"X33-90S-LIVE-READONLY-RENDERDOC-MCP-NO-VENDOR-INJECTION-X01-X32-TIMELINE.json").read_text(encoding="utf8"))
checks={}
def C(k,b):checks[k]=bool(b)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def response(item):
    resp=item["reply"]
    if "error" in resp or resp.get("result",{}).get("isError"):return None
    v=resp.get("result",{});raw=v.get("content",[{}])[0].get("text",None)
    if raw is None:return v
    try:return json.loads(raw)
    except:return raw
def call(name,eventId=None,stage=None):
    for item in j:
        if item["method"]!=name:continue
        args=item.get("requestArgs") or {}
        if eventId is not None and str(args.get("eventId"))!=str(eventId):continue
        if stage is not None and args.get("stage")!=stage:continue
        return response(item)
    return None
init=next((x["reply"].get("result") for x in j if x["method"]=="initialize"),None)
mcpTools=next((x["reply"].get("result",{}).get("tools",[]) for x in j if x["method"]=="tools/list"),[])
names=[t.get("name") for t in mcpTools]
openR=call("open_capture");info=call("get_capture_info");draw=call("list_draws");ev=call("list_events")
pl10=call("get_pipeline_state",10);pl16=call("get_pipeline_state",16)
res=call("list_resources");stats=call("get_stats");log=call("get_log")
di={i:call("get_draw_info",i) for i in (10,13,16)}
g16=call("goto_event",16);bindings=call("get_bindings",16)
vs=call("get_shader",16,"vs");ps=call("get_shader",16,"ps")
passstats=call("get_pass_statistics");deps=call("get_pass_deps");passes=call("list_passes")
rt=call("get_resource_info");pixel=call("pick_pixel",16)
C("real_stdio_initialize",init is not None and init.get("protocolVersion")=="2025-03-26")
C("mcp_52_advertised_tools",len(names)==52 and len(set(names))==52)
for name in ["open_capture","get_capture_info","list_draws","list_events","get_pipeline_state",
 "list_resources","get_stats","get_log","get_draw_info","goto_event","get_bindings","get_shader",
 "list_passes","get_pass_statistics","get_pass_deps","get_resource_info","pick_pixel"]:
 C("advertised_"+name,name in names)
C("mcp_x32_real_capture_loaded",openR is not None and openR.get("api")=="D3D11" and openR.get("degraded")==False)
C("mcp_147_into_143_real_replay",info is not None and info.get("degraded")==False and info.get("totalDraws")==3)
C("mcp_native_events_five",info and info.get("totalEvents")==5 and isinstance(ev,list) and len(ev)==5)
C("mcp_real_three_draws",draw and draw.get("count")==3 and len(draw.get("draws",[]))==3)
draws=draw.get("draws",[]) if draw else []
C("mcp_draw_indexed_grid",any(x["eventId"]==10 and x["numIndices"]==2790 and "Indexed" in x["flags"] for x in draws))
C("mcp_draw_five_points",any(x["eventId"]==13 and x["numIndices"]==5 for x in draws))
C("mcp_draw_instanced_three",any(x["eventId"]==16 and x["numIndices"]==3 and x["numInstances"]==3 for x in draws))
for i,num,inst in [(10,2790,0),(13,5,0),(16,3,3)]:
 C("mcp_get_draw_info_"+str(i),di[i] is not None and di[i].get("numIndices")==num and di[i].get("numInstances")==inst)
C("mcp_go_event16",g16 is not None)
C("mcp_pipeline_D3D11",pl10 and pl10.get("api")=="D3D11" and pl16 and pl16.get("api")=="D3D11")
C("mcp_pipeline_shader_vs46",pl16 and pl16.get("vertexShader",{}).get("resourceId")=="ResourceId::46")
C("mcp_pipeline_shader_ps47",pl16 and pl16.get("pixelShader",{}).get("resourceId")=="ResourceId::47")
C("mcp_render_target_768x480",pl16 and pl16.get("renderTargets",[{}])[0].get("width")==768 and pl16["renderTargets"][0].get("height")==480)
C("mcp_render_target_format",pl16 and pl16.get("renderTargets",[{}])[0].get("format")=="R8G8B8A8_UNORM")
C("mcp_resources_eleven",res and res.get("count")==11)
buffers=sorted([x["byteSize"] for x in res["resources"] if x.get("type")=="Buffer"]) if res else []
C("mcp_four_owner_buffers",buffers==sorted([14336,5580,140,84]))
C("mcp_input_shader_instance_id",vs and any(x.get("semanticName")=="SV_InstanceID" for x in vs.get("inputSignature",[])))
C("mcp_vs_main",vs and vs.get("entryPoint")=="main")
C("mcp_ps_main",ps and ps.get("entryPoint")=="main")
C("mcp_pixel_output_color",ps and any(x.get("semanticName")=="SV_Target" for x in ps.get("outputSignature",[])))
C("mcp_bindings_vs_ps",bindings and bindings.get("stages",{}).get("vs",{}).get("shader")=="ResourceId::46" and bindings["stages"].get("ps",{}).get("shader")=="ResourceId::47")
C("mcp_one_synthetic_pass",passstats and passstats.get("count")==1 and passstats.get("passes",[{}])[0].get("drawCount")==3)
C("mcp_pass_dimensions",passstats and passstats["passes"][0].get("rtWidth")==768 and passstats["passes"][0].get("rtHeight")==480)
C("mcp_pass_dependency_zero",deps and deps.get("edgeCount")==0)
C("mcp_pass_list_explicit_empty",passes and passes.get("count")==0)
C("mcp_resource_rt_1474560",rt and rt.get("byteSize")==768*480*4)
C("mcp_stats_topdraws_three",stats and len(stats.get("topDraws",[]))==3)
C("mcp_no_gpu_debug_errors_reported",log and log.get("count")==0)
colors=pixel.get("color",{}).get("floatValue",[]) if pixel else []
C("mcp_read_real_own_pixel",len(colors)==4 and abs(colors[0]-.04)<.015 and abs(colors[1]-.07)<.015 and abs(colors[2]-.14)<.015 and abs(colors[3]-1)<.005)
C("owner_x32_rdc_real_binary",CAP.is_file() and CAP.stat().st_size==44495)
C("owner_x32_rdc_sha_matches_mcp_evidence",CAP.is_file() and sha(CAP)=="b5fe755c5085eae72ee54347656afac070521cf78ffdabadcfa1605ddd8ddae4")
xroot=ET.parse(XML).getroot();chunks=xroot.findall("./chunks/chunk")
byname={x.get("name"):x for x in chunks}
C("owner_native_xml_34_chunks",len(chunks)==34)
C("owner_native_driver_D3D11",xroot.findtext("header/driver")=="D3D11")
def v(c,k):return next((x.text for x in c if x.get("name")==k),None)
C("native_grid_crossmatch",int(v(byname["ID3D11DeviceContext::DrawIndexed"],"IndexCount"))==di[10]["numIndices"])
C("native_point_crossmatch",int(v(byname["ID3D11DeviceContext::Draw"],"VertexCount"))==di[13]["numIndices"])
C("native_instance_crossmatch",int(v(byname["ID3D11DeviceContext::DrawInstanced"],"InstanceCount"))==di[16]["numInstances"])
C("native_vs_core_source_not_vendor",CAP.is_relative_to(ROOT/"01-private-captures") and (ROOT/"02-reviewed-derived"/"X32-CURRENT"/"X32-OWN-RenderDoc-Native-D3D11-Grid-Points-Instancing.cpp").is_file())
zip=PK/"renderdoc-mcp-windows-x64-v0.3.0.zip"
officialSHA="08cc5ffe4a9eeb34308096e72830461b36d81102fd9f1477cebcb6179e8f6e02"
C("upstream_v030_release_zip_sha256_matches",zip.is_file() and sha(zip)==officialSHA)
C("bundled_mcp_exe_exists",(PK/"app"/"renderdoc-mcp-windows-x64-v0.3.0"/"bin"/"renderdoc-mcp.exe").is_file())
C("bundled_mcp_license_exists",(PK/"app"/"renderdoc-mcp-windows-x64-v0.3.0"/"LICENSE").is_file())
C("public_gladeye_correct",live.get("site")=="https://www.gladeye.com/")
C("public_live_90_seconds",live.get("stopReason")=="COMPLETED_90_SECONDS" and 89.99<=live.get("actualObservedSeconds",0)<=90.2)
sn=live.get("snapshots",[])
C("public_live_seven_samples",len(sn)==7)
C("public_seven_phases_exact",[s.get("label") for s in sn]==["initial","hover_left","hover_right","scroll_450","pointer_center","reverse_scroll","return_idle"])
C("public_firstparty_paths_known_46",live.get("observedFirstPartyPaths")==46 and live.get("novelFirstPartyPaths")==[])
C("public_network_SHA35_exact",live.get("originalBodyExactCount")==live.get("totalHashedResponses")==35)
C("public_35_previous_original_size_hash",all(x.get("exactPreviousOriginalBodyShaSize") for x in live["networkBodyShaAndSize"]))
C("public_37_known_network_edges",live.get("networkInitiatorEdgesObserved")==37 and live.get("newInitiatorEdges")==[])
C("public_webgl2_three_154",all(s["metadata"].get("webgl2") and s["metadata"].get("ThreeRevision")=="154" for s in sn))
C("public_no_native_vendor_capture",live.get("noNativeGPUCaptureOfVendor") and live.get("vendorRenderDocNeverInjectedEverySnapshot"))
C("public_no_proprietary_geometry",live.get("geometryExportOfOriginalSite")==False and live.get("originalSiteGLB")==False)
C("public_no_proprietary_glsl",live.get("originalVertexShaderSourcesSaved")==False)
C("public_no_proprietary_texture",live.get("originalTexturePixelDataSaved")==False)
C("public_min_ram_above_100",live.get("minFreeRamMiB",0)>100 and live.get("ownerRamHardStopMiB")==100)
C("public_zero_runner_issues",not live.get("issues"))
C("public_system_proxy_unchanged",live.get("systemProxyUnchanged")==True)
C("public_three_distinct_draw_signatures",sn[-1]["metadata"]["renderer"]["signatureCount"]==3)
C("public_last_draws_numerical_positive",sn[-1]["metadata"]["renderer"]["totalDraws"]>0)
for s in sn:
 if "privateScreenshot" not in s:continue
 t=s["privateScreenshot"];f=ROOT/"01-private-captures"/"X33"/"PUBLIC-90S-READONLY"/t["name"]
 C("private_screenshot_"+s["label"]+"_exists",f.is_file())
 C("private_screenshot_"+s["label"]+"_sha",f.is_file() and sha(f)==t["sha256"])
 C("private_screenshot_"+s["label"]+"_bytes",f.is_file() and f.stat().st_size==t["bytes"])
for n,filename,total in [
 ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),
 ("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
 ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
 ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96),
 ("X31","X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json",121),
 ("X32","X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json",128)]:
 a=json.loads((ROOT/"02-reviewed-derived"/(n+"-CURRENT")/filename).read_text(encoding="utf8"))
 C(n+"_verified_history",a.get("total",a.get("checksTotal"))==total and a.get("passed",a.get("checksPassed"))==total and not a.get("failed"))
for i in range(1,33):
 n=f"X{i:02d}"
 C(n+"_historical_PC_derived_present",any(x.name.startswith(n) for x in (ROOT/"02-reviewed-derived").iterdir()))
phases=[{"phase":x["label"],"second":x["actualSecond"],
         "cumulativeObservedDrawCalls":x["metadata"]["renderer"]["totalDraws"]}
        for x in sn]
safe={"stage":"X33","stableTimestampUTC":live["startUTC"],
 "source":{"repo":"https://github.com/JiaboLi-GitHub/renderdoc-mcp","version":"v0.3.0",
 "officialSourceCommit":"50fd55cade854ed24ce8c853fd2dbda04a4b0bdb",
 "officialReleaseManifestURL":"https://github.com/JiaboLi-GitHub/renderdoc-mcp/releases/download/v0.3.0/renderdoc-mcp-windows-x64-v0.3.0.sha256",
 "officialZipSHA256":officialSHA,"actualZipSHA256":sha(zip),"license":"MIT",
 "bundleRenderDoc":"1.43","ownerCaptureRenderDoc":"1.47","sameVersionDLLSwaps":False,"persistentCodexConfigurationChanged":False},
 "mcp":{"transport":"ACTUAL_STDIO_JSONRPC","protocol":"2025-03-26","serverReportedVersion":init.get("serverInfo",{}).get("version"),
 "advertisedToolCount":len(names),"actualInvokedToolsUnique":len(set(x.get("method") for x in j if x.get("method") not in ("initialize","tools/list"))),
 "testedMCPcalls":len(j)-2,"capturedFileSize":CAP.stat().st_size,"capturedFileSHA256":sha(CAP),
 "openedReal147RDCWith143Runtime":True,"api":"D3D11","events":info.get("totalEvents"),"draws":draw.get("count"),
 "drawDetails":[{"eventId":x["eventId"],"indicesOrVertices":x["numIndices"],"instances":x["numInstances"],"flags":x["flags"]} for x in draws],
 "resourceCount":res.get("count"),"bufferSizes":buffers,"renderTarget":{"width":768,"height":480,"format":"R8G8B8A8_UNORM","byteSize":rt.get("byteSize")},
 "shader":{"vsID":"46","psID":"47","vsInputSemantics":[x.get("semanticName") for x in vs.get("inputSignature",[])],
 "psOutputSemantics":[x.get("semanticName") for x in ps.get("outputSignature",[])]},
 "passStats":{"passCount":passstats["count"],"threeDraws":passstats["passes"][0]["drawCount"],
 "reportedTotalTriangles":passstats["passes"][0]["totalTriangles"],"expectedActualOwnerTriangles":930+3,
 "mismatchNote":"Report's 934 is a heuristic tally; owner true triangle draws 930 grid+3 triangle instances=933; 5 points are NOT triangles"},
 "actualPixelRGBA":colors,"gpuDebugMessageCount":log.get("count"),"errors":[]},
 "live":{"site":"https://www.gladeye.com/","actualSeconds":live["actualObservedSeconds"],
 "sevenPhaseTimingAndDrawing":phases,
 "knownFirstPartyPaths":live["observedFirstPartyPaths"],"sameHistoricalBodyShaAndSize":live["originalBodyExactCount"],
 "newFirstPartyPaths":len(live["novelFirstPartyPaths"]),"knownInitiatorEdges":live["networkInitiatorEdgesObserved"],
 "newInitiatorEdges":len(live["newInitiatorEdges"]),"minFreeRAMMiB":live["minFreeRamMiB"],
 "toolInVendorSite":"NO RenderDoc MCP/native injection; read-only draw command count observer",
 "captureOfProprietarySite":False,"privateScreenshotContentPublished":False},
 "boundaries":{"ownedRdcOnly":True,"persistentChatGPTOrCodexMCPPluginRegistered":False,
 "GPUreplaySuccessfulForThisSpecific1_47File":True,
 "universalRDCBackwardCompatibility":"UNVERIFIED","vendorSceneAssetExtraction":"NOT_PERFORMED",
 "shaderConstantBufferSampling":"not present in owner fixture",
 "sourceVendorCodeRecovered":False}}
out=D/"X33-SANITIZED-AUTHENTIC-MCP-REPLAY-90S-X01-X32-CROSSWALK.json"
out.write_text(json.dumps(safe,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
report={"stage":"X33","stableTimestampUTC":live["startUTC"],"status":"PASS" if all(checks.values()) else "FAIL",
 "total":len(checks),"passed":sum(checks.values()),"failed":[k for k,x in checks.items() if not x],
 "checks":checks,"referenceSanitizedCrosswalk":out.name}
(D/"X33-INDEPENDENT-X01-X32-MCP-REPLAY-AND-LIVE-ACCEPTANCE.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("X33_INDEPENDENT_FINAL",json.dumps({"status":report["status"],"passed":report["passed"],"total":report["total"],
 "failed":report["failed"],"MCPtools":len(names),"calls":len(j)-2,
 "public90Seconds":live["actualObservedSeconds"],"exactBodies":live["originalBodyExactCount"]},ensure_ascii=False))
if report["status"]!="PASS":raise SystemExit(1)
