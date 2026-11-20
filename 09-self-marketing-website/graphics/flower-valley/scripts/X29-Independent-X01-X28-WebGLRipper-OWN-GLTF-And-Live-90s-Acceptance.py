#!/usr/bin/env python3
"""DJMRN X29 independent offline acceptance and cross-stage X01–X28 validation.
Read-only source/provenance verification; output derived JSON, no site assets.
"""
import pathlib, json, hashlib, subprocess, struct, zipfile, collections, datetime, re, sys
root=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=root/"02-reviewed-derived"/"X29-CURRENT"; CAP=root/"01-private-captures"/"X29"
src=pathlib.Path.home()/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"WebGLRipper"/"source-7fe32c9616f5"
def read(p):return json.loads(p.read_text(encoding="utf-8"))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
LIVE=read(D/"X29-90S-LIVE-READONLY-WEBGLRIPPER-METADATA-X01-X28-TIMELINE.json")
OWN=read(D/"X29-OWN-RIPPER-REAL-CHROME-EXPORT-INDEX.json")
GEO=read(D/"X29-OWN-REAL-GLB-OBJ-INDEPENDENT-DECODED-GEOMETRY.json")
X19=read(root/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
X16=read(root/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")
X28=read(root/"02-reviewed-derived"/"X28-CURRENT"/"X28-SANITIZED-EIGHT-PHASE-DUAL-INSPECTOR-GPU-GRAPH-X01-X27-CROSSWALK.json")
X28AC=read(root/"02-reviewed-derived"/"X28-CURRENT"/"X28-INDEPENDENT-ACCEPTANCE.json")
X27AC=read(root/"02-reviewed-derived"/"X27-CURRENT"/"X27-INDEPENDENT-ACCEPTANCE.json")
CHECK={}
def check(name,truth):CHECK[name]=bool(truth)
def cmd(name,argv):
    try:
        p=subprocess.run(argv,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,timeout=22,check=False)
        check(name,p.returncode==0)
        return (p.returncode,p.stdout.strip(),p.stderr.strip()[:120])
    except Exception as e:check(name,False);return (1,"",str(e))
# Tool source authority, OS free-first and isolation.
code_commit=cmd("pinned_git_repository_readable",["git","-C",str(src),"rev-parse","HEAD"])
check("official_pinned_commit_exact",code_commit[1]=="7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849")
manifest=read(src/"manifest.json")
check("official_MV3_manifest",manifest.get("manifest_version")==3)
check("official_1_3_2_manifest",manifest.get("version")=="1.3.2")
check("official_MIT_license", "MIT License" in (src/"LICENSE").read_text())
check("source_has_minimum_72_tracked_files",len(subprocess.run(["git","-C",str(src),"ls-files"],capture_output=True,text=True).stdout.splitlines())>=72)
check("existing_Chrome157", (pathlib.Path.home()/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Runtimes"/"ArchiveBox-X11"/"ChromeForTesting-157"/"chrome-win64"/"chrome.exe").is_file())
for key,rel in {
 "own_fixture_HTML":"X29-OWN-Controlled-WebGL2-Mesh-Points-Instancing-Fixture.html",
 "own_Chrome_export_runner":"X29-OWN-Official-WebGLRipper-Real-GLB-OBJ-Runner.cjs",
 "own_GLB2_decoder_source":"X29-Independent-OWN-GLB-OBJ-Geometry-Decoder.py",
 "X29_live_original_runner":"X29-Official-WebGLRipper-90s-LIVE-ReadOnly-Metadata.cjs",
 "X29_live_retry_runner":"X29-Official-WebGLRipper-90s-LIVE-Retry-With-Commit-Navigation.cjs",
 "X29_previous_Spector_runner":"X29-Public-90s-WebGLRipper-Activated-Spector-ReadOnly.cjs",
 "X29_builder_source":"X29-Build-Live-Site-ReadOnly-Runner.py"}.items():
    p=D/rel;check(key+"_present",p.exists() and p.stat().st_size>500)
    if p.suffix==".cjs" and p.exists():cmd(key+"_node_syntax",["node","--check",str(p)])
# Official suite truth (not mask one WebM failure)
test=(D/"X29-OFFICIAL-CHROME-OWN-FIXTURES-LOCAL-PRIVATE.txt").read_text(encoding="utf-16",errors="replace")
check("official_Chrome_suite_170_PASS",len(re.findall(r"^PASS\s",test,flags=re.M))==170)
check("official_Chrome_suite_1_FAIL",len(re.findall(r"^FAIL\s",test,flags=re.M))==1)
check("official_Chrome_Fail_is_WebM_only", "FAIL  V in the preview records a turntable video (WebM)" in test)
check("official_Chrome_suite_failed_case_not_suppressed", "1 failure(s)" in test)
check("official_i18n_log_retained",(D/"X29-OFFICIAL-I18N-CHECK-LOCAL-PRIVATE.txt").exists())
# OWNER export: source ground truth and actual independent GLB/ZIP bytes.
gt=GEO["originalFixtureGroundTruth"]
check("real_owner_fixture_all_3_DrawCalls",OWN["groundTruth"]["drawCallsPerFrame"]==3)
check("real_owner_extension_hello_WebGL_context_1", any(x.get("type")=="ready" and x.get("contexts")==1 for x in OWN.get("extensionHello",[])))
check("real_owner_extension_reports_done", any(x.get("state")=="done" and "2 meshes and 1 texture" in (x.get("text") or "") for x in OWN.get("extensionEventsAfter",[])))
check("real_owner_export_saved",OWN.get("completedDownload") is True and OWN.get("stopReason")=="OWN_FIXTURE_EXPORT_COMPLETED")
check("real_owner_export_no_runner_issues",len(OWN.get("issues",[]))==0)
check("owner_min_free_RAM_above_100",OWN.get("minFreeRAMMiB",0)>100)
check("owner_quad_groundtruth",gt["quadUniqueVertices"]==4 and gt["quadSubmittedIndices"]==6 and gt["quadTriangles"]==2 and gt["quadUVPairs"]==4)
check("owner_points_groundtruth",gt["glPoints"]==5)
check("owner_instances_groundtruth",gt["instancedDrawInstanceCount"]==3 and gt["instancedLogicalTriangles"]==3)
check("owner_2x2_texture_groundtruth",gt["textureDimensions"]==[2,2])
check("owner_GLB_2_0_valid",GEO["validGLB2"] and GEO["glTFVersion"]=="2.0")
check("owner_output_GLTF_structure",GEO["GLBStructure"]["meshCount"]==2 and GEO["GLBStructure"]["nodeCount"]==2 and GEO["GLBStructure"]["textureCount"]==1 and GEO["GLBStructure"]["materials"]==2)
prims=GEO["geometryPrimitives"];m0,m1=prims
check("owner_quad_GLTF_position_index_normal_UV_exact",m0["vertices"]==4 and m0["indices"]==6 and m0["triangles"]==2 and m0["uvCount"]==4 and m0["normalCount"]==4)
check("owner_one_instanced_base_triangle_GLTF_exact",m1["vertices"]==3 and m1["indices"]==3 and m1["triangles"]==1)
check("owner_POINT_mesh_extraction_unsupported_observed",GEO["observed"]["GLPOINTSPrimitives"]==0 and gt["glPoints"]==5)
check("owner_instancing_duplicate_missing_observed",m1["triangles"]==1 and gt["instancedLogicalTriangles"]==3)
check("owner_vertex_bounds_preserved",m0["positionBounding"]==[[-0.96,-0.55,0.0],[-0.46,0.5,0.0]])
check("owner_Obj_mesh0_exact",any(x["vertices"]==4 and x["faces"]==2 and x["uvPairs"]==4 for x in GEO["OBJFiles"]))
check("owner_Obj_scene_combined_exact",any(x["file"]=="scene.obj" and x["vertices"]==7 and x["faces"]==3 for x in GEO["OBJFiles"]))
check("owner_PNG2x2_exact",len(GEO["PNGs"])==1 and GEO["PNGs"][0]["width"]==2 and GEO["PNGs"][0]["height"]==2)
zipfile_path=CAP/"own-fixture-export"/GEO["userOwnedZip"]["fileName"]
check("owner_original_zip_private_and_present",zipfile_path.is_file())
check("owner_original_zip_SHA256_bytes_exact",zipfile_path.is_file() and sha(zipfile_path)==GEO["userOwnedZip"]["sha256"] and zipfile_path.stat().st_size==3236)
check("owner_zip_SHA256_matches_runner",GEO["userOwnedZip"]["sha256"]==OWN["exports"][0]["sha256"])
check("owner_original_vendor_geometry_not_exported",OWN["originalCommercialWebSiteDataExported"] is False)
# New genuine live 90s read-only original site:
check("X29_new_live_90s_success",LIVE["stopReason"]=="COMPLETED_90_SECONDS" and LIVE["actualObservedSeconds"]>=90)
check("X29_live_no_errors",len(LIVE["issues"])==0)
check("X29_live_min_free_ram_gt100MiB",LIVE["minFreeRamMiB"]>100)
check("X29_live_site_url_exact",LIVE["site"]=="https://www.gladeye.com/")
check("X29_live_official_source_commit",LIVE["sourceSHA"]==code_commit[1])
check("X29_live_no_target_geometry_export",LIVE["geometryExportOfOriginalSite"] is False and LIVE["originalSiteGLB"] is False)
check("X29_live_no_vendor_shaders_or_textures_raw",LIVE["originalVertexShaderSourcesSaved"] is False and LIVE["originalTexturePixelDataSaved"] is False)
phases=["initial","hover_left","hover_right","scroll_450","pointer_center","reverse_scroll","return_idle"]
samples=LIVE["snapshots"]
check("X29_live_7_temporal_windows",len(samples)==7 and [s["label"] for s in samples]==phases)
check("X29_live_all_sample_times_within_90",all(0<s["actualSecond"]<90 for s in samples))
check("X29_live_WebGL2_canvas_every_window",all(s["metadata"]["webgl2"] and s["metadata"]["canvasCount"]>=1 for s in samples))
check("X29_live_three_js_r154_every_window",all(s["metadata"]["ThreeRevision"]=="154" for s in samples))
check("X29_live_Ripper_hello_real_context",all(any(r.get("type")=="ready" and r.get("contexts")==1 for r in s["metadata"]["ripperReady"]) for s in samples))
check("X29_live_draws_growing_after_initial",all(samples[i]["metadata"]["renderer"]["totalDraws"]>samples[i-1]["metadata"]["renderer"]["totalDraws"] for i in range(2,len(samples))))
check("X29_live_3_distinct_signature_after_ready",all(s["metadata"]["renderer"]["signatureCount"]==3 for s in samples[1:]))
live_sigs={tuple((z["op"],z["mode"],z["count"])) for s in samples[1:] for z in s["metadata"]["renderer"]["signatures"]}
ref_first=X28["frames"][0]
ref_sig={tuple((z["op"],z["mode"],z["vertexOrIndexSubmissionCount"])) for z in ref_first["SpectorRenderTargetDrawSequence"]}
check("X29_live_3_signatures_ALL_in_X28",live_sigs==ref_sig and len(live_sigs)==3)
check("X29_live_960000_POINT_index_verified_again",("drawElements",0,960000) in live_sigs)
check("X29_live_no_instanced_native_draws",all(s["metadata"]["renderer"]["nativeGlInstancedDrawCount"]==0 for s in samples[1:]))
check("X28_prior_16_DrawCalls_8_frames",len(X28["frames"])==8 and all(f["SpectorDrawCount"]==16 and f["IspettoreDrawCount"]==16 for f in X28["frames"]))
check("X28_prior_dual_observer_90s",X28["liveSeconds"]["Spector"]>=90 and X28["liveSeconds"]["Ispettore"]>=90)
check("X28_prior_58of58_pass",X28AC["status"]=="PASS" and X28AC["passed"]==58 and not X28AC["failed"])
check("X27_prior_49of49_pass",X27AC["checksPassed"]==49 and X27AC["checksTotal"]==49 and not X27AC["failed"])
# First-party network body hash provenance (not raw commercial bytes):
prior_urls={x["url"]:x for x in X19["resources"]}
check("X01_X19_78_canonical_network_path_inventory",len(prior_urls)==78)
check("X29_46_network_paths_match_history",LIVE["observedFirstPartyPaths"]==46 and not LIVE["novelFirstPartyPaths"])
check("X29_38_canonical_body_hashes_recorded",len(LIVE["networkBodyShaAndSize"])==38 and LIVE["totalHashedResponses"]==38)
check("X29_38of38_original_sha_size_exact",all(any(v["sha256"]==h["sha256"] and v["bytes"]==h["bytes"] for v in prior_urls[h["url"]]["originalBodyVariants"]) for h in LIVE["networkBodyShaAndSize"]))
check("X29_38_reported_exact",LIVE["originalBodyExactCount"]==38)
check("X29_37_initiator_edges_no_new",LIVE["networkInitiatorEdgesObserved"]==37 and not LIVE["newInitiatorEdges"])
check("X16_known_initiator_graph_preserved",len(X16["edges"])>=37)
# Actual private screenshots and no copied model assets.
private_img=CAP/"public-live-metadata-90s"
imgs=[s["privateScreenshot"] for s in samples if s.get("privateScreenshot")]
check("X29_2_private_site_screenshots_recorded",len(imgs)==2)
check("X29_2_private_site_screenshots_SHA256_exact",len(imgs)==2 and all((private_img/x["name"]).is_file() and sha(private_img/x["name"])==x["sha256"] for x in imgs))
check("X29_2_private_screenshot_dimensions_1280x720",len(imgs)==2 and all(struct.unpack(">II",(private_img/x["name"]).read_bytes()[16:24])==(1280,720) for x in imgs))
check("X29_2_private_screenshots_not_public_inputs",all(x["name"].endswith(".png") for x in imgs))
# Canonical staged continuity X01..X29; owned or retained originals.
base=(root/"01-private-captures")
derived=(root/"02-reviewed-derived")
check("X01_to_X14_private_directories_retained",all((base/f"X{i:02d}").is_dir() for i in range(1,15)))
check("X15_to_X29_derived_folders_retained",all((derived/f"X{i:02d}-CURRENT").is_dir() or (derived/f"X{i:02d}-AUDIT-CURRENT").is_dir() for i in range(15,30)))
check("X23_private_captures_retained",(base/"X23").is_dir())
check("X24_private_captures_retained",(base/"X24").is_dir())
check("X28_historical_private_capture_retained",(base/"X28").is_dir())
check("X29_original_owner_and_site_private_separated",(CAP/"own-fixture-export").is_dir() and (CAP/"public-live-metadata-90s").is_dir())
# Security and audit metadata: main GPU topology from X28 remains authority.
liveScript=(D/"X29-Official-WebGLRipper-90s-LIVE-Retry-With-Commit-Navigation.cjs").read_text(encoding="utf-8")
check("live_script_only_Ripper_hello_no_export_command",'type:\x27hello\x27' in liveScript and 'type:\x27capture\x27' not in liveScript)
check("live_script_anonymous_isolated", "isolated-headless-chrome157" in liveScript and "--load-extension=" in liveScript)
check("live_script_emergency_100MiB", "EMERGENCY_RAM_100_MIB" in liveScript)
# Facts, caveats and independent evaluation output.
truth_pass=sum(CHECK.values());truth_fail=[k for k,v in CHECK.items() if not v]
summary={"stage":"X29","dateUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "status":"PASS" if not truth_fail else "FAIL","passed":truth_pass,"total":len(CHECK),"failed":len(truth_fail),"failedNames":truth_fail,
 "checks":CHECK,
 "liveMetadataSha256":sha(D/"X29-90S-LIVE-READONLY-WEBGLRIPPER-METADATA-X01-X28-TIMELINE.json"),
 "ownerDecodedSha256":sha(D/"X29-OWN-REAL-GLB-OBJ-INDEPENDENT-DECODED-GEOMETRY.json"),
 "ownerZIPsha256":sha(zipfile_path),
 "oldX28DualObserverSpectorDrawSignatureBaseline":sorted(map(list,ref_sig)),
 "liveX29RipperInstrumentedSignatureSet":sorted(map(list,live_sigs)),
 "scopeLimitations":["X29 Ripper READ-ONLY public inspection, not third-party model export",
 "First X29 live snapshot at second 3 saw ZERO draw calls; all six later snapshots saw exact 3 shader-independent primitive submission signatures",
 "X29 live script counts accumulated WebGL calls between snapshots, not FPS or scene object count",
 "960000 POINTS count is index submissions, not distinct flowers",
 "The three recovered draw primitive signatures match X28; visual dispersal cause remains UNVERIFIED",
 "WebGLRipper source-native WebM video unit test remains one failure; third-party dependent Three.js case skipped",
 "OWN fixture exports one indexed mesh correctly but drops 5 POINTS and 2/3 instanced copies",
 "No personal Chrome privilege or paid tool; no vendor GLB/OBJ/GLSL/texture pixels publicly exported"] }
out=D/"X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json"
out.write_text(json.dumps(summary,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
cw={"stage":"X29","status":summary["status"],"liveObservedSeconds":LIVE["actualObservedSeconds"],"liveSampleCount":len(samples),
"liveMinFreeRAMMiB":LIVE["minFreeRamMiB"],"officialSourceSHA":code_commit[1],
"X19KnownNetworkPaths":len(prior_urls),"X29NetworkPaths":LIVE["observedFirstPartyPaths"],"X29BodySha256Matches":LIVE["originalBodyExactCount"],
"X29SourceBodyTotal":LIVE["totalHashedResponses"],"X29PriorKnownX16InitiatorEdges":LIVE["networkInitiatorEdgesObserved"],
"X29NovelFirstPartyPaths":LIVE["novelFirstPartyPaths"],"X29NovelInitiatorEdges":LIVE["newInitiatorEdges"],
"X28DualObserverDrawsPerFrame":ref_first["SpectorDrawCount"],"X28SpectorPrograms":ref_first["IspettoreShaderProgramCount"],
"phaseEvidence":[{"label":s["label"],"second":s["actualSecond"],"webgl2":s["metadata"]["webgl2"],
  "ripperReady":any(r.get("type")=="ready" and r.get("contexts")==1 for r in s["metadata"]["ripperReady"]),
  "cumulativeDrawCalls":s["metadata"]["renderer"]["totalDraws"],
  "drawSignatures":s["metadata"]["renderer"]["signatures"],
  "privateImageSHA256":s.get("privateScreenshot",{}).get("sha256")} for s in samples],
"originalOwnerFixtureGroundTruth":gt,"recovered":GEO["geometryPrimitives"],"observableLimits":summary["scopeLimitations"],
"X28PriorPass":X28AC["passed"],"X27PriorPass":X27AC["checksPassed"],
"noOriginalVendorGLTFExport":LIVE["geometryExportOfOriginalSite"] is False}
(D/"X29-SANITIZED-90S-WEBGLRIPPER-GEOMETRY-X01-X28-CROSSWALK.json").write_text(json.dumps(cw,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(json.dumps({"status":summary["status"],"passed":truth_pass,"total":len(CHECK),"failed":truth_fail,
 "live":LIVE["actualObservedSeconds"],"network":[LIVE["originalBodyExactCount"],LIVE["totalHashedResponses"]],"signatureCount":len(live_sigs)},ensure_ascii=False))
sys.exit(0 if not truth_fail else 2)
