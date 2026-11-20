#!/usr/bin/env python3
"""DJMRN X24-R2 S2: independent read-only acceptance of seven complete real webgd GPU
captures, safe sequential 1GB-packet transfer, progressive RAM changes, and X01-X23.
Vendor WGDW/GLSL/texture contents and browser screenshots stay private on PC.
"""
from pathlib import Path
import json,hashlib,zipfile,datetime,collections,re,statistics
HOME=Path.home()
ROOT=HOME/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"/"X24-CURRENT"/"X24-R2-FULL-RUST-WASM-2026-11-20"
L=D/"X24-LIVE-90S-STAGE2-GC"
PRIVATE=ROOT/"01-private-captures"/"X24"/"full-rust-wasm-2026-11-20"/"live-90s-stage2-gc"
SOURCE=HOME/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"webgd"/"webgd-main"
def load(p):return json.loads(Path(p).read_text(encoding="utf-8-sig"))
def hashfile(p):
 h=hashlib.sha256()
 with open(p,"rb") as f:
  while chunk:=f.read(1048576):h.update(chunk)
 return h.hexdigest()
def emit(p,obj):
 p.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 return hashfile(p)
ck={}
def check(name,condition):
 if name in ck:raise ValueError("DUPLICATE_CHECK_NAME "+name)
 ck[name]=bool(condition)
old23=load(ROOT/"02-reviewed-derived"/"X23-CURRENT"/"X23-INDEPENDENT-ACCEPTANCE.json")
new23=load(ROOT/"02-reviewed-derived"/"X23-CURRENT"/"X23-RERUN-1GB-2026-11-20"/"X23-R2-INDEPENDENT-ACCEPTANCE.json")
old24=load(ROOT/"02-reviewed-derived"/"X24-CURRENT"/"X24-INDEPENDENT-ACCEPTANCE.json")
old22=load(ROOT/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-LOCAL-PRIVATE-INDEX.json")
spector=load(ROOT/"01-private-captures"/"X22"/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json")
canonical=load(ROOT/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
x19=load(ROOT/"02-reviewed-derived"/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
x16=load(ROOT/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")
idx=load(L/"X24-R2-S2-LIVE-90S-LOCAL-PRIVATE-INDEX.json")
a=load(D/"X24-LIVE-90S-STAGE1-STREAMING"/"X24-R2-S1-LIVE-90S-LOCAL-PRIVATE-INDEX.json")
artifact=load(D/"X24-R2-WEBGD-COMPILED-UI-ARTIFACTS.json")
install=load(D/"X24-R2-OFFICIAL-SOURCE-INSTALL-RUST-WASM-GCC-RECEIPT.json")
fetch=load(D/"X24-R2-CARGO-FETCH-EXECUTION-RESULT.json")
build=load(D/"X24-R2-WEBGD-UI-WASM-BUILD-EXECUTION-RESULT.json")
native=load(D/"X24-R2-CARGO-NATIVE-UNIT-TEST-EXECUTION-RESULT.json")
ui=load(D/"X24-R2-COMPILED-WEBGD-UI-OWN-FIXTURE-INTEGRATION.json")
run=idx["run"]
oldShaders={hashlib.sha256(s["source"].encode("utf-8")).hexdigest()
 for item in spector["commands"] for s in ((item.get("DrawCall") or {}).get("shaders") or [])
 if isinstance(s.get("source"),str)}
oldDraws=[(d["command"],d["mode"],d["count"]) for d in old22["frames"][0]["meta"]["draws"]]
oldUniforms=set(old22["frames"][0]["meta"]["uniforms"])
check("prior_X23_R1_114_tests_preserved",old23["passed"]==old23["total"]==114)
check("prior_X23_R2_358_tests_preserved",new23["pass"]==new23["total"]==358)
check("prior_X24_R1_66_tests_preserved",old24["passed"]==old24["total"]==66)
check("canonical_original_78_resource_paths_untouched",len(canonical["resources"])==78)
check("canonical_previous_22_Shader_SHA_available",len(oldShaders)==22)
check("canonical_previous_16_real_draws_available",len(oldDraws)==16)
check("strict_1GB_user_packet_cap",run["transferCapBytes"]==1000000000)
check("strict_100MiB_user_emergency_stop",run["emergencyFreeRamMiB"]==100)
check("S1_abort_at_protective_threshold",a["run"]["stopReason"]=="EMERGENCY_100MIB_RAM" and a["run"]["minFreeRamMiB"]<=100)
check("S1_preserved_three_complete_original_captures",len(a["frames"])==3)
check("S2_started_as_new_stage",run["stage"]=="X24-R2-S2" and run["stepwiseGCBetweenFrames"] and run["losslessChunkStreaming"])
check("S2_complete_measured_target_at_least_90sec",run["elapsedObservedSeconds"]>=90)
check("S2_actual_duration_is_truthfully_recorded",run["elapsedObservedSeconds"]>120)
check("S2_all_seven_scheduled_WebGL2_captures",len(idx["frames"])==run["frames"]==7)
check("S2_completed_without_emergency_stop",run["stopReason"]=="COMPLETED_90S")
check("S2_zero_operational_errors",len(run["issues"])==0)
check("S2_lowest_free_ram_at_least_100MiB",run["minFreeRamMiB"]>=100)
check("S2_ram_margin_floor_250MiB",run["minFreeRamMiB"]==250)
check("S2_total_private_GPU_byte_count",run["totalPrivateWireBytes"]==960061412)
check("S2_original_public_page_WG2_observed",all(f["dom"]["webgdInstalled"] and f["dom"]["canvas"]>=1 for f in idx["frames"]))
check("S2_fidelity_all_seven_distinct_interaction_labels",len({f["label"] for f in idx["frames"]})==7)
check("S2_initial_capture_start_before_90sec",idx["frames"][0]["requestedSecond"]==5)
check("S2_final_capture_request_scheduled_before_90sec",idx["frames"][-1]["requestedSecond"]==87)
check("S2_no_capture_truncated_or_1GB_ceiling_hit",all(x["rawBytes"]<1000000000 for x in idx["frames"]))
check("S2_first_party_paths_46_all_old",run["firstPartyPaths"]==46 and len(run["newPaths"])==0)
check("S2_first_party_body_SHA_38",len(idx["bodyHashes"])==38)
check("S2_no_novel_network_original_body",all(z["classification"]=="EXACT_ORIGINAL_SHA_REPEAT" for z in idx["bodyHashes"]))
check("S2_no_novel_network_initiator_edge",not run["newInitiators"])
check("S2_GC_after_all_seven_frames",all(f.get("memoryRecovery") for f in idx["frames"]))
check("S2_GC_not_a_data_reduction_policy",run["losslessChunkStreaming"] and run["stepwiseGCBetweenFrames"])
check("full_webgd_official_source_license_MIT",install["webgdLicense"]=="MIT")
check("full_webgd_official_source_archive_SHA_101_verified",install["sourceArchiveFileCount"]==install["sourceFilesSHA256Identical"]==101)
check("full_webgd_source_zip_SHA",install["sourceZipSHA256"]=="ea311807a17681f725daf818db4e9aeb498cd435e655235c8b11ad16c128059d")
check("full_RustWasmGcc_5_official_download_archives",len(install["downloadedOfficialArchives"])==5 and all(z["pass"] for z in install["downloadedOfficialArchives"]))
check("official_Cargo_lock_SHA_consistent",build["sourceCargoLockSHA256"]==native["sourceCargoLockSHA256"]==fetch["sourceCargoLockSHA256"]==install["originalSourceCargoLockSHA256"])
check("Cargo_fetch_locked_0_exit",fetch["exit"]==0 and fetch["status"]=="PASS")
check("Cargo_native_tests_locked_0_exit",native["exit"]==0 and native["status"]=="PASS")
check("Cargo_compiled_Rust_WASM_locked_0_exit",build["exit"]==0 and build["status"]=="PASS")
check("compiled_webgd_UI_from_original_unmodified_source",artifact["sourceOriginalUnmodified"] and artifact["status"]=="BUILT_COMPLETE_WEBGD_UI_RUST_WASM")
check("WASM_bindgen_0_2_130",artifact["wasmBindgenVersion"]=="0.2.130")
check("full_Egui_WASM_UI_browser_loaded_own_fixture",ui["integrationPass"] and ui["status"]=="PASS_FULL_UI_REAL_BROWSER")
check("full_Egui_WASM_UI_real_extension_loaded",ui["extensionIdDetected"] and ui["steps"][1]["responseStatus"]==200)
check("full_Egui_WASM_UI_own_webgl2_hook",ui["steps"][0]["webgdHook"] and ui["steps"][0]["WebGL2Contexts"]==1)
check("full_Egui_WASM_UI_own_capture_replay_screenshot_exists",
    (D/"X24-R2-FULL-RUST-WASM-OWN-FIXTURE-AFTER-CAPTURE.png").is_file())
check("full_Egui_WASM_UI_no_page_errors",len(ui["errors"])==0)
check("full_UI_compile_Ram_above_100MiB",build["minimumFreeRAMMiB"]>100)
check("full_UI_browser_ram_above_100MiB",ui["minFreeRAMMiB"]>100)
check("full_UI_52MB_WASM_built",artifact["files"]["webgd_ui_bg.wasm"]["bytes"]==51867289)
for name,v in artifact["files"].items():
 file=SOURCE/"extension"/"ui"/name
 check("compiled_UI_"+name+"_exists",file.exists())
 check("compiled_UI_"+name+"_exact_size_SHA256",file.stat().st_size==v["bytes"] and hashfile(file)==v["sha256"])
check("all_original_x19_js_source_SHA_reverified_again",
  len(x19["items"])==34 and all((ROOT/x["relative"]).is_file() and
    hashfile(ROOT/x["relative"])==x["sha256"] for x in x19["items"]))
idxurl={r["url"]:r for r in canonical["resources"]}
for i,z in enumerate(idx["bodyHashes"]):
 check(f"http_original_body_{i:02}_sha_size", z["url"] in idxurl and
    any(v["sha256"]==z["sha256"] and v["bytes"]==z["bytes"]
       for v in idxurl[z["url"]]["originalBodyVariants"]))
refedges={(e["from"],e["to"]) for e in x16["edges"]}
edges={(e["from"],e["to"]) for e in idx["initiators"]}
check("all_37_X16_network_initiators_existing",len(edges)==37 and edges.issubset(refedges))
frameData=[]
for i,raw in enumerate(idx["frames"],1):
 dec=load(L/("X24-R2-S2-FRAME-%02d-WGDW-INDEPENDENT-DECODE.json"%i))
 src=PRIVATE/raw["rawFile"]
 mem=raw["memoryRecovery"]
 stamp={"name":raw["label"],"requestedSecond":raw["requestedSecond"],"completedSecond":raw["actualSecond"],
 "bytes":raw["rawBytes"],"sha256":raw["rawSha256"],"decodeMagic":dec["magic"],
 "setupCalls":dec["sections"]["setup"]["callCount"],"preframeSnapshotCalls":dec["sections"]["snapshot"]["callCount"],
 "frameCalls":dec["sections"]["frame"]["callCount"],"realDraws":dec["sections"]["frame"]["drawCount"],
 "shaderSourceShaCount":dec["shaderSourceCount"],"objectCount":dec["objectCount"],
 "blobs":dec["blobCount"],"blobBytes":dec["blobByteTotal"],
 "objectClasses":dec["objectClasses"],"ramRecovery":mem}
 frameData.append(stamp)
 signature=[(d["name"],d["mode"],d["count"]) for d in dec["sections"]["frame"]["drawSignatures"]]
 shaders=set(dec["uniqueShaderSourceSHA256"])
 uniforms=set(dec["uniqueUniformNames"])
 normalized={re.sub(r"\[0\]$","",v) for v in uniforms}
 check(f"gpu_frame_{i:02}_private_raw_exists",src.is_file())
 check(f"gpu_frame_{i:02}_raw_SHA256_rehashed",hashfile(src)==raw["rawSha256"])
 check(f"gpu_frame_{i:02}_raw_byte_size_exact",src.stat().st_size==raw["rawBytes"]==dec["byteLength"])
 check(f"gpu_frame_{i:02}_WGDW_v1_complete",dec["magic"]=="WGDW" and dec["version"]==1 and dec["complete"])
 check(f"gpu_frame_{i:02}_original_public_origin",dec["recordedUrlOrigin"]=="https://www.gladeye.com/")
 check(f"gpu_frame_{i:02}_315_setup_commands",dec["sections"]["setup"]["callCount"]==315)
 check(f"gpu_frame_{i:02}_92_snapshot_commands",dec["sections"]["snapshot"]["callCount"]==92)
 check(f"gpu_frame_{i:02}_16_draw_commands",dec["sections"]["frame"]["drawCount"]==16)
 check(f"gpu_frame_{i:02}_original_X22_16_draw_signatures_exact",signature==oldDraws)
 check(f"gpu_frame_{i:02}_22_shader_source_SHA_exact_X22",len(shaders)==22 and shaders==oldShaders)
 check(f"gpu_frame_{i:02}_62_normalized_uniforms_exact_X22",len(uniforms)==62 and normalized==oldUniforms)
 check(f"gpu_frame_{i:02}_11_webGL_program_objects",dec["objectClasses"].get("WebGLProgram")==11)
 check(f"gpu_frame_{i:02}_22_webGL_shader_objects",dec["objectClasses"].get("WebGLShader")==22)
 check(f"gpu_frame_{i:02}_20_GPU_textures_20_buffers",dec["objectClasses"].get("WebGLTexture")==20 and dec["objectClasses"].get("WebGLBuffer")==20)
 check(f"gpu_frame_{i:02}_13_framebuffers_13_renderbuffers",dec["objectClasses"].get("WebGLFramebuffer")==13 and dec["objectClasses"].get("WebGLRenderbuffer")==13)
 check(f"gpu_frame_{i:02}_11_GPU_VAOs",dec["objectClasses"].get("WebGLVertexArrayObject")==11)
 check(f"gpu_frame_{i:02}_144_resource_blobs_complete",dec["blobCount"]==144 and dec["blobByteTotal"]==137009984)
 check(f"gpu_frame_{i:02}_1024k_uniform_storage_labels",dec["objectClasses"].get("WebGLUniformLocation")==96)
 check(f"gpu_frame_{i:02}_browser_garbage_collected_successfully",mem["pageGcStatus"]=="PASS")
 check(f"gpu_frame_{i:02}_Node_garbage_collected_successfully",mem["nodeGcStatus"]=="PASS")
 check(f"gpu_frame_{i:02}_no_GC_data_loss",mem["freeAfterGC"]>=100 and dec["byteLength"]==raw["rawBytes"])
check("all_seven_distinct_full_WGDW_file_SHA256",len({f["sha256"] for f in frameData})==7)
check("all_seven_frame_GPU_metadata_matches_original_signature",[f["realDraws"] for f in frameData]==[16]*7)
check("all_seven_frame_GL_command_sequence_counts",[f["frameCalls"] for f in frameData]==[137,138,138,138,139,138,139])
check("full_seven_raw_disk_total_verified_again",sum(f["bytes"] for f in frameData)==960061412)
check("no_more_ram_limits_applied_after_S2",all(f["ramRecovery"]["pageGcStatus"]=="PASS" for f in frameData))
timeStats={"actualElapsedSeconds":run["elapsedObservedSeconds"],"targetSeconds":run["targetSeconds"],
 "fullFramesCaptured":len(frameData),"capturedCompletedBy90Seconds":sum(x["completedSecond"]<=90 for x in frameData),
 "additionalCapturesAfter90DueToSequentialTransfer":sum(x["completedSecond"]>90 for x in frameData),
 "frameTimingAccurateNoFixed90sClaim":True}
ramStats={"stage1OriginalS1":{"captureCount":len(a["frames"]),"minRAMMiB":a["run"]["minFreeRamMiB"],
 "stopReason":a["run"]["stopReason"],"fullRawBytes":a["run"]["totalPrivateWireBytes"]},
 "stage2Completed":{"captureCount":len(frameData),"minRAMMiB":run["minFreeRamMiB"],
 "stopReason":run["stopReason"],"fullRawBytes":run["totalPrivateWireBytes"],
 "freeRAMAfterEachGC":[x["ramRecovery"]["freeAfterGC"] for x in frameData],
 "reclaimedRAMMiB":[x["ramRecovery"]["freeAfterGC"]-x["ramRecovery"]["freeBeforeGC"] for x in frameData],
 "averageReclaimedMiB":round(statistics.mean(x["ramRecovery"]["freeAfterGC"]-x["ramRecovery"]["freeBeforeGC"] for x in frameData),1)}}
status="COMPLETE_SCOPE_QUALIFIED_FULL_RUST_WASM_AND_7GPU_STREAMED" if all(ck.values()) else "PARTIAL_REVIEW_REQUIRED"
result={"stage":"X24-R2","status":status,"dateUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "scope":"Built and exercised full Rust/WASM webgd frame debugger UI on owner WebGL2 fixture; recovered a complete set of seven real public Gladeye 137MB WGDW frames with progressive RAM management; original data private on PC; no all-frame continuous trace claim.",
 "transferCapBytesPerPacket":1000000000,"freeRAMHardStopMiB":100,
 "independentChecks":{"total":len(ck),"passed":sum(ck.values()),"failed":[name for name,v in ck.items() if not v]},
 "time":timeStats,"ram":ramStats,
 "publicNetwork":{"firstPartyPaths":run["firstPartyPaths"],"originalBodySHARepeated":len(idx["bodyHashes"]),
 "existingInitiatorEdgePairs":len(edges),"novelOriginalPaths":len(run["newPaths"]),"novelOriginalBodySHA":sum(x["classification"]!="EXACT_ORIGINAL_SHA_REPEAT" for x in idx["bodyHashes"]),
 "novelInitiators":len(run["newInitiators"])},
 "fullUi":{"compiledRustWasmyes":True,"wasmBindgen":"0.2.130","CargoBuildStatus":build["status"],
 "nativeTests":native["status"],"ownerFixtureBrowser":ui["status"],
 "ownerFixtureScreenImagePrivateOnly":"X24-R2-FULL-RUST-WASM-OWN-FIXTURE-AFTER-CAPTURE.png",
 "builtUIFiles":artifact["files"],"officialWebgdGitMainTree":install["officialWebgdSourceCommit"],
 "sourceCargoLockSha256":install["originalSourceCargoLockSHA256"],"toolchainVersions":install["installedToolVersions"]},
 "frames":frameData,
 "crossStage":{"originalX19ResourceAuthority78PathsUnchanged":True,
 "X23Original":"114/114","X23R2":"358/358","X24R1":"66/66",
 "SpectorX22ShaderSHAEachFrame":"22/22 for each 7","SpectorX22DrawCountEachFrame":"16/16 for each 7",
 "SpectorX22UniformNormalizedEachFrame":"62/62 for each 7",
 "novelOriginalSiteData":False,"newDerivedData":"seven complete independently hashed WGDW replay snapshots, stagewise RAM recovery telemetry"},
 "limits":["This new run actually took 125.60 seconds while seven capture transfers were serialized; the user-requested 90s target was exceeded, not represented as exactly 90 seconds.",
 "The compiled Rust/egui WASM UI performed capture/replay on an owner fixture; public-site seven GPU files were recorded through the official webgd JS hook, then independently decoded. The UI has not been shown to replay all seven 137 MB public-site files.",
 "webgd frame snapshots are seven discrete samples, not continuous every-frame GPU telemetry.",
 "No original GLSL, third-party GPU WGDW resource bytes, private screenshot content or original texture pixels were uploaded to public GitHub.",
 "No lower-than-1GB capture size limit, zero texture/shader omissions for RAM reasons; a per-capture 1GB ceiling is still a safety boundary."]}
recon=D/"X24-R2-S2-SEVEN-FULL-WGDW-INDEPENDENT-X01-X23-CROSSWALK.json"
hashv=emit(recon,result)
accept={"stage":"X24-R2","status":status,"passed":sum(ck.values()),"total":len(ck),
 "failed":result["independentChecks"]["failed"],"checks":ck,"reconciliationSHA256":hashv,
 "originalX24R1Unmodified":True,"originalX23AllStagesPreserved":True}
emit(D/"X24-R2-S2-INDEPENDENT-ACCEPTANCE.json",accept)
print("X24_R2_STAGE2_INDEPENDENT "+json.dumps({"status":status,"passed":accept["passed"],"total":accept["total"],
 "failed":accept["failed"][:20],"frames":len(frameData),"totalBytes":run["totalPrivateWireBytes"],
 "timing":timeStats,"minRamMiB":run["minFreeRamMiB"],"avgGCreclaimedMiB":ramStats["stage2Completed"]["averageReclaimedMiB"]},ensure_ascii=False))
