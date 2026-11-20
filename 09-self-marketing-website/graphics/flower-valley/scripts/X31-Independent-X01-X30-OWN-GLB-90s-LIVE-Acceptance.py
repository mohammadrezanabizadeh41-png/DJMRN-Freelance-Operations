#!/usr/bin/env python3
"""Independent DJMRN X31 public 90s metadata + stage X01-X30 reconciliation; no proprietary asset extraction."""
import json, pathlib, hashlib, datetime, math
R=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X31-CURRENT"
L=json.loads((D/"X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json").read_text(encoding="utf-8"))
O=json.loads((D/"X31-INDEPENDENT-REAL-OWNER-GLB-AND-X01-X30-ACCEPTANCE.json").read_text(encoding="utf-8"))
checks={}
def check(k,condition):
    checks[k]=bool(condition)
check("X31_owner_52_independent_checks",O["passed"]==52 and not O["failed"])
check("X31_owner_GLb_SHA_hex_64",len(O["glbSHA256"])==64)
check("X31_owner_512_vertices",O["geometry"]["positions"]==512)
check("X31_owner_930_triangles",O["geometry"]["triangles"]==930)
check("X31_owner_points_lost",O["geometry"]["glPointsExported"] is False)
check("X31_owner_instancing_not_expanded",O["geometry"]["instancesExported"]==1 and O["geometry"]["originalOwnerInstances"]==3)
check("X31_official_khronos_error_free",json.loads((D/"X31-OWN-KHRONOS-GLTF-VALIDATOR.json").read_text())["result"]["issues"]["numErrors"]==0)
check("X31_official_khronos_warning_free",json.loads((D/"X31-OWN-KHRONOS-GLTF-VALIDATOR.json").read_text())["result"]["issues"]["numWarnings"]==0)
check("real_new_live_complete",L["stopReason"]=="COMPLETED_90_SECONDS")
check("real_new_live_exact_90s",89.9<=L.get("actualObservedSeconds",0)<=91)
check("real_live_site",L.get("site")=="https://www.gladeye.com/")
check("new_seven_phases",len(L["snapshots"])==7)
names=["initial","hover_left","hover_right","scroll_450","pointer_center","reverse_scroll","return_idle"]
check("expected_seven_phase_names",[x["label"] for x in L["snapshots"]]==names)
check("phases_actual_ordered",all(x["actualSecond"]<y["actualSecond"] for x,y in zip(L["snapshots"],L["snapshots"][1:])))
check("phase_last_before_90",L["snapshots"][-1]["actualSecond"]<90)
for i,expected in enumerate([3,16,29,42,55,72,87]):
    check(f"phase_{i+1}_timing",expected<=L["snapshots"][i]["actualSecond"]<expected+3)
check("meshgrab_vendor_origin_ungranted",L["meshGrabVendorOriginNeverEnabled"] is True)
check("meshgrab_no_page_hooks_every_phase",L["vendorMeshGrabHookAbsentEverySnapshot"] is True and
 all(not x["metadata"]["meshgrabCapturedOnVendor"] for x in L["snapshots"]))
check("no_commercial_geometry_capture",L["geometryExportOfOriginalSite"] is False)
check("no_commercial_glb",L["originalSiteGLB"] is False)
check("no_commercial_shader_body",L["originalVertexShaderSourcesSaved"] is False)
check("no_commercial_texture_pixels",L["originalTexturePixelDataSaved"] is False)
check("private_screenshots_only",L["screenshotsPrivateOnPCOnly"] is True)
check("system_proxy_not_changed",L["systemProxyUnchanged"] is True)
check("isolation_proxy_bypass_only",L["isolatedChromeProxyBypass"] is True)
check("ram_stop_at_100",L["ownerRamHardStopMiB"]==100)
check("ram_above_stop",L["minFreeRamMiB"]>100)
check("runner_zero_errors",len(L["issues"])==0)
check("canvas_one_every_phase",all(x["metadata"]["canvasCount"]==1 for x in L["snapshots"]))
check("actual_WebGL2_every_phase",all(x["metadata"]["webgl2"] for x in L["snapshots"]))
check("Three_154_every_phase",all(x["metadata"]["ThreeRevision"]=="154" for x in L["snapshots"]))
draws=[x["metadata"]["renderer"]["totalDraws"] for x in L["snapshots"]]
check("GPU_draws_monotonic",all(x<=y for x,y in zip(draws,draws[1:])))
check("GPU_draws_late_positive",draws[-1]>0)
check("GPU_3_signatures_final",L["snapshots"][-1]["metadata"]["renderer"]["signatureCount"]==3)
check("GPU_point_index_960000_late",
    any(s["mode"]==0 and s["count"]==960000 for s in L["snapshots"][-1]["metadata"]["renderer"]["signatures"]))
check("GPU_triangle_six_index_late",
    any(s["mode"]==4 and s["count"]==6 for s in L["snapshots"][-1]["metadata"]["renderer"]["signatures"]))
check("GPU_triangle_three_index_late",
    any(s["mode"]==4 and s["count"]==3 for s in L["snapshots"][-1]["metadata"]["renderer"]["signatures"]))
check("known_paths_46",L["observedFirstPartyPaths"]==46)
check("new_paths_zero",L["novelFirstPartyPaths"]==[])
check("network_hashes_38",L["totalHashedResponses"]==38)
check("network_body_exact_38",L["originalBodyExactCount"]==38)
check("network_body_exact_every_item",all(v["exactPreviousOriginalBodyShaSize"] and v["knownSourcePath"] for v in L["networkBodyShaAndSize"]))
check("known_edges_37",L["networkInitiatorEdgesObserved"]==37)
check("novel_edges_zero",L["newInitiatorEdges"]==[])
check("live_2_private_screenshots",sum(bool(x.get("privateScreenshot")) for x in L["snapshots"])==2)
for s in L["snapshots"]:
    pic=s.get("privateScreenshot")
    if pic:
        f=R/"01-private-captures"/"X31"/"PUBLIC-90S-READONLY"/pic["name"]
        check("screenshot_exists_"+s["label"],f.is_file())
        if f.is_file():
            data=f.read_bytes()
            check("screenshot_bytes_"+s["label"],len(data)==pic["bytes"])
            check("screenshot_SHA256_"+s["label"],hashlib.sha256(data).hexdigest()==pic["sha256"])
for stage,file_name,want in [
    ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),
    ("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
    ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
    ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96)]:
    f=R/"02-reviewed-derived"/f"{stage}-CURRENT"/file_name
    p=json.loads(f.read_text(encoding="utf-8"))
    passed=p.get("checksPassed",p.get("passed"))
    total=p.get("checksTotal",p.get("total"))
    check(f"{stage}_acceptance_status",p["status"]=="PASS")
    check(f"{stage}_pass_count",passed==want and total==want)
    failed=p.get("failed")
    check(f"{stage}_no_failed",failed==[] or failed==0)
reconcile={"stage":"X31","generatedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "scope":"real owner-only MeshGrab GLB + real public-site read-only 90s + X01-X30 crosscheck",
 "ownerIndependentChecks":O["distinctChecks"],"liveAndHistoricalChecks":len(checks),
 "total":O["distinctChecks"]+len(checks),
 "passed":O["passed"]+sum(checks.values()),"failed":[k for k,v in checks.items() if not v],
 "status":"PASS" if all(checks.values()) and O["passed"]==O["distinctChecks"] else "FAIL",
 "checks":checks,
 "verifiedDrawsByPhase":[{"phase":s["label"],"second":s["actualSecond"],
     "draws":s["metadata"]["renderer"]["totalDraws"]} for s in L["snapshots"]],
 "sourceEvidence":{
  "ownerBinarySHA256":O["glbSHA256"],"publicMetadataSHA256":hashlib.sha256((D/"X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json").read_bytes()).hexdigest(),
  "ownCaptureSHA256":hashlib.sha256((D/"X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json").read_bytes()).hexdigest()}}
(D/"X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json").write_text(json.dumps(reconcile,indent=2)+"\n",encoding="utf-8")
print("X31_FINAL_GATES",json.dumps({"status":reconcile["status"],"total":reconcile["total"],"passed":reconcile["passed"],
 "failed":reconcile["failed"],"draws":reconcile["verifiedDrawsByPhase"]}))
if reconcile["status"]!="PASS":raise SystemExit(1)
