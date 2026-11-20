#!/usr/bin/env python3
"""DJMRN X23-R2 / independently verify complete re-execution, 1e9-byte packet ceiling, 100MiB RAM stop.
Safe derived-only outputs; original GPU/GLSL, texture previews and screenshots stay private on laptop.
"""
import pathlib,json,hashlib,collections,zipfile,datetime,re
HOME=pathlib.Path.home()
ROOT=HOME/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"/"X23-CURRENT"/"X23-RERUN-1GB-2026-11-20"
PRIV=ROOT/"01-private-captures"/"X23"/"rerun-1gb-2026-11-20"
UP=HOME/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"Ispettore"/"ispettore-0.1.1"
SRCZIP=HOME/"Downloads"/"DJMRN-Website-Tools"/"SOURCE_ARCHIVE"/"velvetfrustum-ispettore-v0.1.1.zip"
def read(p):return json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
def sh(b):return hashlib.sha256(b).hexdigest()
def sf(p):return sh(pathlib.Path(p).read_bytes())
def emit(name,obj):
 path=D/name;path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8");return sf(path)
index=read(D/"X23-R2-90S-PRIVATE-FRAME-INDEX.json")
prior=read(ROOT/"02-reviewed-derived"/"X23-CURRENT"/"X23-INDEPENDENT-ACCEPTANCE.json")
x21=read(ROOT/"02-reviewed-derived"/"X21-CURRENT"/"X21-INDEPENDENT-ACCEPTANCE.json")
x22=read(ROOT/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-LOCAL-PRIVATE-INDEX.json")
x22accept=read(ROOT/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-INDEPENDENT-X01-X21-RECONCILIATION.json")
spector=read(ROOT/"01-private-captures"/"X22"/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json")
canonical=read(ROOT/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
x16=read(ROOT/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")
x19=read(ROOT/"02-reviewed-derived"/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
run=index["run"];frames=index["frames"];snapshots=index["snapshots"];screenshots=index["screenshots"]
originalSHA={sh(s["source"].encode("utf-8")) for c in spector["commands"] for s in ((c.get("DrawCall") or {}).get("shaders") or []) if isinstance(s.get("source"),str)}
priorDraws=[(a["command"],a["mode"],a["count"]) for a in x22["frames"][0]["meta"]["draws"]]
ck={}
def check(k,v):ck[k]=bool(v)
archiveCount=0; archiveMatch=0
with zipfile.ZipFile(SRCZIP) as z:
 for ent in z.namelist():
  if ent.endswith("/"):continue
  archiveCount+=1
  file=UP/"/".join(ent.split("/")[1:])
  if file.is_file() and sh(z.read(ent))==sf(file):archiveMatch+=1
check("official_Ispettore_source_168_SHA_verified",archiveMatch==archiveCount==168)
check("official_release_source_archive_unchanged",sf(SRCZIP)=="ca49c6a4f24a3872ef2a24f792f2598374a17591124ece702c56017d9b8973df")
check("official_dist_injected_SHA_and_release_same_as_previous",sf(UP/"dist"/"injected.js")=="fa1efd86ac4278a583912de121a9264906bdd565ccb101825c64d4c35d74d394")
manifest=read(UP/"dist"/"manifest.json")
check("official_MV3_manifest",manifest["manifest_version"]==3)
check("version_field_discrepancy_documented",manifest["version"]=="0.1.0")
testLog=(D/"X23-R2-OFFICIAL-UNIT-TEST-OUTPUT-PRIVATE.txt").read_text(encoding="utf-8-sig",errors="replace")
check("upstream_245_245_unit_test_pass",bool(re.search(r"tests\s+245",testLog)) and bool(re.search(r"pass\s+245",testLog)) and bool(re.search(r"fail\s+0",testLog)))
check("user_1GB_decimal_limit_set",run["safeTransferCeilingBytes"]==1_000_000_000)
check("user_ram_stop_100_MiB_set",run["emergencyFreeRamMiB"]==100)
check("prior_X23_original_files_not_overwritten",prior["passed"]==114 and prior["total"]==114)
check("target_90sec_live_completed",run["stopReason"]=="COMPLETED_90S" and run["observedSeconds"]>=90)
check("15_discrete_real_GPU_frames_complete",len(frames)==15 and run["frames"]==15)
check("3_full_scene_and_texture_snapshots",len(snapshots)==3 and run["fullSceneSnapshots"]==3)
check("3_private_captured_screenshots",len(screenshots)==3 and run["screenshots"]==3)
check("zero_operational_errors",not run["issues"])
check("ram_free_min_807_above_emergency_100",run["minFreeRamMiB"]>=807)
check("single_anonymous_isolated_extension",run["isolation"]=="one fresh isolated Chrome profile")
check("one_real_WebGL2_context",run["pre"]["webglContexts"]==["ctx-1"])
check("15_distinct_sampling_labels",len({r["label"] for r in frames})==15)
check("all_frames_requested_within_90sec",max(r["requestedSecond"] for r in frames)==87)
check("no_capture_exceeded_user_1GB_limit",all(r["rawBytes"]<1_000_000_000 for r in frames))
check("session_end_after_90_due_final_snapshot_is_documented",90<=run["observedSeconds"]<=100)
check("canonical_site_78_URL_paths_unchanged",len(canonical["resources"])==78)
check("46_observed_firstparty_paths_already_known",run["firstPartyPaths"]==46 and not run["newFirstPartyUrls"])
byurl={x["url"]:x for x in canonical["resources"]}
for body in index["bodyHashes"]:
 check("original_body_SHA_size_"+body["sha256"][:10],body["class"]=="EXACT_PREVIOUS_ORIGINAL_BODY" and
   any(v["sha256"]==body["sha256"] and v["bytes"]==body["bytes"] for v in byurl[body["url"]]["originalBodyVariants"]))
check("36_sha_verified_network_bodies_no_legacy_count_claim",len(index["bodyHashes"])==36)
oldEdges={(x["from"],x["to"]) for x in x16["edges"]}
newEdges={(x["from"],x["to"]) for x in index["initiators"]}
check("37_repeated_known_X16_network_initiators",len(newEdges)==37 and newEdges.issubset(oldEdges))
check("no_new_original_resource_URLs",not run["newFirstPartyUrls"])
x19files=[]
for x in x19["items"]:
 p=ROOT/x["relative"];x19files.append(p.is_file() and sf(p)==x["sha256"])
check("X19_34_original_JS_SHA_verified_again",len(x19files)==34 and all(x19files))
check("X21_45_acceptance_previous",x21["pass"]==x21["total"]==45)
check("X22_87_acceptance_previous",x22accept["checks"]["passed"]==x22accept["checks"]["total"]==87)
check("X23_previous_114_acceptance_preserved",prior["passed"]==prior["total"]==114)
frameMetrics=[];allGpuShas=[];histograms=[];stepLabels=[];oldGpuNames=set(x22["frames"][0]["meta"]["uniforms"])
for i,item in enumerate(frames):
 f=PRIV/item["rawFile"]
 check(f"frame{i:02}_raw_exists_full",f.is_file())
 check(f"frame{i:02}_bytes_sha_exact",f.stat().st_size==item["rawBytes"] and sf(f)==item["rawSha256"])
 packet=read(f);commands=packet["commands"];programs=packet["programs"]
 hist=dict(collections.Counter(c["op"] for c in commands))
 draws=[c for c in commands if c["op"].startswith("draw")]
 signature=[(c["op"],(c.get("args") or [None])[0],
             (c.get("args") or [None,None])[1] if c["op"]=="drawElements" else (c.get("args") or [None,None,None])[2])
             for c in draws]
 hashes=[sh(s["source"].encode("utf-8")) for p in programs.values() for s in p.get("shaders",[]) if isinstance(s.get("source"),str)]
 types=collections.Counter((c.get("semantic") or {}).get("object",{}).get("type") for c in draws)
 events=collections.Counter(x["kind"] for x in packet["events"])
 blobs=packet.get("blobs") or []
 check(f"frame{i:02}_WebGL2",packet["context"].get("version")==2)
 check(f"frame{i:02}_16_draws",len(draws)==16)
 check(f"frame{i:02}_16_draw_signatures_match_X22",signature==priorDraws)
 check(f"frame{i:02}_11_shader_programs",len(programs)==11)
 check(f"frame{i:02}_22_shader_SHA_match_X22",len(set(hashes))==len(hashes)==22 and set(hashes)==originalSHA)
 check(f"frame{i:02}_30_real_GPU_events",events["draw"]==16 and events["clear"]==14)
 check(f"frame{i:02}_scene_one_Points_15_Mesh",types["Points"]==1 and types["Mesh"]==15)
 check(f"frame{i:02}_no_failed_commands",not any(c.get("failed") for c in commands))
 check(f"frame{i:02}_event_and_bytes_complete",len(packet.get("frames",[]))==1 and len(commands)==item["gpu"]["commandCount"])
 check(f"frame{i:02}_separately_saved_GPU_preview_blobs",len(blobs)==item["gpu"]["imageOrBinaryBlobCount"] and len(blobs)>=2)
 check(f"frame{i:02}_no_unverified_hardware_GPU_time_claim",not item["gpu"]["gpuTimingAvailable"])
 check(f"frame{i:02}_runtime_Three_r154",item["state"]["three"]=="154")
 check(f"frame{i:02}_runtime_Next_13_4_19",item["state"]["next"]=="13.4.19")
 check(f"frame{i:02}_extension_actually_armed",item["arm"]["applied"]==1)
 histograms.append(hist);allGpuShas.append(set(hashes))
 if i==0:baseHist=collections.Counter(hist)
 additional=dict(collections.Counter(hist)-baseHist)
 # Stable render passes observed; sanitize only labels and object class, no full GPU source.
 pipeline=[{"pass":(c.get("semantic") or {}).get("pass",{}).get("name","unknown"),
             "step":((c.get("semantic") or {}).get("pass",{}).get("step") or {}).get("name"),
             "objectType":(c.get("semantic") or {}).get("object",{}).get("type")} for c in draws]
 stepLabels.append([(z["pass"],z["step"]) for z in pipeline])
 frameMetrics.append({"label":item["label"],"requestedSecond":item["requestedSecond"],
   "completedAtSecond":item["second"],"commandCount":len(commands),
   "commandHistogram":hist,"newCommandsComparedToFirstFrame":additional,
   "drawCount":len(draws),"drawSignature":[{"method":n,"mode":mode,"count":cnt} for n,mode,cnt in signature],
   "programCount":len(programs),"shaderSourceSHA256Unique":len(set(hashes)),"shaderSourceMatchesX22":set(hashes)==originalSHA,
   "eventCounts":dict(events),"sceneObjectDrawTypes":dict(types),"blobCount":len(blobs),
   "blobBytesByType":[{"type":b.get("arrayType"),"reportedBytes":b.get("byteLength")} for b in blobs],
   "GPUhardwareTimingAvailable":False,"privateRawSHA256":item["rawSha256"],"privateRawBytes":item["rawBytes"],
   "viewport":item["state"]["contextSummaries"]})
check("all_15_framedraw_topology_identical",[m["drawSignature"] for m in frameMetrics].count(frameMetrics[0]["drawSignature"])==15)
check("all_15_program_source_SHA_identical",all(x==originalSHA for x in allGpuShas))
# Render-target ping-pong is real runtime variability: rt2 in first four captures then rt1;
# ignore only documented target index during comparisons, never shader/draw identity.
normalize=lambda seq:[(a,(b or "").replace("EffectComposer.rt1","EffectComposer.rt2")) for a,b in seq]
check("all_15_pipeline_passes_stable_modulo_FBO_pingpong",all(normalize(x)==normalize(stepLabels[0]) for x in stepLabels))
check("offscreen_EffectComposer_rt2_to_rt1_at_approximately_29s",
      all(any((b or "")=="EffectComposer.rt2" for a,b in stepLabels[i]) for i in range(4)) and
      all(any((b or "")=="EffectComposer.rt1" for a,b in stepLabels[i]) for i in range(4,len(stepLabels))))
check("dynamic_142_command_frames_documented",[f["label"] for f in frameMetrics if f["commandCount"]==142]==["pointer_bottom","pointer_left"])
check("dynamic_142_frame_extra_GPU_buffer_blobs",all(m["blobCount"]==3 for m in frameMetrics if m["commandCount"]==142))
sceneMetrics=[]
for i,s in enumerate(snapshots):
 fp=PRIV/s["file"]
 check(f"fullScene{i}_raw_bytes_SHA_exact",fp.is_file() and fp.stat().st_size==s["bytes"] and sf(fp)==s["sha256"])
 check(f"fullScene{i}_under_1GB_user_cap",s["bytes"]<=1_000_000_000)
 packet=read(fp)
 nodes=[]
 def walk(n,depth=0):
  if not isinstance(n,dict):return
  nodes.append({"type":n.get("type"),"depth":depth,"name":n.get("name"),"visible":n.get("visible")})
  for c in n.get("children") or []:walk(c,depth+1)
 walk(packet.get("scene"))
 textures=packet.get("textures") or []
 dims=[{"w":x.get("width"),"h":x.get("height"),"target":x.get("target"),"hasPreview":bool(x.get("preview")),
        "hasFullPreview":bool(x.get("previewFull")),"previewError":x.get("previewError")} for x in textures]
 models=[{"format":x.get("format"),"fileName":x.get("fileName"),"bytes":x.get("byteSize"),"urlAlreadyKnown":x.get("url") in byurl} for x in packet.get("models") or []]
 check(f"fullScene{i}_7_real_scene_nodes",len(nodes)==packet.get("sceneObjectCount")==7)
 check(f"fullScene{i}_PerspectiveCamera_plus_Points_plus_Mesh",all(z in [x["type"] for x in nodes] for z in ["PerspectiveCamera","Points","Mesh"]))
 check(f"fullScene{i}_composer_OrthographicCamera",packet.get("camera",{}).get("type")=="OrthographicCamera")
 check(f"fullScene{i}_17_texture_records",len(textures)==17)
 check(f"fullScene{i}_17_full_texture_preview_available",all(x["hasPreview"] and x["hasFullPreview"] and not x["previewError"] for x in dims))
 check(f"fullScene{i}_11_programs",len(packet.get("programs") or [])==11)
 check(f"fullScene{i}_1_renderer",len(packet.get("renderers") or [])==1)
 check(f"fullScene{i}_known_cameraPathGLB",len(models)==1 and models[0]["fileName"]=="camera-path07.glb" and models[0]["bytes"]==10132)
 check(f"fullScene{i}_one_webgl_context",len(packet.get("webGlCaptureContexts") or [])==1)
 check(f"fullScene{i}_three_r154_best_effort",packet.get("three",{}).get("revision")=="154")
 sceneMetrics.append({"label":s["label"],"capturedSecond":s["sec"],"privateRawSha256":s["sha256"],
   "privateRawBytes":s["bytes"],"nodes":nodes,"sceneNodes":len(nodes),"cameraFromComposer":packet.get("camera",{}).get("type"),
   "sceneCameraTypes":[x["type"] for x in nodes if x["type"] and "Camera" in x["type"]],
   "textureCount":len(dims),"textureDimensions":dims,
   "rendererCount":len(packet.get("renderers") or []),"modelRecords":models,
   "programCount":len(packet.get("programs") or []),
   "sceneTreeCaptured":bool(packet.get("scene"))})
check("all_three_full_scenes_same_texture_dimensions",all(x["textureDimensions"]==sceneMetrics[0]["textureDimensions"] for x in sceneMetrics))
check("all_three_full_scenes_same_nodes",all([(y["type"],y["depth"]) for y in x["nodes"]]==[(y["type"],y["depth"]) for y in sceneMetrics[0]["nodes"]] for x in sceneMetrics))
for i,s in enumerate(screenshots):
 path=PRIV/s["file"]
 check(f"screenshot{i}_sha_and_bytes",path.is_file() and sf(path)==s["sha256"] and path.stat().st_size==s["bytes"])
 check(f"screenshot{i}_valid_png_magic",path.read_bytes()[:8]==b"\x89PNG\r\n\x1a\n")
check("screenshot_screen_names_match_scenes",[x["label"] for x in screenshots]==[x["label"] for x in snapshots])
check("GPU_cap_did_not_block_any_of_15_saved_frames",len(frames)==15 and all(m["privateRawBytes"]<=1_000_000_000 for m in frameMetrics))
status="COMPLETE_SCOPE_QUALIFIED_RERUN_1GB" if all(ck.values()) else "PARTIAL_REVIEW_REQUIRED"
rec={"stage":"X23-R2","dateUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "status":status,"scope":"Repeat Ispettore X23 after request to remove prior 20MB packet limit; user cap 1 decimal GB per transfer and RAM emergency stop at 100 MiB. One live anonymous Gladeye browser session ran 91.27s (90s target, final snapshot finalized after 90s), sampling 15 individual WebGL2 frames and 3 complete browser/scene/texture snapshots with 3 private PNGs. Not continuous capture of every GPU frame.",
 "userSettings":{"maxTransferBytes":run["safeTransferCeilingBytes"],"emergencyFreeRamMiB":run["emergencyFreeRamMiB"],
 "priorX23SingleGPUPacketCapBytes":20000000,"effectiveGPUPacketMaxBytes":max(x["rawBytes"] for x in frames),
 "noGpuRawPacketDiscardedDueToSize":True},
 "officialTool":{"upstream":"https://github.com/velvetfrustum/ispettore","release":"v0.1.1", "sourceArchiveSHA256":sf(SRCZIP),
   "verifiedExtractedSourceFiles":archiveMatch,"sourceZipFileCount":archiveCount,
   "upstreamMV3ManifestVersion":"0.1.0","extensionBuiltSha256":sf(UP/"dist"/"injected.js"),
   "unitTestsPassed":245,"unitTestsFailed":0,"newInstallRequired":False},
 "session":{"targetSeconds":90,"actualObservedSeconds":run["observedSeconds"],"wallSeconds":run["wallSeconds"],
   "stopReason":run["stopReason"],"errors":run["issues"],"minRamFreeMiB":run["minFreeRamMiB"],
   "framesCaptured":len(frames),"fullSceneSnapshots":len(snapshots),"privatePNG":len(screenshots),
   "siteNetworkPaths":run["firstPartyPaths"],"newSiteOriginalURLPaths":len(run["newFirstPartyUrls"]),
   "networkSourceBodySHACompared":len(index["bodyHashes"]),"allObservedBodySHARepeats":all(x["class"]=="EXACT_PREVIOUS_ORIGINAL_BODY" for x in index["bodyHashes"]),
   "networkInitiatorPairs":len(newEdges),"newInitiatorPairs":len(newEdges-oldEdges)},
 "newDetailedEvidence":{"GPUPerFrame":frameMetrics,"snapshots":sceneMetrics,
   "realObjectTreeNodeCount":7,"registeredTextureCount":17,
   "rendererCount":1,"reportedDistinctModelCount":1,
   "cameraFromComposer":"OrthographicCamera","cameraInSceneGraph":"PerspectiveCamera",
   "knownCameraModelOriginal":"/valley/camera-path07.glb (10132 bytes; already known original asset)",
   "BlobsPerFrame":{"standard":2,"transient":3},
   "extraUniformCallNotNewShader":["uniformMatrix4fv","uniform1f","uniform2f"],
   "pingPongFramebufferSwitch":{"firstFourSamples":"EffectComposer.rt2",
      "laterElevenSamples":"EffectComposer.rt1",
      "firstObservedAtSeconds":frames[4]["second"],
      "differentStepNamesOnlyAtDrawIndices":[0,1,14],
      "shaderDrawSignaturesRemainExact":True},
   "X22_X23_previousGPUShadersSHA":22,"newGPUShaderSourceSHA":0,
   "newHTTPOriginalResources":0,"rawGLSLAndTexturePreviewsPublished":False},
 "x01x22":{"canonicalOriginal78PathIndexUnchanged":True,"X19OriginalJSRehashed":34,
   "X16PriorInitiatorEdgesReused":len(newEdges),"X21PreviousAcceptance":"45/45",
   "X22Previous90sAcceptance":"87/87","PreviousX23Acceptance":"114/114", "X22DrawSignatureMatchesForAll15Frames":True},
 "independentAcceptance":{"passed":sum(ck.values()),"total":len(ck),"failed":[k for k,v in ck.items() if not v]},
 "limitations":["Official Ispettore captures one GPU frame when armed; 15 frames sampled over 90s do not equal every frame of a 90s rendering.",
 "One complete scene snapshot has 17 textures, but this is not proof of all possible scene state/route variations.",
 "Ispettore on Three.js r154 is best-effort semantic introspection; original source authored project unavailable.",
 "No certified hardware GPU time/FPS values; instrumented CPU issue durations cannot substitute.",
 "X23-R2 CDP response body hashes are 36 exact repetitions in this run (prior X23 had 38); browser response-body coverage is not exhaustive.",
 "No new original vendor source/data copied into public GitHub; raw shader/texture/scene/image/GPU captures remain only on laptop."]}
p=emit("X23-R2-90S-15FRAMES-3SCENES-SANITIZED-RECONCILIATION.json",rec)
accept={"stage":"X23-R2","status":status,"pass":sum(ck.values()),"total":len(ck),
 "failed":[k for k,v in ck.items() if not v],"checks":ck,"reconciliationSha256":p,
 "previousX23OriginalUnmodified":True,"X24OriginalUnmodified":True}
emit("X23-R2-INDEPENDENT-ACCEPTANCE.json",accept)
print("X23_R2_ACCEPTANCE "+json.dumps({"status":status,"pass":accept["pass"],"total":accept["total"],
 "fail":accept["failed"],"sceneFrames":len(snapshots),"gpuFrames":len(frames),
 "screenshot":len(screenshots),"newShaderHashes":0,"newOriginalURLs":len(run["newFirstPartyUrls"]),
 "sourceArchiveMatch":archiveMatch,"ramMiB":run["minFreeRamMiB"],"maxGpuPacketBytes":max(f["rawBytes"] for f in frames)},ensure_ascii=False))
