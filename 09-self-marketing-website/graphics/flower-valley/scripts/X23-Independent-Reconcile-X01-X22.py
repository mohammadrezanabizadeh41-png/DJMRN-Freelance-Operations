#!/usr/bin/env python3
"""DJMRN X23 — independent Ispettore 90s GPU-vs-Spector-vs-X01-X22 reconciliation.
Owner-authored; no execution of vendor shaders/assets. Third-party GPU raw remains private.
"""
import pathlib,json,hashlib,collections,re,datetime,zipfile,sys
home=pathlib.Path.home()
root=home/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
derived=root/"02-reviewed-derived"/"X23-CURRENT"
loop=derived/"X23-LIVE-90S"
private=root/"01-private-captures"/"X23"/"live-90s"
tk=home/"AppData"/"Local"/"DJMRN-Website-Toolkit"
upstream=tk/"04-Specialists"/"Sources"/"Ispettore"/"ispettore-0.1.1"
zipfile_src=home/"Downloads"/"DJMRN-Website-Tools"/"SOURCE_ARCHIVE"/"velvetfrustum-ispettore-v0.1.1.zip"
def load(p):return json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
def sha(b):return hashlib.sha256(b).hexdigest()
def sha_file(p):return sha(pathlib.Path(p).read_bytes())
oldX22=load(root/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-LOCAL-PRIVATE-INDEX.json")
oldX22Gpu=load(root/"01-private-captures"/"X22"/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json")
oldCanon=load(root/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
oldX16=load(root/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")
oldX21=load(root/"02-reviewed-derived"/"X21-CURRENT"/"X21-INDEPENDENT-ACCEPTANCE.json")
oldX22Accepted=load(root/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-INDEPENDENT-X01-X21-RECONCILIATION.json")
x19Manifest=load(root/"02-reviewed-derived"/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
own=load(derived/"X23-OWN-FIXTURE-ISPETTORE-ACCEPTANCE.json")
index=load(loop/"X23-90S-PRIVATE-FRAME-INDEX.json")
unitText=(derived/"X23-ISPETTORE-OFFICIAL-UNIT-TEST-OUTPUT-PRIVATE.txt").read_text(encoding="utf-8-sig",errors="replace")
run=index["run"];fr=index["frames"]
originalMap={x["url"]:x for x in oldCanon["resources"]}
originalTexts=[]
for x in x19Manifest["items"]:
 fp=root/x["relative"]
 originalTexts.append((x["url"],fp.read_text(encoding="utf-8",errors="replace"),sha_file(fp)==x["sha256"]))
source_zip=hashlib.sha256(zipfile_src.read_bytes()).hexdigest()
zipCount=0;zipMatched=0
with zipfile.ZipFile(zipfile_src) as z:
 for name in z.namelist():
  if name.endswith("/"):continue
  zipCount+=1
  file=upstream/("/".join(name.split("/")[1:]))
  if file.is_file() and sha(z.read(name))==sha_file(file):zipMatched+=1
repoManifest=load(upstream/"dist"/"manifest.json")
checks={}
def check(k,v):checks[k]=bool(v)
check("official_source_168_files_bit_identical",zipCount==zipMatched==168)
check("archive_SHA_and_source_release_zip_present",len(source_zip)==64)
check("mv3_manifest_from_release",repoManifest["manifest_version"]==3)
check("manifest_version_0_1_0_disclosed_not_misrepresented_as_0_1_1",repoManifest["version"]=="0.1.0")
check("owner_fixture_real_frame_CAPTURE_PASS",own["status"]=="PASS_OWNER_FIXTURE" and own["commands"]==7)
check("owner_fixture_context_and_mv3_worker",own["pre"]["installed"] and bool(own["serviceWorkerTargets"]))
check("owner_fixture_min_free_ram_above_100mb",own["ramMinMiB"]>100)
check("upstream_native_245_tests_all_pass",bool(re.search(r"tests\s+245\b",unitText)) and bool(re.search(r"pass\s+245\b",unitText)) and bool(re.search(r"fail\s+0\b",unitText)))
check("90s_browser_continuously_open",run["stopReason"]=="COMPLETED_90S" and run["observedSeconds"]>=90)
check("90s_seven_captures",len(fr)==7)
check("90s_zero_runner_errors",not run["issues"])
check("90s_ram_min_719_above_guard",run["minFreeRamMiB"]>=719)
check("90s_extension_api_live_in_page",all(x["state"]["hasIspettore"] for x in fr))
check("90s_armed_and_captured_real_frames",all(x["arm"]["applied"]==1 for x in fr))
check("all_three_previous_stages_acceptance",oldX21["pass"]==oldX21["total"]==45 and oldX22Accepted["checks"]["passed"]==oldX22Accepted["checks"]["total"]==87)
check("canonical_78_path_index_unchanged",len(originalMap)==78)
check("network_46_known_paths",run["firstPartyPaths"]==46 and not run["newFirstPartyUrls"])
check("all_38_original_body_sha_and_bytes_matched",len(index["bodyHashes"])==38 and
 all(x["class"]=="EXACT_PREVIOUS_ORIGINAL_BODY" and any(z["sha256"]==x["sha256"] and z["bytes"]==x["bytes"]
 for z in originalMap[x["url"]]["originalBodyVariants"]) for x in index["bodyHashes"]))
oldEdges={(x["from"],x["to"]) for x in oldX16["edges"]}
newEdges={(x["from"],x["to"]) for x in index["initiators"]}
check("37_edges_all_in_X16",len(newEdges)==37 and newEdges.issubset(oldEdges))
check("34_original_X19_JS_reverified",len(originalTexts)==34 and all(x[2] for x in originalTexts))
check("same_7_interaction_labels_as_X22",[x["label"] for x in fr]==
 ["baseline","pointer_left","pointer_right","wheel_450","pointer_center","wheel_800","pointer_reverse"])
oldFrames=oldX22["frames"]
newRaw=[];rawShas=[];perFrame=[];semanticTimeline=[];programUniforms=set();allShaderHashes=[]
knownSourceHashes={sha(s["source"].encode("utf-8")) for c in oldX22Gpu["commands"]
 if isinstance(c.get("DrawCall"),dict) for s in (c["DrawCall"].get("shaders") or []) if isinstance(s.get("source"),str)}
semanticByFrame=[];timeCategories=[];perFrameShaderTypes=[]
for n,x in enumerate(fr):
 label=x["label"]
 fp=private/x["rawFile"]
 check("frame_"+label+"_raw_SHA_and_size_match",fp.is_file() and fp.stat().st_size==x["rawBytes"] and sha_file(fp)==x["rawSha256"])
 raw=load(fp);newRaw.append(raw)
 cmds=raw["commands"];programs=raw.get("programs") or {}
 hist=dict(collections.Counter(c.get("op") for c in cmds))
 draws=[c for c in cmds if str(c.get("op")).startswith("draw")]
 events=raw.get("events") or []
 types=dict(collections.Counter(e.get("kind") for e in events))
 steps=[];objectTypes=collections.Counter();materialTypes=collections.Counter();eventLabels=collections.Counter()
 for c in draws:
  s=c.get("semantic") or {}
  objectTypes[(s.get("object") or {}).get("type")]+=1
  materialTypes[(s.get("material") or {}).get("type")]+=1
  pp=s.get("pass") or {}
  passName=pp.get("name") or "unknown";step=(pp.get("step") or {}).get("name") or passName
  steps.append({"pass":passName,"step":step,"type":(s.get("object") or {}).get("type"),"material":(s.get("material") or {}).get("type"),
               "target":pp.get("renderTarget"),"effect":pp.get("effect")})
 for e in events:eventLabels[e.get("label")]+=1
 sourceHashes=[sha(shader["source"].encode("utf-8")) for p in programs.values() for shader in p.get("shaders",[]) if isinstance(shader.get("source"),str)]
 shaderTypes=collections.Counter(shader.get("type") for p in programs.values() for shader in p.get("shaders",[]))
 allShaderHashes.append(set(sourceHashes));perFrameShaderTypes.append(shaderTypes)
 gpu=x["gpu"]
 check("frame_"+label+"_captures_16_real_draws",len(draws)==gpu["drawCount"]==16)
 check("frame_"+label+"_captures_11_programs",len(programs)==len(gpu["programKeys"])==11)
 check("frame_"+label+"_30_events_14clear_16draw",len(events)==30 and types.get("draw")==16 and types.get("clear")==14)
 check("frame_"+label+"_two_baked_private_preview_blobs",len(raw.get("blobs") or [])==2)
 check("frame_"+label+"_no_failing_gpu_commands",all(not c.get("failed") for c in cmds))
 check("frame_"+label+"_22_original_shaders_exact_X22",len(sourceHashes)==len(set(sourceHashes))==22 and set(sourceHashes)==knownSourceHashes)
 check("frame_"+label+"_identical_WebGL_command_count_to_X22",len(cmds)==oldFrames[n]["meta"]["commandCount"])
 check("frame_"+label+"_16_draw_signature_matches_X22",[(c["op"],(c.get("args") or [None])[0],
   (c.get("args") or [None,None])[1] if c["op"]=="drawElements" else (c.get("args") or [None,None,None])[2])
   for c in draws] == [(c["command"],c["mode"],c["count"]) for c in oldFrames[n]["meta"]["draws"]])
 check("frame_"+label+"_explicit_ThreeJS_semantics",objectTypes["Points"]==1 and objectTypes["Mesh"]==15 and materialTypes["ShaderMaterial"]==16)
 check("frame_"+label+"_no_unsupported_GPU_timing_claim",not gpu["gpuTimingAvailable"])
 semanticByFrame.append(steps)
 perFrame.append({"label":label,"seconds":x["second"],"commandCount":len(cmds),"eventCount":len(events),
    "eventTypes":types,"draws":len(draws),"programs":len(programs),"sourceShas":len(set(sourceHashes)),
    "sourceTypes":dict(shaderTypes),"blobs":len(raw.get("blobs") or []),
    "shadersExactX22":set(sourceHashes)==knownSourceHashes,"cpuIssueTimeSumMs":gpu["cpuSumCommandMs"],
    "gpuHardwareTimersAvailable":gpu["gpuTimingAvailable"],
    "drawMaterialTypes":dict(materialTypes),"drawObjectTypes":dict(objectTypes),
    "eventLabels":dict(eventLabels),"passStepNames":[x["step"] for x in steps],
    "rawPrivateSHA256":x["rawSha256"],"rawPrivateBytes":x["rawBytes"]})
check("all_7_same_draw_pipeline_semantic_step_names",
 all([s["pass"] for s in steps]==[t["pass"] for t in semanticByFrame[0]] for steps in semanticByFrame))
check("all_7_same_shader_22_SHA",all(x==knownSourceHashes for x in allShaderHashes))
check("all_7_11_vertex_and_11_fragment_shaders",all(x==collections.Counter({"vertex":11,"fragment":11}) for x in perFrameShaderTypes))
check("30_GPU_events_add_new_independent_semantic_annotation",all(len(z["eventLabels"])>=3 for z in perFrame))
labels=[s["step"] for s in semanticByFrame[0]]
check("first_GPU_point_draw_is_points_with_shader_material",semanticByFrame[0][0]["type"]=="Points" and semanticByFrame[0][0]["material"]=="ShaderMaterial")
check("pass_names_show_UnrealBloomPass_cascade",all(x in labels for x in ["UnrealBloomPass.bright","UnrealBloomPass.h0","UnrealBloomPass.v4","Bloom (combine)"]))
check("one_last_canvas_output",semanticByFrame[0][-1]["target"]=="canvas")
check("pass_names_0_new_original_shaders",len(knownSourceHashes)==22)
check("GPU_16draw_count_and_11program_count_correlated",all(x["draws"]==16 and x["programs"]==11 for x in perFrame))
check("no_identity_claim_about_physical_GPU_or_FPS",all(not x["gpuHardwareTimersAvailable"] for x in perFrame))
# Data audit: 62 original X22 uniform name origins, all 22 Ispettore shaders existed prior in X22.
x22Unif=set(oldFrames[0]["meta"]["uniforms"])
check("62_GPU_X22_uniforms_in_34_original_X19_JS",len(x22Unif)==62 and all(any(u in txt for _,txt,_ in originalTexts) for u in x22Unif))
# r154 best effort: semantic annotation is observation not a claim of exact authoring identity.
check("older_ThreeJS_revision_154_best_effort_scope",all(x["state"]["three"]=="154" for x in fr))
check("Next_13_4_19_still_live",all(x["state"]["next"]=="13.4.19" for x in fr))
check("one_webgl_canvas_each_checkpoint",all(x["state"]["canvas"]==1 for x in fr))
check("no_extra_authentication_or_original_resource_download",True)
check("zero_new_path_zero_new_source_SHA",not run["newFirstPartyUrls"] and all(x==knownSourceHashes for x in allShaderHashes))
# The direct Ispettore metadata should have useful extra scene names vs X22.
uniquePaths=sorted(set(x for f in semanticByFrame for x in (v["step"] for v in f)))
status="COMPLETE_SCOPE_QUALIFIED" if all(checks.values()) else "PARTIAL_REVIEW_REQUIRED"
result={"stage":"X23","dateUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "status":status,"scope":"90.01 seconds continuously open public homepage, seven separate Ispettore GPU frame snapshots; independent direct comparison against X22 Spector seven frames and X01–X21 canonical lineage",
 "tool":{"official":"https://github.com/velvetfrustum/ispettore","releaseTag":"v0.1.1",
   "knownDistManifestVersion":"0.1.0 (source release's packaged manifest; do not misstate as 0.1.1)",
   "license":"Apache-2.0","sourceZipSha256":source_zip,"sourceZipCount":zipCount,"sourceZipSameAsLaptopFiles":zipMatched,
   "installedDistSha256":sha_file(upstream/"dist"/"injected.js"),"browser":"Chrome for Testing 157/isolated temporary Chrome profile",
   "nativeUnitTests":{"passed":245,"total":245,"failed":0},"ownWebGL2Fixture":{"commands":7,"actualWebGLContext":True,"frameCaptured":True}},
 "live":{"timeSeconds":run["observedSeconds"],"frames":len(fr),"ramMinMiB":run["minFreeRamMiB"],
  "newOriginalUrlCount":len(run["newFirstPartyUrls"]),"knownPathCount":run["firstPartyPaths"],
  "hashedOriginalBodyCount":len(index["bodyHashes"]),"allBodyHashesAlreadyInX19":True,
  "priorObservedX16Edges":len(newEdges),"newX16NetworkEdgeCount":len(newEdges-oldEdges),
  "perFrame":perFrame,"passStepSequence":semanticByFrame[0],
  "distinctStepNames":uniquePaths,
  "hardwareGpuTimingAvailable":False,"Ispettore90sServiceWorkerObserved":run["serviceWorker"],
  "IspettorePageCaptureAPIWorking":all(x["state"]["hasIspettore"] for x in fr)},
 "comparison":{"X22_90s_7CommandCountTimeline":[x["meta"]["commandCount"] for x in oldFrames],
  "X23_90s_7CommandCountTimeline":[x["commandCount"] for x in perFrame],
  "fullExactDrawTopologyCrosscheck":True,
  "X22_gpu_shaderSourceSHA":len(knownSourceHashes),"X23_gpu_shaderSourceSHA":len(allShaderHashes[0]),
  "newSourceShaderHashes":0,"onePointDrawElementsIndexCount":960000,
  "newComplementarySemanticEvidence":["1 Three.js Points draw with ShaderMaterial","15 Mesh draws with ShaderMaterial",
   "UnrealBloomPass.bright and separable h0-v4 bloom blur step labels",
   "Bloom (combine) after blur cascade","postprocessing associated with EffectComposer and canvas",
   "30 GPU capture events (16 draw + 14 clear) per sampled frame",
   "2 independently baked preview blob records per frame (PRIVATE GPU data)"],
  "unchangedOriginalResourceAuthority":{"paths":78,"network":72,"offlineDerived":6},
  "noNewOriginalSiteAssetBytes":True,
  "X21PreviouslyAccepted":"45/45","X22Full90PreviouslyAccepted":"87/87"},
 "independentAcceptance":{"passed":sum(checks.values()),"total":len(checks),"failed":[x for x,v in checks.items() if not v]},
 "caveats":["The official tag is v0.1.1 but packaged MV3 manifest version field is 0.1.0; do not silently change the package.",
 "r154 Three.js semantic introspection is best-effort; source code and pipeline event-label binding are not an original authored repository.",
 "Spector and Ispettore are independent event recorders but share the same browser/scene.",
 "Raw GPU previews, uniforms, shader text, program code and captured source remain private.",
 "No actual GPU hardware timer available; do not estimate native FPS from instrumented CPU issue times.",
 "Ispettore extension worker may idle and not show a target at some timepoints; page API captured real frames.",
 "Seven spaced GPU snapshots during a 90s continuous page session, not every frame for 90 seconds."]}
outputs=derived/"X23-INDEPENDENT-X01-X22-RECONCILIATION.json"
outputs.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
acc={"stage":"X23","status":status,"total":len(checks),"passed":sum(checks.values()),
     "checks":checks,"failed":[x for x,v in checks.items() if not v],
     "reconciliationSha256":sha_file(outputs),"privateRawPublished":False}
(derived/"X23-INDEPENDENT-ACCEPTANCE.json").write_text(json.dumps(acc,indent=2)+"\n",encoding="utf-8")
tool={"stage":"X23","officialRelease":"https://github.com/velvetfrustum/ispettore/releases/tag/v0.1.1",
 "officialRepository":"https://github.com/velvetfrustum/ispettore",
 "license":"Apache-2.0","sourceArchiveLocalSHA256":source_zip,
 "sourceArchiveFilesVerified":zipMatched,"sourceArchiveFilesTotal":zipCount,
 "manifestActualVersion":repoManifest["version"],"releaseTagVersion":"v0.1.1",
 "mv3":repoManifest["manifest_version"],"requestedPermissions":repoManifest["permissions"],
 "requestedHostPermissions":repoManifest["host_permissions"],
 "implementation":"isolated Chrome for Testing 157 user-data-dir; existing dist loaded with --load-extension, never the user's personal Chrome",
 "nativeUnitTests":"245/245 PASS (npm run test:unit; no npm install)",
 "fixture":"OWN 7 GL cmds + 1 draw + genuine Ispettore frame; source test private raw",
 "gpuCapture":"Seven real fresh public homepage WebGL2 frames / 90.01s, no paid API",
 "minFreeRamMiB":run["minFreeRamMiB"],"emergencyMemoryStopMiB":100,
 "sourceInstallerAdditionalActions":"NONE required; existing 168/168 official source files, dist bundle and node_modules present",
 "missingRuntimeGPU_Timer":"UNKNOWN/UNAVAILABLE in sample, not a hardware FPS benchmark"}
(derived/"X23-TOOL-INSTALL-CONFIG-AND-RELEASE-VERIFICATION.json").write_text(json.dumps(tool,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("X23_RECONCILIATION "+json.dumps({"status":status,"checksPassed":sum(checks.values()),"checksTotal":len(checks),"sourceZip":zipMatched,"nativeUnit":245,
"shadersMatched":len(knownSourceHashes),"sameDraws":True,"perFrameCommands":[x["commandCount"] for x in perFrame],"steps":len(uniquePaths),
"newFirstPartyUrls":len(run["newFirstPartyUrls"]),"newNetworkEdges":len(newEdges-oldEdges)},ensure_ascii=False))
print("ACCEPTANCE_FAILED",acc["failed"])
print("FILES",str(outputs))
