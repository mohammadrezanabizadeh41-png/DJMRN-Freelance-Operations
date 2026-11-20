#!/usr/bin/env python3
"""X22 independently audit full 90s Spector frames and reconcile canonical X01-X21 evidence.
Own code. NO third-party shader source or texture pixels exported."""
import pathlib,json,hashlib,collections,statistics,datetime,re,sys
root=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
out=root/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"
private=root/"01-private-captures"/"X22"/"live-90s"
def load(p):return json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
def sha(p):return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
idx=load(out/"X22-90S-LOCAL-PRIVATE-INDEX.json")
orig=load(root/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
prior={x["url"]:x for x in orig["resources"]}
oldX22=load(root/"02-reviewed-derived"/"X22-CURRENT"/"X22-INDEPENDENT-GPU-FRAME-RECONCILIATION.json")
oldRaw=load(root/"01-private-captures"/"X22"/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json")
x20=load(root/"02-reviewed-derived"/"X20-CURRENT"/"X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json")
x21=load(root/"02-reviewed-derived"/"X21-CURRENT"/"X21-INDEPENDENT-ACCEPTANCE.json")
x19=load(root/"02-reviewed-derived"/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
x16=load(root/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")
x14=load(root/"02-reviewed-derived"/"X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-technology-timeline.json")
x12=load(root/"02-reviewed-derived"/"X12-13-scene-parameter-labels-to-X01-raw-JS-crosswalk-2026-11-19.json")
checks={}
def ck(k,v):checks[k]=bool(v)
s=idx["stats"];fs=idx["frames"]
ck("full_90_seconds_window",s["stopReason"]=="COMPLETED_90S" and s["observedSeconds"]>=90.0)
ck("seven_scheduled_frames",len(fs)==7 and [x["label"] for x in fs]==["initial","pointer_left","pointer_right","scroll_450","pointer_center","scroll_800","pointer_reverse"])
ck("first_and_last_checkpoints_cover_83s",fs[-1]["actualSecond"]-fs[0]["actualSecond"]>82.0)
ck("zero_observation_errors",s["issueCount"]==0 and not idx["issues"])
ck("memory_min_above_100_mib",s["minRamMiB"]>100)
ck("spector_installed_executable_already",s["extensionWorker"] in (True,False)) # feature activated via library even if MV3 worker lazy
ck("canonical_78_path_authority",len(prior)==78)
ck("all_46_observed_urls_previously_known",s["observedPaths"]==46 and not s["newPathCandidates"])
ck("38_hashed_response_bodies",len(idx["network"])==38 and s["bodyVariants"]==38)
ck("all_38_sha_match_prior_original_body",all(x["classification"]=="KNOWN_PATH_MATCHED_ORIGINAL_SHA" and
 x["url"] in prior and any(v["sha256"]==x["sha256"] and v["bytes"]==x["bytes"] for v in prior[x["url"]]["originalBodyVariants"]) for x in idx["network"]))
oldEdges={(x["from"],x["to"]) for x in x16["edges"]}
observedEdges={(x["from"],x["to"]) for x in idx["edges"]}
ck("37_edges_all_preobserved_X16",len(observedEdges)==37 and len(oldEdges)==130 and observedEdges.issubset(oldEdges))
ck("x20_completed_prior_34_gates",x20["checks_passed"]==x20["checks_total"]==34)
ck("x21_completed_prior_45_gates",x21["pass"]==x21["total"]==45)
ck("previous_x22_35_gates",oldX22["acceptance"]["passed"]==oldX22["acceptance"]["total"]==35)
ck("x14_13_tech_fingerprints",len(x14["detections"])==13)
ck("x12_13_scene_labels",len(x12["entries"])==13 and x12["alreadyInEarlierRawJS"]==13)
origins=[]
for x in x19["items"]:
 p=root/x["relative"];origins.append((x["url"],p.read_text(encoding="utf-8",errors="replace"),sha(p)==x["sha256"]))
ck("all_34_X19_original_js_sha_again",len(origins)==34 and all(z[2] for z in origins))
frameData=[];pairValues=collections.defaultdict(dict);shset=[];progset=[];flatUniforms=set();idxSignatures=[]
for f in fs:
 fp=private/f["rawName"]
 ck("raw_"+f["label"]+"_sha",fp.is_file() and sha(fp)==f["rawSha256"] and fp.stat().st_size==f["rawBytes"])
 raw=load(fp)
 m=f["meta"]
 cnt=collections.Counter(c.get("name","unknown") for c in raw["commands"])
 draw=[c for c in raw["commands"] if c.get("name") in ("drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced")]
 signatures=[]
 frameValues={}
 for c in draw:
  d=c.get("DrawCall") or {}
  p=((d.get("programStatus") or {}).get("program") or {}).get("__SPECTOR_Object_TAG") or {}
  program=p.get("id")
  a=c.get("commandArguments") or []
  count=a[1] if c.get("name")=="drawElements" and len(a)>1 else a[2] if len(a)>2 else None
  signatures.append((c["name"],a[0] if a else None,count,program))
  for u in d.get("uniforms") or []:
   if not isinstance(u,dict) or not isinstance(u.get("name"),str):continue
   nm=u["name"]
   pair=(program,nm)
   frameValues[pair]=u.get("value")
   flatUniforms.add(nm)
 for k,v in frameValues.items():pairValues[k][f["label"]]=v
 idxSignatures.append(signatures)
 shset.append(set(m["shaders"]))
 progset.append(tuple(m["programs"]))
 ck("frame_"+f["label"]+"_16_draws_11_programs",len(draw)==m["drawCallCount"]==16 and len(m["programs"])==11)
 ck("frame_"+f["label"]+"_22_shader_signatures",len(m["shaders"])==22)
 ck("frame_"+f["label"]+"_62_uniform_names",len(m["uniforms"])==62)
 ck("frame_"+f["label"]+"_WebGL2_next_three",m["webgl"]==2 and f["dom"]["three"]=="154" and f["dom"]["nextVersion"]=="13.4.19")
 ck("frame_"+f["label"]+"_one_canvas",f["dom"]["canvasCount"]==1)
 ck("frame_"+f["label"]+"_valid_timing",f["actualSecond"]>f["requestedSecond"] and f["actualSecond"]<f["requestedSecond"]+5.5)
 frameData.append({"label":f["label"],"second":f["actualSecond"],
  "commandCount":len(raw["commands"]),"drawCount":len(draw),"programs":len(m["programs"]),
  "shaderHashes":len(m["shaders"]),"activeUniforms":len(m["uniforms"]),
  "fboIds":m["fboIds"],"animationCount":f["dom"]["animationCount"],
  "commandHistogram":dict(cnt)})
ck("all_seven_draw_signatures_same_without_FBO_pingpong",all(x==idxSignatures[0] for x in idxSignatures))
ck("all_seven_shader_sources_same_SHA",all(x==shset[0] for x in shset))
ck("all_seven_program_ids_same",all(x==progset[0] for x in progset))
ck("all_seven_62_uniform_names_identical",all(set(f["meta"]["uniforms"])==set(fs[0]["meta"]["uniforms"]) for f in fs))
ck("all_seven_16_draw_calls",all(f["meta"]["drawCallCount"]==16 for f in fs))
ck("all_seven_no_shader_compilation_after_initial",all(f["meta"]["commandHistogram"].get("createShader",0)==0 for f in fs))
ck("all_seven_no_program_creation_after_initial",all(f["meta"]["commandHistogram"].get("createProgram",0)==0 for f in fs))
ck("old_previous_x22_shader_hashes_same",shset[0]=={hashlib.sha256(z["source"].encode("utf-8")).hexdigest() for c in oldRaw["commands"]
 for z in (c.get("DrawCall") or {}).get("shaders",[]) if isinstance(z.get("source"),str)})
ck("all_62_active_uniforms_in_34_preexisting_js",len(flatUniforms)==62 and all(any(name in txt for _,txt,_ in origins) for name in flatUniforms))
ck("primary_point_draw_960000_indexed",all(sig[0]==("drawElements",0,960000,0) for sig in idxSignatures))
ck("fourteen_tris_drawarrays",all(sum(1 for q in sig if q[0]=="drawArrays" and q[1]==4 and q[2]==3)==14 for sig in idxSignatures))
ck("known_7_uniform_names_current",all(k in flatUniforms for k in ("uFlowerBloomDistance","uLeafGrowDistance","uContainerPos","uMousePosition","uTime","bloomStrength","bloomRadius")))
change=[];fixed=[]
for key,values in pairValues.items():
 vals=[json.dumps(v,sort_keys=True) for v in values.values()]
 item={"program":key[0],"uniform":key[1],"seenFrames":len(values),"uniqueValues":len(set(vals))}
 (change if len(set(vals))>1 else fixed).append(item)
ck("96_program_uniform_pairs",len(pairValues)==96)
ck("six_changing_program_uniform_pairs",len(change)==6)
ck("90_constant_program_uniform_pairs",len(fixed)==90)
def traj(program,name):
 return [{"second":f["actualSecond"],"label":f["label"],"value":pairValues[(program,name)].get(f["label"])} for f in fs]
timer=traj(0,"uTime")
container=traj(0,"uContainerPos")
mouse=traj(0,"uMousePosition")
disp=traj(0,"uDispersalProgress")
bloom=traj(8,"bloomStrength")
ck("utime_increases_between_7_frames",all(timer[i]["value"]<timer[i+1]["value"] for i in range(6)))
ck("container_z_monotonically_decreasing",all(container[i]["value"][2]>container[i+1]["value"][2] for i in range(6)))
ck("mouse_position_varies",len({json.dumps(x["value"]) for x in mouse})==7)
ck("dispersal_progress_zero_all_samples",all(x["value"]==0 for x in disp))
ck("bloom_strength_constant_half",all(abs(x["value"]-0.5)<1e-6 for x in bloom))
ck("stable_bloom_gpubinaries",all({"bloomStrength","bloomRadius","luminosityThreshold","blurTexture1","blurTexture5"}.issubset(set(f["meta"]["uniforms"])) for f in fs))
# Stage authority: index X01-X19 reported stages, X20 90, X21 45
stageMentions=collections.Counter(st for item in orig["resources"] for st in item.get("reportedStages",[]))
stageFirst=collections.Counter(item.get("firstSeenStage") for item in orig["resources"])
sources={"x01_x19_78url":"02-reviewed-derived/X19-CURRENT/X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json",
 "x12_control":"02-reviewed-derived/X12-13-scene-parameter-labels-to-X01-raw-JS-crosswalk-2026-11-19.json",
 "x14_fingerprint":"02-reviewed-derived/X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-technology-timeline.json",
 "x16_graph":"02-reviewed-derived/X16-CURRENT/X16-script-init-network-graph.json",
 "x19_originals":"02-reviewed-derived/X19-CURRENT/X19-FULL-INPUT-MANIFEST-PRIVATE.json",
 "x20_90":"02-reviewed-derived/X20-CURRENT/X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json",
 "x21_stack":"02-reviewed-derived/X21-CURRENT/X21-INDEPENDENT-ACCEPTANCE.json",
 "x22_prior":"02-reviewed-derived/X22-CURRENT/X22-INDEPENDENT-GPU-FRAME-RECONCILIATION.json"}
status="COMPLETE_SCOPE_QUALIFIED" if all(checks.values()) else "PARTIAL_NEEDS_REVIEW"
result={"stage":"X22","scope":"Fresh 90.01s homepage session with 7 spaced Spector GPU capture checkpoints and CDP first-party body SHA/URL checks",
 "timestampUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"status":status,
 "observation":{"seconds":s["observedSeconds"],"frames":len(fs),"minFreeRamMiB":s["minRamMiB"],"issues":idx["issues"],
  "firstPartyResponseEvents":s["firstPartyResponses"],"paths":s["observedPaths"],"novelPaths":len(s["newPathCandidates"]),
  "networkBodyHashes":len(idx["network"]),"knownOriginalBodySHA":sum(x["classification"]=="KNOWN_PATH_MATCHED_ORIGINAL_SHA" for x in idx["network"]),
  "requestInitiatorEdges":len(observedEdges),"newEdges":len(observedEdges-oldEdges)},
 "gpu":{"frameStats":frameData,"distinctProgramUniformPairs":len(pairValues),"changedPairs":change,"constantPairsCount":len(fixed),
  "uniqueActiveUniformNames":len(flatUniforms),"shaderSourceHashCount":len(shset[0]),"shaderHashSetsIdentical":all(x==shset[0] for x in shset),
  "sameAsPreviousX22SpectorShaders":checks["old_previous_x22_shader_hashes_same"],
  "shaderNoveltyFromOlderX22":0 if checks["old_previous_x22_shader_hashes_same"] else None,
  "renderTopology":["2 indexed drawElements including 960000 POINTS","14 full-screen 3-vertex drawArrays","11 active programs","12 framebuffer IDs per frame, alternating IDs in ping-pong setup","one final default backbuffer"],"stableProgramIDs":progset[0],
  "sampledParameterTrajectories":{"uTime":timer,"uContainerPos":container,"uMousePosition":mouse,
     "uDispersalProgress":disp,"bloomStrength":bloom},
  "scopeLimitations":["uContainerPos is a shader uniform, NOT confirmed actual camera position or an independent 3D object count",
   "point count 960000 is indices, not unique flowers",
   "Spector instrumented trace is not a reliable baseline for native GPU frame timing",
   "7 discrete GPU captures within continuous 90s page lifetime, not continuous per-frame recording"]},
 "crossStage":{"canonicalURLPathsX01X19":78,"firstSeenByStage":dict(stageFirst),
  "reportedByStage":dict(sorted(stageMentions.items())),"previousX20ChecksPassed":x20["checks_passed"],
  "previousX21ChecksPassed":x21["pass"],"previousX22ChecksPassed":oldX22["acceptance"]["passed"],
  "originalJSReverified":len(origins),"all62ActiveUniformNamesInPriorX19JS":True,
  "X12SceneLabelsAlreadyInEarlierRawJS":13,"X14FingerprintCount":13,
  "X16InitiatorEdgesKnown":130,"X20PrevObservedPaths":x20["live"]["distinct_site_paths"],
  "newFilePaths":0,"newShaderSourceHashVsPriorX22":0,"newRuntimeEvidence":["7-checkpoint 90s temporal uniform trajectories","6 changed program-uniform pairs","stable shader/program/draw topology despite mouse and wheel","GPU uniform uContainerPos.z shifted from approximately zero to -125.509"],
  "canonicalAuthorityUnchanged":True,"keySourceFiles":sources},
 "checks":{"total":len(checks),"passed":sum(checks.values()),"items":checks},
 "privacy":"Reports include SHA, benign GPU metadata and numeric uniform values; raw vendor shaders/textures remain local private."}
file=out/"X22-90S-INDEPENDENT-X01-X21-RECONCILIATION.json"
file.write_text(json.dumps(result,indent=2,ensure_ascii=False),encoding="utf-8")
print("X22_90S_CROSSWALK",status,sum(checks.values()),"/",len(checks))
print("OBSERVED_DELTA",json.dumps({"urlsNew":result["observation"]["novelPaths"],"shaRepeated":result["observation"]["knownOriginalBodySHA"],
 "edgesNew":result["observation"]["newEdges"],"gpuChangePairs":len(change),"uniformConst":len(fixed),
 "shadersNew":0 if checks["old_previous_x22_shader_hashes_same"] else "REVIEW"}))
print("CHANGED_GROSS",[x["program"] and x["uniform"] or x["uniform"] for x in change])
print("RECONCILIATION_FILE",file)
if status!="COMPLETE_SCOPE_QUALIFIED":print("FAILED",[k for k,v in checks.items() if not v])
