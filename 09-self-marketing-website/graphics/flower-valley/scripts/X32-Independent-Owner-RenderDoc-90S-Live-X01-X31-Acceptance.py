#!/usr/bin/env python3
"""DJMRN X32: independent owner RenderDoc D3D11 XML/RDC + 90s live X01..X31 tests."""
import pathlib,hashlib,struct,datetime,json,xml.etree.ElementTree as ET,collections
R=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X32-CURRENT"
P=R/"01-private-captures"/"X32"/"OWN-RENDERDOC"
rdc=P/"X32-OWN-D3D11-Vega8_capture.rdc"
xml=P/"X32-OWN-CAPTURE-NATIVE.xml"
thumb=P/"X32-OWN-THUMBNAIL.png"
ownerexe=P/"X32-OWN-D3D11-Grid.exe"
live=json.loads((D/"X32-90S-LIVE-READONLY-RENDERDOC-NO-VENDOR-INJECTION-X01-X31-TIMELINE.json").read_text(encoding="utf-8"))
angle=json.loads((D/"X32-OWN-CHROME157-ANGLE-D3D11-WEBGL2-FEASIBILITY.json").read_text(encoding="utf-8"))
checks={}
details={}
def ok(k,v): checks[k]=bool(v)
def sha(f): return hashlib.sha256(f.read_bytes()).hexdigest()
for k,f in (("owner_d3d11_binary",ownerexe),("real_rdc",rdc),("real_rdc_xml",xml),("owner_thumb",thumb)):
    ok(k+"_exists",f.is_file() and f.stat().st_size>0)
    details[k]={"bytes":f.stat().st_size,"sha256":sha(f)} if f.is_file() else {"missing":True}
ok("renderdoc_real_capture_nonzero",rdc.stat().st_size>20000)
ok("renderdoc_xml_nonzero",xml.stat().st_size>100000)
ok("renderdoc_thumb_valid_png",thumb.read_bytes().startswith(b"\x89PNG\r\n\x1a\n"))
pngw,pngh=struct.unpack(">II",thumb.read_bytes()[16:24])
ok("thumb_dimensions",pngw>100 and pngh>100)
details["thumbnailDimensions"]=[pngw,pngh]
root=ET.parse(xml).getroot()
ok("renderdoc_driver_D3D11",root.findtext("header/driver")=="D3D11")
chunks=root.findall("./chunks/chunk")
names=[c.attrib.get("name","") for c in chunks]
count=collections.Counter(names)
ok("frame_has_at_least_30_api_chunks",len(chunks)>=30)
ok("D3D11_has_four_create_buffers",count["ID3D11Device::CreateBuffer"]==4)
ok("D3D11_has_render_target",count["ID3D11Device::CreateRenderTargetView"]==1)
ok("D3D11_has_vertex_shader",count["ID3D11Device::CreateVertexShader"]==1)
ok("D3D11_has_pixel_shader",count["ID3D11Device::CreatePixelShader"]==1)
ok("D3D11_has_input_layout",count["ID3D11Device::CreateInputLayout"]==1)
ok("D3D11_has_rt_bind",count["ID3D11DeviceContext::OMSetRenderTargets"]==1)
ok("D3D11_has_rt_clear",count["ID3D11DeviceContext::ClearRenderTargetView"]==1)
ok("D3D11_has_viewport",count["ID3D11DeviceContext::RSSetViewports"]==1)
ok("D3D11_has_primitive_topology_3_changes",count["ID3D11DeviceContext::IASetPrimitiveTopology"]==3)
ok("D3D11_has_drawindexed",count["ID3D11DeviceContext::DrawIndexed"]==1)
ok("D3D11_has_draw_point",count["ID3D11DeviceContext::Draw"]==1)
ok("D3D11_has_drawinstanced",count["ID3D11DeviceContext::DrawInstanced"]==1)
ok("D3D11_has_present",count["IDXGISwapChain::Present"]==1)
ok("D3D11_end_of_capture",count["Internal::End of Capture"]==1)
def chunk(name): return next(c for c in chunks if c.get("name")==name)
def value(c,name): return next((s.text for s in c if s.get("name")==name),None)
ok("owner_grid_index_2790",value(chunk("ID3D11DeviceContext::DrawIndexed"),"IndexCount")=="2790")
ok("owner_five_points",value(chunk("ID3D11DeviceContext::Draw"),"VertexCount")=="5")
ok("owner_instanced_three_vertices",value(chunk("ID3D11DeviceContext::DrawInstanced"),"VertexCountPerInstance")=="3")
ok("owner_instanced_three_copies",value(chunk("ID3D11DeviceContext::DrawInstanced"),"InstanceCount")=="3")
top=[next((s.get("string") for s in c if s.get("name")=="Topology"),"") for c in chunks if c.get("name")=="ID3D11DeviceContext::IASetPrimitiveTopology"]
ok("owner_topology_triangle_point_triangle",top==["D3D_PRIMITIVE_TOPOLOGY_TRIANGLELIST","D3D_PRIMITIVE_TOPOLOGY_POINTLIST","D3D_PRIMITIVE_TOPOLOGY_TRIANGLELIST"])
devstr=root.find(".//struct[@name='AdapterDesc']/string[@name='Description']")
ok("vega8_named_in_real_capture",devstr is not None and "Vega 8" in devstr.text)
hardware=root.find(".//enum[@name='DriverType']")
ok("D3D11_HARDWARE_driver",hardware is not None and "HARDWARE" in hardware.get("string",""))
details["D3D11"]={"adapter":devstr.text if devstr is not None else None,"hardwareDriver":hardware.get("string") if hardware is not None else None,
"nativeGPUChunks":len(chunks),"eventCounts":dict(count),"drawTopologies":top,
"gridIndices":int(value(chunk("ID3D11DeviceContext::DrawIndexed"),"IndexCount")),
"pointVertices":int(value(chunk("ID3D11DeviceContext::Draw"),"VertexCount")),
"vertexPerInstance":int(value(chunk("ID3D11DeviceContext::DrawInstanced"),"VertexCountPerInstance")),
"instances":int(value(chunk("ID3D11DeviceContext::DrawInstanced"),"InstanceCount"))}
ok("browser_owner_webgl2_ready",angle["ownerScene"]["ready"])
ok("browser_owner_expected_vertices",angle["ownerScene"]["groundTruth"]["gridVertices"]==512)
ok("browser_owner_expected_points",angle["ownerScene"]["groundTruth"]["pointCount"]==5)
ok("browser_owner_expected_instances",angle["ownerScene"]["groundTruth"]["instancedCopies"]==3)
ok("browser_ANGLE_D3D11_identified","D3D11" in angle["ownerScene"]["unmaskedRenderer"])
ok("browser_ANGLE_Vega8_identified","Vega 8" in angle["ownerScene"]["unmaskedRenderer"])
ok("browser_probe_chrome_no_sandbox_relaxation",angle["safety"]["noGPU_sandboxRelaxation"])
ok("browser_probe_zero_renderdoc_injection",angle["safety"]["noRenderDocInjectionIntoChrome"])
ok("browser_probe_no_issues",not angle["issues"] and angle["stopReason"]=="SUCCESS")
ok("browser_probe_RAM",angle["minFreeMiB"]>100)
ok("public_live_correct_site",live["site"]=="https://www.gladeye.com/")
ok("public_live_true_90s",live["stopReason"]=="COMPLETED_90_SECONDS" and 89.9<=live["actualObservedSeconds"]<=91)
ok("public_live_seven_phases",len(live["snapshots"])==7)
labels=["initial","hover_left","hover_right","scroll_450","pointer_center","reverse_scroll","return_idle"]
ok("public_live_phase_labels",[a["label"] for a in live["snapshots"]]==labels)
ok("public_live_ordered",all(a["actualSecond"]<b["actualSecond"] for a,b in zip(live["snapshots"],live["snapshots"][1:])))
for i,t in enumerate([3,16,29,42,55,72,87]):
    ok(f"public_phase_{i+1}_timing",t<=live["snapshots"][i]["actualSecond"]<t+3)
ok("public_live_one_canvas",all(a["metadata"]["canvasCount"]==1 for a in live["snapshots"]))
ok("public_live_webgl2",all(a["metadata"]["webgl2"] is True for a in live["snapshots"]))
ok("public_live_three_revision_154",all(a["metadata"]["ThreeRevision"]=="154" for a in live["snapshots"]))
ok("public_live_no_renderdoc_injection",live["renderDocVendorProcessNeverInjected"] and live["vendorRenderDocNeverInjectedEverySnapshot"])
ok("public_live_no_original_geometry_export",live["geometryExportOfOriginalSite"] is False)
ok("public_live_no_original_glb",live["originalSiteGLB"] is False)
ok("public_live_no_original_shader",live["originalVertexShaderSourcesSaved"] is False)
ok("public_live_no_original_texture",live["originalTexturePixelDataSaved"] is False)
ok("public_live_private_screen_only",live["screenshotsPrivateOnPCOnly"] is True)
ok("public_live_no_system_proxy_mutation",live["systemProxyUnchanged"])
ok("public_live_RAM_above_100M",live["ownerRamHardStopMiB"]==100 and live["minFreeRamMiB"]>100)
ok("public_live_zero_errors",not live["issues"])
ok("public_site_known_firstparty_paths_46",live["observedFirstPartyPaths"]==46)
ok("public_site_novel_paths_zero",live["novelFirstPartyPaths"]==[])
ok("public_site_body_hash_38",live["originalBodyExactCount"]==live["totalHashedResponses"]==38)
ok("public_site_original_variants_verified",all(x["knownSourcePath"] and x["exactPreviousOriginalBodyShaSize"] for x in live["networkBodyShaAndSize"]))
ok("public_site_existing_network_edges_37",live["networkInitiatorEdgesObserved"]==37)
ok("public_site_novel_network_edges_zero",live["newInitiatorEdges"]==[])
last=live["snapshots"][-1]["metadata"]["renderer"]
ok("public_site_three_draw_signatures",last["signatureCount"]==3)
ok("public_site_last_draw_count_gt_0",last["totalDraws"]>0)
ok("public_site_points_960000_signature",any(x["mode"]==0 and x["count"]==960000 for x in last["signatures"]))
ok("public_site_triangles_6_signature",any(x["mode"]==4 and x["count"]==6 for x in last["signatures"]))
ok("public_site_triangles_3_signature",any(x["mode"]==4 and x["count"]==3 for x in last["signatures"]))
for s in live["snapshots"]:
    if "privateScreenshot" in s:
        x=s["privateScreenshot"]
        f=R/"01-private-captures"/"X32"/"PUBLIC-90S-READONLY"/x["name"]
        ok("public_screenshot_exists_"+s["label"],f.is_file())
        if f.is_file():
            ok("public_screenshot_hash_"+s["label"],sha(f)==x["sha256"])
            ok("public_screenshot_bytes_"+s["label"],f.stat().st_size==x["bytes"])
for st,fname,total in [
 ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
 ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
 ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96),
 ("X31","X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json",121)]:
    data=json.loads((R/"02-reviewed-derived"/(st+"-CURRENT")/fname).read_text(encoding="utf-8"))
    ok(st+"_historical_pass_count",data.get("passed",data.get("checksPassed"))==total)
    ok(st+"_historical_total",data.get("total",data.get("checksTotal"))==total)
    ok(st+"_historical_zero_failed",not data.get("failed"))
for i in range(1,32):
    prefix=f"X{i:02d}"
    found=any(f.name.startswith(prefix) for f in (R/"02-reviewed-derived").iterdir())
    ok(prefix+"_prior_PC_derived_existence",found)
res={"stage":"X32","generatedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "scope":"native owner D3D11 direct RenderDoc capture + browser ANGLE backend fingerprint + separate live site read-only",
 "status":"PASS" if all(checks.values()) else "FAIL","total":len(checks),"passed":sum(checks.values()),
 "failed":[k for k,v in checks.items() if not v],"checks":checks,"ownerBinaryEvidence":details,
 "publicReadOnlyEvidence":{"observedSeconds":live.get("actualObservedSeconds"),"snapshots":len(live["snapshots"]),
 "firstPartyPaths":live.get("observedFirstPartyPaths"),"exactOriginalBodies":live.get("originalBodyExactCount"),
 "knownEdges":live.get("networkInitiatorEdgesObserved"),"novelEdges":len(live["newInitiatorEdges"]),
 "minimalFreeRAMMiB":live.get("minFreeRamMiB"),"runErrors":len(live["issues"])},
 "limits":{"ChromeRenderDocNativeCapture":"NOT_ATTEMPTED; only owner WebGL2 ANGLE D3D11 backend identified",
 "VulkanCapture":"BLOCKED_VULKAN_LAYER_UNREGISTERED; system registry intentionally unchanged",
 "proprietaryVendorGPUCapture":"NOT_PERMITTED_OR_PERFORMED",
 "nativeReplay":"separate renderdoccmd replay -l 1 reported exit 0, not inferred from XML alone",
 "GUI":"qrenderdoc.exe started with own .rdc, separate process-window observation"}}
out=D/"X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json"
out.write_text(json.dumps(res,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("X32_INDEPENDENT_ACCEPTANCE",json.dumps({"status":res["status"],"total":res["total"],"passed":res["passed"],
"failed":res["failed"],"gpu":details["D3D11"]["adapter"],"draw":details["D3D11"]["gridIndices"],
"points":details["D3D11"]["pointVertices"],"instances":details["D3D11"]["instances"]}))
if res["status"]!="PASS":raise SystemExit(1)
